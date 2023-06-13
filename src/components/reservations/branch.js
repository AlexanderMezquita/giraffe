import Image from "next/image";
import Loading from "../globals/loading";
import { useFormContext } from "react-hook-form";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Branch({ handleNext }) {
  const { setValue } = useFormContext();
  const services = [
    {
      img: "",
      name: "Sucursal 1",
      price: "direccion 1",
    },
    {
      img: "",
      name: "Sucursal 2",
      price: "direccion 2",
    },
  ];

  const handleBranch = (value) => {
    setValue("branch", value);
    handleNext();
  };

  return (
    <>
      {false ? (
        <Loading />
      ) : (
        <section className="  md:max-h-[500px]">
          <h2 onClick={handleNext} className="p-3">
            Sucursales
          </h2>
          <ul>
            {services.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={() => handleBranch(item.name)}
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
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </>
  );
}
