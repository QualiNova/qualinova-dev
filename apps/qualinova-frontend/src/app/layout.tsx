import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/organisms/Footer/footer";
import Header from "@/components/organisms/Header/header";
import { UserProvider } from "./useContext/UserContext";
const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "QualiNova - Create Certificate",
  description: "Create blockchain-verified certificates",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GX26MM78LB"
          strategy="afterInteractive"
        />
        <Script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-GX26MM78LB');
          `}
        </Script>
      </head>
      <body className="flex flex-col min-h-screen">
        <UserProvider>
          <Header />
          <main className={`${inter.className} flex-grow`}>{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
