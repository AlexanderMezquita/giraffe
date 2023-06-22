import * as React from "react";
import Image from "next/image";
import Loading from "../globals/loading";
import { useFormContext } from "react-hook-form";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { formatCurrency } from "@/utils/methods";

export default function Services({ handleNext }) {
  const services = [
    {
      img: "imagen1.jpg",
      name: "Corte de pelo Deluxe",
      price: 15000,
    },
    {
      img: "imagen2.jpg",
      name: "Recorte de barba",
      price: 18000,
    },
    {
      img: "imagen3.jpg",
      name: "Reflejos de color",
      price: 20000,
    },
    {
      img: "imagen4.jpg",
      name: "Lavado y secado",
      price: 12000,
    },
    {
      img: "imagen5.jpg",
      name: "Peinado",
      price: 16000,
    },
    {
      img: "imagen6.jpg",
      name: "Tratamiento de acondicionamiento profundo",
      price: 13500,
    },
    {
      img: "imagen7.jpg",
      name: "Masaje de cabeza",
      price: 17000,
    },
    {
      img: "imagen8.jpg",
      name: "Extensiones de cabello",
      price: 14000,
    },
    {
      img: "imagen9.jpg",
      name: "Alisado o rizado",
      price: 15500,
    },
    {
      img: "imagen10.jpg",
      name: "Peinado recogido o para novias",
      price: 19000,
    },
  ];

  const { setValue } = useFormContext();

  const handleService = (value) => {
    setValue("service", value.name);
    setValue("price", value.price);
    handleNext();
  };

  return (
    <>
      {false ? (
        <Loading />
      ) : (
        <React.Fragment>
          <section className="  ">
            <h2 onClick={handleNext} className="p-3">
              Servicios
            </h2>
            <ul>
              {services.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => handleService(item)}
                    className="flex items-center justify-between gap-2 hover:bg-tertiary/50 transition-all duration-300 cursor-pointer p-2  "
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        width={60}
                        height={40}
                        src="/test.jpg"
                        alt={item.name}
                        className="rounded-full border-4 border-secondary object-cover w-[60px] h-[60px]"
                        priority={true}
                        placeholder="blur"
                        blurDataURL="/test.jpg"
                      />
                      <div className=" flex flex-col justify-around ">
                        <h2 className=" font-semibold font-sans ">
                          {item.name}
                        </h2>
                        <p className=" text-neutral-500">
                          {formatCurrency(item.price)}
                        </p>
                      </div>
                    </div>
                    <ArrowForwardIosIcon className="text-sm text-neutral-400" />
                  </li>
                );
              })}
            </ul>
          </section>
        </React.Fragment>
      )}
    </>
  );
}
