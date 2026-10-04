// components/sections/SkillsStrip.jsx
// Academic version — understated marquee on mist background
const FALLBACK = [
  'R', 'Python', 'Machine Learning', 'Time Series Forecasting',
  'Deep Learning', 'LSTM · GRU · NNAR', 'SQL', 'Portfolio Optimization',
  'Volatility Modeling', 'Power BI', 'Bayesian Statistics', 'Fuzzy Logic',
];

export default function SkillsStrip({ skills }) {
  const tags   = skills?.flatMap((s) => s.tags) ?? [];
  const source = tags.length > 0 ? tags : FALLBACK;
  const doubled = [...source, ...source];

  return (
    <div className="bg-mist border-b border-rule py-[11px] overflow-hidden
      whitespace-nowrap select-none">
      <div className="inline-flex" style={{ animation: 'scrollStrip 35s linear infinite' }}>
        {doubled.map((tag, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="text-[12px] font-[400] tracking-[0.04em] text-slate/80 px-6">
              {tag}
            </span>
            <span className="text-navy/25 text-[10px]">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
