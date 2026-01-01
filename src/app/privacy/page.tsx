'use client'

import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-slate-400">Last updated: January 1, 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-12">
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">1. Introduction</h2>
            <p className="leading-relaxed">
              At ClearFund ("we", "our", or "us"), we prioritize transparency and verification. This Privacy Policy explains how we collect, use, and protect your information when you use our decentralized crowdfunding platform. By connecting your wallet or using our services, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">2. Blockchain & Public Data</h2>
            <div className="p-6 bg-teal-900/10 border border-teal-500/20 rounded-xl">
              <p className="text-teal-100 font-medium mb-2">⚠️ Important Note on Web3 Transparency</p>
              <p className="text-sm text-teal-200/70 leading-relaxed">
                ClearFund operates on public blockchains. All transactions, wallet addresses, and smart contract interactions are permanently recorded on the public ledger. This information is publicly accessible and immutable. We cannot modify or delete data written to the blockchain.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">3. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-2 marker:text-teal-500">
              <li><strong className="text-white">Wallet Information:</strong> Your public wallet address and token balances relevant to the platform.</li>
              <li><strong className="text-white">Profile Data:</strong> Information you voluntarily provide (e.g., username, bio, email) if you choose to verify your identity off-chain.</li>
              <li><strong className="text-white">Campaign Data:</strong> Images, descriptions, and milestones submitted for fundraising campaigns.</li>
              <li><strong className="text-white">Usage Data:</strong> Information on how you interact with our UI, such as pages visited and features used.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">4. How We Use Your Information</h2>
            <p className="leading-relaxed">
              We use the collected data for the following purposes:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-teal-500">
              <li>To provide and maintain our Service (e.g., tracking donation progress).</li>
              <li>To verify campaign authenticity via Soulbound Tokens (SBT).</li>
              <li>To detect, prevent, and address technical issues or fraud.</li>
              <li>To comply with legal obligations and regulatory frameworks.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">5. Third-Party Services</h2>
            <p className="leading-relaxed">
              We may employ third-party companies and individuals to facilitate our Service ("Service Providers"), such as:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-teal-500">
              <li><strong className="text-white">IPFS (Pinata):</strong> For decentralized storage of campaign media.</li>
              <li><strong className="text-white">Supabase:</strong> For off-chain database management and authentication.</li>
              <li><strong className="text-white">RPC Providers:</strong> To facilitate communication with the blockchain.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">6. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-teal-500">
              <li>By email: compliance@clearfund.com</li>
              <li>By visiting the <Link href="/about" className="text-teal-400 hover:underline">About page</Link> on our website.</li>
            </ul>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}