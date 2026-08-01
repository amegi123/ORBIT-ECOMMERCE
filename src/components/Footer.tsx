'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Send,
  Instagram,
  Youtube,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Hide Footer completely on standalone login and signup pages
  if (pathname === '/login' || pathname === '/signup') {
    return null;
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#02367B] text-slate-100 border-t-2 border-amber-400/40 pt-12 pb-24 md:pb-12 shadow-2xl select-none">
      {/* Main 4-Column Footer Navigation */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 border-b border-[#005BAA]/60">
        {/* Column 1: Brand Info & Socials */}
        <div className="lg:col-span-2 space-y-5">
          <Link href="/" className="inline-block">
            <div className="relative h-11 w-48">
              <Image
                src="/img/Orbi logo.svg"
                alt="Orbit Electronics Logo"
                fill
                className="object-contain drop-shadow-md"
              />
            </div>
          </Link>

          <p className="text-xs text-slate-200 leading-relaxed max-w-sm">
            Orbit Electronics is Ethiopia’s premier brand for Smart 4K UHD TVs, washing machines, refrigerators, water dispensers, and home appliances. Quality innovation, official warranty, and express local support.
          </p>

          <div className="space-y-2 text-xs text-slate-200 pt-1">
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              Bole Road, Near Friendship City Center, Addis Ababa, Ethiopia
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              Sales Hotline: <strong className="text-white text-sm">6226</strong>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              Customer Support: <strong className="text-white">info@orbitelectronics.et</strong>
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2.5 pt-2">
            <a
              href="#"
              className="w-9 h-9 rounded-xl bg-[#012554] border border-[#005BAA] flex items-center justify-center text-slate-200 hover:bg-amber-400 hover:text-slate-950 hover:border-amber-400 transition-all shadow-sm"
              title="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-xl bg-[#012554] border border-[#005BAA] flex items-center justify-center text-slate-200 hover:bg-amber-400 hover:text-slate-950 hover:border-amber-400 transition-all shadow-sm"
              title="Telegram"
            >
              <Send className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-xl bg-[#012554] border border-[#005BAA] flex items-center justify-center text-slate-200 hover:bg-amber-400 hover:text-slate-950 hover:border-amber-400 transition-all shadow-sm"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-xl bg-[#012554] border border-[#005BAA] flex items-center justify-center text-slate-200 hover:bg-amber-400 hover:text-slate-950 hover:border-amber-400 transition-all shadow-sm"
              title="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Categories */}
        <div className="space-y-4">
          <h4 className="text-xs font-black text-white uppercase tracking-wider border-l-2 border-amber-400 pl-2">
            Top Categories
          </h4>
          <ul className="space-y-2.5 text-xs font-medium">
            <li><Link href="/#category-tvs" className="hover:text-amber-400 transition-colors">Smart 4K UHD TVs</Link></li>
            <li><Link href="/#category-fridges" className="hover:text-amber-400 transition-colors">Refrigerators & Freezers</Link></li>
            <li><Link href="/#category-washers" className="hover:text-amber-400 transition-colors">Washing Machines</Link></li>
            <li><Link href="/#category-stoves" className="hover:text-amber-400 transition-colors">Gas & Electric Stoves</Link></li>
            <li><Link href="/#category-dispensers" className="hover:text-amber-400 transition-colors">Water Dispensers</Link></li>
            <li><Link href="/#category-kitchen" className="hover:text-amber-400 transition-colors">Kitchen Appliances</Link></li>
          </ul>
        </div>

        {/* Column 3: Customer Care & Services */}
        <div className="space-y-4">
          <h4 className="text-xs font-black text-white uppercase tracking-wider border-l-2 border-amber-400 pl-2">
            Customer Care
          </h4>
          <ul className="space-y-2.5 text-xs font-medium">
            <li><Link href="#" className="hover:text-amber-400 transition-colors">Track Your Order</Link></li>
            <li><Link href="#" className="hover:text-amber-400 transition-colors">Addis Ababa Delivery Info</Link></li>
            <li><Link href="#" className="hover:text-amber-400 transition-colors">Bank EMI Installments</Link></li>
            <li><Link href="#" className="hover:text-amber-400 transition-colors">Warranty & Service Centers</Link></li>
            <li><Link href="#" className="hover:text-amber-400 transition-colors">Terms & Return Policy</Link></li>
            <li><Link href="#" className="hover:text-amber-400 transition-colors">Store Locator</Link></li>
          </ul>
        </div>

        {/* Column 4: Newsletter & Payment Gateways */}
        <div className="space-y-4">
          <h4 className="text-xs font-black text-white uppercase tracking-wider border-l-2 border-amber-400 pl-2">
            Stay Connected
          </h4>
          <p className="text-xs text-slate-200 leading-relaxed">
            Subscribe to get launch updates, flash sales & special discounts.
          </p>

          {subscribed ? (
            <div className="p-3 bg-[#012554] border border-emerald-400 text-emerald-300 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Subscribed successfully!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#012554] border border-[#005BAA] rounded-xl text-white placeholder:text-slate-300 focus:outline-none focus:border-amber-400"
                required
              />
              <button
                type="submit"
                className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs py-2.5 rounded-xl uppercase tracking-wider transition-colors shadow-md"
              >
                Subscribe Now
              </button>
            </form>
          )}

          {/* Payment Badges */}
          <div className="pt-2">
            <div className="text-[11px] font-bold text-slate-200 uppercase tracking-wider mb-2">
              Accepted Payment Gateways:
            </div>
            <div className="flex items-center gap-2">
              <div className="relative h-7 w-20 bg-white rounded-lg p-0.5 border border-slate-300 shadow-sm">
                <Image src="/img/tellbirr.png" alt="Telebirr" fill className="object-contain p-0.5" />
              </div>
              <div className="relative h-7 w-16 bg-white rounded-lg p-0.5 border border-slate-300 shadow-sm">
                <Image src="/img/chapa.png" alt="Chapa" fill className="object-contain p-0.5" />
              </div>
              <div className="bg-[#012554] border border-[#005BAA] text-[10px] font-bold text-slate-100 px-2 py-1.5 rounded-lg">
                CBE / Cash
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright, Security & Legal Links */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-200">
        <p>© {new Date().getFullYear()} Orbit Electronics Ethiopia. All rights reserved.</p>

        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1 text-[11px] text-amber-300 font-semibold">
            <Lock className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted
          </span>
          <Link href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-amber-400 transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-amber-400 transition-colors">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
};
