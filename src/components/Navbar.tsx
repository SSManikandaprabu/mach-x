import React, { useState, useEffect } from 'react';
import { WordmarkLogo } from './WordmarkLogo';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface NavbarProps {
  onShopClick?: () => void;
  cartCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onShopClick, cartCount = 0 }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Story', href: '#story' },
    { name: 'Features', href: '#features' },
    { name: 'Colors', href: '#colors' },
    { name: 'Specs', href: '#specs' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'py-3 glass-panel border-b border-zinc-800/80 shadow-2xl' : 'py-5 bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Wordmark Logo */}
        <a
          href="#story"
          onClick={(e) => handleLinkClick(e, '#story')}
          className="focus:outline-none"
        >
          <WordmarkLogo size="md" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-xs font-mono tracking-widest uppercase text-zinc-300 hover:text-mach-orange transition-colors duration-200 relative group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-mach-orange transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <button
            onClick={onShopClick}
            aria-label="View shopping bag"
            className="relative p-2 text-zinc-300 hover:text-mach-orange transition-colors rounded-full hover:bg-zinc-800/60"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-mach-orange text-black font-mono font-bold text-[11px] rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Shop MACH-X CTA */}
          <button
            onClick={onShopClick}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-gradient-to-r from-mach-orange to-mach-orange-glow text-black font-heading tracking-widest text-lg font-bold shadow-[0_0_20px_rgba(255,85,0,0.4)] hover:shadow-[0_0_30px_rgba(255,85,0,0.7)] hover:scale-105 active:scale-95 transition-all duration-200"
          >
            SHOP MACH-X
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 text-zinc-300 hover:text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-zinc-800 px-6 py-8 flex flex-col gap-6 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-base font-mono tracking-widest uppercase text-zinc-200 hover:text-mach-orange py-2 border-b border-zinc-800/50"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (onShopClick) onShopClick();
            }}
            className="w-full py-3.5 rounded-full bg-mach-orange text-black font-heading tracking-widest text-xl font-bold shadow-lg"
          >
            SHOP MACH-X — $275
          </button>
        </div>
      )}
    </header>
  );
};
