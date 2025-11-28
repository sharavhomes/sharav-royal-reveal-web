import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PortfolioCarousel from "@/components/PortfolioCarousel";
import ThreeDSection from "@/components/ThreeDSection";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <Hero />
        <PortfolioCarousel />
        <ThreeDSection />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
};

export default Index;
