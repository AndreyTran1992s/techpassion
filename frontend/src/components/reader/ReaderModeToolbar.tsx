'use client';

import React, { useState, useEffect } from 'react';
import { Minus, Plus, Share2 } from 'lucide-react';

interface ReaderModeToolbarProps {
  onFontChange?: (font: 'sans' | 'serif' | 'mono') => void;
  onFontSizeChange?: (size: number) => void;
}

export function ReaderModeToolbar({ onFontChange, onFontSizeChange }: ReaderModeToolbarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeFont, setActiveFont] = useState<'sans' | 'serif' | 'mono'>('sans');
  const [fontSize, setFontSize] = useState(16);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFontSelect = (font: 'sans' | 'serif' | 'mono') => {
    setActiveFont(font);
    if (onFontChange) onFontChange(font);
  };

  const handleSizeChange = (delta: number) => {
    const newSize = Math.max(14, Math.min(22, fontSize + delta));
    setFontSize(newSize);
    if (onFontSizeChange) onFontSizeChange(newSize);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <aside className="fixed bottom-6 right-6 z-40 bg-[#121722]/95 border border-[#232d42] rounded-2xl shadow-2xl p-2.5 glass flex items-center gap-2 text-slate-300">
        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => handleFontSelect('sans')}
            title="Sans-serif Font"
            className={`px-2 py-1 rounded text-xs font-semibold ${
              activeFont === 'sans' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sans
          </button>
          <button
            onClick={() => handleFontSelect('serif')}
            title="Serif Editorial Font"
            className={`px-2 py-1 rounded text-xs font-serif font-semibold ${
              activeFont === 'serif' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Serif
          </button>
          <button
            onClick={() => handleFontSelect('mono')}
            title="Monospace Developer Font"
            className={`px-2 py-1 rounded text-xs font-mono font-semibold ${
              activeFont === 'mono' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Mono
          </button>
        </div>

        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => handleSizeChange(-1)}
            title="Decrease font size"
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="text-xs font-mono px-1">{fontSize}px</span>
          <button
            onClick={() => handleSizeChange(1)}
            title="Increase font size"
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          onClick={handleShare}
          title="Copy article link"
          className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-indigo-400 border border-slate-800 transition-colors"
        >
          <Share2 className="w-4 h-4" />
        </button>

        {copied && (
          <span className="absolute -top-8 right-0 bg-indigo-600 text-white text-[11px] px-2 py-1 rounded-md shadow-lg">
            Link copied!
          </span>
        )}
      </aside>
    </>
  );
}
