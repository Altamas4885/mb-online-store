import SEO from '../components/SEO';
import LegalLayout from '../components/LegalLayout';
import { brand } from '../data/content';

export default function Refund() {
  return (
    <>
      <SEO title="Refund Policy | MB Online Store" description="Refund eligibility and process for MB Online Store digital products." />
      <LegalLayout title="Refund Policy" updated="July 2026">
        <p>
          Because {brand.product} is a digital product delivered instantly, refund requests are handled
          on a case-by-case basis as outlined below.
        </p>

        <h2>Eligibility</h2>
        <p>
          If you experience a technical issue that prevents you from accessing your purchase, contact us
          within 7 days of purchase and we will work to resolve it or issue a refund.
        </p>

        <h2>Non-Refundable Situations</h2>
        <p>
          Refunds are not provided simply due to change of mind once files have been successfully
          downloaded and accessed, given the nature of digital goods.
        </p>

        <h2>How to Request a Refund</h2>
        <p>
          Email <a href={`mailto:${brand.email}`} className="text-gold hover:underline">{brand.email}</a>{' '}
          with your order details and the reason for your request. We aim to respond within 2–3 business
          days.
        </p>

        <h2>Processing Time</h2>
        <p>Approved refunds are processed back to the original payment method within 5–10 business days.</p>
      </LegalLayout>
    </>
  );
}
