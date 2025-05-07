import Image from "next/image";

export default function AboutUsPage() {
  return (
    <div>
      <Image
        src="/imgs/nosotros.jpg"
        width={4000}
        height={300}
        className="w-[100%] md:block"
        alt="Equipo de trabajo"
      />

      <article className="flex flex-col w-full py-6 md:py-12 px-4 md:max-w-[700px] mx-auto">
        <h1 className="poppins font-bold text-black text-3xl">
          Sobre Nosotros
        </h1>
        <p className="poppins text-[#575757] text-sm mt-4 text-left max-w-[70ch]">
          VirtualVent es una iniciativa digital solidaria liderada por jóvenes de la Universidad Cooperativa de Colombia en articulación con TransDigitalCoop.
          Nuestro propósito es acortar la brecha entre los pequeños productores  y los consumidores, a través de plataformas digitales colaborativas que promueven el comercio justo. Somos una comunidad comprometida con la transformación social, la soberanía alimentaria y la economía solidaria, generando circuitos económicos justos mediante el uso estratégico de la tecnología.
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
