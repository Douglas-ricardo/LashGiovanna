import type React from "react"
import { Poppins } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
})

export const metadata = {
  title: "Studio Rosa Cílios - Extensão de Cílios em São Paulo",
  description:
    "Studio especializado em extensão de cílios fio a fio, volume brasileiro e manutenção. Agende seu horário online!",
  keywords: "extensão de cílios, cílios fio a fio, volume brasileiro, studio de beleza, São Paulo, agendamento online",
  authors: [{ name: "Studio Rosa Cílios" }],
  creator: "Studio Rosa Cílios",
  publisher: "Studio Rosa Cílios",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://studio-rosa.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Studio Rosa Cílios - Extensão de Cílios em São Paulo",
    description:
      "Studio especializado em extensão de cílios fio a fio, volume brasileiro e manutenção. Agende seu horário online!",
    url: "https://studio-rosa.vercel.app",
    siteName: "Studio Rosa Cílios",
    images: [
      {
        url: "/studio-de-cilios-elegante-rosa-e-dourado.png",
        width: 1200,
        height: 630,
        alt: "Studio Rosa Cílios - Extensão de Cílios Profissional",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Rosa Cílios - Extensão de Cílios em São Paulo",
    description:
      "Studio especializado em extensão de cílios fio a fio, volume brasileiro e manutenção. Agende seu horário online!",
    images: ["/studio-de-cilios-elegante-rosa-e-dourado.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ec4899" />
        <meta name="msapplication-TileColor" content="#ec4899" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="min-h-screen bg-background text-foreground">{children}</body>
    </html>
  )
}
