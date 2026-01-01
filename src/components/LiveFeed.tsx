import { Activity, CheckCircle2 } from "lucide-react";

export const LiveFeed = () => {
  return (
    <div className="glass-panel rounded-2xl p-6 w-full max-w-md border border-white/10 bg-surface/50">
      <div className="flex justify-between mb-6">
        <span className="text-xs font-bold tracking-widest text-slate-400 uppercase flex gap-2">
          <Activity className="w-4 h-4 text-primary animate-pulse" /> Live Feed
        </span>
        <span className="text-xs font-mono text-slate-600">Block: #184293</span>
      </div>
      <div className="space-y-3">
        {[1,2,3].map((_, i) => (
          <div key={i} className="flex justify-between p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="flex gap-3">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <div>
                <p className="text-sm font-medium text-slate-200">Donation Verified</p>
                <p className="text-xs text-slate-500">Clean Water Initiative</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-mono text-primary">5.0 ETH</p>
              <p className="text-[10px] text-slate-600">2m ago</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};