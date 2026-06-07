import type { Metadata } from "next";
import { Bebas_Neue, Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://benjamenoladokun.com"),
  title: "Benjamen Oladokun | Entrepreneur • Builder • Visionary",
  description:
    "Benjamen Oladokun is an entrepreneur, business strategist, leadership speaker, and public figure building ventures that scale with purpose.",
  keywords: [
    "Entrepreneur",
    "Business Strategist",
    "Co Founder",
    "Leadership Speaker",
    "Corporate Trainer",
    "Public Figure",
  ],
  openGraph: {
    title: "Benjamen Oladokun | Entrepreneur • Builder • Visionary",
    description:
      "Building ventures that scale with purpose. Entrepreneur, speaker, advisor, and public figure.",
    type: "website",
    images: ["/images/benjamen-oladokun.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Benjamen Oladokun",
    description:
      "Entrepreneur, business strategist, leadership speaker, and public figure.",
    images: ["/images/benjamen-oladokun.jpg"],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Benjamen Oladokun",
  jobTitle: "Entrepreneur",
  description:
    "Entrepreneur, business strategist, leadership speaker, and public figure.",
  image: "/images/benjamen-oladokun.jpg",
  url: "https://benjamenoladokun.com",
  sameAs: [
    "https://linkedin.com",
    "https://instagram.com",
    "https://x.com",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${manrope.variable} ${bebasNeue.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="min-h-full font-body" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
