import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es-us";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function Calendar({ handleNext }) {
  const { setValue } = useFormContext();
  const [selectedDate, setSelectedDate] = React.useState(dayjs());
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
    setValue("date", selectedDate);
    setValue("time", value);
    handleNext();
  };

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 overflow-y-auto">
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
          defaultValue={selectedDate}
          onChange={(value) => setSelectedDate(value)}
          // shouldDisableDate={dis}
        />
      </LocalizationProvider>
      <div>
        <ul className=" space-y-4 p-4">
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
    </section>
  );
}
