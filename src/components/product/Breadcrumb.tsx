'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  hierarchy: string[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ hierarchy }) => {
  return (
    <nav className="py-3 px-4 md:px-0 text-xs text-slate-500 flex items-center flex-wrap gap-1.5 font-medium">
      <Link href="/" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>
      {hierarchy.slice(1).map((item, index) => {
        const isLast = index === hierarchy.length - 2;
        return (
          <React.Fragment key={item}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {isLast ? (
              <span className="text-slate-900 font-semibold truncate max-w-xs">{item}</span>
            ) : (
              <Link href="#" className="hover:text-blue-600 transition-colors truncate max-w-[120px]">
                {item}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
