import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-52">
      <CircularProgress className="text-primary " />
    </div>
  );
}
