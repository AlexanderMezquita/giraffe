import * as React from "react";
import Loading from "../globals/loading";
import { useFormContext } from "react-hook-form";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { formatCurrency } from "@/utils/methods";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/axios";
import { Avatar } from "@mui/material";
import EmptyMessage from "../globals/emptyMessage";
import ReloadMessage from "../globals/reloadMessage";

export default function Employees({ handleNext }) {
  const { setValue, getValues } = useFormContext();
  const { axiosInstance } = useAxios();
  const noEmployees =
    "No hay empleados disponibles en este momento, vuelve a intentarlo más tarde o elige otra sucursal.";

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["getEmployeesIndex"],
    queryFn: () => {
      return axiosInstance.get(`/employees/branch/${getValues("branch.id")}`);
    },
    staleTime: 3000,
  });

  const handleService = (value) => {
    setValue("employee.name", value.name);
    setValue("employeeId", value.id);
    handleNext();
  };

  return (
    <>
      {isLoading || isFetching ? (
        <Loading />
      ) : isError ? (
        <ReloadMessage />
      ) : (
        <section>
          <h2 className="py-3 px-5">Empleados</h2>
          {data.data.length === 0 ? (
            <EmptyMessage message={noEmployees} />
          ) : (
            <ul>
              {data?.data.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => handleService(item)}
                    className="flex items-center justify-between gap-2 hover:bg-tertiary/50 transition-all duration-300 cursor-pointer px-5 py-2  "
                  >
                    <div className="flex items-center gap-2">
                      <Avatar
                        width={60}
                        height={40}
                        src={item.img}
                        alt={item.name}
                        className="rounded-full border-4 border-secondary object-cover w-[60px] h-[60px]"
                      />
                      <div className=" flex flex-col justify-around ">
                        <h2 className=" font-semibold font-sans ">
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
          )}
        </section>
      )}
    </>
  );
}
