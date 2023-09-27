import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es-us";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "../globals/date.js";
import { Button } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import useAxios from "@/axios";
import ReloadMessage from "../globals/reload-message.js";
import Loading from "../globals/loading.js";

export default function Calendar({ handleNext }) {
  const { setValue, getValues, watch, control } = useFormContext();
  const { axiosInstance } = useAxios();

  const {
    data: getSchedule,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["branchSchedule", watch("date")],
    queryFn: () =>
      axiosInstance.get(
        `/branch/schedule?branchId=${watch("branch.id")}&day=${watch(
          "date.$W"
        )}`
      ),

    enabled: !!watch("date"),
  });

  function generateOpeningHoursList(openingTime, closingTime) {
    try {
      // Ensure the opening time is earlier than the closing time
      if (openingTime >= closingTime) {
        throw new Error("Opening time must be earlier than closing time.");
      }

      // Get the current day and time
      const currentDate = dayjs();
      // Check if the current day matches the date param in the form
      if (
        currentDate.format("YYYY-MM-DD") ===
        dayjs(watch("date")).format("YYYY-MM-DD")
      ) {
        // Get the current time in HH:mm:ss format
        const currentTime = currentDate.format("HH:mm:ss");
        // Parse the current time
        const currentTimeParsed = dayjs(currentTime, "HH:mm:ss");
        // Calculate the minutes past the last 30-minute interval
        let adjustedTime;

        if (currentTimeParsed.minute() >= 30) {
          // If it is, set the minute to 0 and add 1 hour to round to the next hour
          adjustedTime = currentTimeParsed.add(1, "hour").set("minute", 0);
        } else {
          // If it's less than 30, set the minute to 30 to round to the next half hour
          adjustedTime = currentTimeParsed.set("minute", 30);
        }

        console.log(adjustedTime.format("HH:mm:ss"));

        // Format the adjusted time back to "HH:mm:ss" format
        let formattedTime = adjustedTime.format("HH:mm:ss");

        // // Remove the hours that have passed
        // if (
        //   formattedTime <
        //   dayjs(currentTime, "HH:mm:ss").subtract(1, "hour").format("HH:mm:ss")
        // ) {
        //   openingTime = dayjs(openingTime, "HH:mm:ss")
        //     .add(30, "minute")
        //     .format("HH:mm:ss");
        // } else {
        //   openingTime = formattedTime;
        // }
      }

      let currentTime = openingTime;
      const openingHoursList = [];

      // Generate a list of opening hours in 30-minute intervals
      while (currentTime < closingTime) {
        // Use a 12-hour clock format without seconds
        const formattedTime = dayjs(currentTime, "HH:mm:ss").format("h:mm A");
        openingHoursList.push(formattedTime);

        // Increment currentTime by 30 minutes
        currentTime = dayjs(currentTime, "HH:mm:ss")
          .add(30, "minute")
          .format("HH:mm:ss");
      }

      return openingHoursList;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  const hours = generateOpeningHoursList(
    getSchedule?.data[0].entryTime,
    getSchedule?.data[0].finishTime
  );
  const handleDate = (value) => {
    setValue("time", value);
    handleNext();
  };

  const isWeekend = (date) => {
    const day = date.day();

    return day === 0;
  };

  // React.useEffect(() => {
  //   console.log(hours.length);
  // }, [watch("date")]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 p-5 gap-0 sm:gap-2 overflow-y-auto">
      <LocalizationProvider
        adapterLocale="es-us"
        dateAdapter={AdapterDayjs}
        shouldDisableYear
      >
        <Controller
          control={control}
          name="date"
          render={({ field: { onChange, value } }) => (
            <DateCalendar
              views={["day"]}
              showDaysOutsideCurrentMonth={false}
              maxDate={dayjs().add(45, "day")}
              value={value ?? null}
              onChange={onChange}
              shouldDisableDate={isWeekend}
              disablePast
              // shouldDisableDate={dis}
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
          {!hours.length ? (
            <section className="flex flex-col justify-center px-5 items-center md:h-52">
              <p className="text-center text-neutral-500">
                No hay horarios disponibles para este dia, elige otro.
              </p>
            </section>
          ) : (
            <ul className=" space-y-4">
              {hours?.map((item, index) => {
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
