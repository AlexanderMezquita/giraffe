import React, { useState, useEffect } from "react";
import Image from "next/image";
import { landingPageData } from "../data/landingContent";

export default function BeautifulCurls() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { beautifulCurls, colorScheme } = landingPageData;
  const logoGreen = colorScheme.logoGreen;

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % beautifulCurls.images.length);
    }, 2500); // Change slide every 2.5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [beautifulCurls.images.length]);

  return (
    <section className="relative mt-6 md:mt-12 overflow-hidden">
      <div>
        {/* Desktop Layout */}
        <div className="hidden md:flex h-40 lg:h-48">
          {/* Left side with brand logo */}
          <div className="w-1/4 flex items-center justify-center">
            <div
              className="bg-amber-50 rounded-full p-6 border-2"
              style={{ borderColor: logoGreen }}
            >
              <Image
                src="/brand.png"
                alt="Brand Logo"
                width={200}
                height={80}
                className="h-16 w-auto"
                priority
              />
            </div>
          </div>

          {/* Right side with images - Desktop Grid */}
          <div className="w-3/4 relative grid grid-cols-4 grid-rows-2 gap-0">
            {/* Main image - portada.jpg (bigger to reduce distortion) */}
            <div className="relative col-span-2 row-span-2 border-r border-b border-gray-300">
              <Image
                src="/portada.jpg"
                alt="Professional salon business"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Top right image - productos.jpg */}
            <div className="relative col-span-2 row-span-1 border-b border-gray-300">
              <Image
                src="/ram2.jpg"
                alt="Hair products"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Bottom left image - peinado.jpg */}
            <div className="relative col-span-1 row-span-1 border-r border-gray-300">
              <Image
                src="/car-1.jpg"
                alt="Hair styling"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Bottom right image - aceite.jpg */}
            <div className="relative col-span-1 row-span-1">
              <Image
                src="/car-2.jpg"
                alt="Hair oil treatment"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Carousel with brand logo overlay - Full width */}
          <div className="relative h-64 overflow-hidden">
            {/* Carousel Images with Fade Animation */}
            {beautifulCurls.images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ))}

            {/* Brand logo overlay at bottom left */}
            <div className="absolute bottom-3 left-3 z-10">
              <div
                className="bg-amber-50 rounded-full p-3 border-2"
                style={{ borderColor: logoGreen }}
              >
                <Image
                  src="/brand.png"
                  alt="Brand Logo"
                  width={200}
                  height={80}
                  className="h-16 w-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
