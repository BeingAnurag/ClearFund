'use client';

import React from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Loader2, Coins, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { ESCROW_ABI } from '../../lib/contracts';

interface CreatorPanelProps {
  contractAddress: string;
  isGoalMet: boolean;
}

export const CreatorPanel = ({ contractAddress, isGoalMet }: CreatorPanelProps) => {
  const { data: hash, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const handleWithdraw = () => {
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: ESCROW_ABI,
      functionName: 'withdraw',
    });
  };

  if (isSuccess) {
    return (
      <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-2xl mb-8 flex items-center gap-4 animate-in fade-in slide-in-from-top-4">
        <div className="p-3 bg-green-500/20 rounded-full">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-green-400">Withdrawal Successful!</h3>
          <p className="text-slate-400 text-sm">The funds have been transferred to your wallet.</p>
          <a 
            href={`https://sepolia.etherscan.io/tx/${hash}`} 
            target="_blank" 
            className="text-teal-400 underline text-xs mt-2 block hover:text-teal-300"
          >
            View on Etherscan
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-[#1A1F2E] to-[#131823] border border-teal-500/30 p-6 rounded-2xl mb-8 relative overflow-hidden shadow-2xl shadow-teal-900/20">
      {/* Badge */}
      <div className="absolute top-0 right-0 bg-teal-500 text-black text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
        Creator Admin
      </div>

      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="p-4 bg-teal-500/10 rounded-full shrink-0">
           <Coins className="w-8 h-8 text-teal-400" />
        </div>
        <div className="flex-1">
           <h3 className="text-lg font-bold text-white mb-2">Campaign Management</h3>
           <p className="text-sm text-slate-400 mb-6 leading-relaxed">
             {isGoalMet 
               ? "🎉 Congratulations! You have hit your target. You are now authorized to withdraw the escrowed funds to your wallet."
               : "Funds are currently locked in escrow. You can withdraw them once the 100% funding target is reached."
             }
           </p>

           <div className="flex flex-wrap items-center gap-4">
             <button
               onClick={handleWithdraw}
               disabled={!isGoalMet || isPending || isConfirming}
               className="px-6 py-3 bg-teal-500 text-black font-bold rounded-xl hover:bg-teal-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-teal-500/20"
             >
               {isPending || isConfirming ? (
                 <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
               ) : (
                 "Withdraw Funds"
               )}
             </button>
             
             {!isGoalMet && (
               <div className="flex items-center gap-2 text-amber-500 text-xs bg-amber-500/10 px-3 py-2 rounded-lg border border-amber-500/20">
                 <AlertTriangle className="w-3 h-3" /> Target not yet reached
               </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
};