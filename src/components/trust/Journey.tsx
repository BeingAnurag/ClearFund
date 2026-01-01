export const Journey = () => {
  const steps = [
    { step: "1", title: "Campaign Creation", desc: "Creator submits proposal with milestones. Identity is linked to a Soulbound Token.", active: false },
    { step: "2", title: "Community Verification", desc: "Validators review the proposal. 70% consensus required for approval.", active: false },
    { step: "3", title: "Secure Donation", desc: "Funds are locked in a Smart Contract Vault, not the creator's wallet.", active: true },
    { step: "4", title: "Milestone-Based Release", desc: "Funds are released in tranches only after proof of work is submitted and verified.", active: false },
  ];

  return (
    <section className="bg-[#0D1117] border-y border-white/5 py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-white">The Journey of a <br />Verified Dollar</h2>
          <p className="text-slate-400 text-lg">See exactly how ClearFund ensures your contribution makes a real impact. No black boxes, just clear, verifiable code.</p>
          
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-6 rounded-2xl bg-[#131823] border border-white/5">
              <div className="text-3xl font-bold text-teal-400 mb-1">0%</div>
              <div className="text-sm text-slate-500 font-medium">Fraud Rate</div>
            </div>
            <div className="p-6 rounded-2xl bg-[#131823] border border-white/5">
              <div className="text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-sm text-slate-500 font-medium">Traceability</div>
            </div>
          </div>
        </div>

        <div className="relative space-y-10 pl-8 lg:pl-12 border-l border-white/10">
          {steps.map((item, i) => (
            <div key={i} className="relative group">
              <span className={`absolute -left-[49px] lg:-left-[65px] top-1 w-8 h-8 rounded-full border-4 border-[#0D1117] flex items-center justify-center text-xs font-bold transition-all duration-300
                ${item.active ? 'bg-teal-500 text-black shadow-[0_0_20px_rgba(20,184,166,0.4)] scale-110' : 'bg-slate-800 text-slate-500 group-hover:bg-slate-700'}`}>
                {item.active ? '' : item.step}
              </span>
              <h4 className={`text-xl font-bold mb-2 ${item.active ? 'text-white' : 'text-slate-300'}`}>{item.title}</h4>
              <p className="text-slate-400 leading-relaxed max-w-md">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};