import SearchOffIcon from "@mui/icons-material/SearchOff";
export default function EmptyMessage({ message }) {
  return (
    <section className="flex flex-col justify-center px-5 items-center h-52">
      <SearchOffIcon fontSize="large" className="text-neutral-300" />
      {/* <h2>Ha occurrido un error</h2> */}
      <p className="text-center text-neutral-400">{message}</p>
    </section>
  );
}
