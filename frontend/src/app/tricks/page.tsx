'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Copy, Check, ChevronRight, Filter } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function TricksPage() {
  const { t, getLocalizedTricks } = useLanguage();
  const tricks = getLocalizedTricks();

  const [selectedTool, setSelectedTool] = useState<string>('all');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const tools = ['all', ...Array.from(new Set(tricks.map((item) => item.target_tool).filter(Boolean)))];

  const filtered =
    selectedTool === 'all'
      ? tricks
      : tricks.filter((item) => item.target_tool?.toLowerCase() === selectedTool.toLowerCase());

  const handleCopy = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-indigo-400 transition-colors">
          {t.breakingNews}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-slate-300 font-medium">{t.tricksBreadcrumb}</span>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
          <Sparkles className="w-4 h-4" />
          {t.tricksBadge}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">{t.tricksTitle}</h1>
        <p className="mt-2 text-sm text-slate-400 max-w-2xl">
          {t.tricksDesc}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-[#1c2436]">
        <span className="text-xs text-slate-500 flex items-center gap-1 mr-2">
          <Filter className="w-3.5 h-3.5" /> {t.filterByTool}
        </span>
        {tools.map((tool) => {
          const isActive = selectedTool === tool;
          return (
            <button
              key={tool}
              onClick={() => setSelectedTool(tool as string)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-[#111827] text-slate-400 hover:text-white border border-[#1f293d]'
              }`}
            >
              {tool === 'all' ? t.allTools : tool}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-[#111827] border border-[#1f293d] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700/60">
                  {item.target_tool || 'Tool'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {item.likes_count || 0} {t.helpful}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white leading-snug">{item.title}</h3>
              <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">{item.explanation}</p>
            </div>

            {item.code_snippet && (
              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <div className="p-3 rounded-lg bg-[#0a0d14] border border-slate-800 flex items-center justify-between font-mono text-xs text-emerald-400 gap-3">
                  <code className="truncate flex-1">{item.code_snippet}</code>
                  <button
                    onClick={() => handleCopy(item.code_snippet!, idx)}
                    className="p-1 rounded text-slate-400 hover:text-white transition-colors shrink-0"
                    title={t.copy}
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
