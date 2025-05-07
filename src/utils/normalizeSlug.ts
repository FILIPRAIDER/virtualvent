export const normalizeSlug = (str: string) => {
  return str
    .toLowerCase() // Convertir a minúsculas
    .normalize("NFD") // Normaliza los caracteres especiales
    .replace(/[\u0300-\u036f]/g, "") // Elimina los caracteres acentuados
    .replace(/[^a-z0-9\s-]/g, "") // Solo eliminamos caracteres no alfanuméricos, pero mantenemos espacios
    .replace(/\s+/g, "-") // Reemplaza los espacios por guiones solo en la parte de búsqueda
    .replace(/--+/g, "-") // Elimina los guiones consecutivos
    .replace(/^-+|-+$/g, ""); // Elimina los guiones al principio y al final
};
