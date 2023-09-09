import { useFormContext } from "react-hook-form";

export default function Status() {
  const { watch } = useFormContext();

  const getMonth = (value) => {
    switch (value) {
      case 0:
        return "Enero";
      case 1:
        return "Febrero";
      case 2:
        return "Marzo";
      case 3:
        return "Abril";
      case 4:
        return "Mayo";
      case 5:
        return "Junio";
      case 6:
        return "Julio";
      case 7:
        return "Agosto";
      case 8:
        return "Septiembre";
      case 9:
        return "Octubre";
      case 10:
        return "Noviembre";
      case 11:
        return "Diciembre";
    }
  };

  return (
    <div className=" p-3  rounded-lg   bg-tertiary/80 mx-5   ">
      <h2 className="font-semibold font-sans">{watch("service.name")}</h2>
      <p className="text-neutral-600 text-[12px]">
        {watch("branch.name")}
        {watch("time") ? (
          <span>
            <span>, {watch("date.$D")} </span>
            <span>de {getMonth(watch("date.$M"))} </span>
            <span> a las {watch("time")}</span>{" "}
          </span>
        ) : (
          ""
        )}
      </p>
    </div>
  );
}
