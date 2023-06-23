import Image from "next/image";
import { useState, useEffect } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function NavBar() {
  const [showNav, setShowNav] = useState(false);

  const controlNavBar = () => {
    if (window.scrollY > 180) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavBar);
    return () => {
      window.removeEventListener("scroll", controlNavBar);
    };
  }, []);

  return (
    <nav
      className={` bg-white w-full fixed border transition-all duration-300  border-b-1 z-10 border-neutral-200 `}
    >
      <div className="flex  justify-between h-14 items-center max-w-[1200px] mx-auto px-4">
        <h2 className="sm:hidden block">Reserva tu cita</h2>
        <div className="sm:flex gap-2 items-center hidden ">
          <Image
            src="/nav-logo.png"
            width={50}
            height={50}
            alt="logo"
            // priority={true}
            placeholder="blur"
            blurDataURL="/nav-logo.png"
          />
          <div>
            <h1 className="text-xl font-bold font-sans">Rizos Afros Y Más</h1>
            <p className="text-xs text-neutral-500">
              C1 #15 2da Planta, Santiago De Los Caballeros 51000
            </p>
          </div>
        </div>
        <Image
          src="/nav-logo.png"
          width={40}
          height={40}
          alt="logo"
          className=" block sm:hidden"
          // priority={true}
          placeholder="blur"
          blurDataURL="/nav-logo.png"
        />
        <ul className=" hidden sm:flex divide-x-2 justify-around   [&>li]:flex [&>li]:justify-center [&>li]:w-full [&>li]:cursor-pointer  ">
          <li className="group">
            <a href="https://www.instagram.com/rizosafrosymas/">
              <InstagramIcon className="w-10 text-stone-400/90 group-hover:text-stone-700  transition-colors duration-300" />
            </a>
          </li>
          <li className="group">
            <a>
              <WhatsAppIcon className="w-10 text-stone-400/90 group-hover:text-stone-700 transition-colors duration-300" />
            </a>
          </li>
          {/* <li className="group">
            <a>
              <FacebookOutlinedIcon className="w-10 text-stone-400/90 group-hover:text-stone-700 transition-colors duration-300" />
            </a>
          </li>
          <li className="group">
            <a>
              <YouTubeIcon className="w-10 text-stone-400/90 group-hover:text-stone-700 transition-colors duration-300" />
            </a>
          </li> */}
        </ul>
      </div>
    </nav>
  );
}
