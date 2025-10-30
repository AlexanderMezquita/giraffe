import React, { useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { Montserrat, Open_Sans } from "next/font/google";
import {
  AutoFixHigh,
  Brush,
  Spa,
  Chat,
  Person,
  Star,
  Favorite,
  Face,
} from "@mui/icons-material";
import { landingPageData } from "../data/landingContent";
import Navigation from "../components/Navigation";
import BeautifulCurls from "../components/BeautifulCurls";
import HeroSection from "../components/HeroSection";
import SpecialtyInfo from "../components/SpecialtyInfo";
import ImagePanels from "../components/ImagePanels";

const montserrat = Montserrat({ subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ["latin"] });

// Icon mapping
const iconMap = {
  AutoFixHigh,
  Brush,
  Spa,
  Chat,
  Person,
  Star,
  Favorite,
};

export default function Home() {
  // Extract data from landingContent for cleaner code
  const {
    hero,
    services,
    features,
    testimonials,
    salon,
    salonSecond,
    colorScheme,
  } = landingPageData;

  // Mobile menu state for main layout
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Logo green color from colorScheme
  const logoGreen = colorScheme.logoGreen;

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <Head>
        <style jsx global>{`
          body {
            font-family: ${openSans.style.fontFamily};
          }
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            font-family: ${montserrat.style.fontFamily};
          }
        `}</style>
      </Head>
      <div
        className={`scroll-smooth transition-all duration-500 ease-out ${
          isMobileMenuOpen ? "pt-64" : "pt-0 md:pt-18"
        }`}
      >
        {/* Navigation Component */}
        <Navigation
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
        />

        {/* Beautiful Curls Component */}
        <BeautifulCurls />

        {/* Divider */}
        <div className="border-b border-gray-200"></div>

        {/* Hero Section Component */}
        <HeroSection />

        <div className="border-b border-gray-200"></div>

        {/* Services Section */}
        <section id="servicios" className="py-16 bg-orange-50">
          <div className="container mx-auto px-4">
            <h2
              className={`text-4xl font-bold text-gray-900 text-center mb-12 animate-fade-in ${montserrat.className}`}
            >
              Nuestros Servicios
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {services.map((service) => {
                const IconComponent = iconMap[service.icon];
                return (
                  <div
                    key={service.id}
                    className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2"
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        priority
                        onError={(e) => {
                          e.currentTarget.src = "/portada.jpg"; // Fallback image
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <div
                        className="mb-3 flex justify-center"
                        style={{ color: logoGreen }}
                      >
                        {IconComponent && (
                          <IconComponent className="text-4xl" />
                        )}
                      </div>
                      <h3
                        className={`text-xl font-bold text-gray-900 mb-3 text-center ${montserrat.className}`}
                      >
                        {service.title}
                      </h3>
                      <p
                        className={`text-gray-600 text-center ${openSans.className}`}
                      >
                        {service.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Salon Showcase Section */}
        <section id="salon" className="py-16 bg-gray-50 animate-fade-in">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Salon Image */}
              <div className="relative">
                <div className="relative w-full h-96 rounded-lg overflow-hidden border-2 border-gray-300">
                  <Image
                    src="/empresas.jpg"
                    alt="Salon showcase"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Salon Content - Split into two sections */}
              <div className="lg:pl-8 space-y-8">
                {/* Top Section - First Salon */}
                <div>
                  <h2
                    className={`text-4xl font-bold text-gray-900 mb-6 ${montserrat.className}`}
                  >
                    {salon.title}
                  </h2>
                  <p
                    className={`text-lg text-gray-600 mb-6 leading-relaxed ${openSans.className}`}
                  >
                    {salon.description}
                  </p>

                  {/* First Location Info */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3
                      className={`text-xl font-semibold text-gray-900 mb-4 ${montserrat.className}`}
                    >
                      {salon.location.city}
                    </h3>
                    <p className={`text-gray-700 mb-2 ${openSans.className}`}>
                      {salon.location.address}
                    </p>
                    <p
                      className={`text-xl font-bold mb-4 ${montserrat.className}`}
                      style={{ color: logoGreen }}
                    >
                      {salon.location.phone}
                    </p>
                    <a
                      href={`https://wa.me/${salon.location.phone.replace(
                        /\s/g,
                        ""
                      )}?text=Hola! Me gustaría agendar una cita en ${
                        salon.location.city
                      }`}
                      className={`inline-block px-6 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity ${openSans.className}`}
                      style={{ backgroundColor: logoGreen }}
                    >
                      {salon.location.ctaText}
                    </a>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-300"></div>

                {/* Bottom Section - Second Salon */}
                <div>
                  {/* Second Location Info */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h4
                      className={`text-xl font-semibold text-gray-900 mb-4 ${montserrat.className}`}
                    >
                      {salonSecond.location.city}
                    </h4>
                    <p className={`text-gray-700 mb-2 ${openSans.className}`}>
                      {salonSecond.location.address}
                    </p>
                    <p
                      className={`text-xl font-bold mb-4 ${montserrat.className}`}
                      style={{ color: logoGreen }}
                    >
                      {salonSecond.location.phone}
                    </p>
                    <a
                      href={`https://wa.me/${salonSecond.location.phone.replace(
                        /\s/g,
                        ""
                      )}?text=Hola! Me gustaría agendar una cita en ${
                        salonSecond.location.city
                      }`}
                      className={`inline-block px-6 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity ${openSans.className}`}
                      style={{ backgroundColor: logoGreen }}
                    >
                      {salonSecond.location.ctaText}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Image Panels Component */}
        <ImagePanels />

        {/* Specialty Info Component */}
        <SpecialtyInfo />

        {/* Features Section */}
        <section id="acerca-de" className="py-16 animate-fade-in">
          <div className="container mx-auto px-4">
            <h2
              className={`text-4xl font-bold text-gray-900 text-center mb-12 ${montserrat.className}`}
            >
              ¿Por Qué Elegirnos?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature) => {
                const IconComponent = iconMap[feature.icon];
                return (
                  <div
                    key={feature.id}
                    className="bg-white p-6 rounded-lg border border-gray-200 text-center transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div
                      className="mb-4 flex justify-center"
                      style={{ color: logoGreen }}
                    >
                      {IconComponent && <IconComponent className="text-5xl" />}
                    </div>
                    <h3
                      className={`text-xl font-bold text-gray-900 mb-3 ${montserrat.className}`}
                    >
                      {feature.title}
                    </h3>
                    <p className={`text-gray-600 ${openSans.className}`}>
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-gray-50 animate-fade-in">
          <div className="container mx-auto px-4">
            <h2
              className={`text-4xl font-bold text-gray-900 text-center mb-12 ${montserrat.className}`}
            >
              Lo Que Dicen Nuestras Clientas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-lg shadow-lg p-8"
                >
                  <div className="flex items-center mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-200 flex items-center justify-center">
                      <Face className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                      <h4
                        className={`text-lg font-semibold text-gray-900 ${montserrat.className}`}
                      >
                        {testimonial.name}
                      </h4>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 text-yellow-400"
                            style={{ fill: "currentColor" }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className={`text-gray-600 italic ${openSans.className}`}>
                    "{testimonial.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          id="contacto"
          className="py-16 text-white text-center animate-fade-in"
          style={{ backgroundColor: logoGreen }}
        >
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className={`text-4xl font-bold mb-4 ${montserrat.className}`}>
              ¿Lista para Transformar tu Cabello?
            </h2>
            <p className={`text-xl mb-8 opacity-90 ${openSans.className}`}>
              Reserva tu cita hoy y experimenta la diferencia que hace el
              cuidado profesional.
            </p>
            <a
              href={hero.ctaLink}
              className={`inline-block bg-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-50 transition-colors duration-300 ${openSans.className}`}
              style={{ color: logoGreen }}
            >
              {hero.ctaText}
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
