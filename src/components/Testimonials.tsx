const items = [
  { initials: "MR", name: "Marina Ribeiro", role: "Creator · @marinacria", color: "from-rose-400 to-pink-500", quote: "Finalmente consigo mostrar para meu cliente o que está funcionando. Antes era planilha, agora é InstaInsight." },
  { initials: "TS", name: "Thiago Souza", role: "Agência Norte", color: "from-violet-400 to-purple-600", quote: "Em 10 segundos tenho o comparativo que antes levava 2 horas para montar." },
  { initials: "AL", name: "Ana Lima", role: "Studio K · Social Media", color: "from-amber-400 to-orange-500", quote: "Descobri que meu concorrente postava nos melhores horários e eu não sabia. Mudei tudo." },
];

const Testimonials = () => (
  <section className="px-6 py-24">
    <div className="max-w-6xl mx-auto">
      <p className="text-center text-xs font-semibold tracking-[0.22em] uppercase text-rose-500 mb-4">Depoimentos</p>
      <h2 className="text-center text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-16">
        O que dizem quem já usa.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {items.map((t) => (
          <div key={t.name} className="rounded-2xl bg-card border border-border shadow-card-soft p-7">
            <p className="text-foreground leading-relaxed mb-6">"{t.quote}"</p>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} text-white text-xs font-bold flex items-center justify-center`}>
                {t.initials}
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
