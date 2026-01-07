import { CountUp } from '../../components/ui/CountUp';

export const Metrics = () => {
  return (
    <section className="border-y border-white/5 bg-[#0B0F14]">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Stat 1: Total Value Locked */}
        <div>
          <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Total Value Locked</h3>
          <div className="text-4xl font-bold text-white mb-2">
            <CountUp end={42.8} decimals={1} prefix="$" suffix="M" />
          </div>
          <div className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded inline-block">
            +12% this month
          </div>
        </div>

        {/* Stat 2: Verified Campaigns */}
        <div>
          <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Verified Campaigns</h3>
          <div className="text-4xl font-bold text-white mb-2">
            <CountUp end={1240} duration={2500} />
          </div>
          <div className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded inline-block">
            +8% this month
          </div>
        </div>

        {/* Stat 3: Unique Donors */}
        <div>
          <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Unique Donors</h3>
          <div className="text-4xl font-bold text-white mb-2">
            <CountUp end={85.2} decimals={1} suffix="K" />
          </div>
          <div className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded inline-block">
            +24% this month
          </div>
        </div>

        {/* Stat 4: Successful Audits */}
        <div>
          <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Successful Audits</h3>
          <div className="text-4xl font-bold text-white mb-2">
            <CountUp end={98.5} decimals={1} suffix="%" />
          </div>
          <div className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded inline-block">
            +0.5% this month
          </div>
        </div>
      </div>
    </section>
  );
};