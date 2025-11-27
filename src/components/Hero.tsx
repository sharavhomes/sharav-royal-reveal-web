import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-interior.jpg";

const Hero = () => {
  const scrollToNext = () => {
    const portfolioSection = document.getElementById("portfolio");
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Luxury Interior" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        
        {/* Animated Decorative Elements */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-64 h-64 border border-primary/20 rounded-full"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-20 w-96 h-96 border border-primary/10 rounded-full"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Decorative Element */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            className="flex justify-center mb-6"
          >
            <Sparkles className="text-primary" size={40} />
          </motion.div>

          {/* Brand Name - Styled Text */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative inline-block"
          >
            <h1 className="font-serif text-7xl md:text-9xl lg:text-[12rem] text-primary tracking-wider relative">
              Sharav
              {/* Decorative underline */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 1 }}
                className="absolute -bottom-4 left-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
              />
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="space-y-4"
          >
            <p className="font-serif text-2xl md:text-4xl text-foreground tracking-wide">
              Interior Design Studio
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-primary/50" />
              <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl">
                Crafting Royal & Luxurious Spaces
              </p>
              <div className="h-px w-16 bg-primary/50" />
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed"
          >
            Transforming your vision into timeless elegance. Where every detail 
            speaks of sophistication, comfort, and refined luxury.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button 
              onClick={scrollToNext}
              className="group px-10 py-4 bg-primary text-primary-foreground font-serif text-lg rounded-sm hover:bg-primary/90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Explore Portfolio
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-block ml-2"
              >
                →
              </motion.span>
            </button>
            <button 
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-10 py-4 bg-transparent text-foreground border-2 border-primary font-serif text-lg rounded-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:-translate-y-1"
            >
              Get in Touch
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-12"
          >
            {[
              { number: "150+", label: "Projects Completed" },
              { number: "12+", label: "Years Experience" },
              { number: "98%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <p className="font-serif text-3xl md:text-4xl text-primary mb-2">
                  {stat.number}
                </p>
                <p className="text-sm text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.button
          onClick={scrollToNext}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
        >
          <span className="text-sm uppercase tracking-wider">Scroll</span>
          <ChevronDown size={28} className="group-hover:scale-110 transition-transform" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
