import { navLinks } from '../data';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { useProfile } from '../lib/useProfile';

export function Footer() {
  const { data: profile } = useProfile();
  const scrollTo = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="bg-ink-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-display text-xl font-bold">
              {profile.name}<span className="text-brand-400">.</span>
            </h3>
            <p className="text-sm text-white/60 mt-2 max-w-xs">{profile.role}</p>
            <p className="text-sm text-white/40 mt-2 max-w-xs">{profile.tagline}</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white/80 mb-3">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => scrollTo(l.href)}
                    className="text-sm text-white/60 hover:text-brand-400 transition"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-white/80 mb-3">Connect</h4>
            <div className="flex gap-2">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/5 hover:bg-brand-600 transition" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/5 hover:bg-brand-600 transition" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={`mailto:${profile.email}`} className="p-2.5 rounded-xl bg-white/5 hover:bg-brand-600 transition" aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <a
              href={profile.resume}
              download
              className="mt-4 inline-flex items-center gap-2 text-sm text-brand-400 hover:text-brand-300 transition font-medium"
            >
              <ArrowUp className="w-4 h-4 rotate-45" /> Download Resume
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/30">Built with React & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
