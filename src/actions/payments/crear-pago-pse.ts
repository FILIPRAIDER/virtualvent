export async function crearPagoPSE(data: {
  uuidOrden: string;
  valor: string;
  nombre: string;
  apellido: string;
  email: string;
  cedula: string;
  celular: string;
  banco: string;
}) {
  const ip = "190.000.000.000"; // IP fija de prueba

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_EPAYCO_API_URL}/crear`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, ip }),
    }
  );

  const resJson = await response.json();

  if (!response.ok || !resJson.url) {
    console.error("Respuesta no válida desde el backend:", resJson);
    throw new Error(
      resJson?.raw?.data?.text_response || "ePayco no retornó una URL válida"
    );
  }

  return {
    ok: true,
    url: resJson.url,
  };
}
