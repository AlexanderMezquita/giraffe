import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CameraAltRounded } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import useAxios from "@/axios";
import { Controller, FormProvider, useForm } from "react-hook-form";
import {
  TextField,
  FormControl,
  Select,
  InputLabel,
  FormHelperText,
  MenuItem,
} from "@mui/material";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { deleteImage, uploadImage } from "@/utils/image-handler";
import { FirebaseError } from "firebase/app";
import { AxiosError } from "axios";
import ToggleDays from "./toggle-days";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AppointmentForm({ open, handleClose, appointment }) {
  const appointmentExist = Object.keys(appointment).length >= 1;
  const queryClient = useQueryClient();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { axiosInstance } = useAxios();
  const methods = useForm({});

  const updateAppointment = useMutation({
    mutationFn: (updatedAppointment) => {
      return axiosInstance.put(`/appointment`, updatedAppointment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("employee");
      toast.success("Cita actualizada exitosamente");
      handleClose(false);
    },
    onError: () => {
      toast.error("Hubo un error actualizando la cita, vuelve a intentarlo.");
    },
  });

  const onSubmit = async (data) => {
    alert(data);
  };

  React.useEffect(() => {
    if (appointmentExist) {
      methods.reset(appointment);
    } else {
      methods.reset({
        name: "",
        branch: {},
        img: null,
        status: "Activo",
      });
    }
  }, [appointment, open]);

  return (
    <Dialog
      open={open}
      fullWidth={true}
      PaperProps={{
        style: { borderRadius: fullScreen ? 0 : 15, padding: "10px" },
      }}
      maxWidth={"sm"}
      TransitionComponent={Transition}
      fullScreen={fullScreen}
      onClose={() => handleClose(false)}
      aria-labelledby="appointment-form"
      aria-describedby="modify an appointment using this dialog"
    >
      <IconButton
        edge="start"
        color="inherit"
        onClick={() => {
          handleClose(false);
        }}
        aria-label="close"
        sx={{
          position: "absolute",
          right: 8,
          top: 22,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle sx={{ m: 0, p: 2 }} id="alert-dialog-title">
        Cita para {appointment.name}
      </DialogTitle>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <DialogContent className=" space-y-3">
          <TextField
            id="name"
            label="Nombre*"
            placeholder="Julio Iglesias"
            fullWidth={true}
            disabled
            {...methods.register("name", {
              required: {
                value: true,
                message: "Este campo no puede estar vacío",
              },
              minLength: {
                value: 5,
                message: "Ingresa al menos 5 caracteres",
              },
              maxLength: 50,
            })}
            inputProps={{ maxLength: 50 }}
            color="primary"
            className="col-span-10 rounded-xl"
            error={!!methods.formState.errors.name}
            helperText={methods.formState.errors.name?.message}
          />

          <TextField
            id="name"
            label="Fecha*"
            placeholder="Julio Iglesias"
            fullWidth={true}
            disabled
            {...methods.register("date", {
              required: {
                value: true,
                message: "Este campo no puede estar vacío",
              },
              minLength: {
                value: 5,
                message: "Ingresa al menos 5 caracteres",
              },
              maxLength: 50,
            })}
            inputProps={{ maxLength: 50 }}
            color="primary"
            className="col-span-10 rounded-xl"
            error={!!methods.formState.errors.name}
            helperText={methods.formState.errors.name?.message}
          />

          {/* <div className="space-y-3 sm:space-y-0">
            <FormControl
              className=" w-full sm:w-1/2 sm:pr-1 "
              error={!!methods.formState.errors.branchId}
            >
              <InputLabel id="branch-select">Sucursal</InputLabel>
              <Controller
                name="branch.id"
                control={methods.control}
                rules={{
                  required: {
                    value: false,
                    message: "La sucursal es requerida",
                  },
                }}
                defaultValue={""}
                render={({ field: { onChange, value } }) => (
                  <Select
                    labelId="branch-label"
                    id="branchId"
                    value={value}
                    label="branch-Id"
                    onChange={onChange}
                  >
                    {getBranches?.data?.data?.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              />
              {!!methods.formState.errors.branchId && (
                <FormHelperText>La sucursal es requerida</FormHelperText>
              )}
            </FormControl>
            <FormControl className=" w-full sm:w-1/2 sm:pl-1">
              <InputLabel id="demo-simple-select-helper-label">
                Estatus
              </InputLabel>
              <Controller
                name="status"
                control={methods.control}
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
          </div> */}
          {/* <FormProvider {...methods}>
            <h1 className="py-1">Dias disponibles</h1>

            <ToggleDays />
          </FormProvider> */}
        </DialogContent>
        <DialogActions>
          <LoadingButton
            target="_blank"
            variant="contained"
            loading={updateAppointment.isLoading}
            type="submit"
          >
            {appointmentExist ? <span>Actualizar </span> : <span>Crear</span>}
          </LoadingButton>
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
