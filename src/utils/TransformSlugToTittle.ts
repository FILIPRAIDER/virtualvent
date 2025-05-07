export const transformSlugToTitle = (slug: string) => {
  return slug
    .replace(/-/g, " ") // Reemplaza los guiones por espacios
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitaliza la primera letra de cada palabra
};
