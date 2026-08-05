'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function LoginPage() {
  const router = useRouter();
  const { addToast } = useCart();
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Success', 'Logged in successfully!', 'success');
    setTimeout(() => {
      router.push('/');
    }, 700);
  };

  const handleGoogleLogin = () => {
    addToast('Success', 'Logged in successfully with Google!', 'success');
    setTimeout(() => {
      router.push('/');
    }, 700);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 select-none font-sans relative">
      {/* Top Left Return Link */}
      <div className="absolute top-6 left-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#02367B] transition-colors bg-white px-3.5 py-2 rounded-full border border-slate-200 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Store</span>
        </Link>
      </div>

      {/* Centered Clean Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 sm:p-10 border border-slate-200/80 my-auto">
        {/* Brand Logo & Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <Link href="/" className="inline-block mb-4 hover:opacity-90 transition-opacity">
            <div className="relative h-12 w-56 sm:h-14 sm:w-64">
              <Image
                src="/img/orbit-electronics-logo.png"
                alt="Orbit Electronics Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Welcome Back
          </h1>
          <p className="text-xs font-medium text-slate-500 mt-1">
            Sign in to your Orbit Electronics account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email or Phone Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Phone Number or Email
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                placeholder="e.g. +251 911 000 000 or user@example.com"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-xs font-medium text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#02367B] focus:bg-white focus:ring-2 focus:ring-[#02367B]/10 transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <a href="#" className="text-xs font-bold text-[#02367B] hover:underline">
                Forgot Password?
              </a>
            </div>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 text-xs font-medium text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#02367B] focus:bg-white focus:ring-2 focus:ring-[#02367B]/10 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-[#02367B] border-slate-300 focus:ring-[#02367B]"
              />
              <span>Remember me</span>
            </label>
          </div>

          {/* Primary Action Button */}
          <button
            type="submit"
            className="w-full bg-[#02367B] hover:bg-[#00285C] text-white font-bold text-xs py-3.5 rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg mt-2 cursor-pointer"
          >
            <span>Log In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-5">
          <div className="border-t border-slate-200 w-full" />
          <span className="bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider absolute">
            or
          </span>
        </div>

        {/* Sign in with Google Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs py-3 rounded-xl border border-slate-300 shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Sign in with Google</span>
        </button>

        {/* Footer Redirect */}
        <p className="text-center text-xs text-slate-600 mt-5 pt-5 border-t border-slate-100 font-medium">
          Don’t have an account?{' '}
          <Link href="/signup" className="font-extrabold text-[#02367B] hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

