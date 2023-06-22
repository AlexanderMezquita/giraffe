import Image from "next/image";

export default function NavBar() {
  return (
    <nav className="bg-white w-full fixed border block sm:hidden border-b-2 z-10 border-neutral-100 ">
      <div className="flex justify-between h-14 items-center max-w-screen-xl mx-auto px-4">
        <h2>Reserva tu cita</h2>
        <Image
          src="/nav-logo.png"
          width={40}
          height={40}
          alt="logo"
          // priority={true}
          placeholder="blur"
          blurDataURL="/nav-logo.png"
        />
      </div>
    </nav>
  );
}
