import React from "react";
import Image from "next/image";
import { BookOnline } from "@mui/icons-material";

export default function ImagePanels() {
  return (
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
            alt="Portada del salón"
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
  );
}
