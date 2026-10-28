import React, { useState } from 'react';
import { WordmarkLogo } from '../components/WordmarkLogo';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="relative bg-[#060606] px-6 sm:px-10 lg:px-16 pt-20 pb-12 border-t border-zinc-900 text-zinc-400">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-zinc-850">
          {/* Brand Column */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <WordmarkLogo size="lg" showSubtitle />
            <p className="mt-6 text-sm text-zinc-400 max-w-sm leading-relaxed">
              Pioneering hyper-propulsion racing footwear through computational fluid dynamics, supercritical foaming, and kinetic energy reclamation.
            </p>

            {/* Newsletter Subscription */}
            <form onSubmit={handleSubscribe} className="mt-8 w-full max-w-md">
              <label htmlFor="footer-email" className="block text-xs font-mono uppercase tracking-widest text-zinc-300 mb-2">
                JOIN THE MACH-X PACERS LAB
              </label>
              <div className="flex rounded-full border border-zinc-800 bg-zinc-900/80 p-1.5 focus-within:border-mach-orange transition-colors">
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter athlete email..."
                  required
                  className="w-full bg-transparent px-4 py-2 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="px-5 py-2.5 rounded-full bg-mach-orange text-black font-heading tracking-widest text-base font-bold hover:bg-mach-orange-glow transition-colors shrink-0 flex items-center gap-1"
                >
                  {subscribed ? <Check size={18} /> : <ArrowRight size={18} />}
                </button>
              </div>
              {subscribed && (
                <span className="text-emerald-400 font-mono text-xs mt-2 block animate-fadeIn">
                  ✓ Priority drop access confirmed. Welcome to the lab.
                </span>
              )}
            </form>
          </div>

          {/* Nav Links Column 1 */}
          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="text-xs font-mono tracking-widest text-white uppercase mb-4">
              PROPULSION
            </h4>
            <ul className="space-y-3 text-xs font-mono">
              <li><a href="#story" className="hover:text-mach-orange transition-colors">01. Origin Zero</a></li>
              <li><a href="#story" className="hover:text-mach-orange transition-colors">02. Aeroweave</a></li>
              <li><a href="#features" className="hover:text-mach-orange transition-colors">03. NitroFoam™</a></li>
              <li><a href="#features" className="hover:text-mach-orange transition-colors">04. Carbon Plate</a></li>
              <li><a href="#specs" className="hover:text-mach-orange transition-colors">05. Lab Telemetry</a></li>
            </ul>
          </div>

          {/* Nav Links Column 2 */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono tracking-widest text-white uppercase mb-4">
              EDITIONS
            </h4>
            <ul className="space-y-3 text-xs font-mono">
              <li><a href="#colors" className="hover:text-mach-orange transition-colors">Inferno Orange</a></li>
              <li><a href="#colors" className="hover:text-mach-orange transition-colors">Stealth Onyx</a></li>
              <li><a href="#colors" className="hover:text-mach-orange transition-colors">Cyber Volt</a></li>
              <li><a href="#colors" className="hover:text-mach-orange transition-colors">Hyper Ice</a></li>
              <li><a href="#purchase" className="hover:text-mach-orange transition-colors">Limited Production</a></li>
            </ul>
          </div>

          {/* Social & Support Column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono tracking-widest text-white uppercase mb-4">
              CONNECT
            </h4>
            <ul className="space-y-3 text-xs font-mono">
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-mach-orange transition-colors">Instagram</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-mach-orange transition-colors">X / Twitter</a></li>
              <li><a href="https://strava.com" target="_blank" rel="noreferrer" className="hover:text-mach-orange transition-colors">Strava Running Club</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-mach-orange transition-colors">YouTube Field Tests</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} MACH-X PROPULSION LABS. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-zinc-300 transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">TERMS OF FLIGHT</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">COOKIE TELEMETRY</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
