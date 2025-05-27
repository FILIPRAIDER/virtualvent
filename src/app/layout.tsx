// layout.tsx o root-layout.tsx
import "./globals.css";
import { Inter, Poppins, Bowlby_One_SC } from "next/font/google";
import { Providers } from "./providers";
import Head from "next/head"; // Importamos Head para manejar los metadatos

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const bowlby = Bowlby_One_SC({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bowlby",
  display: "swap",
});

// Metadatos globales
export const metadata = {
  title: "VirtualVent",
  description: "Tienda para el comercio electrónico",
  openGraph: {
    title: "VirtualVent - Comercio Electrónico",
    description:
      "Compra productos agrícolas directamente de los productores a tu hogar.",
    images: [
      {
        url: "https://www.virtualvent.com.co/LogoVirtualVent.svg", // Reemplaza con la URL de la imagen de tu logo o producto destacado
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image", // Esto se usa para mostrar una tarjeta grande con imagen en Twitter
    site: "@virtualvent", // Aquí puedes colocar el handle de Twitter de tu página
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${poppins.variable} ${bowlby.variable}`}
    >
      <body
        style={{ fontFamily: "var(--font-poppins)" }}
        className="antialiased flex flex-col min-h-screen"
      >
        {/* Agregar metadatos globales */}
        <Head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
          <meta property="og:title" content={metadata.openGraph.title} />
          <meta
            property="og:description"
            content={metadata.openGraph.description}
          />
          <meta
            property="og:image"
            content={metadata.openGraph.images[0]?.url}
          />
          <meta name="twitter:card" content={metadata.twitter.card} />
          <meta name="twitter:site" content={metadata.twitter.site} />
        </Head>

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
