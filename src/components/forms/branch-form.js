import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CameraAltRounded } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import useAxios from "@/axios";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Divider,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteImage, uploadImage } from "@/utils/image-handler";
import { FirebaseError } from "firebase/app";
import { AxiosError } from "axios";
import ToggleDays from "./toggle-days";
import { FormProvider } from "react-hook-form";
import LaborlessDays from "./laborless-days";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BranchForm({ open, handleClose, branch, toast }) {
  const branchExist = Object.keys(branch).length >= 1;
  const queryClient = useQueryClient();
  const [imageLoading, setImageLoading] = React.useState(false);
  const [imgFile, setImgFile] = React.useState();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { axiosInstance } = useAxios();
  const {
    register,
    formState: { errors, isDirty },
    getValues,
    handleSubmit,
    control,
    reset,
    watch,
  } = useForm();

  const createBranch = useMutation({
    mutationFn: (newBranch) => {
      return axiosInstance.post(`/branch`, newBranch);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("branches");
      toast.success("Sucursal creada exitosamente");
      handleClose(false);
    },
    onError: () => {
      toast.error("Hubo un error creando la sucursal, vuelve a intentarlo.");
    },
  });

  const updateBranch = useMutation({
    mutationFn: (updatedBranch) => {
      return axiosInstance.put(`/branch`, updatedBranch);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("branches");
      toast.success("Sucursal actualizada exitosamente");
      handleClose(false);
    },
    onError: () => {
      toast.error(
        "Hubo un error actualizando la sucursal, vuelve a intentarlo."
      );
    },
  });

  const onSubmit = async (data) => {
    const modifiedData = {
      ...data,
      schedules: data.schedules.map((fieldValue) => ({
        entryTime: fieldValue.entryTime === "" ? null : fieldValue.entryTime,
        finishTime: fieldValue.finishTime === "" ? null : fieldValue.finishTime,
        branchId: fieldValue.branchId,
        day: fieldValue.day,
      })),
      laborLessDays: data.laborLessDays.map((fieldValue) => ({
        fromHour: fieldValue.fromHour === "" ? null : fieldValue.fromHour,
        toHour: fieldValue.toHour === "" ? null : fieldValue.toHour,
        date: fieldValue.date,
        fullDate: fieldValue.fullDate,
        branchId: fieldValue.branchId,
      })),
    };
    try {
      if (modifiedData.img !== null && imgFile) {
        setImageLoading(true);
        const url = await uploadImage(imgFile, "branches");
        modifiedData.img = url;
      }
      branchExist
        ? updateBranch.mutate(modifiedData)
        : createBranch.mutate(modifiedData);
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error("Error subiendo la imagen");
      } else if (error instanceof AxiosError) {
        toast.error("Error de creando o actualizando la sucursal");
        deleteImage(imgFile, "branches");
      } else {
        toast.error("Error porfavor intentelo de nuevo");
      }
    } finally {
      setImageLoading(false);
    }
  };

  React.useEffect(() => {
    if (branchExist) {
      reset(branch);
    } else {
      reset({
        name: "",
        address: "",
        phone: "",
        img: null,
        status: "Activo",
        laborLessDays: [],
        schedules: [
          {
            branchId: 0,
            day: 0,
            entryTime: null,
            finishTime: null,
          },
          {
            branchId: 0,
            day: 1,
            entryTime: null,
            finishTime: null,
          },
          {
            branchId: 0,
            day: 2,
            entryTime: null,
            finishTime: null,
          },
          {
            branchId: 0,
            day: 3,
            entryTime: null,
            finishTime: null,
          },
          {
            branchId: 0,
            day: 4,
            entryTime: null,
            finishTime: null,
          },
          {
            branchId: 0,
            day: 5,
            entryTime: null,
            finishTime: null,
          },
          {
            branchId: 0,
            day: 6,
            entryTime: null,
            finishTime: null,
          },
        ],
      });
    }
  }, [branch, open]);

  return (
    <Dialog
      open={open}
      fullWidth={true}
      PaperProps={{
        style: {
          borderRadius: fullScreen ? 0 : 15,
          paddingTop: "10px",
          paddingBottom: "15px",
        },
      }}
      TransitionComponent={Transition}
      fullScreen={fullScreen}
      maxWidth={"sm"}
      onClose={() => handleClose(false)}
      aria-labelledby="branch-form"
      aria-describedby="create a branch using this dialog"
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
        Crear Sucursal
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
            alt="branch_image"
            className=" w-36 h-36 rounded-full transition-all text-[0] "
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
            id="address"
            label="Dirección*"
            placeholder="C1 #15 2da Planta, Santiago De Los Caballeros 51000, Dominican Republic"
            fullWidth={true}
            {...register("address", {
              required: {
                value: true,
                message: "Este campo no puede estar vacío",
              },
              minLength: {
                value: 5,
                message: "Ingresa al menos 5 caracteres",
              },
              maxLength: 100,
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
          <Divider />
          <FormProvider {...{ register, errors, control, watch }}>
            <h2 className="py-1 text-center">Dias disponibles</h2>

            <ToggleDays />
          </FormProvider>
          <Divider />
          <h2 className="text-center">Dias libres</h2>
          <FormProvider {...{ register, errors, control, watch }}>
            <LaborlessDays branchId={branch.id} />
          </FormProvider>
        </DialogContent>

        <DialogActions>
          <LoadingButton
            target="_blank"
            variant="contained"
            disabled={!isDirty}
            loading={
              createBranch.isLoading || updateBranch.isLoading || imageLoading
            }
            type="submit"
          >
            {branchExist ? <span>Actualizar </span> : <span>Crear</span>}
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
