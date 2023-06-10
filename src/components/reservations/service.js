import Image from "next/image";
import Loading from "../globals/loading";

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

  return (
    <>
      {false ? (
        <Loading />
      ) : (
        <section className=" overflow-y-auto max-h-[500px]">
          <h2 onClick={handleNext} className="p-2">
            Servicios
          </h2>
          {services.map((item, index) => {
            return (
              <div
                key={index}
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
                    <p className="text-sm text-neutral-500">${item.price}</p>
                  </div>
                </div>
                <ArrowForwardIosIcon className="text-sm text-neutral-400" />
              </div>
            );
          })}
        </section>
      )}
    </>
  );
}
