import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es-us";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import { useFormContext } from "react-hook-form";
// import utc from "dayjs/plugin/utc";
// import timezone from "dayjs/plugin/timezone";

export default function Calendar({ handleNext }) {
  const { setValue, getValues } = useFormContext();
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

  //   function disableWeekends() {
  //     return date.getDay() === 0 || date.getDay() === 6;
  //   }
  const handleDate = (value) => {
    setValue("time", value);
    handleNext();
  };

  const isWeekend = (date) => {
    const day = date.day();

    return day === 0;
  };

  // dayjs.extend(utc);
  // dayjs.extend(timezone);
  // dayjs.tz.setDefault("Europe/Berlin");

  // alert(dayjs());

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
          onChange={(value) => setValue("date", value)}
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
