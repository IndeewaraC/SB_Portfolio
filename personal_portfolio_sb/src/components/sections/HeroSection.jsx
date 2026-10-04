// components/sections/HeroSection.jsx
import Image from 'next/image';

export default function HeroSection({ profile, stats = [] }) {
  const parts     = profile.name?.trim().split(' ') ?? ['Sulalitha', 'Bowala'];
  const firstName = parts[0];
  const lastName  = parts.slice(1).join(' ');
  const initials  = parts.map((n) => n[0]).join('').slice(0, 2);

  // Calculate dynamic grid columns based on number of stats (max 4 columns)
  const gridCols = stats.length === 0 ? 1 : Math.min(stats.length, 4);

  return (
    <section
      id="hero"
      className="pt-[72px] border-b border-rule relative overflow-hidden"
    >
      {/* Background Blobs for vibrant feel */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-vibrant-purple/30 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-vibrant-pink/30 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-vibrant-blue/30 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000"></div>

      {/* ── Hero content ─────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-8 md:px-12 py-20 md:py-28
        grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-20 items-center relative z-10">

        {/* Left — text */}
        <div className="order-2 md:order-1">
          {/* Eyebrow */}
          <p
            className="text-[12px] font-[600] tracking-[0.15em] uppercase text-vibrant-blue mb-6"
            style={{ animation: 'fadeUp 0.8s ease forwards 0.1s', opacity: 0 }}
          >
            {profile.statusBadge || 'PhD Candidate · University of Manitoba · Winnipeg, Canada'}
          </p>

          {/* Name */}
          <h1
            className="font-display font-bold text-ink leading-[1.05] tracking-tight mb-6"
            style={{
              fontSize: 'clamp(48px, 8vw, 84px)',
              animation: 'fadeUp 0.8s ease forwards 0.2s',
              opacity: 0,
            }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ink to-slate">
              {firstName}
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-vibrant-gradient">
              {lastName}
            </span>
          </h1>

          {/* Sub-title / Tagline */}
          <p
            className="font-display italic text-[20px] md:text-[24px] text-slate mb-6 font-medium"
            style={{ animation: 'fadeUp 0.8s ease forwards 0.3s', opacity: 0 }}
          >
            {profile.tagline || 'Biostatistician | Health Data Scientist'}
          </p>

          {/* Contact Details & Icons */}
          <div
            className="flex flex-col gap-3 mb-8"
            style={{ animation: 'fadeUp 0.8s ease forwards 0.35s', opacity: 0 }}
          >
            <div className="flex items-center gap-2 text-slate/90">
              <svg className="w-5 h-5 text-[#B5653A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <span className="text-[16px] font-medium">{profile.location || 'Canada'}</span>
            </div>
            
            <div className="flex items-center gap-2 text-slate/90">
              <svg className="w-5 h-5 text-[#B5653A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <a href={`mailto:${profile.email || 'mudithabodawattegedara@gmail.com'}`} className="text-[16px] font-medium hover:text-[#B5653A] transition-colors">
                {profile.email || 'mudithabodawattegedara@gmail.com'}
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-5 mt-4">
              {/* Email Icon */}
              <a href={`mailto:${profile.email || 'mudithabodawattegedara@gmail.com'}`} className="text-slate hover:text-[#B5653A] transition-colors" title="Email">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </a>
              {/* LinkedIn */}
              <a href={profile.linkedInUrl || '#'} target="_blank" rel="noopener noreferrer" className="text-slate hover:text-[#B5653A] transition-colors" title="LinkedIn">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              {/* Google Scholar */}
              <a href={profile.scholarUrl || '#'} target="_blank" rel="noopener noreferrer" className="text-slate hover:text-[#B5653A] transition-colors" title="Google Scholar">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.911L12 18l7.162-4.589L24 9.5z"/></svg>
              </a>
              {/* ResearchGate */}
              <a href={profile.researchGateUrl || '#'} target="_blank" rel="noopener noreferrer" className="text-slate hover:text-[#B5653A] transition-colors flex items-center justify-center font-bold text-[18px] border-[2px] border-current w-7 h-7 rounded-sm" title="ResearchGate">
                <span style={{lineHeight: 1, paddingTop: '1px'}}>R</span>
              </a>
            </div>
          </div>

          {/* CTAs */}
          <div
            className="flex flex-wrap items-center gap-4"
            style={{ animation: 'fadeUp 0.8s ease forwards 0.5s', opacity: 0 }}
          >
            {profile.cvUrl && profile.cvUrl !== '#' && (
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] font-[600] tracking-[0.05em] uppercase
                  px-8 py-4 bg-vibrant-gradient text-white rounded-full
                  hover:shadow-lg hover:shadow-vibrant-blue/30 transform hover:-translate-y-1 transition-all duration-300"
              >
                Download CV
              </a>
            )}
            <a
              href="#publications"
              className="text-[14px] font-[600] tracking-[0.05em] uppercase
                px-8 py-4 border-2 border-slate/20 text-ink rounded-full bg-white/50 backdrop-blur-sm
                hover:border-vibrant-purple hover:text-vibrant-purple hover:bg-white transform hover:-translate-y-1 transition-all duration-300"
            >
              View Research
            </a>
          </div>
        </div>

        {/* Right — Profile photo */}
        <div
          className="relative block group mx-auto md:mx-0 mb-4 md:mb-0 order-1 md:order-2"
          style={{ animation: 'fadeUp 0.8s ease forwards 0.4s', opacity: 0 }}
        >
          {/* Glowing backdrop */}
          <div className="absolute inset-0 bg-vibrant-gradient rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>

          {/* Offset shadow frame */}
          <div className="absolute top-4 left-4 right-[-16px] bottom-[-16px]
            border-2 border-vibrant-blue/20 rounded-3xl transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />

          {/* Photo frame */}
          <div className="relative w-[240px] h-[300px] md:w-[360px] md:h-[440px] border-4 border-white shadow-xl
            rounded-3xl overflow-hidden bg-mist/80 backdrop-blur-sm transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:-translate-x-2">

            {profile.profileImage?.url ? (
              <Image
                src={profile.profileImage.url}
                alt={profile.name}
                fill
                sizes="280px"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                priority
              />
            ) : (
              /* Monogram placeholder */
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-mist to-slate/10">
                <span className="font-display text-6xl font-bold text-transparent bg-clip-text bg-vibrant-gradient">
                  {initials}
                </span>
                <span className="text-[12px] tracking-[0.15em] uppercase text-slate/50 font-semibold">
                  Add photo
                </span>
              </div>
            )}
          </div>

          {/* Floating Credential tag */}
          <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-md shadow-lg border border-white px-6 py-3 rounded-2xl transform transition-transform duration-500 hover:scale-105">
            <p className="text-[12px] tracking-[0.15em] uppercase text-vibrant-purple font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-vibrant-pink status-dot"></span>
              PhD · Statistics
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
