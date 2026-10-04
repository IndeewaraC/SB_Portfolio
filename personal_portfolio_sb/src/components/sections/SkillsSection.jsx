// components/sections/SkillsSection.jsx
import RevealWrapper from '@/components/ui/RevealWrapper';

export default function SkillsSection({ skills, sectionNumber }) {
  if (!skills || skills.length === 0) return null;

  return (
    <section id="skills" className="relative py-20 md:py-32">
      {/* Soft gradient background blending */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mist/50 to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-8 md:px-12">
        <RevealWrapper>
          <p className="section-label">{sectionNumber || '05'} — Technical Skills</p>
          <h2 className="section-title">Skills & Expertise</h2>
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mt-16">
          {skills.filter(cat => cat.category).map((cat, i) => (
            <RevealWrapper key={cat.id} delay={i * 0.1}>
              <div className="flex flex-col">
                <h3 className="text-[18px] font-display font-[600] text-ink tracking-tight mb-5 flex items-center gap-3">
                  <span className="w-8 h-[1.5px] bg-[#B5653A]"></span>
                  {cat.category}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {cat.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-[14px] font-[500] text-slate/90 
                        bg-white/50 backdrop-blur-sm px-5 py-2 rounded-full 
                        border border-white/60 shadow-sm
                        hover:border-[#B5653A]/40 hover:text-[#B5653A] hover:bg-white 
                        hover:shadow-md hover:-translate-y-0.5 
                        transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
