import Hero from "@/components/Hero";
import PortfolioCarousel from "@/components/PortfolioCarousel";
import ThreeDSection from "@/components/ThreeDSection";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <PortfolioCarousel />
      <ThreeDSection />
      <Contact />
    </main>
  );
};

export default Index;
