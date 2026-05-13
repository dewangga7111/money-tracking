'use client';

import { useEffect, useState } from 'react';
import { NAV_ITEMS } from './home-constants';
import type { HeroData } from '@/types/sections/home-section';
import { HeroSection } from './sections/hero-section';
import { StickyNav } from './sections/sticky-nav';
import { AboutSection } from './sections/about-section';
import { ProductsSection } from './sections/products-section';
import { BenefitSection } from './sections/benefit-section';
import { HowToSection } from './sections/howto-section';
import { GallerySection } from './sections/gallery-section';
import { LegalSection } from './sections/legal-section';
import { DocumentationSection } from './sections/documentation-section';
import { ContactSection } from './sections/contact-section';
import { FooterSection } from './sections/footer-section';

export function HomeContent({ heroData }: { heroData?: HeroData | null }) {
  const [activeSection, setActiveSection] = useState<string>('company');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeArticle, setActiveArticle] = useState(0);
  const [winW, setWinW] = useState(1200);

  useEffect(() => {
    setWinW(window.innerWidth);
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const trigger = window.scrollY + window.innerHeight * 0.4;
      let current: string = NAV_ITEMS[0]!.id;
      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= trigger) {
          current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="min-h-screen bg-white text-gray-900"
      style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif', isolation: 'isolate' }}
    >
      <HeroSection data={heroData ?? null} />
      <StickyNav activeSection={activeSection} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <AboutSection />
      <ProductsSection />
      <BenefitSection />
      <HowToSection />
      <GallerySection />
      <DocumentationSection activeArticle={activeArticle} setActiveArticle={setActiveArticle} winW={winW} />
      <LegalSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
