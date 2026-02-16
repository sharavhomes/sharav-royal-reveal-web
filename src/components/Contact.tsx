import { memo, useCallback } from "react";
import { Mail } from "lucide-react";

const Contact = memo(() => {
  const scrollToConsultation = useCallback(() => {
    document.getElementById("consultation")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section id="contact" className="py-16 md:py-32 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-12 fade-in-up">
            <h2 className="font-serif text-3xl md:text-6xl text-foreground mb-3 md:mb-4">
              Let's Create Together
            </h2>
            <p className="text-muted-foreground text-base md:text-lg px-2">
              Transform your space into a masterpiece of luxury and elegance
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12 max-w-2xl mx-auto">
            <div className="text-center fade-in-up" style={{ animationDelay: '100ms' }}>
              <div className="inline-block mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="text-primary" size={24} />
                </div>
              </div>
              <p className="text-muted-foreground">sharavhomes@gmail.com</p>
            </div>

            <div className="text-center fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="inline-block mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🇮🇳</span>
                </div>
              </div>
              <p className="text-muted-foreground">India</p>
            </div>
          </div>

          <div className="text-center fade-in-up" style={{ animationDelay: '300ms' }}>
            <button 
              onClick={scrollToConsultation}
              className="px-12 py-4 bg-primary text-primary-foreground font-serif text-lg rounded-sm hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = "Contact";

export default Contact;
