'use client'

import React, { useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { 
  Activity, 
  ExternalLink, 
  CheckCircle2, 
  FileCode, 
  Database, 
  ShieldAlert, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Box,
  Lock,
  ArrowRightLeft
} from 'lucide-react';

// --- Types ---
interface AuditEvent {
  id: string;
  type: 'Donation' | 'Release' | 'Verification' | 'Milestone';
  campaign: string;
  amount?: string;
  timestamp: string;
  hash: string;
  status: 'Verified' | 'Pending';
}

interface CampaignSummary {
  id: number;
  name: string;
  contract: string;
  raised: string;
  locked: string;
  released: string;
  milestones: string;
  sbtStatus: 'Verified' | 'Pending';
}

// --- Mock Data ---
const CAMPAIGNS: CampaignSummary[] = [
  {
    id: 1,
    name: "Ocean Cleanup: Phase 4",
    contract: "0x7a2...9f41",
    raised: "1,250.00 ETH",
    locked: "850.00 ETH",
    released: "400.00 ETH",
    milestones: "2/5 Completed",
    sbtStatus: "Verified"
  },
  {
    id: 2,
    name: "Decentralized Science Hub",
    contract: "0x3b1...2e9a",
    raised: "450.00 ETH",
    locked: "450.00 ETH",
    released: "0.00 ETH",
    milestones: "0/3 Completed",
    sbtStatus: "Verified"
  }
];

const AUDIT_LOGS: AuditEvent[] = [
  { id: 'evt_1', type: 'Donation', campaign: 'Ocean Cleanup: Phase 4', amount: '5.2 ETH', timestamp: '2 mins ago', hash: '0x8a...4b21', status: 'Verified' },
  { id: 'evt_2', type: 'Verification', campaign: 'Urban Vertical Gardens', timestamp: '15 mins ago', hash: '0x3c...9d12', status: 'Verified' },
  { id: 'evt_3', type: 'Donation', campaign: 'Decentralized Science Hub', amount: '12.5 ETH', timestamp: '42 mins ago', hash: '0x1f...8e33', status: 'Verified' },
  { id: 'evt_4', type: 'Milestone', campaign: 'Ocean Cleanup: Phase 4', timestamp: '2 hours ago', hash: '0x9b...2a11', status: 'Pending' },
  { id: 'evt_5', type: 'Release', campaign: 'Tech for Schools', amount: '25.0 ETH', timestamp: '5 hours ago', hash: '0x4d...1c99', status: 'Verified' },
  { id: 'evt_6', type: 'Donation', campaign: 'Ocean Cleanup: Phase 4', amount: '1.0 ETH', timestamp: '6 hours ago', hash: '0x2a...3f44', status: 'Verified' },
];

export default function AuditsPage() {
  // Accordion Logic
  const [expandedId, setExpandedId] = useState<number | null>(1); 
  const [filterType, setFilterType] = useState('All');

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredLogs = filterType === 'All' 
    ? AUDIT_LOGS 
    : AUDIT_LOGS.filter(log => log.type === filterType);

  return (
    <div className="min-h-screen bg-[#0B0F14] text-slate-300 selection:bg-teal-500/30 font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        
        {/* 1. HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 bg-teal-900/10 border border-teal-500/20 rounded px-2 py-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <span className="text-xs font-mono font-medium text-teal-400">NETWORK OPERATIONAL</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Public Audits & Transparency
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl">
              Every transaction on ClearFund is publicly verifiable. No hidden wallets. No manual overrides.
            </p>
          </div>

          <div className="flex flex-col items-end space-y-2 text-right">
            <div className="text-xs text-slate-500 font-mono">LATEST BLOCK</div>
            <div className="text-xl font-mono text-white flex items-center gap-2">
              <Box className="w-4 h-4 text-teal-500" /> #18,492,031
            </div>
            <div className="text-xs text-slate-500">Updated 2s ago</div>
          </div>
        </div>

        {/* 2. CAMPAIGN AUDIT SUMMARY (Grid) */}
        <div className="mb-16">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">Active Contract Summaries</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {CAMPAIGNS.map((campaign) => (
              <div 
                key={campaign.id}
                className={`bg-[#131823] border rounded-xl overflow-hidden transition-all duration-300 group relative z-0
                  ${expandedId === campaign.id 
                    ? 'border-teal-500/30 shadow-[0_0_20px_rgba(20,184,166,0.05)]' 
                    : 'border-white/5 hover:border-white/10'
                  }
                `}
              >
                {/* Card Header - ALWAYS VISIBLE INFO */}
                <div 
                  className="p-6 flex items-center justify-between cursor-pointer relative z-10 bg-[#131823]"
                  onClick={() => toggleExpand(campaign.id)}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-teal-400 transition-colors">{campaign.name}</h3>
                      {campaign.sbtStatus === 'Verified' && (
                        <span title="SBT Verified">
                           <CheckCircle2 className="w-4 h-4 text-teal-500" />
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                      <FileCode className="w-3 h-3" />
                      {campaign.contract}
                    </div>
                  </div>

                  {/* Quick Stats Visible in Header */}
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Raised</div>
                      <div className="text-sm font-mono text-white">{campaign.raised}</div>
                    </div>
                    <div className={`p-2 rounded-lg transition-all duration-300 ${expandedId === campaign.id ? 'bg-teal-500/10 text-teal-400 rotate-180' : 'bg-white/5 text-slate-400'}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Expanded Details - GRID ANIMATION FIX */}
                <div 
                  className={`
                    grid transition-[grid-template-rows,opacity] duration-300 ease-out
                    ${expandedId === campaign.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
                  `}
                >
                  <div className="overflow-hidden">
                    {/* Inner content with border at top */}
                    <div className="border-t border-white/5 bg-[#0D1117]/50 p-6 grid grid-cols-2 gap-y-6 gap-x-4">
                      
                      {/* Funds Locked */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                          <Lock className="w-3 h-3" /> Funds Locked
                        </div>
                        <div className="text-lg font-mono text-teal-400 font-medium">{campaign.locked}</div>
                      </div>
                      
                      {/* Funds Released */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                          <ArrowRightLeft className="w-3 h-3" /> Released
                        </div>
                        <div className="text-lg font-mono text-white font-medium">{campaign.released}</div>
                      </div>

                      {/* Milestones */}
                      <div className="col-span-2 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Milestone Progress</span>
                          <span className="text-white font-mono">{campaign.milestones}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-teal-500 w-[40%] rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="col-span-2 flex gap-3 mt-2">
                        <button className="flex-1 px-3 py-2 text-xs font-medium bg-white/5 hover:bg-white/10 border border-white/10 rounded flex items-center justify-center gap-2 transition-colors">
                          <ExternalLink className="w-3 h-3" /> Contract
                        </button>
                        <button className="flex-1 px-3 py-2 text-xs font-medium bg-white/5 hover:bg-white/10 border border-white/10 rounded flex items-center justify-center gap-2 transition-colors">
                          <Activity className="w-3 h-3" /> Transactions
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. LIVE AUDIT FEED */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-[#131823] p-4 rounded-xl border border-white/5">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Activity className="w-4 h-4 text-teal-500" />
              <span className="text-sm font-bold text-white">Live Event Feed</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Filter by hash..." 
                  className="w-full bg-[#0B0F14] border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-teal-500/50"
                />
              </div>
              <div className="h-6 w-[1px] bg-white/10 hidden md:block"></div>
              <div className="flex gap-2">
                {['All', 'Donation', 'Release', 'Milestone'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      filterType === type 
                        ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' 
                        : 'text-slate-500 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border border-white/5 rounded-xl overflow-hidden bg-[#0D1117]">
            {filteredLogs.map((log, index) => (
              <div 
                key={log.id} 
                className={`p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 last:border-0 hover:bg-[#131823] transition-colors ${
                  index % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`mt-1 w-2 h-2 rounded-full ${
                    log.type === 'Donation' ? 'bg-green-500' :
                    log.type === 'Release' ? 'bg-amber-500' :
                    'bg-blue-500'
                  }`}></div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-white">{log.type}</span>
                      <span className="text-xs text-slate-500">•</span>
                      <span className="text-xs text-teal-400 font-mono">{log.amount || 'System Event'}</span>
                    </div>
                    <div className="text-xs text-slate-400">
                      {log.campaign}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                  <div className="text-right">
                    <div className={`text-xs font-medium flex items-center justify-end gap-1 ${
                      log.status === 'Verified' ? 'text-teal-500' : 'text-amber-500'
                    }`}>
                      {log.status === 'Verified' && <CheckCircle2 className="w-3 h-3" />}
                      {log.status}
                    </div>
                    <div className="text-[10px] text-slate-600 font-mono mt-0.5">{log.timestamp}</div>
                  </div>
                  
                  <a href="#" className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded transition-colors group relative" title="View on Etherscan">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. TRANSPARENCY GUARANTEES */}
        <div className="mt-20 grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#131823]/50 border border-white/5 rounded-xl">
            <FileCode className="w-8 h-8 text-teal-500 mb-4" />
            <h3 className="text-white font-bold mb-2">Code is Law</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Fund release rules are hardcoded into immutable smart contracts. Neither ClearFund nor the creator can alter these rules once deployed.
            </p>
          </div>
          <div className="p-6 bg-[#131823]/50 border border-white/5 rounded-xl">
            <Database className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="text-white font-bold mb-2">Immutable Records</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Every action is permanently recorded on the Ethereum blockchain. This creates an unalterable history of truth that serves as the ultimate audit trail.
            </p>
          </div>
          <div className="p-6 bg-[#131823]/50 border border-white/5 rounded-xl">
            <ShieldAlert className="w-8 h-8 text-amber-500 mb-4" />
            <h3 className="text-white font-bold mb-2">Public Verification</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Anyone can verify the solvency of a campaign in real-time. Our UI simply indexes on-chain data; the truth lies in the block explorer.
            </p>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}