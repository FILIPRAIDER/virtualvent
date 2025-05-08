"use client";

import Image from "next/image";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

export const Footer = () => {
  return (
    <footer className="bg-[#101828] text-white text-sm py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-4">
        {/* Logo */}
        <Image
          src="/imgs/LogoFooter.svg"
          alt="Logo VirtualVent"
          width={220}
          height={50}
          priority
        />

        {/* Nombre y descripción */}
        {/* <p className="max-w-md text-gray-300 text-sm">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
          consequuntur amet culpa cum itaque neque.
        </p> */}

        {/* Datos de contacto */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-gray-300 text-sm mt-2">
          <div className="flex items-center gap-2">
            <MdEmail className="text-white" />
            <span>infovirtualvent@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <MdPhone className="text-white" />
            <span>+57 3129472048</span>
          </div>
          <div className="flex items-center gap-2">
            <MdLocationOn className="text-white" />
            <span>Universidad Cooperativa de Colombia, sede Montería</span>
          </div>
        </div>

        {/* Derechos reservados */}
        <p className="text-gray-400 text-xs mt-4">
          Copyright © {new Date().getFullYear()}. Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
};
