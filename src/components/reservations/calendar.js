import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es-us";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useQueryClient, useQuery } from "@tanstack/react-query";

export default function Calendar({ handleNext }) {
  const { setValue, getValues, watch } = useFormContext();
  const hours = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
  ];

  const getSchedule = useQuery({
    queryKey: ["branchSchedule"],
    queryFn: () =>
      axiosInstance.get(
        `/branch/schedule?branchId=${watch("branch.id")}&day=${watch(
          "date.#W"
        )}`
      ),
    enabled: !!watch("date.$W"),
  });

  function generateOpeningHoursList(openingTime, closingTime) {
    openingTime = "08:00:00";
    closingTime = "17:30:00";
    try {
      // Ensure the opening time is earlier than the closing time
      if (openingTime >= closingTime) {
        throw new Error("Error");
      }

      let currentTime = openingTime;
      const openingHoursList = [];

      // Generate a list of opening hours in 30-minute intervals
      while (currentTime < closingTime) {
        // Use a 12-hour clock format
        const [hours, minutes] = currentTime.split(":").map(Number);
        const period = hours >= 12 ? "PM" : "AM";
        const formattedHours =
          hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
        openingHoursList.push(
          `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`
        );

        // Increment currentTime by 30 minutes
        const newMinutes = minutes + 30;
        if (newMinutes >= 60) {
          const newHours = hours + 1;
          currentTime = `${newHours.toString().padStart(2, "0")}:00:00`;
        } else {
          currentTime = `${hours.toString().padStart(2, "0")}:${newMinutes
            .toString()
            .padStart(2, "0")}:${"00"}`;
        }
      }
      return openingHoursList;
    } catch (error) {
      return [];
    }
  }

  const handleDate = (value) => {
    setValue("time", value);
    handleNext();
  };

  const isWeekend = (date) => {
    const day = date.day();

    return day === 0;
  };

  React.useEffect(() => {
    generateOpeningHoursList();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 p-5 gap-0 sm:gap-2 overflow-y-auto">
      <LocalizationProvider
        adapterLocale="es-us"
        dateAdapter={AdapterDayjs}
        shouldDisableYear
      >
        <DateCalendar
          views={["day"]}
          showDaysOutsideCurrentMonth={false}
          maxDate={dayjs().add(45, "day")}
          defaultValue={getValues("date") ?? setValue("date", dayjs())}
          onChange={(value) => {
            setValue("date", value);
          }}
          shouldDisableDate={isWeekend}
          disablePast
          // shouldDisableDate={dis}
        />
      </LocalizationProvider>
      <ul className=" space-y-4">
        {hours.map((item, index) => {
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
    </div>
  );
}
