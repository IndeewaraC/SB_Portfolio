// components/sections/AwardsSection.jsx
import RevealWrapper from '@/components/ui/RevealWrapper';

export default function AwardsSection({ awards, sectionNumber }) {
  if (!awards || awards.length === 0) return null;

  return (
    <section id="awards" className="border-b border-rule bg-mist">
      <div className="max-w-5xl mx-auto px-8 md:px-12 py-16 md:py-20">
        <RevealWrapper>
          <p className="section-label">{sectionNumber || '07'} — Recognition</p>
          <h2 className="section-title">Honors &amp; Awards</h2>
        </RevealWrapper>

        <RevealWrapper delay={0.1}>
          <div className="flex flex-col gap-[1px] bg-rule border border-rule mt-12">
            {awards.filter(award => award.name).map((award) => (
              <div key={award.id} className="bg-white hover:bg-mist transition-colors duration-200 p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div className="flex gap-4 items-start md:items-center">
                    <span className="text-[24px] leading-none mt-[2px] md:mt-0">{award.icon}</span>
                    <div>
                      <h3 className="text-[20px] font-[700] text-ink mb-1">{award.name}</h3>
                      <p className="text-[15px] font-[600] text-[#B5653A]">{award.issuer}</p>
                    </div>
                  </div>
                  {award.date && (
                    <span className="text-[13px] font-mono font-[600] text-slate/70 flex-shrink-0 bg-mist border border-rule px-4 py-1.5 rounded-full shadow-sm">
                      {award.date}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
