import React, { useState } from "react";
import { ToggleButton } from "@mui/material";
import { ToggleButtonGroup } from "@mui/material";

const DAYS = [
  {
    key: "Domingo",
    label: "D",
  },
  {
    key: "Lunes",
    label: "L",
  },
  {
    key: "Martes",
    label: "M",
  },
  {
    key: "Miercoles",
    label: "M",
  },
  {
    key: "Jueves",
    label: "J",
  },
  {
    key: "Viernes",
    label: "V",
  },
  {
    key: "Sabado",
    label: "S",
  },
];

const ToggleDays = () => {
  const [days, setDays] = useState([0, 1, 2, 3]);
  return (
    <>
      <ToggleButtonGroup
        className=" overflow-x-auto"
        arial-label="Days of the week"
        value={days}
        size="large"
        onChange={(event, value) => setDays(value)}
        fullWidth
      >
        {DAYS.map((day, index) => (
          <ToggleButton
            key={day.key}
            value={index}
            aria-label={day.key}
            color="primary"
          >
            {day.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </>
  );
};

export default ToggleDays;
