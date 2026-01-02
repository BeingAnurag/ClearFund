'use client'

import React from 'react';
import Link from 'next/link';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  FileCode, 
  Globe, 
  Fingerprint, 
  ArrowRight,
  Scale,
  History,
  Activity,
  CheckCircle2,
  Server
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0B0F14] text-slate-300 selection:bg-teal-500/30 font-sans">
      <Navbar />

      <main className="pt-32 pb-24">
        
        {/* 1. HERO SECTION (Updated to 2-Column Layout) */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Text Content */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center space-x-2 bg-teal-900/10 border border-teal-500/20 rounded-full px-3 py-1 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </span>
                <span className="text-xs font-medium text-teal-400 uppercase tracking-wider">Protocol V1.0 Live</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-8 leading-tight">
                Redefining Trust in <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200">
                  Digital Crowdfunding
                </span>
              </h1>
              <p className="text-xl text-slate-400 leading-relaxed">
                ClearFund is not just a platform; it is a protocol for accountability. We replace blind faith with cryptographic verification, ensuring every dollar donated is tracked, managed, and released only when real impact is proven.
              </p>
            </div>

            {/* Right: "System Integrity" Monitor (Fills the empty space) */}
            <div className="relative">
              {/* Background Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-2xl blur-2xl opacity-40"></div>
              
              {/* Glass Card */}
              <div className="relative bg-[#131823]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-teal-500" />
                    <span className="font-bold text-white tracking-wide">SYSTEM INTEGRITY</span>
                  </div>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500/50"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500/20"></span>
                  </div>
                </div>

                {/* Status Grid */}
                <div className="space-y-4">
                  {[
                    { label: "Smart Contracts", status: "Immutable", icon: FileCode },
                    { label: "Identity Verification", status: "SBT Enforced", icon: Fingerprint },
                    { label: "Fund Custody", status: "Escrow Locked", icon: Lock },
                    { label: "Audit Logs", status: "Public Sync", icon: Server },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-white/5 group hover:border-teal-500/20 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/5 rounded-md text-slate-400 group-hover:text-teal-400 transition-colors">
                          <item.icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-slate-300">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-teal-400">{item.status}</span>
                        <CheckCircle2 className="w-3 h-3 text-teal-500" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Stats */}
                <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                   <div>
                      <div className="text-xs text-slate-500 uppercase font-bold mb-1">Uptime</div>
                      <div className="text-xl font-mono text-white">99.99%</div>
                   </div>
                   <div className="text-right">
                      <div className="text-xs text-slate-500 uppercase font-bold mb-1">Total Verified</div>
                      <div className="text-xl font-mono text-white">12,405 ETH</div>
                   </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 2. THE PROBLEM VS SOLUTION */}
        <section className="bg-[#131823]/50 border-y border-white/5 py-24 mb-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              
              {/* The Old Way */}
              <div className="space-y-8">
                <div className="flex items-center gap-3 text-rose-500 mb-2">
                  <ShieldAlert className="w-6 h-6" />
                  <h2 className="text-lg font-bold uppercase tracking-wider">The Broken Model</h2>
                </div>
                <h3 className="text-3xl font-bold text-white">Why Traditional Crowdfunding Fails</h3>
                <p className="text-slate-400 leading-relaxed">
                  In the current landscape, donors are forced to trust strangers blindly. Once funds leave your bank account, they enter a "black box" where visibility ends.
                </p>
                <ul className="space-y-4">
                  {[
                    "No control over funds after donation",
                    "Impossible to verify identity claims accurately",
                    "Zero recourse if a project is abandoned",
                    "Funds can be withdrawn instantly by creators"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-400">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-500/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* The ClearFund Way */}
              <div className="space-y-8 relative">
                {/* Visual Connector Line (Desktop) */}
                <div className="hidden md:block absolute -left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
                
                <div className="flex items-center gap-3 text-teal-400 mb-2">
                  <ShieldCheck className="w-6 h-6" />
                  <h2 className="text-lg font-bold uppercase tracking-wider">The ClearFund Protocol</h2>
                </div>
                <h3 className="text-3xl font-bold text-white">Enforcing Accountability with Code</h3>
                <p className="text-slate-400 leading-relaxed">
                  We remove the need for trust entirely. By using smart contracts, we programmatically enforce the rules of engagement between donors and creators.
                </p>
                <ul className="space-y-4">
                  {[
                    "Funds held in immutable smart contract escrow",
                    "Identity verified via Soulbound Tokens (SBT)",
                    "Milestone-based release triggers (no work, no pay)",
                    "Public, real-time audit trail on Ethereum"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-white">
                      <CheckCircle className="w-5 h-5 text-teal-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* 3. HOW IT WORKS (Process) */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">The Lifecycle of a Verified Campaign</h2>
            <p className="text-slate-400">A rigorous process designed to protect capital and incentivize delivery.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { 
                icon: Fingerprint, 
                title: "Identity Verification", 
                desc: "Creators prove their identity off-chain, minting a non-transferable Reputation Token." 
              },
              { 
                icon: FileCode, 
                title: "Contract Deployment", 
                desc: "A unique smart contract vault is deployed specifically for the campaign's funds." 
              },
              { 
                icon: Lock, 
                title: "Secure Funding", 
                desc: "Donations are locked in the vault. The creator cannot withdraw them arbitrarily." 
              },
              { 
                icon: Scale, 
                title: "Milestone Release", 
                desc: "Funds are unlocked in stages only after the community verifies proof of work." 
              }
            ].map((step, i) => (
              <div key={i} className="p-8 rounded-2xl bg-[#131823] border border-white/5 hover:border-teal-500/30 transition-all group">
                <div className="w-12 h-12 bg-teal-900/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <step.icon className="w-6 h-6 text-teal-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. WHY WEB3 */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="bg-gradient-to-br from-[#131823] to-[#0B0F14] rounded-3xl p-8 md:p-16 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-3 py-1 bg-teal-900/20 rounded-full text-xs font-bold text-teal-400 mb-6">
                  THE TECHNOLOGY
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why Blockchain?</h2>
                <div className="space-y-6 text-slate-400 leading-relaxed">
                  <p>
                    We don't use blockchain for the hype. We use it because it is the only technology that allows for <strong>"trustless" coordination</strong>.
                  </p>
                  <p>
                    In a traditional database, the platform admin can change numbers, delete records, or move funds silently. On the blockchain, <strong>code is law</strong>. Once a campaign rule is deployed (e.g., "Release 20% only if Milestone 1 is met"), even we cannot override it.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="p-6 bg-[#0B0F14]/50 rounded-xl border border-white/5">
                  <Globe className="w-6 h-6 text-slate-300 mb-3" />
                  <h4 className="text-white font-bold mb-1">Global & Permissionless</h4>
                  <p className="text-sm text-slate-500">Accessible to anyone with an internet connection, bypassing traditional banking borders.</p>
                </div>
                <div className="p-6 bg-[#0B0F14]/50 rounded-xl border border-white/5">
                  <History className="w-6 h-6 text-slate-300 mb-3" />
                  <h4 className="text-white font-bold mb-1">Immutable History</h4>
                  <p className="text-sm text-slate-500">Every transaction is permanently recorded and cannot be deleted or altered retroactively.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. VISION & CTA */}
        <section className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Our Vision</h2>
          <p className="text-lg text-slate-400 mb-12 leading-relaxed">
            We are building the standard for high-integrity capital formation. A future where fraud is mathematically impossible, and every contribution creates verifiable change.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/create"
              className="px-8 py-4 bg-teal-500 text-black font-bold rounded-lg hover:bg-teal-400 transition-colors w-full sm:w-auto"
            >
              Start a Verified Campaign
            </Link>
            <Link 
              href="/audits"
              className="px-8 py-4 bg-[#131823] text-white font-medium border border-white/10 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Explore Audits <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

// Helper Component for the list checkmark
function CheckCircle({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}