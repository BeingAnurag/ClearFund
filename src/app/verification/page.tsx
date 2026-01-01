'use client'

import React from 'react';
import Link from 'next/link';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { 
  ShieldCheck, 
  Users, 
  Lock, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  FileSearch 
} from 'lucide-react';

export default function VerificationPage() {
  const steps = [
    { 
      step: "01", 
      title: "Campaign Creation", 
      desc: "Creators submit a detailed proposal. Their identity is verified off-chain and then minted as a Soulbound Token (SBT), creating a permanent, non-transferable on-chain reputation.", 
      icon: ShieldCheck,
      active: false 
    },
    { 
      step: "02", 
      title: "Community Verification", 
      desc: "Independent validators review the proposal against our transparency standards. A minimum 70% consensus is required from the DAO before the campaign is publicly listed.", 
      icon: Users,
      active: false 
    },
    { 
      step: "03", 
      title: "Secure Donation", 
      desc: "Funds are locked inside a smart contract vault — never sent directly to the creator’s wallet. This escrow mechanism ensures funds are safe until obligations are met.", 
      icon: Lock,
      active: true // Highlighted step
    },
    { 
      step: "04", 
      title: "Milestone-Based Release", 
      desc: "Funds are released in controlled tranches (e.g., 20% upfront, 40% after Phase 1). Creators must submit proof of work which is verified on-chain before the next tranche unlocks.", 
      icon: Layers,
      active: false 
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F14] text-slate-300 selection:bg-teal-500/30 font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative overflow-hidden">
        
        {/* Background Ambient Glow (Top Right) */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-teal-900/20 rounded-full blur-[120px] pointer-events-none opacity-40"></div>

        {/* 1. PAGE HEADER */}
        <div className="max-w-3xl mb-24 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-teal-900/20 border border-teal-500/20 rounded-full px-3 py-1 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            <span className="text-xs font-medium text-teal-400 uppercase tracking-wider">Protocol Overview</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-6">
            The Journey of a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200">Verified Dollar</span>
          </h1>
          
          <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">
            See exactly how ClearFund ensures your contribution makes a real impact. No black boxes — just clear, verifiable code governing every cent.
          </p>
        </div>

        {/* 2. MAIN CONTENT GRID */}
        <div className="grid lg:grid-cols-2 gap-20 items-start relative z-10">
          
          {/* LEFT COLUMN: Context & Metrics */}
          {/* FIX 1: Added 'relative' here to contain the new bottom glow */}
          <div className="space-y-12 lg:sticky lg:top-32 relative">
            
            {/* FIX 1: New subtle glow filler for the bottom left empty space */}
            <div className="absolute -bottom-32 -left-20 w-72 h-72 bg-teal-900/10 rounded-full blur-[100px] pointer-events-none opacity-40 z-0"></div>

            <div className="relative z-10 space-y-12">
              <div className="prose prose-invert">
                <p className="text-lg text-slate-400 leading-relaxed">
                  ClearFund replaces blind trust with cryptographic verification. Unlike traditional platforms where funds are transferred immediately to a bank account, our protocol enforces a strict, programmable set of rules.
                </p>
                <p className="text-lg text-slate-400 leading-relaxed">
                  Every action — from the initial identity verification to the final release of funds — is publicly auditable and mathematically enforced by smart contracts on the Ethereum blockchain.
                </p>
              </div>

              {/* TRUST METRICS */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-[#131823]/60 backdrop-blur-sm border border-white/5 relative group overflow-hidden hover:border-teal-500/20 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-4xl font-bold text-white mb-1">0%</div>
                    <div className="text-sm text-slate-500 font-medium uppercase tracking-wider flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-500" /> Fraud Rate
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#131823]/60 backdrop-blur-sm border border-white/5 relative group overflow-hidden hover:border-blue-500/20 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-4xl font-bold text-white mb-1">100%</div>
                    <div className="text-sm text-slate-500 font-medium uppercase tracking-wider flex items-center gap-2">
                      <FileSearch className="w-4 h-4 text-blue-500" /> Traceability
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA SECTION */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link 
                  href="/campaigns"
                  className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-teal-50 transition-all shadow-lg shadow-white/5 text-center hover:scale-105 active:scale-95 duration-300"
                >
                  Browse Verified Campaigns
                </Link>
                <Link 
                  href="/audits"
                  className="px-8 py-4 bg-transparent border border-white/10 text-white font-medium rounded-full hover:bg-white/5 transition-all flex items-center justify-center gap-2 group hover:border-white/30"
                >
                  View Live Audits <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Vertical Timeline */}
          <div className="relative pl-8 md:pl-12 border-l border-white/10 space-y-16 py-4 my-4">
            {steps.map((item, i) => (
              // FIX 2: Added group-hover logic to the parent container for smoother opacity transitions
              <div key={i} className={`relative group transition-all duration-500 ${item.active ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}>
                
                {/* Timeline Node */}
                <div className={`absolute -left-[45px] md:-left-[61px] top-0 w-10 h-10 rounded-full border-4 border-[#0B0F14] flex items-center justify-center transition-all duration-500 z-10
                  ${item.active 
                    ? 'bg-teal-500 text-black shadow-[0_0_20px_rgba(20,184,166,0.4)] scale-110' 
                    // Added group-hover state for inactive nodes
                    : 'bg-[#1A202C] text-slate-500 border-[#0B0F14] group-hover:border-teal-500/30 group-hover:text-teal-400 group-hover:bg-[#131823] group-hover:scale-105'
                  }`}>
                  <item.icon className="w-5 h-5" />
                </div>

                {/* Content Card - FIX 2: Added hover animations here */}
                <div className={`
                  p-8 rounded-2xl border transition-all duration-500 transform perspective-1000
                  ${item.active 
                    // Active state: slightly boosted
                    ? 'bg-[#131823] border-teal-500/40 shadow-[0_0_30px_rgba(20,184,166,0.1)] scale-[1.01]' 
                    // Inactive state: Added hover for scale, translate, border, bg, and shadow
                    : 'bg-[#0D1117] border-white/5 group-hover:bg-[#131823] group-hover:border-teal-500/30 group-hover:shadow-[0_0_25px_rgba(20,184,166,0.07)] group-hover:scale-[1.02] group-hover:-translate-y-1'
                  }
                `}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-xl font-bold transition-colors duration-300 ${item.active || 'group-hover:text-white'} ${item.active ? 'text-white' : 'text-slate-200'}`}>
                      {item.title}
                    </h3>
                    <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider transition-all duration-300
                      ${item.active 
                        ? 'bg-teal-500/10 text-teal-400' 
                        : 'bg-white/5 text-slate-500 group-hover:bg-teal-500/10 group-hover:text-teal-400'}
                    `}>
                      Step {item.step}
                    </span>
                  </div>
                  
                  <p className="text-slate-400 leading-relaxed text-sm md:text-base transition-colors duration-300 group-hover:text-slate-300">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}