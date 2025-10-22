import React, { useEffect, useState } from "react";
import { Button, ToggleButton } from "@mui/material";
import { ToggleButtonGroup } from "@mui/material";
import { TextField } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import dayjs from "dayjs";

function TabPanel(props) {
  const { children, value, index } = props;
  return <>{value === index && <>{children}</>}</>;
}

export default function ToggleDays() {
  const { register, errors, control, watch } = useFormContext({});
  const { fields } = useFieldArray({ control, name: "schedules" });
  const [activeStep, setActiveStep] = useState(1);
  const pattern = /^(?:[01]\d|2[0-3]):(?:00|30):00$/;
  const DAYS = [
    {
      label: "D",
      name: "Domingo",
    },
    {
      label: "L",
      name: "Lunes",
    },
    {
      label: "M",
      name: "Martes",
    },
    {
      label: "M",
      name: "Miércoles",
    },
    {
      label: "J",
      name: "Jueves",
    },
    {
      label: "V",
      name: "Viernes",
    },
    {
      label: "S",
      name: "Sábado",
    },
  ];

  return (
    <>
      <ToggleButtonGroup
        className=" overflow-x-auto"
        arial-label="Days of the week"
        value={activeStep}
        size="large"
        // onChange={(event, value) => {
        //   alert(value);
        //   setDays(value);
        // }}
        fullWidth
      >
        {DAYS.map((item, index) => (
          <ToggleButton
            key={index}
            value={index}
            aria-label={index}
            color="primary"
            onClick={() => {
              setActiveStep(index);
            }}
          >
            {item.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      {fields.map((field, index) => {
        return (
          <TabPanel value={activeStep} index={field.day} key={field.id}>
            <h2>{DAYS[field.day]?.name}</h2>
            <fieldset className="md:flex md:space-x-3 md:space-y-0 space-y-3 space-x-0 ">
              <TextField
                label="Hora de entrada*"
                placeholder="08:00:00"
                fullWidth={true}
                {...register(`schedules.${field.day}.entryTime`, {
                  pattern: {
                    value: pattern,
                    required: true,
                    message:
                      "Solo este formato es aceptado 00:00:00 con intervalos de 30 minutos",
                  },
                  maxLength: 10,
                })}
                inputProps={{ maxLength: 10 }}
                color="primary"
                error={!!errors.schedules?.[field.day]?.entryTime}
                helperText={errors.schedules?.[field.day]?.entryTime?.message}
              />
              <TextField
                label="Hora de salida*"
                placeholder="05:30:00"
                fullWidth={true}
                {...register(`schedules.${field.day}.finishTime`, {
                  pattern: {
                    value: pattern,
                    required: true,
                    message:
                      "Solo este formato es aceptado 00:00:00 con intervalos de 30 minutos",
                  },
                  maxLength: 10,
                })}
                inputProps={{ maxLength: 10 }}
                color="primary"
                error={!!errors.schedules?.[field.day]?.finishTime}
                helperText={errors.schedules?.[field.day]?.finishTime?.message}
              />
            </fieldset>
          </TabPanel>
        );
      })}
    </>
  );
}
