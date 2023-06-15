import * as React from "react";
import Image from "next/image";
import Loading from "../globals/loading";
import { useFormContext } from "react-hook-form";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { formatCurrency } from "@/utils/methods";

export default function Services({ handleNext }) {
  const services = [
    {
      img: "image1.jpg",
      name: "Haircut Deluxe",
      price: 15000,
    },
    {
      img: "image2.jpg",
      name: "Beard Trim",
      price: 18000,
    },
    {
      img: "image3.jpg",
      name: "Color Highlights",
      price: 20000,
    },
    {
      img: "image4.jpg",
      name: "Shampoo and Blowout",
      price: 12000,
    },
    {
      img: "image5.jpg",
      name: "Hair Styling",
      price: 16000,
    },
    {
      img: "image6.jpg",
      name: "Deep Conditioning Treatment",
      price: 13500,
    },
    {
      img: "image7.jpg",
      name: "Head Massage",
      price: 17000,
    },
    {
      img: "image8.jpg",
      name: "Hair Extensions",
      price: 14000,
    },
    {
      img: "image9.jpg",
      name: "Straightening or Perming",
      price: 15500,
    },
    {
      img: "image10.jpg",
      name: "Updo or Bridal Hairstyle",
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
                    className="flex items-center justify-between gap-2 hover:bg-tertiary/50 cursor-pointer p-2  "
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
                        <h2 className=" font-semibold font-sans text-lg ">
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
