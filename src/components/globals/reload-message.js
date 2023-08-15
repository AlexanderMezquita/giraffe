import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function ReloadMessage({ message }) {
  return (
    <section className="flex flex-col justify-center px-5 items-center h-52">
      <ErrorOutlineIcon
        fontSize="large"
        color="grey"
        className="text-neutral-300"
      />
      <h2>Ha occurrido un error</h2>
      <p className="text-center text-neutral-400">
        Porfavor, vuelve a intentarlo dentro de unos minutos.
      </p>
    </section>
  );
}
