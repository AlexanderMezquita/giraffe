import React from 'react';
import { WhatsApp } from '@mui/icons-material';
import { Montserrat, Open_Sans } from 'next/font/google';
import { landingPageData } from '../data/landingContent';

const montserrat = Montserrat({ subsets: ['latin'] });
const openSans = Open_Sans({ subsets: ['latin'] });

export default function HeroSection() {
  const { hero, whatsappButtons, colorScheme } = landingPageData;
  const logoGreen = colorScheme.logoGreen;

  return (
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
  );
}