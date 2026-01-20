"use client";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export const OptimizedImage = ({ src, alt, width = 1000, height = 1000 }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);

  // Intersection Observer to handle "Download on Screen" logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "100px" }, // Start loading 100px before it hits the screen
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-xl bg-gray-200"
    >
      {/* Blur Placeholder Overlay 
        In a real Next.js app, 'next/image' uses a 'blurDataURL'.
        Here we simulate the "blur-up" effect.
      */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
          <ImageIcon className="text-gray-400 w-12 h-12" />
          <div className="absolute inset-0 backdrop-blur-xl bg-white/30" />
        </div>
      )}

      {/* The actual Image element
        'loading="lazy"' is the browser default, but our Intersection Observer 
        manages the 'src' assignment to ensure no bytes are sent until needed.
      */}
      {isInView && (
        <Image
          src={src}
          alt={alt}
          height={height}
          width={width}
          onLoad={() => setIsLoaded(true)}
          className={`
            w-full h-full object-cover transition-all duration-700 ease-out
            ${isLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-110 blur-2xl"}
          `}
        />
      )}
    </div>
  );
};
