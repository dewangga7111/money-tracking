'use client';

import { motion, type Variants, type MotionStyle } from 'framer-motion';
import { EASE } from './home-constants';

export const fadeUp = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } } };
export const fadeLeft = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: EASE } } };
export const fadeRight = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: EASE } } };

export const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
export const staggerItem = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } } };

export const viewOpts = { once: true, margin: '-80px' } as const;

export function FadeIn({ children, className, style, variants = fadeUp }: {
  children: React.ReactNode; className?: string; style?: MotionStyle; variants?: Variants;
}) {
  return (
    <motion.div className={className} {...(style ? { style } : {})} initial="hidden" whileInView="visible" viewport={viewOpts} variants={variants}>
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} initial="hidden" whileInView="visible" viewport={viewOpts} variants={staggerContainer}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, variants = staggerItem }: { children: React.ReactNode; className?: string; variants?: Variants }) {
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
