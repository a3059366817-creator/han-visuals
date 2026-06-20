import HeroSection from "@/components/home/HeroSection";
import FeaturedWorks from "@/components/home/FeaturedWorks";
import AboutSnippet from "@/components/home/AboutSnippet";
import ContactCTA from "@/components/home/ContactCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedWorks />
      <AboutSnippet />
      <ContactCTA />
    </>
  );
}
