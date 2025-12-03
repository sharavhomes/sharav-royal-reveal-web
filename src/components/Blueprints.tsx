import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import blueprint1 from "@/assets/blueprint-1.jpg";
import blueprint2 from "@/assets/blueprint-2.jpg";
import blueprint3 from "@/assets/blueprint-3.jpg";
import blueprint4 from "@/assets/blueprint-4.jpg";
import blueprint5 from "@/assets/blueprint-5.jpg";
import blueprint6 from "@/assets/blueprint-6.jpg";
import blueprint7 from "@/assets/blueprint-7.jpg";
import blueprint8 from "@/assets/blueprint-8.jpg";
import blueprint9 from "@/assets/blueprint-9.jpg";
import blueprint10 from "@/assets/blueprint-10.jpg";
import blueprint11 from "@/assets/blueprint-11.jpg";
import blueprint12 from "@/assets/blueprint-12.jpg";
import blueprint13 from "@/assets/blueprint-13.jpg";
import blueprint14 from "@/assets/blueprint-14.jpg";
import blueprint15 from "@/assets/blueprint-15.jpg";

const blueprints = [
  blueprint1,
  blueprint2,
  blueprint3,
  blueprint4,
  blueprint5,
  blueprint6,
  blueprint7,
  blueprint8,
  blueprint9,
  blueprint10,
  blueprint11,
  blueprint12,
  blueprint13,
  blueprint14,
  blueprint15,
];

const Blueprints = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastTouchDistance, setLastTouchDistance] = useState<number | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const navigateBlueprint = useCallback((direction: number) => {
    if (selectedIndex === null) return;
    const newIndex = (selectedIndex + direction + blueprints.length) % blueprints.length;
    setSelectedIndex(newIndex);
    resetView();
  }, [selectedIndex]);

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 5));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.5, 0.5));
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    setZoom((prev) => Math.min(Math.max(prev + delta, 0.5), 5));
  };

  // Mouse handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const getTouchDistance = (touches: React.TouchList) => {
    if (touches.length < 2) return null;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX - pan.x, y: e.touches[0].clientY - pan.y });
    } else if (e.touches.length === 2) {
      setLastTouchDistance(getTouchDistance(e.touches));
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      setPan({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    } else if (e.touches.length === 2) {
      const distance = getTouchDistance(e.touches);
      if (distance && lastTouchDistance) {
        const scale = distance / lastTouchDistance;
        setZoom((prev) => Math.min(Math.max(prev * scale, 0.5), 5));
        setLastTouchDistance(distance);
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setLastTouchDistance(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowLeft") navigateBlueprint(-1);
      if (e.key === "ArrowRight") navigateBlueprint(1);
      if (e.key === "Escape") {
        setSelectedIndex(null);
        resetView();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, navigateBlueprint]);

  useEffect(() => {
    if (selectedIndex !== null) {
      resetView();
    }
  }, [selectedIndex]);

  return (
    <section id="blueprints" className="py-16 md:py-32 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="font-serif text-3xl md:text-6xl text-foreground mb-3 md:mb-4">
            Blueprint Gallery
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-2">
            Explore our technical drawings and floor plans
          </p>
        </motion.div>

        {/* Seamless Blueprint Grid - No Text */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
          {blueprints.map((blueprint, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative aspect-[4/3] cursor-pointer rounded-lg overflow-hidden bg-background border border-border shadow-md hover:shadow-2xl transition-all duration-500 group"
              onClick={() => setSelectedIndex(index)}
            >
              <img
                src={blueprint}
                alt={`Blueprint ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <motion.div
                className="absolute inset-0 bg-accent/0 group-hover:bg-accent/20 transition-all duration-500"
              />
            </motion.div>
          ))}
        </div>

        {/* Fullscreen Interconnected View */}
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-accent/98 backdrop-blur-md z-50 flex items-center justify-center p-2 md:p-4"
              onClick={() => {
                setSelectedIndex(null);
                resetView();
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setSelectedIndex(null);
                  resetView();
                }}
                className="absolute top-4 right-4 md:top-6 md:right-6 text-accent-foreground hover:text-primary transition-colors z-10"
              >
                <X size={28} className="md:w-8 md:h-8" />
              </button>

              {/* Zoom Controls */}
              <div className="absolute top-4 left-4 md:top-6 md:right-20 md:left-auto flex gap-1 md:gap-2 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleZoomIn();
                  }}
                  className="p-2 md:p-3 bg-background/20 hover:bg-background/40 backdrop-blur-sm rounded-full transition-all duration-300 text-accent-foreground"
                  title="Zoom In"
                >
                  <ZoomIn size={18} className="md:w-5 md:h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleZoomOut();
                  }}
                  className="p-2 md:p-3 bg-background/20 hover:bg-background/40 backdrop-blur-sm rounded-full transition-all duration-300 text-accent-foreground"
                  title="Zoom Out"
                >
                  <ZoomOut size={18} className="md:w-5 md:h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    resetView();
                  }}
                  className="p-2 md:p-3 bg-background/20 hover:bg-background/40 backdrop-blur-sm rounded-full transition-all duration-300 text-accent-foreground"
                  title="Reset View"
                >
                  <Maximize2 size={18} className="md:w-5 md:h-5" />
                </button>
              </div>

              {/* Zoom Level Indicator */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 text-accent-foreground/90 text-xs md:text-sm font-medium z-10 bg-background/20 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full">
                {Math.round(zoom * 100)}%
              </div>

              {/* Navigation Controls */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateBlueprint(-1);
                }}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 p-2 md:p-4 bg-background/20 hover:bg-background/40 backdrop-blur-sm rounded-full transition-all duration-300 text-accent-foreground"
              >
                <ChevronLeft size={24} className="md:w-8 md:h-8" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateBlueprint(1);
                }}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 p-2 md:p-4 bg-background/20 hover:bg-background/40 backdrop-blur-sm rounded-full transition-all duration-300 text-accent-foreground"
              >
                <ChevronRight size={24} className="md:w-8 md:h-8" />
              </button>

              {/* Blueprint Counter */}
              <div className="absolute top-14 md:top-20 left-4 md:left-6 text-accent-foreground/90 text-xs md:text-sm font-medium z-10">
                {selectedIndex + 1} / {blueprints.length}
              </div>

              {/* Main Blueprint with Pan & Zoom */}
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="max-w-7xl w-full max-h-[75vh] md:max-h-[85vh] relative overflow-hidden mt-12 md:mt-0"
                onClick={(e) => e.stopPropagation()}
                onWheel={handleWheel}
              >
                <div
                  ref={imageRef}
                  className={`w-full h-full flex items-center justify-center touch-none ${
                    isDragging ? "cursor-grabbing" : "cursor-grab"
                  }`}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <img
                    src={blueprints[selectedIndex]}
                    alt={`Blueprint ${selectedIndex + 1}`}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl select-none"
                    style={{
                      transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                      transition: isDragging ? "none" : "transform 0.1s ease-out",
                    }}
                    draggable={false}
                  />
                </div>
              </motion.div>

              {/* Thumbnail Navigation Strip */}
              <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2 p-2 md:p-4 bg-background/20 backdrop-blur-md rounded-full z-10 max-w-[95vw] md:max-w-[90vw] overflow-x-auto">
                {blueprints.map((blueprint, idx) => (
                  <motion.button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedIndex(idx);
                    }}
                    className={`relative w-10 h-10 md:w-16 md:h-16 rounded-md overflow-hidden flex-shrink-0 transition-all duration-300 ${
                      idx === selectedIndex
                        ? "ring-2 ring-primary scale-110"
                        : "opacity-60 hover:opacity-100"
                    }`}
                    whileHover={{ scale: idx === selectedIndex ? 1.1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={blueprint}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Blueprints;
