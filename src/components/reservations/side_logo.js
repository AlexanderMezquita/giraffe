import Image from "next/image";

export default function SideLogo() {
  return (
    <aside className="hidden cols-span-3 lg:block min-h-[640px]">
      <Image alt="logo" src="/logo.png" width={300} height={50} />
      <h1>Brand Name</h1>
    </aside>
  );
}
