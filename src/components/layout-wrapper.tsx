'use client';

import { useState } from 'react';
import { useRouter } from 'waku';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './sidebar/sidebar';
import { Navbar } from './navbar';

type LayoutWrapperProps = {
  children: React.ReactNode;
};

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar pathname={router.path} isOpen={sidebarOpen} />
      <div className="flex flex-1 flex-col">
        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main className="flex-1 bg-gray-50 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={router.path}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
