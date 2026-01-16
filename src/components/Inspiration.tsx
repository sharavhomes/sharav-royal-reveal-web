import { useState, memo, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/work-5.jpg";

const inspirationItems = [
  { id: 1, image: work1, title: "Royal Bedroom Suite", category: "Bedroom Design", column: 1, size: "large" },
  { id: 2, image: work2, title: "Elegant Dining Experience", category: "Dining Room", column: 2, size: "small" },
  { id: 3, image: work3, title: "Luxury Spa Bathroom", category: "Bathroom", column: 3, size: "medium" },
  { id: 4, image: work4, title: "Executive Home Office", category: "Home Office", column: 4, size: "large" },
  { id: 5, image: work5, title: "Contemporary Living Space", category: "Living Room", column: 1, size: "small" },
  { id: 6, image: work1, title: "Minimalist Kitchen", category: "Kitchen", column: 2, size: "large" },
  { id: 7, image: work3, title: "Cozy Reading Nook", category: "Living Space", column: 3, size: "small" },
  { id: 8, image: work2, title: "Modern Entryway", category: "Entryway", column: 4, size: "medium" },
  { id: 9, image: work4, title: "Grand Living Hall", category: "Living Room", column: 1, size: "medium" },
  { id: 10, image: work5, title: "Serene Master Suite", category: "Bedroom", column: 2, size: "small" },
  { id: 11, image: work1, title: "Luxe Powder Room", category: "Bathroom", column: 3, size: "large" },
  { id: 12, image: work3, title: "Chef's Kitchen", category: "Kitchen", column: 4, size: "small" },
];

const sizeClasses = {
  small: "aspect-[4/3]",
  medium: "aspect-[3/4]",
  large: "aspect-[2/3]",
} as const;

// Memoized image card for better performance
const ImageCard = memo(({ item, index, onClick, isMobile }: {
  item: typeof inspirationItems[0];
  index: number;
  onClick: () => void;
  isMobile?: boolean;
}) => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : Math.min(index * 0.05, 0.3) }}
      className={`${sizeClasses[item.size as keyof typeof sizeClasses]} relative group cursor-pointer rounded-lg overflow-hidden shadow-md`}
      onClick={onClick}
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-accent/80 via-accent/20 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-200">
        <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 text-accent-foreground">
          <p className="text-[10px] md:text-xs font-medium mb-0.5 opacity-90 uppercase tracking-wider">
            {item.category}
          </p>
          <h3 className="font-serif text-xs md:text-xl">{item.title}</h3>
        </div>
        <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-background/20 backdrop-blur-sm rounded-full p-1 md:p-2">
          <ZoomIn className="text-accent-foreground w-4 h-4 md:w-5 md:h-5" />
        </div>
      </div>
    </motion.div>
  );
});

ImageCard.displayName = "ImageCard";

const Inspiration = memo(() => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const columns = [1, 2, 3, 4].map(col => 
    inspirationItems.filter(item => item.column === col)
  );

  const handleImageClick = useCallback((id: number) => {
    setSelectedImage(id);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const scrollToBlueprints = useCallback(() => {
    document.getElementById("blueprints")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const selectedItem = selectedImage !== null 
    ? inspirationItems.find(item => item.id === selectedImage) 
    : null;

  return (
    <section id="inspiration" className="py-12 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-3 md:px-6">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="font-serif text-2xl sm:text-3xl md:text-6xl text-foreground mb-2 md:mb-4">
            Design Inspiration
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto px-2">
            Explore a curated collection of stunning interior design ideas
          </p>
        </motion.div>

        {/* Grid */}
        <div className="relative">
          {/* Mobile: 2 columns */}
          <div className="grid grid-cols-2 gap-2 md:hidden">
            {[0, 1].map((colIndex) => (
              <div key={colIndex} className="flex flex-col gap-2">
                {inspirationItems
                  .filter((_, idx) => idx % 2 === colIndex)
                  .map((item, index) => (
                    <ImageCard
                      key={item.id}
                      item={item}
                      index={index}
                      onClick={() => handleImageClick(item.id)}
                      isMobile
                    />
                  ))}
              </div>
            ))}
          </div>

          {/* Desktop: 4 columns */}
          <div className="hidden md:grid md:grid-cols-4 gap-4">
            {columns.map((columnItems, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-4">
                {columnItems.map((item, index) => (
                  <ImageCard
                    key={item.id}
                    item={item}
                    index={colIndex * 3 + index}
                    onClick={() => handleImageClick(item.id)}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Gradient fades */}
          <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
          <div className="absolute top-0 bottom-0 left-0 w-4 md:w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-4 md:w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>

        {/* CTA */}
        <div className="relative -mt-24 md:-mt-32 pt-16 md:pt-24 text-center z-10">
          <button
            onClick={scrollToBlueprints}
            className="px-8 md:px-12 py-3 md:py-4 bg-primary text-primary-foreground font-serif text-base md:text-lg rounded-sm hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-[0.98]"
          >
            View Blueprint Gallery
          </button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-accent/95 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4"
            onClick={closeModal}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-accent-foreground hover:text-primary transition-colors z-10 touch-target"
            >
              <X size={28} className="md:w-8 md:h-8" />
            </button>
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-6xl max-h-[85vh] md:max-h-[90vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-contain rounded-lg shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-accent/90 to-transparent p-4 md:p-6 rounded-b-lg">
                <p className="text-accent-foreground text-xs md:text-sm font-medium mb-1 md:mb-2 opacity-90 uppercase tracking-wider">
                  {selectedItem.category}
                </p>
                <h3 className="text-accent-foreground font-serif text-xl md:text-3xl">
                  {selectedItem.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
});

Inspiration.displayName = "Inspiration";

export default Inspiration;
