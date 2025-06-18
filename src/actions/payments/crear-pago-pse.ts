export interface CrearPagoPSEParams {
  uuidOrden: string; // <--- ahora obligatorio
  extra1: string; // UUID del intento
  valor: string;
  nombre: string;
  apellido: string;
  email: string;
  cedula: string;
  celular: string;
  banco: string;
}

export async function crearPagoPSE(data: CrearPagoPSEParams) {
  const ip = "190.000.000.000";

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_EPAYCO_API_URL}/crear`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uuidOrden: data.uuidOrden,
        extra1: data.extra1,
        valor: data.valor,
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        cedula: data.cedula,
        celular: data.celular,
        banco: data.banco,
        ip,
      }),
    }
  );

  const resJson = await response.json();
  console.log("🔍 Respuesta backend crearPagoPSE:", resJson);

  if (!response.ok || !resJson.url) {
    throw new Error(
      resJson?.raw?.data?.text_response || "ePayco no retornó una URL válida"
    );
  }

  return { ok: true, url: resJson.url };
}
