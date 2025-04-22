"use client";

import Link from "next/link";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { IoSearchOutline } from "react-icons/io5";
import { AiTwotoneShop } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";

import { useUiStore } from "@/store";
import { logout } from "@/lib/logout";
import { useEffect } from "react";
import {
  TbArrowsExchange2,
  TbCategory,
  TbUser,
  TbUserScan,
} from "react-icons/tb";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen);
  const closeMenu = useUiStore((state) => state.closeSideMenu);
  const pathname = usePathname();
  // const router = useRouter();

  useEffect(() => {
    if (isSideMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Limpieza por si el componente se desmonta
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSideMenuOpen]);

  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  // const isAdmin = session?.user.role === "admin";

  return (
    <div>
      {/* Sidemenu */}
      <nav
        className={clsx(
          "fixed p-5 right-0 w-full h-screen bg-[#F4F4F4] z-40 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-0": isSideMenuOpen,
            "top-18": pathname === "/",
            "top-12": pathname !== "/",
            "translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        {/* Input */}
        <div className="relative mt-2">
          <IoSearchOutline size={20} className="absolute top-2.5 right-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full h-10 bg-gray-50 rounded poppins px-2 py-1 border-1 text-xl border-[#575757] focus:outline-none focus:border-gray-700"
          />
        </div>

        {/* Menú */}

        <div className="flex flex-col poppins text-md text-[#575757]">
          <Link
            href="/tiendas-oficiales"
            onClick={() => closeMenu()}
            className="flex items-center mt-6 rounded transition-all"
          >
            <AiTwotoneShop size={25} />
            <span className="ml-3 text-md">Tiendas Oficiales</span>
          </Link>

          <Link
            href="/categorias"
            onClick={() => closeMenu()}
            className="flex items-center mt-6 rounded transition-all"
          >
            <TbCategory size={25} />
            <span className="ml-3">Categorias</span>
          </Link>
          <Link
            href="/sobre-nosotros"
            onClick={() => closeMenu()}
            className="flex items-center mt-6 rounded transition-all"
          >
            <TbUserScan size={25} />
            <span className="ml-3">Sobre Nosotros</span>
          </Link>
          {isAuthenticated && (
            <>
              <Link
                href="/"
                onClick={() => closeMenu()}
                className="flex items-center mt-6 rounded transition-all"
              >
                <TbArrowsExchange2 size={25} />
                <span className="ml-3">Cambios y devoluciones</span>
              </Link>
              <Link
                href="/mis-pedidos"
                onClick={() => closeMenu()}
                className="flex items-center mt-6 rounded transition-all"
              >
                <BsBoxSeam size={25} />
                <span className="ml-3">Mis pedidos</span>
              </Link>
              <Link
                href="/perfil"
                onClick={() => closeMenu()}
                className="flex items-center mt-6 rounded transition-all"
              >
                <TbUser size={25} />
                <span className="ml-3">Perfil</span>
              </Link>
            </>
          )}
        </div>

        {isAuthenticated ? (
          <button
            className="flex w-full text-white bg-[#093F51] font-light justify-center items-center text-center poppins mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            onClick={() => {
              logout();
              closeMenu();
            }}
          >
            <span className="ml-3 text-xl ">Cerrar Sesión</span>
          </button>
        ) : (
          <Link
            href="/auth/login"
            className="flex w-full text-white bg-[#093F51] font-light justify-center items-center text-center poppins mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            onClick={() => {
              closeMenu();
            }}
          >
            <span className="ml-3 text-xl ">Iniciar Sesión</span>
          </Link>
        )}
      </nav>
    </div>
  );
};
