import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingFeatures } from "@/components/landing/LandingFeatures";
import { LandingProof } from "@/components/landing/LandingProof";
import { LandingTestimonials } from "@/components/landing/LandingTestimonials";
import { LandingCTA } from "@/components/landing/LandingCTA";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingBackdrop } from "@/components/visual/LandingBackdrop";

export default function LandingPage() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden text-slate-800">
      <LandingBackdrop />
      <LandingHeader />
      <div className="relative z-10">
        <LandingHero />
        <LandingFeatures />
        <LandingProof />
        <LandingTestimonials />
        <LandingCTA />
        <LandingFooter />
      </div>
    </div>
  );
}

