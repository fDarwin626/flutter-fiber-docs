export default function GuideSection({
  id,
  kicker,
  title,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="px-5 sm:px-8 md:px-12 py-20 border-b border-border"
    >
      <p className="font-mono text-xs text-text-dim mb-3">// {kicker}</p>
      <h2 className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-text mb-6">
        {title}
      </h2>
      <div className="max-w-3xl flex flex-col gap-6 font-sans text-sm sm:text-base text-text-dim leading-relaxed">
        {children}
      </div>
    </section>
  );
}