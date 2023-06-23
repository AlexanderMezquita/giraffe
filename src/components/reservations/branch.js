import Image from "next/image";
import Loading from "../globals/loading";
import { useFormContext } from "react-hook-form";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Branch({ handleNext }) {
  const { setValue } = useFormContext();
  const services = [
    {
      img: "",
      name: "Los Cerros de Gurabo",
      address: "C1 #15 2da Planta, Santiago De Los Caballeros 51000",
    },
    {
      img: "",
      name: "Sucursal Beller",
      address: "C. Beller 101, Santiago De Los Caballeros 51000",
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
          <h2 onClick={handleNext} className="py-3 px-5">
            Sucursales
          </h2>
          <ul>
            {services.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={() => handleBranch(item.name)}
                  className="flex items-center justify-between gap-2 hover:bg-tertiary/50 transition-all duration-300 cursor-pointer px-5 py-2  "
                >
                  <div className="flex items-center gap-2">
                    <Image
                      width={60}
                      height={40}
                      src="/test.jpg"
                      priority={true}
                      placeholder="blur"
                      blurDataURL="/test.jpg"
                      alt={item.name}
                      className="rounded-full border-4 border-secondary object-cover w-[60px] h-[60px]"
                    />
                    <div className=" flex flex-col justify-around ">
                      <h2 className="font-semibold font-sans ">{item.name}</h2>
                      <p className="text-sm text-neutral-500">{item.address}</p>
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
