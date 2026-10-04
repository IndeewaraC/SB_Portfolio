// components/sections/CertificationsSection.jsx
import RevealWrapper from '@/components/ui/RevealWrapper';

export default function CertificationsSection({ certifications, sectionNumber }) {
  if (!certifications || certifications.length === 0) return null;

  return (
    <section id="certifications" className="border-b border-rule bg-white">
      <div className="max-w-5xl mx-auto px-8 md:px-12 py-16 md:py-20">
        <RevealWrapper>
          <p className="section-label">{sectionNumber || '08'} — Credentials</p>
          <h2 className="section-title">Certifications</h2>
        </RevealWrapper>

        <RevealWrapper delay={0.1}>
          <div className="flex flex-col gap-[1px] bg-rule border border-rule mt-12">
            {certifications.filter(cert => cert.name).map((cert) => (
              <div key={cert.id} className="bg-mist hover:bg-white transition-colors duration-200 p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    <h3 className="text-[20px] font-[700] text-ink mb-1">{cert.name}</h3>
                    <p className="text-[15px] font-[600] text-[#B5653A]">{cert.issuer}</p>
                  </div>
                  {cert.date && (
                    <span className="text-[13px] font-mono font-[600] text-slate/70 flex-shrink-0 bg-white border border-rule px-4 py-1.5 rounded-full shadow-sm">
                      {cert.date}
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
