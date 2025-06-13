"use client";

import { useState } from "react";
import { crearPagoPSE } from "@/actions/payments/crear-pago-pse";

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
    } | null;
  };
}

interface PagoButtonProps {
  order: PlainOrder;
  bancos: { description: string; financial_code: string }[];
}

export default function PagoButton({ order, bancos }: PagoButtonProps) {
  const [loading, setLoading] = useState(false);
  const [bancoSeleccionado, setBancoSeleccionado] = useState("");

  const handleClick = async () => {
    if (!bancoSeleccionado) {
      alert("Por favor selecciona un banco");
      return;
    }

    setLoading(true);
    try {
      const res = await crearPagoPSE({
        uuidOrden: order.uuid,
        valor: String(order.total),
        email: order.user.email,
        nombre: order.user.clientes?.primer_nombre ?? "",
        apellido: order.user.clientes?.primer_apellido ?? "",
        cedula: order.user.clientes?.numero_documento ?? "",
        celular: order.user.clientes?.telefono ?? "",
        banco: bancoSeleccionado,
      });

      console.log("Respuesta de crearPagoPSE:", res);

      if (res.ok && res.url) {
        window.location.href = res.url;
      } else {
        alert("No se pudo obtener URL de pago: " + "Error desconocido");
      }
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error capturado:", error);
      alert(
        "Error al procesar el pago: " + (error.message || "Error desconocido")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 space-y-2">
      <label className="text-sm font-medium block">Seleccione su banco:</label>
      <select
        value={bancoSeleccionado}
        onChange={(e) => setBancoSeleccionado(e.target.value)}
        className="w-full border border-gray-300 rounded p-2 text-sm"
      >
        <option value="" disabled>
          -- Seleccione su banco --
        </option>
        {bancos.map((bank) => (
          <option key={bank.financial_code} value={bank.financial_code}>
            {bank.description}
          </option>
        ))}
      </select>

      <button
        onClick={handleClick}
        disabled={loading}
        className={`border rounded-md w-full h-10 cursor-pointer bg-[#093F51] text-white hover:bg-[#0A4B6D] transition duration-300 ease-in-out flex justify-center items-center ${
          loading ? "cursor-not-allowed" : ""
        }`}
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        ) : (
          "Pagar con PSE"
        )}
      </button>
    </div>
  );
}
