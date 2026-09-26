'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Download, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function EbooksPage() {
  const { t, getLocalizedEbooks } = useLanguage();
  const ebooks = getLocalizedEbooks();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-indigo-400 transition-colors">
          {t.breakingNews}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-slate-300 font-medium">{t.ebooksBreadcrumb}</span>
      </nav>

      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
          <BookOpen className="w-4 h-4" />
          {t.ebooksBadge}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">{t.ebooksTitle}</h1>
        <p className="mt-2 text-sm text-slate-400 max-w-2xl">
          {t.ebooksDesc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ebooks.map((book) => (
          <div
            key={book.slug}
            className="p-4 rounded-xl bg-[#111827] border border-[#1f293d] flex flex-col justify-between hover:border-slate-600 transition-colors"
          >
            <div>
              <div className="aspect-[3/4] w-full rounded-lg overflow-hidden bg-slate-900 mb-4">
                <img
                  src={book.cover_image}
                  alt={book.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
                <span className="text-emerald-400 font-semibold">{book.category_tag}</span>
                <span>{book.file_size}</span>
              </div>

              <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                {book.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-medium">{book.author}</p>
              <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                {book.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800">
              <a
                href={book.pdf_stream_url}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 px-3 rounded-lg bg-emerald-600/15 text-emerald-300 hover:bg-emerald-600 hover:text-white border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                {t.readDownloadPdf}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
