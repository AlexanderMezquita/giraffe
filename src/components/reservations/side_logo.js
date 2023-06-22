import Image from "next/image";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import dayjs from "dayjs";

export default function SideLogo() {
  const currentDate = dayjs().day();
  const weekDays = [
    { name: "Domingo", hours: "10:00 am - 5:00 pm" },
    { name: "Lunes", hours: "10:00 am - 5:00 pm" },
    { name: "Martes", hours: "10:00 am - 5:00 pm" },
    { name: "Miércoles", hours: "10:00 am - 5:00 pm" },
    { name: "Jueves", hours: "10:00 am - 5:00 pm" },
    { name: "Viernes", hours: "10:00 am - 5:00 pm" },
    { name: "Sábado", hours: "10:00 am - 5:00 pm" },
  ];

  return (
    <aside className="hidden lg:block mt-2 ">
      <Image
        alt="logo"
        src="/brand.png"
        // priority={true}
        placeholder="blur"
        blurDataURL="/brand.png"
        width={250}
        height={50}
      />
      <h1 className="text-center brand-name" id="brand">
        Rizos, Afros Y Mas
      </h1>

      <ul className="flex divide-x-2 justify-around mt-5  [&>li]:flex [&>li]:justify-center [&>li]:w-full [&>li]:cursor-pointer  ">
        <li className="group">
          <a href="#">
            <InstagramIcon className="w-10 text-stone-400/90 group-hover:text-stone-700  transition-colors duration-300" />
          </a>
        </li>
        <li className="group">
          <a>
            <WhatsAppIcon className="w-10 text-stone-400/90 group-hover:text-stone-700 transition-colors duration-300" />
          </a>
        </li>
        <li className="group">
          <a>
            <FacebookOutlinedIcon className="w-10 text-stone-400/90 group-hover:text-stone-700 transition-colors duration-300" />
          </a>
        </li>
        <li className="group">
          <a>
            <YouTubeIcon className="w-10 text-stone-400/90 group-hover:text-stone-700 transition-colors duration-300" />
          </a>
        </li>
      </ul>
    </aside>
  );
}
