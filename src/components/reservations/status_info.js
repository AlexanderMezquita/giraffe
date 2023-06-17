import { useFormContext } from "react-hook-form";

export default function Status() {
  const { getValues } = useFormContext();

  return (
    <div className=" p-3  rounded-lg  bg-tertiary/80 mx-5   ">
      <p className="text-lg">{getValues("service")}</p>
      <p className="text-neutral-600">
        {getValues("branch")} <span>{getValues("date.$D")} </span>
        <span>{getValues("date.$M") + 1} </span>
        <span>{getValues("date.$y")}</span>
      </p>
    </div>
  );
}
