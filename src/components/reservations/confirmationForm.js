import Image from "next/image";
import * as React from "react";
import Loading from "../globals/loading";
import { useFormContext } from "react-hook-form";
import { IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AlertDialog from "../globals/dialogs/dialog";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/axios";
import ReloadMessage from "../globals/reload-message";
import EmptyMessage from "../globals/empty-message";

export default function ConfirmationForm() {
  const { axiosInstance } = useAxios();

  const { setValue } = useFormContext();

  const cita = {
    startDate: "2024-03-11T12:00:00",
    name: "Alexander Mezquita",
    service: { name: "Coca Cola" },
    branch: { name: "Gurabo" },
  };

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
      <h2 className="p-4">Tu cita se ha creado con éxito</h2>
      <div className=" px-4 space-y-3">
        <p>
          Servicio: <span className=" text-gray-400">{cita.service.name}</span>
        </p>
        <p>
          Dia y hora: <span className=" text-gray-400">{cita.startDate}</span>
        </p>
        <p>ID de la cita: </p>
      </div>
    </section>
  );
}
