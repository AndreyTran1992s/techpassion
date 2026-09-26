'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FALLBACK_POSTS } from '@/lib/api';
import { TechPassionBrandLogo } from './Header';
import { useLanguage } from '@/context/LanguageContext';

export function Footer() {
  const [contact, setContact] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const { t, getLocalizedPost } = useLanguage();

  const handleQuickSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.name || !contact.email || !contact.message) return;
    setSent(true);
    setContact({ name: '', email: '', message: '' });
  };

  return (
    <footer className="w-full max-w-[1180px] mx-auto bg-[#141414] border-x border-b border-[#282828] border-t-[3px] border-t-[#ff9900] text-neutral-400 text-xs">
      <div className="px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-white border-b border-[#2a2a2a] pb-2">
            {t.aboutTitle}
          </h4>
          <div className="bg-[#86423c] p-3.5 rounded border border-[#a3544d] flex justify-center">
            <TechPassionBrandLogo size="small" />
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            {t.aboutDesc}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-white border-b border-[#2a2a2a] pb-2 mb-3">
            {t.contactFormTitle}
          </h4>
          {sent ? (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
              {t.contactSuccessMsg}
            </div>
          ) : (
            <form onSubmit={handleQuickSend} className="space-y-2.5">
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">{t.nameLabel}</label>
                <input
                  type="text"
                  required
                  value={contact.name}
                  onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  className="w-full bg-[#0d0d0d] border border-[#2a2a2a] px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#ff9900]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">{t.emailLabel}</label>
                <input
                  type="email"
                  required
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  className="w-full bg-[#0d0d0d] border border-[#2a2a2a] px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#ff9900]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">{t.messageLabel}</label>
                <textarea
                  rows={3}
                  required
                  value={contact.message}
                  onChange={(e) => setContact({ ...contact, message: e.target.value })}
                  className="w-full bg-[#0d0d0d] border border-[#2a2a2a] px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#ff9900] resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-[#ff9900] hover:bg-[#e68a00] text-white font-extrabold uppercase tracking-wider text-xs transition-colors"
              >
                {t.sendBtn}
              </button>
            </form>
          )}
        </div>

        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-white border-b border-[#2a2a2a] pb-2 mb-3">
            {t.techSilosTitle}
          </h4>
          <div className="bg-[#1b1b1b] border border-[#2b2b2b] p-3">
            <img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80"
              alt="Tech Services"
              className="w-full h-28 object-cover mb-2.5"
            />
            <h5 className="text-xs font-bold text-white mb-1">
              {t.techSilosSubtitle}
            </h5>
            <Link
              href="/product-services"
              className="inline-block mt-1 bg-[#ff9900] text-white text-[10px] font-bold uppercase px-2.5 py-1"
            >
              {t.viewDetails}
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-white border-b border-[#2a2a2a] pb-2 mb-3">
            {t.popularPostsTitle}
          </h4>
          <div className="space-y-3">
            {FALLBACK_POSTS.slice(0, 3).map((rawPost) => {
              const p = getLocalizedPost(rawPost);
              return (
                <Link
                  key={p.slug}
                  href={`/${p.category_slug}/post/${p.slug}`}
                  className="flex gap-2.5 group"
                >
                  <img
                    src={p.cover_image}
                    alt={p.title}
                    className="w-14 h-12 object-cover shrink-0 bg-black border border-[#333]"
                  />
                  <div className="min-w-0">
                    <h5 className="text-[11px] font-bold text-neutral-300 group-hover:text-[#ff9900] line-clamp-2 leading-snug">
                      {p.title}
                    </h5>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-[#0e0e0e] border-t border-[#222222] px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-neutral-500">
        <div>Copyright © 2026 Tech Passion — Where You Live With Your Passion.</div>
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:text-[#ff9900]">{t.breakingNews}</Link>
          <Link href="/product-services" className="hover:text-[#ff9900]">{t.services}</Link>
          <Link href="/admin" className="hover:text-[#ff9900]">{t.adminPortal}</Link>
        </div>
      </div>
    </footer>
  );
}
