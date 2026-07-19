import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import TrustBadges from '../components/TrustBadges';
import VideoSection from '../components/VideoSection';
import WhatsIncluded from '../components/WhatsIncluded';
import WhyChoose from '../components/WhyChoose';
import PerfectFor from '../components/PerfectFor';
import ProductPreview from '../components/ProductPreview';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Pricing from '../components/Pricing';
import CTA from '../components/CTA';

export default function Home() {
  return (
    <>
      <SEO
        title="The AI Ultimate Collection 2026 | MB Online Store"
        description="Master AI faster with one powerful bundle. 10,000+ AI prompts, 101 business ideas, 45 ChatGPT personas and more — instant download, lifetime access."
      />
      <Hero />
      <Stats />
      <TrustBadges />
      <VideoSection />
      <WhatsIncluded />
      <WhyChoose />
      <PerfectFor />
      <ProductPreview />
      <Testimonials />
      <FAQ />
      <Pricing />
      <CTA />
    </>
  );
}
