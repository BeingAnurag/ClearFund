export const Metrics = () => {
  const stats = [
    { label: "Total Value Locked", val: "$42.8M", delta: "+12%" },
    { label: "Verified Campaigns", val: "1,240", delta: "+8%" },
    { label: "Unique Donors", val: "85.2K", delta: "+24%" },
    { label: "Successful Audits", val: "98.5%", delta: "+0.5%" },
  ];

  return (
    <section className="border-y border-white/5 bg-[#0B0F14]">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="text-center md:text-left relative after:hidden md:after:block after:absolute after:right-0 after:top-2 after:h-12 after:w-[1px] after:bg-white/5 last:after:hidden">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{stat.label}</p>
            <h3 className="text-3xl font-bold text-white mb-2">{stat.val}</h3>
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20">
              {stat.delta} this month
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};