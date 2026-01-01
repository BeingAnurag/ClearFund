'use client'

import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import Link from 'next/link';
import { ArrowLeft, ShieldAlert, Scale, FileText, Lock, Eye, AlertTriangle } from 'lucide-react';

export default function Compliance() {
  return (
    <div className="min-h-screen bg-[#0B0F14] text-slate-300 selection:bg-teal-500/30 font-sans">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        {/* Navigation */}
        <Link href="/" className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors mb-8 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* 1. Header */}
        <div className="border-b border-white/10 pb-8 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Compliance & Transparency
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
            ClearFund is engineered to maximize accountability through cryptographic verification. This document outlines our operational standards, custody models, and regulatory stance.
          </p>
        </div>

        {/* Content Blocks */}
        <div className="space-y-16">

          {/* 2. Platform Scope */}
          <section className="grid md:grid-cols-[250px_1fr] gap-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-teal-500" />
              Platform Scope
            </h2>
            <div className="space-y-4">
              <p className="leading-relaxed">
                ClearFund operates as a <strong>decentralized coordination protocol</strong>. We provide the software infrastructure—specifically web interfaces and smart contract factories—that allows users to create and fund campaigns.
              </p>
              <div className="bg-slate-900/50 border border-white/5 p-4 rounded-lg text-sm">
                <p>
                  <strong>Non-Custodial Nature:</strong> ClearFund does not take possession of, hold, or manage user funds at any point. All assets are transmitted directly between user wallets and the campaign-specific smart contracts deployed on the Ethereum blockchain.
                </p>
              </div>
            </div>
          </section>

          {/* 3. Identity & Verification */}
          <section className="grid md:grid-cols-[250px_1fr] gap-6 border-t border-white/5 pt-12">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-teal-500" />
              Identity Verification
            </h2>
            <div className="space-y-4">
              <p className="leading-relaxed">
                We employ a <strong>Soulbound Token (SBT)</strong> mechanism to establish verifiable, on-chain reputation.
              </p>
              <ul className="list-disc pl-5 space-y-2 marker:text-teal-500/50">
                <li>
                  <strong>One-Identity-Per-Creator:</strong> Creators must undergo identity verification to mint a unique SBT. This prevents Sybil attacks and ensures that reputation is tied to a verified entity.
                </li>
                <li>
                  <strong>Non-Transferability:</strong> The Verification SBT cannot be traded, sold, or transferred between wallets, ensuring that a campaign's trust score is permanently linked to the original creator.
                </li>
              </ul>
            </div>
          </section>

          {/* 4. Fund Custody & Escrow */}
          <section className="grid md:grid-cols-[250px_1fr] gap-6 border-t border-white/5 pt-12">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-teal-500" />
              Custody & Escrow
            </h2>
            <div className="space-y-4">
              <p className="leading-relaxed">
                To mitigate the risk of misappropriation, ClearFund utilizes <strong>smart contract escrow vaults</strong>.
              </p>
              <ul className="list-disc pl-5 space-y-2 marker:text-teal-500/50">
                <li>
                  <strong>Programmatic Locking:</strong> Donations are not sent to the creator's personal wallet. Instead, they are deposited into an immutable smart contract vault.
                </li>
                <li>
                  <strong>Milestone-Based Release:</strong> Funds are released in tranches. Creators must submit proof of work for specific milestones, which triggers the release of funds only upon validation (automated or community-based).
                </li>
              </ul>
            </div>
          </section>

          {/* 5. Audits & Transparency */}
          <section className="grid md:grid-cols-[250px_1fr] gap-6 border-t border-white/5 pt-12">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-teal-500" />
              Audits & Visibility
            </h2>
            <div className="space-y-4">
              <p className="leading-relaxed">
                ClearFund enforces a policy of <strong>radical transparency</strong>.
              </p>
              <ul className="list-disc pl-5 space-y-2 marker:text-teal-500/50">
                <li>
                  <strong>On-Chain Traceability:</strong> Every donation, withdrawal, and milestone verification is a public transaction on the Ethereum blockchain.
                </li>
                <li>
                  <strong>Real-Time Auditing:</strong> Our interface integrates directly with block explorers, allowing donors to verify the movement of funds independently of our UI.
                </li>
              </ul>
            </div>
          </section>

          {/* 6. Fraud Prevention */}
          <section className="grid md:grid-cols-[250px_1fr] gap-6 border-t border-white/5 pt-12">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-teal-500" />
              Fraud Prevention
            </h2>
            <div className="space-y-4">
              <p className="leading-relaxed">
                We utilize a combination of algorithmic monitoring and community governance to detect abuse.
              </p>
              <ul className="list-disc pl-5 space-y-2 marker:text-teal-500/50">
                <li>
                  <strong>Community Thresholds:</strong> Campaigns flagged by a significant percentage of verified donors are automatically paused pending review.
                </li>
                <li>
                  <strong>Freezing Capabilities:</strong> While we cannot seize funds, the smart contract architecture allows for the pausing of withdrawals in the event of confirmed security breaches or fraud reports.
                </li>
              </ul>
            </div>
          </section>

          {/* 7. Regulatory Disclaimer */}
          <section className="grid md:grid-cols-[250px_1fr] gap-6 border-t border-white/5 pt-12">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-500" />
              Regulatory Status
            </h2>
            <div className="space-y-4">
              <div className="p-5 bg-amber-900/10 border border-amber-500/20 rounded-lg text-sm text-amber-200/80">
                <p className="font-bold text-amber-100 mb-2">Not a Financial Institution</p>
                <p>
                  ClearFund is not a bank, money transmitter, or registered financial institution. We provide software tools. Users are solely responsible for compliance with their local laws, including tax obligations and fundraising regulations.
                </p>
              </div>
              <p className="leading-relaxed text-sm">
                <strong>Smart Contract Risk:</strong> While our contracts undergo security audits, users acknowledge that blockchain software involves inherent risks, including potential code vulnerabilities.
              </p>
            </div>
          </section>

          {/* 8. Data & Privacy */}
          <section className="grid md:grid-cols-[250px_1fr] gap-6 border-t border-white/5 pt-12">
            <h2 className="text-xl font-bold text-white">Data Privacy</h2>
            <div className="space-y-4">
              <p className="leading-relaxed">
                We adhere to a data minimization policy.
              </p>
              <ul className="list-disc pl-5 space-y-2 marker:text-teal-500/50">
                <li>
                  <strong>Wallet-First Access:</strong> Authentication is handled via Web3 wallets. We do not require passwords or store sensitive credentials.
                </li>
                <li>
                  <strong>No Data Sales:</strong> ClearFund does not sell, rent, or trade user data to third parties.
                </li>
              </ul>
            </div>
          </section>

          {/* 9. Reporting */}
          <section className="grid md:grid-cols-[250px_1fr] gap-6 border-t border-white/5 pt-12 pb-12">
            <h2 className="text-xl font-bold text-white">Reporting</h2>
            <div className="space-y-4">
              <p className="leading-relaxed">
                To report suspicious campaigns, security vulnerabilities, or compliance concerns, please contact our security team immediately.
              </p>
              <a href="mailto:security@clearfund.com" className="inline-block text-teal-400 font-mono hover:text-teal-300 transition-colors border-b border-teal-500/30">
                security@clearfund.com
              </a>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}