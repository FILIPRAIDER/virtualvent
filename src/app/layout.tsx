import "./globals.css";
import { Inter, Poppins, Bowlby_One_SC } from "next/font/google";
import { Providers } from "./providers";

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

export const metadata = {
  title: "VirtualVent",
  description: "Tienda para el comercio electronico",
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
        className="font-sans antialiased"
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
