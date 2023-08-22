import React, { useEffect, useState } from "react";
import { Button, ToggleButton } from "@mui/material";
import { ToggleButtonGroup } from "@mui/material";
import { TextField } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import dayjs from "dayjs";

function TabPanel(props) {
  const { children, value, index } = props;
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [children]);

  return (
    <fieldset
      id={`fieldset-${index}`}
      hidden={value !== index}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <React.Fragment>{children}</React.Fragment>}
    </fieldset>
  );
}

export default function ToggleDays() {
  const {
    register,
    formState: { errors },
    control,
    reset,
  } = useFormContext({});

  const { fields, append } = useFieldArray({ control, name: "schedules" });
  const [days, setDays] = useState();
  const [activeStep, setActiveStep] = useState(0);
  const pattern = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
  const [objects, setObjects] = useState([]);
  const DAYS = [
    {
      key: 0,
      label: "D",
    },
    {
      key: 1,
      label: "L",
    },
    {
      key: 2,
      label: "M",
    },
    {
      key: 3,
      label: "M",
    },
    {
      key: 4,
      label: "J",
    },
    {
      key: 5,
      label: "V",
    },
    {
      key: 6,
      label: "S",
    },
  ];

  const handleClick = (item) => {
    setObjects([...objects, { id: item }]);
    // else {
    //   const index = array.indexOf(item);
    //   const updatedObjects = objects.slice(index, 1);
    //   setObjects(updatedObjects)
    // }
  };

  const arrayOfWeekdays = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];

  useEffect(() => {
    reset({
      schedules: [
        {
          label: arrayOfWeekdays[0],
          employeeId: 0,
          day: 0,
          entryTime: "",
          entryLunch: "",
          finishLunch: "",
          finishTime: "",
        },
        {
          label: arrayOfWeekdays[1],
          employeeId: 0,
          day: 1,
          entryTime: "",
          entryLunch: "",
          finishLunch: "",
          finishTime: "",
        },
        {
          label: arrayOfWeekdays[2],
          employeeId: 0,
          day: 2,
          entryTime: "",
          entryLunch: "",
          finishLunch: "",
          finishTime: "",
        },
        {
          label: arrayOfWeekdays[3],
          employeeId: 0,
          day: 3,
          entryTime: "",
          entryLunch: "",
          finishLunch: "",
          finishTime: "",
        },
      ],
    });
  }, []);
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
            onClick={() => setActiveStep(index)}
          >
            {field.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      {fields.map((field, index) => {
        return (
          <TabPanel value={activeStep} index={index}>
            <h1>{arrayOfWeekdays[index]}</h1>
            <TextField
              key={field.id}
              id={field.id}
              label="Hora de entrada*"
              placeholder="08:00:00"
              fullWidth={true}
              {...register(`schedules.${index}.entryTime`, {
                required: {
                  value: true,
                  message: "Este campo no puede estar vacío",
                },
                pattern: {
                  value: pattern,
                  message: "Solo este formato es aceptado 00:00:00",
                },
                maxLength: 10,
              })}
              inputProps={{ maxLength: 10 }}
              color="primary"
              error={!!errors.schedules?.entryTime}
              helperText={errors.schedules?.entryTime}
            />
            <TextField
              key={field.id}
              id={field.id}
              label="Hora de entrada de comida*"
              placeholder="08:00:00"
              fullWidth={true}
              {...register(`schedules.${index}.entryLunch`, {
                required: {
                  value: true,
                  message: "Este campo no puede estar vacío",
                },
                pattern: {
                  value: pattern,
                  message: "Solo este formato es aceptado 00:00:00",
                },
                maxLength: 10,
              })}
              inputProps={{ maxLength: 10 }}
              color="primary"
              error={!!errors.schedules?.entryTime}
              helperText={errors.schedules?.entryTime}
            />
            <TextField
              key={field.id}
              id={field.id}
              label="Hora de termino de comida*"
              placeholder="08:00:00"
              fullWidth={true}
              {...register(`schedules.${index}.finishLunch`, {
                required: {
                  value: true,
                  message: "Este campo no puede estar vacío",
                },
                pattern: {
                  value: pattern,
                  message: "Solo este formato es aceptado 00:00:00",
                },
                maxLength: 10,
              })}
              inputProps={{ maxLength: 10 }}
              color="primary"
              error={!!errors.schedules?.entryTime}
              helperText={errors.schedules?.entryTime}
            />
            <TextField
              key={field.id}
              id={field.id}
              label="Hora de salida*"
              placeholder="08:00:00"
              fullWidth={true}
              {...register(`schedules.${index}.finishTime`, {
                required: {
                  value: true,
                  message: "Este campo no puede estar vacío",
                },
                pattern: {
                  value: pattern,
                  message: "Solo este formato es aceptado 00:00:00",
                },
                maxLength: 10,
              })}
              inputProps={{ maxLength: 10 }}
              color="primary"
              error={!!errors.schedules?.entryTime}
              helperText={errors.schedules?.entryTime}
            />
          </TabPanel>
        );
      })}
    </>
  );
}
