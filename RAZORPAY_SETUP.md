# Razorpay Integration — Setup Guide

Complete guide for the Razorpay + Netlify Functions integration in this project.

## Files added/changed

| File | Purpose |
|---|---|
| `netlify.toml` | Netlify build config, functions directory, SPA redirect |
| `netlify/functions/create-order.js` | Creates a Razorpay Order (server-side, secret key used here only) |
| `netlify/functions/verify-payment.js` | Verifies payment signature via HMAC SHA256 (server-side) |
| `src/utils/razorpay.js` | Frontend helper: loads Checkout script, calls both functions |
| `src/components/Pricing.jsx` | Buy Now button wired to the full checkout flow |
| `src/pages/ThankYou.jsx` | Only renders success view after a verified payment |
| `.env.example` | Template for required environment variables |

## 1. Install dependencies

```bash
npm install razorpay
npm install -D netlify-cli
```

(Both are already added to `package.json` — running `npm install` picks them up.)

## 2. Get your Razorpay API keys

1. Sign up / log in at https://dashboard.razorpay.com
2. Go to **Settings → API Keys**
3. Generate a **Test Mode** key pair first: `Key Id` and `Key Secret`

## 3. Local environment setup

```bash
cp .env.example .env
```

Edit `.env`:

```
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_test_secret_here
```

`.env` is already in `.gitignore` — it will never be committed.

## 4. Local testing instructions

Netlify Functions don't run under plain `vite dev` — use the Netlify CLI, which runs Vite **and** the functions together:

```bash
npx netlify dev
```

This starts your site at `http://localhost:8888` (proxying Vite's dev server) with
`/.netlify/functions/create-order` and `/.netlify/functions/verify-payment` both live.

Test the flow:
1. Open `http://localhost:8888`
2. Scroll to Pricing → click **Buy Now**
3. Complete checkout using a Razorpay **test card**:
   - Card number: `4111 1111 1111 1111`
   - Expiry: any future date
   - CVV: any 3 digits
   - OTP (if prompted): `1234` (in test mode) — sandbox
4. On success you should land on `/thank-you` with an Order ID and Payment ID shown.

If you only run `npm run dev` (plain Vite), the fetch calls to `/.netlify/functions/*`
will 404 — always use `netlify dev` locally.

## 5. Netlify environment variable setup (production)

In the Netlify dashboard:

1. Go to your site → **Site configuration → Environment variables**
2. Add:
   - `RAZORPAY_KEY_ID` = your key id
   - `RAZORPAY_KEY_SECRET` = your key secret
3. Save, then trigger a new deploy (env vars only apply to new deploys/function invocations).

Never add these with a `VITE_` prefix — that would bundle them into the frontend
and expose them publicly. They must stay plain, server-side-only variables.

## 6. Deployment instructions

If your site is already connected to Netlify via Git:

```bash
git add .
git commit -m "Add Razorpay integration via Netlify Functions"
git push
```

Netlify will auto-deploy. Confirm in the deploy log that:
- `netlify/functions/create-order.js` and `verify-payment.js` are detected as functions
- The build uses `npm run build` and publishes `dist` (already set in `netlify.toml`)

Alternatively, deploy directly from the CLI:

```bash
npx netlify deploy --prod
```

## 7. Test mode instructions

While `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` are your **Test Mode** keys
(prefixed `rzp_test_`), all payments are simulated — no real money moves.
Use this to test the full flow (including failure cases) safely in both
local dev and a deployed Netlify preview/production URL.

To test a **failed payment**, use Razorpay's documented test failure card:
- Card number: `4000 0000 0000 0002` (simulates a declined payment)

Confirm that:
- `Pricing.jsx` shows the red error message
- The user is **not** redirected to `/thank-you`

## 8. Live mode migration instructions

When you're ready to accept real payments:

1. In the Razorpay dashboard, complete KYC/activation for your account.
2. Generate **Live Mode** keys (prefixed `rzp_live_`) under **Settings → API Keys**.
3. Update the Netlify environment variables (`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`)
   with the live keys — do this in the Netlify dashboard, not in code.
4. Redeploy the site so the functions pick up the new environment variables.
5. Make one real low-value test purchase yourself to confirm end-to-end behavior
   before announcing/launching.

No code changes are required to go live — only the environment variable values change.

## 9. How signature verification works

Razorpay Checkout returns three values after a successful payment:
`razorpay_order_id`, `razorpay_payment_id`, `razorpay_signature`.

`verify-payment.js` recomputes:

```
HMAC_SHA256(order_id + "|" + payment_id, RAZORPAY_KEY_SECRET)
```

and compares it to `razorpay_signature` using `crypto.timingSafeEqual` (constant-time
comparison, to avoid timing attacks). Only if they match is the payment considered
genuine — this is what actually protects you from a forged "success" callback sent
by a tampered client.

## 10. Error handling summary

- **create-order.js**: validates env vars, request body, and amount; returns clear
  JSON error messages with appropriate HTTP status codes (400/405/500).
- **verify-payment.js**: validates required fields, safely handles mismatched
  signature lengths, and never leaks the secret key in any response.
- **razorpay.js (frontend)**: wraps every step in try/catch; `onFailure` is called
  for script load failures, order-creation failures, verification failures, and
  Razorpay's own `payment.failed` event (e.g. card declined).
- **Pricing.jsx**: shows a loading spinner while processing, and an inline red
  error banner on any failure, without losing the rest of the page state.
- **ThankYou.jsx**: cannot render the success UI unless it was navigated to with
  verified payment state — visiting the URL directly redirects to `/`.
