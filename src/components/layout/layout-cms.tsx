'use client';

import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { useRouter } from 'waku';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from '../sidebar/sidebar';
import { Navbar } from '../navbar/navbar';
import { Footer } from './footer';
import { currentUserAtom } from '@/store/ui';
import type { UserData } from '@/types/user';

type LayoutWrapperProps = {
  children: React.ReactNode;
  user: UserData | null;
};

export function LayoutWrapper({ children, user }: LayoutWrapperProps) {
  const router = useRouter();
  const setCurrentUser = useSetAtom(currentUserAtom);

  useEffect(() => {
    setCurrentUser(user);
  }, [user, setCurrentUser]);

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar pathname={router.path} />
      <div className="flex flex-1 flex-col">
        <Navbar />
        <main className="flex-1 bg-gray-50 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={router.path}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </div>
  );
}
