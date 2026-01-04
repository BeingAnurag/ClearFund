'use client';

import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { supabase } from '../../lib/supabase';
import { Wallet, History, ExternalLink, Loader2, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { address, isConnected } = useAccount();
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (address) {
      const fetchHistory = async () => {
        setLoading(true);
        const { data } = await supabase
          .from('donations')
          .select('*')
          .eq('donor_wallet', address) 
          .order('created_at', { ascending: false });
        
        if (data) setDonations(data);
        setLoading(false);
      };
      fetchHistory();
    }
  }, [address]);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-[#0B0F14] text-slate-300 font-sans">
        <Navbar />
        <main className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
           <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
             <Wallet className="w-10 h-10 text-slate-500" />
           </div>
           <h1 className="text-3xl font-bold text-white mb-2">Connect Your Wallet</h1>
           <p className="text-slate-500 max-w-md mb-8">
             Please connect your wallet to view your donation history and impact portfolio.
           </p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F14] text-slate-300 font-sans selection:bg-teal-500/30">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        
        {/* Header Profile Card */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-12 bg-[#131823] border border-white/5 p-8 rounded-2xl">
           <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-teal-500/20 shrink-0">
              <span className="text-3xl font-bold text-white">
                {address?.slice(2,4).toUpperCase()}
              </span>
           </div>
           <div className="text-center md:text-left overflow-hidden w-full">
              <h1 className="text-3xl font-bold text-white mb-1">My Portfolio</h1>
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm font-mono text-slate-400 bg-black/20 py-1 px-3 rounded-lg w-fit mx-auto md:mx-0">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
                 <span className="truncate">{address}</span>
              </div>
           </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
           <div className="bg-[#131823] border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-teal-500/30 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingUp className="w-16 h-16 text-teal-500" />
              </div>
              <p className="text-slate-500 text-sm mb-1 uppercase font-bold tracking-wider">Total Contributed</p>
              <p className="text-4xl font-bold text-white">
                {donations.reduce((acc, curr) => acc + Number(curr.amount_eth), 0).toFixed(4)} <span className="text-lg text-teal-500">ETH</span>
              </p>
           </div>
           
           <div className="bg-[#131823] border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-teal-500/30 transition-colors">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <History className="w-16 h-16 text-blue-500" />
              </div>
              <p className="text-slate-500 text-sm mb-1 uppercase font-bold tracking-wider">Projects Backed</p>
              <p className="text-4xl font-bold text-white">{donations.length}</p>
           </div>
        </div>

        {/* Donation History List */}
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
           <History className="w-5 h-5 text-teal-500" /> Donation History
        </h2>

        {loading ? (
           <div className="flex justify-center py-20">
             <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
           </div>
        ) : donations.length === 0 ? (
           <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl bg-white/5">
              <p className="text-slate-400 text-lg mb-2">You haven't backed any campaigns yet.</p>
              <p className="text-slate-600 text-sm mb-6">Join the movement and support a project today.</p>
              <Link href="/campaigns" className="px-6 py-3 bg-teal-500 text-black font-bold rounded-lg hover:bg-teal-400 transition-colors">
                Explore Projects
              </Link>
           </div>
        ) : (
           <div className="space-y-4">
             {donations.map((item) => (
               <div key={item.id} className="bg-[#131823] border border-white/5 p-5 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4 hover:border-teal-500/30 transition-all hover:bg-[#1A1F2E]">
                  <div className="flex-1 text-center md:text-left">
                     <h4 className="text-white font-bold text-lg mb-1">{item.campaign_title || "Unknown Campaign"}</h4>
                     <p className="text-xs text-slate-500 font-mono">
                        {new Date(item.created_at).toLocaleDateString()} at {new Date(item.created_at).toLocaleTimeString()}
                     </p>
                  </div>
                  
                  <div className="text-right flex flex-col items-center md:items-end">
                     <span className="block text-xl font-bold text-teal-400 mb-1">
                       {item.amount_eth} ETH
                     </span>
                     <a 
                       href={`https://sepolia.etherscan.io/tx/${item.transaction_hash}`}
                       target="_blank"
                       rel="noreferrer"
                       className="text-xs text-slate-500 hover:text-white flex items-center gap-1 bg-white/5 px-2 py-1 rounded transition-colors"
                     >
                       View Transaction <ExternalLink className="w-3 h-3" />
                     </a>
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