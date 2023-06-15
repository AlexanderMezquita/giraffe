import { useFormContext } from "react-hook-form";

export default function Status() {
  const { getValues } = useFormContext();
  return (
    <div className=" px-4 flex items-center  bg-tertiary/80 mx-5 h-14  ">
      <h1>{getValues("service")}</h1>
      <p>{getValues("branch")}</p>
    </div>
  );
}
