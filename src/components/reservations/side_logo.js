import Image from "next/image";

import dayjs from "dayjs";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import { Rating, Button, Card } from "@mui/material";

export default function SideLogo() {
  const currentDate = dayjs().day();
  const weekDays = [
    { name: "Domingo", hours: "10:00 am - 5:00 pm" },
    { name: "Lunes", hours: "10:00 am - 5:00 pm" },
    { name: "Martes", hours: "10:00 am - 5:00 pm" },
    { name: "Miércoles", hours: "10:00 am - 5:00 pm" },
    { name: "Jueves", hours: "10:00 am - 5:00 pm" },
    { name: "Viernes", hours: "10:00 am - 5:00 pm" },
    { name: "Sábado", hours: "10:00 am - 5:00 pm" },
  ];

  return (
    <Card variant="outlined" className="rounded-xl m-2 p-4 h-full">
      <aside className="hidden w-44 lg:block mt-2 ">
        <Image
          alt="logo"
          src="/brand.png"
          // priority={true}
          placeholder="blur"
          blurDataURL="/brand.png"
          width={200}
          height={50}
        />
        <h1 className="text-center " id="brand">
          Rizos, Afros Y Mas
        </h1>
        <div className="flex items-center mt-2 gap-1 justify-center">
          <p className=" font text-neutral-700 text-lg mt-[3px]">4.6</p>
          <Rating
            name="rating"
            defaultValue={4.5}
            precision={0.5}
            readOnly
            className="text-primary"
          />
        </div>
        <div className="mt-3">
          <Button
            className=" capitalize bg-tertiary "
            fullWidth
            style={{ flex: "start" }}
            color="inherit"
            startIcon={<InsertInvitationIcon color="primary" />}
          >
            <h2>Reservar cita </h2>
          </Button>
        </div>
      </aside>
    </Card>
  );
}
