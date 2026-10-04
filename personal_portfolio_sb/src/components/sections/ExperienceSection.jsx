// components/sections/ExperienceSection.jsx
import RevealWrapper from '@/components/ui/RevealWrapper';

export default function ExperienceSection({ experience, sectionNumber }) {
  if (!experience || experience.length === 0) {
    return (
      <section id="experience" className="border-b border-rule bg-white">
        <div className="max-w-5xl mx-auto px-8 md:px-12 py-16 md:py-20">
          <p className="section-label">{sectionNumber || '02'} — Professional Experience</p>
          <h2 className="section-title">Experience</h2>
          <div className="p-8 text-center text-slate italic bg-mist border border-dashed border-rule rounded-2xl">
            Content for Experience will be added here.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="border-b border-rule bg-white">
      <div className="max-w-5xl mx-auto px-8 md:px-12 py-16 md:py-20">
        <RevealWrapper delay={0.1}>
          <p className="section-label">{sectionNumber || '02'} — Professional Experience</p>
          <h2 className="section-title">Experience</h2>

          <div className="flex flex-col gap-[1px] bg-rule border border-rule">
            {experience.filter(exp => exp.role).map((exp) => (
              <div key={exp.id} className="bg-mist hover:bg-white transition-colors duration-200 p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-4">
                  <div>
                    <h3 className="text-[20px] font-[700] text-ink mb-1">{exp.role}</h3>
                    <p className="text-[15px] font-[600] text-[#B5653A]">{exp.company}</p>
                  </div>
                  {exp.period && (
                    <span className="text-[13px] font-mono font-[600] text-slate/70 flex-shrink-0 bg-white border border-rule px-4 py-1.5 rounded-full shadow-sm">
                      {exp.period}
                    </span>
                  )}
                </div>
                
                {exp.desc && (
                  <ul className="space-y-3">
                    {exp.desc.split('\n').map((line, i) => {
                      // Removes any existing bullets the user might have typed so we don't get double bullets
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
