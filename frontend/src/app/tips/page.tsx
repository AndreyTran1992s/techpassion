'use client';

import React from 'react';
import Link from 'next/link';
import { Lightbulb, ChevronRight, Quote } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function TipsPage() {
  const { t, getLocalizedTips } = useLanguage();
  const tips = getLocalizedTips();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-indigo-400 transition-colors">
          {t.breakingNews}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-slate-300 font-medium">{t.tipsBreadcrumb}</span>
      </nav>

      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
          <Lightbulb className="w-4 h-4" />
          {t.tipsBadge}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">{t.tipsTitle}</h1>
        <p className="mt-2 text-sm text-slate-400 max-w-2xl">
          {t.tipsDesc}
        </p>
      </div>

      <div className="space-y-4">
        {tips.map((tip, idx) => (
          <div
            key={idx}
            className="p-6 rounded-xl bg-[#111827] border border-[#1f293d] flex flex-col justify-between"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
                <Quote className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">
                    {tip.target_tool}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {tip.likes_count || 0} {t.endorsements}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white leading-snug">{tip.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {tip.explanation}
                </p>

                {tip.code_snippet && (
                  <div className="mt-3 p-3 rounded-lg bg-[#0a0d14] border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto whitespace-pre">
                    <code>{tip.code_snippet}</code>
                  </div>
                )}

                {tip.tags && tip.tags.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                    {tip.tags.map((tag) => (
                      <span key={tag} className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
