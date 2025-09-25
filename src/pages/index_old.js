import React, { useState } from "react";
import Image from "next/image";
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

  return (
    <div className="scroll-smooth transition-all duration-500 ease-out pt-0 md:pt-18">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 p-0 fixed top-0 left-0 right-0 z-50">
        <div className="px-4 md:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Left side - Logo and Mobile menu button */}
            <div className="flex items-center">
              {/* Mobile menu button */}
              <div className="md:hidden mr-4">
                <button
                  onClick={toggleMobileMenu}
                  className={`text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition-all duration-300 transform hover:scale-110 ${
                    isMobileMenuOpen ? "rotate-90" : "rotate-0"
                  }`}
                >
                  {isMobileMenuOpen ? (
                    <svg
                      className="h-6 w-6 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-6 w-6 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* Brand Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Image
                  src="/nav-logo.png"
                  alt={navigation.logo}
                  width={160}
                  height={50}
                  className="h-12 w-auto block"
                  priority
                />
              </div>
            </div>

            {/* Center - Desktop navigation menu */}
            <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
              {navigation.menuItems.map((item) => (
                <button
                  key={item}
                  className={`text-gray-700 hover:text-gray-900 font-medium text-base transition-colors ${openSans.className}`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Right side - Social Media Icons */}
            <div className="flex items-center space-x-4">
              <a
                href={socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-600 transition-colors duration-300"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href={socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 transition-colors duration-300"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href={`https://wa.me/${socialMedia.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-600 transition-colors duration-300"
              >
                <WhatsApp className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Mobile menu dropdown */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-500 ease-out transform ${
              isMobileMenuOpen
                ? "max-h-64 opacity-100 translate-y-0"
                : "max-h-0 opacity-0 -translate-y-4"
            }`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-xl rounded-b-lg border-t border-gray-100">
              {navigation.menuItems.map((item, index) => (
                <button
                  key={item}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-gray-700 hover:text-gray-900 hover:bg-gray-50 block px-4 py-3 text-base font-medium w-full text-left rounded-lg transition-all duration-300 transform hover:translate-x-2 hover:scale-105 ${openSans.className}`}
                  style={{
                    animationDelay: isMobileMenuOpen ? `${index * 0.1}s` : "0s",
                    transform: isMobileMenuOpen
                      ? "translateX(0)"
                      : "translateX(-20px)",
                    opacity: isMobileMenuOpen ? 1 : 0,
                    transition: `all 0.3s ease-out ${index * 0.1}s`,
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Beautiful Curls Hero Section - Moved under navbar */}
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
                  width={280}
                  height={110}
                  className="h-20 md:h-24 w-auto"
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
                  src="/productos.jpg"
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

      {/* Divider */}
      <div className="border-b border-gray-200"></div>

      {/* Hero Section */}
      <section className="min-h-[60vh] flex flex-col justify-center items-center bg-gray-50 relative text-center py-16 pb-24 animate-fade-in">
        <div className="container mx-auto px-4 relative z-10">
          <p
            className={`text-gray-800 mb-4 text-base font-medium animate-fade-in ${openSans.className}`}
          >
            {hero.announcement}
          </p>

          <h1
            className={`font-bold text-gray-900 mb-6 text-4xl md:text-6xl leading-tight animate-fade-in ${montserrat.className}`}
          >
            {hero.title}
          </h1>

          <p
            className={`text-gray-800 mb-8 text-xl font-normal tracking-wide animate-fade-in ${openSans.className}`}
          >
            {hero.subtitle}
          </p>

          {/* WhatsApp Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            {whatsappButtons.map((button) => (
              <a
                key={button.id}
                href={`https://wa.me/${button.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-300 ${openSans.className}`}
                style={{ backgroundColor: logoGreen }}
              >
                <WhatsApp className="h-5 w-5" />
                {button.text}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Image Panels Section */}
      <div className="h-[40rem] sm:h-[32rem] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 h-full">
          <div className="h-full bg-cover bg-center relative overflow-hidden group cursor-pointer">
            <Image
              src="/indhira.jpg"
              alt="Indhira - Estilista profesional"
              fill
              className="object-cover object-center md:object-top lg:object-center transition-transform duration-500 group-hover:scale-110"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          </div>

          <div className="h-full bg-cover bg-center relative overflow-hidden group cursor-pointer">
            <Image
              src="/naili.jpg"
              alt="Naili - Especialista en rizos"
              fill
              className="object-cover object-center md:object-top lg:object-center transition-transform duration-500 group-hover:scale-110"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          </div>

          <div className="h-full bg-cover bg-center relative overflow-hidden group cursor-pointer">
            <Image
              src="/rossaly.jpg"
              alt="Rossaly - Tratamientos capilares"
              fill
              className="object-cover object-center md:object-top lg:object-center transition-transform duration-500 group-hover:scale-110"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute bottom-5 right-5 bg-amber-800 bg-opacity-90 text-white px-4 py-2 rounded-full text-sm flex items-center gap-1">
              <BookOnline className="text-sm" /> Reservar Ahora
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
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
            {specialtyInfo.features.map((feature) => {
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
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-orange-50">
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
                  <div
                    className="h-48 flex items-center justify-center relative"
                    style={{ backgroundColor: logoGreen }}
                  >
                    {service.id === 1 ? (
                      <Image
                        src="/productos.jpg"
                        alt="Cuidado Capilar Natural"
                        fill
                        className="object-cover"
                        priority
                      />
                    ) : service.id === 2 ? (
                      <Image
                        src="/peinado.jpg"
                        alt="Servicios de Peinado"
                        fill
                        className="object-cover object-[50%_70%]"
                        priority
                      />
                    ) : service.id === 3 ? (
                      <Image
                        src="/aceite.jpg"
                        alt="Tratamientos Capilares"
                        fill
                        className="object-cover"
                        priority
                      />
                    ) : service.id === 4 ? (
                      <Image
                        src="/consulta.jpg"
                        alt="Consulta"
                        fill
                        className="object-cover"
                        priority
                      />
                    ) : (
                      IconComponent && (
                        <IconComponent className="text-white text-5xl" />
                      )
                    )}
                  </div>
                  <div className="p-6 flex-grow">
                    <h3
                      className={`text-lg font-semibold mb-2 ${montserrat.className}`}
                    >
                      {service.title}
                    </h3>
                    <p
                      className={`text-gray-600 text-sm ${openSans.className}`}
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
      <section className="py-16 bg-gray-50 animate-fade-in">
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
      {/* Features Section */}
      <section className="py-16 animate-fade-in">
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
                    className={`text-xl font-semibold mb-2 ${montserrat.className}`}
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
      <section className="py-16 bg-orange-50 animate-fade-in">
        <div className="container mx-auto px-4">
          <h2
            className={`text-4xl font-bold text-gray-900 text-center mb-12 ${montserrat.className}`}
          >
            Lo Que Dicen Nuestros Clientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <div className="flex items-center mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-4"
                    style={{ backgroundColor: logoGreen }}
                  >
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className={`font-bold text-lg ${montserrat.className}`}>
                      {testimonial.name}
                    </h4>
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="text-sm" />
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
        className="py-16 text-white text-center animate-fade-in"
        style={{ backgroundColor: logoGreen }}
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className={`text-4xl font-bold mb-4 ${montserrat.className}`}>
            ¿Lista para Transformar tu Cabello?
          </h2>
          <p className={`text-xl mb-8 opacity-90 ${openSans.className}`}>
            Reserva tu cita hoy y experimenta la diferencia que hace el cuidado
            profesional.
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
  );
}
