import React from 'react';
import { Montserrat, Open_Sans } from 'next/font/google';
import { landingPageData } from '../data/landingContent';

const montserrat = Montserrat({ subsets: ['latin'] });
const openSans = Open_Sans({ subsets: ['latin'] });

export default function SpecialtyInfo() {
  const { specialtyInfo, colorScheme } = landingPageData;
  const logoGreen = colorScheme.logoGreen;

  // Helper function to render SVG icons based on feature icon type
  const renderIcon = (iconType) => {
    const iconProps = {
      className: "w-12 h-12",
      fill: "currentColor",
      viewBox: "0 0 24 24"
    };

    switch (iconType) {
      case "check":
        return (
          <svg {...iconProps}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        );
      case "star":
        return (
          <svg {...iconProps}>
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      case "person":
        return (
          <svg {...iconProps}>
            <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.996 2.996 0 0 0 17.1 7h-1.84c-.83 0-1.58.5-1.91 1.27L12 12l1.42 1.42 1.83-1.83-.02-.02L17 9h.9l2.1 7H22v6z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-16 bg-white animate-fade-in">
      <div className="container mx-auto px-4 text-center">
        <h3
          className={`text-3xl font-bold text-gray-900 mb-6 ${montserrat.className}`}
        >
          {specialtyInfo.title}
        </h3>
        <p
          className={`text-lg text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed ${openSans.className}`}
        >
          {specialtyInfo.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {specialtyInfo.features.map((feature) => (
            <div key={feature.id} className="text-center">
              <div
                className="mb-4 flex justify-center"
                style={{ color: logoGreen }}
              >
                {renderIcon(feature.icon)}
              </div>
              <h4
                className={`text-xl font-semibold text-gray-900 mb-2 ${montserrat.className}`}
              >
                {feature.title}
              </h4>
              <p className={`text-gray-600 ${openSans.className}`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}