// netlify/functions/create-order.js
//
// Creates a Razorpay Order using the Orders API.
// This runs server-side only inside a Netlify Function — the Razorpay
// Key Secret is read from environment variables and is NEVER sent to the browser.
//
// Frontend calls this with { amount, currency, receipt } and gets back
// an order object (including order.id) to hand to Razorpay Checkout.

import Razorpay from 'razorpay';

const ALLOWED_ORIGIN = process.env.URL || '*'; // Netlify sets URL to your site's deploy URL

const corsHeaders = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export const handler = async (event) => {
  // Preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ success: false, message: 'Method not allowed. Use POST.' }),
    };
  }

  try {
    const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;

    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      console.error('Missing Razorpay environment variables.');
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ success: false, message: 'Server misconfiguration. Please contact support.' }),
      };
    }

    let payload;
    try {
      payload = JSON.parse(event.body || '{}');
    } catch {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ success: false, message: 'Invalid JSON body.' }),
      };
    }

    const { amount, currency = 'INR', notes = {} } = payload;

    // amount must be a positive number, expressed in the smallest currency unit (paise for INR)
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ success: false, message: 'A valid positive amount (in paise) is required.' }),
      };
    }

    const razorpay = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });

    // Receipt id must be <= 40 chars per Razorpay's Orders API constraints
    const receipt = `rcpt_${Date.now()}`;

    const order = await razorpay.orders.create({
      amount, // in paise, e.g. ₹199 => 19900
      currency,
      receipt,
      notes,
    });

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        order: {
          id: order.id,
          amount: order.amount,
          currency: order.currency,
        },
        key_id: RAZORPAY_KEY_ID, // public key — safe to expose, needed by Checkout on the frontend
      }),
    };
  } catch (err) {
    console.error('create-order error:', err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ success: false, message: 'Failed to create Razorpay order.' }),
    };
  }
};
