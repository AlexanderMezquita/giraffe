import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
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
    handleSubmit,
  } = useForm();

  React.useEffect(() => {
    if (!open) {
      reset({
        name: "",
        address: "",
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
      <form>
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
            <FormControl className=" w-full sm:w-1/2 sm:px-1 ">
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
            <FormControl className=" w-full sm:w-1/2 sm:px-1">
              <InputLabel id="demo-simple-select-helper-label">
                Estatus
              </InputLabel>
              <Select
                labelId="status-label"
                id="select-helper"
                // value={age}
                label="status"
                // onChange={handleChange}
              >
                <MenuItem>Activo</MenuItem>
                <MenuItem>Desactivado</MenuItem>
              </Select>
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
            color="inherit"
          >
            Cancelar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
