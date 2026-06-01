import Navbar from "@/components/navbar/Navbar";
import HeroAboutServicesStack from "@/components/scroll/HeroAboutServicesStack";
import Process from "@/components/process/Process";
import Reviews from "@/components/reviews/Reviews";
import PricingFaqStack from "@/components/scroll/PricingFaqStack";
import CTA from "@/components/cta/CTA";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Scroll stack: Hero → About → Services (stacked panel transitions) */}
        <HeroAboutServicesStack />

        {/* Normal scroll sections with whileInView / scroll-linked reveals */}
        <Process />
        <Reviews />

        {/* Scroll stack: Pricing → FAQ (stacked panel transition) */}
        <PricingFaqStack />

        {/* Final CTA + Footer */}
        <div className="relative">
          <CTA />
          <Footer />
        </div>
      </main>
    </>
  );
}
