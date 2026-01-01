import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Github, Twitter, Disc, ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#0B0F14] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center border border-teal-500/20">
                <ShieldCheck className="w-5 h-5 text-teal-400" />
              </div>
              <span className="font-bold text-xl text-white">ClearFund</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              The standard for verified, transparent crowdfunding. Built on Ethereum for the future of giving.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-bold text-white mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link href="/campaigns" className="hover:text-teal-400 transition-colors">Browse Campaigns</Link></li>
              <li><Link href="/verification" className="hover:text-teal-400 transition-colors">How Verification Works</Link></li>
              <li><Link href="/audits" className="hover:text-teal-400 transition-colors">Real-Time Audits</Link></li>
              <li><Link href="/submit" className="hover:text-teal-400 transition-colors">Submit a Project</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-bold text-white mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/compliance" className="hover:text-white transition-colors">Compliance</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-bold text-white mb-6">Community</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all">
                <Disc className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">© 2026 ClearFund. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/5 border border-teal-500/10">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </div>
              <span className="text-xs font-medium text-teal-500">Systems Operational</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};