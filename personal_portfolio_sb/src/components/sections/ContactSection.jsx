// components/sections/ContactSection.jsx
import RevealWrapper from '@/components/ui/RevealWrapper';

export default function ContactSection({ profile }) {
  return (
    <section id="contact" className="border-b border-rule bg-white">
      <div className="max-w-5xl mx-auto px-8 md:px-12 py-20 md:py-28">
        <RevealWrapper>
          <p className="section-label">08 — Get In Touch</p>

          <h2 className="font-display font-semibold text-ink leading-[1.1] tracking-tight mb-6"
            style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}>
            Let&apos;s work<br />together.
          </h2>

          <p className="text-[14px] text-slate leading-[1.8] max-w-[480px] mb-10">
            I am actively seeking applied data, analytics, and research-driven roles.
            Feel free to reach out for collaborations, opportunities, or research discussions.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="text-[12px] font-[500] tracking-[0.04em] uppercase
                px-6 py-[11px] bg-navy text-white rounded-[2px]
                hover:bg-[#0f2a46] transition-colors duration-200"
            >
              Send Email
            </a>

            {profile.linkedIn && (
              <a
                href={profile.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-[500] tracking-[0.04em] uppercase
                  px-6 py-[11px] border border-navy text-navy rounded-[2px]
                  hover:bg-navy-light transition-colors duration-200"
              >
                LinkedIn Profile
              </a>
            )}

            {profile.cvUrl && profile.cvUrl !== '#' && (
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-[500] tracking-[0.04em] uppercase
                  px-6 py-[11px] border border-rule text-slate rounded-[2px]
                  hover:border-navy hover:text-navy transition-colors duration-200"
              >
                Download CV
              </a>
            )}
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
