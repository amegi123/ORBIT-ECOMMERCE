'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { X, Trash2, Minus, Plus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, addToast } = useCart();

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.currentPrice * item.quantity, 0);

  const handleCheckout = (gateway: string) => {
    addToast('Initiating Payment', `Redirecting to ${gateway} Payment Gateway...`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans select-none">
      {/* Overlay Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex z-50">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 h-full overflow-hidden">
          {/* Drawer Header (Fixed Sticky Top with Prominent Close X Button) */}
          <div className="p-4 sm:p-5 border-b border-[#005BAA]/60 flex items-center justify-between bg-[#02367B] text-white shrink-0 sticky top-0 z-20">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-sm sm:text-base">
                Your Shopping Cart ({cart.length})
              </h3>
            </div>
            {/* Prominent Close X Button safely inside mobile viewport */}
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-white bg-white/10 hover:bg-amber-400 hover:text-slate-950 p-2 rounded-full transition-all shadow-sm flex items-center justify-center shrink-0"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 divide-y divide-slate-100">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-slate-800">Your cart is empty</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Explore Orbit Smart TVs and electronics to start adding items to your cart.
                </p>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={idx} className="pt-4 first:pt-0 flex gap-3 sm:gap-4 items-center">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 rounded-xl border border-slate-200 shrink-0 p-1">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {item.product.name}
                    </h4>
                    <div className="text-[10px] text-slate-500">
                      Variant: {item.selectedSize} | {item.selectedColor}
                    </div>
                    <div className="text-xs font-black text-[#02367B]">
                      {item.product.currentPrice.toLocaleString()} ETB
                    </div>

                    {/* Quantity Counter & Delete Button */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                        <button
                          onClick={() => updateQuantity(idx, item.quantity - 1)}
                          className="p-1 hover:bg-slate-200 text-slate-600 rounded-l-lg"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(idx, item.quantity + 1)}
                          className="p-1 hover:bg-slate-200 text-slate-600 rounded-r-lg"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(idx)}
                        className="text-rose-500 hover:text-rose-700 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Remove Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout Footer (Shrink-0 to prevent drawer overflow) */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-3.5 shrink-0">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">{subtotal.toLocaleString()} ETB</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Addis Ababa Delivery</span>
                  <span className="font-bold text-emerald-600">FREE</span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-950 pt-2 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="text-[#02367B]">{subtotal.toLocaleString()} ETB</span>
                </div>
              </div>

              {/* Payment Buttons (Telebirr & Chapa) */}
              <div className="space-y-2">
                <button
                  onClick={() => handleCheckout('Telebirr')}
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white font-extrabold py-3 px-4 rounded-xl text-xs flex items-center justify-between shadow-md transition-transform hover:scale-[1.01]"
                >
                  <div className="flex items-center gap-2">
                    <div className="relative h-5 w-14 bg-white rounded p-0.5">
                      <Image src="/img/tellbirr.png" alt="Telebirr" fill className="object-contain" />
                    </div>
                    <span>Pay with Telebirr</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleCheckout('Chapa')}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 px-4 rounded-xl text-xs flex items-center justify-between shadow-md transition-transform hover:scale-[1.01]"
                >
                  <div className="flex items-center gap-2">
                    <div className="relative h-5 w-12 bg-white rounded p-0.5">
                      <Image src="/img/chapa.png" alt="Chapa" fill className="object-contain" />
                    </div>
                    <span>Pay with Chapa (Cards / Mobile Banking)</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 font-semibold pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>256-Bit SSL Encrypted Instant Payment</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
