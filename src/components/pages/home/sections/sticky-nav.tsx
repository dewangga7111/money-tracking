'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { NAV_ITEMS } from '../home-constants';

type StickyNavProps = {
  activeSection: string;
  menuOpen: boolean;
  setMenuOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
};

export function StickyNav({ activeSection, menuOpen, setMenuOpen }: StickyNavProps) {
  return (
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      {/* Desktop: pill nav */}
      <div className="hidden md:flex max-w-[1400px] mx-auto px-6 py-4 justify-center">
        <nav className="bg-[#f0f0f0] rounded-full px-3 py-2 flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => { e.preventDefault(); document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }); }}
                className="relative text-xs font-bold tracking-wider px-4 py-2 rounded-full whitespace-nowrap cursor-pointer"
                style={{ color: isActive ? '#fff' : '#333', zIndex: 1 }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-primary"
                    style={{ zIndex: -1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Mobile: burger nav */}
      <div className="md:hidden">
        <div className="px-5 py-3 flex items-center justify-between relative">
          <button onClick={() => setMenuOpen((o) => !o)} className="flex flex-col gap-1.5 p-1">
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }} className="block w-5 h-0.5 bg-gray-800" />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className="block w-5 h-0.5 bg-gray-800" />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }} className="block w-5 h-0.5 bg-gray-800" />
          </button>

          <span className="absolute left-1/2 -translate-x-1/2 font-black text-sm tracking-wider text-primary">
            MANDRAGUNA
          </span>

          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
            {NAV_ITEMS.find((n) => n.id === activeSection)?.label ?? ''}
          </span>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden border-t border-gray-100"
            >
              {NAV_ITEMS.map((item, i) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.a
                    key={item.label}
                    initial={{ x: -16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setMenuOpen(false);
                      setTimeout(() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }), 200);
                    }}
                    className={`flex items-center justify-between px-6 py-3.5 text-sm font-bold border-b border-gray-50 ${isActive ? 'text-primary bg-primary-50' : 'text-gray-800 bg-white'}`}
                  >
                    {item.label}
                    {isActive && <span className="text-primary">●</span>}
                  </motion.a>
                );
              })}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
