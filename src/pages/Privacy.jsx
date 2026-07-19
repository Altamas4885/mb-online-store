import SEO from '../components/SEO';
import LegalLayout from '../components/LegalLayout';
import { brand } from '../data/content';

export default function Privacy() {
  return (
    <>
      <SEO title="Privacy Policy | MB Online Store" description="How MB Online Store collects, uses, and protects your information." />
      <LegalLayout title="Privacy Policy" updated="July 2026">
        <p>
          This Privacy Policy explains how {brand.name} ("we", "us") collects, uses, and protects
          information when you visit this website or purchase {brand.product}.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We collect information you provide directly, such as your name, email address, and payment
          details when you make a purchase, as well as basic technical data like browser type and pages
          visited to help us improve the site.
        </p>

        <h2>How We Use Your Information</h2>
        <p>
          Your information is used to process orders, deliver digital products, respond to support
          requests, and send order-related communication. We do not sell your personal information to
          third parties.
        </p>

        <h2>Payment Security</h2>
        <p>
          Payments are processed through secure, encrypted third-party payment gateways. We do not store
          your full card details on our servers.
        </p>

        <h2>Cookies</h2>
        <p>
          We may use cookies to remember preferences and understand site usage. You can disable cookies
          in your browser settings at any time.
        </p>

        <h2>Your Rights</h2>
        <p>
          You may request access to, correction of, or deletion of your personal data by contacting us at{' '}
          <a href={`mailto:${brand.email}`} className="text-gold hover:underline">{brand.email}</a>.
        </p>

        <h2>Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Changes will be posted on this page.</p>
      </LegalLayout>
    </>
  );
}
