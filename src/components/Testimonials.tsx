import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import client1 from "@/assets/client-1.jpg";
import client2 from "@/assets/client-2.jpg";
import client3 from "@/assets/client-3.jpg";
import client4 from "@/assets/client-4.jpg";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Homeowner",
    image: client1,
    rating: 5,
    review: "Sharav transformed our home into a luxurious sanctuary beyond our wildest dreams. Their attention to detail and understanding of our vision was exceptional. Every corner reflects elegance and comfort.",
  },
  {
    id: 2,
    name: "Robert Chen",
    role: "CEO, Tech Innovations",
    image: client2,
    rating: 5,
    review: "Working with Sharav on our corporate office was an absolute pleasure. They created a space that perfectly balances professionalism with modern luxury. Our team productivity has soared in this beautiful environment.",
  },
  {
    id: 3,
    name: "Maya Patel",
    role: "Restaurant Owner",
    image: client3,
    rating: 5,
    review: "The restaurant redesign exceeded all expectations! Sharav's team captured the exact ambiance we wanted - sophisticated yet welcoming. Our customers constantly compliment the stunning interior.",
  },
  {
    id: 4,
    name: "James & Linda Williams",
    role: "Retirees",
    image: client4,
    rating: 5,
    review: "After 30 years in our home, Sharav gave it new life. The thoughtful redesign honors our memories while bringing fresh, elegant style. We feel like we're living in a five-star resort every day.",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = testimonials.length - 1;
      if (nextIndex >= testimonials.length) nextIndex = 0;
      return nextIndex;
    });
  };

  return (
    <section id="testimonials" className="py-16 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative Elements - Hidden on small mobile */}
      <motion.div
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 right-10 w-32 md:w-64 h-32 md:h-64 border border-primary/10 rounded-full hidden sm:block"
      />
      <motion.div
        animate={{ 
          rotate: [360, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-10 left-10 w-40 md:w-80 h-40 md:h-80 border border-primary/5 rounded-full hidden sm:block"
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-4"
          >
            <Quote className="text-primary" size={48} />
          </motion.div>
          <h2 className="font-serif text-4xl md:text-6xl text-foreground mb-4">
            Client Testimonials
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hear what our delighted clients have to say about their experience
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative min-h-[400px] md:min-h-[350px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                }}
                className="absolute w-full"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card rounded-2xl p-8 md:p-12 shadow-2xl border border-border"
                >
                  {/* Quote Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="text-primary/20 mb-6"
                  >
                    <Quote size={64} className="mx-auto" />
                  </motion.div>

                  {/* Rating */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center gap-1 mb-6"
                  >
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.4 + i * 0.1, type: "spring" }}
                      >
                        <Star className="fill-primary text-primary" size={24} />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Review Text */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-foreground text-lg md:text-xl text-center font-light leading-relaxed mb-8 italic"
                  >
                    "{testimonials[currentIndex].review}"
                  </motion.p>

                  {/* Client Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col items-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7, type: "spring" }}
                      className="relative mb-4"
                    >
                      <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-primary/20">
                        <img
                          src={testimonials[currentIndex].image}
                          alt={testimonials[currentIndex].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center"
                      >
                        <Star className="fill-card text-card" size={16} />
                      </motion.div>
                    </motion.div>
                    <h4 className="font-serif text-2xl text-foreground mb-1">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-muted-foreground text-sm uppercase tracking-wide">
                      {testimonials[currentIndex].role}
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <motion.button
            onClick={() => paginate(-1)}
            className="absolute -left-2 md:-left-16 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 bg-card hover:bg-primary/10 rounded-full shadow-lg transition-all duration-300 border border-border"
            aria-label="Previous testimonial"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="text-primary w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
          <motion.button
            onClick={() => paginate(1)}
            className="absolute -right-2 md:-right-16 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 bg-card hover:bg-primary/10 rounded-full shadow-lg transition-all duration-300 border border-border"
            aria-label="Next testimonial"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="text-primary w-5 h-5 md:w-6 md:h-6" />
          </motion.button>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "w-12 h-3 bg-primary"
                    : "w-3 h-3 bg-muted hover:bg-primary/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={index === currentIndex ? { 
                  scale: [1, 1.1, 1],
                } : {}}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
