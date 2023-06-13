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
          {...register("email")}
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
