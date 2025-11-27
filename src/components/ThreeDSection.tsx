import { motion } from "framer-motion";
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

const ThreeDSection = () => {
  return (
    <section id="services" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -right-20 w-96 h-96 border border-primary/10 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-20 -left-20 w-96 h-96 border border-primary/10 rounded-full"
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-6xl text-foreground mb-4">
            3D Interior Design
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience your future space in stunning detail with our advanced 3D design services
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-card p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="inline-block mb-6"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <service.icon className="text-primary" size={32} />
                </div>
              </motion.div>
              <h3 className="font-serif text-2xl text-foreground mb-4">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="inline-block bg-card px-12 py-8 rounded-lg shadow-lg">
            <p className="text-lg text-muted-foreground mb-4">
              Ready to visualize your dream space?
            </p>
            <button className="px-10 py-3 bg-primary text-primary-foreground font-serif text-lg rounded-sm hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg">
              Get Started
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ThreeDSection;
