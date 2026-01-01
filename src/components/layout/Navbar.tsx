'use client'
import { ShieldCheck, Wallet } from 'lucide-react';
import Link from 'next/link';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { useEffect, useState } from 'react';

export const Navbar = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  
  // Hydration fix state
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0B0E14]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* 1. Left: Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center border border-teal-500/20">
            <ShieldCheck className="w-5 h-5 text-teal-400" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">ClearFund</span>
        </Link>

        {/* 2. Center: Navigation Links (Hidden on mobile) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          {['Campaigns', 'Verification', 'Audits', 'About'].map((item) => (
            <Link 
              key={item} 
              href={`/${item.toLowerCase()}`}
              className="hover:text-white transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>
        
        {/* 3. Right: Wallet Button */}
        <button 
          onClick={() => isConnected ? disconnect() : connect({ connector: injected() })}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-teal-500/30 text-teal-400 hover:bg-teal-500/10 transition-all text-sm font-medium"
        >
          <Wallet className="w-4 h-4" />
          {/* Hydration safe rendering */}
          {mounted && isConnected 
            ? <span className="font-mono">{address?.slice(0,6)}...{address?.slice(-4)}</span> 
            : 'Connect Wallet'
          }
        </button>

      </div>
    </nav>
  );
};