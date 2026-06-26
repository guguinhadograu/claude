import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Óticas Aurora | Óculos de Grau, Solar e Lentes de Contato",
  description:
    "Óticas Aurora — referência em eyewear premium no Brasil. Óculos de grau, solar e lentes de contato das melhores marcas: Ray-Ban, Oakley, Prada, Vogue, Armani e Carrera.",
  keywords: [
    "ótica",
    "óculos de grau",
    "óculos solar",
    "lentes de contato",
    "Ray-Ban",
    "Oakley",
    "Prada",
    "Vogue",
    "Armani",
    "Carrera",
    "Óticas Aurora",
  ],
  openGraph: {
    title: "Óticas Aurora | Eyewear Premium",
    description:
      "Descubra a experiência única de escolher óculos com atendimento personalizado e as melhores marcas do mundo.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Óticas Aurora | Eyewear Premium",
    description: "Óculos de grau, solar e lentes das melhores marcas do mundo.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
