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
import { useState, useEffect } from "react";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation"; // Importing useRouter for handling redirections
import { useSession } from "next-auth/react";
import { logout } from "@/lib/logout";
import { BsBoxSeam } from "react-icons/bs";

export const TopMenu = () => {
  const { data: session } = useSession();
  const [isHovered, setIsHovered] = useState(false);

  // Define the timeoutId as NodeJS.Timeout | null to avoid type errors
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const openSideMenu = useUiStore((state) => state.openSideMenu);
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen);
  const closeMenu = useUiStore((state) => state.closeSideMenu);
  const pathname = usePathname();

  const [loaded, setLoaded] = useState(false);

  const router = useRouter(); // Using useRouter to handle the navigation and close the dropdown

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId); // Clear previous timeout if exists
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    const newTimeoutId = setTimeout(() => {
      setIsHovered(false);
    }, 200); // 200ms delay
    setTimeoutId(newTimeoutId); // Save the new timeoutId
  };

  const handleNavigation = (url: string) => {
    setIsHovered(false); // Close the dropdown when navigating
    router.push(url); // Perform the navigation
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

          {/* User Icon and Dropdown */}
          <div
            className="items-center gap-2 mr-2 hidden sm:flex relative group"
            onMouseEnter={handleMouseEnter} // Using the new handleMouseEnter
            onMouseLeave={handleMouseLeave} // Using the new handleMouseLeave
          >
            <TbBellFilled size={24} />
            <TbUserCircle size={24} className="cursor-pointer" />

            {/* Dropdown for user */}
            {isHovered && (
              <div
                className="absolute top-full -right-4 bg-white shadow-lg rounded-b-md p-2 mt-2 w-48 z-50 transition-all duration-300 ease-in-out transform scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                onMouseEnter={handleMouseEnter} // Keep open when hovering the dropdown
                onMouseLeave={handleMouseLeave} // Close after the delay when leaving the dropdown
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
