import React, { useState } from "react";
import Image from "next/image";
import {
  Menu,
  Close,
  Instagram,
  Facebook,
  WhatsApp,
} from "@mui/icons-material";
import { landingPageData } from "../data/landingContent";

export default function Navigation({ isMobileMenuOpen, toggleMobileMenu }) {
  const { navigation, socialMedia, colorScheme } = landingPageData;
  const logoGreen = colorScheme.logoGreen;

  return (
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
                  <Close className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex-shrink-0">
              <Image
                src="/nav-logo.png"
                alt="Navigation Logo"
                width={200}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </div>
          </div>

          {/* Center - Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.menuItems.map((item, index) => (
              <button
                key={index}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-300"
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
            {/* <a
              href={`https://wa.me/${socialMedia.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-600 transition-colors duration-300"
            >
              <WhatsApp className="h-6 w-6" />
            </a> */}
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <div
          className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? "max-h-64 opacity-100 pb-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-gray-50 rounded-lg mt-4 py-2">
            {navigation.menuItems.map((item, index) => (
              <button
                key={index}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-300"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
