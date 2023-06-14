import dayjs from "dayjs";
import Image from "next/image";

export default function ContactInfo() {
  const currentDate = dayjs().day();
  const weekDays = [
    { name: "Domingo" },
    { name: "Lunes" },
    { name: "Martes" },
    { name: "Miercoles" },
    { name: "Jueves" },
    { name: "Viernes" },
    { name: "Sabado" },
  ];

  return (
    <aside className="hidden lg:block mt-2 ">
      <h1 className="mb-5">Contact info</h1>
      {/* <Image alt="logo" src="/logo.png" width={300} height={50} /> */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.8615012253545!2d-70.68606492545786!3d19.46153728182405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eb1c5f56e5de243%3A0x4bace61ecbb84386!2sRizos%2C%20Afros%20y%20M%C3%A1s!5e0!3m2!1sen!2sca!4v1686712183533!5m2!1sen!2sca"
        width="300"
        height="250"
        styles="border:10;"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <h1 className="py-5">Horas laborables EST</h1>
      <ol>
        {weekDays.map((item, index) => {
          return (
            <li
              className={`${currentDate == index ? "font-bold" : ""} `}
              key={item.name}
            >
              {item.name}
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
