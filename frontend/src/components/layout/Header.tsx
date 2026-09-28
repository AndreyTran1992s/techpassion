'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ClusterMenu } from '@/lib/api';
import { Search, Menu, X, ChevronDown, Zap, Twitter, Facebook, Github, Globe } from 'lucide-react';
import { useLanguage, Language } from '@/context/LanguageContext';

interface HeaderProps {
  clusters: ClusterMenu[];
}

export function TechPassionBrandLogo({ size = 'large' }: { size?: 'large' | 'small' }) {
  const isLarge = size === 'large';
  return (
    <div className="inline-flex flex-col items-center select-none group">
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        <span
          className={`font-black uppercase text-white tracking-[0.12em] ${
            isLarge ? 'text-2xl sm:text-4xl' : 'text-lg sm:text-xl'
          }`}
        >
          TECH
        </span>

        <svg
          viewBox="0 0 100 100"
          className={`${
            isLarge ? 'w-10 h-10 sm:w-12 sm:h-12' : 'w-7 h-7'
          } shrink-0 group-hover:scale-105 transition-transform duration-300`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="16,23 51,29 63,11 52,42 34,45 34,68 25,88" fill="#ffffff" />
          <polygon points="38,49 55,46 63,17 57,43" fill="#ff9900" />
          <polygon points="64,13 80,31 70,34" fill="#ffffff" />
          <polygon points="63,37 82,36 80,47 65,48" fill="#ffffff" />
          <polygon points="59,52 77,50 74,63 57,66" fill="#ffffff" />
          <polygon points="40,65 55,60 54,73 27,88" fill="#ff9900" />
        </svg>

        <span
          className={`font-black uppercase text-white tracking-[0.12em] ${
            isLarge ? 'text-2xl sm:text-4xl' : 'text-lg sm:text-xl'
          }`}
        >
          PASSION
        </span>
      </div>

      <div
        onClick={(e) => {
          if (e.detail === 2) {
            window.location.href = '/admin';
          }
        }}
        title="Double-click to access Admin"
        className={`font-extrabold uppercase text-neutral-200 tracking-[0.32em] sm:tracking-[0.38em] text-center mt-1 cursor-pointer select-none ${
          isLarge ? 'text-[8px] sm:text-[10px]' : 'text-[6.5px]'
        }`}
      >
        WHERE YOU LIVE WITH YOUR PASSION
      </div>
    </div>
  );
}

const LANGUAGES: { code: Language; label: string; fullLabel: string }[] = [
  { code: 'en', label: 'EN', fullLabel: 'English' },
  { code: 'vi', label: 'VI', fullLabel: 'Tiếng Việt' },
  { code: 'zh', label: '中文', fullLabel: '中文 (Chinese)' },
];

export function Header({ clusters }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { lang, setLang, t, getLocalizedCategoryName } = useLanguage();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) ||
        (e.altKey && (e.key === 'a' || e.key === 'A'))
      ) {
        e.preventDefault();
        window.location.href = '/admin';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const otherCategories = clusters
    .flatMap((c) => c.categories)
    .filter((cat) => cat.slug !== 'breaking-news');

  return (
    <header className="w-full max-w-[1180px] mx-auto bg-[#181818] border-x border-[#282828] z-40">
      {/* 1. TOP UTILITY BAR + MULTI-LANGUAGE SWITCHER */}
      <div className="bg-[#111111] border-b border-[#242424] px-4 sm:px-6 min-h-[38px] py-1 flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-5 h-5 bg-[#3b5998] text-white flex items-center justify-center hover:opacity-90"
              title="Facebook"
            >
              <Facebook className="w-3 h-3" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="w-5 h-5 bg-[#00aced] text-white flex items-center justify-center hover:opacity-90"
              title="Twitter"
            >
              <Twitter className="w-3 h-3" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="w-5 h-5 bg-[#333333] text-white flex items-center justify-center hover:opacity-90"
              title="GitHub"
            >
              <Github className="w-3 h-3" />
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-4 uppercase font-semibold tracking-wider text-[10px] text-neutral-400">
            <Link href="/" className="text-[#ff9900] font-bold hover:underline">
              {t.breakingNews}
            </Link>
            <Link href="/tricks" className="hover:text-[#ff9900] transition-colors">
              {t.tricks}
            </Link>
            <Link href="/tips" className="hover:text-[#ff9900] transition-colors">
              {t.tips}
            </Link>
            <Link href="/ebooks" className="hover:text-[#ff9900] transition-colors">
              {t.ebooks}
            </Link>
            <Link href="/product-services" className="hover:text-[#ff9900] transition-colors">
              {t.services}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* MULTI-LANGUAGE SWITCHER (EN | VI | 中文) */}
          <div className="flex items-center bg-[#1c1c1c] border border-[#333333] rounded overflow-hidden">
            <span className="px-2 py-1 text-[10px] text-neutral-400 flex items-center gap-1 border-r border-[#2e2e2e]">
              <Globe className="w-3 h-3 text-[#ff9900]" />
              <span className="hidden sm:inline">{t.languageLabel}:</span>
            </span>
            {LANGUAGES.map((item) => {
              const isActive = lang === item.code;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setLang(item.code)}
                  title={item.fullLabel}
                  className={`px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'bg-[#ff9900] text-white'
                      : 'text-neutral-300 hover:bg-[#2a2a2a] hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="hidden sm:flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="bg-[#1c1c1c] border border-[#2e2e2e] text-neutral-200 px-2.5 py-1 text-[11px] w-36 sm:w-44 focus:outline-none focus:border-[#ff9900]"
            />
            <button
              type="submit"
              className="bg-[#ff9900] hover:bg-[#e68a00] text-white px-2 py-1 border border-[#ff9900] flex items-center justify-center transition-colors"
              title="Search"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* 2. BRAND LOGO BANNER */}
      <div className="px-4 sm:px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4 bg-gradient-to-r from-[#86423c] via-[#6e3530] to-[#1a1a1a] border-b border-[#2e2e2e]">
        <Link href="/" className="py-1 px-3 rounded">
          <TechPassionBrandLogo size="large" />
        </Link>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/product-services"
            className="flex items-center justify-between bg-[#141414]/90 border border-[#333] hover:border-[#ff9900] px-4 py-2.5 gap-4 transition-colors"
          >
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#ff9900]">
                {t.archConsulting}
              </div>
              <div className="text-[11px] font-bold text-neutral-200">
                {t.archSubtitle}
              </div>
            </div>
            <span className="px-3 py-1.5 bg-[#ff9900] text-white text-[10px] font-extrabold uppercase tracking-wider shrink-0">
              {t.contactUs}
            </span>
          </Link>
        </div>
      </div>

      {/* 3. MAIN MEGAMAG NAVIGATION BAR */}
      <div className="bg-[#232323] border-b border-[#303030] px-4 lg:px-0 flex items-center justify-between w-full">
        <nav className="hidden lg:flex items-stretch w-full flex-nowrap">
          <Link
            href="/"
            className="flex-1 bg-[#ff9900] text-white font-extrabold text-[10.5px] xl:text-[11px] uppercase tracking-wide px-2 py-3.5 hover:bg-[#e68a00] transition-colors flex items-center justify-center gap-1 whitespace-nowrap"
          >
            <Zap className="w-3.5 h-3.5 fill-white shrink-0" />
            <span>{t.breakingNews}</span>
          </Link>

          {otherCategories.slice(0, 7).map((cat) => (
            <div key={cat.id} className="relative group flex-1 flex">
              <Link
                href={`/${cat.slug}`}
                className="w-full flex items-center justify-center gap-1 text-neutral-200 hover:bg-[#ff9900] hover:text-white font-bold text-[10.5px] xl:text-[11px] uppercase tracking-wide px-1.5 py-3.5 border-r border-[#2d2d2d] transition-colors whitespace-nowrap"
              >
                <span>{getLocalizedCategoryName(cat.slug, cat.name)}</span>
                {cat.children && cat.children.length > 0 && <ChevronDown className="w-3 h-3 opacity-75 shrink-0" />}
              </Link>

              {cat.children && cat.children.length > 0 && (
                <div className="absolute left-0 top-full w-56 bg-[#1f1f1f] border border-[#333333] border-t-2 border-t-[#ff9900] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  {cat.children.map((sub) => (
                    <Link
                      key={sub.id}
                      href={`/${cat.slug}/${sub.slug}`}
                      className="block px-4 py-2.5 text-xs font-semibold text-neutral-300 hover:bg-[#ff9900] hover:text-white border-b border-[#2a2a2a] last:border-0 transition-colors"
                    >
                      ▸ {getLocalizedCategoryName(sub.slug, sub.name)}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link
            href="/tricks"
            className="flex-1 flex items-center justify-center text-neutral-200 hover:bg-[#ff9900] hover:text-white font-bold text-[10.5px] xl:text-[11px] uppercase tracking-wide px-1.5 py-3.5 border-r border-[#2d2d2d] transition-colors whitespace-nowrap"
          >
            {t.tricks}
          </Link>
          <Link
            href="/ebooks"
            className="flex-1 flex items-center justify-center text-neutral-200 hover:bg-[#ff9900] hover:text-white font-bold text-[10.5px] xl:text-[11px] uppercase tracking-wide px-1.5 py-3.5 transition-colors whitespace-nowrap"
          >
            {t.ebooks}
          </Link>
        </nav>

        <div className="flex lg:hidden items-center justify-between w-full py-2">
          <Link href="/" className="bg-[#ff9900] text-white font-bold text-xs uppercase px-3 py-1.5 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>{t.breakingNews}</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-neutral-300 hover:text-white bg-[#1a1a1a] border border-[#333]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1a1a1a] border-b border-[#333] px-4 py-4 space-y-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-xs font-bold uppercase text-[#ff9900]"
          >
            ⚡ {t.breakingNews}
          </Link>
          {otherCategories.map((cat) => (
            <div key={cat.id}>
              <Link
                href={`/${cat.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 text-xs font-bold uppercase text-neutral-200 hover:text-[#ff9900]"
              >
                {getLocalizedCategoryName(cat.slug, cat.name)}
              </Link>
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
