import { useState } from "react";
import { motion } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/work-5.jpg";

const inspirationItems = [
  {
    id: 1,
    image: work1,
    title: "Royal Bedroom Suite",
    category: "Bedroom Design",
    column: 1,
    size: "large",
  },
  {
    id: 2,
    image: work2,
    title: "Elegant Dining Experience",
    category: "Dining Room",
    column: 2,
    size: "small",
  },
  {
    id: 3,
    image: work3,
    title: "Luxury Spa Bathroom",
    category: "Bathroom",
    column: 3,
    size: "medium",
  },
  {
    id: 4,
    image: work4,
    title: "Executive Home Office",
    category: "Home Office",
    column: 4,
    size: "large",
  },
  {
    id: 5,
    image: work5,
    title: "Contemporary Living Space",
    category: "Living Room",
    column: 1,
    size: "small",
  },
  {
    id: 6,
    image: work1,
    title: "Minimalist Kitchen",
    category: "Kitchen",
    column: 2,
    size: "large",
  },
  {
    id: 7,
    image: work3,
    title: "Cozy Reading Nook",
    category: "Living Space",
    column: 3,
    size: "small",
  },
  {
    id: 8,
    image: work2,
    title: "Modern Entryway",
    category: "Entryway",
    column: 4,
    size: "medium",
  },
  {
    id: 9,
    image: work4,
    title: "Grand Living Hall",
    category: "Living Room",
    column: 1,
    size: "medium",
  },
  {
    id: 10,
    image: work5,
    title: "Serene Master Suite",
    category: "Bedroom",
    column: 2,
    size: "small",
  },
  {
    id: 11,
    image: work1,
    title: "Luxe Powder Room",
    category: "Bathroom",
    column: 3,
    size: "large",
  },
  {
    id: 12,
    image: work3,
    title: "Chef's Kitchen",
    category: "Kitchen",
    column: 4,
    size: "small",
  },
];

const Inspiration = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Group items by column for true masonry layout
  const columns = [1, 2, 3, 4].map(col => 
    inspirationItems.filter(item => item.column === col)
  );

  const sizeClasses = {
    small: "aspect-[4/3]",
    medium: "aspect-[3/4]",
    large: "aspect-[2/3]",
  };

  return (
    <section id="inspiration" className="py-12 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-3 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="font-serif text-2xl sm:text-3xl md:text-6xl text-foreground mb-2 md:mb-4">
            Design Inspiration
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto px-2">
            Explore a curated collection of stunning interior design ideas
          </p>
        </motion.div>

        {/* True Masonry Grid with Columns */}
        <div className="relative">
          {/* Mobile: 2 columns */}
          <div className="grid grid-cols-2 gap-2 md:hidden">
            {[0, 1].map((colIndex) => (
              <div key={colIndex} className="flex flex-col gap-2">
                {inspirationItems
                  .filter((_, idx) => idx % 2 === colIndex)
                  .map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      className={`${sizeClasses[item.size as keyof typeof sizeClasses]} relative group cursor-pointer rounded-lg overflow-hidden shadow-md`}
                      onClick={() => setSelectedImage(item.id)}
                      whileTap={{ scale: 0.98 }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-accent/80 via-accent/20 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-2 text-accent-foreground">
                          <p className="text-[10px] font-medium mb-0.5 opacity-90">
                            {item.category}
                          </p>
                          <h3 className="font-serif text-xs">
                            {item.title}
                          </h3>
                        </div>
                        <div className="absolute top-2 right-2">
                          <ZoomIn className="text-accent-foreground w-4 h-4" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            ))}
          </div>

          {/* Desktop: 4 columns true masonry */}
          <div className="hidden md:grid md:grid-cols-4 gap-4">
            {columns.map((columnItems, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-4">
                {columnItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: (colIndex * 0.1) + (index * 0.15) }}
                    className={`${sizeClasses[item.size as keyof typeof sizeClasses]} relative group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300`}
                    onClick={() => setSelectedImage(item.id)}
                    whileHover={{ y: -5 }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-accent/90 via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-accent-foreground">
                        <p className="text-xs font-medium mb-1 opacity-90 uppercase tracking-wider">
                          {item.category}
                        </p>
                        <h3 className="font-serif text-xl">
                          {item.title}
                        </h3>
                      </div>
                      <div className="absolute top-4 right-4 bg-background/20 backdrop-blur-sm rounded-full p-2">
                        <ZoomIn className="text-accent-foreground w-5 h-5" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>

          {/* Bottom Gradient Fade to cover uneven edges */}
          <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
          
          {/* Optional decorative side fades */}
          <div className="absolute top-0 bottom-0 left-0 w-4 md:w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-4 md:w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>

        {/* "View More" section overlaying the gradient */}
        <div className="relative -mt-24 md:-mt-32 pt-16 md:pt-24 text-center z-10">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={() => document.getElementById("blueprints")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 md:px-12 py-3 md:py-4 bg-primary text-primary-foreground font-serif text-base md:text-lg rounded-sm hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-[0.98]"
          >
            View Blueprint Gallery
          </motion.button>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-accent/95 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-accent-foreground hover:text-primary transition-colors z-10 touch-target"
          >
            <X size={28} className="md:w-8 md:h-8" />
          </button>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="max-w-6xl max-h-[85vh] md:max-h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={inspirationItems.find((item) => item.id === selectedImage)?.image}
              alt={inspirationItems.find((item) => item.id === selectedImage)?.title}
              className="w-full h-full object-contain rounded-lg shadow-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-accent/90 to-transparent p-4 md:p-6 rounded-b-lg">
              <p className="text-accent-foreground text-xs md:text-sm font-medium mb-1 md:mb-2 opacity-90 uppercase tracking-wider">
                {inspirationItems.find((item) => item.id === selectedImage)?.category}
              </p>
              <h3 className="text-accent-foreground font-serif text-xl md:text-3xl">
                {inspirationItems.find((item) => item.id === selectedImage)?.title}
              </h3>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Inspiration;