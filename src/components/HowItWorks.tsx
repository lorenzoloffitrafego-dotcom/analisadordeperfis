const steps = [
  { n: "01", title: "Insira os perfis", desc: "Insira o seu perfil e o de 2 concorrentes\n" },
  { n: "02", title: "Análise automática", desc: "Nosso sistema coleta métricas, compara os perfis e gera os insights automaticamente" },
  { n: "03", title: "Receba insights", desc: "Visualize tudo em um dashboard personalizado para você\n\n" },
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        {steps.map((s) => (
          <div key={s.n} className="text-center">
            <div className="text-5xl font-bold text-brand-gradient mb-5">{s.n}</div>
            <h3 className="font-semibold text-2xl text-foreground mb-3">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed text-slate-800 text-center">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
