import Image from "next/image";
import * as React from "react";
import Loading from "../globals/loading";
import { useFormContext } from "react-hook-form";
import { IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AlertDialog from "../globals/dialogs/dialog";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/axios";
import ReloadMessage from "../globals/reloadMessage";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EmptyMessage from "../globals/emptyMessage";

export default function Branch({ handleNext }) {
  const [open, setOpen] = React.useState(false);
  const [activeBranch, setActiveBranch] = React.useState({});
  const { axiosInstance } = useAxios();

  const noBranches =
    "Parece que no hay sucursales disponibles en este momento, vuelve a intentarlo más tarde.";

  const handleClickOpen = (item) => {
    setActiveBranch(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { setValue } = useFormContext();

  const {
    data: getBranches,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getBranchesIndex"],
    queryFn: () => {
      return axiosInstance.get(`/branches?Page=${1}&Limit=${10}`);
    },
    staleTime: 3000,
  });

  const handleBranch = (value) => {
    setValue("branch.name", value.name);
    setValue("branch.id", value.id);
    handleNext();
  };

  const branches = getBranches?.data?.data
    .filter((b) => b.status !== "Desactivado")
    .map((item, index) => {
      return (
        <li
          key={index}
          className="flex items-center justify-between gap-2 hover:bg-tertiary/50 transition-all duration-300 cursor-pointer px-5 py-2  "
        >
          <div
            className=" flex-1 flex flex-col justify-around "
            onClick={() => handleBranch(item)}
          >
            <h2 className="font-semibold font-sans ">{item.name}</h2>
            <p className="text-sm text-neutral-500">{item.address}</p>
          </div>
          {/* </div> */}
          <IconButton
            aria-label="delete"
            className="z-10 text-neutral-400/70"
            size="large"
            // onClick={() => handleClickOpen(item)}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </li>
      );
    });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ReloadMessage />
      ) : (
        <section className="  md:max-h-[500px]">
          <h2 className="py-3 px-5">Sucursales</h2>
          {branches.length === 0 ? (
            <EmptyMessage message={noBranches} />
          ) : (
            <ul>{branches}</ul>
          )}
          <AlertDialog
            open={open}
            handleClose={handleClose}
            activeBranch={activeBranch}
          />
        </section>
      )}
    </>
  );
}
