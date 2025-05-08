import Image from "next/image";

export default function AboutUsPage() {
  return (
    <div className="font-sans">
      {/* Imagen con texto superpuesto */}
      <div className="relative w-full h-[80vh] max-sm:w-[402px] max-sm:h-[188px] mx-auto">
        <Image
          src="/imgs/nosotros.jpg"
          alt="Equipo de trabajo"
          fill
          className="object-cover max-sm:!relative max-sm:!w-full max-sm:!h-full"
        />

        {/* Sombreado inferior en negro */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/40 z-10" />

        <div className="absolute mt-20 md:mt-70 inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-20 gap-[10px]">
          <h3 className="text-[20px] sm:text-[24px] md:text-[64px] leading-[111%] font-light font-poppins">
            Comprometidos con el <span className="font-bold">cambio</span>,
          </h3>
          <h3 className="text-lg text-[15px] sm:text-xl md:text-[50px] font-light font-poppins">
            conectados por el propósito
          </h3>
          <p className="max-w-[500px] font-poppins text-[10px] sm:text-[16px] leading-[111%] font-light tracking-[0em] text-center text-white antialiased">
            Impulsamos la economía solidaria con tecnología y compromiso social.
          </p>
        </div>
      </div>

      {/* Sección Sobre Nosotros estilo mejorado */}
      <section className="w-full bg-white py-12 px-4">
        <div className="w-full font-poppins flex flex-col md:flex-row gap-4">
          {/* Columna izquierda: título */}
          <div className="px-8 w-full md:w-[180px] flex-shrink-0">
            <p className="text-[#252525] text-base font-light">• Sobre Nosotros</p>
          </div>

          {/* Columna derecha: texto justificado */}
          <div className="flex-1">
            <p className="text-[#252525] text-[18px] font-light leading-[180%] md:text-left mr-2">
              VirtualVent es una iniciativa digital solidaria liderada por jóvenes de la Universidad Cooperativa de Colombia en articulación con TransDigitalCoop. Nuestro propósito es acortar la brecha entre los pequeños productores y los consumidores, a través de plataformas digitales colaborativas que promueven el comercio justo. Somos una comunidad comprometida con la transformación social, la soberanía alimentaria y la economía solidaria, generando circuitos económicos justos mediante el uso estratégico de la tecnología.
            </p>
          </div>
        </div>
      </section>

      {/* Sección de estadísticas */}
      <div className="w-full flex mb-16 px-4">
        <div className="w-full ml-0 md:ml-52 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-6 text-left text-[#0F3E49] font-poppins">
          <div className="border-l border-gray-300 px-4 py-2">
            <h3 className="text-2xl font-bold text-[#093F51]">0</h3>
            <p className="text-sm text-[#5A5A5A]">Consumidores beneficiados</p>
          </div>
          <div className="border-l border-gray-300 px-4 py-2">
            <h3 className="text-2xl font-bold text-[#093F51]">6</h3>
            <p className="text-sm text-[#5A5A5A]">Productores locales vinculados</p>
          </div>
          <div className="border-l border-gray-300 px-4 py-2">
            <h3 className="text-2xl font-bold text-[#093F51]">1</h3>
            <p className="text-sm text-[#5A5A5A]">Con presencia activa en Colombia</p>
          </div>
          <div className="border-l border-gray-300 px-4 py-2">
            <h3 className="text-2xl font-bold text-[#093F51]">100%</h3>
            <p className="text-sm text-[#5A5A5A]">De satisfacción entre los participantes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
