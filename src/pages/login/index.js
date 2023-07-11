import { TextField, Button, Avatar } from "@mui/material";
import useAuth from "@/auth/useAuth";
import { useForm } from "react-hook-form";

export default function Login() {
  const { LogIn } = useAuth();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      await LogIn(data);
    } catch (e) {
      setError("password", { message: "El usuario no se ha encotrado" });
    }
  };

  return (
    <main className=" h-screen    col-span-12 flex md:items-center  pt-12 md:pt-0 justify-center  sm:bg-gray-200">
      <div className=" bg-white h-fit w-full sm:w-80 shadow-none  sm:shadow-lg   rounded-xl  sm:py-10 sm:p-4 p-2 m-2 ">
        <Avatar
          alt="logo"
          variant="square"
          src="/brand.png"
          sx={{ width: 140, height: 85 }}
        />

        <h1 className=" text-3xl font-bold tracking-tighter my-5">
          Iniciar sesion
        </h1>

        {/* Inputs */}
        <form
          className=" space-y-3"
          onSubmit={handleSubmit((data) => handleLogin(data))}
        >
          <TextField
            id="email"
            label="Correo"
            {...register("email", {
              required: {
                value: true,
                message: "Este campo no puede estar vacio",
              },
            })}
            size="small"
            error={!!errors.email || !!errors.password}
            helperText={errors.email?.message}
            fullWidth
            autoComplete="off"
            inputProps={{ maxLength: 50 }}
          />

          <TextField
            autoComplete="off"
            id="password"
            // error={errors}
            label="Contrasena"
            {...register("password", {
              required: {
                value: true,
                message: "Este campo no puede estar vacio",
              },
            })}
            size="small"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            inputProps={{ maxLength: 50 }}
          />

          {/* Sign In Button */}
          <div className="p-3">
            <Button
              className=" rounded-full bg-green-600"
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
            >
              <span className=" text-white font-bold tracking-wider">
                Iniciar sesion
              </span>
            </Button>
          </div>
        </form>
        <hr className="my-4"></hr>
      </div>
    </main>
  );
}
