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
import ToggleDays from "../globals/toggle-days";

export default function EmployeeForm({ open, handleClose, employee, toast }) {
  const employeeExist = Object.keys(employee).length >= 1;
  const queryClient = useQueryClient();
  const [imageLoading, setImageLoading] = React.useState(false);
  const [imgFile, setImgFile] = React.useState();

  const { axiosInstance } = useAxios();
  const methods = useForm({});

  const { data: getBranches } = useQuery({
    queryKey: ["branchesIDForEmpForm"],
    queryFn: () => {
      return axiosInstance.get(`/branches?Page=${1}&Limit=${50}`);
    },
  });

  const createEmployee = useMutation({
    mutationFn: (newEmployee) => {
      return axiosInstance.post(`/employee`, newEmployee);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("employees");
      toast.success("Empleado creado exitosamente");
      handleClose(false);
    },
    onError: () => {
      toast.error("Hubo un error creando el empleando, vuelve a intentarlo.");
    },
  });

  const updateEmployee = useMutation({
    mutationFn: (updatedEmployee) => {
      return axiosInstance.put(`/employee`, updatedEmployee);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("employee");
      toast.success("Empleado actualizado exitosamente");
      handleClose(false);
    },
    onError: () => {
      toast.error(
        "Hubo un error actualizando el empleado, vuelve a intentarlo."
      );
    },
  });

  const onSubmit = async (data) => {
    try {
      if (data.img !== null && imgFile) {
        setImageLoading(true);
        const url = await uploadImage(imgFile, "employees");
        data.img = url;
      }
      employeeExist ? updateEmployee.mutate(data) : createEmployee.mutate(data);
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error("Error subiendo la imagen");
      } else if (error instanceof AxiosError) {
        toast.error("Error de creando o actualizando el empleado");
        deleteImage(imgFile, "employees");
      } else {
        toast.error("Error porfavor intentelo de nuevo");
      }
    } finally {
      setImageLoading(false);
    }
  };

  React.useEffect(() => {
    if (employeeExist) {
      const filteredSchedules = employee.schedules
        .filter((schedule) => schedule.day >= 0 && schedule.day <= 6)
        .sort((a, b) => a.day - b.day);
      const sortedEmploye = { ...employee, schedules: filteredSchedules };
      methods.reset(sortedEmploye);
    } else {
      methods.reset({
        name: "",
        branch: {},
        img: null,
        status: "Activo",
        schedules: [
          {
            employeeId: 0,
            day: 0,
            entryTime: null,
            entryLunch: null,
            finishLunch: null,
            finishTime: null,
          },
          {
            employeeId: 0,
            day: 1,
            entryTime: null,
            entryLunch: null,
            finishLunch: null,
            finishTime: null,
          },
          {
            employeeId: 0,
            day: 2,
            entryTime: null,
            entryLunch: null,
            finishLunch: null,
            finishTime: null,
          },
          {
            employeeId: 0,
            day: 3,
            entryTime: null,
            entryLunch: null,
            finishLunch: null,
            finishTime: null,
          },
          {
            employeeId: 0,
            day: 4,
            entryTime: null,
            entryLunch: null,
            finishLunch: null,
            finishTime: null,
          },
          {
            employeeId: 0,
            day: 5,
            entryTime: null,
            entryLunch: null,
            finishLunch: null,
            finishTime: null,
          },
          {
            employeeId: 0,
            day: 6,
            entryTime: null,
            entryLunch: null,
            finishLunch: null,
            finishTime: null,
          },
        ],
      });
    }
  }, [employee, open]);

  return (
    <Dialog
      open={open}
      fullWidth={true}
      PaperProps={{
        style: { borderRadius: 15, padding: "10px" },
      }}
      maxWidth={"sm"}
      onClose={() => handleClose(false)}
      aria-labelledby="employee-form"
      aria-describedby="create an employee using this dialog"
    >
      <DialogTitle id="alert-dialog-title">Crear Empleado</DialogTitle>

      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <figure className="relative mx-auto w-40 h-40  outline-dashed outline-2 outline-neutral-200  p-2  rounded-full">
          <Button
            component="label"
            className="rounded-full absolute inset-0 m-2 hover:bg-black opacity-70 "
          >
            {methods.watch("img") ? (
              ""
            ) : (
              <div className="w-full flex flex-col justify-center space-y-2 items-center">
                <CameraAltRounded />
                <span className="text-xs capitalize">Subir Imagen</span>
              </div>
            )}
            <Controller
              control={methods.control}
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
            src={methods.watch("img") ? methods.getValues("img") : null}
            alt="employee_image"
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
            placeholder="Julio Iglesias"
            fullWidth={true}
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

          <div className="space-y-3 sm:space-y-0">
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
          </div>
          <FormProvider {...methods}>
            <h1 className="py-1">Dias disponibles</h1>

            <ToggleDays />
          </FormProvider>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            target="_blank"
            variant="outlined"
            loading={
              createEmployee.isLoading ||
              updateEmployee.isLoading ||
              imageLoading
            }
            color="success"
            type="submit"
          >
            {employeeExist ? <span>Actualizar </span> : <span>Crear</span>}
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
