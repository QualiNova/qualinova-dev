import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/organisms/Footer/Footer';
import Header from '@/components/organisms/Header/Header';
import { UserProvider } from './useContext/UserContext';
const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'QualiNova - Create Certificate',
  description: 'Create blockchain-verified certificates',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
