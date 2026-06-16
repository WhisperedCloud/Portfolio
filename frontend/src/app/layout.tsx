import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import CustomCursor from '@/components/layout/CustomCursor';
import VoiceToggle from '@/components/ui/VoiceToggle';
import SpatialBackground from '@/components/ui/SpatialBackground';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Interactive 3D Portfolio',
  description: 'A highly unique, premium-quality 3D portfolio website.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-white text-black antialiased selection:bg-black selection:text-white`}>
        <CustomCursor />
        <VoiceToggle />
        {children}
      </body>
    </html>
  );
}
