import { useFieldArray } from "react-hook-form";
import { Delete } from "@mui/icons-material";
import dayjs from "../globals/date";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FormControlLabel from "@mui/material//FormControlLabel";
import Switch from "@mui/material/Switch";
import { useFormContext } from "react-hook-form";
import { Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function LaborlessDays() {
  const { register, errors, control, watch } = useFormContext({});
  const pattern = /^(0[0-9]|1[0-9]|2[0-3]):(00|30):00$/;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "laborLessDays",
  });

  return (
    <>
      {Object.keys(fields).length >= 1 ? (
        ""
      ) : (
        <p className="text-center text-neutral-500">
          No hay dias libres agregados
        </p>
      )}
      <ul className="divide-y-2  ">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {fields.map((field, index) => (
            <li key={field.id} className="py-3">
              <Controller
                control={control}
                name={`laborLessDays.${index}.fullDate`}
                defaultValue={false}
                render={({ field: { onChange, value } }) => (
                  <FormControlLabel
                    value="start"
                    control={
                      <Switch
                        checked={value}
                        onChange={onChange}
                        color="primary"
                      />
                    }
                    label="Dia completo"
                    labelPlacement="start"
                  />
                )}
              />
              <fieldset className="md:flex md:space-x-2 md:space-y-0 space-y-2 py-3">
                <Controller
                  control={control}
                  name={`laborLessDays.${index}.date`}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      value={value ? dayjs(value) : null}
                      className="w-full "
                      onChange={(e) => {
                        onChange(dayjs(e).format("YYYY-MM-DD"));
                      }}
                    />
                  )}
                />
                <TextField
                  label="Hora de inicio*"
                  fullWidth
                  disabled={watch(`laborLessDays.${index}.fullDate`)}
                  placeholder="01:30:00"
                  {...register(`laborLessDays.${index}.fromHour`, {
                    required: {
                      value: !watch(`laborLessDays.${index}.fullDate`),
                    },
                    pattern: {
                      value: pattern,
                      message:
                        "Solo este formato es aceptado HH:MM:SS con intervalos de 30 minutos",
                    },
                    maxLength: 10,
                  })}
                  inputProps={{ maxLength: 10 }}
                  color="primary"
                  error={!!errors.laborLessDays?.[index]?.fromHour}
                  helperText={errors.laborLessDays?.[index]?.fromHour?.message}
                />
                <TextField
                  label="Hora de término*"
                  placeholder="01:30:00"
                  disabled={watch(`laborLessDays.${index}.fullDate`)}
                  fullWidth
                  {...register(`laborLessDays.${index}.toHour`, {
                    required: {
                      value: !watch(`laborLessDays.${index}.fullDate`),
                    },
                    pattern: {
                      value: pattern,
                      message:
                        "Solo este formato es aceptado HH:MM:SS con intervalos de 30 minutos",
                    },
                    maxLength: 10,
                  })}
                  inputProps={{ maxLength: 10 }}
                  color="primary"
                  error={!!errors.laborLessDays?.[index]?.toHour}
                  helperText={errors.laborLessDays?.[index]?.toHour?.message}
                />
                <Button
                  variant="outlined"
                  size="large"
                  className=" w-full sm:w-auto"
                  onClick={() => remove(index)}
                  startIcon={<Delete className="ml-2.5" />}
                />
              </fieldset>
            </li>
          ))}
        </LocalizationProvider>
      </ul>
      <Button
        variant="outlined"
        className=" float-right"
        size="small"
        onClick={() => {
          append({
            fromHour: null,
            toHour: null,
            date: null,
            fullDate: true,
          });
        }}
      >
        Anadir dia libre
      </Button>
    </>
  );
}
