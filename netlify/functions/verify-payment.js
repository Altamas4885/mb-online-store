// netlify/functions/verify-payment.js
//
// Verifies a completed Razorpay payment by recomputing the HMAC SHA256
// signature server-side and comparing it against the signature Razorpay
// sent back to the frontend after checkout. This is the step that proves
// the payment is genuine — never trust the frontend's word alone.

import crypto from 'crypto';

const ALLOWED_ORIGIN = process.env.URL || '*';

const corsHeaders = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export const handler = async (event) => {
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
    const { RAZORPAY_KEY_SECRET } = process.env;

    if (!RAZORPAY_KEY_SECRET) {
      console.error('Missing RAZORPAY_KEY_SECRET environment variable.');
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

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = payload;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ success: false, message: 'Missing required payment verification fields.' }),
      };
    }

    // Razorpay's documented verification formula:
    // expected_signature = HMAC_SHA256(order_id + "|" + payment_id, key_secret)
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
    const receivedBuffer = Buffer.from(razorpay_signature, 'utf8');

    // timingSafeEqual throws if buffer lengths differ, so guard against that first
    const isAuthentic =
      expectedBuffer.length === receivedBuffer.length &&
      crypto.timingSafeEqual(expectedBuffer, receivedBuffer);

    if (!isAuthentic) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ success: false, verified: false, message: 'Payment signature verification failed.' }),
      };
    }

    // At this point the payment is verified as genuine.
    // Optionally: mark the order as paid in your database here.

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        verified: true,
        message: 'Payment verified successfully.',
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
      }),
    };
  } catch (err) {
    console.error('verify-payment error:', err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ success: false, message: 'Payment verification failed due to a server error.' }),
    };
  }
};
