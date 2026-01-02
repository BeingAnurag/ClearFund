'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import { 
  ShieldAlert, 
  Wallet, 
  Plus, 
  Trash2, 
  UploadCloud, 
  CheckCircle2, 
  AlertTriangle,
  FileText,
  ChevronRight,
  Info
} from 'lucide-react';

export default function NewCampaignPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Sustainability',
    description: '',
    target: '',
    duration: '30',
  });

  // Milestone State
  const [milestones, setMilestones] = useState([
    { title: 'Initial Mobilization', percent: 20, description: '' }
  ]);

  // Handlers
  const addMilestone = () => {
    setMilestones([...milestones, { title: '', percent: 0, description: '' }]);
  };

  const removeMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo(0, 0);
    }, 1500);
  };

  // --- Success State (Post-Submission) ---
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0B0F14] text-slate-300 font-sans">
        <Navbar />
        <main className="max-w-3xl mx-auto px-6 pt-40 pb-24 text-center">
          <div className="w-20 h-20 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-teal-500/20">
            <CheckCircle2 className="w-10 h-10 text-teal-500" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Submission Under Review</h1>
          <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto">
            Your campaign proposal has been securely logged. Our community validators and compliance engine are now reviewing your milestones and identity verification (SBT).
          </p>
          <div className="bg-[#131823] border border-white/10 rounded-xl p-6 mb-10 max-w-lg mx-auto text-left">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-500">Reference ID</span>
              <span className="font-mono text-white">#CF-2026-8X92</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Est. Review Time</span>
              <span className="text-white">24 - 48 Hours</span>
            </div>
          </div>
          <Link 
            href="/campaigns"
            className="px-8 py-3 bg-teal-500 text-black font-bold rounded-lg hover:bg-teal-400 transition-colors"
          >
            Return to Dashboard
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // --- Form State ---
  return (
    <div className="min-h-screen bg-[#0B0F14] text-slate-300 selection:bg-teal-500/30 font-sans">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        
        {/* 1. Header */}
        <div className="mb-10">
          <div className="inline-flex items-center space-x-2 bg-teal-900/10 border border-teal-500/20 rounded px-3 py-1 mb-6">
            <span className="text-xs font-medium text-teal-400 uppercase tracking-wider">Creator Portal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Start a Verified Campaign</h1>
          <p className="text-lg text-slate-400">
            All campaigns are audited before fundraising begins. Funds are locked in smart contracts and released only upon milestone verification.
          </p>
        </div>

        {/* 2. Verification Notice */}
        <div className="bg-amber-900/10 border border-amber-500/20 rounded-xl p-6 mb-12 flex gap-4">
          <ShieldAlert className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
          <div className="space-y-2">
            <h3 className="text-amber-100 font-bold">Compliance & Accountability Notice</h3>
            <p className="text-sm text-amber-200/70 leading-relaxed">
              By proceeding, you agree to mint a <strong>Soulbound Token (SBT)</strong> linked to your real-world identity. This token is non-transferable. Attempting to defraud donors will result in permanent blacklisting of your wallet and identity hash across the protocol.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          
          {/* 3. Campaign Details */}
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
                  step="0.01"
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

          {/* 4. Milestones */}
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
                    <input 
                      type="text" 
                      placeholder="Milestone Title (e.g. Prototype Complete)"
                      className="bg-[#0B0F14] border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-teal-500/50 focus:outline-none"
                    />
                    <div className="relative">
                      <input 
                        type="number" 
                        placeholder="Fund Release %"
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
                  <textarea 
                    rows={2}
                    placeholder="Proof of work requirements..."
                    className="w-full bg-[#0B0F14] border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-teal-500/50 focus:outline-none resize-none"
                  />
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-blue-900/10 border border-blue-500/20 p-3 rounded-lg">
              <Info className="w-4 h-4 text-blue-400" />
              <span>Total fund release must equal 100%. Current total: <span className="text-white font-mono font-bold">{milestones.reduce((a, b) => a + b.percent, 0)}%</span></span>
            </div>
          </section>

          {/* 5. Identity & Docs */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6">
              <Wallet className="w-5 h-5 text-teal-500" />
              <h2 className="text-xl font-bold text-white">Identity & Verification</h2>
            </div>

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
              <div className="h-8 w-px bg-white/10 hidden md:block"></div>
              <div className="flex items-center gap-4 opacity-50">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                  <ShieldAlert className="w-6 h-6 text-slate-500" />
                </div>
                <div>
                  <h4 className="text-slate-300 font-bold">SBT Not Detected</h4>
                  <p className="text-sm text-slate-500">Will be minted upon approval</p>
                </div>
              </div>
            </div>

            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-teal-500/30 transition-colors cursor-pointer bg-[#131823]/50">
              <UploadCloud className="w-10 h-10 text-slate-500 mx-auto mb-4" />
              <p className="text-white font-medium mb-1">Upload Project Proposal</p>
              <p className="text-sm text-slate-500 mb-4">PDF, DOCX, or Slides (Max 10MB)</p>
              <button type="button" className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-white hover:bg-white/10">
                Browse Files
              </button>
            </div>
          </section>

          {/* 6. Submit */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex items-start gap-3 mb-8">
              <input type="checkbox" required className="mt-1 w-4 h-4 rounded bg-[#131823] border-white/20 text-teal-500 focus:ring-0 focus:ring-offset-0" />
              <p className="text-sm text-slate-400">
                I confirm that all information provided is accurate. I understand that ClearFund is a decentralized protocol and that false claims may lead to the permanent loss of my Verification SBT.
              </p>
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 bg-teal-500 text-black font-bold text-lg rounded-xl hover:bg-teal-400 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Verifying...' : 'Submit Campaign for Verification'}
              {!isSubmitting && <ChevronRight className="w-5 h-5" />}
            </button>
          </div>

        </form>
      </main>

      <Footer />
    </div>
  );
}