'use client'

import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#0B0F14] text-slate-300 selection:bg-teal-500/30">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors mb-8 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-slate-400">Last updated: January 1, 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-12">
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing or using ClearFund ("the Platform"), connecting your digital wallet, or interacting with our smart contracts, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the Service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">2. Nature of Services (Web3 Interface)</h2>
            <p className="leading-relaxed">
              ClearFund is a non-custodial interface that helps users interact with the Ethereum blockchain and associated smart contracts. We do not hold, store, or manage your funds. You understand that:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-teal-500">
              <li>ClearFund is not a bank or financial institution.</li>
              <li>We do not have access to your private keys or wallet funds.</li>
              <li>Transactions are executed directly on-chain and are irreversible.</li>
            </ul>
          </section>

          {/* Niche Specific Warning Box */}
          <section className="space-y-4">
            <div className="p-6 bg-amber-900/10 border border-amber-500/20 rounded-xl flex gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" />
              <div className="space-y-2">
                <h3 className="text-amber-100 font-bold">Risk of Smart Contracts & Volatility</h3>
                <p className="text-sm text-amber-200/70 leading-relaxed">
                  Crowdfunding on the blockchain involves significant risks. The value of cryptocurrencies (ETH, USDC) can be highly volatile. Additionally, while our smart contracts are audited, unforeseen bugs or vulnerabilities may exist. You acknowledge that you use the platform at your own risk.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">3. Campaign Creation & Verification</h2>
            <p className="leading-relaxed">
              Creators must undergo identity verification to mint a "Verified Creator" Soulbound Token (SBT). By creating a campaign, you agree that:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-teal-500">
              <li>All information provided is accurate and truthful.</li>
              <li>Funds will be used strictly for the stated purpose.</li>
              <li>Funds are released based on milestones; failure to provide proof of work may result in remaining funds being returned to donors.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">4. Donations & Refunds</h2>
            <p className="leading-relaxed">
              <strong>All donations are final.</strong> Due to the immutable nature of the blockchain, ClearFund cannot reverse a transaction once it has been confirmed. Refunds are only possible if:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-teal-500">
              <li>The smart contract logic specifically triggers a refund (e.g., campaign fails to reach target).</li>
              <li>The creator voluntarily decides to refund via a new transaction.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">5. Prohibited Activities</h2>
            <p className="leading-relaxed">
              You agree not to use the Platform for:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-teal-500">
              <li>Money laundering, terrorist financing, or other illicit financial activities.</li>
              <li>Promoting hate speech, violence, or illegal goods.</li>
              <li>Attempting to exploit vulnerabilities in the smart contracts or UI.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">6. Limitation of Liability</h2>
            <p className="leading-relaxed">
              To the maximum extent permitted by law, ClearFund shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits or data, resulting from your use of the interface or the underlying blockchain protocol.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">7. Contact & Disputes</h2>
            <p className="leading-relaxed">
              For legal inquiries or to report violations of these terms, please contact:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-teal-500">
              <li>Email: legal@clearfund.com</li>
            </ul>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}