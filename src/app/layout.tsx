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
import { TikTokerVotingModal } from '@/components/TikTokerVotingModal';

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
      <head>
        <link rel="preload" href="/img/Orbi logo.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/img/bestsellers_banner.png" as="image" type="image/png" />
      </head>
      <body className="antialiased selection:bg-[#02367B] selection:text-white bg-slate-50 text-slate-900">
        <CartProvider>
          <div className="min-h-screen flex flex-col justify-between">
            <Header />
            <main className="flex-1 w-full pb-16 lg:pb-0">
              {children}
            </main>
            <Footer />
            <MobileBottomNav />
          </div>
          <FloatingActionButton />

          <LanguageSelectionModal />
          <TikTokerVotingModal />
          <ToastContainer />
          <CartDrawer />
          <ProductComparison />
          <AskQuestionModal />
          <QuickViewModal />
        </CartProvider>

        {/* Browser Caching Service Worker Registration Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function(err) {
                    console.log('SW registration failed:', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
