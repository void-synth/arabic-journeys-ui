import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingTestimonials } from "@/components/landing/LandingTestimonials";
import { LandingCTA } from "@/components/landing/LandingCTA";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingBackdrop } from "@/components/visual/LandingBackdrop";
import { LandingSectionDivider } from "@/components/landing/sections/LandingSectionDivider";
import { LandingScriptLineageSection } from "@/components/landing/sections/LandingScriptLineageSection";
import { LandingCohortCalendarSection } from "@/components/landing/sections/LandingCohortCalendarSection";
import { LandingVoiceHybridSection } from "@/components/landing/sections/LandingVoiceHybridSection";
import { LandingPathwaysPeopleSection } from "@/components/landing/sections/LandingPathwaysPeopleSection";
import { LandingInstitutionProofSection } from "@/components/landing/sections/LandingInstitutionProofSection";

export default function LandingPage() {
  return (
    <div className="relative isolate min-h-screen overflow-x-hidden text-slate-800">
      <LandingBackdrop />
      <LandingHeader />
      <div className="relative z-10">
        <LandingHero />
        <LandingSectionDivider />
        <LandingScriptLineageSection />
        <LandingCohortCalendarSection />
        <LandingVoiceHybridSection />
        <LandingPathwaysPeopleSection />
        <LandingInstitutionProofSection />
        <LandingTestimonials />
        <LandingCTA />
        <LandingFooter />
      </div>
    </div>
  );
}
