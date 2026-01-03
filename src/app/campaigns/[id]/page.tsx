'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation'; 
import { Navbar } from '../../../components/layout/Navbar'; 
import { Footer } from '../../../components/layout/Footer';
import { ALL_CAMPAIGNS } from '../../../data/campaigns'; 
import { DonateModal } from '../../../components/modals/DonateModal';
import { CreatorPanel } from '../../../components/campaign/CreatorPanel';

import { 
  ShieldCheck, 
  Users, 
  Clock, 
  ArrowLeft, 
  ExternalLink,
  FileText,
  Lock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

// --- Web3 Imports ---
import { useAccount, useReadContract } from 'wagmi'; 
import { formatEther } from 'viem';
import { ESCROW_ABI } from '../../../lib/contracts';

export default function CampaignDetailsPage() {
  const params = useParams();
  const campaignAddress = params.id as `0x${string}`;
  const [isDonateModalOpen, setDonateModalOpen] = useState(false);
  
  // Get the Current User's Wallet
  const { address: userWallet } = useAccount();

  // --- Fetch Data ---
  const mockData = ALL_CAMPAIGNS.find((c) => c.id === params.id);

  const { data: totalRaisedWei } = useReadContract({
    address: campaignAddress,
    abi: ESCROW_ABI,
    functionName: 'totalRaised',
    query: { refetchInterval: 2000 },
  });

  const { data: goalWei } = useReadContract({
    address: campaignAddress,
    abi: ESCROW_ABI,
    functionName: 'goal',
  });

  
  const raisedETH = totalRaisedWei ? formatEther(totalRaisedWei) : '0';
  const goalETH = goalWei ? formatEther(goalWei) : (mockData?.target.toString() || '0');
  
  const percentage = goalETH !== '0' 
    ? Math.min((Number(raisedETH) * 100) / Number(goalETH), 100) 
    : 0;

  
  const isCreator = userWallet && mockData?.creatorWallet 
    ? userWallet.toLowerCase() === mockData.creatorWallet.toLowerCase() 
    : userWallet && campaignAddress 
      ? true 
      : false; 

  const isGoalMet = Number(raisedETH) >= Number(goalETH);

  const campaign = {
    title: mockData?.title || "Live Blockchain Campaign",
    description: mockData?.description || "This is a live campaign tracked directly from the Ethereum Sepolia network.",
    image: mockData?.image || "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
    category: mockData?.category || "Blockchain",
    creatorWallet: mockData?.creatorWallet || campaignAddress,
    donors: mockData?.donors || 0,
    daysLeft: mockData?.daysLeft || 30,
    milestones: mockData?.milestones || [
      { id: 1, title: 'Initial Deployment', amount: Number(goalETH) * 0.2, status: 'Pending' },
      { id: 2, title: 'Development Phase', amount: Number(goalETH) * 0.8, status: 'Locked' }
    ],
    verified: true,
    contractAddress: campaignAddress
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] text-slate-300 font-sans selection:bg-teal-500/30">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        
        {/* Breadcrumb */}
        <Link href="/campaigns" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Campaigns
        </Link>

        {/*  CREATOR ADMIN PANEL  */}
        {isCreator && (
           <CreatorPanel 
             contractAddress={campaignAddress} 
             isGoalMet={isGoalMet} 
           />
        )}

        {/* Hero Section */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-12">
          
          {/* LEFT: Content */}
          <div className="space-y-8">
            <div className="relative h-[400px] rounded-2xl overflow-hidden border border-white/5">
              <img 
                src={campaign.image} 
                alt={campaign.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <div className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded">
                  {campaign.category}
                </div>
                {campaign.verified && (
                   <div className="px-3 py-1 bg-teal-500 text-black text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1 shadow-lg shadow-teal-500/20">
                     <ShieldCheck className="w-3 h-3" /> Verified
                   </div>
                )}
              </div>
            </div>

            <div>
               <h1 className="text-4xl font-bold text-white mb-6">{campaign.title}</h1>
               <p className="text-lg text-slate-400 leading-relaxed">
                 {campaign.description}
               </p>
            </div>

            {/* Milestones Section */}
            <div className="bg-[#131823] border border-white/5 rounded-2xl p-8">
               <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                 <Lock className="w-5 h-5 text-teal-500" />
                 Escrow Milestones
               </h3>
               <div className="space-y-4">
                 {campaign.milestones.map((ms) => (
                   <div key={ms.id} className="flex items-center justify-between p-4 bg-[#0B0F14] rounded-xl border border-white/5">
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                           ms.status === 'Released' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                           ms.status === 'Pending' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                           'bg-slate-800 text-slate-500'
                        }`}>
                           {ms.id}
                        </div>
                        <div>
                           <div className="text-white font-medium">{ms.title}</div>
                           <div className="text-xs text-slate-500 font-mono">
                             Unlocks: {typeof ms.amount === 'number' ? `${ms.amount.toFixed(2)} ETH` : ms.amount}
                           </div>
                        </div>
                      </div>
                      <div className={`text-xs font-bold px-2 py-1 rounded ${
                         ms.status === 'Released' ? 'text-green-500 bg-green-500/10' :
                         ms.status === 'Pending' ? 'text-amber-500 bg-amber-500/10' :
                         'text-slate-500 bg-slate-800'
                      }`}>
                         {ms.status.toUpperCase()}
                      </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Audit Logs */}
            <div className="bg-[#131823] border border-white/5 rounded-2xl p-8">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xl font-bold text-white flex items-center gap-2">
                   <FileText className="w-5 h-5 text-blue-500" />
                   Verification & Audits
                 </h3>
                 <Link href="/audits" className="text-sm text-teal-500 hover:underline">
                   View Full History
                 </Link>
               </div>
               
               <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                     <div className="mt-1">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                     </div>
                     <div>
                        <div className="text-sm text-white font-medium">Identity Verified (SBT)</div>
                        <div className="text-xs text-slate-500">Creator identity hash matches KYC records.</div>
                     </div>
                  </div>
                  <div className="flex gap-4 items-start">
                     <div className="mt-1">
                        <ShieldCheck className="w-5 h-5 text-green-500" />
                     </div>
                     <div>
                        <div className="text-sm text-white font-medium">Smart Contract Audited</div>
                        <div className="text-xs text-slate-500">Escrow logic verified by CertiK. No vulnerabilities found.</div>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* RIGHT: Sticky Sidebar */}
          <div className="lg:sticky lg:top-32 h-fit space-y-6">
            <div className="bg-[#131823] border border-white/10 rounded-2xl p-6 shadow-2xl">
              <div className="mb-6">
                 <div className="flex justify-between items-end mb-2">
                    <span className="text-3xl font-bold text-white font-mono">
                      {Number(raisedETH).toFixed(2)} <span className="text-lg text-teal-500">ETH</span>
                    </span>
                    <span className="text-sm text-slate-500 mb-1">
                       of {Number(goalETH).toFixed(2)} ETH goal
                    </span>
                 </div>
                 <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden mb-4">
                    <div 
                      className="h-full bg-teal-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(20,184,166,0.5)]" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                 </div>
                 <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-2 text-slate-400">
                       <Users className="w-4 h-4" /> 
                       <span className="text-white font-medium">{campaign.donors}</span> Donors
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                       <Clock className="w-4 h-4" />
                       <span className="text-white font-medium">{campaign.daysLeft}</span> Days Left
                    </div>
                 </div>
              </div>

              <div className="space-y-3">
                 <button 
                   onClick={() => setDonateModalOpen(true)}
                   className="w-full py-4 bg-teal-500 text-black font-bold rounded-xl hover:bg-teal-400 transition-colors shadow-lg shadow-teal-500/20"
                 >
                   Donate Now
                 </button>
                 <a 
                   href={`https://sepolia.etherscan.io/address/${campaignAddress}`}
                   target="_blank"
                   rel="noreferrer"
                   className="w-full py-3 bg-[#0B0F14] border border-white/10 text-white font-medium rounded-xl hover:bg-white/5 transition-colors flex items-center justify-center gap-2 group"
                 >
                   <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white" />
                   View Contract
                 </a>
              </div>

              <div className="mt-6 pt-6 border-t border-white/5">
                 <div className="text-xs text-slate-500 uppercase font-bold mb-2">Creator Wallet</div>
                 <div className="flex items-center gap-2 font-mono text-xs text-teal-400 bg-teal-500/5 px-3 py-2 rounded-lg border border-teal-500/10 truncate">
                    <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse shrink-0"></div>
                    <span className="truncate">{campaign.creatorWallet}</span>
                 </div>
              </div>
            </div>

            <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-4 flex gap-3">
               <AlertCircle className="w-5 h-5 text-blue-400 shrink-0" />
               <p className="text-xs text-blue-200/70 leading-relaxed">
                  <strong>ClearFund Guarantee:</strong> If the project fails to meet its first milestone within 60 days, all funds are automatically refunded to donors via smart contract.
               </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      
      <DonateModal 
        // @ts-ignore
        campaign={campaign} 
        isOpen={isDonateModalOpen} 
        onClose={() => setDonateModalOpen(false)} 
      />
    </div>
  );
}