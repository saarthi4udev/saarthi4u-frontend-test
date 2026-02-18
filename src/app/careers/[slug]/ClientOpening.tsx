'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ClientOpening({ slug }: { slug: string }) {
  const router = useRouter();

  // friendly title from slug
  const title = slug.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join(' ');

  const [form, setForm] = useState({ name: '', email: '', mobile: '', experience: 'Fresher', resume: null as File | null, answer: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const f = e.target.files && e.target.files[0];
    if (!f) return setForm(prev => ({ ...prev, resume: null }));
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowed.includes(f.type)) return setError('Allowed formats: PDF, DOC, DOCX');
    if (f.size > 5 * 1024 * 1024) return setError('Max file size is 5 MB');
    setForm(prev => ({ ...prev, resume: f }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.name.trim() || !form.email.trim() || !form.mobile.trim()) return setError('Please complete required fields');
    if (!form.resume) return setError('Please upload your resume');

    setSubmitting(true);
    // simulate API submit
    await new Promise(res => setTimeout(res, 1000));
    setSubmitting(false);
    setSuccess(true);
    // optionally navigate back or to a thank-you
    setTimeout(() => {
      router.push('/careers');
    }, 1400);
  };

  return (
    <main className="bg-white dark:bg-slate-900">
      <section className="bg-gradient-to-r from-violet-600 via-violet-500 to-violet-400 py-12 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-3xl font-bold">Apply — {title}</h1>
          <p className="mt-2 text-sm text-white/90">Role auto-filled. Complete the short form to apply.</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-800 dark:border-slate-700">
            <h3 className="mb-4 text-xl font-semibold">About the role</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">We're looking for motivated candidates to join our team. This position ({title}) focuses on delivering exceptional student outcomes.</p>

            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
              <li>Work with students to identify best-fit programs</li>
              <li>Coordinate application and documentation support</li>
              <li>Collaborate with internal teams for student success</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-800 dark:border-slate-700">
            <h3 className="mb-4 text-xl font-semibold">Apply Now</h3>

            <label className="mb-2 block text-sm font-medium">Full Name *</label>
            <input value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} className="mb-4 w-full rounded-md border px-3 py-2 dark:bg-slate-900 dark:border-slate-600" placeholder="Your full name" required />

            <label className="mb-2 block text-sm font-medium">Email Address *</label>
            <input type="email" value={form.email} onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))} className="mb-4 w-full rounded-md border px-3 py-2 dark:bg-slate-900 dark:border-slate-600" placeholder="you@example.com" required />

            <label className="mb-2 block text-sm font-medium">Mobile Number *</label>
            <input value={form.mobile} onChange={e => setForm(prev => ({ ...prev, mobile: e.target.value }))} className="mb-4 w-full rounded-md border px-3 py-2 dark:bg-slate-900 dark:border-slate-600" placeholder="+91 9XXXXXXXXX" required />

            <label className="mb-2 block text-sm font-medium">Applying For Position</label>
            <input readOnly value={title} className="mb-4 w-full rounded-md border bg-gray-50 px-3 py-2 dark:bg-slate-900 dark:border-slate-600" />

            <label className="mb-2 block text-sm font-medium">Experience Level</label>
            <select value={form.experience} onChange={e => setForm(prev => ({ ...prev, experience: e.target.value }))} className="mb-4 w-full rounded-md border px-3 py-2 dark:bg-slate-900 dark:border-slate-600">
              <option>Fresher</option>
              <option>1-2 years</option>
              <option>2-5 years</option>
              <option>5+ years</option>
            </select>

            <label className="mb-2 block text-sm font-medium">Upload Resume * (PDF / DOC / DOCX, max 5 MB)</label>
            <input onChange={onFileChange} type="file" accept=".pdf,.doc,.docx,application/msword,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="mb-4 w-full text-sm text-gray-600" />

            <label className="mb-2 block text-sm font-medium">Why should we consider you? (1–2 lines)</label>
            <textarea value={form.answer} onChange={e => setForm(prev => ({ ...prev, answer: e.target.value }))} maxLength={250} rows={3} className="mb-4 w-full rounded-md border px-3 py-2 dark:bg-slate-900 dark:border-slate-600" placeholder="A short pitch" />

            {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
            {success && <p className="mb-3 text-sm text-green-600">Application submitted — redirecting...</p>}

            <button disabled={submitting} type="submit" className="w-full rounded-md bg-violet-600 px-4 py-2 text-white hover:bg-violet-700 disabled:opacity-60">
              {submitting ? 'Sending...' : 'Apply Now'}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
