'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { X, Layers, Check, ShoppingBag } from 'lucide-react';

export const ProductComparison: React.FC = () => {
  const { compareList, isCompareOpen, setIsCompareOpen, toggleCompare, addToCart } = useCart();

  if (!isCompareOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={() => setIsCompareOpen(false)}
    >
      <div
        className="relative w-full max-w-5xl bg-white rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" /> Compare Orbit Products
          </h3>
          <button
            onClick={() => setIsCompareOpen(false)}
            className="text-slate-400 hover:text-slate-900 p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {compareList.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-sm">
            No products selected for comparison. Click &quot;Compare Product&quot; on any item to add it here.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="p-4 font-bold text-slate-500 uppercase tracking-wider w-1/4">Feature</th>
                  {compareList.map((prod) => (
                    <th key={prod.id} className="p-4 text-center w-1/3 min-w-[200px]">
                      <div className="relative w-28 h-28 mx-auto mb-2 bg-slate-50 rounded-xl p-2 border border-slate-200">
                        <Image src={prod.images[0]} alt={prod.name} fill className="object-contain p-1" />
                      </div>
                      <h4 className="font-bold text-slate-900 line-clamp-2">{prod.name}</h4>
                      <div className="text-sm font-black text-blue-600 mt-1">
                        {prod.currentPrice.toLocaleString()} ETB
                      </div>
                      <button
                        onClick={() => addToCart(prod)}
                        className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-lg flex items-center justify-center gap-1"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" /> Add
                      </button>
                      <button
                        onClick={() => toggleCompare(prod)}
                        className="text-[10px] text-rose-500 hover:underline mt-1 block mx-auto"
                      >
                        Remove
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-4 font-bold text-slate-700">Display Resolution</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 text-center font-medium text-slate-900">
                      4K UHD (3840x2160)
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-700">Operating System</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 text-center font-medium text-slate-900">
                      Android TV
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-700">Audio Output</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 text-center font-medium text-slate-900">
                      24W Dolby Surround
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-700">Warranty</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 text-center font-bold text-emerald-600">
                      <Check className="w-4 h-4 inline mr-1" /> 2 Years Official
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
