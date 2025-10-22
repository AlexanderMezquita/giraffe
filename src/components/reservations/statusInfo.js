import dayjs from "dayjs";
import { useFormContext } from "react-hook-form";
import "dayjs/locale/es-do";

export default function Status() {
  const { watch } = useFormContext();

  return (
    <div className=" p-3  rounded-lg   bg-tertiary/80 mx-5   ">
      <h2 className="font-semibold font-sans">{watch("service.name")}</h2>
      <p className="text-neutral-600 text-[12px]">
        {watch("branch.name")}
        {watch("time") ? (
          <span>
            <span>, {dayjs(watch("date")).locale("es-do").format("LL")} </span>
            <span> a las {watch("time")}</span>{" "}
          </span>
        ) : (
          ""
        )}
      </p>
    </div>
  );
}
