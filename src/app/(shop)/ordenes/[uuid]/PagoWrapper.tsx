"use client";

import dynamic from "next/dynamic";

interface PlainOrder {
  uuid: string;
  total: string;
  pagado: boolean;
  user: {
    email: string;
    clientes: {
      primer_nombre: string;
      primer_apellido: string;
      numero_documento: string;
      telefono: string;
    };
  };
}

interface PagoWrapperProps {
  order: PlainOrder;
  bancos: { description: string; financial_code: string }[];
}

const PagoButton = dynamic(() => import("../ui/BottonPago"), {
  ssr: false,
});

export default function PagoWrapper({ order, bancos }: PagoWrapperProps) {
  return <PagoButton order={order} bancos={bancos} />;
}
