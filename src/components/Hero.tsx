import { memo, useCallback } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-interior.jpg";

const Hero = memo(() => {
  const scrollToNext = useCallback(() => {
    document.getElementById("inspiration")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Luxury Interior" 
          className="w-full h-full object-cover opacity-60"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/50 to-background" />
        
        {/* Decorative circles - pure CSS */}
        <div className="absolute top-20 right-20 w-32 md:w-64 h-32 md:h-64 border border-primary/20 rounded-full hidden sm:block animate-spin-slow" />
        <div className="absolute bottom-20 left-20 w-48 md:w-96 h-48 md:h-96 border border-primary/10 rounded-full hidden sm:block animate-spin-slow-reverse" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center pt-16 md:pt-20">
        <div className="space-y-5 md:space-y-8 fade-in-up">
          {/* Decorative Element */}
          <div className="flex justify-center mb-4 md:mb-6">
            <Sparkles className="text-primary w-8 h-8 md:w-10 md:h-10" />
          </div>

          {/* Brand Name */}
          <div className="relative inline-block">
            <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] text-primary tracking-wider relative drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
              Sharav
              <div className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-0.5 md:h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            </h1>
          </div>

          {/* Subtitle */}
          <div className="space-y-2 md:space-y-4">
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
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-foreground max-w-xl md:max-w-2xl mx-auto font-light leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)] px-2">
            Transforming your vision into timeless elegance. Where every detail 
            speaks of sophistication, comfort, and refined luxury.
          </p>

          {/* CTA Buttons */}
          <div className="pt-4 md:pt-8 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
            <button 
              onClick={scrollToNext}
              className="group w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 bg-primary text-primary-foreground font-serif text-base md:text-lg rounded-sm hover:bg-primary/90 transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98]"
            >
              Explore Portfolio
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button 
              onClick={scrollToContact}
              className="w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 bg-transparent text-foreground border-2 border-primary font-serif text-base md:text-lg rounded-sm hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:-translate-y-1 active:scale-[0.98]"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={scrollToNext}
          className="flex flex-col items-center gap-1 md:gap-2 text-foreground/70 hover:text-primary transition-colors group touch-target bg-background/30 px-4 py-2 rounded-full animate-bounce-gentle"
        >
          <span className="text-xs md:text-sm uppercase tracking-wider font-medium drop-shadow-md">Scroll</span>
          <ChevronDown size={20} className="md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
