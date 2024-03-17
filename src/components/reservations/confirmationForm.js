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
    <section className="  md:max-h-[500px]">
      <h2 className="py-3 px-5">Sucursales</h2>
    </section>
  );
}
