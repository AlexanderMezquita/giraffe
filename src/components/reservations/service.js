import * as React from "react";
import Image from "next/image";
import Loading from "../globals/loading";
import { useFormContext } from "react-hook-form";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Services({ handleNext }) {
  const services = [
    {
      img: "",
      name: "Haricut",
      price: 15000,
    },
    {
      img: "",
      name: "Haricut",
      price: 15000,
    },
    {
      img: "",
      name: "Haricut",
      price: 15000,
    },
    {
      img: "",
      name: "Haricut",
      price: 15000,
    },
    {
      img: "",
      name: "Haricut",
      price: 15000,
    },
    {
      img: "",
      name: "Haricut",
      price: 15000,
    },
    {
      img: "",
      name: "Haricut",
      price: 15000,
    },
    {
      img: "",
      name: "Haricut",
      price: 15000,
    },
    {
      img: "",
      name: "Haricut",
      price: 15000,
    },
    {
      img: "",
      name: "Haricut",
      price: 15000,
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
                    className="flex items-center justify-between gap-2 hover:bg-secondary/50 cursor-pointer p-2  "
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        width={60}
                        height={40}
                        src="/test.jpg"
                        priority
                        alt={item.name}
                        className="rounded-full border-4 border-secondary object-cover"
                      />
                      <div className=" flex flex-col justify-around ">
                        <h2 className="font-bold ">{item.name}</h2>
                        <p className="text-sm text-neutral-500">
                          ${item.price}
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
