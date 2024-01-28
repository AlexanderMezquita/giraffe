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
import CancelIcon from "@mui/icons-material/Cancel";
import { formatCurrency } from "@/utils/methods";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ServiceForm({ open, handleClose, service, toast }) {
  const serviceExist = Object.keys(service).length >= 1;
  const queryClient = useQueryClient();
  const [imageLoading, setImageLoading] = React.useState(false);
  const [imgFile, setImgFile] = React.useState();
  const [images, setImages] = React.useState([]);
  const [imagesURLs, setImagesURLs] = React.useState([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const minutesList = [
    { name: "15 min", value: "00:15:00" },
    { name: "30 min", value: "00:30:00" },
    { name: "45 min", value: "00:45:00" },
    { name: "1h", value: "01:00:00" },
    { name: "1h 30m", value: "01:30:00" },
    { name: "2h", value: "02:00:00" },
  ];

  const { axiosInstance } = useAxios();
  const {
    register,
    formState: { errors, isDirty },
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

  const removeElement = (indexToRemove) => {
    if (indexToRemove >= 0 && indexToRemove < imagesURLs.length) {
      const newArray = [
        ...imagesURLs.slice(0, indexToRemove),
        ...imagesURLs.slice(indexToRemove + 1),
      ];
      setImagesURLs(newArray);
    } else {
      console.error("Invalid index");
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    // try {
    //   if (data.img !== null && imgFile) {
    //     setImageLoading(true);
    //     const url = await uploadImage(imgFile, "services");
    //     data.img = url;
    //   }
    //   serviceExist ? updateService.mutate(data) : createService.mutate(data);
    // } catch (error) {
    //   if (error instanceof FirebaseError) {
    //     toast.error("Error subiendo la imagen");
    //   } else if (error instanceof AxiosError) {
    //     toast.error("Error de creando o actualizando el servicio");
    //     deleteImage(imgFile, "services");
    //   } else {
    //     toast.error("Error porfavor intentelo de nuevo");
    //   }
    // } finally {
    //   setImageLoading(false);
    // }
  };

  React.useEffect(() => {
    if (serviceExist) {
      reset(service);
    } else {
      reset({
        name: "",
        price: 0,
        img: [],
        status: "Activo",
      });
    }
  }, [service, open]);

  React.useEffect(() => {
    if (!images) return;

    let tmp = [];
    for (let i = 0; i < images.length; i++) {
      tmp.push(URL.createObjectURL(images[i]));
    }
    const objectUrls = tmp;
    setImagesURLs(objectUrls);
  }, [images]);

  React.useEffect(() => {
    console.log(images);
  }, [images]);

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
        {imagesURLs.map((url, i) => (
          <img src={url} height={300} width={240} key={i} alt="" />
        )) ? (
          <div className=" px-4 p-3 grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center">
            {imagesURLs.map((url, i) => (
              <div className=" relative">
                <IconButton
                  className=" absolute bg-white rounded-full m-2 p-1 right-0"
                  onClick={() => removeElement(i)}
                >
                  <CloseIcon />
                </IconButton>
                <img
                  src={url}
                  height={300}
                  width={240}
                  key={i}
                  alt=""
                  className=" border-2 border-secondary rounded-lg"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col justify-center space-y-2 items-center">
            <span className="text-xs capitalize">Subir Imagen</span>
          </div>
        )}
        <Button component="label" className=" mx-auto w-full">
          <CameraAltRounded />
          <Controller
            control={control}
            name="img"
            render={({ field: { value, onChange, ...field } }) => {
              return (
                <input
                  {...field}
                  alt="serviceImage"
                  value={value?.fileName}
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      // onChange(URL.createObjectURL(e.target.files[0]));
                      setImages(e.target.files);
                    }
                  }}
                  hidden
                  multiple
                  accept="image/*"
                  type="file"
                />
              );
            }}
          />
        </Button>

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
            minRows={5}
            maxRows={8}
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
                onChange={(e) => formatCurrency(e.target.value)}
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
                defaultValue={"00:15:00"}
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
                        <MenuItem key={item.name} value={item.value}>
                          {item.name}
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
            disabled={!isDirty}
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
