import dayjs from "dayjs";
import Image from "next/image";

export default function ContactInfo() {
  const currentDate = dayjs().day();
  const weekDays = [
    { name: "Domingo", hours: "10:00 am - 5:00 pm" },
    { name: "Lunes", hours: "10:00 am - 5:00 pm" },
    { name: "Martes", hours: "10:00 am - 5:00 pm" },
    { name: "Miercoles", hours: "10:00 am - 5:00 pm" },
    { name: "Jueves", hours: "10:00 am - 5:00 pm" },
    { name: "Viernes", hours: "10:00 am - 5:00 pm" },
    { name: "Sabado", hours: "10:00 am - 5:00 pm" },
  ];

  return (
    <aside className="hidden lg:sticky lg:block mt-2 ">
      <h1 className="mb-5">Contact info</h1>
      {/* <Image alt="logo" src="/logo.png" width={300} height={50} /> */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.8615008036595!2d-70.68348999999999!3d19.4615373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eb1c5f56e5de243%3A0x4bace61ecbb84386!2sRizos%2C%20Afros%20y%20M%C3%A1s!5e0!3m2!1ses-419!2sca!4v1686752903734!5m2!1ses-419!2sca"
        width="300"
        height="250"
        styles="border:10;"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <h1 className="py-5">Horas laborables EST</h1>
      <ol className=" w-60 space-y-1">
        {weekDays.map((item, index) => {
          return (
            <li
              className={`${
                currentDate == index ? "font-bold" : ""
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
