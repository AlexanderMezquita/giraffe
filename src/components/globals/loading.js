import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
  return (
    <section className="flex justify-center items-center h-52">
      <CircularProgress className="text-primary " />
    </section>
  );
}
