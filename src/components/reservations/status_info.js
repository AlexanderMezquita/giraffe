import { useFormContext } from "react-hook-form";

export default function Status() {
  const { getValues } = useFormContext();
  return (
    <div className=" px-4 flex items-center  bg-secondary/80 mx-5 h-14 max-h-max ">
      <h1>{getValues("service")}</h1>
      <p>{getValues("branch")}</p>
    </div>
  );
}
