'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { X, HelpCircle, Send } from 'lucide-react';

export const AskQuestionModal: React.FC = () => {
  const { isAskQuestionOpen, setIsAskQuestionOpen, addToast } = useCart();
  const [question, setQuestion] = useState('');
  const [name, setName] = useState('');

  if (!isAskQuestionOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    addToast('Question Submitted', 'Your question has been sent to Orbit customer support!', 'success');
    setQuestion('');
    setName('');
    setIsAskQuestionOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
      onClick={() => setIsAskQuestionOpen(false)}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl p-6 space-y-4 shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" /> Ask Orbit Support
          </h3>
          <button
            onClick={() => setIsAskQuestionOpen(false)}
            className="text-slate-400 hover:text-slate-900 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Your Name</label>
            <input
              type="text"
              placeholder="e.g. Solomon T."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600"
              required
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Your Question</label>
            <textarea
              placeholder="Ask about delivery, wall mount, specs..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={4}
              className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow"
          >
            <Send className="w-4 h-4" /> Submit Question
          </button>
        </form>
      </div>
    </div>
  );
};
