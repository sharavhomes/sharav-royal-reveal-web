import { useState, useRef, useCallback, useEffect, useMemo, memo } from "react";
import { motion, AnimatePresence, PanInfo, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Grid3X3, Hand, RotateCcw } from "lucide-react";
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
const SWIPE_VELOCITY_THRESHOLD = 500;

// Memoized grid item
const BlueprintGridItem = memo(({ 
  blueprint, 
  index, 
  onClick, 
  prefersReducedMotion 
}: { 
  blueprint: typeof blueprints[0]; 
  index: number; 
  onClick: () => void;
  prefersReducedMotion: boolean | null;
}) => (
  <motion.div
    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-20px" }}
    transition={{ duration: 0.3, delay: prefersReducedMotion ? 0 : Math.min(index * 0.02, 0.2) }}
    className="relative aspect-[4/3] cursor-pointer rounded-lg overflow-hidden bg-background border border-border shadow-md hover:shadow-xl active:scale-[0.97] transition-all duration-200 group touch-manipulation"
    onClick={onClick}
  >
    <img
      src={blueprint.src}
      alt={blueprint.title}
      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
      loading="lazy"
      decoding="async"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-accent/70 via-accent/20 to-transparent md:from-accent/60 md:via-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200" />
    <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
      <p className="text-accent-foreground text-xs md:text-sm font-medium truncate drop-shadow-md">
        {blueprint.title}
      </p>
    </div>
    <div className="absolute top-2 right-2 opacity-70 md:hidden">
      <div className="bg-background/80 backdrop-blur-sm rounded-full p-1.5">
        <ZoomIn className="w-3 h-3 text-foreground" />
      </div>
    </div>
  </motion.div>
));

BlueprintGridItem.displayName = "BlueprintGridItem";

const Blueprints = memo(() => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastTouchDistance, setLastTouchDistance] = useState<number | null>(null);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const thumbnailScrollRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const resetView = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const navigateBlueprint = useCallback((direction: number) => {
    if (selectedIndex === null) return;
    const newIndex = (selectedIndex + direction + blueprints.length) % blueprints.length;
    setSelectedIndex(newIndex);
    resetView();
  }, [selectedIndex, resetView]);

  const handleZoomIn = useCallback(() => setZoom(prev => Math.min(prev + 0.5, 5)), []);
  const handleZoomOut = useCallback(() => setZoom(prev => Math.max(prev - 0.5, 0.5)), []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    setZoom(prev => Math.min(Math.max(prev + delta, 0.5), 5));
  }, []);

  const handleDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (zoom > 1) return;
    
    const swipeThreshold = isMobile ? SWIPE_THRESHOLD * 0.6 : SWIPE_THRESHOLD;
    
    if (info.offset.x > swipeThreshold || info.velocity.x > SWIPE_VELOCITY_THRESHOLD) {
      navigateBlueprint(-1);
    } else if (info.offset.x < -swipeThreshold || info.velocity.x < -SWIPE_VELOCITY_THRESHOLD) {
      navigateBlueprint(1);
    }
    
    if (Math.abs(info.offset.x) > 20) {
      setShowHint(false);
    }
  }, [zoom, isMobile, navigateBlueprint]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0 || zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  }, [zoom, pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || zoom <= 1) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  }, [isDragging, zoom, dragStart]);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const getTouchDistance = useCallback((touches: React.TouchList) => {
    if (touches.length < 2) return null;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1 && zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX - pan.x, y: e.touches[0].clientY - pan.y });
    } else if (e.touches.length === 2) {
      setLastTouchDistance(getTouchDistance(e.touches));
    }
  }, [zoom, pan, getTouchDistance]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging && zoom > 1) {
      setPan({ x: e.touches[0].clientX - dragStart.x, y: e.touches[0].clientY - dragStart.y });
    } else if (e.touches.length === 2) {
      const distance = getTouchDistance(e.touches);
      if (distance && lastTouchDistance) {
        const scale = distance / lastTouchDistance;
        setZoom(prev => Math.min(Math.max(prev * scale, 0.5), 5));
        setLastTouchDistance(distance);
      }
    }
  }, [isDragging, zoom, dragStart, getTouchDistance, lastTouchDistance]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setLastTouchDistance(null);
  }, []);

  useEffect(() => {
    if (selectedIndex !== null && thumbnailScrollRef.current) {
      const container = thumbnailScrollRef.current;
      const thumbnailWidth = window.innerWidth < 768 ? 48 : 72;
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
  }, [selectedIndex, navigateBlueprint, resetView]);

  useEffect(() => {
    if (selectedIndex !== null) {
      resetView();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedIndex, resetView]);

  const openBlueprint = useCallback((index: number) => {
    setSelectedIndex(index);
    setShowHint(true);
  }, []);

  const closeGallery = useCallback(() => {
    setSelectedIndex(null);
    resetView();
  }, [resetView]);

  return (
    <section id="blueprints" className="py-12 md:py-32 bg-card">
      <div className="container mx-auto px-3 md:px-6">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-16"
        >
          <h2 className="font-serif text-2xl sm:text-3xl md:text-6xl text-foreground mb-2 md:mb-4">
            Blueprint Gallery
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto px-2">
            Explore our technical drawings and floor plans
          </p>
          <p className="text-muted-foreground/70 text-xs mt-2 md:hidden">
            Tap to view • Pinch to zoom • Swipe to navigate
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
          {blueprints.map((blueprint, index) => (
            <BlueprintGridItem
              key={index}
              blueprint={blueprint}
              index={index}
              onClick={() => openBlueprint(index)}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        {/* Fullscreen View */}
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-accent/98 backdrop-blur-md z-50 flex flex-col safe-top safe-bottom"
            >
              {/* Top Controls */}
              <div className="flex items-center justify-between px-2 py-2 md:px-6 md:py-4 bg-background/15 backdrop-blur-md">
                <div className="flex items-center gap-0.5 md:gap-2">
                  <button
                    onClick={handleZoomOut}
                    disabled={zoom <= 0.5}
                    className="touch-target bg-background/30 hover:bg-background/50 active:bg-background/60 backdrop-blur-sm rounded-full transition-all duration-150 text-accent-foreground disabled:opacity-40"
                    aria-label="Zoom Out"
                  >
                    <ZoomOut size={18} className="md:w-5 md:h-5" />
                  </button>
                  <span className="text-accent-foreground/90 text-xs md:text-sm font-medium min-w-[3rem] text-center">
                    {Math.round(zoom * 100)}%
                  </span>
                  <button
                    onClick={handleZoomIn}
                    disabled={zoom >= 5}
                    className="touch-target bg-background/30 hover:bg-background/50 active:bg-background/60 backdrop-blur-sm rounded-full transition-all duration-150 text-accent-foreground disabled:opacity-40"
                    aria-label="Zoom In"
                  >
                    <ZoomIn size={18} className="md:w-5 md:h-5" />
                  </button>
                  {zoom > 1 && (
                    <button
                      onClick={resetView}
                      className="touch-target bg-primary/80 hover:bg-primary active:bg-primary/90 backdrop-blur-sm rounded-full transition-all duration-150 text-primary-foreground ml-1"
                      aria-label="Reset View"
                    >
                      <RotateCcw size={16} className="md:w-4 md:h-4" />
                    </button>
                  )}
                </div>

                <span className="text-accent-foreground/90 text-sm md:text-base font-medium">
                  {selectedIndex + 1} / {blueprints.length}
                </span>

                <div className="flex items-center gap-0.5 md:gap-2">
                  <button
                    onClick={() => setShowThumbnails(!showThumbnails)}
                    className={`touch-target backdrop-blur-sm rounded-full transition-all duration-150 text-accent-foreground md:hidden ${
                      showThumbnails ? 'bg-primary/80' : 'bg-background/30 hover:bg-background/50'
                    }`}
                    aria-label="Toggle Thumbnails"
                  >
                    <Grid3X3 size={18} />
                  </button>
                  <button
                    onClick={closeGallery}
                    className="touch-target bg-background/30 hover:bg-background/50 active:bg-destructive/80 backdrop-blur-sm rounded-full transition-all duration-150 text-accent-foreground"
                    aria-label="Close gallery"
                  >
                    <X size={22} className="md:w-6 md:h-6" />
                  </button>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 relative flex items-center justify-center overflow-hidden touch-manipulation">
                <button
                  onClick={() => navigateBlueprint(-1)}
                  className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 touch-target bg-background/30 hover:bg-background/50 backdrop-blur-sm rounded-full transition-all duration-150 text-accent-foreground hidden sm:flex shadow-lg"
                  aria-label="Previous"
                >
                  <ChevronLeft size={24} className="md:w-8 md:h-8" />
                </button>
                <button
                  onClick={() => navigateBlueprint(1)}
                  className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 touch-target bg-background/30 hover:bg-background/50 backdrop-blur-sm rounded-full transition-all duration-150 text-accent-foreground hidden sm:flex shadow-lg"
                  aria-label="Next"
                >
                  <ChevronRight size={24} className="md:w-8 md:h-8" />
                </button>

                <motion.div
                  key={selectedIndex}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  drag={zoom <= 1 ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  onDragEnd={handleDragEnd}
                  className="w-full h-full max-w-7xl px-1 sm:px-4 md:px-16 flex items-center justify-center touch-manipulation"
                  onWheel={handleWheel}
                >
                  <div
                    ref={imageRef}
                    className={`w-full h-full flex items-center justify-center touch-manipulation ${
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
                      className="max-w-full max-h-full object-contain rounded-lg shadow-2xl select-none touch-manipulation"
                      style={{
                        transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                        transition: isDragging ? "none" : "transform 0.1s ease-out",
                      }}
                      draggable={false}
                    />
                  </div>
                </motion.div>

                {/* Hints */}
                <AnimatePresence>
                  {showHint && isMobile && zoom <= 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.3, duration: 0.2 }}
                      className="absolute bottom-28 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg"
                    >
                      <div className="flex items-center gap-3 text-foreground/80 text-xs">
                        <div className="flex items-center gap-1">
                          <ChevronLeft size={12} />
                          <Hand size={14} />
                          <ChevronRight size={12} />
                        </div>
                        <span className="font-medium">Swipe</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="font-medium">Pinch to zoom</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Thumbnails */}
              <motion.div
                initial={false}
                animate={{ 
                  height: showThumbnails || !isMobile ? "auto" : 0,
                  opacity: showThumbnails || !isMobile ? 1 : 0
                }}
                transition={{ duration: 0.15 }}
                className="overflow-hidden bg-background/15 backdrop-blur-md"
              >
                <div 
                  ref={thumbnailScrollRef}
                  className="flex gap-1 md:gap-2 p-2 md:p-4 overflow-x-auto hide-scrollbar justify-start md:justify-center snap-x snap-mandatory"
                >
                  {blueprints.map((blueprint, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedIndex(idx)}
                      className={`relative w-14 h-14 md:w-16 md:h-16 rounded-md overflow-hidden flex-shrink-0 transition-all duration-150 snap-center ${
                        idx === selectedIndex
                          ? "ring-2 ring-primary scale-105 shadow-lg"
                          : "opacity-60 hover:opacity-100"
                      }`}
                      aria-label={`View ${blueprint.title}`}
                    >
                      <img
                        src={blueprint.src}
                        alt={blueprint.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Mobile toggle */}
              <div className="md:hidden text-center pb-1 safe-bottom bg-background/15 backdrop-blur-md">
                <button
                  onClick={() => setShowThumbnails(!showThumbnails)}
                  className="text-accent-foreground/80 text-xs py-2 px-4 active:bg-background/20 rounded-full transition-colors"
                >
                  {showThumbnails ? "▼ Hide thumbnails" : "▲ Show thumbnails"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
});

Blueprints.displayName = "Blueprints";

export default Blueprints;
