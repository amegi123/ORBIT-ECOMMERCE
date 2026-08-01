'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { homeCategories } from '@/data/homeData';

export const ShopByCategory: React.FC = () => {
  return (
    <section className="w-full space-y-6 pt-4">
      {/* Section Title with Yellow Accent Line */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
        <div className="w-1.5 h-6 bg-amber-400 rounded-full shrink-0" />
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Shop by Category
        </h2>
      </div>

      {/* 3x2 Grid Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {homeCategories.map((cat) => (
          <Link
            key={cat.id}
            href={`/#${cat.id}`}
            className="group relative bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center justify-between hover:shadow-xl hover:border-blue-400 transition-all duration-300 overflow-hidden"
          >
            <div className="relative w-full aspect-[16/9] mb-4 bg-slate-50 rounded-xl overflow-hidden p-2">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-center">
              {cat.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
};
