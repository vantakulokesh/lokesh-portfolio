import { useState, useEffect, useRef } from 'react';
import { X, User, Briefcase, FileText, Mail, Phone, MapPin, Github, Linkedin, FileEdit, Upload, Save, AlertCircle, Loader2 } from 'lucide-react';
import { useProfile } from '../lib/useProfile';
import type { ProfileData } from '../lib/supabase';

type Props = {
  open: boolean;
  onClose: () => void;
};

type FormState = Omit<ProfileData, 'photo_url'> & { photo_url: string };

export function EditProfileModal({ open, onClose }: Props) {
  const { data, save, saving, error } = useProfile();
  const [form, setForm] = useState<FormState>({
    name: data.name,
    role: data.role,
    tagline: data.tagline,
    intro: data.intro,
    about: data.about,
    location: data.location,
    email: data.email,
    phone: data.phone,
    github: data.github,
    linkedin: data.linkedin,
    resume: data.resume,
    photo_url: data.photo_url ?? '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setForm({
        name: data.name,
        role: data.role,
        tagline: data.tagline,
        intro: data.intro,
        about: data.about,
        location: data.location,
        email: data.email,
        phone: data.phone,
        github: data.github,
        linkedin: data.linkedin,
        resume: data.resume,
        photo_url: data.photo_url ?? '',
      });
      setErrors({});
    }
  }, [open, data]);

  if (!open) return null;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.role.trim()) e.role = 'Professional title is required';
    if (!form.tagline.trim()) e.tagline = 'Short bio is required';
    if (!form.intro.trim()) e.intro = 'Intro is required';
    if (!form.about.trim()) e.about = 'About me is required';
    if (!form.location.trim()) e.location = 'Location is required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    if (!form.github.trim()) e.github = 'GitHub URL is required';
    if (!form.linkedin.trim()) e.linkedin = 'LinkedIn URL is required';
    if (!form.resume.trim()) e.resume = 'Resume path is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    await save({
      ...form,
      photo_url: form.photo_url || null,
    });
    onClose();
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((f) => ({ ...f, photo_url: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const field = (
    name: keyof FormState,
    label: string,
    icon: React.ReactNode,
    placeholder: string,
    opts?: { type?: string; textarea?: boolean; hint?: string }
  ) => {
    const err = errors[name];
    return (
      <div>
        <label className="block text-sm font-medium text-ink-700 mb-1.5">{label}</label>
        <div className="relative">
          <span className="absolute left-3 top-3 text-ink-400">{icon}</span>
          {opts?.textarea ? (
            <textarea
              className="w-full rounded-xl border border-ink-200 bg-white pl-10 pr-4 py-2.5 text-sm min-h-[80px] resize-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 focus:outline-none transition"
              value={form[name]}
              onChange={(e) => setForm({ ...form, [name]: e.target.value })}
              placeholder={placeholder}
            />
          ) : (
            <input
              type={opts?.type ?? 'text'}
              className="w-full rounded-xl border border-ink-200 bg-white pl-10 pr-4 py-2.5 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 focus:outline-none transition"
              value={form[name]}
              onChange={(e) => setForm({ ...form, [name]: e.target.value })}
              placeholder={placeholder}
            />
          )}
        </div>
        {opts?.hint && !err && <p className="text-xs text-ink-400 mt-1">{opts.hint}</p>}
        {err && (
          <p className="text-xs text-error-500 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {err}
          </p>
        )}
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink-900/50 backdrop-blur-sm animate-fade-in-fast"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-ink-100 animate-scale-in scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur border-b border-ink-100 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
              <FileEdit className="w-5 h-5 text-brand-600" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-ink-900">Edit Profile</h2>
              <p className="text-xs text-ink-400">Update your portfolio information</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-ink-500 hover:bg-ink-100 hover:text-ink-700 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="px-6 py-5 space-y-5">
          {/* Photo */}
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-ink-200 bg-ink-50 shrink-0">
              {form.photo_url ? (
                <img src={form.photo_url} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-ink-400">
                  <User className="w-8 h-8" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-ink-700 mb-1">Profile Photo</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="btn-secondary px-4 py-2 text-sm"
                >
                  <Upload className="w-4 h-4" /> Upload Photo
                </button>
                {form.photo_url && (
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, photo_url: '' })}
                    className="btn-ghost px-3 py-2 text-sm text-error-500 hover:bg-error-50"
                  >
                    Remove
                  </button>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
              <p className="text-xs text-ink-400 mt-1.5">Or use /profile.jpg in the public folder</p>
            </div>
          </div>

          {/* Name + Role */}
          <div className="grid sm:grid-cols-2 gap-4">
            {field('name', 'Full Name', <User className="w-4 h-4" />, 'Your full name')}
            {field('role', 'Professional Title', <Briefcase className="w-4 h-4" />, 'e.g. Frontend Developer')}
          </div>

          {/* Tagline + Location */}
          <div className="grid sm:grid-cols-2 gap-4">
            {field('tagline', 'Short Bio', <FileText className="w-4 h-4" />, 'One-line tagline')}
            {field('location', 'Location', <MapPin className="w-4 h-4" />, 'City, Country')}
          </div>

          {/* Intro */}
          {field('intro', 'Hero Intro', <FileText className="w-4 h-4" />, 'Intro paragraph shown in hero section', { textarea: true })}

          {/* About */}
          {field('about', 'About Me', <FileText className="w-4 h-4" />, 'About me paragraph', { textarea: true })}

          {/* Contact */}
          <div className="grid sm:grid-cols-2 gap-4">
            {field('email', 'Email', <Mail className="w-4 h-4" />, 'you@email.com', { type: 'email' })}
            {field('phone', 'Phone Number', <Phone className="w-4 h-4" />, '+91 90000 00000')}
          </div>

          {/* Socials */}
          <div className="grid sm:grid-cols-2 gap-4">
            {field('github', 'GitHub URL', <Github className="w-4 h-4" />, 'https://github.com/username')}
            {field('linkedin', 'LinkedIn URL', <Linkedin className="w-4 h-4" />, 'https://linkedin.com/in/username')}
          </div>

          {/* Resume */}
          {field('resume', 'Resume PDF', <FileEdit className="w-4 h-4" />, '/resume.pdf', { hint: 'Path or URL to your resume file' })}

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2.5 bg-warning-50 text-warning-700 rounded-xl px-4 py-3 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2 border-t border-ink-100">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1 py-3"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex-1 py-3"
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
