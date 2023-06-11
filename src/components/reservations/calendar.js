import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es-us";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";

export default function Calendar() {
  //   function disableWeekends() {
  //     return date.getDay() === 0 || date.getDay() === 6;
  //   }

  return (
    <LocalizationProvider
      adapterLocale="es-us"
      dateAdapter={AdapterDayjs}
      shouldDisableYear
    >
      <DateCalendar
        views={["day"]}
        showDaysOutsideCurrentMonth={true}
        minDate={dayjs()}
        maxDate={dayjs().add(45, "day")}
        // shouldDisableDate={dis}
      />
    </LocalizationProvider>
  );
}
