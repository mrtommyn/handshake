import { SiteHeader } from "@/components/site/site-header";
import { Hero } from "@/components/site/hero";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
      </main>
    </>
  );
}
