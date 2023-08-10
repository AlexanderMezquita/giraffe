import SearchOffIcon from "@mui/icons-material/SearchOff";
export default function EmptyMessage({ message }) {
  return (
    <section className="flex flex-col justify-center px-5 items-center h-52">
      <SearchOffIcon />
      {/* <h2>Ha occurrido un error</h2> */}
      <p className="text-center">{message}</p>
    </section>
  );
}
