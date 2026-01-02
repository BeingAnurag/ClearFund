'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, Wallet, Loader2, CheckCircle2 } from 'lucide-react';
import { useAccount, useConnect } from 'wagmi';
import { Campaign } from '../../data/campaigns';

interface DonateModalProps {
  campaign: Campaign;
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'INPUT' | 'CONFIRM' | 'SUCCESS';

export const DonateModal = ({ campaign, isOpen, onClose }: DonateModalProps) => {
  const { isConnected } = useAccount();
  
  const { connectors, connect } = useConnect(); 

  const [amount, setAmount] = useState('');
  const [step, setStep] = useState<Step>('INPUT');
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState('');

  if (!isOpen) return null;

  const handleConnect = () => {
    // Basic connection trigger - usually calls the first connector (MetaMask/Injected)
    const connector = connectors[0];
    if (connector) connect({ connector });
  };

  const handleDonate = () => {
    setStep('CONFIRM');
  };

  const confirmTransaction = () => {
    setIsLoading(true);
    // Simulate Blockchain Transaction
    setTimeout(() => {
      setTxHash('0x71c...9a21'); // Mock Hash
      setIsLoading(false);
      setStep('SUCCESS');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-[#131823] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h3 className="text-lg font-bold text-white">Back this Project</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {!isConnected ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-teal-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-8 h-8 text-teal-500" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Connect Wallet</h4>
              <p className="text-slate-400 mb-6 text-sm">You need to connect a Web3 wallet to securely transfer funds to the escrow contract.</p>
              <button 
                onClick={handleConnect}
                className="w-full py-3 bg-teal-500 text-black font-bold rounded-xl hover:bg-teal-400 transition-colors"
              >
                Connect Wallet
              </button>
            </div>
          ) : step === 'INPUT' ? (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Donation Amount (ETH)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-[#0B0F14] border border-white/10 rounded-xl px-4 py-4 text-2xl text-white font-mono focus:outline-none focus:border-teal-500/50"
                    autoFocus
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">ETH</span>
                </div>
              </div>

              <div className="bg-amber-900/10 border border-amber-500/20 rounded-lg p-4 flex gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0" />
                <p className="text-xs text-amber-200/80 leading-relaxed">
                  Funds are held in a <strong>Smart Contract Escrow</strong>. The creator cannot withdraw until they verify milestones.
                </p>
              </div>

              <button 
                onClick={handleDonate}
                disabled={!amount || parseFloat(amount) <= 0}
                className="w-full py-4 bg-teal-500 text-black font-bold rounded-xl hover:bg-teal-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Review Contribution
              </button>
            </div>
          ) : step === 'CONFIRM' ? (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Campaign</span>
                  <span className="text-white font-medium text-right truncate max-w-[200px]">{campaign.title}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Escrow Contract</span>
                  <span className="text-teal-400 font-mono">{campaign.contractAddress}</span>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-white">{amount} ETH</span>
                </div>
              </div>

              <button 
                onClick={confirmTransaction}
                disabled={isLoading}
                className="w-full py-4 bg-teal-500 text-black font-bold rounded-xl hover:bg-teal-400 transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                  </>
                ) : (
                  'Confirm & Donate'
                )}
              </button>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">Donation Verified!</h4>
              <p className="text-slate-400 mb-6 text-sm">Your funds have been securely locked in the escrow contract.</p>
              
              <div className="bg-[#0B0F14] rounded-lg p-3 mb-6 flex justify-between items-center text-xs">
                <span className="text-slate-500">Transaction Hash</span>
                <span className="text-teal-400 font-mono">{txHash}</span>
              </div>

              <button 
                onClick={onClose}
                className="w-full py-3 bg-[#131823] border border-white/10 text-white font-bold rounded-xl hover:bg-white/5 transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};