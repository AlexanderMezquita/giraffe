import Image from "next/image";

export default function SideLogo() {
  return (
    <aside className="hidden lg:block ">
      <Image
        alt="logo"
        src="/logo.png"
        priority={true}
        width={300}
        height={50}
      />
      <h1>Brand Name</h1>
    </aside>
  );
}
