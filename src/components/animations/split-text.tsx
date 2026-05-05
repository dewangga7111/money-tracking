'use client';

import { FC, ReactNode, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SplitTextProps {
  text?: string;
  children?: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  stagger?: number;
  ease?: string;
  splitBy?: 'characters' | 'words';
}

export const SplitText: FC<SplitTextProps> = ({
  text,
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  y = 20,
  stagger = 0.03,
  ease = 'power3.out',
  splitBy = 'characters',
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const content = text || (typeof children === 'string' ? children : '');

  useEffect(() => {
    if (!containerRef.current) return;
    const elements = containerRef.current.querySelectorAll('.split-char');
    gsap.fromTo(
      elements,
      { opacity: 0, y },
      { opacity: 1, y: 0, duration, delay, stagger, ease }
    );
  }, [delay, duration, y, stagger, ease]);

  const renderSplitText = () => {
    if (splitBy === 'words') {
      return (content as string).split(' ').map((word, i, arr) => (
        <span key={i} className="split-char inline-block" style={{ opacity: 0 }}>
          {word}{i < arr.length - 1 ? ' ' : ''}
        </span>
      ));
    }
    return (content as string).split('').map((char, i) => (
      <span key={i} className="split-char inline-block" style={{ opacity: 0 }}>
        {char === ' ' ? ' ' : char}
      </span>
    ));
  };

  return (
    <span ref={containerRef} className={className}>
      {renderSplitText()}
    </span>
  );
};

export default SplitText;
