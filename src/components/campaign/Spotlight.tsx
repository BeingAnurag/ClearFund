'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { SPOTLIGHT_DATA, CategoryType } from '../../data/campaigns';

export const Spotlight = () => {
  const [activeTab, setActiveTab] = useState<CategoryType>('Verified');
  
  // Select data based on active tab
  const campaign = SPOTLIGHT_DATA[activeTab];
  
  // Calculate percentage for progress bar
  const percentage = Math.min((campaign.raised / campaign.target) * 100, 100);

  const tabs: CategoryType[] = ['Verified', 'Trending', 'Ending Soon'];

  return (
    <section className="max-w-7xl mx-auto px-6 pb-24">
      {/* Header & Filter Tabs */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <h2 className="text-2xl font-bold text-white">Campaign Spotlight</h2>
        
        <div className="flex gap-1 bg-[#131823] p-1 rounded-lg border border-white/5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20 shadow-[0_0_10px_rgba(20,184,166,0.1)]'
                  : 'text-slate-500 hover:text-white border border-transparent'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-[#131823] border border-white/5 rounded-2xl overflow-hidden flex flex-col md:flex-row group shadow-2xl shadow-black/40">
        
        {/* Dynamic Image Section */}
        <div className="md:w-1/2 min-h-[300px] md:h-auto bg-slate-800 relative overflow-hidden">
          {/* Using inline style for dynamic background image to avoid huge Tailwind class lists */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out"
            style={{ backgroundImage: `url('${campaign.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131823] to-transparent opacity-60" />
          
          <div className="absolute top-6 left-6 px-3 py-1 bg-teal-500 text-black text-xs font-bold rounded shadow-lg shadow-teal-500/20 uppercase tracking-wide">
            Featured {activeTab}
          </div>
        </div>
        
        {/* Content Section */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <h3 className="text-3xl font-bold text-white mb-3 leading-tight">{campaign.title}</h3>
            <p className="text-slate-400 leading-relaxed">
              {campaign.description}
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {/* Funding Stats */}
            <div className="flex justify-between text-sm">
              <span className="font-bold text-white text-lg">
                ${campaign.raised.toLocaleString('en-US')} <span className="text-slate-500 text-sm font-normal">raised</span>
              </span>
              <span className="text-slate-500 font-medium">of ${campaign.target.toLocaleString()}</span>
            </div>
            
            {/* Progress Bar */}
            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-teal-500 rounded-full shadow-[0_0_15px_rgba(20,184,166,0.5)] transition-all duration-700 ease-out" 
                style={{ width: `${percentage}%` }}
              />
            </div>
            
            {/* Meta Data */}
            <div className="flex gap-6 text-xs text-slate-500 mt-2 font-mono">
              <span className="flex items-center gap-1">
                <span className="text-white font-bold">{campaign.donors.toLocaleString()}</span> Donors
              </span>
              <span className="flex items-center gap-1">
                <span className={`${campaign.daysLeft < 5 ? 'text-orange-400' : 'text-white'} font-bold`}>
                  {campaign.daysLeft} Days
                </span> Left
              </span>
            </div>
          </div>

          <div className="flex gap-4">
           
            <Link 
              href={`/campaigns/${campaign.id}`} 
              className="flex-1 py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors shadow-lg shadow-white/5 text-center flex items-center justify-center"
            >
              Donate Now
            </Link>
            
            
            <Link 
              href={`/campaigns/${campaign.id}`} 
              className="flex-1 py-4 border border-white/10 text-white font-medium rounded-xl hover:bg-white/5 transition-colors text-center flex items-center justify-center"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};