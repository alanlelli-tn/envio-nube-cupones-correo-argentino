import './globals.css';
import { Plus_Jakarta_Sans } from 'next/font/google';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata = {
  title: 'Cupones Correo Argentino – Envío Nube | Resultados',
  description: 'Resultados del tooltip in-app de cupones de descuento de Correo Argentino para activar Envío Nube.',
  robots: { index: false, follow: false },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-AR" className={jakarta.variable}>
      <body>{children}</body>
    </html>
  );
}
