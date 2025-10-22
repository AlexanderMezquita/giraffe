import Image from "next/image";
import * as React from "react";
import Loading from "../globals/loading";
import { useFormContext } from "react-hook-form";
import { duration, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AlertDialog from "../globals/dialogs/dialog";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/axios";
import ReloadMessage from "../globals/reloadMessage";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button } from "@mui/material";

import EmptyMessage from "../globals/emptyMessage";
import dayjs from "dayjs";

export default function ConfirmationForm() {
  const { axiosInstance } = useAxios();

  const { setValue, getValues } = useFormContext();

  const cita = getValues();

  //   const {
  //     data: getBranches,
  //     isLoading,
  //     isError,
  //   } = useQuery({
  //     queryKey: ["getBranchesIndex"],
  //     queryFn: () => {
  //       return axiosInstance.get(`/branches?Page=${1}&Limit=${10}`);
  //     },
  //     staleTime: 3000,
  //   });

  return (
    <section className="p-5 grid  justify-items-center gap-4">
      <div className="flex h-14 items-center  mx-auto ">
        <Image
          src="/nav-logo.png"
          width={40}
          height={40}
          alt="logo"
          // priority={true}
          placeholder="blur"
          blurDataURL="/nav-logo.png"
        />
        <h1 className="text-xl font-bold font-sans">Rizos Afros Y Más</h1>
      </div>
      <div className="p-4 text-center">
        <h2>Hola {cita.name}, tu solicitud para la cita ha sido confirmada!</h2>
        <p>Te enviaremos un email o sms confirmando tu cita.</p>
      </div>

      <div className=" bg-gray-50 border-2 rounded-lg w-full sm:w-80 p-5  space-y-3">
        <h2 className="p-3">Detalles de la cita</h2>
        <p>Servicio:</p>
        <p className=" text-gray-400">{cita.service.name}</p>
        <p>Dia y hora:</p>
        <p className=" text-gray-400">
          {dayjs(cita.date).format("LL")} a las {cita.time}
        </p>
        <p>Sucursal:</p>
        <p className=" text-gray-400">{cita.branch.name}</p>
        <p>Duración (aproximadamente): </p>
        <p className=" text-gray-400">{cita.service.duration}</p>
        <p>Comentario: </p>
        <p className=" text-gray-400">{cita.comment}</p>
      </div>

      <div className=" bg-gray-50 border-2 rounded-lg w-full sm:w-80 p-5 space-y-3">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.8615008036595!2d-70.68348999999999!3d19.4615373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eb1c5f56e5de243%3A0x4bace61ecbb84386!2sRizos%2C%20Afros%20y%20M%C3%A1s!5e0!3m2!1ses-419!2sca!4v1686752903734!5m2!1ses-419!2sca"
          width="100%"
          height="180"
          style={{ borderRadius: "20px 20px 0px 0px", alignContent: "center" }}
          styles="border:10;"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <h2>Cerros de Gurabo</h2>
        <div className=" group hover:cursor-pointer mt-5 ">
          <a
            href="https://goo.gl/maps/VFsVqG4hSyBm9WGf8"
            target="blank_"
            className="flex items-center  gap-3"
          >
            <LocationOnIcon className="text-neutral-500 group-hover:text-blue-600" />
            <p className=" text-blue-500 group-hover:text-blue-600 group-hover:underline">
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
            <p className=" text-blue-500 group-hover:text-blue-600 group-hover:underline">
              +1 809 806 3040
            </p>
          </a>
        </div>
      </div>
      <div className=" bg-gray-50 border-2 rounded-lg w-full sm:w-80 p-5 space-y-3">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.1669702807894!2d-70.69966582570521!3d19.44836664017896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eb1cf9de9a5e611%3A0xb122144d33642ef!2sRizos%20Afros%20y%20M%C3%A1s!5e0!3m2!1sen!2sca!4v1730425697953!5m2!1sen!2sca"
          width="100%"
          height="180"
          style={{ borderRadius: "20px 20px 0px 0px", alignContent: "center" }}
          styles="border:10;"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <h2>Sucursal Los Pepines</h2>
        <div className=" group hover:cursor-pointer mt-5 ">
          <a
            href="https://goo.gl/maps/VFsVqG4hSyBm9WGf8"
            target="blank_"
            className="flex items-center  gap-3"
          >
            <LocationOnIcon className="text-neutral-500 group-hover:text-blue-600" />
            <p className=" text-blue-500 group-hover:text-blue-600 group-hover:underline">
              Calle RC, C. R. Tolentino 47, Santiago de los Caballeros 51000,
              Republica Dominicana
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
            <p className=" text-blue-500 group-hover:text-blue-600 group-hover:underline">
              +1 809 626 0101
            </p>
          </a>
        </div>
      </div>
      <Button variant="contained" color="primary" href="/citas">
        Crear otra cita
      </Button>
    </section>
  );
}
