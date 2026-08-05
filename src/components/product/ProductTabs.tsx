'use client';

import React, { useState } from 'react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import {
  Star,
  ThumbsUp,
  MessageSquare,
  CheckCircle,
  Upload,
  Truck,
  ShieldAlert,
  HelpCircle,
  Wrench,
} from 'lucide-react';

interface ProductTabsProps {
  product: Product;
}

export const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  const { addToast, setIsAskQuestionOpen } = useCart();
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews' | 'shipping' | 'faqs'>('description');

  // Review Form state
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [reviewsList, setReviewsList] = useState(product.reviews);

  // Delivery Calculator state
  const [subCity, setSubCity] = useState('Bole');
  const [deliveryResult, setDeliveryResult] = useState<{ est: string; fee: string } | null>({
    est: 'Tomorrow (Same Day Express available)',
    fee: 'FREE Delivery',
  });

  const subCities = [
    'Bole',
    'Arada',
    'Kazanchis / Kirkos',
    'Yeka',
    'Nifas Silk Lafto',
    'Addis Ketema',
    'Gullele',
    'Kolfe Keraniyo',
    'Akaky Kaliti',
    'Lideta',
  ];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      author: 'You (Verified Buyer)',
      rating: newRating,
      date: new Date().toISOString().split('T')[0],
      comment: newComment,
      verified: true,
      likes: 0,
    };

    setReviewsList([newRev, ...reviewsList]);
    setNewComment('');
    setNewTitle('');
    addToast('Review Submitted', 'Thank you! Your review has been published.', 'success');
  };

  const handleCalculateDelivery = () => {
    setDeliveryResult({
      est: subCity === 'Bole' || subCity === 'Kazanchis / Kirkos' ? 'Today in 3-5 Hours' : 'Tomorrow',
      fee: 'FREE Delivery',
    });
  };

  const renderReviewsContent = () => (
    <div className="space-y-10">
      {/* Rating Summary Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 bg-slate-50 rounded-2xl border border-slate-200 items-center">
        <div className="text-center space-y-2 border-r-0 md:border-r border-slate-200 pr-0 md:pr-8">
          <div className="text-5xl font-black text-slate-950">{product.rating}</div>
          <div className="flex justify-center text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400" />
            ))}
          </div>
          <p className="text-xs text-slate-500 font-medium">Based on {reviewsList.length} Verified Reviews</p>
        </div>

        {/* Progress bars */}
        <div className="md:col-span-2 space-y-2 text-xs font-semibold text-slate-700">
          {[
            { stars: '5 Stars', pct: '90%' },
            { stars: '4 Stars', pct: '8%' },
            { stars: '3 Stars', pct: '2%' },
            { stars: '2 Stars', pct: '0%' },
            { stars: '1 Star', pct: '0%' },
          ].map((item) => (
            <div key={item.stars} className="flex items-center gap-3">
              <span className="w-14">{item.stars}</span>
              <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full"
                  style={{ width: item.pct }}
                />
              </div>
              <span className="w-10 text-right text-slate-500">{item.pct}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <h4 className="text-base font-bold text-slate-900">Customer Feedback</h4>
        {reviewsList.map((rev) => (
          <div key={rev.id} className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-sm">
                  {rev.author.charAt(0)}
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    {rev.author}
                    {rev.verified && (
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Verified Purchase
                      </span>
                    )}
                  </h5>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'fill-amber-400' : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400">{rev.date}</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">{rev.comment}</p>

            {/* Customer replies if any */}
            {rev.replies && rev.replies.map((reply, rIdx) => (
              <div key={rIdx} className="ml-6 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <span className="font-bold text-blue-600">{reply.author}</span>
                <p className="text-slate-600">{reply.comment}</p>
              </div>
            ))}

            <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
              <button className="flex items-center gap-1 hover:text-blue-600">
                <ThumbsUp className="w-3.5 h-3.5" /> Helpful ({rev.likes})
              </button>
              <button className="flex items-center gap-1 hover:text-blue-600">
                <MessageSquare className="w-3.5 h-3.5" /> Reply
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Write a Review Form */}
      <form onSubmit={handleReviewSubmit} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
        <h4 className="text-sm font-bold text-slate-900">Write a Customer Review</h4>
        
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-700">Rating:</span>
          <div className="flex text-amber-400 cursor-pointer">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                onClick={() => setNewRating(star)}
                className={`w-6 h-6 transition-transform hover:scale-110 ${
                  star <= newRating ? 'fill-amber-400' : 'text-slate-300'
                }`}
              />
            ))}
          </div>
        </div>

        <textarea
          placeholder="Share your experience with this Orbit TV..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={3}
          className="w-full p-3 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600 bg-white"
          required
        />

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => addToast('Image Upload', 'Photo attachment option selected.', 'info')}
            className="flex items-center gap-1.5 text-xs text-slate-600 bg-white border border-slate-300 px-3 py-2 rounded-xl hover:bg-slate-100"
          >
            <Upload className="w-4 h-4 text-blue-600" /> Add Photos
          </button>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="w-full mt-12 space-y-6">
      {/* Product Navigation Tabs in Box Style */}
      <div className="tabs-container bg-slate-50/90 border border-slate-200/90 rounded-2xl p-2.5 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {[
            { id: 'description', label: 'Description' },
            { id: 'specifications', label: 'Specifications' },
            { id: 'reviews', label: `Reviews (${reviewsList.length})` },
            { id: 'shipping', label: 'Delivery Calculator' },
            { id: 'faqs', label: 'FAQs & Support' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3 text-xs font-bold uppercase tracking-wider text-center transition-all rounded-xl cursor-pointer border flex items-center justify-center min-h-[46px] ${
                activeTab === tab.id
                  ? 'bg-[#02367B] text-white border-[#02367B] shadow-md scale-[1.02]'
                  : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Container */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-sm">
        {/* Description Tab */}
        {activeTab === 'description' && (
          <div className="space-y-8">
            <div
              className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.fullDescription }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
              <div className="p-6 bg-amber-50/80 border border-amber-200/90 rounded-2xl space-y-3">
                <h4 className="font-bold text-base text-amber-950 flex items-center gap-2">Why Choose Orbit 4K Smart TV?</h4>
                <ul className="space-y-2 text-xs text-slate-700 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    Ultra-Clear 4K UHD Panel with 8.3 Million Pixels
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    HDR10+ & HLG Contrast Engine for Deep Blacks
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    Android TV OS with Amharic/English Voice Search
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    2 Years Official Ethiopia Warranty & Local Service Centers
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl space-y-3">
                <h4 className="font-bold text-base text-blue-900 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-blue-600" /> Free Wall Mounting & Installation
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every Orbit 65&quot; TV purchase within Addis Ababa includes complimentary wall bracket installation by our certified technical team.
                </p>
              </div>
            </div>

            {/* Customer Reviews Section placed under Description */}
            <div className="pt-8 border-t border-slate-200 space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-l-4 border-blue-600 pl-3">
                Customer Reviews & Ratings
              </h3>
              {renderReviewsContent()}
            </div>
          </div>
        )}

        {/* Specifications Tab */}
        {activeTab === 'specifications' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-l-4 border-blue-600 pl-3">
              Full Technical Specifications
            </h3>
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <tbody>
                  {product.specifications.map((spec, idx) => (
                    <tr
                      key={spec.name}
                      className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}
                    >
                      <td className="py-3.5 px-6 font-semibold text-slate-700 w-1/3 border-b border-slate-200">
                        {spec.name}
                      </td>
                      <td className="py-3.5 px-6 text-slate-900 font-medium border-b border-slate-200">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && renderReviewsContent()}

        {/* Shipping & Delivery Estimator Tab */}
        {activeTab === 'shipping' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-l-4 border-blue-600 pl-3">
              Addis Ababa Express Delivery Calculator
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Select Your Sub-City (Addis Ababa):
                </label>
                <select
                  value={subCity}
                  onChange={(e) => setSubCity(e.target.value)}
                  className="w-full p-3 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600 font-semibold"
                >
                  {subCities.map((sc) => (
                    <option key={sc} value={sc}>
                      {sc} Sub-City
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleCalculateDelivery}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl shadow flex items-center justify-center gap-2"
                >
                  <Truck className="w-4 h-4" /> Calculate Delivery Time & Fee
                </button>

                {deliveryResult && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs space-y-1">
                    <p className="font-bold text-emerald-900">Estimated Delivery: {deliveryResult.est}</p>
                    <p className="text-emerald-700">Delivery Fee: {deliveryResult.fee}</p>
                  </div>
                )}
              </div>

              <div className="space-y-4 text-xs text-slate-600">
                <h4 className="font-bold text-sm text-slate-900">Regional Ethiopia Shipping:</h4>
                <p>For orders outside Addis Ababa (Hawassa, Adama, Dire Dawa, Bahir Dar, Mekelle):</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Dispatched via secure regional transport (2-3 business days).</li>
                  <li>Tracking number sent via SMS upon dispatch.</li>
                  <li>Full transit insurance included.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* FAQs & Support Tab */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" /> Frequently Asked Questions
              </h3>
              <button
                onClick={() => setIsAskQuestionOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                Ask a Question
              </button>
            </div>

            <div className="space-y-4">
              {product.questions.map((q) => (
                <div key={q.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h5 className="text-xs font-bold text-slate-900">Q: {q.question}</h5>
                  <p className="text-xs text-slate-600 pl-4 border-l-2 border-amber-400">
                    A: {q.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
