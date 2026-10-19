import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Cipdify — Your Personal Sound Sanctuary',
  description: 'Your Personal Sound Sanctuary',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F8F9FF] text-[#55536F] antialiased`}>
        {children}
      </body>
    </html>
  );
}