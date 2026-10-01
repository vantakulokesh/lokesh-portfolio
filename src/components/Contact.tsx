import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, User, MessageSquare, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useProfile } from '../lib/useProfile';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function Contact() {
  const { data: profile } = useProfile();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Please enter a valid email';
    if (!form.subject.trim()) e.subject = 'Please enter a subject';
    if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    setSubmitError('');

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      const endpoint = `${supabaseUrl}/functions/v1/send-contact-email`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${anonKey}`,
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      });

      if (!response.ok) {
        let msg = 'Something went wrong. Please try again later.';
        try {
          const body = await response.json();
          if (body?.error) msg = body.error;
        } catch { /* use default */ }
        throw new Error(msg);
      }

      const data = await response.json();
      if (!data?.success) {
        throw new Error(data?.error || 'Failed to send message. Please try again.');
      }

      setStatus('success');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
    } catch (err) {
      setStatus('error');
      setSubmitError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
      setTimeout(() => setStatus('idle'), 8000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-ink-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-1 bg-brand-600 rounded-full" />
          <span className="text-sm font-semibold text-brand-600 uppercase tracking-wider">Contact</span>
        </div>
        <h2 className="section-title">Let's Talk</h2>
        <p className="section-sub">Have an opportunity or just want to connect? Send me a message.</p>

        <div className="mt-8 grid lg:grid-cols-5 gap-6">
          {/* Info */}
          <div className="lg:col-span-2 space-y-4">
            <a href={`mailto:${profile.email}`} className="card p-5 flex items-center gap-3 hover:shadow-card-hover transition block">
              <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-brand-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-ink-400">Email</p>
                <p className="text-sm font-medium text-ink-900 truncate">{profile.email}</p>
              </div>
            </a>

            <div className="card p-5 flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-accent-50 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-accent-600" />
              </div>
              <div>
                <p className="text-xs text-ink-400">Phone</p>
                <p className="text-sm font-medium text-ink-900">{profile.phone}</p>
              </div>
            </div>

            <div className="card p-5 flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-brand-600" />
              </div>
              <div>
                <p className="text-xs text-ink-400">Location</p>
                <p className="text-sm font-medium text-ink-900">{profile.location}</p>
              </div>
            </div>

            <div className="card p-5">
              <p className="text-sm font-medium text-ink-700 mb-3">Find me on</p>
              <div className="flex gap-2">
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn-secondary flex-1 py-2.5 text-sm">
                  <Github className="w-4 h-4" /> GitHub
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary flex-1 py-2.5 text-sm">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 card p-6 sm:p-8">
            {status === 'success' && (
              <div className="mb-4 flex items-center gap-2.5 bg-success-50 text-success-700 rounded-xl px-4 py-3 text-sm font-medium animate-fade-in-fast">
                <CheckCircle2 className="w-5 h-5 shrink-0" /> Message sent! I'll get back to you soon.
              </div>
            )}
            {status === 'error' && (
              <div className="mb-4 flex items-start gap-2.5 bg-error-50 text-error-700 rounded-xl px-4 py-3 text-sm font-medium animate-fade-in-fast">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" /> {submitError}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1.5">Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                    <input
                      className="w-full rounded-xl border border-ink-200 bg-white pl-10 pr-4 py-2.5 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 focus:outline-none transition"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      disabled={status === 'loading'}
                    />
                  </div>
                  {errors.name && <p className="text-xs text-error-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                    <input
                      type="email"
                      className="w-full rounded-xl border border-ink-200 bg-white pl-10 pr-4 py-2.5 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 focus:outline-none transition"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@email.com"
                      disabled={status === 'loading'}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-error-500 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1.5">Phone <span className="text-ink-400">(optional)</span></label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                    <input
                      className="w-full rounded-xl border border-ink-200 bg-white pl-10 pr-4 py-2.5 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 focus:outline-none transition"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 90000 00000"
                      disabled={status === 'loading'}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1.5">Subject</label>
                  <input
                    className="w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 focus:outline-none transition"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="What is this about?"
                    disabled={status === 'loading'}
                  />
                  {errors.subject && <p className="text-xs text-error-500 mt-1">{errors.subject}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1.5">Message</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-ink-400" />
                  <textarea
                    className="w-full rounded-xl border border-ink-200 bg-white pl-10 pr-4 py-2.5 text-sm min-h-[120px] resize-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 focus:outline-none transition"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Your message..."
                    disabled={status === 'loading'}
                  />
                </div>
                {errors.message && <p className="text-xs text-error-500 mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-3.5"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
