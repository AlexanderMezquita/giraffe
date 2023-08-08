import Image from "next/image";
import * as React from "react";
import Loading from "../globals/loading";
import { useFormContext } from "react-hook-form";
import { IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AlertDialog from "../globals/dialog";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/axios";

export default function Branch({ handleNext }) {
  const [open, setOpen] = React.useState(false);
  const [activeBranch, setActiveBranch] = React.useState({});
  const { axiosInstance } = useAxios();

  const handleClickOpen = (item) => {
    setActiveBranch(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { setValue } = useFormContext();

  const getBranches = useQuery({
    queryKey: ["branches"],
    queryFn: () => {
      return axiosInstance.get(`/branches?Page=${1}&Limit=${10}`);
    },
  });
  const services = [
    {
      img: "",
      name: "Cerros de Gurabo",
      address: "C1 #15 2da Planta, Santiago De Los Caballeros 51000",
      phone: "8093219082",
    },
    {
      img: "",
      name: "Sucursal Beller",
      address: "C. Beller 101, Santiago De Los Caballeros 51000",
      phone: "8191230000",
    },
  ];

  const handleBranch = (value) => {
    setValue("branch", value.name);
    setValue("branchId", value.id);
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
            {getBranches.data?.data?.data
              .filter((b) => b.status !== "Desactivado")
              .map((item, index) => {
                return (
                  <li
                    key={index}
                    className="flex items-center justify-between gap-2 hover:bg-tertiary/50 transition-all duration-300 cursor-pointer px-5 py-2  "
                  >
                    {/* <div className="flex items-center gap-2">
                    <Image
                      width={60}
                      height={40}
                      src="/test.jpg"
                      priority={true}
                      placeholder="blur"
                      blurDataURL="/test.jpg"
                      alt={item.name}
                      className="rounded-full border-4 border-secondary object-cover w-[60px] h-[60px]"
                    /> */}
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
                      onClick={() => handleClickOpen(item)}
                    >
                      <InfoIcon />
                    </IconButton>
                  </li>
                );
              })}
          </ul>
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
