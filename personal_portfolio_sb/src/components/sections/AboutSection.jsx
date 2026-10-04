// components/sections/AboutSection.jsx
import RevealWrapper from '@/components/ui/RevealWrapper';

export default function AboutSection({ profile, sectionNumber }) {
  return (
    <section id="about" className="border-b border-rule bg-white">
      <div className="max-w-5xl mx-auto px-8 md:px-12 py-16 md:py-24">

        {/* ── Bio ─────────────────────────────────────────────────────── */}
        <RevealWrapper>
          <p className="section-label">{sectionNumber || '01'} — Profile</p>
          <h2 className="section-title">About Me</h2>

          {profile.about?.split('\n\n').filter(Boolean).map((para, i) => (
            <p key={i} className="text-[15px] text-slate leading-[1.85] mb-6">
              {para}
            </p>
          ))}

        </RevealWrapper>
      </div>
    </section>
  );
}
