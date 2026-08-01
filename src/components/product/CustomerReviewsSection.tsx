'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface CustomerReviewsSectionProps {
  rating?: number;
  reviewCount?: number;
}

export const CustomerReviewsSection: React.FC<CustomerReviewsSectionProps> = ({
  rating = 0.0,
  reviewCount = 0,
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userRating, setUserRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-sm font-sans select-none">
      {/* Header Matching Screenshot */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-900">Customer Reviews</h2>

        <div className="flex items-center gap-2">
          {/* Star Rating Icons */}
          <div className="flex items-center text-slate-300">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-slate-200 text-slate-200" />
            ))}
          </div>
          <span className="text-lg font-bold text-slate-900">{rating.toFixed(1)}</span>
          <span className="text-xs text-slate-400">({reviewCount})</span>
        </div>
      </div>

      {/* Write a Review Button */}
      <div>
        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="text-xs font-semibold text-slate-700 hover:text-[#02367B] transition-colors"
        >
          Write a Review
        </button>

        {showReviewForm && (
          <form onSubmit={handleSubmit} className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            {submitted ? (
              <p className="text-xs font-bold text-emerald-600">Thank you for submitting your review!</p>
            ) : (
              <>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-slate-700">Rating:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        onClick={() => setUserRating(star)}
                        className={`w-4 h-4 cursor-pointer ${
                          star <= userRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <textarea
                  rows={3}
                  placeholder="Share your feedback about this product..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-3 text-xs text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-[#02367B]"
                  required
                />

                <button
                  type="submit"
                  className="bg-[#02367B] text-white text-xs font-bold px-6 py-2 rounded-xl hover:bg-[#005BAA] transition-colors"
                >
                  Submit Review
                </button>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
