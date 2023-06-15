import { TextField, Button } from "@mui/material";
import Image from "next/image";
import { useFormContext } from "react-hook-form";

export default function Form() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <section className="p-5 flex  flex-col gap-5">
      <div className="grid grid-cols-10 gap-4 ">
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

      <Button
        className=" col-span-2 col-start-9 "
        variant="outlined"
        color="primary"
        type="submit"
      >
        Book
      </Button>
    </section>
  );
}
