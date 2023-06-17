import { TextField, Button } from "@mui/material";
import Image from "next/image";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";

import { useFormContext } from "react-hook-form";

export default function Form() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className=" flex  flex-col pb-10 sm:pb-5 ">
      <div className=" p-5 pb-5 sm:pb-0 grid grid-cols-10 gap-4 ">
        {" "}
        <TextField
          id="name"
          label="Tu nombre"
          placeholder="Primer y segundo nombre"
          {...register("name", {
            required: {
              value: true,
              message: "Este campo no puede estar vacio",
            },
            minLength: { value: 5, message: "Ingresa un nombre valido" },
            maxLength: 50,
          })}
          inputProps={{ maxLength: 50 }}
          color="primary"
          className="col-span-10 rounded-xl"
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <FormControl className="col-span-10" error={!!errors.quantity}>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            {...register("quantity", { required: true })}
            // value={value}
            // onChange={handleChange}
          >
            <FormControlLabel value="1" control={<Radio />} label="1" />
            <FormControlLabel value="2" control={<Radio />} label="2" />
            <FormControlLabel value="3" control={<Radio />} label="3" />
            <FormControlLabel value="4" control={<Radio />} label="4" />
          </RadioGroup>
        </FormControl>
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
                  src="/assets/dominican_flag.svg"
                />
                <p>{`+1`}</p>
              </div>
            ),
          }}
        />
        <TextField
          id="phone"
          label="Teléfono"
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
              message: "Ingresa un número válido",
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
          label="Direccion (Opcional)"
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

      <footer className=" p-5  z-10 bg-white sm:static sticky bottom-0 col-span-2 col-start-9 border-t-2 sm:border-t-0 border-neutral-100 ">
        <FormControlLabel
          required
          control={<Checkbox />}
          label={
            <p>
              Estoy de acuerdo con la{" "}
              <a href="/citas" className="text-blue-600">
                politica de cancelacion
              </a>
            </p>
          }
        />

        <Button fullWidth variant="contained" color="primary" type="submit">
          Book
        </Button>
      </footer>
    </div>
  );
}
