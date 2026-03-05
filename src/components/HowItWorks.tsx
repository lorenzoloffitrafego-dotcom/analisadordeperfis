import { Search, GitCompareArrows, Lightbulb } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-5 h-5" />,
    step: "01",
    title: "Insira os perfis",
    description: "Adicione seu perfil e os perfis dos concorrentes que deseja comparar.",
  },
  {
    icon: <GitCompareArrows className="w-5 h-5" />,
    step: "02",
    title: "Análise automática",
    description: "Nosso sistema coleta e compara métricas de engajamento, crescimento e conteúdo.",
  },
  {
    icon: <Lightbulb className="w-5 h-5" />,
    step: "03",
    title: "Receba insights",
    description: "Obtenha recomendações claras e acionáveis para melhorar sua estratégia.",
  },
];

const HowItWorks = () => {
  return (
    <section className="px-6 py-24 bg-secondary/50">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
          Como funciona
        </p>
        <h2 className="text-center font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-16">
          Simples. Rápido. Eficiente.
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.step} className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-card tactile-shadow flex items-center justify-center text-foreground mx-auto mb-5">
                {s.icon}
              </div>
              <span className="text-xs font-mono text-accent font-bold tracking-wider">{s.step}</span>
              <h3 className="font-display font-semibold text-lg text-foreground mt-1 mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
