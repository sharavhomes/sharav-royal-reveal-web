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
    height: "tall",
  },
  {
    id: 2,
    image: work2,
    title: "Elegant Dining Experience",
    category: "Dining Room",
    height: "short",
  },
  {
    id: 3,
    image: work3,
    title: "Luxury Spa Bathroom",
    category: "Bathroom",
    height: "medium",
  },
  {
    id: 4,
    image: work4,
    title: "Executive Home Office",
    category: "Home Office",
    height: "tall",
  },
  {
    id: 5,
    image: work5,
    title: "Contemporary Living Space",
    category: "Living Room",
    height: "short",
  },
  {
    id: 6,
    image: work1,
    title: "Minimalist Kitchen",
    category: "Kitchen",
    height: "medium",
  },
  {
    id: 7,
    image: work3,
    title: "Cozy Reading Nook",
    category: "Living Space",
    height: "tall",
  },
  {
    id: 8,
    image: work2,
    title: "Modern Entryway",
    category: "Entryway",
    height: "short",
  },
];

const Inspiration = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const heightClasses = {
    short: "row-span-1",
    medium: "row-span-2",
    tall: "row-span-3",
  };

  return (
    <section id="inspiration" className="py-16 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="font-serif text-3xl md:text-6xl text-foreground mb-3 md:mb-4">
            Design Inspiration
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-2">
            Explore a curated collection of stunning interior design ideas
          </p>
        </motion.div>

        {/* Pinterest-style Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 auto-rows-[120px] md:auto-rows-[200px]">
          {inspirationItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${heightClasses[item.height as keyof typeof heightClasses]} relative group cursor-pointer rounded-lg overflow-hidden`}
              onClick={() => setSelectedImage(item.id)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-accent/90 via-accent/40 to-transparent opacity-0 group-hover:opacity-100 md:transition-opacity md:duration-300"
              >
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 text-accent-foreground">
                  <p className="text-[10px] md:text-xs font-medium mb-0.5 md:mb-1 opacity-90">
                    {item.category}
                  </p>
                  <h3 className="font-serif text-sm md:text-xl">
                    {item.title}
                  </h3>
                </div>
                <div className="absolute top-2 right-2 md:top-4 md:right-4">
                  <ZoomIn className="text-accent-foreground w-4 h-4 md:w-6 md:h-6" />
                </div>
              </motion.div>
            </motion.div>
          ))}
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
              className="absolute top-4 right-4 md:top-6 md:right-6 text-accent-foreground hover:text-primary transition-colors z-10"
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
                <p className="text-accent-foreground text-xs md:text-sm font-medium mb-1 md:mb-2 opacity-90">
                  {inspirationItems.find((item) => item.id === selectedImage)?.category}
                </p>
                <h3 className="text-accent-foreground font-serif text-xl md:text-3xl">
                  {inspirationItems.find((item) => item.id === selectedImage)?.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Inspiration;
