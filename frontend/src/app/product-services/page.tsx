'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Briefcase, Check, Send, ChevronRight, CheckCircle2, ShieldCheck, Clock, Award } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ProductServicesPage() {
  const { t, getLocalizedServices } = useLanguage();
  const services = getLocalizedServices();

  const [formData, setFormData] = useState({
    service_id: services[0]?.id || 'srv-0001-consulting',
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  useEffect(() => {
    if (!formData.service_id && services[0]?.id) {
      setFormData((prev) => ({ ...prev, service_id: services[0].id }));
    }
  }, [services, formData.service_id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) {
      setSubmitted(true);
      return;
    }

    if (!formData.customer_name || !formData.customer_email || !formData.message) {
      setErrorMessage('Please fill in your full name, email address, and project details.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
      await fetch(`${apiUrl}/services/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-indigo-400 transition-colors">
          {t.breakingNews}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-slate-300 font-medium">{t.servicesBreadcrumb}</span>
      </nav>

      <div className="mb-12">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">
          <Briefcase className="w-4 h-4" />
          {t.servicesBadge}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">{t.servicesTitle}</h1>
        <p className="mt-2 text-sm text-slate-400 max-w-2xl">
          {t.servicesDesc}
        </p>
      </div>

      {/* 1. Service Packages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {services.map((srv) => (
          <div
            key={srv.id}
            className="p-6 rounded-xl bg-[#111827] border border-[#1f293d] flex flex-col justify-between hover:border-indigo-500/40 transition-colors"
          >
            <div>
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                {srv.price_display}
              </span>
              <h3 className="text-lg font-bold text-white mt-1 mb-2 leading-snug">{srv.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">{srv.short_description}</p>

              <div className="space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
                  {t.keyDeliverables}
                </span>
                {srv.features?.map((f, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800">
              <a
                href="#consultation-form"
                onClick={() => setFormData((prev) => ({ ...prev, service_id: srv.id }))}
                className="block w-full py-2.5 text-center text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
              >
                {t.requestConsultation}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Service Guarantees */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-xl bg-[#0e1422] border border-[#1c2436] mb-16">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">{t.guarantee1Title}</div>
            <div className="text-xs text-slate-400">{t.guarantee1Desc}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">{t.guarantee2Title}</div>
            <div className="text-xs text-slate-400">{t.guarantee2Desc}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">{t.guarantee3Title}</div>
            <div className="text-xs text-slate-400">{t.guarantee3Desc}</div>
          </div>
        </div>
      </div>

      {/* 3. Consultation Inquiry Form */}
      <div id="consultation-form" className="max-w-2xl mx-auto p-8 rounded-2xl bg-[#111827] border border-[#1f293d]">
        <h2 className="text-xl font-bold text-white mb-2 text-center">{t.inquiryFormTitle}</h2>
        <p className="text-xs text-slate-400 text-center mb-6">
          {t.inquiryFormDesc}
        </p>

        {submitted ? (
          <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
            <h3 className="text-base font-bold text-white">{t.inquirySuccessTitle}</h3>
            <p className="text-xs text-slate-300 mt-1">
              {t.inquirySuccessDesc}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="company_website_url_check"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              className="hidden opacity-0 absolute -z-10 h-0 w-0 pointer-events-none"
            />

            {errorMessage && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t.fullNameLabel}
                </label>
                <input
                  type="text"
                  required
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full bg-[#0a0d14] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t.workEmailLabel}
                </label>
                <input
                  type="email"
                  required
                  value={formData.customer_email}
                  onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full bg-[#0a0d14] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t.phoneLabel}
                </label>
                <input
                  type="text"
                  value={formData.customer_phone}
                  onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                  className="w-full bg-[#0a0d14] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t.servicePackageLabel}
                </label>
                <select
                  value={formData.service_id}
                  onChange={(e) => setFormData({ ...formData, service_id: e.target.value })}
                  className="w-full bg-[#0a0d14] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {t.projectScopeLabel}
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={t.projectScopePlaceholder}
                className="w-full bg-[#0a0d14] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              {submitting ? t.submittingBtn : t.sendConsultationBtn}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
