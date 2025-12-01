import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Inspiration from "@/components/Inspiration";
import Blueprints from "@/components/Blueprints";
import ThreeDSection from "@/components/ThreeDSection";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <Hero />
        <Inspiration />
        <Blueprints />
        <ThreeDSection />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
};

export default Index;
