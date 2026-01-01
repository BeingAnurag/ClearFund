'use client'
import React from 'react';
import { ArrowRight, Wallet, Radio, CheckCircle2, FileText, Activity, ExternalLink } from 'lucide-react';
import Link from 'next/link';

// Feed Item Component (Internal helper)
const FeedItem = ({ icon: Icon, title, subtitle, value, time, color }: any) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-800/50 last:border-0">
    <div className="flex items-center space-x-3">
      <div className={`w-2 h-2 rounded-full ${color}`}></div>
      <div>
        <h4 className="text-sm font-medium text-white">{title}</h4>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
    </div>
    <div className="text-right">
      <p className={`text-sm font-medium ${color.replace('bg-', 'text-')}`}>{value}</p>
      <p className="text-xs text-slate-500">{time}</p>
    </div>
  </div>
);

export const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-20">
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl mx-auto pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] mix-blend-screen"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] mix-blend-screen"></div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-20 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* Left Content */}
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 bg-teal-900/30 border border-teal-500/30 rounded-full px-4 py-1.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
            </span>
            <span className="text-sm font-medium text-teal-400">Live Verification Protocol Active</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]">
            Crowdfunding <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200">
              You Can Verify
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            The first platform combining hybrid payments with Soulbound Token (SBT) verification and real-time on-chain audits. Trust is no longer optional.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="px-8 py-4 bg-teal-500 text-black font-bold rounded-xl shadow-lg shadow-teal-500/20 hover:bg-teal-400 transition-all transform hover:scale-105">
              Start Verified Campaign
            </button>
            <button className="group flex items-center space-x-2 px-8 py-4 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-all">
              <span>View Audits</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Content - Live Transparency Feed */}
        <div className="w-full max-w-md">
          <div className="bg-[#131823]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            {/* Glow effect for the card */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-50 pointer-events-none"></div>
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="flex items-center space-x-2">
                <Radio className="w-5 h-5 text-teal-400 animate-pulse" />
                <h3 className="text-sm font-bold text-white tracking-widest uppercase">Live Transparency Feed</h3>
              </div>
              <span className="text-xs font-medium text-slate-500">Block: #184293...</span>
            </div>

            <div className="space-y-1 relative z-10">
              <FeedItem 
                icon={CheckCircle2}
                title="Donation Verified"
                subtitle="Clean Water Initiative"
                value="5.0 ETH"
                time="2M AGO"
                color="bg-teal-400"
              />
              <FeedItem 
                icon={FileText}
                title="Audit Completed"
                subtitle="Tech for Schools"
                value="100% Score"
                time="15M AGO"
                color="bg-blue-400"
              />
              <FeedItem 
                icon={Activity}
                title="Campaign Created"
                subtitle="Reforest Amazon"
                value="Target: 50k"
                time="1H AGO"
                color="bg-yellow-400"
              />
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10 relative z-10">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span className="text-xs text-slate-400">Network: <span className="text-white font-medium">Operational</span></span>
              </div>
              <Link href="#" className="flex items-center space-x-1 text-xs text-teal-400 hover:text-teal-300 transition-colors">
                <span>VIEW EXPLORER</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};