import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingFeatures } from "@/components/landing/LandingFeatures";
import { LandingProof } from "@/components/landing/LandingProof";
import { LandingTestimonials } from "@/components/landing/LandingTestimonials";
import { LandingCTA } from "@/components/landing/LandingCTA";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[hsl(42_28%_97%)] text-slate-800">
      <LandingHeader />
      <LandingHero />
      <LandingFeatures />
      <LandingProof />
      <LandingTestimonials />
      <LandingCTA />
      <LandingFooter />
    </div>
  );
}

