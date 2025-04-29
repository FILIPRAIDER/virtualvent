export const normalizeSlug = (str: string) => {
  return str
    .toLowerCase() // Convertir a minúsculas
    .normalize("NFD") // Normaliza los caracteres especiales
    .replace(/[\u0300-\u036f]/g, "") // Elimina los caracteres acentuados
    .replace(/\s+/g, "-") // Reemplaza los espacios por guiones
    .replace(/[^a-z0-9\-]/g, "") // Elimina los caracteres no alfanuméricos excepto los guiones
    .replace(/--+/g, "-") // Elimina los guiones consecutivos
    .replace(/^-+|-+$/g, ""); // Elimina los guiones al principio y al final
};
