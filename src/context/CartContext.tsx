'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Product } from '@/types/product';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface CartContextType {
  cart: CartItem[];
  wishlist: string[]; // product IDs
  compareList: Product[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  toggleCompare: (product: Product) => void;
  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;
  isAskQuestionOpen: boolean;
  setIsAskQuestionOpen: (open: boolean) => void;
  isPageNavigating: boolean;
  triggerPageLoading: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isAskQuestionOpen, setIsAskQuestionOpen] = useState(false);
  const [isPageNavigating, setIsPageNavigating] = useState(false);

  // Automatically reset navigation loading spinner when route changes
  useEffect(() => {
    setIsPageNavigating(false);
  }, [pathname]);

  // Fast 600ms maximum duration trigger to prevent any stuck loading
  const triggerPageLoading = () => {
    setIsPageNavigating(true);
    const timer = setTimeout(() => {
      setIsPageNavigating(false);
    }, 600);
    return () => clearTimeout(timer);
  };

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: Product, quantity = 1, color?: string, size?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          product,
          quantity,
          selectedColor: color || product.colors[0]?.name || 'Standard',
          selectedSize: size || product.sizes[0] || 'Standard',
        },
      ];
    });
    setIsCartOpen(true);
    addToast('Added to Cart', `${product.name} added to your shopping cart!`, 'success');
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
    addToast('Item Removed', 'Product removed from your cart.', 'info');
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('Removed from Wishlist', 'Item removed from saved list.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        addToast('Saved to Wishlist', 'Item saved to your wishlist!', 'success');
        return [...prev, productId];
      }
    });
  };

  const toggleCompare = (product: Product) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        addToast('Removed from Compare', 'Item removed from comparison.', 'info');
        return prev.filter((p) => p.id !== product.id);
      } else {
        if (prev.length >= 4) {
          addToast('Compare Limit Reached', 'You can compare up to 4 items at once.', 'warning');
          return prev;
        }
        addToast('Added to Compare', `${product.name} added to comparison.`, 'success');
        return [...prev, product];
      }
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        compareList,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        toggleCompare,
        toasts,
        addToast,
        removeToast,
        quickViewProduct,
        setQuickViewProduct,
        isCompareOpen,
        setIsCompareOpen,
        isAskQuestionOpen,
        setIsAskQuestionOpen,
        isPageNavigating,
        triggerPageLoading,
      }}
    >
      {children}

      {/* Global Product Click Fast Spinner Overlay */}
      {isPageNavigating && (
        <div className="fixed inset-0 z-50 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 select-none font-sans animate-in fade-in duration-200">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-[#02367B] rounded-full animate-spin" />
            <span className="text-xs font-bold text-slate-600 tracking-wider uppercase">
              Loading...
            </span>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
