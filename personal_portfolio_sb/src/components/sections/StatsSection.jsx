// components/sections/StatsSection.jsx

export default function StatsSection({ stats = [] }) {
  if (!stats || stats.length === 0) return null;
  const gridCols = Math.min(stats.length, 4);

  const gridMap = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  };
  const desktopGridClass = gridMap[gridCols] || 'md:grid-cols-4';

  return (
    <section id="stats" className="border-b border-rule bg-white relative z-10 scroll-mt-[72px]">
      <div className={`max-w-5xl mx-auto px-8 md:px-12 grid grid-cols-2 ${desktopGridClass} divide-x divide-rule/50`}>
        {stats.map((stat, i) => (
          <StatItem key={stat.id} value={stat.value} label={stat.label} delay={`${0.1 + i * 0.1}s`} />
        ))}
      </div>
    </section>
  );
}

function StatItem({ value, label, delay }) {
  return (
    <div 
      className="py-10 px-6 md:px-8 text-center group"
      style={{ animation: `fadeUp 0.8s ease forwards ${delay}`, opacity: 0 }}
    >
      <div className="font-display text-[36px] md:text-[42px] font-bold
        text-transparent bg-clip-text bg-gradient-to-r from-ink to-vibrant-blue leading-none mb-2 transform transition-transform duration-300 group-hover:scale-110">
        {value}
      </div>
      <div className="text-[12px] font-[600] tracking-[0.1em] uppercase text-slate/80">
        {label}
      </div>
    </div>
  );
}
