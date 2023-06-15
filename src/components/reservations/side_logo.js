import Image from "next/image";

export default function SideLogo() {
  return (
    <aside className="hidden lg:block mt-2 ">
      <Image
        alt="logo"
        src="/brand.png"
        // priority={true}
        placeholder="blur"
        blurDataURL="/brand.png"
        width={250}
        height={50}
      />
      <h1 className="text-center">Brand Name</h1>
    </aside>
  );
}
