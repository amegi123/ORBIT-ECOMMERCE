import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { ToastContainer } from '@/components/Toast';
import { CartDrawer } from '@/components/product/CartDrawer';
import { ProductComparison } from '@/components/product/ProductComparison';
import { AskQuestionModal } from '@/components/product/AskQuestionModal';
import { QuickViewModal } from '@/components/product/QuickViewModal';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { LanguageSelectionModal } from '@/components/LanguageSelectionModal';

export const metadata: Metadata = {
  title: 'Orbit Electronics Ethiopia | Smart 4K TVs, Appliances & Dispensers',
  description:
    'Ethiopia’s premier brand for Orbit Smart 4K UHD TVs, washing machines, and home appliances. 2-Year Genuine Warranty, Express Addis Ababa Delivery, Telebirr & Chapa Payments.',
  keywords: [
    'Orbit TV',
    'Smart TV Ethiopia',
    '4K UHD TV Addis Ababa',
    'Orbit Electronics',
    'Telebirr eCommerce',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-[#02367B] selection:text-white bg-slate-50 text-slate-900">
        <CartProvider>
          <div className="min-h-screen flex flex-col justify-between">
            <Header />
            <main className="flex-1 w-full">
              {children}
            </main>
            <Footer />
            <MobileBottomNav />
          </div>
          <FloatingActionButton />
          <LanguageSelectionModal />
          <ToastContainer />
          <CartDrawer />
          <ProductComparison />
          <AskQuestionModal />
          <QuickViewModal />
        </CartProvider>
      </body>
    </html>
  );
}
