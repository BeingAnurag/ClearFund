import { ShieldCheck, Users, Lock } from 'lucide-react';

export const TrustFeatures = () => {
  const features = [
    { title: "Identity Verification", desc: "Every campaigner identity is verified and minted as a Soulbound Token (SBT), creating a permanent on-chain reputation record.", icon: ShieldCheck },
    { title: "Hybrid Fund Flow", desc: "Smart contracts hold funds in escrow. Release is triggered only when predefined milestones are met and verified by the community.", icon: Users },
    { title: "Real-Time Audits", desc: "Automated auditing tools scan project wallets 24/7. Donors can see exactly where every cent goes via our block explorer integration.", icon: Lock },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 space-y-16">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Trust is the New Standard</h2>
        <p className="text-slate-400 text-lg">We've replaced blind faith with cryptographic verification. ClearFund is built on a foundation of radical transparency.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((card, i) => (
          <div key={i} className="bg-[#131823]/50 backdrop-blur-sm border border-white/5 p-8 rounded-2xl hover:border-teal-500/30 transition-all group hover:-translate-y-1 duration-300">
            <div className="w-14 h-14 rounded-xl bg-teal-900/20 border border-teal-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <card.icon className="w-7 h-7 text-teal-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">{card.title}</h3>
            <p className="text-slate-400 leading-relaxed text-sm">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};