// components/sections/ProjectsSection.jsx
import RevealWrapper from '@/components/ui/RevealWrapper';

export default function ProjectsSection({ projects, sectionNumber }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="border-b border-rule bg-white">
      <div className="max-w-5xl mx-auto px-8 md:px-12 py-16 md:py-20">
        <RevealWrapper>
          <p className="section-label">{sectionNumber || '03'} — Applied Research</p>
          <h2 className="section-title">Selected Projects</h2>
        </RevealWrapper>

        <RevealWrapper delay={0.1}>
          <div className="flex flex-col gap-[1px] bg-rule border border-rule mt-12">
            {projects.filter(proj => proj.title).map((proj) => (
              <div key={proj.id} className="bg-mist hover:bg-white transition-colors duration-200 p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-4">
                  <div>
                    <h3 className="text-[20px] font-[700] text-ink mb-2">
                      {proj.url ? (
                        <a href={proj.url} target="_blank" rel="noopener noreferrer" className="hover:text-[#B5653A] transition-colors">
                          {proj.title} ↗
                        </a>
                      ) : proj.title}
                    </h3>
                    {/* Tags rendered as subtitle */}
                    <div className="flex flex-wrap gap-2">
                      {proj.tags.map(tag => (
                        <span key={tag} className="text-[13px] font-[600] text-[#B5653A] bg-[#B5653A]/10 px-2 py-0.5 rounded-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {proj.period && (
                    <span className="text-[13px] font-mono font-[600] text-slate/70 flex-shrink-0 bg-white border border-rule px-4 py-1.5 rounded-full shadow-sm">
                      {proj.period}
                    </span>
                  )}
                </div>
                
                {proj.description && (
                  <ul className="space-y-3 mt-4">
                    {proj.description.split('\n').map((line, i) => {
                      const cleanLine = line.replace(/^[•\-\*]\s*/, '').trim();
                      if (!cleanLine) return null;
                      return (
                        <li key={i} className="text-[15px] text-slate/80 leading-relaxed flex items-start gap-3">
                          <span className="text-[#B5653A] flex-shrink-0 mt-[2px] font-bold text-lg leading-none">·</span>
                          <span>{cleanLine}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
