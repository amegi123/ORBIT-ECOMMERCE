'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { getProductById } from '@/data/mockProduct';
import {
  X,
  Send,
  User,
  ShoppingBag,
  Tv,
  HelpCircle,
  ShieldCheck,
  RefreshCw,
  ExternalLink,
  ShoppingCart,
} from 'lucide-react';

interface ProductCardData {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  products?: ProductCardData[];
}

export const AiAssistantModal: React.FC = () => {
  const { isAiAssistantOpen, setIsAiAssistantOpen, addToCart, addToast } = useCart();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      text: "👋 እንኳን ወደ ኦርቢት ኤሌክትሮኒክስ በደህና መጡ! እኔ የኦርቢት AI ረዳት ነኝ።\nWelcome! I am Orbit AI. Ask me in English or Amharic (አማርኛ) about Smart 4K TVs, washing machines, refrigerators, 2-Year Warranty, or Telebirr payments!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isAiAssistantOpen) {
      scrollToBottom();
    }
  }, [messages, isAiAssistantOpen]);

  if (!isAiAssistantOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery.trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: Math.random().toString(36).substring(2, 9),
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputQuery('');
    setIsLoading(true);

    try {
      const history = messages
        .filter((m) => m.id !== 'welcome-1')
        .map((m) => ({ role: m.role, text: m.text }));

      history.push({ role: 'user', text: query });

      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history,
          userQuery: query,
        }),
      });

      const data = await res.json();
      const aiReply: ChatMessage = {
        id: Math.random().toString(36).substring(2, 9),
        role: 'assistant',
        text: data.reply || "I am Orbit AI. How can I help you choose an appliance today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        products: data.products || [],
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (error) {
      console.error('Failed to contact AI Assistant:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(2, 9),
          role: 'assistant',
          text: "Orbit AI is ready! All Orbit TVs & appliances feature 2-Year Genuine Ethiopia Warranty and Express Addis Ababa Delivery with Telebirr payment.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    { icon: Tv, text: "ስለ 4K ቴሌቪዥኖች ይንገሩኝ" },
    { icon: ShoppingBag, text: "የልብስ ማጠቢያ ማሽኖች ዋጋ" },
    { icon: ShieldCheck, text: "የ 2 ዓመት ዋስትና እና ማድረሻ" },
    { icon: HelpCircle, text: "Telebirr & Chapa Payment" },
  ];

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsAiAssistantOpen(false);
      }}
      className="fixed inset-0 z-[9999] bg-slate-950/60 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 select-none font-sans animate-in fade-in duration-200"
    >
      {/* Modal Container */}
      <div className="w-full sm:max-w-xl bg-white rounded-t-3xl sm:rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col h-[90dvh] sm:h-[650px] max-h-[100dvh] sm:max-h-[90vh]">
        {/* Clean White Professional Header */}
        <div className="bg-white p-3.5 sm:p-4 flex items-center justify-between shrink-0 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-200 p-1.5">
              <img src="/img/ai_bot_icon.svg" alt="Orbit AI Bot" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm tracking-tight text-slate-900">Orbit AI / ኦርቢት AI</h3>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium">AI Shopping Assistant • ረዳት</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsAiAssistantOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title="Close Assistant"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Prompts Bar */}
        <div className="bg-slate-50 border-b border-slate-200/80 p-2 sm:p-2.5 overflow-x-auto scrollbar-none flex items-center gap-2 shrink-0">
          {quickPrompts.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(item.text)}
                className="bg-white hover:bg-[#02367B]/5 border border-slate-200 hover:border-[#02367B]/30 text-slate-700 hover:text-[#02367B] text-[10px] sm:text-[11px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1.5 transition-all shadow-xs shrink-0 cursor-pointer"
              >
                <Icon className="w-3.5 h-3.5 text-[#02367B] shrink-0" />
                <span>{item.text}</span>
              </button>
            );
          })}
        </div>

        {/* Chat Thread */}
        <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-4 bg-slate-50/50 text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-[#02367B] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5 p-1 border border-blue-400/30">
                  <img src="/img/ai_bot_icon.svg" alt="AI Avatar" className="w-full h-full object-contain" />
                </div>
              )}

              <div className="space-y-2.5 max-w-[88%] sm:max-w-[84%]">
                <div
                  className={`rounded-2xl p-3 sm:p-3.5 shadow-xs space-y-1 break-words ${
                    msg.role === 'user'
                      ? 'bg-[#02367B] text-white rounded-br-none'
                      : 'bg-white border border-slate-200/90 text-slate-800 rounded-bl-none'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap font-medium text-xs sm:text-[13px] break-words">
                    {msg.text}
                  </p>
                  <span
                    className={`block text-[9px] text-right font-mono ${
                      msg.role === 'user' ? 'text-blue-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {/* Render Product Cards inside Assistant Chat Message */}
                {msg.role === 'assistant' && msg.products && msg.products.length > 0 && (
                  <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none pt-1">
                    {msg.products.map((prod) => (
                      <div
                        key={prod.id}
                        className="w-44 shrink-0 bg-white rounded-2xl border border-slate-200 p-2.5 shadow-sm space-y-2 flex flex-col justify-between"
                      >
                        {/* Image */}
                        <div className="relative w-full h-24 bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                          <Image
                            src={prod.image}
                            alt={prod.name}
                            fill
                            className="object-contain p-1.5"
                          />
                        </div>

                        {/* Title & Price */}
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono uppercase text-slate-400">
                            {prod.category}
                          </span>
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-tight">
                            {prod.name}
                          </h4>
                          <div className="text-xs font-black text-red-600">
                            ETB {prod.price.toLocaleString()}
                          </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center gap-1.5 pt-1">
                          <Link
                            href={`/product/${prod.id}`}
                            onClick={() => setIsAiAssistantOpen(false)}
                            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-bold py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 text-center transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>View</span>
                          </Link>

                          <button
                            type="button"
                            onClick={() => {
                              const fullProd = getProductById(prod.id);
                              addToCart(fullProd);
                              addToast('Item Added', `${prod.name} added to cart!`, 'success');
                            }}
                            className="bg-amber-400 hover:bg-amber-500 text-slate-950 p-1.5 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                            title="Add to Cart"
                          >
                            <ShoppingCart className="w-3.5 h-3.5 fill-slate-950" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5 font-bold">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-slate-500 text-xs py-2 px-1">
              <div className="w-8 h-8 rounded-xl bg-[#02367B] text-white flex items-center justify-center shrink-0 shadow-xs p-1">
                <img src="/img/ai_bot_icon.svg" alt="AI Avatar" className="w-full h-full object-contain animate-spin" />
              </div>
              <div className="bg-white border border-slate-200 px-4 py-2.5 rounded-2xl shadow-xs flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#02367B]" />
                <span className="font-semibold text-slate-600">Orbit AI is writing / እየጻፈ ነው...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 sm:p-3.5 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0 pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask Orbit AI (በአማርኛ ወይም በEnglish ይጠይቁ)..."
            className="flex-1 bg-slate-100 border border-slate-200 focus:border-[#02367B] focus:bg-white text-slate-900 text-xs sm:text-sm px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl focus:outline-none transition-all placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all shadow-md shrink-0 cursor-pointer ${
              inputQuery.trim() && !isLoading
                ? 'bg-[#02367B] hover:bg-[#005BAA] text-white hover:scale-105'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
