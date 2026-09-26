'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ClusterMenu } from '@/lib/api';
import {
  ChevronDown,
  Layers,
  Code2,
  Cpu,
  Bot,
  ShieldAlert,
  CheckCircle2,
  TrendingUp,
  Users,
  Sparkles,
  Lightbulb,
  Briefcase,
  BookOpen,
  Zap,
} from 'lucide-react';

interface MegaMenuProps {
  clusters: ClusterMenu[];
}

const ICON_MAP: Record<string, any> = {
  Zap,
  Bot,
  Layout: Layers,
  Code2,
  ShieldAlert,
  CheckCircle2,
  TrendingUp,
  Users,
  Sparkles,
  Lightbulb,
  Briefcase,
  BookOpen,
};

export function MegaMenu({ clusters }: MegaMenuProps) {
  const [activeCluster, setActiveCluster] = useState<string | null>(null);

  return (
    <nav className="relative flex items-center gap-1 md:gap-2">
      {clusters.map((cluster) => {
        const isOpen = activeCluster === cluster.cluster;

        return (
          <div
            key={cluster.cluster}
            className="relative"
            onMouseEnter={() => setActiveCluster(cluster.cluster)}
            onMouseLeave={() => setActiveCluster(null)}
          >
            {/* Cluster Trigger Button */}
            <button
              onClick={() => setActiveCluster(isOpen ? null : cluster.cluster)}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-all duration-200 ${
                isOpen
                  ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {cluster.cluster_name}
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-indigo-400' : 'text-slate-400'
                }`}
              />
            </button>

            {/* Dropdown Mega Menu Window */}
            {isOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-[560px] md:w-[680px] bg-[#121722] border border-[#232d42] rounded-xl shadow-2xl p-5 z-50 glass">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                    {cluster.cluster_name} — Các Chuyên Mục Lõi
                  </span>
                  <span className="text-xs text-slate-500">
                    {cluster.categories.length} chuyên mục
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3.5 max-h-[460px] overflow-y-auto pr-1">
                  {cluster.categories.map((cat) => {
                    const IconComponent = cat.icon && ICON_MAP[cat.icon] ? ICON_MAP[cat.icon] : Layers;
                    const hasChildren = cat.children && cat.children.length > 0;

                    return (
                      <div
                        key={cat.id}
                        className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/60 hover:border-indigo-500/40 hover:bg-slate-800/50 transition-all group"
                      >
                        {/* Main Pillar Link */}
                        <Link
                          href={`/${cat.slug}`}
                          className="flex items-start gap-2.5"
                          onClick={() => setActiveCluster(null)}
                        >
                          <div className="p-2 rounded-md bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors">
                              {cat.name}
                            </div>
                            <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                              {cat.description || 'Bài viết & kỹ thuật chuyên sâu'}
                            </p>
                          </div>
                        </Link>

                        {/* Sub-items Links if any */}
                        {hasChildren && (
                          <div className="mt-2.5 pt-2 border-t border-slate-800/70 flex flex-wrap gap-1.5 pl-8">
                            {cat.children!.map((sub) => (
                              <Link
                                key={sub.id}
                                href={`/${cat.slug}/${sub.slug}`}
                                onClick={() => setActiveCluster(null)}
                                className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:bg-indigo-600 hover:text-white transition-colors"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
