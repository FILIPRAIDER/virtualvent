// lib/epayco-verificacion.ts

export async function verificarPagoConEpayco(
  refPayco: string
): Promise<boolean> {
  try {
    const response = await fetch(
      `https://secure.epayco.co/validation/v1/reference/${refPayco}`
    );
    const data = await response.json();

    const estado = data?.data?.x_cod_response;
    return estado === "1"; // 1 = Aprobada
  } catch (error) {
    console.error("Error consultando ePayco:", error);
    return false;
  }
}
