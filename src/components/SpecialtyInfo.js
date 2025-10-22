import React from "react";
import { Montserrat, Open_Sans } from "next/font/google";
import { landingPageData } from "../data/landingContent";

const montserrat = Montserrat({ subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ["latin"] });

export default function SpecialtyInfo() {
  const { specialtyInfo, colorScheme } = landingPageData;

  return (
    <section className="py-14 bg-white animate-fade-in">
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
      </div>
    </section>
  );
}
