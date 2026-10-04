// components/sections/EducationSection.jsx
import RevealWrapper from '@/components/ui/RevealWrapper';

export default function EducationSection({ education, sectionNumber }) {
  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="border-b border-rule bg-white">
      <div className="max-w-5xl mx-auto px-8 md:px-12 py-16 md:py-20">
        <RevealWrapper>
          <p className="section-label">{sectionNumber || '06'} — Academic Background</p>
          <h2 className="section-title">Education</h2>
        </RevealWrapper>

        <RevealWrapper delay={0.1}>
          <div className="flex flex-col gap-[1px] bg-rule border border-rule mt-12">
            {education.filter(entry => entry.school).map((entry) => (
              <div key={entry.id} className="bg-mist hover:bg-white transition-colors duration-200 p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-4">
                  <div>
                    <h3 className="text-[20px] font-[700] text-ink mb-1">{entry.school}</h3>
                    <p className="text-[15px] font-[600] text-[#B5653A]">
                      {entry.degree}{entry.field ? ` — ${entry.field}` : ''}
                    </p>
                  </div>
                  {(entry.startYear || entry.endYear) && (
                    <span className="text-[13px] font-mono font-[600] text-slate/70 flex-shrink-0 bg-white border border-rule px-4 py-1.5 rounded-full shadow-sm">
                      {entry.startYear && entry.endYear ? `${entry.startYear} – ${entry.endYear}` : (entry.startYear || entry.endYear)}
                    </span>
                  )}
                </div>
                
                {entry.gpa && (
                  <ul className="space-y-3">
                    <li className="text-[15px] text-slate/80 leading-relaxed flex items-start gap-3">
                      <span className="text-[#B5653A] flex-shrink-0 mt-[2px] font-bold text-lg leading-none">·</span>
                      <span>GPA: {entry.gpa} / {entry.gpaScale}</span>
                    </li>
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
