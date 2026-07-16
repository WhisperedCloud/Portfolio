export default function NeuralCPU() {
  return (
    <div className="relative w-full max-w-lg aspect-square flex items-center justify-center opacity-80 pointer-events-none">
      {/* Background grids and orbital lines */}
      <div className="absolute inset-0 border border-white/5 rounded-full" />
      <div className="absolute w-[140%] h-[140%] border border-white/5 rounded-full" />
      
      {/* Glowing connection dots */}
      <div className="absolute left-[15%] top-[65%] w-1.5 h-1.5 bg-neon-blue rounded-full shadow-[0_0_15px_#00f0a8]" />
      <div className="absolute right-[20%] top-[30%] w-1.5 h-1.5 bg-neon-blue rounded-full shadow-[0_0_15px_#00f0a8]" />

      {/* Main CPU Body */}
      <div className="relative w-48 h-48 md:w-64 md:h-64 border-2 border-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm bg-neon-blue/5 shadow-[0_0_60px_rgba(0,240,168,0.1)]">
        
        {/* Inner Core */}
        <div className="w-16 h-16 md:w-24 md:h-24 border border-neon-blue/50 rounded-lg flex items-center justify-center relative bg-neon-blue/10 shadow-[inset_0_0_20px_rgba(0,240,168,0.2)]">
          <div className="w-full h-full border border-neon-blue rounded-lg animate-pulse" />
        </div>

        {/* Top Pins */}
        <div className="absolute -top-4 left-1/4 w-0.5 h-4 bg-white/40" />
        <div className="absolute -top-4 left-2/4 w-0.5 h-4 bg-white/40" />
        <div className="absolute -top-4 left-3/4 w-0.5 h-4 bg-white/40" />

        {/* Bottom Pins */}
        <div className="absolute -bottom-4 left-1/4 w-0.5 h-4 bg-white/40" />
        <div className="absolute -bottom-4 left-2/4 w-0.5 h-4 bg-white/40" />
        <div className="absolute -bottom-4 left-3/4 w-0.5 h-4 bg-white/40" />

        {/* Left Pins */}
        <div className="absolute -left-4 top-1/4 w-4 h-0.5 bg-white/40" />
        <div className="absolute -left-4 top-2/4 w-4 h-0.5 bg-white/40" />
        <div className="absolute -left-8 top-3/4 w-8 h-0.5 bg-neon-blue shadow-[0_0_10px_#00f0a8]" />

        {/* Right Pins */}
        <div className="absolute -right-4 top-1/4 w-4 h-0.5 bg-white/40" />
        <div className="absolute -right-4 top-2/4 w-4 h-0.5 bg-white/40" />
        <div className="absolute -right-8 top-3/4 w-8 h-0.5 bg-white/40" />

      </div>

      {/* Floating Labels */}
      <div className="absolute top-[10%] left-[45%] flex items-center gap-2 px-3 py-1 rounded border border-white/10 bg-white/5">
        <span className="w-1.5 h-1.5 rounded-full bg-neon-blue" />
        <span className="text-[8px] font-bold tracking-widest text-gray-300">VOICE AGENT</span>
      </div>

      <div className="absolute bottom-[20%] right-[15%] flex items-center gap-2 px-3 py-1 rounded border border-white/10 bg-white/5">
        <span className="w-1.5 h-1.5 rounded-full bg-neon-blue" />
        <span className="text-[8px] font-bold tracking-widest text-gray-300">REAL-TIME AI</span>
      </div>

    </div>
  );
}
