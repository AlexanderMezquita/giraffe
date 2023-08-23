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

export default function ToggleDays({ employee, employeeExist }) {
  const {
    register,
    formState: { errors },
    control,
    reset,
  } = useFormContext({});

  const { fields } = useFieldArray({ control, name: "schedules" });
  const [activeStep, setActiveStep] = useState(1);
  const pattern = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
  const DAYS = [
    {
      key: 0,
      label: "D",
      name: "Domingo",
    },
    {
      key: 1,
      label: "L",
      name: "Lunes",
    },
    {
      key: 2,
      label: "M",
      name: "Martes",
    },
    {
      key: 3,
      label: "M",
      name: "Miércoles",
    },
    {
      key: 4,
      label: "J",
      name: "Jueves",
    },
    {
      key: 5,
      label: "V",
      name: "Viernes",
    },
    {
      key: 6,
      label: "S",
      name: "Sábado",
    },
  ];

  useEffect(() => {
    if (employeeExist) {
      reset(employee.schedules);
    } else {
      reset({
        schedules: [
          {
            label: DAYS[0].label,
            employeeId: 0,
            day: 0,
            entryTime: "",
            entryLunch: "",
            finishLunch: "",
            finishTime: "",
          },
          {
            label: DAYS[1].label,
            employeeId: 0,
            day: 1,
            entryTime: "",
            entryLunch: "",
            finishLunch: "",
            finishTime: "",
          },
          {
            label: DAYS[2].label,
            employeeId: 0,
            day: 2,
            entryTime: "",
            entryLunch: "",
            finishLunch: "",
            finishTime: "",
          },
          {
            label: DAYS[3].label,
            employeeId: 0,
            day: 3,
            entryTime: "",
            entryLunch: "",
            finishLunch: "",
            finishTime: "",
          },
          {
            label: DAYS[4].label,
            employeeId: 0,
            day: 4,
            entryTime: "",
            entryLunch: "",
            finishLunch: "",
            finishTime: "",
          },
          {
            label: DAYS[5].label,
            employeeId: 0,
            day: 5,
            entryTime: "",
            entryLunch: "",
            finishLunch: "",
            finishTime: "",
          },
          {
            label: DAYS[6].label,
            employeeId: 0,
            day: 6,
            entryTime: "",
            entryLunch: "",
            finishLunch: "",
            finishTime: "",
          },
        ],
      });
    }
  }, [employee]);
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
        {fields.map((field, index) => (
          <ToggleButton
            key={index}
            value={index}
            aria-label={field?.key}
            color="primary"
            onClick={() => {
              setActiveStep(index);
            }}
          >
            {field.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      {fields.map((field, index) => {
        return (
          <TabPanel value={activeStep} index={index}>
            <h2>{DAYS[index].name}</h2>
            <React.Fragment key={field.id}>
              <div className="md:flex md:space-x-3 md:space-y-0 space-y-3 space-x-0">
                <TextField
                  label="Hora de entrada*"
                  placeholder="08:00:00"
                  fullWidth={true}
                  {...register(`schedules.${index}.entryTime`, {
                    pattern: {
                      value: pattern,
                      message: "Solo este formato es aceptado 00:00:00",
                    },
                    maxLength: 10,
                  })}
                  inputProps={{ maxLength: 10 }}
                  color="primary"
                  error={!!errors.schedules?.[index]?.entryTime}
                  helperText={errors.schedules?.[index]?.entryTime?.message}
                />
                <TextField
                  label="Hora de entrada de comida*"
                  placeholder="12:30:00"
                  fullWidth={true}
                  {...register(`schedules.${index}.entryLunch`, {
                    pattern: {
                      value: pattern,
                      message: "Solo este formato es aceptado 00:00:00",
                    },
                    maxLength: 10,
                  })}
                  inputProps={{ maxLength: 10 }}
                  color="primary"
                  error={!!errors.schedules?.[index]?.entryLunch}
                  helperText={errors.schedules?.[index]?.entryLunch?.message}
                />
              </div>
              <div className="md:flex md:space-x-3 md:space-y-0 space-y-3 space-x-0">
                <TextField
                  label="Hora de termino de comida*"
                  placeholder="01:30:00"
                  fullWidth={true}
                  {...register(`schedules.${index}.finishLunch`, {
                    pattern: {
                      value: pattern,
                      message: "Solo este formato es aceptado 00:00:00",
                    },
                    maxLength: 10,
                  })}
                  inputProps={{ maxLength: 10 }}
                  color="primary"
                  error={!!errors.schedules?.finishLunch}
                  helperText={errors.schedules?.[index]?.finishLunch?.message}
                />
                <TextField
                  label="Hora de salida*"
                  placeholder="05:30:00"
                  fullWidth={true}
                  {...register(`schedules.${index}.finishTime`, {
                    pattern: {
                      value: pattern,
                      message: "Solo este formato es aceptado 00:00:00",
                    },
                    maxLength: 10,
                  })}
                  inputProps={{ maxLength: 10 }}
                  color="primary"
                  error={!!errors.schedules?.[index]?.finishTime}
                  helperText={errors.schedules?.[index]?.finishTime?.message}
                />
              </div>
            </React.Fragment>
          </TabPanel>
        );
      })}
    </>
  );
}
