export default function PlaceholderSection({ id, title, eyebrow }) {
  return (
    <section id={id} className="border-b border-rule/50 py-24 bg-white/40 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-8 md:px-12">
        {eyebrow && <p className="section-label">{eyebrow}</p>}
        <h2 className="section-title text-vibrant-purple uppercase tracking-widest text-2xl md:text-3xl font-bold mb-12">
          {title}
        </h2>
        <div className="text-center text-slate/70 italic p-12 border border-dashed border-rule rounded-2xl">
          Content for {title} will be added here.
        </div>
      </div>
    </section>
  );
}
