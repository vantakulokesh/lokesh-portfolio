import { useState } from 'react';
import { projects } from '../data';
import { Github, ExternalLink, LayoutGrid } from 'lucide-react';

const categories = ['All', 'Web App', 'Full Stack', 'UI/UX'];

export function Projects() {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-1 bg-brand-600 rounded-full" />
          <span className="text-sm font-semibold text-brand-600 uppercase tracking-wider">Projects</span>
        </div>
        <h2 className="section-title">Things I've Built</h2>
        <p className="section-sub">A selection of projects showcasing my frontend and full-stack work.</p>

        {/* Filter */}
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === c
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-ink-50 text-ink-600 hover:bg-ink-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <article
              key={p.id}
              className="card overflow-hidden hover:shadow-card-hover transition-all duration-200 hover:-translate-y-1 flex flex-col group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-ink-100">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="chip bg-white/90 backdrop-blur text-ink-700">{p.category}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display text-lg font-bold text-ink-900 mb-2">{p.name}</h3>
                <p className="text-sm text-ink-500 leading-relaxed flex-1">{p.description}</p>

                {/* Tech */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span key={t} className="chip bg-brand-50 text-brand-700">{t}</span>
                  ))}
                </div>

                {/* Links */}
                <div className="mt-5 flex gap-2">
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex-1 py-2.5 text-sm"
                  >
                    <ExternalLink className="w-4 h-4" /> View Project
                  </a>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary px-3 py-2.5"
                    aria-label="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-8 card p-10 text-center">
            <LayoutGrid className="w-10 h-10 text-ink-300 mx-auto mb-2" />
            <p className="text-ink-500">No projects in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
