'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import { 
  ShieldAlert, 
  Wallet, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  ChevronRight,
  Info,
  Loader2
} from 'lucide-react';

// --- Web3 Imports ---
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, decodeEventLog } from 'viem'; 
import { FACTORY_ADDRESS, FACTORY_ABI } from '../../../lib/contracts';

export default function NewCampaignPage() {
  const router = useRouter();

  // --- Form State ---
  const [formData, setFormData] = useState({
    title: '',
    category: 'Sustainability',
    description: '',
    target: '',
    duration: '30',
  });

  const [milestones, setMilestones] = useState([
    { title: 'Initial Mobilization', percent: 20, description: '' }
  ]);
  

  const [deployedAddress, setDeployedAddress] = useState<string | null>(null);

  // --- Web3 Hooks ---
  const { 
    data: hash, 
    error: writeError, 
    writeContract, 
    isPending: isWalletTriggered 
  } = useWriteContract();

  const { 
    data: receipt, 
    isLoading: isConfirming, 
    isSuccess: isConfirmed 
  } = useWaitForTransactionReceipt({ 
    hash 
  });


  const isSubmitting = isWalletTriggered || isConfirming;

  
  useEffect(() => {
    if (isConfirmed && receipt) {
      try {
        
        for (const log of receipt.logs) {
          try {
            
            const event = decodeEventLog({
              abi: FACTORY_ABI,
              data: log.data,
              topics: log.topics, 
            });
            
            
            if (event.eventName === 'CampaignCreated') {
             
              setDeployedAddress(event.args.campaignAddress);
              break; 
            }
          } catch (e) {
            
            continue;
          }
        }
      } catch (err) {
        console.error("Error parsing logs:", err);
      }
    }
  }, [isConfirmed, receipt]);

  // Handlers
  const addMilestone = () => {
    setMilestones([...milestones, { title: '', percent: 0, description: '' }]);
  };

  const removeMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.target || !formData.title) return;

    try {
      writeContract({
        address: FACTORY_ADDRESS,
        abi: FACTORY_ABI,
        functionName: 'createCampaign',
        args: [
          formData.title,
          formData.category,
          "QmHashPlaceholder", 
          parseEther(formData.target), 
          BigInt(formData.duration)
        ],
      });
    } catch (err) {
      console.error("Submission Failed:", err);
    }
  };

  // --- Success State (Updated) ---
  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-[#0B0F14] text-slate-300 font-sans">
        <Navbar />
        <main className="max-w-3xl mx-auto px-6 pt-40 pb-24 text-center">
          <div className="w-20 h-20 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-teal-500/20">
            <CheckCircle2 className="w-10 h-10 text-teal-500" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Campaign Deployed!</h1>
          <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto">
            Your campaign smart contract is live. You can now visit its dashboard or share the address with donors.
          </p>
          
          <div className="bg-[#131823] border border-white/10 rounded-xl p-6 mb-10 max-w-lg mx-auto text-left">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-slate-500">Contract Address</span>
              {deployedAddress ? (
                 <span className="font-mono text-teal-400 text-sm bg-teal-500/10 px-2 py-1 rounded border border-teal-500/20 select-all">
                   {deployedAddress}
                 </span>
              ) : (
                 <span className="text-slate-600 italic text-sm animate-pulse">Locating address...</span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Transaction</span>
              <a 
                href={`https://sepolia.etherscan.io/tx/${hash}`} 
                target="_blank" 
                rel="noreferrer"
                className="font-mono text-teal-400 hover:underline text-sm truncate w-32 md:w-auto"
              >
                {hash?.slice(0, 10)}...{hash?.slice(-8)}
              </a>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
             <Link 
               href="/campaigns"
               className="px-6 py-3 border border-white/10 text-white font-bold rounded-lg hover:bg-white/5 transition-colors"
             >
               Dashboard
             </Link>
             
             {/* 5. Dynamic Link Button */}
             {deployedAddress ? (
               <Link 
                 href={`/campaigns/${deployedAddress}`}
                 className="px-8 py-3 bg-teal-500 text-black font-bold rounded-lg hover:bg-teal-400 transition-colors shadow-lg shadow-teal-500/20"
               >
                 View Campaign Page
               </Link>
             ) : (
               <button disabled className="px-8 py-3 bg-teal-500/50 text-black font-bold rounded-lg cursor-not-allowed">
                 View Campaign Page
               </button>
             )}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // --- Form UI (Unchanged) ---
  return (
    <div className="min-h-screen bg-[#0B0F14] text-slate-300 selection:bg-teal-500/30 font-sans">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center space-x-2 bg-teal-900/10 border border-teal-500/20 rounded px-3 py-1 mb-6">
            <span className="text-xs font-medium text-teal-400 uppercase tracking-wider">Creator Portal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Start a Verified Campaign</h1>
          <p className="text-lg text-slate-400">
            All campaigns are audited before fundraising begins. Funds are locked in smart contracts.
          </p>
        </div>

        {/* Verification Notice */}
        <div className="bg-amber-900/10 border border-amber-500/20 rounded-xl p-6 mb-12 flex gap-4">
          <ShieldAlert className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
          <div className="space-y-2">
            <h3 className="text-amber-100 font-bold">Compliance & Accountability Notice</h3>
            <p className="text-sm text-amber-200/70 leading-relaxed">
              By proceeding, you agree to mint a <strong>Soulbound Token (SBT)</strong> linked to your real-world identity.
            </p>
          </div>
        </div>

        {/* Error Display */}
        {writeError && (
          <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl mb-8 flex gap-3 text-red-400 animate-in fade-in slide-in-from-top-2">
             <AlertCircle className="w-5 h-5 shrink-0" />
             <div>
               <p className="font-bold text-sm">Transaction Failed</p>
               <p className="text-xs opacity-80">{writeError.message.split('\n')[0]}</p>
             </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-12">
          
          {/* Campaign Details Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6">
              <FileText className="w-5 h-5 text-teal-500" />
              <h2 className="text-xl font-bold text-white">Campaign Details</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Campaign Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Ocean Cleanup Phase 4"
                  className="w-full bg-[#131823] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500/50 transition-colors"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Category</label>
                <select 
                  className="w-full bg-[#131823] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500/50 transition-colors"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option>Sustainability</option>
                  <option>Technology</option>
                  <option>Research</option>
                  <option>Infrastructure</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Campaign Description</label>
              <textarea 
                required
                rows={5}
                placeholder="Describe your project, goals, and impact..."
                className="w-full bg-[#131823] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500/50 transition-colors"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Target Amount (ETH)</label>
                <input 
                  type="number" 
                  step="0.001"
                  required
                  placeholder="0.00"
                  className="w-full bg-[#131823] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500/50 transition-colors font-mono"
                  value={formData.target}
                  onChange={e => setFormData({...formData, target: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Duration (Days)</label>
                <input 
                  type="number" 
                  required
                  className="w-full bg-[#131823] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500/50 transition-colors"
                  value={formData.duration}
                  onChange={e => setFormData({...formData, duration: e.target.value})}
                />
              </div>
            </div>
          </section>

          {/* Milestones Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-teal-500" />
                <h2 className="text-xl font-bold text-white">Funding Milestones</h2>
              </div>
              <button type="button" onClick={addMilestone} className="text-sm text-teal-400 hover:text-teal-300 font-medium flex items-center gap-1">
                <Plus className="w-4 h-4" /> Add Milestone
              </button>
            </div>

            <div className="bg-[#131823] border border-white/5 rounded-xl p-1">
              {milestones.map((ms, index) => (
                <div key={index} className="p-6 border-b border-white/5 last:border-0 relative group">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Milestone {index + 1}</span>
                    {milestones.length > 1 && (
                      <button type="button" onClick={() => removeMilestone(index)} className="text-slate-600 hover:text-rose-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid md:grid-cols-[2fr_1fr] gap-4 mb-4">
                    <input type="text" placeholder="Milestone Title" className="bg-[#0B0F14] border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-teal-500/50 focus:outline-none"/>
                    <div className="relative">
                      <input 
                        type="number" 
                        placeholder="%" 
                        className="w-full bg-[#0B0F14] border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-teal-500/50 focus:outline-none"
                        value={ms.percent}
                        onChange={(e) => {
                          const newM = [...milestones];
                          newM[index].percent = Number(e.target.value);
                          setMilestones(newM);
                        }}
                      />
                      <span className="absolute right-3 top-2 text-slate-500 text-xs">%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-blue-900/10 border border-blue-500/20 p-3 rounded-lg">
              <Info className="w-4 h-4 text-blue-400" />
              <span>Total fund release must equal 100%. Current total: <span className="text-white font-mono font-bold">{milestones.reduce((a, b) => a + b.percent, 0)}%</span></span>
            </div>
          </section>

          {/* Identity & Docs Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6">
              <Wallet className="w-5 h-5 text-teal-500" />
              <h2 className="text-xl font-bold text-white">Identity & Verification</h2>
            </div>
            {/* ... (Keep Identity UI same as before) ... */}
            <div className="bg-[#131823] p-6 rounded-xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h4 className="text-white font-bold">Wallet Connected</h4>
                  <p className="text-sm text-slate-400 font-mono">0x71C...9A21</p>
                </div>
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex items-start gap-3 mb-8">
              <input type="checkbox" required className="mt-1 w-4 h-4 rounded bg-[#131823] border-white/20 text-teal-500 focus:ring-0 focus:ring-offset-0" />
              <p className="text-sm text-slate-400">
                I confirm that all information provided is accurate.
              </p>
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 bg-teal-500 text-black font-bold text-lg rounded-xl hover:bg-teal-400 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isWalletTriggered ? (
                <><Loader2 className="animate-spin w-5 h-5" /> Check Wallet...</>
              ) : isConfirming ? (
                <><Loader2 className="animate-spin w-5 h-5" /> Deploying to Blockchain...</>
              ) : (
                <>Launch Campaign <ChevronRight className="w-5 h-5" /></>
              )}
            </button>
            
            {hash && isConfirming && (
              <p className="text-center text-xs text-slate-500 mt-4 font-mono">
                Transaction Pending: {hash.slice(0, 10)}...
              </p>
            )}
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}