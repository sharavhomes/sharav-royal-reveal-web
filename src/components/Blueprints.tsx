import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Grid3X3 } from "lucide-react";
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
  { src: blueprint1, title: "Floor Plan A" },
  { src: blueprint2, title: "Floor Plan B" },
  { src: blueprint3, title: "Floor Plan C" },
  { src: blueprint4, title: "Floor Plan D" },
  { src: blueprint5, title: "Floor Plan E" },
  { src: blueprint6, title: "Floor Plan F" },
  { src: blueprint7, title: "Floor Plan G" },
  { src: blueprint8, title: "Floor Plan H" },
  { src: blueprint9, title: "Floor Plan I" },
  { src: blueprint10, title: "Floor Plan J" },
  { src: blueprint11, title: "Floor Plan K" },
  { src: blueprint12, title: "Floor Plan L" },
  { src: blueprint13, title: "Floor Plan M" },
  { src: blueprint14, title: "Floor Plan N" },
  { src: blueprint15, title: "Floor Plan O" },
];

const SWIPE_THRESHOLD = 50;

const Blueprints = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastTouchDistance, setLastTouchDistance] = useState<number | null>(null);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const thumbnailScrollRef = useRef<HTMLDivElement>(null);

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

  // Swipe gesture handler for mobile navigation
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (zoom > 1) return; // Don't swipe when zoomed
    
    if (info.offset.x > SWIPE_THRESHOLD) {
      navigateBlueprint(-1);
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      navigateBlueprint(1);
    }
  };

  // Mouse handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0 || zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoom <= 1) return;
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
    if (e.touches.length === 1 && zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX - pan.x, y: e.touches[0].clientY - pan.y });
    } else if (e.touches.length === 2) {
      setLastTouchDistance(getTouchDistance(e.touches));
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging && zoom > 1) {
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

  // Auto-scroll thumbnails to show current
  useEffect(() => {
    if (selectedIndex !== null && thumbnailScrollRef.current) {
      const container = thumbnailScrollRef.current;
      const thumbnailWidth = window.innerWidth < 768 ? 48 : 72; // w-12 or w-16+gap
      const scrollPosition = selectedIndex * thumbnailWidth - container.clientWidth / 2 + thumbnailWidth / 2;
      container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }
  }, [selectedIndex]);

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
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedIndex]);

  return (
    <section id="blueprints" className="py-12 md:py-32 bg-card">
      <div className="container mx-auto px-3 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="font-serif text-2xl sm:text-3xl md:text-6xl text-foreground mb-2 md:mb-4">
            Blueprint Gallery
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto px-2">
            Explore our technical drawings and floor plans
          </p>
        </motion.div>

        {/* Responsive Blueprint Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
          {blueprints.map((blueprint, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.03 }}
              className="relative aspect-[4/3] cursor-pointer rounded-lg overflow-hidden bg-background border border-border shadow-md hover:shadow-xl active:scale-[0.98] transition-all duration-300 group"
              onClick={() => setSelectedIndex(index)}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={blueprint.src}
                alt={blueprint.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-accent/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-accent-foreground text-xs md:text-sm font-medium truncate">
                  {blueprint.title}
                </p>
              </div>
              {/* Mobile tap indicator */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-active:opacity-100 md:hidden transition-opacity">
                <div className="bg-primary/80 rounded-full p-2">
                  <ZoomIn className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fullscreen View */}
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-accent/98 backdrop-blur-md z-50 flex flex-col safe-top safe-bottom"
            >
              {/* Top Controls Bar */}
              <div className="flex items-center justify-between px-3 py-2 md:px-6 md:py-4 bg-background/10 backdrop-blur-sm">
                {/* Left: Zoom Controls */}
                <div className="flex items-center gap-1 md:gap-2">
                  <button
                    onClick={handleZoomIn}
                    className="touch-target bg-background/20 hover:bg-background/40 backdrop-blur-sm rounded-full transition-all duration-300 text-accent-foreground"
                    title="Zoom In"
                  >
                    <ZoomIn size={18} className="md:w-5 md:h-5" />
                  </button>
                  <button
                    onClick={handleZoomOut}
                    className="touch-target bg-background/20 hover:bg-background/40 backdrop-blur-sm rounded-full transition-all duration-300 text-accent-foreground"
                    title="Zoom Out"
                  >
                    <ZoomOut size={18} className="md:w-5 md:h-5" />
                  </button>
                  <button
                    onClick={resetView}
                    className="touch-target bg-background/20 hover:bg-background/40 backdrop-blur-sm rounded-full transition-all duration-300 text-accent-foreground"
                    title="Reset View"
                  >
                    <Maximize2 size={18} className="md:w-5 md:h-5" />
                  </button>
                  <span className="text-accent-foreground/90 text-xs md:text-sm font-medium ml-2">
                    {Math.round(zoom * 100)}%
                  </span>
                </div>

                {/* Center: Counter */}
                <div className="text-accent-foreground/90 text-sm md:text-base font-medium">
                  {selectedIndex + 1} / {blueprints.length}
                </div>

                {/* Right: Toggle & Close */}
                <div className="flex items-center gap-1 md:gap-2">
                  <button
                    onClick={() => setShowThumbnails(!showThumbnails)}
                    className="touch-target bg-background/20 hover:bg-background/40 backdrop-blur-sm rounded-full transition-all duration-300 text-accent-foreground md:hidden"
                    title="Toggle Thumbnails"
                  >
                    <Grid3X3 size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedIndex(null);
                      resetView();
                    }}
                    className="touch-target text-accent-foreground hover:text-primary transition-colors"
                  >
                    <X size={24} className="md:w-7 md:h-7" />
                  </button>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 relative flex items-center justify-center overflow-hidden">
                {/* Navigation Arrows - Hidden on very small screens, shown on tablet+ */}
                <button
                  onClick={() => navigateBlueprint(-1)}
                  className="absolute left-1 sm:left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 touch-target bg-background/20 hover:bg-background/40 backdrop-blur-sm rounded-full transition-all duration-300 text-accent-foreground hidden sm:flex"
                >
                  <ChevronLeft size={24} className="md:w-8 md:h-8" />
                </button>
                <button
                  onClick={() => navigateBlueprint(1)}
                  className="absolute right-1 sm:right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 touch-target bg-background/20 hover:bg-background/40 backdrop-blur-sm rounded-full transition-all duration-300 text-accent-foreground hidden sm:flex"
                >
                  <ChevronRight size={24} className="md:w-8 md:h-8" />
                </button>

                {/* Main Blueprint with Swipe & Zoom */}
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  drag={zoom <= 1 ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  className="w-full h-full max-w-7xl px-2 sm:px-4 md:px-16 flex items-center justify-center"
                  onWheel={handleWheel}
                >
                  <div
                    ref={imageRef}
                    className={`w-full h-full flex items-center justify-center ${
                      zoom > 1 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-default"
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
                      src={blueprints[selectedIndex].src}
                      alt={blueprints[selectedIndex].title}
                      className="max-w-full max-h-full object-contain rounded-lg shadow-2xl select-none"
                      style={{
                        transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                        transition: isDragging ? "none" : "transform 0.1s ease-out",
                      }}
                      draggable={false}
                    />
                  </div>
                </motion.div>

                {/* Swipe hint for mobile - only shown initially */}
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: 2, duration: 0.5 }}
                  className="absolute bottom-24 left-1/2 -translate-x-1/2 text-accent-foreground/60 text-xs sm:hidden flex items-center gap-2"
                >
                  <ChevronLeft size={14} />
                  <span>Swipe to navigate</span>
                  <ChevronRight size={14} />
                </motion.div>
              </div>

              {/* Thumbnail Navigation Strip */}
              <motion.div
                initial={false}
                animate={{ 
                  height: showThumbnails || window.innerWidth >= 768 ? "auto" : 0,
                  opacity: showThumbnails || window.innerWidth >= 768 ? 1 : 0
                }}
                className="overflow-hidden bg-background/10 backdrop-blur-md"
              >
                <div 
                  ref={thumbnailScrollRef}
                  className="flex gap-1.5 md:gap-2 p-2 md:p-4 overflow-x-auto hide-scrollbar justify-start md:justify-center"
                >
                  {blueprints.map((blueprint, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setSelectedIndex(idx)}
                      className={`relative w-12 h-12 md:w-16 md:h-16 rounded-md overflow-hidden flex-shrink-0 transition-all duration-300 ${
                        idx === selectedIndex
                          ? "ring-2 ring-primary scale-105"
                          : "opacity-50 hover:opacity-100"
                      }`}
                      whileHover={{ scale: idx === selectedIndex ? 1.05 : 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={blueprint.src}
                        alt={blueprint.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Mobile: Always show thumbnails toggle indicator */}
              <div className="md:hidden text-center pb-2 safe-bottom">
                <button
                  onClick={() => setShowThumbnails(!showThumbnails)}
                  className="text-accent-foreground/60 text-xs"
                >
                  {showThumbnails ? "Hide thumbnails" : "Show thumbnails"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Blueprints;