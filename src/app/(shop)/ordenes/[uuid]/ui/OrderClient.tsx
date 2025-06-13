"use client";

import { useEffect, useState } from "react";
import { currencyFormat } from "@/utils";
import PagoWrapper from "../PagoWrapper";

interface Banco {
  description: string;
  financial_code: string;
}

interface Props {
  plainOrder: {
    uuid: string;
    total: string;
    pagado: boolean;
    num_items: number;
    user: {
      email: string;
      clientes: {
        primer_nombre: string;
        primer_apellido: string;
        numero_documento: string;
        telefono: string;
      };
    };
  };
}

export const OrderClient = ({ plainOrder }: Props) => {
  const [bancos, setBancos] = useState<Banco[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagado, setPagado] = useState(plainOrder.pagado);

  useEffect(() => {
    const fetchBancos = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_EPAYCO_API_URL}/bancos`
        );
        if (!res.ok) throw new Error("Error al cargar bancos");
        const data = await res.json();
        setBancos(Array.isArray(data.bancos) ? data.bancos : []);
      } catch {
        setError("El servidor está en reposo. Espera unos segundos...");
      } finally {
        setLoading(false);
      }
    };

    const fetchEstadoActual = async () => {
      try {
        const res = await fetch(`/api/verificar-orden/${plainOrder.uuid}`);
        const data = await res.json();
        if (data?.ok && data.pagado === true) {
          setPagado(true);
        }
      } catch (err) {
        console.error("Error verificando estado de orden:", err);
      }
    };

    fetchBancos();
    fetchEstadoActual();
  }, [plainOrder.uuid]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen -mt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#093F51] mb-4"></div>
        <p className="text-lg font-semibold">Conectando con el servidor...</p>
        <p className="text-sm text-gray-500">
          Por favor espera mientras cargamos la información de pago.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">Resumen de la Orden</h1>

      <div className="grid sm:grid-cols-2 gap-10">
        <div>
          <p className="text-sm font-medium mb-2">
            Nombre: {plainOrder.user.clientes.primer_nombre}{" "}
            {plainOrder.user.clientes.primer_apellido}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            Documento: {plainOrder.user.clientes.numero_documento}
          </p>
          <p className="text-sm text-gray-600 mb-6">
            Email: {plainOrder.user.email}
          </p>
        </div>

        <div className="bg-white rounded shadow p-6 text-sm w-full">
          <h2 className="text-lg font-semibold mb-2">Resumen del Carrito</h2>
          <div className="grid grid-cols-2 gap-y-1">
            <span>Nº Productos</span>
            <span className="text-right">{plainOrder.num_items}</span>

            <span>Total</span>
            <span className="text-right font-bold">
              {currencyFormat(Number(plainOrder.total))}
            </span>
          </div>

          <p className="text-xs text-gray-600 mt-4">
            ⚠️ Recoge tu pedido en la Universidad Cooperativa de Colombia –
            Montería.
          </p>

          <div className="mt-6">
            <span
              className={`px-2 py-1 text-xs rounded font-semibold ${
                pagado
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {pagado ? "Pagado" : "Pendiente"}
            </span>
          </div>

          {!pagado && <PagoWrapper order={plainOrder} bancos={bancos} />}
        </div>
      </div>
    </div>
  );
};
