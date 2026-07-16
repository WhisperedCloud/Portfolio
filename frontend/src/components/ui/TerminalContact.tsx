'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

export default function TerminalContact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, subject: 'New Inquiry' })
      });
      if (response.ok) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="w-full bg-white border-b-2 border-black py-32 px-6 md:px-12 max-w-[2000px] mx-auto">
      
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 max-w-7xl mx-auto items-start">
        
        {/* Left Side: Massive Typography */}
        <div className="w-full lg:w-1/2 flex flex-col">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-0.5 bg-red-600" />
                <p className="text-black text-[10px] font-bold tracking-[0.4em] uppercase">Inquiries</p>
            </div>
            
            <h2 className="text-6xl md:text-8xl lg:text-[9rem] font-black text-black tracking-tighter uppercase font-(family-name:--font-playfair) leading-[0.8] mb-8">
                Let's<br/>Talk.
                <motion.span 
                    animate={{ opacity: [1, 1, 0, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.8, times: [0, 0.5, 0.5, 1] }} 
                    className="inline-block w-[0.4em] h-[0.8em] bg-red-600 ml-2 -mb-2 align-baseline"
                />
            </h2>
            
            <p className="text-black text-sm md:text-base font-medium leading-relaxed max-w-md text-justify mb-12">
                Whether you're looking to build a scalable full-stack platform, integrate cutting-edge AI into your workflow, or just say hello—drop a message.
            </p>

            <div className="flex flex-col gap-4">
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/50">Direct Contact</p>
                <a href="mailto:meswar811@gmail.com" className="text-2xl md:text-4xl font-black text-black tracking-tighter font-(family-name:--font-playfair) hover:text-red-600 transition-colors w-max">
                    meswar811@gmail.com
                </a>
            </div>
        </div>

        {/* Right Side: Editorial Form */}
        <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
            {status === 'success' ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col justify-center items-start min-h-100 relative overflow-hidden">
                    
                    {/* Animated Rocket */}
                    <motion.div 
                        initial={{ y: 500, opacity: 0 }}
                        animate={{ y: [400, -800], opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 2.0, ease: "easeIn" }}
                        className="absolute right-[15%] z-0 pointer-events-none"
                    >
                        <Rocket size={320} strokeWidth={1.5} className="text-red-600 -rotate-45 drop-shadow-[0_0_30px_rgba(220,38,38,0.4)]" />
                    </motion.div>

                    <div className="relative z-10">
                        <h3 className="text-4xl md:text-6xl font-black text-black tracking-tighter uppercase font-(family-name:--font-playfair) mb-4">
                            Message<br/>Received.
                        </h3>
                        <p className="text-black text-sm font-medium tracking-widest uppercase">
                            I will get back to you shortly.
                        </p>
                    </div>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-12 w-full">
                    
                    {/* Name Input */}
                    <div className="relative group">
                        <label className="text-[10px] font-bold tracking-[0.3em] uppercase text-black absolute -top-6 left-0 transition-all group-focus-within:text-red-600">
                            01 / Name
                        </label>
                        <input 
                            required
                            type="text" 
                            placeholder="YOUR NAME"
                            className="w-full bg-transparent border-b-4 border-black py-4 text-2xl md:text-4xl font-black text-black placeholder-black/20 outline-none focus:border-red-600 transition-colors font-(family-name:--font-playfair)"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>

                    {/* Email Input */}
                    <div className="relative group mt-4">
                        <label className="text-[10px] font-bold tracking-[0.3em] uppercase text-black absolute -top-6 left-0 transition-all group-focus-within:text-red-600">
                            02 / Email
                        </label>
                        <input 
                            required
                            type="email" 
                            placeholder="EMAIL ADDRESS"
                            className="w-full bg-transparent border-b-4 border-black py-4 text-2xl md:text-4xl font-black text-black placeholder-black/20 outline-none focus:border-red-600 transition-colors font-(family-name:--font-playfair)"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>

                    {/* Message Input */}
                    <div className="relative group mt-4">
                        <label className="text-[10px] font-bold tracking-[0.3em] uppercase text-black absolute -top-6 left-0 transition-all group-focus-within:text-red-600">
                            03 / Message
                        </label>
                        <textarea 
                            required
                            rows={3}
                            placeholder="PROJECT DETAILS..."
                            className="w-full bg-transparent border-b-4 border-black py-4 text-2xl md:text-4xl font-black text-black placeholder-black/20 outline-none focus:border-red-600 transition-colors resize-none font-(family-name:--font-playfair)"
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                        />
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        disabled={status === 'submitting'}
                        className="mt-8 px-12 py-8 bg-black text-white text-sm md:text-base font-bold tracking-[0.4em] uppercase hover:bg-red-600 transition-colors disabled:opacity-50 w-full md:w-auto self-start"
                    >
                        {status === 'submitting' ? 'Transmitting...' : 'Send Message'}
                    </button>

                    {status === 'error' && (
                        <p className="text-red-600 text-xs font-bold tracking-widest uppercase mt-4">
                            Error sending message. Please try again or use the email above.
                        </p>
                    )}

                </form>
            )}
        </div>

      </div>
    </section>
  );
}
