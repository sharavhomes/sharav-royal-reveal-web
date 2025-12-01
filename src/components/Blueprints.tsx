import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Info } from "lucide-react";

// Placeholder blueprints - user will upload their own
const blueprintItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000",
    title: "Luxury Apartment Floor Plan",
    area: "2,500 sq ft",
    rooms: "3 Bed, 2 Bath",
    description: "Modern open-concept design with spacious living areas",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1545362768-d4bb90c27b45?q=80&w=2000",
    title: "Contemporary Villa Layout",
    area: "4,200 sq ft",
    rooms: "4 Bed, 3.5 Bath",
    description: "Elegant multi-level design with premium finishes",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2000",
    title: "Executive Office Blueprint",
    area: "1,800 sq ft",
    rooms: "Open Plan",
    description: "Professional workspace with collaborative zones",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2000",
    title: "Penthouse Suite Design",
    area: "3,800 sq ft",
    rooms: "3 Bed, 3 Bath",
    description: "Luxurious high-rise living with panoramic views",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2000",
    title: "Boutique Hotel Room",
    area: "650 sq ft",
    rooms: "Suite",
    description: "Premium hospitality design with comfort focus",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?q=80&w=2000",
    title: "Modern Loft Conversion",
    area: "2,100 sq ft",
    rooms: "2 Bed, 2 Bath",
    description: "Industrial-chic open space with high ceilings",
  },
];

const Blueprints = () => {
  const [displayedItems, setDisplayedItems] = useState(blueprintItems.slice(0, 4));
  const [selectedBlueprint, setSelectedBlueprint] = useState<number | null>(null);
  const [showInstructions, setShowInstructions] = useState(true);

  // Infinite scroll simulation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const scrollThreshold = document.body.offsetHeight - 500;

      if (scrollPosition >= scrollThreshold && displayedItems.length < blueprintItems.length) {
        const nextItems = blueprintItems.slice(0, displayedItems.length + 2);
        setDisplayedItems(nextItems);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [displayedItems]);

  const selectedItem = blueprintItems.find((item) => item.id === selectedBlueprint);

  return (
    <section id="blueprints" className="py-20 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-6xl text-foreground mb-4">
            Blueprint Gallery
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our detailed floor plans and technical drawings
          </p>
        </motion.div>

        {/* Instructions Banner */}
        <AnimatePresence>
          {showInstructions && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-6 bg-primary/10 border border-primary/20 rounded-lg relative"
            >
              <button
                onClick={() => setShowInstructions(false)}
                className="absolute top-4 right-4 text-foreground/60 hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
              <div className="flex items-start gap-4">
                <Info className="text-primary mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-serif text-xl text-foreground mb-2">
                    How to Navigate
                  </h3>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>• Scroll down to load more blueprints automatically</li>
                    <li>• Click on any blueprint to view in fullscreen</li>
                    <li>• Use the fullscreen view to examine details closely</li>
                    <li>• Click outside or press X to exit fullscreen</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Blueprint Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group cursor-pointer rounded-lg overflow-hidden bg-background border border-border shadow-lg hover:shadow-2xl transition-all duration-500"
              onClick={() => setSelectedBlueprint(item.id)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-accent/95 via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div className="absolute bottom-0 left-0 right-0 p-6 text-accent-foreground">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-xs font-medium mb-1 opacity-90">
                        {item.area} • {item.rooms}
                      </p>
                      <h3 className="font-serif text-xl md:text-2xl">
                        {item.title}
                      </h3>
                    </div>
                    <Maximize2 size={20} />
                  </div>
                  <p className="text-sm opacity-90">{item.description}</p>
                </div>
              </motion.div>
              <div className="p-4">
                <h3 className="font-serif text-lg text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.area} • {item.rooms}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Indicator */}
        {displayedItems.length < blueprintItems.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground text-sm">
              Scroll down to load more blueprints...
            </p>
          </motion.div>
        )}

        {/* Fullscreen Modal */}
        {selectedBlueprint !== null && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-accent/98 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedBlueprint(null)}
          >
            <button
              onClick={() => setSelectedBlueprint(null)}
              className="absolute top-6 right-6 text-accent-foreground hover:text-primary transition-colors z-10"
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="max-w-7xl w-full max-h-[90vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-contain rounded-lg shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-accent via-accent/80 to-transparent p-8 rounded-b-lg">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                  <div>
                    <p className="text-accent-foreground text-sm font-medium mb-2 opacity-90">
                      {selectedItem.area} • {selectedItem.rooms}
                    </p>
                    <h3 className="text-accent-foreground font-serif text-3xl md:text-4xl mb-2">
                      {selectedItem.title}
                    </h3>
                    <p className="text-accent-foreground/90 text-base">
                      {selectedItem.description}
                    </p>
                  </div>
                  <div className="text-accent-foreground/70 text-sm">
                    <p>Click outside to close</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Blueprints;
