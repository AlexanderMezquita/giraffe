import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CameraAltRounded } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import useAxios from "@/axios";
import { Controller, useForm } from "react-hook-form";
import {
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteImage, uploadImage } from "@/utils/image-handler";
import { FirebaseError } from "firebase/app";
import { AxiosError } from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ServiceForm({ open, handleClose, service, toast }) {
  const serviceExist = Object.keys(service).length >= 1;
  const queryClient = useQueryClient();
  const [imageLoading, setImageLoading] = React.useState(false);
  const [imgFile, setImgFile] = React.useState();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const minutesList = ["15 min", "30 min", "45 min", "1h", "1h 30m", "2h"];

  const { axiosInstance } = useAxios();
  const {
    register,
    formState: { errors },
    control,
    getValues,
    handleSubmit,
    setValue,
    reset,
    watch,
  } = useForm();

  const createService = useMutation({
    mutationFn: (newService) => {
      return axiosInstance.post(`/service`, newService);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("services");
      toast.success("Servicio creado exitosamente");
    },
    onError: () => {
      toast.error("Hubo un error creando el servicio, vuelve a intentarlo.");
    },
    onSettled: () => {
      handleClose(false);
    },
  });

  const updateService = useMutation({
    mutationFn: (updatedService) => {
      return axiosInstance.put(`/service`, updatedService);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("services");
      toast.success("Servicio actualizado exitosamente");
    },
    onError: () => {
      toast.error(
        "Hubo un error actualizando el servicio, vuelve a intentarlo."
      );
    },
    onSettled: () => {
      handleClose(false);
    },
  });

  const onSubmit = async (data) => {
    try {
      if (data.img !== null && imgFile) {
        setImageLoading(true);
        const url = await uploadImage(imgFile, "services");
        data.img = url;
      }
      serviceExist ? updateService.mutate(data) : createService.mutate(data);
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error("Error subiendo la imagen");
      } else if (error instanceof AxiosError) {
        toast.error("Error de creando o actualizando el servicio");
        deleteImage(imgFile, "services");
      } else {
        toast.error("Error porfavor intentelo de nuevo");
      }
    } finally {
      setImageLoading(false);
    }
  };

  React.useEffect(() => {
    if (serviceExist) {
      reset(service);
    } else {
      reset({
        name: "",
        price: 0,
        img: null,
        status: "Activo",
      });
    }
  }, [service, open]);

  return (
    <Dialog
      open={open}
      fullWidth={true}
      PaperProps={{
        style: { borderRadius: fullScreen ? 0 : 15, padding: "10px" },
      }}
      TransitionComponent={Transition}
      fullScreen={fullScreen}
      maxWidth={"sm"}
      onClose={() => handleClose(false)}
      aria-labelledby="service-form"
      aria-describedby="create a service using this dialog"
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
        {serviceExist ? <span>Actualizar </span> : <span>Crear</span>} Servicio
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <figure className="relative mx-auto w-40 h-40  outline-dashed outline-2 outline-neutral-200  p-2  rounded-full">
          <Button
            component="label"
            className="rounded-full absolute inset-0 m-2 hover:bg-black opacity-70 "
          >
            {watch("img") ? (
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
                        // console.log(e.target.files[0]);
                        onChange(URL.createObjectURL(e.target.files[0]));
                        setImgFile(e.target.files[0]);
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
            src={watch("img") ? getValues("img") : null}
            alt="service_image"
            className=" w-36 h-36 object-cover rounded-full transition-all text-[0] "
          />
        </figure>
        <p className="text-xs px-8 m-5 text-center  text-neutral-500">
          Permitido *.jpeg, *.jpg, *.png, max size of 3.1 MB
        </p>
        <DialogContent className=" space-y-3">
          <TextField
            id="name"
            label="Nombre*"
            placeholder="Corte de pelo"
            fullWidth={true}
            {...register("name", {
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
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            id="description"
            label="Descripción*"
            placeholder="Procedimiento básico donde se recorta o da forma al cabello sin realizar cambios drásticos en el estilo actual"
            fullWidth={true}
            multiline={true}
            rows={4}
            {...register("description", {
              required: {
                value: true,
                message: "Este campo no puede estar vacío",
              },
              minLength: {
                value: 5,
                message: "Ingresa al menos 5 caracteres",
              },
              maxLength: 500,
            })}
            inputProps={{ maxLength: 500 }}
            color="primary"
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <div className="space-y-3 sm:space-y-0">
            <FormControl className=" w-full sm:w-1/3 sm:pr-1 ">
              <TextField
                id="price"
                label="Precio*"
                placeholder="6,000"
                type="number"
                {...register("price", {
                  required: {
                    value: true,
                    message: "Este campo no puede estar vacío",
                  },
                  maxLength: 20,
                })}
                inputProps={{ maxLength: 20, min: 0 }}
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            </FormControl>
            <FormControl className=" w-full sm:w-1/3 sm:pl-1">
              <InputLabel id="demo-simple-select-helper-label">
                Tiempo estimado
              </InputLabel>
              <Controller
                name="estimatedTime"
                control={control}
                defaultValue={"30 min"}
                rules={{ required: "El tiempo estimado es requerido" }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    labelId="status-label"
                    id="estimatedTime"
                    value={value}
                    label="estimatedTime"
                    onChange={onChange}
                  >
                    {minutesList.map((item) => {
                      return (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              />
            </FormControl>
            <FormControl className=" w-full sm:w-1/3 sm:pl-1">
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
          <LoadingButton
            target="_blank"
            variant="contained"
            loading={
              createService.isLoading || updateService.isLoading || imageLoading
            }
            type="submit"
          >
            {serviceExist ? <span>Actualizar </span> : <span>Crear</span>}
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
