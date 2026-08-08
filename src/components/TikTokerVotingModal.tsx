'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import {
  X,
  Search,
  CheckCircle2,
  Award,
  Flame,
  Clock,
  Sparkles,
  Lock,
} from 'lucide-react';

interface TikToker {
  id: string;
  name: string;
  username: string;
  category: 'Comedy' | 'Fashion & Beauty' | 'Tech & Gadgets' | 'Lifestyle' | 'Music & Dance';
  votes: number;
  image: string;
  bio: string;
  followers: string;
}

const initialTikTokers: TikToker[] = [
  {
    id: 'tt-1',
    name: 'Meskerem (Meski)',
    username: '@meski_ethio',
    category: 'Comedy',
    votes: 4820,
    image: '/img/catagories3.jpeg',
    bio: 'Ethiopia’s favorite comedy queen! Funny sketches & daily habesha vibes.',
    followers: '1.2M',
  },
  {
    id: 'tt-2',
    name: 'Danayt',
    username: '@danayt_habesha',
    category: 'Fashion & Beauty',
    votes: 4210,
    image: '/img/catgories1.webp',
    bio: 'Fashion inspiration, traditional Habesha kemis styling & makeup tips.',
    followers: '950K',
  },
  {
    id: 'tt-3',
    name: 'Selam & Beki',
    username: '@selam_beki_duo',
    category: 'Music & Dance',
    votes: 3940,
    image: '/img/catagories2.webp',
    bio: 'Trending TikTok dance duos, Amharic music challenges & energetic choreography.',
    followers: '880K',
  },
  {
    id: 'tt-4',
    name: 'Caleb Tech',
    username: '@caleb_ethio_tech',
    category: 'Tech & Gadgets',
    votes: 3510,
    image: '/img/catagories4.webp',
    bio: 'Orbit smart TVs, 4K tech unboxings & gadget reviews in Amharic.',
    followers: '620K',
  },
  {
    id: 'tt-5',
    name: 'Eyerus Lifestyle',
    username: '@eyerus_lifestyle',
    category: 'Lifestyle',
    votes: 2980,
    image: '/img/product-washing2.jpeg',
    bio: 'Addis Ababa food spots, home decor tips & daily lifestyle vlogs.',
    followers: '540K',
  },
  {
    id: 'tt-6',
    name: 'Natty Funny',
    username: '@natty_funny_skits',
    category: 'Comedy',
    votes: 2750,
    image: '/img/hero3.webp',
    bio: 'Relatable Habesha family skits, student life jokes & street interviews.',
    followers: '490K',
  },
];

export const TikTokerVotingModal: React.FC = () => {
  const { isVotingModalOpen, setIsVotingModalOpen, addToast } = useCart();
  const [tiktokers, setTiktokers] = useState<TikToker[]>(initialTikTokers);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [lastVotedDate, setLastVotedDate] = useState<string | null>(null);
  const [votedCreator, setVotedCreator] = useState<string | null>(null);

  const getTodayString = () => new Date().toISOString().split('T')[0];
  const todayStr = getTodayString();
  const hasVotedToday = lastVotedDate === todayStr;

  // Load voting state & custom vote counts from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedDate = localStorage.getItem('orbit_tiktok_last_vote_date');
      const savedCreator = localStorage.getItem('orbit_tiktok_voted_creator');
      const savedTiktokers = localStorage.getItem('orbit_tiktok_creators_data');

      if (savedDate) setLastVotedDate(savedDate);
      if (savedCreator) setVotedCreator(savedCreator);
      if (savedTiktokers) {
        try {
          setTiktokers(JSON.parse(savedTiktokers));
        } catch (e) {
          console.error('Failed to parse saved TikTokers data', e);
        }
      }
    }
  }, [isVotingModalOpen]);

  if (!isVotingModalOpen) return null;

  // Handle user vote click
  const handleVote = (creator: TikToker) => {
    if (hasVotedToday) {
      addToast(
        'Daily Vote Limit Reached 🗳️',
        `You have already voted today for ${votedCreator || 'a creator'}! Come back tomorrow to vote again.`,
        'warning'
      );
      return;
    }

    // Update creator vote count
    const updatedList = tiktokers.map((item) =>
      item.id === creator.id ? { ...item, votes: item.votes + 1 } : item
    );

    // Sort by total votes descending
    updatedList.sort((a, b) => b.votes - a.votes);

    setTiktokers(updatedList);
    setLastVotedDate(todayStr);
    setVotedCreator(creator.name);

    if (typeof window !== 'undefined') {
      localStorage.setItem('orbit_tiktok_last_vote_date', todayStr);
      localStorage.setItem('orbit_tiktok_voted_creator', creator.name);
      localStorage.setItem('orbit_tiktok_creators_data', JSON.stringify(updatedList));
    }

    addToast(
      'Vote Cast Successfully! 🇪🇹',
      `Thank you! Your vote for ${creator.name} (${creator.username}) has been recorded.`,
      'success'
    );
  };

  // Filter TikTokers by Category & Search Query
  const filteredTiktokers = tiktokers
    .filter((item) => {
      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.username.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    })
    .sort((a, b) => b.votes - a.votes);

  const categories = ['All', 'Comedy', 'Fashion & Beauty', 'Tech & Gadgets', 'Lifestyle', 'Music & Dance'];

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 font-sans select-none animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsVotingModalOpen(false);
      }}
    >
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
        {/* ─────────────────────────────────────────
            1. Modal Header
            ───────────────────────────────────────── */}
        <div className="bg-gradient-to-r from-[#02367B] via-[#005BAA] to-[#00A9E0] text-white p-5 sm:p-6 relative shrink-0">
          <button
            onClick={() => setIsVotingModalOpen(false)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close Voting Modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
              <span>🇪🇹</span> ETHIOPIA TIKTOK AWARDS 2026
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl font-black tracking-tight flex items-center gap-2">
            <Award className="w-7 h-7 text-amber-400" />
            Vote For Your Favorite TikToker!
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 mt-1 font-medium">
            Support Ethiopia&apos;s top content creators! Each user gets <strong className="text-amber-300">1 Vote Per Day</strong>.
          </p>
        </div>

        {/* ─────────────────────────────────────────
            2. Daily Voting Status Banner
            ───────────────────────────────────────── */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 shrink-0">
          {hasVotedToday ? (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between gap-3 text-xs sm:text-sm text-emerald-900 font-bold shadow-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  You voted for <strong className="text-emerald-950 underline">{votedCreator}</strong> today!
                </span>
              </div>
              <span className="bg-emerald-600 text-white text-[10px] uppercase font-black px-3 py-1 rounded-full whitespace-nowrap flex items-center gap-1">
                <Clock className="w-3 h-3" /> Next Vote Tomorrow
              </span>
            </div>
          ) : (
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between gap-3 text-xs sm:text-sm text-amber-900 font-bold shadow-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600 shrink-0 animate-pulse" />
                <span>You have <strong>1 VOTE</strong> available today! Pick your favorite creator below:</span>
              </div>
              <span className="bg-amber-500 text-slate-950 text-[10px] uppercase font-black px-3 py-1 rounded-full whitespace-nowrap">
                1 Vote Ready 🗳️
              </span>
            </div>
          )}
        </div>

        {/* ─────────────────────────────────────────
            3. Search & Category Filters
            ───────────────────────────────────────── */}
        <div className="p-4 border-b border-slate-200 space-y-3 shrink-0 bg-white">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by TikToker name or @username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-[#02367B] font-medium"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`py-1.5 px-3 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#02367B] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ─────────────────────────────────────────
            4. TikTokers Leaderboard Grid
            ───────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTiktokers.map((creator, idx) => {
              const rank = idx + 1;
              let rankBadge = `#${rank}`;
              let rankBg = 'bg-slate-100 text-slate-700';

              if (rank === 1) {
                rankBadge = '🥇 1st Place';
                rankBg = 'bg-amber-100 text-amber-900 border-amber-300';
              } else if (rank === 2) {
                rankBadge = '🥈 2nd Place';
                rankBg = 'bg-slate-200 text-slate-900 border-slate-300';
              } else if (rank === 3) {
                rankBadge = '🥉 3rd Place';
                rankBg = 'bg-orange-100 text-orange-900 border-orange-300';
              }

              return (
                <div
                  key={creator.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-[#02367B] transition-all shadow-xs flex flex-col justify-between space-y-3 relative group"
                >
                  {/* Top Bar: Rank & Category */}
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${rankBg}`}>
                      {rankBadge}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      {creator.category}
                    </span>
                  </div>

                  {/* Creator Info Header */}
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#02367B] shrink-0 shadow-xs">
                      <Image
                        src={creator.image}
                        alt={creator.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-black text-slate-900 truncate flex items-center gap-1">
                        {creator.name}
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-50" />
                      </h3>
                      <p className="text-xs font-bold text-[#005BAA]">{creator.username}</p>
                      <p className="text-[11px] text-slate-500 font-medium">{creator.followers} Followers</p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    {creator.bio}
                  </p>

                  {/* Bottom Bar: Vote Counter & Action Button */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Total Votes</div>
                      <div className="text-sm font-black text-[#02367B] flex items-center gap-1">
                        <Flame className="w-4 h-4 text-amber-500 fill-amber-400" />
                        {creator.votes.toLocaleString()}
                      </div>
                    </div>

                    <button
                      onClick={() => handleVote(creator)}
                      disabled={hasVotedToday}
                      className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-md ${
                        hasVotedToday
                          ? 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300'
                          : 'bg-[#02367B] hover:bg-[#00285d] text-white hover:scale-105 active:scale-95 cursor-pointer'
                      }`}
                    >
                      {hasVotedToday ? (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>Voted Today</span>
                        </>
                      ) : (
                        <>
                          <span>Vote Now</span>
                          <span>🗳️</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─────────────────────────────────────────
            5. Footer Note
            ───────────────────────────────────────── */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500 font-medium shrink-0">
          Daily voting resets every night at 12:00 AM EAT. Powered by Orbit Electronics Ethiopia.
        </div>
      </div>
    </div>
  );
};
