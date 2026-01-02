import Link from 'next/dist/client/link';
import React from 'react';

export const ReadyToBuild = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[800px] h-[500px] bg-teal-900/30 rounded-full blur-[120px] opacity-40 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
        <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Ready to Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200">Trust?</span>
        </h2>
        <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Join the thousands of creators and donors who demand a new standard of transparency in crowdfunding.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
          
          <Link 
            href="/campaigns/new" className="px-10 py-4 bg-white text-black font-bold rounded-full transition-all duration-300 ease-out hover:bg-teal-500 hover:text-white hover:scale-105 hover:shadow-[0_0_40px_rgba(20,184,166,0.4)] active:scale-95 shadow-xl shadow-white/5">
            Start a Verified Campaign
          </Link>

        
          <Link 
            href="/about" className="px-10 py-4 border border-white/10 text-slate-300 font-medium rounded-full transition-all duration-300 ease-in-out hover:border-teal-500 hover:text-teal-400 hover:bg-teal-500/10 hover:scale-105 active:scale-95">
            Explore Documentation
          </Link>
        </div>
      </div>
    </section>
  );
};