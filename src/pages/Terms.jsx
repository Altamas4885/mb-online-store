import SEO from '../components/SEO';
import LegalLayout from '../components/LegalLayout';
import { brand } from '../data/content';

export default function Terms() {
  return (
    <>
      <SEO title="Terms & Conditions | MB Online Store" description="The terms and conditions governing your use of MB Online Store and purchase of digital products." />
      <LegalLayout title="Terms & Conditions" updated="July 2026">
        <p>
          By accessing this website or purchasing {brand.product}, you agree to the following terms and
          conditions.
        </p>

        <h2>Digital Product Nature</h2>
        <p>
          All products sold by {brand.name} are digital and delivered electronically. No physical items
          are shipped.
        </p>

        <h2>License of Use</h2>
        <p>
          Your purchase grants you a personal, non-transferable license to use the included materials.
          Reselling, redistributing, or publicly sharing the files without permission is prohibited.
        </p>

        <h2>Payments</h2>
        <p>
          All prices are listed in Indian Rupees (₹) unless stated otherwise. Payment is required in full
          before access is granted.
        </p>

        <h2>Availability</h2>
        <p>
          We aim to keep this website and downloads available at all times but do not guarantee
          uninterrupted access due to factors outside our control.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          {brand.name} is not liable for indirect or consequential losses arising from the use of the
          products or information provided.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to{' '}
          <a href={`mailto:${brand.email}`} className="text-gold hover:underline">{brand.email}</a>.
        </p>
      </LegalLayout>
    </>
  );
}
