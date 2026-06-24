import { SmoothScroll } from "@/components/smooth-scroll";
import { SiteHeader } from "@/components/site/site-header";
import { Hero } from "@/components/site/hero";
import { TwoWays } from "@/components/site/two-ways";
import { HowItWorks } from "@/components/site/how-it-works";
import { UseCases } from "@/components/site/use-cases";
import { TrustSafety } from "@/components/site/trust-safety";
import { FinalCta, SiteFooter } from "@/components/site/site-footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <TwoWays />
        <HowItWorks />
        <UseCases />
        <TrustSafety />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
