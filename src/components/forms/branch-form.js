import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CameraAltRounded } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import {
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";

export default function BranchForm({ open, handleClose, activeBranch }) {
  const {
    register,
    formState: { errors },
    reset,
    control,
    getValues,
    handleSubmit,
  } = useForm({
    defaultValues: {
      status: "Activo",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  React.useEffect(() => {
    if (!open) {
      reset({
        name: "",
        address: "",
        phone: "",
        img: "",
      });
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      fullWidth={true}
      PaperProps={{
        style: { borderRadius: 15, padding: "10px" },
      }}
      maxWidth={"sm"}
      onClose={() => handleClose(false)}
      aria-labelledby="branch-form"
      aria-describedby="create a branch using this dialog"
    >
      <DialogTitle id="alert-dialog-title">Crear Sucursal</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <figure className="relative mx-auto w-40 h-40  outline-dashed outline-2 outline-neutral-200  p-2  rounded-full">
          <Button
            component="label"
            className="rounded-full absolute inset-0 m-2 hover:bg-black opacity-70 "
          >
            {getValues("img") ? (
              ""
            ) : (
              <div className="w-full flex flex-col justify-center space-y-2 items-center">
                <CameraAltRounded />
                <span className="text-xs capitalize">Subir Imagen</span>
              </div>
            )}
            <Controller
              control={control}
              name="img"
              render={({ field: { value, onChange, ...field } }) => {
                return (
                  <input
                    {...field}
                    value={value?.fileName}
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        onChange(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                    hidden
                    accept="image/*"
                    type="file"
                  />
                );
              }}
            />
          </Button>
          <img
            src={getValues("img") ? getValues("img") : ""}
            alt=""
            className=" w-36 h-36 rounded-full transition-all  "
          />
        </figure>
        <p className="text-xs px-8 m-5 text-center  text-neutral-500">
          Permitido *.jpeg, *.jpg, *.png, max size of 3.1 MB
        </p>
        <DialogContent className=" space-y-3">
          <TextField
            id="name"
            label="Nombre*"
            placeholder="Sucursal Cerros de Gurabo"
            fullWidth={true}
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
          <TextField
            id="address"
            label="Dirección*"
            placeholder="C1 #15 2da Planta, Santiago De Los Caballeros 51000, Dominican Republic"
            fullWidth={true}
            {...register("address", {
              required: {
                value: true,
                message: "Este campo no puede estar vacío",
              },
              minLength: { value: 5, message: "Ingresa al menos 5 caracteres" },
              maxLength: 50,
            })}
            inputProps={{ maxLength: 50 }}
            color="primary"
            error={!!errors.address}
            helperText={errors.address?.message}
          />
          <div className="space-y-3 sm:space-y-0">
            <FormControl className=" w-full sm:w-1/2 sm:pr-1 ">
              <TextField
                id="phone"
                label="Teléfono*"
                placeholder="809-241-2028"
                {...register("phone", {
                  required: {
                    value: true,
                    message: "Este campo no puede estar vacío",
                  },
                  maxLength: 20,
                  pattern: {
                    value:
                      /^(1\s?)?(849\s?|809\s?|829\s?|809|849|829)[\s\-]?\d{3}[\s\-]?\d{4}$/gm,
                    message:
                      "Ingresa un número válido en la República Dominicana",
                  },
                })}
                inputProps={{ maxLength: 20 }}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </FormControl>
            <FormControl className=" w-full sm:w-1/2 sm:pl-1">
              <InputLabel id="demo-simple-select-helper-label">
                Estatus
              </InputLabel>
              <Controller
                name="status"
                control={control}
                defaultValue={"Activo"}
                rules={{ required: "El estatus es requerido" }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    labelId="status-label"
                    id="status"
                    value={value}
                    label="status"
                    onChange={onChange}
                  >
                    <MenuItem value={"Activo"}>Activo</MenuItem>
                    <MenuItem value={"Desactivado"}>Desactivado</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            //   onClick={handleClose}
            target="_blank"
            variant="outlined"
            color="success"
            type="submit"
          >
            Crear
          </Button>
          <Button
            onClick={() => handleClose(false)}
            variant="outlined"
            color="info"
          >
            Cancelar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
