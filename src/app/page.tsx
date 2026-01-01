'use client'

// 1. IMPORTS (These were missing or incomplete)
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/hero/Hero';
import { Metrics } from '../components/trust/Metrics';
import { TrustFeatures } from '../components/trust/TrustFeatures';
import { Spotlight } from '../components/campaign/Spotlight';
import { Journey } from '../components/trust/Journey';
import { ReadyToBuild } from '../components/cta/ReadyToBuild';
import { Footer } from '../components/layout/Footer'; 

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0F14] text-white selection:bg-teal-500/30">
      {/* 2. Now these components will work because they are imported */}
      <Navbar />
      <Hero />
      <Metrics />
      <TrustFeatures />
      <Spotlight />
      <Journey />
      <ReadyToBuild />
      <Footer />
    </div>
  );
}