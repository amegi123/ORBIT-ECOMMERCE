'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Send, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#051E42] text-slate-300 border-t border-blue-900/60 pt-12 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-blue-900/50">
        {/* Column 1: Brand & Contact */}
        <div className="space-y-4">
          <div className="relative h-10 w-44 inline-block">
            <Image
              src="/img/Orbi logo.svg"
              alt="Orbit Electronics Logo"
              fill
              className="object-contain"
            />
          </div>

          <div className="flex items-center gap-3 bg-blue-950/60 border border-blue-800/60 p-3.5 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                Guaranteed Support
              </div>
              <a href="tel:+251911000000" className="text-base font-black text-white hover:text-amber-400">
                +251 911 000 000
              </a>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-slate-300 pt-2">
            <p className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-400" /> Bole Road, Addis Ababa, Ethiopia
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-amber-400" /> info@orbitelectronics.et
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3 pt-2">
            <a href="#" className="w-8 h-8 rounded-full border border-blue-700/60 flex items-center justify-center text-slate-300 hover:bg-amber-400 hover:text-slate-950 transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-blue-700/60 flex items-center justify-center text-slate-300 hover:bg-amber-400 hover:text-slate-950 transition-colors">
              <Send className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-blue-700/60 flex items-center justify-center text-slate-300 hover:bg-amber-400 hover:text-slate-950 transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Useful Links */}
        <div className="space-y-3">
          <h4 className="text-sm font-extrabold text-white border-l-4 border-amber-400 pl-2 uppercase tracking-wider">
            Useful Links
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/#category-tvs" className="hover:text-amber-400 transition-colors">Televisions</Link></li>
            <li><Link href="/#category-fridges" className="hover:text-amber-400 transition-colors">Refrigerators</Link></li>
            <li><Link href="/#category-washers" className="hover:text-amber-400 transition-colors">Washing Machines</Link></li>
            <li><Link href="/#category-stoves" className="hover:text-amber-400 transition-colors">Stoves</Link></li>
            <li><Link href="/#category-dispensers" className="hover:text-amber-400 transition-colors">Water Dispensers</Link></li>
            <li><Link href="/#best-sellers" className="hover:text-amber-400 transition-colors">Discounts %</Link></li>
          </ul>
        </div>

        {/* Column 3: Customer Care */}
        <div className="space-y-3">
          <h4 className="text-sm font-extrabold text-white border-l-4 border-amber-400 pl-2 uppercase tracking-wider">
            Customer Care
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="#" className="hover:text-amber-400 transition-colors">Contact Us</Link></li>
            <li><Link href="#" className="hover:text-amber-400 transition-colors">About Us</Link></li>
            <li><Link href="#" className="hover:text-amber-400 transition-colors">Support</Link></li>
            <li><Link href="#" className="hover:text-amber-400 transition-colors">FAQ</Link></li>
            <li><Link href="#" className="hover:text-amber-400 transition-colors">Return Policy</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Payment Logos */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <p>© Orbit Electronics, All rights reserved {new Date().getFullYear()}</p>

        {/* Telebirr & Chapa Payment Logos */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400 mr-1 font-semibold">Payment Method:</span>
          <div className="relative h-6 w-16 bg-white rounded p-0.5 border border-slate-700">
            <Image src="/img/tellbirr.png" alt="Telebirr" fill className="object-contain p-0.5" />
          </div>
          <div className="relative h-6 w-12 bg-white rounded p-0.5 border border-slate-700">
            <Image src="/img/chapa.png" alt="Chapa" fill className="object-contain p-0.5" />
          </div>
        </div>
      </div>
    </footer>
  );
};
