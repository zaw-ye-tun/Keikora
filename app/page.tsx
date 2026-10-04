import { Navigation } from "@/components/navigation/navigation";
import { Hero } from "@/components/hero/hero";
import {
  Trust,
  Problem,
  Features,
  Industries,
  Comparison,
  Philosophy,
} from "@/components/features/features";
import { Workflow } from "@/components/workflow/workflow";
import { Story } from "@/components/story/story";
import { Roadmap } from "@/components/roadmap/roadmap";
import { EarlyAccess } from "@/components/early-access/early-access";
import { Footer } from "@/components/footer/footer";
import { Architecture } from "@/components/features/architecture";
export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main">
        <Hero />
        <Trust />
        <Problem />
        <Features />
        <Workflow />
        <Architecture />
        <Industries />
        <Story />
        <Comparison />
        <Philosophy />
        <Roadmap />
        <EarlyAccess />
      </main>
      <Footer />
    </>
  );
}
