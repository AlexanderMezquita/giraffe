import React, { useEffect, useState } from "react";
import { ToggleButton } from "@mui/material";
import { ToggleButtonGroup } from "@mui/material";
import { TextField } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import dayjs from "dayjs";

const ToggleDays = () => {
  const {
    register,
    formState: { errors },
    control,
    reset,
  } = useFormContext({});

  const { fields, append } = useFieldArray({ control, name: "schedules" });
  const [days, setDays] = useState();
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

  const arrayOfWeekdays = ["D", "L", "M", "M", "J", "V", "S"];

  useEffect(() => {
    reset({
      schedules: [
        {
          label: arrayOfWeekdays[0],
          employeeId: 0,
          day: 0,
          entryTime: "string",
          entryLunch: "string",
          finishLunch: "string",
          finishtime: "string",
        },
      ],
    });
  }, []);
  return (
    <>
      <ToggleButtonGroup
        className=" overflow-x-auto"
        arial-label="Days of the week"
        value={days}
        size="large"
        onChange={(event, value) => {
          alert(value);
          setDays(value);
        }}
        fullWidth
      >
        {fields.map((field, index) => (
          <ToggleButton
            key={index}
            value={index}
            aria-label={field?.key}
            color="primary"
            // onClick={() => handleClick(day.key)}
          >
            {field.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <button
        type="button"
        onClick={() =>
          append({
            employeeId: 0,
            day: fields.length,
            label: arrayOfWeekdays[fields.length],
            entryTime: "string",
            entryLunch: "string",
            finishLunch: "string",
            finishtime: "string",
          })
        }
      >
        ADD DAYS
      </button>
      {fields.map((field, index) => {
        return (
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
        );
      })}
    </>
  );
};

export default ToggleDays;
