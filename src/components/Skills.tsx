import { skillCategories } from '../data';
import * as Icons from 'lucide-react';

export function Skills() {
  return (
    <section id="skills" className="py-20 bg-ink-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-1 bg-brand-600 rounded-full" />
          <span className="text-sm font-semibold text-brand-600 uppercase tracking-wider">Skills</span>
        </div>
        <h2 className="section-title">What I Work With</h2>
        <p className="section-sub">Technologies and tools I use to design and build web experiences.</p>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat) => {
            const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[cat.icon] || Icons.Code2;
            return (
              <div key={cat.name} className="card p-6 hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center shadow-sm">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-ink-900">{cat.name}</h3>
                </div>
                <div className="space-y-4">
                  {cat.skills.map((s) => (
                    <div key={s.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-ink-700">{s.name}</span>
                        <span className="text-xs text-ink-400">{s.level}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-ink-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all duration-700"
                          style={{ width: `${s.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
