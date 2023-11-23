import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "../globals/date.js";
import { Button } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import useAxios from "@/axios";
import "dayjs/locale/es-us.js";
import ReloadMessage from "../globals/reload-message.js";
import Loading from "../globals/loading.js";
import CircularProgress from "@mui/material/CircularProgress";

export default function Calendar({ handleNext }) {
  const { setValue, watch, control } = useFormContext();

  const { axiosInstance } = useAxios();

  const {
    data: getSchedule,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["branchSchedule", watch("date")],
    queryFn: () =>
      axiosInstance.get(
        `/branch/schedule?branchId=${watch("branch.id")}&selectedDay=${watch(
          "date"
        )}`
      ),

    enabled: !!watch("date"),
  });

  const { data: getDaysOff, isLoading: isLoadingDayOff } = useQuery({
    queryKey: ["branchScheduleDayOff", watch("branch.id")],
    queryFn: () =>
      axiosInstance.get(`/branch/schedule/day?branchId=${watch("branch.id")}`),
    staleTime: 3000,
  });

  const handleDateChange = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setValue("date", formattedDate);
  };

  function isDateDisabled(date) {
    const cutoffTime = getDaysOff?.data.cutoffTime;
    const currentTime = dayjs();
    const selectedDate = dayjs(date);
    const cutoff = dayjs(cutoffTime, "HH:mm:ss");

    // Convert the date to a string in yyyy-MM-dd format
    const dateString = date.toISOString().slice(0, 10);
    const dayOfWeek = dayjs(date).day();
    // Check if the date is in the disabledDates array
    return (
      getDaysOff?.data?.laborLessDays?.includes(dateString) ||
      getDaysOff?.data?.freeDays?.includes(dayOfWeek) ||
      (selectedDate.isSame(currentTime, "day") && currentTime.isAfter(cutoff))
    );
  }

  const handleDate = (value) => {
    setValue("time", value);
    handleNext();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 p-5 gap-0 sm:gap-2 overflow-y-auto">
      <LocalizationProvider
        adapterLocale={"es-us"}
        dateAdapter={AdapterDayjs}
        shouldDisableYear
      >
        <Controller
          control={control}
          name="date"
          render={({ field: { onChange, value } }) => (
            <DateCalendar
              loading={isLoadingDayOff}
              views={["day"]}
              renderLoading={() => (
                <CircularProgress className="text-primary " />
              )}
              showDaysOutsideCurrentMonth={false}
              maxDate={dayjs().add(45, "day")}
              value={!!watch("date") ? dayjs(value) : null}
              onChange={(date) => {
                onChange(date);
                handleDateChange(date);
              }}
              shouldDisableDate={isDateDisabled}
              disablePast
            />
          )}
        />
      </LocalizationProvider>
      {!watch("date") ? (
        <section className="flex flex-col justify-center px-5 items-center md:h-52">
          <p className="text-center text-neutral-500">Elige un dia</p>
        </section>
      ) : isLoading ? (
        <Loading />
      ) : isError ? (
        <ReloadMessage />
      ) : (
        <>
          {!getSchedule.data.length ? (
            <section className="flex flex-col justify-center px-5 items-center md:h-52">
              <p className="text-center text-neutral-500">
                No hay horarios disponibles para este dia, elige otro.
              </p>
            </section>
          ) : (
            <ul className="space-y-4">
              {getSchedule.data?.map((item, index) => {
                return (
                  <li key={index}>
                    <Button
                      variant="outlined"
                      color="inherit"
                      size="large"
                      className="w-full border-neutral-300"
                      onClick={() => handleDate(item)}
                    >
                      {item}
                    </Button>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
