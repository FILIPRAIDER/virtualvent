"use client";

import Image from "next/image";
import {
  TbShoppingCartFilled,
  TbBellFilled,
  TbUserCircle,
  TbMenu2,
  TbUser,
} from "react-icons/tb";
import { useUiStore } from "@/store";
import Link from "next/link";
import { useState } from "react";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { logout } from "@/lib/logout";
import { BsBoxSeam } from "react-icons/bs";
import { useCartStore } from "@/store"; // Importar la tienda del carrito

export const TopMenu = () => {
  const { data: session } = useSession();
  const [isHovered, setIsHovered] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const openSideMenu = useUiStore((state) => state.openSideMenu);
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen);
  const closeMenu = useUiStore((state) => state.closeSideMenu);
  const pathname = usePathname();
  const router = useRouter();

  // Obtener el total de productos en el carrito
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    const newTimeoutId = setTimeout(() => {
      setIsHovered(false);
    }, 200); // 200ms de retraso
    setTimeoutId(newTimeoutId);
  };

  const handleNavigation = (url: string) => {
    setIsHovered(false);
    router.push(url);
  };

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
            className="p-2 rounded-md transition-all"
            href="/tiendas-oficiales"
          >
            Tiendas Oficiales
          </Link>
          <Link className="p-2 rounded-md transition-all" href="/categorias">
            Categorias
          </Link>
          <Link
            className="p-2 rounded-md transition-all"
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
        <div className="items-center text-[#575757] flex">
          <div className="hidden sm:block relative items-center mr-4">
            <input
              className="border text-[12px] font-light p-2 w-[200px] sm:w-[280px] font-n rounded-[4px] transition-al border-[#575757]/80 h-7"
              placeholder="Buscar"
              type="text"
            />
            <IoSearchOutline className="absolute right-2 top-[20%]" />
          </div>
          {/* Icons */}
          <div className="flex gap-1">
            <Link href="/carrito">
              <div className="relative">
                <TbShoppingCartFilled
                  size={24}
                  className="mx-2 cursor-pointer"
                />
                {/* Mostrar el número de productos en el carrito */}
                {totalItemsInCart > 0 && (
                  <span className="absolute top-0 right-0 text-xs rounded-full bg-blue-700 text-white px-1">
                    {totalItemsInCart}
                  </span>
                )}
              </div>
            </Link>
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

          {/* User Icon and Dropdown */}
          <TbBellFilled
            size={24}
            className="cursor-pointer mr-2 hidden md:block"
          />
          <div
            className="items-center gap-2 mr-2 hidden sm:flex relative group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <TbUserCircle size={24} className="cursor-pointer" />
            {isHovered && (
              <div
                className="absolute top-full -right-4 bg-white shadow-lg rounded-b-md p-2 mt-2 w-48 z-50 transition-all duration-300 ease-in-out transform scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {session ? (
                  <>
                    <Link
                      href="perfil"
                      onClick={() => handleNavigation("/perfil")}
                      className="flex items-center py-2 text-sm text-gray-700 hover:bg-gray-100 px-4"
                    >
                      <TbUser size={20} className="mr-2" />
                      Perfil
                    </Link>
                    <Link
                      href="/mis-pedidos"
                      onClick={() => handleNavigation("/mis-pedidos")}
                      className="flex items-center py-2 text-sm text-gray-700 hover:bg-gray-100 px-4"
                    >
                      <BsBoxSeam size={20} className="mr-2" />
                      Mis Pedidos
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        handleNavigation("/"); // Redirect after logout
                      }}
                      className="flex items-center py-2 text-sm text-gray-700 hover:bg-gray-100 px-4 w-full text-left"
                    >
                      <IoClose size={20} className="mr-2" />
                      Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      onClick={() => handleNavigation("/auth/login")}
                      className="flex items-center py-2 text-sm text-gray-700 hover:bg-gray-100 px-4"
                    >
                      <TbUserCircle size={20} className="mr-2" />
                      Iniciar Sesión
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
