import Image from "next/image";

export default function AboutUsPage() {
  return (
    <div>
      <Image
        src="/imgs/Frame12.png"
        width={402}
        height={248}
        className="w-screen hidden md:block object-cover"
        alt="Equipo de trabajo"
      />
      <Image
        src="/imgs/AboutUs.webp"
        width={402}
        height={248}
        className="w-screen md:hidden object-cover"
        alt="Equipo de trabajo"
      />

      <article className="flex flex-col w-full py-6 md:py-12 px-4 md:max-w-[700px] mx-auto">
        <h1 className="poppins font-bold text-black text-3xl">
          Sobre Nosotros
        </h1>
        <p className="poppins text-[#575757] text-sm mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </article>
      <section className="flex flex-col w-full  py-6 px-4 bg-[#D9D9D9]">
        <h1 className="poppins font-bold text-black text-3xl md:ml-80">
          Datos Basicos
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 place-items-center md:max-w-[1100px] mx-auto">
          <div className="h-32 w-36 rounded bg-white"></div>
          <div className="h-32 w-36 rounded bg-white"></div>
          <div className="h-32 w-36 rounded bg-white"></div>
          <div className="h-32 w-36 rounded bg-white"></div>
          <div className="h-32 w-36 rounded bg-white"></div>
          <div className="h-32 w-36 rounded bg-white"></div>
          <div className="h-32 w-36 rounded bg-white"></div>
          <div className="h-32 w-36 rounded bg-white"></div>
        </div>
      </section>
    </div>
  );
}
