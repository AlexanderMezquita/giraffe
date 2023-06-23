import { TextField, Button } from "@mui/material";
import Image from "next/image";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InfoIcon from "@mui/icons-material/Info";

import { useFormContext } from "react-hook-form";

export default function Form() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div className=" flex  flex-col pb-10 sm:pb-5 ">
      <div className=" p-5 pb-5 sm:pb-0 grid grid-cols-10 w-full mx-0 sm:w-3/4 sm:mx-auto gap-4 ">
        {" "}
        <TextField
          id="name"
          label="Nombre*"
          placeholder="Primer y segundo nombre"
          {...register("name", {
            required: {
              value: true,
              message: "Este campo no puede estar vacío",
            },
            minLength: { value: 5, message: "Ingresa al menos 5 caracteres" },
            maxLength: 50,
          })}
          inputProps={{ maxLength: 50 }}
          color="primary"
          className="col-span-10 rounded-xl"
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        {/* <FormControl className="col-span-10">
          <FormLabel>Cantidad de personas</FormLabel>
          <Controller
            rules={{ required: true }}
            control={control}
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="quantity"
            defaultValue="1"
            render={({ field }) => (
              <RadioGroup {...field} row>
                <FormControlLabel value={1} control={<Radio />} label="1" />
                <FormControlLabel value={2} control={<Radio />} label="2" />
                <FormControlLabel value={3} control={<Radio />} label="3" />
                <FormControlLabel value={4} control={<Radio />} label="4" />
              </RadioGroup>
            )}
          />
        </FormControl> */}
        <TextField
          id="phone-zip"
          disabled
          className=" col-span-3  sm:col-span-2"
          InputProps={{
            startAdornment: (
              <div className="flex items-center gap-2">
                <Image
                  alt="Dominican flag"
                  width={23}
                  height={10}
                  className="[@media(max-width:310px)]:hidden"
                  src="/assets/dominican_flag.svg"
                />
                <p>{`+1`}</p>
              </div>
            ),
          }}
        />
        <TextField
          id="phone"
          label="Teléfono*"
          placeholder="809-XXX-XXXX"
          {...register("phone", {
            required: {
              value: true,
              message: "Este campo no puede estar vacío",
            },
            maxLength: 20,
            pattern: {
              value:
                /^(1\s?)?(849\s?|809\s?|829\s?|809|849|829)[\s\-]?\d{3}[\s\-]?\d{4}$/gm,
              message: "Ingresa un número válido en la República Dominicana",
            },
          })}
          className=" col-span-7 sm:col-span-8"
          inputProps={{ maxLength: 20 }}
          error={!!errors.phone}
          helperText={errors.phone?.message}
        />
        <TextField
          id="email"
          label="Correo (Opcional)"
          placeholder="ejemplo@gmail.com"
          {...register("email", {
            pattern: {
              value:
                /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
              message: "El correo no es valido",
            },
          })}
          inputProps={{ maxLength: 40 }}
          className="col-span-10"
          color="primary"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          id="address"
          label="Dirección (Opcional)"
          placeholder="Calle Generoso Diaz"
          {...register("address")}
          inputProps={{ maxLength: 40 }}
          className="col-span-10"
          color="primary"
        />
        <TextField
          id="comment"
          label="Comentario (Opcional)"
          {...register("comment")}
          inputProps={{ maxLength: 500 }}
          className="col-span-10"
          color="primary"
          rows={5}
          multiline
        />
      </div>

      <footer className=" p-5 w-full mx-0 sm:w-3/4 sm:mx-auto  z-10 bg-white sm:static sticky bottom-0 col-span-2 col-start-9 border-t-2 sm:border-t-0 border-neutral-100 ">
        <FormControlLabel
          required
          control={<Checkbox />}
          label={
            <p>
              Estoy de acuerdo con la{" "}
              <a href="/citas" className="text-blue-600">
                política de cancelación
              </a>
            </p>
          }
        />

        <Button
          className="w-full mt-2 sm:mt-0 sm:w-auto float-right "
          variant="contained"
          size="small"
          type="submit"
        >
          Registrarse
        </Button>
      </footer>
      <div className="p-5 flex gap-2 border mx-5 mt-5">
        <InfoIcon className=" text-neutral-400" />
        <p className=" text-neutral-400">
          Cuando reserves con Rizos Afros Y Más, es posible que recibas
          comunicaciones específicas de la cita por correo electrónico o SMS.
        </p>
      </div>
    </div>
  );
}
