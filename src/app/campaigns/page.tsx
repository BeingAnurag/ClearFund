'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { supabase } from '../../lib/supabase';
import { 
  Search, ShieldCheck, 
  Users, Clock, AlertCircle, Plus, ArrowRight
} from 'lucide-react';


// 2. Define the shape of your Supabase Data
interface Campaign {
  id: number;
  title: string;
  description: string;
  category: string;
  image_url: string;
  target_eth: number;
  contract_address: string;
  status: string;
  created_at: string;
  // UI helper fields (we will calculate these)
  raised?: number;
  donors?: number;
  daysLeft?: number;
  verified?: boolean;
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');

  // 3. Fetch Data from Supabase
  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from('campaigns')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Transform DB data to UI data
        const formattedData = (data || []).map(item => ({
          ...item,
          // Defaults for fields not yet in DB (would come from an indexer in Prod)
          raised: 0, 
          donors: 0,
          verified: true,
          // Calculate days left (assuming 30 day campaigns for this demo)
          daysLeft: 30 - Math.floor((new Date().getTime() - new Date(item.created_at).getTime()) / (1000 * 3600 * 24))
        }));

        setCampaigns(formattedData);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filter Logic
  const filtered = campaigns.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || c.status?.toLowerCase() === filterStatus.toLowerCase();
    const matchCategory = filterCategory === 'All' || c.category === filterCategory;
    return matchSearch && matchStatus && matchCategory;
  });

  return (
    <div className="min-h-screen bg-[#0B0F14] text-slate-300 selection:bg-teal-500/30">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        
        {/* HEADER */}
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

             <Link 
               href="/campaigns/new" 
               className="px-5 py-2.5 bg-teal-500 text-black font-bold rounded-lg hover:bg-teal-400 transition-colors flex items-center gap-2 shadow-lg shadow-teal-500/10"
             >
               <Plus className="w-4 h-4" /> Start Campaign
             </Link>
          </div>
        </div>

        {/* FILTERS & TOOLBAR */}
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

        {/* CAMPAIGN GRID */}
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
             <p className="text-slate-500">Try adjusting your filters or launch your own.</p>
           </div>
        ) : (
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {filtered.map((campaign) => (
               <div key={campaign.id} className="group bg-[#131823] border border-white/5 rounded-2xl overflow-hidden hover:border-teal-500/30 transition-all duration-300 flex flex-col hover:-translate-y-1">
                 
                 {/* Image Area */}
                 <div className="h-48 relative overflow-hidden">
                   <img 
                      src={campaign.image_url || "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80"} 
                      alt={campaign.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                   />
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
                         <span className="text-white">${(campaign.raised || 0).toLocaleString('en-US')}</span>
                         <span className="text-slate-500">of ${Number(campaign.target_eth).toLocaleString('en-US')} ETH</span>
                       </div>
                       <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                         <div 
                           className={`h-full rounded-full ${campaign.status === 'Funded' ? 'bg-green-500' : 'bg-teal-500'}`} 
                           style={{ width: `${Math.min(((campaign.raised || 0) / campaign.target_eth) * 100, 100)}%` }} 
                         />
                       </div>
                     </div>

                     {/* Stats */}
                     <div className="grid grid-cols-2 gap-4 py-4 border-t border-white/5">
                       <div className="flex items-center gap-2">
                         <Users className="w-4 h-4 text-slate-600" />
                         <span className="text-xs text-slate-300 font-mono">{campaign.donors || 0} Backers</span>
                       </div>
                       <div className="flex items-center gap-2 justify-end">
                         <Clock className="w-4 h-4 text-slate-600" />
                         <span className="text-xs text-slate-300 font-mono">
                           {(campaign.daysLeft || 0) > 0 ? `${campaign.daysLeft} Days Left` : 'Ended'}
                         </span>
                       </div>
                     </div>

                     {/* CTA - LINKS TO THE REAL CONTRACT ADDRESS */}
                     <Link 
                       href={`/campaigns/${campaign.contract_address}`}
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

      <Footer />
    </div>
  );
}