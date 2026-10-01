import { useState, useEffect } from 'react';
import { navLinks } from '../data';
import { Menu, X, Github, Linkedin, Mail, Settings } from 'lucide-react';
import { useProfile } from '../lib/useProfile';
import { useAdmin } from '../lib/useAdmin';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#home');
  const { data: profile } = useProfile();
  const { adminMode, toggleAdmin } = useAdmin();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map((l) => l.href.slice(1));
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActive(`#${id}`);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/85 backdrop-blur-md border-b border-ink-100 shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => handleClick('#home')}
          className="font-display font-bold text-lg text-ink-900 hover:text-brand-600 transition"
        >
          {profile.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}<span className="text-brand-600">.</span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleClick(link.href)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                  active === link.href
                    ? 'text-brand-600 bg-brand-50'
                    : 'text-ink-600 hover:text-ink-900 hover:bg-ink-50'
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Social + admin toggle + mobile toggle */}
        <div className="flex items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex p-2 rounded-lg text-ink-500 hover:text-brand-600 hover:bg-brand-50 transition"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex p-2 rounded-lg text-ink-500 hover:text-brand-600 hover:bg-brand-50 transition"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="hidden sm:flex p-2 rounded-lg text-ink-500 hover:text-brand-600 hover:bg-brand-50 transition"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
          <button
            onClick={toggleAdmin}
            className={`p-2 rounded-lg transition ${
              adminMode
                ? 'text-brand-600 bg-brand-50 ring-1 ring-brand-200'
                : 'text-ink-400 hover:text-ink-600 hover:bg-ink-50'
            }`}
            aria-label="Toggle edit mode"
            title={adminMode ? 'Exit edit mode' : 'Enter edit mode'}
          >
            <Settings className={`w-5 h-5 ${adminMode ? 'animate-spin-slow' : ''}`} style={adminMode ? { animationDuration: '3s' } : undefined} />
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg text-ink-700 hover:bg-ink-100 transition"
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-ink-100 animate-fade-in-fast">
          <ul className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleClick(link.href)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                    active === link.href
                      ? 'text-brand-600 bg-brand-50'
                      : 'text-ink-600 hover:bg-ink-50'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li className="flex gap-2 pt-2">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn-secondary flex-1 py-2.5 text-sm">
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary flex-1 py-2.5 text-sm">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
