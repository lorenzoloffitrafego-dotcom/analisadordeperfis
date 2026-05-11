const steps = [
  { n: "01", title: "Insira os perfis", desc: "Obtenha dados claros e acionáveis para melhorar sua estratégia." },
  { n: "02", title: "Análise automática", desc: "Consectetur adipiscing elit. Nossos algoritmos processam os dados." },
  { n: "03", title: "Receba insights", desc: "Sed do eiusmod tempor. Visualize tudo em um dashboard claro." },
];

const HowItWorks = () => (
  <section className="px-6 py-28 bg-secondary/40">
    <div className="max-w-5xl mx-auto text-lg">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
          Como funciona
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Três passos simples para começar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {steps.map((s) => (
          <div key={s.n} className="text-center md:text-left">
            <div className="text-5xl font-bold text-brand-gradient mb-4">{s.n}</div>
            <h3 className="font-semibold text-lg text-foreground mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed text-slate-800">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
