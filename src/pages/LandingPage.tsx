import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingHero, LandingHeroStats, LandingTrustMarquee } from "@/components/landing/LandingHero";
import { LandingFAQ, LandingTestimonials } from "@/components/landing/LandingTestimonials";
import { LandingCTA } from "@/components/landing/LandingCTA";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingScriptLineageSection } from "@/components/landing/sections/LandingScriptLineageSection";
import { LandingCohortCalendarSection } from "@/components/landing/sections/LandingCohortCalendarSection";
import { LandingVoiceHybridSection } from "@/components/landing/sections/LandingVoiceHybridSection";
import { LandingPathwaysPeopleSection } from "@/components/landing/sections/LandingPathwaysPeopleSection";
import { LandingInstitutionProofSection } from "@/components/landing/sections/LandingInstitutionProofSection";

export default function LandingPage() {
  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-background text-foreground">
      <LandingHeader />
      <div className="relative z-10">
        <LandingHero />
        <LandingHeroStats />
        <LandingTrustMarquee />
        <LandingScriptLineageSection />
        <LandingCohortCalendarSection />
        <LandingVoiceHybridSection />
        <LandingPathwaysPeopleSection />
        <LandingInstitutionProofSection />
        <LandingTestimonials />
        <LandingFAQ />
        <LandingCTA />
        <LandingFooter />
      </div>
    </div>
  );
}
