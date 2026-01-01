export const Spotlight = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-24">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">Campaign Spotlight</h2>
        <div className="flex gap-1 bg-[#131823] p-1 rounded-lg border border-white/5">
          <button className="px-4 py-1.5 rounded-md bg-teal-500/10 text-teal-400 text-sm font-medium border border-teal-500/20 shadow-[0_0_10px_rgba(20,184,166,0.1)]">Verified</button>
          <button className="px-4 py-1.5 rounded-md text-slate-500 hover:text-white text-sm font-medium transition-colors">Trending</button>
          <button className="px-4 py-1.5 rounded-md text-slate-500 hover:text-white text-sm font-medium transition-colors">Ending Soon</button>
        </div>
      </div>

      <div className="bg-[#131823] border border-white/5 rounded-2xl overflow-hidden flex flex-col md:flex-row group">
         {/* Image Mockup */}
         <div className="md:w-1/2 min-h-[300px] md:h-auto bg-slate-800 relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#131823] to-transparent opacity-60" />
           <div className="absolute top-6 left-6 px-3 py-1 bg-teal-500 text-black text-xs font-bold rounded shadow-lg shadow-teal-500/20">Featured Verified</div>
         </div>
         
         <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
           <div className="mb-6">
             <h3 className="text-3xl font-bold text-white mb-3">Ocean Cleanup: Phase 4</h3>
             <p className="text-slate-400 leading-relaxed">Deploying autonomous cleaning arrays in the Great Pacific Garbage Patch. 100% of funds are traceable to hardware procurement.</p>
           </div>

           <div className="space-y-3 mb-8">
             <div className="flex justify-between text-sm">
               <span className="font-bold text-white text-lg">$1,250,000 <span className="text-slate-500 text-sm font-normal">raised</span></span>
               <span className="text-slate-500 font-medium">of $2,000,000</span>
             </div>
             <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
               <div className="h-full bg-teal-500 w-[62%] rounded-full shadow-[0_0_15px_rgba(20,184,166,0.5)]" />
             </div>
             <div className="flex gap-6 text-xs text-slate-500 mt-2 font-mono">
               <span className="flex items-center gap-1"><span className="text-white font-bold">3,420</span> Donors</span>
               <span className="flex items-center gap-1"><span className="text-white font-bold">12 Days</span> Left</span>
             </div>
           </div>

           <div className="flex gap-4">
             <button className="flex-1 py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors shadow-lg shadow-white/5">Donate Now</button>
             <button className="flex-1 py-4 border border-white/10 text-white font-medium rounded-xl hover:bg-white/5 transition-colors">View Details</button>
           </div>
         </div>
      </div>
    </section>
  );
};