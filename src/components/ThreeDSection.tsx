import { memo, useCallback } from "react";
import { Box, Layers, Palette } from "lucide-react";

const services = [
  {
    icon: Box,
    title: "3D Visualization",
    description: "Photorealistic renderings that bring your vision to life before construction begins",
  },
  {
    icon: Layers,
    title: "Space Planning",
    description: "Optimized layouts that maximize functionality while maintaining aesthetic appeal",
  },
  {
    icon: Palette,
    title: "Material Selection",
    description: "Curated palette of premium materials, textures, and finishes for your project",
  },
];

const ThreeDSection = memo(() => {
  const scrollToConsultation = useCallback(() => {
    document.getElementById("consultation")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section id="services" className="py-16 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative Elements - CSS only */}
      <div className="absolute -top-20 -right-20 w-48 md:w-96 h-48 md:h-96 border border-primary/10 rounded-full hidden sm:block animate-spin-slow" />
      <div className="absolute -bottom-20 -left-20 w-48 md:w-96 h-48 md:h-96 border border-primary/10 rounded-full hidden sm:block animate-spin-slow-reverse" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-10 md:mb-16 fade-in-up">
          <h2 className="font-serif text-3xl md:text-6xl text-foreground mb-3 md:mb-4">
            3D Interior Design
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-2">
            Experience your future space in stunning detail with our advanced 3D design services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="bg-card p-6 md:p-8 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-200 fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-block mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <service.icon className="text-primary" size={32} />
                </div>
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-4">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center fade-in-up" style={{ animationDelay: '300ms' }}>
          <div className="inline-block bg-card px-12 py-8 rounded-lg shadow-lg">
            <p className="text-lg text-muted-foreground mb-4">
              Ready to visualize your dream space?
            </p>
            <button 
              onClick={scrollToConsultation}
              className="px-10 py-3 bg-primary text-primary-foreground font-serif text-lg rounded-sm hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

ThreeDSection.displayName = "ThreeDSection";

export default ThreeDSection;
