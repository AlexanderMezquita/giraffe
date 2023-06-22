import dayjs from "dayjs";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

export default function ContactInfo() {
  const currentDate = dayjs().day();
  const weekDays = [
    { name: "Dom", hours: "Cerrado" },
    { name: "Lun", hours: "9:00 am - 5:00 pm" },
    { name: "Mar", hours: "9:00 am - 5:00 pm" },
    { name: "Mié", hours: "9:00 am - 5:00 pm" },
    { name: "Jue", hours: "9:00 am - 5:00 pm" },
    { name: "Vie", hours: "9:00 am - 5:00 pm" },
    { name: "Sáb", hours: "9:00 am - 1:00 pm" },
  ];

  return (
    <aside className="hidden lg:sticky lg:block mt-2 ">
      <h2 className="mb-5">Información de contacto</h2>
      {/* <Image alt="logo" src="/logo.png" width={300} height={50} /> */}

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.8615008036595!2d-70.68348999999999!3d19.4615373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eb1c5f56e5de243%3A0x4bace61ecbb84386!2sRizos%2C%20Afros%20y%20M%C3%A1s!5e0!3m2!1ses-419!2sca!4v1686752903734!5m2!1ses-419!2sca"
        width="230"
        height="200"
        styles="border:10;"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className=" group hover:cursor-pointer mt-5 ">
        <a
          href="https://goo.gl/maps/VFsVqG4hSyBm9WGf8"
          target="blank_"
          className="flex items-center w-56 gap-3"
        >
          <LocationOnIcon className="text-neutral-500 group-hover:text-blue-600" />
          <p className=" text-blue-500 group-hover:text-blue-600">
            C1 #15 2da Planta, Santiago De Los Caballeros 51000, República
            Dominicana
          </p>
        </a>
      </div>
      <div className=" group hover:cursor-pointer mt-5 ">
        <a
          href="tel:8092142028"
          target="blank_"
          className="flex items-center w-64 gap-3"
        >
          <LocalPhoneIcon className="text-neutral-500 group-hover:text-blue-600" />
          <p className=" text-blue-500 group-hover:text-blue-600">
            +1 809 241 2028
          </p>
        </a>
      </div>
      <h2 className="py-5">Horas laborables EST</h2>
      <ol className=" w-48 space-y-2 text-neutral-600">
        {weekDays.map((item, index) => {
          return (
            <li
              className={`${
                currentDate == index ? "font-bold text-neutral-700" : ""
              } flex justify-between `}
              key={item.name}
            >
              <p>{item.name}</p>
              <p>{item.hours}</p>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
