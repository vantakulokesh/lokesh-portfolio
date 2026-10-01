import { about, education } from '../data';
import { CheckCircle2, GraduationCap, MapPin, Calendar, User, Pencil } from 'lucide-react';
import { useProfile } from '../lib/useProfile';

type Props = {
  onEdit?: () => void;
};

export function About({ onEdit }: Props) {
  const { data: profile } = useProfile();

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-1 bg-brand-600 rounded-full" />
            <span className="text-sm font-semibold text-brand-600 uppercase tracking-wider">About Me</span>
          </div>
          {onEdit && (
            <button
              onClick={onEdit}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-lg px-3 py-2 transition"
            >
              <Pencil className="w-3.5 h-3.5" /> Edit Profile
            </button>
          )}
        </div>
        <h2 className="section-title">Who I Am</h2>

        <div className="mt-8 grid lg:grid-cols-3 gap-6">
          {/* Description */}
          <div className="lg:col-span-2 card p-6 sm:p-8">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-brand-600" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-ink-900">Professional Introduction</h3>
              </div>
            </div>
            <p className="text-ink-600 leading-relaxed">{profile.about}</p>

            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {about.highlights.map((h) => (
                <div key={h} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-ink-700">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Education card */}
          <div className="card p-6 bg-gradient-to-br from-brand-50 to-accent-50 border-brand-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <GraduationCap className="w-5 h-5 text-brand-600" />
              </div>
              <h3 className="font-display text-lg font-bold text-ink-900">Education</h3>
            </div>
            {education.map((e) => (
              <div key={e.degree}>
                <p className="font-semibold text-ink-900">{e.degree}</p>
                <p className="text-sm text-ink-700 mt-1">{e.institution}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-ink-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {e.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {e.period}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
