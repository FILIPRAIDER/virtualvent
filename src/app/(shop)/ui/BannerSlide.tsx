import Link from "next/link";
import { TbCircleArrowDownFilled } from "react-icons/tb";

export const BannerSlide = () => {
  return (
    <div className="h-screen z-0 w-full bg-[url('/imgs/banner.webp')] bg-cover bt-top bg-no-repeat ">
      <div className="flex flex-col text-center">
        <div className="flex z-10 justify-center h-full w-full text-center text-white text-4xl font-bold mt-6 px-6">
          <h1 className="text-[30px] md:text-[80px] uppercase bowlby tracking-[4px] max-w-6xl mt-20 antialiased">
            Transformando mercados, empoderando{" "}
            <span className="text-[#63C0E8]">comunidades</span>
          </h1>
        </div>
        <div className="mx-auto mt-6 w-full text-center max-w-3xl">
          <p className="text-white antialiased poppins font-medium ">
            Frutas, verduras y más productos frescos, cultivados con amor y
            listos para recoger. Compra fácil, calidad garantizada.
          </p>
        </div>

        <div className="flex gap-4 mx-auto mt-4">
          <button className="text-black bg-white rounded-[4px] p-1.5 border border-[#575757] shadow-md cursor-pointer">
            Compra ya!
          </button>
          <Link
            href="/auth/new-account"
            className="text-white rounded-[4px] p-1.5 border border-[#575757] shadow-md bg-[#093f51] cursor-pointer"
          >
            Registrarse
          </Link>
        </div>

        <div>
          <p className="bowlby text-sm font-normal uppercase text-white mt-24 tracking-[2px]">
            Sigue deslizando
          </p>
          <TbCircleArrowDownFilled
            size={48}
            className="mx-auto mt-4 animate-bounce text-white"
          />
        </div>
      </div>
    </div>
  );
};
