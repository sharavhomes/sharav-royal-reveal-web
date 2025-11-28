import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/work-5.jpg";

const portfolioItems = [
  {
    id: 1,
    image: work1,
    title: "Royal Bedroom Suite",
    category: "Residential",
  },
  {
    id: 2,
    image: work2,
    title: "Elegant Dining Experience",
    category: "Residential",
  },
  {
    id: 3,
    image: work3,
    title: "Luxury Spa Bathroom",
    category: "Residential",
  },
  {
    id: 4,
    image: work4,
    title: "Executive Home Office",
    category: "Commercial",
  },
  {
    id: 5,
    image: work5,
    title: "Contemporary Living Space",
    category: "Residential",
  },
];

const PortfolioCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1200 : -1200,
      opacity: 0,
      scale: 0.7,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1200 : -1200,
      opacity: 0,
      scale: 0.7,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = portfolioItems.length - 1;
      if (nextIndex >= portfolioItems.length) nextIndex = 0;
      return nextIndex;
    });
  };

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-6xl text-foreground mb-4">
            Our Portfolio
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A curated selection of our most exquisite interior design projects
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="relative h-[400px] md:h-[600px] overflow-hidden rounded-lg">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 200, damping: 25 },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 },
                  rotateY: { type: "spring", stiffness: 200, damping: 25 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute w-full h-full"
              >
                <div className="relative w-full h-full group cursor-grab active:cursor-grabbing">
                  <motion.img
                    src={portfolioItems[currentIndex].image}
                    alt={portfolioItems[currentIndex].title}
                    className="w-full h-full object-cover rounded-lg"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-accent/80 via-accent/20 to-transparent rounded-lg"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 p-8 text-card"
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <motion.p 
                      className="text-sm font-medium mb-2 opacity-90"
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {portfolioItems[currentIndex].category}
                    </motion.p>
                    <motion.h3 
                      className="font-serif text-3xl md:text-4xl"
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      {portfolioItems[currentIndex].title}
                    </motion.h3>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <motion.button
            onClick={() => paginate(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-card/90 hover:bg-card rounded-full shadow-lg transition-all duration-300"
            aria-label="Previous"
            whileHover={{ scale: 1.15, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="text-foreground" size={24} />
          </motion.button>
          <motion.button
            onClick={() => paginate(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-card/90 hover:bg-card rounded-full shadow-lg transition-all duration-300"
            aria-label="Next"
            whileHover={{ scale: 1.15, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="text-foreground" size={24} />
          </motion.button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {portfolioItems.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-12 bg-primary"
                    : "w-2 bg-muted hover:bg-primary/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={index === currentIndex ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioCarousel;
