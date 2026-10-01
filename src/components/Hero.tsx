import { ArrowRight, Download, Mail, Github, Linkedin, MapPin, Sparkles } from 'lucide-react';
import { useProfile } from '../lib/useProfile';

export function Hero() {
  const { data: profile } = useProfile();
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  const photoSrc = profile.photo_url || '/profile.jpg';
  const initials = profile.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-200/30 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-200/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-center">
          {/* Text */}
          <div className="lg:col-span-3 animate-fade-in">
            <div className="inline-flex items-center gap-2 chip bg-brand-50 text-brand-700 mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              Available for opportunities
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink-900 leading-tight">
              Hi, I'm <span className="text-gradient">{profile.name}</span>
            </h1>
            <p className="mt-3 text-lg sm:text-xl font-semibold text-ink-700">
              {profile.role}
            </p>
            <p className="mt-4 text-ink-500 max-w-lg leading-relaxed">
              {profile.tagline}
            </p>
            <p className="mt-2 text-sm text-ink-400 max-w-lg leading-relaxed">
              {profile.intro}
            </p>

            {/* Buttons */}
            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={() => scrollTo('#projects')} className="btn-primary px-5 py-3">
                View My Projects <ArrowRight className="w-4 h-4" />
              </button>
              <a href={profile.resume} download className="btn-accent px-5 py-3">
                <Download className="w-4 h-4" /> Download Resume
              </a>
              <button onClick={() => scrollTo('#contact')} className="btn-secondary px-5 py-3">
                <Mail className="w-4 h-4" /> Contact Me
              </button>
            </div>

            {/* Social */}
            <div className="mt-7 flex items-center gap-3">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-ink-50 text-ink-600 hover:bg-brand-50 hover:text-brand-600 transition" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-ink-50 text-ink-600 hover:bg-brand-50 hover:text-brand-600 transition" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={`mailto:${profile.email}`} className="p-2.5 rounded-xl bg-ink-50 text-ink-600 hover:bg-brand-50 hover:text-brand-600 transition" aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
              <span className="text-sm text-ink-400 ml-1 flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {profile.location}
              </span>
            </div>
          </div>

          {/* Profile image */}
          <div className="lg:col-span-2 flex justify-center animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500 to-accent-500 rounded-3xl blur-2xl opacity-20 animate-float" />
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border border-ink-100 shadow-soft">
                <img
                  src={photoSrc}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.onerror = null;
                    img.src = 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320"><rect width="320" height="320" fill="#e0e7ff"/><text x="160" y="170" font-size="80" font-family="sans-serif" font-weight="bold" fill="#4f46e5" text-anchor="middle">${initials}</text></svg>`);
                  }}
                />
              </div>
              {/* Floating badges */}
              <div className="absolute -top-3 -right-3 bg-white rounded-xl shadow-soft border border-ink-100 px-3 py-2 animate-float" style={{ animationDelay: '1s' }}>
                <p className="text-xs font-semibold text-ink-700">UI/UX</p>
              </div>
              <div className="absolute -bottom-3 -left-3 bg-white rounded-xl shadow-soft border border-ink-100 px-3 py-2 animate-float" style={{ animationDelay: '2s' }}>
                <p className="text-xs font-semibold text-ink-700">React</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
