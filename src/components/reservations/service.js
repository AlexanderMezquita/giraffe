import * as React from "react";
import Loading from "../globals/loading";
import { useFormContext } from "react-hook-form";
import { formatCurrency } from "@/utils/methods";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/axios";
import { formatTime } from "@/utils/methods";
import EmptyMessage from "../globals/empty-message";
import Button from "@mui/material/Button";
import Carrousel from "../globals/carrousel";
import ReloadMessage from "../globals/reload-message";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";

export default function Services({ handleNext }) {
  const { setValue } = useFormContext();
  const { axiosInstance } = useAxios();
  const [open, setOpen] = React.useState(false);
  const [images, setImages] = React.useState([]);

  const handleImages = (imgs) => {
    setImages(imgs);
    setOpen((prevState) => !prevState);
  };
  const noServices =
    "Parece que no hay servicios disponibles en este momento, vuelve a intentarlo más tarde.";

  const handleService = (item) => {
    setValue("service.name", item.name);
    setValue("service.id", item.id);
    handleNext();
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const {
    data: getServices,
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["getServicesIndex"],
    queryFn: () => {
      return axiosInstance.get(`/services?Page=${1}&Limit=${50}`);
    },
    staleTime: 3000,
  });

  const services = getServices?.data?.data
    .filter((s) => s.status !== "Desactivado")
    .map((item, index) => {
      // console.log(item.img.length);
      return (
        <li
          key={index}
          className="flex sm:flex-row flex-col-reverse items-center justify-center sm:items-start sm:justify-normal  gap-4 p-5 border m-4  "
        >
          {item.img.length > 0 ? (
            <div className="relative flex-shrink-0">
              {item.img.length > 1 ? (
                <ViewCarouselIcon
                  style={{ fill: "#FCFCFC", textShadow: "10px 10px" }}
                  className=" absolute right-5 top-5 bg-black bg-opacity-20 rounded-md"
                />
              ) : (
                ""
              )}
              <img
                src={item.img[0]}
                loading="lazy"
                alt={item.name[0]}
                onClick={() => handleImages(item.img)}
                className={` rounded-md border-black sm:object-cover max-h-72 sm:w-48 sm:h-52 cursor-pointer`}
              />
            </div>
          ) : (
            ""
          )}
          <div className="flex flex-col grow w-full sm:w-auto sm:flex-grow gap-4">
            <div className=" flex  justify-between w-full">
              <div>
                <h2 className=" font-semibold font-sans ">{item.name}</h2>
                <p className=" text-neutral-500">
                  DOP {formatCurrency(item.price)}
                </p>
              </div>
              <div>
                {item.callRequired ? (
                  ""
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => handleService(item)}
                  >
                    Reservar
                  </Button>
                )}
              </div>
            </div>
            <div className="  text-neutral-500 space-y-2">
              {item.description ? <p>{item.description}</p> : null}
              {item.estimatedTime ? (
                <p>Tiempo estimado: {formatTime(item.estimatedTime)}</p>
              ) : null}
              {!item.callRequired ? (
                ""
              ) : (
                <p>
                  Para hacer una cita con este servicio es requerido escribir
                  por el whatsapp o hacer una llamada al telefono de la sucursal
                </p>
              )}
            </div>
          </div>
        </li>
      );
    });

  return (
    <>
      {isLoading || isFetching ? (
        <Loading />
      ) : isError ? (
        <ReloadMessage />
      ) : (
        <section>
          <Carrousel handleClose={handleClose} open={open}>
            {images.map((item, i) => (
              <img src={item} key={i} alt="" className=" scale-95" />
            ))}
          </Carrousel>
          <h2 className="py-3 px-5">Servicios</h2>
          {services.length === 0 ? (
            <EmptyMessage message={noServices} />
          ) : (
            <ul>{services}</ul>
          )}
        </section>
      )}
    </>
  );
}
