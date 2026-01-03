'use client';

import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Wallet, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

import { supabase } from '../../lib/supabase';
import { useAccount, useConnect, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { ESCROW_ABI } from '../../lib/contracts';


interface Campaign {
  id?: number | string;
  title: string;
  contractAddress?: string;
}

interface DonateModalProps {
  campaign: Campaign;
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'INPUT' | 'CONFIRM' | 'SUCCESS';

export const DonateModal = ({ campaign, isOpen, onClose }: DonateModalProps) => {
  
  const { address: userAddress, isConnected } = useAccount();
  const { connectors, connect } = useConnect();

  const { 
    data: hash, 
    error: writeError, 
    writeContract, 
    isPending: isWalletLoading 
  } = useWriteContract();

  const { 
    isLoading: isConfirming, 
    isSuccess: isConfirmed 
  } = useWaitForTransactionReceipt({ 
    hash 
  });

  const [amount, setAmount] = useState('');
  const [step, setStep] = useState<Step>('INPUT');

  
  useEffect(() => {
    if (isConfirmed && hash) {
      setStep('SUCCESS');
      
      const saveDonation = async () => {
        if (!userAddress || !campaign.contractAddress) return;

        try {
          
          let dbCampaignId = null;
          
          const { data: campaignData } = await supabase
            .from('campaigns')
            .select('id')
            .eq('contract_address', campaign.contractAddress)
            .single();

          if (campaignData) {
             dbCampaignId = campaignData.id;
          }

          
          const { error } = await supabase
            .from('donations')
            .insert({
              amount_eth: amount,
              campaign_id: dbCampaignId, 
              campaign_title: campaign.title,
              donor_wallet: userAddress, 
              transaction_hash: hash
            });
            
          if (error) console.error("Supabase Error:", error);
          else console.log("✅ Donation saved to history");

        } catch (err) {
          console.error("Save failed:", err);
        }
      };

      saveDonation();
    }
  }, [isConfirmed, hash, amount, campaign, userAddress]);

  if (!isOpen) return null;

  // Handlers
  const handleConnect = () => {
    const connector = connectors[0];
    if (connector) connect({ connector });
  };

  const handleReviewClick = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setStep('CONFIRM');
  };

  const handleConfirmTransaction = () => {
    if (!campaign.contractAddress) {
      console.error("No contract address found");
      return;
    }

    writeContract({
      address: campaign.contractAddress as `0x${string}`,
      abi: ESCROW_ABI,
      functionName: 'contribute',
      value: parseEther(amount),
    });
  };

  const handleClose = () => {
    setStep('INPUT');
    setAmount('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={handleClose}
      />

      <div className="relative w-full max-w-md bg-[#131823] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h3 className="text-lg font-bold text-white">Back this Project</h3>
          <button onClick={handleClose} className="text-slate-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!isConnected ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-teal-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-8 h-8 text-teal-500" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Connect Wallet</h4>
              <p className="text-slate-400 mb-6 text-sm">You need to connect a Web3 wallet to securely transfer funds.</p>
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
                onClick={handleReviewClick}
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
                  <span className="text-teal-400 font-mono truncate w-32 md:w-auto">
                    {campaign.contractAddress || "0x..."}
                  </span>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-white">{amount} ETH</span>
                </div>
              </div>

              {writeError && (
                <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg flex gap-3 text-red-400 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <p>{writeError.message.split('\n')[0]}</p>
                </div>
              )}

              <button 
                onClick={handleConfirmTransaction}
                disabled={isWalletLoading || isConfirming}
                className="w-full py-4 bg-teal-500 text-black font-bold rounded-xl hover:bg-teal-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isWalletLoading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Check Wallet...</>
                ) : isConfirming ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
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
                <a 
                  href={`https://sepolia.etherscan.io/tx/${hash}`}
                  target="_blank"
                  rel="noreferrer" 
                  className="text-teal-400 font-mono hover:underline"
                >
                  {hash?.slice(0, 10)}...{hash?.slice(-8)}
                </a>
              </div>

              <button 
                onClick={handleClose}
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