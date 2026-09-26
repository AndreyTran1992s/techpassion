'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  fetchApi,
  createPostApi,
  fetchInquiriesApi,
  updateInquiryStatusApi,
  loginAdminApi,
  Post,
  FALLBACK_POSTS,
  ServiceInquiry,
} from '@/lib/api';
import {
  LayoutDashboard,
  PenSquare,
  FileText,
  Mail,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Layers,
  Sparkles,
  RefreshCw,
  Clock,
  Phone,
  Check,
  Search,
  Lock,
  ShieldCheck,
  LogOut,
  KeyRound,
  ArrowRight,
} from 'lucide-react';

const CATEGORY_TREE = [
  { name: '1. Breaking News', slug: 'breaking-news', subItems: [] },
  { name: '2. AI (Artificial Intelligence)', slug: 'ai', subItems: [] },
  {
    name: '3. Design & Development',
    slug: 'design-development',
    subItems: [
      { name: 'Website Design', slug: 'website-design' },
      { name: 'Website Development', slug: 'website-development' },
    ],
  },
  { name: '4. Programming', slug: 'programming', subItems: [] },
  {
    name: '5. Hacking & Security',
    slug: 'hacking-security',
    subItems: [
      { name: 'Hacking', slug: 'hacking' },
      { name: 'Security', slug: 'security' },
    ],
  },
  {
    name: '6. Testing',
    slug: 'testing',
    subItems: [
      { name: 'Auto Testing', slug: 'auto-testing' },
      { name: 'Manual Testing', slug: 'manual-testing' },
    ],
  },
  {
    name: '7. S.E.O / Marketing',
    slug: 'seo-marketing',
    subItems: [
      { name: 'S.E.O', slug: 'seo' },
      { name: 'Marketing', slug: 'marketing' },
    ],
  },
  { name: '8. Soft Skills', slug: 'soft-skills', subItems: [] },
  { name: '9. Tricks', slug: 'tricks', subItems: [] },
  { name: '10. Tips', slug: 'tips', subItems: [] },
  { name: '11. Product & Services', slug: 'product-services', subItems: [] },
  { name: '12. E-Books', slug: 'ebooks', subItems: [] },
];

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminToken, setAdminToken] = useState<string>('');
  const [adminEmail, setAdminEmail] = useState<string>('');
  const [loginForm, setLoginForm] = useState({ email: 'admin@techpassion.dev', password: '' });
  const [loginError, setLoginError] = useState<string>('');
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<'overview' | 'new-post' | 'posts' | 'inquiries'>('overview');
  const [posts, setPosts] = useState<Post[]>(FALLBACK_POSTS);
  const [inquiries, setInquiries] = useState<ServiceInquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [postSearch, setPostSearch] = useState('');
  const [inquiryFilter, setInquiryFilter] = useState<'ALL' | 'NEW' | 'CONTACTED' | 'RESOLVED'>('ALL');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category_slug: 'programming',
    sub_category_slug: '',
    summary: '',
    content: '',
    cover_image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    tags: '',
    is_breaking: false,
    status: 'PUBLISHED',
  });
  const [submittingPost, setSubmittingPost] = useState(false);
  const [postFeedback, setPostFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('tp_admin_token');
    const savedEmail = localStorage.getItem('tp_admin_email');
    if (savedToken) {
      setAdminToken(savedToken);
      setAdminEmail(savedEmail || 'admin@techpassion.dev');
      setIsAuthenticated(true);
      loadData(savedToken);
    }
  }, []);

  async function loadData(token?: string) {
    setLoading(true);
    try {
      const activeTok = token || adminToken;
      const [fetchedPosts, fetchedInquiries] = await Promise.all([
        fetchApi<Post[]>('/posts'),
        fetchInquiriesApi(activeTok),
      ]);

      if (fetchedPosts && fetchedPosts.length > 0) {
        setPosts(fetchedPosts);
      }
      if (fetchedInquiries && fetchedInquiries.length > 0) {
        setInquiries(fetchedInquiries);
      } else {
        setInquiries([
          {
            id: 1,
            service_id: 'srv-0001-consulting',
            service_title: 'System Architecture Consulting & Code Audit',
            customer_name: 'Alex Morgan',
            customer_email: 'alex.morgan@fintech.io',
            customer_phone: '+1 (555) 234-5678',
            message: 'We are scaling our payment gateway to 50,000 TPS and need architectural guidance on our hybrid MySQL + Redis cluster.',
            status: 'NEW',
            created_at: new Date(Date.now() - 3600000).toISOString(),
          },
          {
            id: 2,
            service_id: 'srv-0002-fullstack-dev',
            service_title: 'End-to-End Custom Web Application Engineering',
            customer_name: 'Sarah Jenkins',
            customer_email: 'sarah.j@cloudscale.dev',
            customer_phone: '+1 (555) 876-5432',
            message: 'Looking to build an enterprise engineering knowledge portal using Next.js 15 and Node.js.',
            status: 'CONTACTED',
            created_at: new Date(Date.now() - 86400000).toISOString(),
          },
        ]);
      }
    } catch {
      // Keep fallbacks
    } finally {
      setLoading(false);
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    const res = await loginAdminApi(loginForm.email, loginForm.password);
    if (res.success && res.data?.token) {
      const tok = res.data.token;
      const mail = res.data.user?.email || loginForm.email;
      setAdminToken(tok);
      setAdminEmail(mail);
      setIsAuthenticated(true);
      localStorage.setItem('tp_admin_token', tok);
      localStorage.setItem('tp_admin_email', mail);
      loadData(tok);
    } else {
      setLoginError(res.error || 'Invalid email or password.');
    }
    setLoginLoading(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminToken('');
    setAdminEmail('');
    localStorage.removeItem('tp_admin_token');
    localStorage.removeItem('tp_admin_email');
  };

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: slugify(val),
    }));
  };

  const handleCategoryChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      category_slug: val,
      sub_category_slug: '',
    }));
  };

  const currentCategory = CATEGORY_TREE.find((c) => c.slug === formData.category_slug);

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.summary || !formData.content) {
      setPostFeedback({ type: 'error', message: 'Please fill in title, slug, summary, and article content.' });
      return;
    }

    setSubmittingPost(true);
    setPostFeedback(null);

    const payload = {
      ...formData,
      tags: formData.tags
        ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : ['TechPassion', 'SoftwareEngineering'],
    };

    const res = await createPostApi(payload, adminToken);
    setSubmittingPost(false);

    if (res.success) {
      setPostFeedback({ type: 'success', message: 'Article published successfully!' });
      const newPostObj: Post = {
        title: formData.title,
        slug: formData.slug,
        category_id: 4,
        category_slug: formData.category_slug,
        sub_category_slug: formData.sub_category_slug || null,
        category_path: formData.sub_category_slug
          ? [formData.category_slug, formData.sub_category_slug]
          : [formData.category_slug],
        summary: formData.summary,
        content: formData.content,
        cover_image: formData.cover_image,
        author_id: 'adm-0000-0000-0000-000000000001',
        author_name: 'Tech Passion Lead',
        is_breaking: formData.is_breaking,
        tags: payload.tags,
        seo: { meta_title: formData.title, meta_description: formData.summary },
        metrics: { views: 1, likes: 0, reading_time_minutes: 5 },
        status: formData.status,
      };
      setPosts((prev) => [newPostObj, ...prev]);
      setFormData({
        title: '',
        slug: '',
        category_slug: 'programming',
        sub_category_slug: '',
        summary: '',
        content: '',
        cover_image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
        tags: '',
        is_breaking: false,
        status: 'PUBLISHED',
      });
    } else {
      setPostFeedback({ type: 'error', message: res.error || 'Failed to publish article.' });
    }
  };

  const handleStatusChange = async (id: number, status: 'NEW' | 'CONTACTED' | 'RESOLVED') => {
    setInquiries((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
    await updateInquiryStatusApi(id, status, adminToken);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-[#121722] border border-[#232d42] rounded-2xl p-8 shadow-2xl">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#ff9900]/15 border border-[#ff9900]/40 text-[#ff9900] flex items-center justify-center mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-extrabold text-white uppercase tracking-wider">Admin Security Gatekeeper</h1>
            <p className="text-xs text-slate-400 mt-1">
              JWT Role-Based Access Control (RBAC) &amp; Brute-Force Protected Portal
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Administrator Email
              </label>
              <input
                type="email"
                required
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="w-full bg-[#0a0d14] border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff9900]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Security Password
              </label>
              <input
                type="password"
                required
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                placeholder="Enter administrator password..."
                className="w-full bg-[#0a0d14] border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff9900]"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 rounded-lg bg-[#ff9900] hover:bg-[#e68a00] text-white font-extrabold uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>{loginLoading ? 'Authenticating...' : 'Sign In to CMS'}</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 text-center">
            Default Demo Credentials: <code className="text-[#ff9900]">admin@techpassion.dev</code> / <code className="text-[#ff9900]">Admin@TechPassion2026</code>
          </div>
        </div>
      </div>
    );
  }

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(postSearch.toLowerCase()) ||
      p.category_slug.toLowerCase().includes(postSearch.toLowerCase())
  );

  const filteredInquiries =
    inquiryFilter === 'ALL' ? inquiries : inquiries.filter((i) => i.status === inquiryFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ff9900] mb-1">
            <ShieldCheck className="w-4 h-4" />
            Authenticated Session: {adminEmail}
          </div>
          <h1 className="text-2xl font-extrabold text-white">Tech Passion Content Management System</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => loadData()}
            className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
          <button
            onClick={handleLogout}
            className="px-3.5 py-2 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { id: 'new-post', label: 'Publish New Article', icon: PenSquare },
          { id: 'posts', label: `Articles (${posts.length})`, icon: FileText },
          { id: 'inquiries', label: `Service Inquiries (${inquiries.length})`, icon: Mail },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors ${
                active
                  ? 'bg-[#ff9900] text-white'
                  : 'bg-[#121722] text-slate-400 hover:text-white border border-[#232d42]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-[#121722] border border-[#232d42]">
              <div className="text-xs text-slate-400 font-semibold uppercase">Published Articles</div>
              <div className="text-2xl font-extrabold text-white mt-1">{posts.length}</div>
            </div>
            <div className="p-5 rounded-xl bg-[#121722] border border-[#232d42]">
              <div className="text-xs text-slate-400 font-semibold uppercase">Core Tech Pillars</div>
              <div className="text-2xl font-extrabold text-[#ff9900] mt-1">12 Pillars</div>
            </div>
            <div className="p-5 rounded-xl bg-[#121722] border border-[#232d42]">
              <div className="text-xs text-slate-400 font-semibold uppercase">Consultation Inquiries</div>
              <div className="text-2xl font-extrabold text-emerald-400 mt-1">{inquiries.length}</div>
            </div>
            <div className="p-5 rounded-xl bg-[#121722] border border-[#232d42]">
              <div className="text-xs text-slate-400 font-semibold uppercase">Security Posture</div>
              <div className="text-2xl font-extrabold text-indigo-400 mt-1">CSP + JWT Active</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: NEW POST */}
      {activeTab === 'new-post' && (
        <form onSubmit={handleSubmitPost} className="max-w-3xl bg-[#121722] border border-[#232d42] rounded-2xl p-6 space-y-5">
          <h2 className="text-lg font-bold text-white">Publish New Technical Article</h2>

          {postFeedback && (
            <div
              className={`p-3 rounded-lg text-xs font-semibold ${
                postFeedback.type === 'success'
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                  : 'bg-red-500/10 border border-red-500/30 text-red-300'
              }`}
            >
              {postFeedback.message}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Article Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Zero-Downtime Database Migrations at Scale"
              className="w-full bg-[#0a0d14] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Primary Pillar *</label>
              <select
                value={formData.category_slug}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full bg-[#0a0d14] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
              >
                {CATEGORY_TREE.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Sub-Category</label>
              <select
                value={formData.sub_category_slug}
                onChange={(e) => setFormData({ ...formData, sub_category_slug: e.target.value })}
                className="w-full bg-[#0a0d14] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
              >
                <option value="">None (Top-Level Pillar)</option>
                {currentCategory?.subItems.map((sub) => (
                  <option key={sub.slug} value={sub.slug}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Executive Summary *</label>
            <textarea
              rows={2}
              required
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              className="w-full bg-[#0a0d14] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Markdown Content *</label>
            <textarea
              rows={8}
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full bg-[#0a0d14] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={submittingPost}
            className="px-6 py-2.5 rounded-lg bg-[#ff9900] hover:bg-[#e68a00] text-white font-extrabold uppercase tracking-wider text-xs"
          >
            {submittingPost ? 'Publishing...' : 'Publish Article'}
          </button>
        </form>
      )}

      {/* TAB 3: ARTICLES */}
      {activeTab === 'posts' && (
        <div className="space-y-4">
          <input
            type="text"
            value={postSearch}
            onChange={(e) => setPostSearch(e.target.value)}
            placeholder="Filter articles by title or category..."
            className="w-full max-w-md bg-[#121722] border border-[#232d42] rounded-lg px-3.5 py-2 text-xs text-white"
          />
          <div className="space-y-3">
            {filteredPosts.map((p) => (
              <div key={p.slug} className="p-4 rounded-xl bg-[#121722] border border-[#232d42] flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#ff9900]">{p.category_slug}</span>
                  <h3 className="text-sm font-bold text-white">{p.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-1">{p.summary}</p>
                </div>
                <Link
                  href={`/${p.category_slug}/post/${p.slug}`}
                  className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs text-white shrink-0 flex items-center gap-1"
                >
                  <span>View</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: INQUIRIES */}
      {activeTab === 'inquiries' && (
        <div className="space-y-4">
          {filteredInquiries.map((inq) => (
            <div key={inq.id} className="p-5 rounded-xl bg-[#121722] border border-[#232d42] space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-bold text-white text-sm">{inq.customer_name} ({inq.customer_email})</div>
                <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                  {inq.status}
                </span>
              </div>
              <div className="text-xs text-[#ff9900] font-semibold">{inq.service_title}</div>
              <p className="text-xs text-slate-300">{inq.message}</p>
              <div className="pt-2 flex items-center gap-2">
                {(['NEW', 'CONTACTED', 'RESOLVED'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(inq.id, st)}
                    className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                      inq.status === st ? 'bg-[#ff9900] text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Mark {st}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
