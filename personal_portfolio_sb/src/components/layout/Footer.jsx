// components/layout/Footer.jsx
export default function Footer({ profile }) {
  return (
    <footer className="border-t border-rule bg-mist">
      <div className="max-w-5xl mx-auto px-8 md:px-12 py-10
        flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

        {/* Left — name + title */}
        <div>
          <p className="font-display text-[15px] font-semibold text-ink tracking-tight">
            Sulalitha Bowala
          </p>
          <p className="text-[12px] text-slate mt-1">
            PhD in Statistics · University of Manitoba · Winnipeg, Canada
          </p>
        </div>

        {/* Right — links */}
        <div className="flex items-center gap-5">
          {profile?.email && (
            <a href={`mailto:${profile.email}`}
              className="text-[12px] text-slate hover:text-navy transition-colors duration-200">
              {profile.email}
            </a>
          )}
          {profile?.linkedIn && (
            <a href={profile.linkedIn} target="_blank" rel="noopener noreferrer"
              className="text-[12px] text-slate hover:text-navy transition-colors duration-200">
              LinkedIn
            </a>
          )}
          <span className="text-[12px] text-slate/50">
            © {new Date().getFullYear()} {profile?.name || 'Sulalitha Bowala'} • {profile?.tagline || 'Biostatistician | Health Data Scientist'}
          </span>
        </div>
      </div>
    </footer>
  );
}
