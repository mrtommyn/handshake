import { SiteHeader } from "@/components/site/site-header";
import { Hero } from "@/components/site/hero";
import { TwoWays } from "@/components/site/two-ways";
import { HowItWorks } from "@/components/site/how-it-works";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <TwoWays />
        <HowItWorks />
      </main>
    </>
  );
}
