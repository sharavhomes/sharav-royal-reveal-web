import { memo, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
  const prefersReducedMotion = useReducedMotion();
  
  const scrollToConsultation = useCallback(() => {
    document.getElementById("consultation")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section id="services" className="py-16 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative Elements - CSS animations */}
      <div className="absolute -top-20 -right-20 w-48 md:w-96 h-48 md:h-96 border border-primary/10 rounded-full hidden sm:block animate-spin-slow" />
      <div className="absolute -bottom-20 -left-20 w-48 md:w-96 h-48 md:h-96 border border-primary/10 rounded-full hidden sm:block animate-spin-slow-reverse" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="font-serif text-3xl md:text-6xl text-foreground mb-3 md:mb-4">
            3D Interior Design
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-2">
            Experience your future space in stunning detail with our advanced 3D design services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : index * 0.1 }}
              className="bg-card p-6 md:p-8 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-200"
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
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-20 text-center"
        >
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
        </motion.div>
      </div>
    </section>
  );
});

ThreeDSection.displayName = "ThreeDSection";

export default ThreeDSection;
