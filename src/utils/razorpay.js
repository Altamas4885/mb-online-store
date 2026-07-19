// src/utils/razorpay.js
//
// Frontend helper for the Razorpay Checkout flow. This file never touches
// the Razorpay Key Secret — it only talks to our own Netlify Functions,
// which are the only place the secret exists.

const CHECKOUT_SCRIPT_SRC = 'https://checkout.razorpay.com/v1/checkout.js';

/**
 * Loads the Razorpay Checkout script once and caches the promise so repeated
 * calls (e.g. clicking Buy Now more than once) don't inject it twice.
 */
let checkoutScriptPromise = null;
function loadRazorpayScript() {
  if (checkoutScriptPromise) return checkoutScriptPromise;

  checkoutScriptPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Razorpay can only be loaded in a browser environment.'));
      return;
    }

    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = CHECKOUT_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      checkoutScriptPromise = null; // allow retry on next attempt
      reject(new Error('Failed to load Razorpay Checkout script. Check your internet connection.'));
    };
    document.body.appendChild(script);
  });

  return checkoutScriptPromise;
}

/**
 * Calls our create-order Netlify Function to open a Razorpay Order.
 * @param {number} amountInRupees - e.g. 199 for ₹199
 * @param {object} notes - optional metadata to attach to the order
 */
async function createOrder(amountInRupees, notes = {}) {
  const response = await fetch('/.netlify/functions/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: Math.round(amountInRupees * 100), // Razorpay expects paise
      currency: 'INR',
      notes,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Could not create order. Please try again.');
  }

  return data; // { success, order: { id, amount, currency }, key_id }
}

/**
 * Calls our verify-payment Netlify Function with the payment details
 * Razorpay returns after a successful checkout.
 */
async function verifyPayment(paymentResponse) {
  const response = await fetch('/.netlify/functions/verify-payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentResponse),
  });

  const data = await response.json();

  if (!response.ok || !data.success || !data.verified) {
    throw new Error(data.message || 'Payment verification failed.');
  }

  return data;
}

/**
 * Full end-to-end checkout flow:
 * 1. Load the Razorpay script
 * 2. Create an order via our Netlify Function
 * 3. Open Razorpay Checkout
 * 4. Verify the payment signature via our Netlify Function
 * 5. Call onSuccess / onFailure callbacks so the UI can react
 *
 * @param {object} options
 * @param {number} options.amount - amount in rupees (e.g. 199)
 * @param {object} options.prefill - { name, email, contact }
 * @param {string} options.productName - shown in the Checkout modal
 * @param {function} options.onSuccess - called with verification result on success
 * @param {function} options.onFailure - called with an Error on any failure/cancellation
 * @param {function} [options.onDismiss] - called if the user closes the checkout modal without paying
 */
export async function startRazorpayCheckout({
  amount,
  prefill = {},
  productName = 'Digital Product',
  onSuccess,
  onFailure,
  onDismiss,
}) {
  try {
    await loadRazorpayScript();

    const { order, key_id } = await createOrder(amount, { product: productName });

    const options = {
      key: key_id,
      amount: order.amount,
      currency: order.currency,
      name: productName,
      description: `Purchase of ${productName}`,
      order_id: order.id,
      prefill: {
        name: prefill.name || '',
        email: prefill.email || '',
        contact: prefill.contact || '',
      },
      theme: {
        color: '#F5C542',
      },
      handler: async (razorpayResponse) => {
        // razorpayResponse = { razorpay_order_id, razorpay_payment_id, razorpay_signature }
        try {
          const verification = await verifyPayment(razorpayResponse);
          onSuccess?.(verification);
        } catch (err) {
          onFailure?.(err instanceof Error ? err : new Error('Payment verification failed.'));
        }
      },
      modal: {
        ondismiss: () => {
          onDismiss?.();
        },
      },
    };

    const rzp = new window.Razorpay(options);

    // Fires when Razorpay itself reports a failed payment attempt
    // (e.g. card declined) before the handler above would ever run.
    rzp.on('payment.failed', (response) => {
      const message = response?.error?.description || 'Payment failed. Please try again.';
      onFailure?.(new Error(message));
    });

    rzp.open();
  } catch (err) {
    onFailure?.(err instanceof Error ? err : new Error('Something went wrong starting checkout.'));
  }
}
