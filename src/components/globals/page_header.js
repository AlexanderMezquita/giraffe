import { Breadcrumbs, Link } from "@mui/material";
import Image from "next/image";

export default function PageHeader({ header, locationRoutes, Icon }) {
  return (
    <div className="flex flex-col w-full m-2 shrink space-y-4">
      <div className="flex items-center ">
        <div className="bg-neutral-100 rounded-full p-2 mr-2 hidden md:flex text-green-400">
          <Image width={40} height={40} alt={header} src={Icon} />
        </div>

        <h1 className="text-xl font-bold ">{header}</h1>
      </div>
    </div>
  );
}
