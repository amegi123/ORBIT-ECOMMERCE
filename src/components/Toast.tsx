'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Check, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCart();
  const [exitingIds, setExitingIds] = useState<string[]>([]);

  if (toasts.length === 0) return null;

  const handleDismiss = (id: string) => {
    if (exitingIds.includes(id)) return;
    setExitingIds((prev) => [...prev, id]);
    setTimeout(() => {
      removeToast(id);
      setExitingIds((prev) => prev.filter((item) => item !== id));
    }, 320);
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-3 max-w-md w-[calc(100%-2rem)] pointer-events-none font-sans select-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isInfo = toast.type === 'info';
        const isWarning = toast.type === 'warning';
        const isExiting = exitingIds.includes(toast.id);

        // Content message formatting matching exact image style
        const messageText = toast.message || toast.title;

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto relative overflow-hidden w-full flex items-center justify-between px-5 py-4 rounded-2xl border shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 ${
              isExiting ? 'animate-toast-out' : 'animate-toast-in'
            } ${
              isSuccess
                ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#047857]'
                : isInfo
                ? 'bg-[#F0F9FF] border-[#BAE6FD] text-[#0369A1]'
                : isWarning
                ? 'bg-[#FEFCE8] border-[#FEF08A] text-[#B45309]'
                : 'bg-[#FEF2F2] border-[#FECACA] text-[#B91C1C]'
            }`}
          >
            {/* Left Solid Circle Icon + Message Text */}
            <div className="flex items-center gap-3 min-w-0 pr-2">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-white ${
                  isSuccess
                    ? 'bg-[#059669]'
                    : isInfo
                    ? 'bg-[#0284C7]'
                    : isWarning
                    ? 'bg-[#D97706]'
                    : 'bg-[#DC2626]'
                }`}
              >
                {isSuccess && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                {isInfo && <Info className="w-3.5 h-3.5 stroke-[3]" />}
                {isWarning && <AlertTriangle className="w-3.5 h-3.5 stroke-[3]" />}
                {!isSuccess && !isInfo && !isWarning && <X className="w-3.5 h-3.5 stroke-[3]" />}
              </div>

              <span className="font-semibold text-sm sm:text-base tracking-tight truncate">
                {messageText}
              </span>
            </div>

            {/* Optional Close Dismiss Button */}
            <button
              onClick={() => handleDismiss(toast.id)}
              className={`p-1 rounded-full hover:bg-black/5 transition-colors shrink-0 ${
                isSuccess
                  ? 'text-[#047857]'
                  : isInfo
                  ? 'text-[#0369A1]'
                  : isWarning
                  ? 'text-[#B45309]'
                  : 'text-[#B91C1C]'
              }`}
              aria-label="Close notification"
            >
              <X className="w-4 h-4 stroke-[2]" />
            </button>

            {/* Subtle Progress Countdown Bar */}
            <div
              className={`absolute bottom-0 left-0 h-[2px] animate-toast-timer opacity-40 ${
                isSuccess
                  ? 'bg-[#059669]'
                  : isInfo
                  ? 'bg-[#0284C7]'
                  : isWarning
                  ? 'bg-[#D97706]'
                  : 'bg-[#DC2626]'
              }`}
            />
          </div>
        );
      })}
    </div>
  );
};
