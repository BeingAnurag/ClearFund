'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { 
  Search, Filter, ArrowRight, ShieldCheck, 
  Users, Clock, AlertCircle, Plus // Added Plus icon
} from 'lucide-react';

// Types
interface Campaign {
  id: number;
  title: string;
  description: string;
  raised: number;
  target: number;
  donors: number;
  daysLeft: number;
  category: string;
  verified: boolean;
  status: 'Active' | 'Funded' | 'Ended';
  image: string; // URL
}

// Mock Data Fallback
const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 1,
    title: "Ocean Cleanup: Phase 4",
    description: "Deploying autonomous cleaning arrays in the Great Pacific Garbage Patch with verifiable impact tracking.",
    raised: 1250000,
    target: 2000000,
    donors: 3420,
    daysLeft: 12,
    category: "Sustainability",
    verified: true,
    status: 'Active',
    image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Decentralized Science Hub",
    description: "Open source research facility for bio-hacking and longevity research governed by DAO voting.",
    raised: 45000,
    target: 50000,
    donors: 120,
    daysLeft: 5,
    category: "Research",
    verified: true,
    status: 'Active',
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "Urban Vertical Gardens",
    description: "Transforming unused city rooftops into sustainable food sources using hydroponic systems.",
    raised: 12000,
    target: 100000,
    donors: 45,
    daysLeft: 28,
    category: "Infrastructure",
    verified: false,
    status: 'Active',
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    title: "Ethereum Edu-Node Network",
    description: "Setting up lightweight nodes in developing regions to support network health and education.",
    raised: 150000,
    target: 150000,
    donors: 890,
    daysLeft: 0,
    category: "Technology",
    verified: true,
    status: 'Funded',
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80"
  }
];

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');

  // Fetch Data
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('http://localhost:3001/api/campaigns');
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setCampaigns(data.length > 0 ? data : MOCK_CAMPAIGNS); 
      } catch (err) {
        console.warn("Backend offline, using fallback data");
        setCampaigns(MOCK_CAMPAIGNS);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filter Logic
  const filtered = campaigns.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || c.status === filterStatus;
    const matchCategory = filterCategory === 'All' || c.category === filterCategory;
    return matchSearch && matchStatus && matchCategory;
  });

  return (
    <div className="min-h-screen bg-[#0B0F14] text-slate-300 selection:bg-teal-500/30">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        
        {/* 1. HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-3">Verified Campaigns</h1>
            <p className="text-slate-400 max-w-xl">
              Browse projects verified via Soulbound Tokens. All funds are held in milestone-based escrow smart contracts.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
             <div className="px-3 py-1 bg-teal-900/20 border border-teal-500/20 rounded-full flex items-center gap-2 text-xs font-medium text-teal-400">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"/>
                Live On-Chain Data
             </div>

             {/* NEW BUTTON ADDED HERE */}
             <Link 
               href="/campaigns/new" 
               className="px-5 py-2.5 bg-teal-500 text-black font-bold rounded-lg hover:bg-teal-400 transition-colors flex items-center gap-2 shadow-lg shadow-teal-500/10"
             >
               <Plus className="w-4 h-4" /> Start Campaign
             </Link>
          </div>
        </div>

        {/* 2. FILTERS & TOOLBAR */}
        <div className="sticky top-24 z-30 bg-[#0B0F14]/95 backdrop-blur-xl py-4 border-y border-white/5 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 justify-between">
            
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search campaigns..." 
                className="w-full bg-[#131823] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500/50 transition-colors placeholder:text-slate-600"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <select 
                className="bg-[#131823] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:outline-none hover:border-white/20 cursor-pointer"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Funded">Funded</option>
              </select>

              <select 
                className="bg-[#131823] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:outline-none hover:border-white/20 cursor-pointer"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Sustainability">Sustainability</option>
                <option value="Technology">Technology</option>
                <option value="Research">Research</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. CAMPAIGN GRID */}
        {loading ? (
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {[1,2,3].map(i => (
               <div key={i} className="h-[400px] bg-white/5 rounded-2xl animate-pulse" />
             ))}
           </div>
        ) : filtered.length === 0 ? (
           <div className="py-20 text-center border border-dashed border-white/10 rounded-2xl">
             <AlertCircle className="w-10 h-10 text-slate-600 mx-auto mb-4" />
             <h3 className="text-xl font-bold text-white">No campaigns found</h3>
             <p className="text-slate-500">Try adjusting your filters or search terms.</p>
           </div>
        ) : (
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {filtered.map((campaign) => (
               <div key={campaign.id} className="group bg-[#131823] border border-white/5 rounded-2xl overflow-hidden hover:border-teal-500/30 transition-all duration-300 flex flex-col">
                 
                 {/* Image Area */}
                 <div className="h-48 relative overflow-hidden">
                   <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   <div className="absolute top-3 left-3 flex gap-2">
                     <span className="px-2 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded">
                       {campaign.category}
                     </span>
                   </div>
                   {campaign.verified && (
                     <div className="absolute top-3 right-3 px-2 py-1 bg-teal-500/90 backdrop-blur-md text-black text-[10px] font-bold uppercase tracking-wider rounded flex items-center gap-1">
                       <ShieldCheck className="w-3 h-3" /> Verified
                     </div>
                   )}
                 </div>

                 {/* Content */}
                 <div className="p-6 flex-1 flex flex-col">
                   <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{campaign.title}</h3>
                   <p className="text-sm text-slate-400 mb-6 line-clamp-2">{campaign.description}</p>

                   {/* Progress */}
                   <div className="mt-auto space-y-4">
                     <div>
                       <div className="flex justify-between text-xs font-medium mb-2">
                         <span className="text-white">${campaign.raised.toLocaleString()}</span>
                         <span className="text-slate-500">of ${campaign.target.toLocaleString()}</span>
                       </div>
                       <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                         <div 
                           className={`h-full rounded-full ${campaign.status === 'Funded' ? 'bg-green-500' : 'bg-teal-500'}`} 
                           style={{ width: `${Math.min((campaign.raised / campaign.target) * 100, 100)}%` }} 
                         />
                       </div>
                     </div>

                     {/* Stats */}
                     <div className="grid grid-cols-2 gap-4 py-4 border-t border-white/5">
                       <div className="flex items-center gap-2">
                         <Users className="w-4 h-4 text-slate-600" />
                         <span className="text-xs text-slate-300 font-mono">{campaign.donors} Backers</span>
                       </div>
                       <div className="flex items-center gap-2 justify-end">
                         <Clock className="w-4 h-4 text-slate-600" />
                         <span className="text-xs text-slate-300 font-mono">{campaign.daysLeft > 0 ? `${campaign.daysLeft} Days Left` : 'Ended'}</span>
                       </div>
                     </div>

                     {/* CTA */}
                     <Link 
                       href={`/campaigns/${campaign.id}`}
                       className="w-full py-3 bg-white/5 border border-white/10 rounded-lg text-sm font-bold text-white hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 group-hover:bg-teal-500 group-hover:text-black group-hover:border-teal-500"
                     >
                       View Campaign <ArrowRight className="w-4 h-4" />
                     </Link>
                   </div>
                 </div>
               </div>
             ))}
           </div>
        )}

      </main>

      {/* 6. COMPLIANCE STRIP */}
      <div className="border-t border-white/5 bg-[#0D1117] py-4">
         <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-xs text-slate-500">
            <div className="flex items-center gap-2">
               <ShieldCheck className="w-3 h-3" />
               <span>All campaigns are subject to automated audit procedures.</span>
            </div>
            <Link href="/compliance" className="hover:text-teal-400 transition-colors">
               View Compliance Standards &rarr;
            </Link>
         </div>
      </div>

      <Footer />
    </div>
  );
}