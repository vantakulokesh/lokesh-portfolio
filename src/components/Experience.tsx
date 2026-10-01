import { experience, education } from '../data';
import { Briefcase, GraduationCap, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

export function Experience() {
  return (
    <section id="experience" className="py-20 bg-ink-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-1 bg-brand-600 rounded-full" />
          <span className="text-sm font-semibold text-brand-600 uppercase tracking-wider">Experience</span>
        </div>
        <h2 className="section-title">My Journey</h2>
        <p className="section-sub">Internships and roles where I've grown my skills.</p>

        <div className="mt-8 relative">
          {/* Timeline line */}
          <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-ink-200" />

          {experience.map((exp) => (
            <div key={exp.role} className="relative pl-14 pb-8 last:pb-0">
              {/* Dot */}
              <div className="absolute left-0 top-1 w-11 h-11 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center shadow-sm">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div className="card p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <h3 className="font-display text-lg font-bold text-ink-900">{exp.role}</h3>
                  <span className="chip bg-brand-50 text-brand-700">{exp.period}</span>
                </div>
                <p className="text-sm font-medium text-ink-600 mb-4">{exp.company}</p>
                <ul className="space-y-2">
                  {exp.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-ink-600">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section id="education" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-1 bg-brand-600 rounded-full" />
          <span className="text-sm font-semibold text-brand-600 uppercase tracking-wider">Education</span>
        </div>
        <h2 className="section-title">Academic Background</h2>
        <p className="section-sub">My formal education in computer science.</p>

        <div className="mt-8 relative">
          <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-ink-200" />
          {education.map((e) => (
            <div key={e.degree} className="relative pl-14">
              <div className="absolute left-0 top-1 w-11 h-11 rounded-xl bg-gradient-to-br from-accent-500 to-brand-500 flex items-center justify-center shadow-sm">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div className="card p-5 sm:p-6">
                <h3 className="font-display text-lg font-bold text-ink-900">{e.degree}</h3>
                <p className="text-sm font-medium text-brand-600 mt-1">{e.institution}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-ink-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> {e.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> {e.period}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
