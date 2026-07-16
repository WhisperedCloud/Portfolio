'use client';

import { useState } from 'react';
import { Send, User, Radio, Terminal } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, subject: 'New Transmission from Neural Portfolio' })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto relative group mt-12">
      {/* Massive Brackets Container */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-neon-blue/50 rounded-tl-xl transition-all duration-500 group-hover:border-neon-blue group-hover:shadow-[-5px_-5px_15px_rgba(0,240,168,0.2)]" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-neon-blue/50 rounded-tr-xl transition-all duration-500 group-hover:border-neon-blue group-hover:shadow-[5px_-5px_15px_rgba(0,240,168,0.2)]" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-neon-blue/50 rounded-bl-xl transition-all duration-500 group-hover:border-neon-blue group-hover:shadow-[-5px_5px_15px_rgba(0,240,168,0.2)]" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-neon-blue/50 rounded-br-xl transition-all duration-500 group-hover:border-neon-blue group-hover:shadow-[5px_5px_15px_rgba(0,240,168,0.2)]" />

      <form 
        onSubmit={handleSubmit} 
        className="glass-panel p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden backdrop-blur-xl bg-dark-bg/60"
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 grid md:grid-cols-2 gap-8 mb-8">
          {/* Identity Field */}
          <div className="space-y-2">
            <label htmlFor="name" className="flex items-center gap-2 text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase">
              <User size={12} /> Identity
            </label>
            <input
              type="text" id="name" required
              value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-neon-blue/50 focus:bg-neon-blue/5 transition-all text-sm tracking-wider"
              placeholder="E.g. Elon Tusk"
            />
          </div>

          {/* Frequency Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="flex items-center gap-2 text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase">
              <Radio size={12} /> Frequency
            </label>
            <input
              type="email" id="email" required
              value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-neon-blue/50 focus:bg-neon-blue/5 transition-all text-sm tracking-wider"
              placeholder="elon@mars.com"
            />
          </div>
        </div>

        {/* Transmission Field */}
        <div className="space-y-2 mb-10 relative z-10">
          <label htmlFor="message" className="flex items-center gap-2 text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase">
            <Terminal size={12} /> Transmission
          </label>
          <textarea
            id="message" required rows={5}
            value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-neon-blue/50 focus:bg-neon-blue/5 transition-all text-sm tracking-wider resize-none"
            placeholder="Briefly describe your vision..."
          />
        </div>

        {/* Submit Area */}
        <div className="flex flex-col items-center justify-center relative z-10">
          <button
            type="submit" disabled={status === 'loading'}
            className="group relative px-10 py-4 rounded-full bg-dark-bg border border-neon-blue/30 overflow-hidden disabled:opacity-50 transition-all hover:scale-105"
          >
            <div className="absolute inset-0 bg-neon-blue/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <div className="relative flex items-center gap-3">
              <Send size={16} className="text-neon-blue group-hover:rotate-12 transition-transform" />
              <span className="font-bold text-xs tracking-widest text-white uppercase group-hover:text-neon-blue transition-colors">
                {status === 'loading' ? 'Transmitting...' : status === 'success' ? 'Transmission Sent' : 'Initiate Transmission'}
              </span>
            </div>
          </button>
          
          <p className="mt-6 text-[8px] font-bold text-gray-600 tracking-[0.3em] uppercase flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-gray-600" /> 
            Encrypted via RSA-4096 Protocol
          </p>
        </div>
      </form>
    </div>
  );
}
