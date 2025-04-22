"use client";

import Image from "next/image";
import {
  TbShoppingCartFilled,
  TbBellFilled,
  TbUserCircle,
  TbMenu2,
} from "react-icons/tb";
import { useUiStore } from "@/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";

export const TopMenu = () => {
  const openSideMenu = useUiStore((state) => state.openSideMenu);
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen);
  const closeMenu = useUiStore((state) => state.closeSideMenu);
  const pathname = usePathname();

  // const totalItemsInCart = useCartStore((state) => state.getTotalItems());

  const [loaded, setLoaded] = useState(false);

  console.log(loaded);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {pathname === "/" && (
        <div className="bg-[#093f51] py-0.5">
          <p className="font-semibold text-center text-white text-sm">
            Regalos por compras superiores a 100,000 cop
          </p>
        </div>
      )}

      <nav className="flex px-2 md:px-5 py-6 justify-between items-center w-full h-10">
        {/* Rutas Menu */}
        <div className="hidden md:block text-black font-[500] text-[14px]">
          <Link
            className=" p-2 rounded-md transition-al"
            href="/tiendas-oficiales"
          >
            Tiendas Oficiales
          </Link>
          <Link className="p-2 rounded-md transition-all " href="/categorias">
            Categorias
          </Link>
          <Link
            className="p-2 rounded-md transition-all "
            href="/sobre-nosotros"
          >
            Sobre Nosotros
          </Link>
        </div>

        {/* Logo */}
        <Link href="/" className="flex text-black font-[500] text-[16px] ">
          <Image
            src="/LogoVirtualVent.svg"
            width={300}
            height={60}
            alt="Logo"
            className="w-1/2 md:h-8 md:w-full"
            priority
          />
        </Link>

        {/* Search, Cart, Menu */}

        <div className=" items-center text-[#575757] flex">
          <div className="hidden sm:block relative items-center mr-4">
            <input
              className="border text-[12px] font-light p-2 w-[200px] sm:w-[280px] font-n rounded-[4px] transition-al border-[#575757]/80 h-7"
              placeholder="Buscar"
              type="text"
            />
            <IoSearchOutline className="absolute right-2 top-[20%]" />
          </div>
          {/*Icons*/}
          <div className="flex gap-1">
            <TbShoppingCartFilled size={24} className="mx-2" />
            <div className="relative w-6 h-6 md:hidden">
              <TbMenu2
                size={24}
                onClick={openSideMenu}
                className={`absolute top-0 left-0 transition-opacity duration-300 ${
                  isSideMenuOpen
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100"
                }`}
              />
              <IoClose
                size={24}
                onClick={closeMenu}
                className={`absolute top-0 left-0 transition-opacity duration-300 ${
                  isSideMenuOpen
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              />
            </div>
          </div>
          <div className="items-center gap-2 mr-2 hidden sm:flex">
            <TbBellFilled size={24} />
            <TbUserCircle size={24} className="cursor-pointer" />
          </div>
        </div>
        {/* <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link
          href={totalItemsInCart === 0 && loaded ? "/empty" : "/cart"}
          className="mx-2"
        >
          <div className="relative">
            {loaded && totalItemsInCart > 0 && (
              <span className="fade-in absolute text-xs rounded-full font-bold px-1 -top-2 bg-blue-700 text-white -right-2">
                {totalItemsInCart}
              </span>
            )}
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>
        <button
          onClick={() => openSideMenu()}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Menú
        </button>

      </div> */}
      </nav>
    </>
  );
};
