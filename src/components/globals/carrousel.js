import { Dialog } from "@mui/material";
import React from "react";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { useState } from "react";

export default function Carrousel({ children: slides, handleClose, open }) {
  const [curr, setCurr] = useState(0);
  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  return (
    <Dialog onClose={handleClose} open={open}>
      <div className="overflow-hidden relative">
        <div
          className=" flex transition-transform ease-out duration-500"
          style={{ transform: `translateX(-${curr * 100}%)` }}
        >
          {slides}
        </div>
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button
            onClick={prev}
            className="p-1 rounded-full shadow-sm border border-white  bg-zinc-700 bg-opacity-20  text-white hover:bg-zinc-800 transition-transform transform hover:scale-110"
          >
            <ChevronLeft size={40} />
          </button>
          <button
            onClick={next}
            className="p-1 rounded-full shadow-sm border border-white bg-zinc-700 bg-opacity-20  text-white hover:bg-zinc-800 transition-transform transform hover:scale-110"
          >
            <ChevronRight size={40} />
          </button>
        </div>

        <div className="absolute bottom-4 right-0 left-0">
          <div className="flex items-center justify-center  ">
            <div className="flex items-center justify-center gap-2 border border-white bg-zinc-700 rounded-full p-2 bg-opacity-80">
              {slides?.map((_, i) => (
                <div
                  key={i}
                  className={`
              transition-all   shadow-lg w-2 h-2 bg-white rounded-full
              ${curr === i ? "p-1.5" : "bg-opacity-50"}
            `}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
