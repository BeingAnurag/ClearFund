export const ReadyToBuild = () => {
  return (
    <section className="max-w-4xl mx-auto px-6 py-32 text-center space-y-8">
      <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
        Ready to Build Trust?
      </h2>
      <p className="text-slate-400 text-lg max-w-2xl mx-auto">
        Join the thousands of creators and donors who demand a transparency standard.
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
        {/* FIX: Ensure className is a continuous string without internal \r\n line breaks */}
        <button className="px-10 py-4 bg-white text-black font-bold rounded-full transition-all duration-300 ease-out hover:bg-teal-50 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-95 shadow-xl shadow-white/10">
          Start a Verified Campaign
        </button>

        <button className="px-10 py-4 border border-white/10 text-slate-300 font-medium rounded-full transition-all duration-300 ease-in-out hover:border-teal-500/50 hover:text-white hover:bg-white/5 hover:scale-105 active:scale-95">
          Explore Documentation
        </button>
      </div>
    </section>
  );
};