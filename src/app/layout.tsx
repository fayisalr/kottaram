import type { Metadata, Viewport } from 'next';
import { AppProvider } from '@/context/AppContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kottaram Home Needs | Home Appliances, Smart TVs & Kitchen Deals | Alanallur',
  description: 'Best deals on Smart TVs, Fridges, Washing Machines, ACs & Kitchen Appliances at Kottaram Home Needs, Bank Junction, Alanallur. Phone: 094462 35837.',
  keywords: ['kottaram home needs', 'alanallur home appliances', 'smart tv offers alanallur', 'refrigerator deal', 'washing machine offer alanallur'],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0284c7',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 font-sans min-h-screen flex flex-col antialiased selection:bg-amber-400 selection:text-slate-950 overflow-x-hidden">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
