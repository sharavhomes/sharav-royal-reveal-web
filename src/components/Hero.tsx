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
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/50 to-background" />
        
        {/* Animated Decorative Elements - Hidden on mobile */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-32 md:w-64 h-32 md:h-64 border border-primary/20 rounded-full hidden sm:block"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-20 w-48 md:w-96 h-48 md:h-96 border border-primary/10 rounded-full hidden sm:block"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center pt-16 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-5 md:space-y-8"
        >
          {/* Decorative Element */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            className="flex justify-center mb-4 md:mb-6"
          >
            <Sparkles className="text-primary w-8 h-8 md:w-10 md:h-10" />
          </motion.div>

          {/* Brand Name - Styled Text */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative inline-block"
          >
            <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] text-primary tracking-wider relative drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
              Sharav
              {/* Decorative underline */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 1 }}
                className="absolute -bottom-2 md:-bottom-4 left-0 h-0.5 md:h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
              />
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="space-y-2 md:space-y-4"
          >
            <p className="font-serif text-xl sm:text-2xl md:text-4xl text-foreground tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
              Interior Design Studio
            </p>
            <div className="flex items-center justify-center gap-2 md:gap-4">
              <div className="h-px w-8 md:w-16 bg-primary/50 drop-shadow-md" />
              <p className="text-sm sm:text-base md:text-xl text-foreground font-light max-w-2xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]">
                Crafting Royal & Luxurious Spaces
              </p>
              <div className="h-px w-8 md:w-16 bg-primary/50 drop-shadow-md" />
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-sm sm:text-base md:text-lg text-foreground max-w-xl md:max-w-2xl mx-auto font-light leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)] px-2"
          >
            Transforming your vision into timeless elegance. Where every detail 
            speaks of sophistication, comfort, and refined luxury.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="pt-4 md:pt-8 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4"
          >
            <button 
              onClick={scrollToNext}
              className="group w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 bg-primary text-primary-foreground font-serif text-base md:text-lg rounded-sm hover:bg-primary/90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98]"
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
              className="w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 bg-transparent text-foreground border-2 border-primary font-serif text-base md:text-lg rounded-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]"
            >
              Get in Touch
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="grid grid-cols-3 gap-3 md:gap-8 max-w-md md:max-w-3xl mx-auto pt-6 md:pt-12 px-2"
          >
            {[
              { number: "150+", label: "Projects" },
              { number: "12+", label: "Years" },
              { number: "98%", label: "Satisfaction" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <p className="font-serif text-xl sm:text-2xl md:text-4xl text-primary mb-0.5 md:mb-2">
                  {stat.number}
                </p>
                <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Fixed positioning */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
        style={{ position: 'absolute' }}
      >
        <motion.button
          onClick={scrollToNext}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 md:gap-2 text-foreground/70 hover:text-primary transition-colors group touch-target bg-background/30 backdrop-blur-sm px-4 py-2 rounded-full"
        >
          <span className="text-xs md:text-sm uppercase tracking-wider font-medium drop-shadow-md">Scroll</span>
          <ChevronDown size={20} className="md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
