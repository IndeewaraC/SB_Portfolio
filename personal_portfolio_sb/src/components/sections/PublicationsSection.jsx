// components/sections/PublicationsSection.jsx
import RevealWrapper from '@/components/ui/RevealWrapper';

export default function PublicationsSection({ publications, sectionNumber }) {
  if (!publications || publications.length === 0) return null;

  return (
    <section id="publications" className="border-b border-rule bg-mist">
      <div className="max-w-5xl mx-auto px-8 md:px-12 py-16 md:py-20">
        <RevealWrapper>
          <p className="section-label">{sectionNumber || '04'} — Academic Output</p>
          <h2 className="section-title">Research & Publications</h2>
        </RevealWrapper>

        <RevealWrapper delay={0.1}>
          <div className="flex flex-col gap-[1px] bg-rule border border-rule mt-12">
            {publications.filter(pub => pub.title).map((pub, i) => (
              <div key={pub.id} className="bg-white hover:bg-mist transition-colors duration-200 p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-4">
                  <div>
                    <h3 className="text-[20px] font-[700] text-ink mb-1">
                      <span className="text-slate/40 mr-3 font-mono">{String(i + 1).padStart(2, '0')}</span>
                      {pub.url ? (
                        <a href={pub.url} target="_blank" rel="noopener noreferrer" className="hover:text-[#B5653A] transition-colors">
                          {pub.title} ↗
                        </a>
                      ) : pub.title}
                    </h3>
                    <p className="text-[15px] font-[600] text-[#B5653A] uppercase tracking-wider">{pub.venue}</p>
                  </div>
                  {pub.year && (
                    <span className="text-[13px] font-mono font-[600] text-slate/70 flex-shrink-0 bg-mist border border-rule px-4 py-1.5 rounded-full shadow-sm">
                      {pub.year}
                    </span>
                  )}
                </div>
                
                {pub.abstract && (
                  <ul className="space-y-3">
                    {pub.abstract.split('\n').map((line, j) => {
                      const cleanLine = line.replace(/^[•\-\*]\s*/, '').trim();
                      if (!cleanLine) return null;
                      return (
                        <li key={j} className="text-[15px] text-slate/80 leading-relaxed flex items-start gap-3">
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
