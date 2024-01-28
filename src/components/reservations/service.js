import * as React from "react";
import Loading from "../globals/loading";
import { useFormContext } from "react-hook-form";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { formatCurrency } from "@/utils/methods";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/axios";
import EmptyMessage from "../globals/empty-message";
import Button from "@mui/material/Button";
import Carrousel from "../globals/carrousel";
import ReloadMessage from "../globals/reload-message";

export default function Services({ handleNext }) {
  const { setValue } = useFormContext();
  const { axiosInstance } = useAxios();
  const [open, setOpen] = React.useState(true);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const imgRef = React.useRef(null);
  const slides = [
    "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
    "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-james-wheeler-414612.jpg&fm=jpg",
  ];

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
      return (
        <li
          key={index}
          className="flex sm:flex-row flex-col-reverse items-center justify-center sm:items-start sm:justify-normal  gap-4 p-5 border m-4  "
        >
          {item.img ? (
            <img
              src={item.img}
              loading="lazy"
              alt={item.name}
              className={`border-4 border-secondary sm:object-cover max-h-72 sm:w-48 sm:h-52`}
            />
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
                <Button variant="contained" onClick={() => handleService(item)}>
                  Reservar
                </Button>
              </div>
            </div>
            <div className="text-neutral-500 space-y-2">
              {item.description ? <p>{item.description}</p> : null}
              {/* <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste
                architecto molestias sequi officia dolore nihil, cum,
                accusantium, deserunt dolorum ex minima. Molestias officiis
                aperiam animi autem iusto eaque nam placeat deleniti veniam.
                Reprehenderit consequuntur porro sit quam neque, dolores dolorem
                ullam magnam autem cupiditate. Assumenda consequatur id tenetur
                totam explicabo quo rerum illum. Labore incidunt ratione fugit
                exercitationem eligendi ducimus aspernatur, saepe accusantium,
                harum illum, excepturi dignissimos.
              </p> */}
              {item.estimatedTime ? (
                <p>Tiempo estimado: {item.estimatedTime}</p>
              ) : null}
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
            {slides.map((item) => (
              <img src={item} alt="" />
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
