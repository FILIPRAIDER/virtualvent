import { Footer, Sidebar, TopMenu } from "@/components";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Encabezado y navegación */}
      <TopMenu />
      <Sidebar />

      {/* Contenido principal que crece */}
      <div className="flex-grow px-0">{children}</div>

      {/* Footer al fondo */}
      <Footer />
    </div>
  );
}
