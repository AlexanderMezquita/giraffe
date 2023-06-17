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
    "5:00 pm",
    "5:00 pm",
    "5:00 pm",
    "5:00 pm",
    "5:00 pm",
    "5:00 pm",
    "5:00 pm",
    "5:00 pm",
    "5:00 pm",
    "5:00 pm",
  ];

  //   function disableWeekends() {
  //     return date.getDay() === 0 || date.getDay() === 6;
  //   }
  const handleDate = (value) => {
    setValue("time", value);
    handleNext();
  };
  // dayjs.extend(utc);
  // dayjs.extend(timezone);
  // dayjs.tz.setDefault("Europe/Berlin");

  // alert(dayjs());
  React.useEffect(() => {
    setValue("date", dayjs());
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
          minDate={dayjs()}
          maxDate={dayjs().add(45, "day")}
          defaultValue={getValues("date") ?? dayjs()}
          onChange={(value) => setValue("date", value)}
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
