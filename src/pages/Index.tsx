import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

// Lazy load below-the-fold components for faster initial load
const Inspiration = lazy(() => import("@/components/Inspiration"));
const Blueprints = lazy(() => import("@/components/Blueprints"));
const ThreeDSection = lazy(() => import("@/components/ThreeDSection"));
const ConsultationForm = lazy(() => import("@/components/ConsultationForm"));
const Contact = lazy(() => import("@/components/Contact"));

// Lightweight loading skeleton
const SectionSkeleton = () => (
  <div className="py-16 md:py-32 bg-background animate-pulse">
    <div className="container mx-auto px-4">
      <div className="h-8 w-64 bg-muted rounded mx-auto mb-8" />
      <div className="h-4 w-96 bg-muted rounded mx-auto max-w-full" />
    </div>
  </div>
);

const Index = () => {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <Hero />
        <Suspense fallback={<SectionSkeleton />}>
          <Inspiration />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Blueprints />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <ThreeDSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <ConsultationForm />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Contact />
        </Suspense>
      </main>
    </>
  );
};

export default Index;
