'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User, Phone, Mail, Lock, Eye, EyeOff, MapPin, ArrowRight, ShieldCheck, ArrowLeft, Sparkles } from 'lucide-react';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [subcity, setSubcity] = useState('Bole');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Account created successfully!');
  };

  const ethiopianSubcities = [
    'Bole',
    'Kirkos',
    'Yeka',
    'Nifas Silk-Lafto',
    'Arada',
    'Addis Ketema',
    'Lideta',
    'Gullele',
    'Akaky Kaliti',
    'Kolfe Keranio',
    'Lemi Kura',
  ];

  return (
    <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center p-4 sm:p-6 select-none font-sans">
      {/* Standalone Light-Theme Form Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200/80">
        {/* Improved Brand Logo Section */}
        <div className="flex flex-col items-center text-center mb-6">
          <Link href="/" className="inline-block group mb-3">
            <div className="bg-[#02367B] px-6 py-3 rounded-2xl shadow-md border border-[#005BAA]/40 group-hover:scale-105 group-hover:shadow-lg transition-all duration-300 flex items-center justify-center">
              <div className="relative h-10 w-48 sm:h-12 sm:w-56">
                <Image
                  src="/img/Orbi logo.svg"
                  alt="Orbit Electronics Logo"
                  fill
                  className="object-contain drop-shadow-sm"
                  priority
                />
              </div>
            </div>
          </Link>

          {/* Official Tagline Badge */}
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-[10px] font-black text-amber-700 uppercase tracking-widest mt-1">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>Ethiopia’s Premier Electronics</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-3">
            Create Free Account
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Join Orbit Electronics for fast delivery & warranty tracking
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-3.5">
          {/* Full Name Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                placeholder="Abebe Bikila"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-[#02367B] focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Phone Number Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Phone Number
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-slate-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                required
                placeholder="+251 911 000 000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-[#02367B] focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Email Address Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-[#02367B] focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Sub-city Select */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Addis Ababa Sub-city (Express Delivery)
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                <MapPin className="w-4 h-4" />
              </div>
              <select
                value={subcity}
                onChange={(e) => setSubcity(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-[#02367B] focus:bg-white transition-colors"
              >
                {ethiopianSubcities.map((city) => (
                  <option key={city} value={city}>
                    {city} Sub-city
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Create Password
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 text-xs text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-[#02367B] focus:bg-white transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            type="submit"
            className="w-full bg-[#02367B] hover:bg-[#005BAA] text-white font-black text-xs py-3.5 rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] mt-2"
          >
            <span>Create Free Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500 my-4 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Verified Orbit Customer Registration</span>
        </div>

        {/* Redirect Link */}
        <p className="text-center text-xs text-slate-600">
          Already have an account?{' '}
          <Link href="/login" className="font-extrabold text-[#02367B] hover:underline">
            Log In
          </Link>
        </p>

        {/* Return to Shop Button */}
        <div className="mt-4 text-center">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#02367B] transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Store</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
