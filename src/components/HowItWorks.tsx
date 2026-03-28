import { Search, Settings, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-10 h-10 text-[hsl(160,80%,45%)]" />,
    title: "Insira os perfis",
    description: "Adicione seu perfil e os perfis dos concorrentes que deseja comparar.",
  },
  {
    icon: <Settings className="w-10 h-10 text-[hsl(160,80%,45%)]" />,
    title: "Análise automática",
    description: "Nosso sistema coleta e compara métricas de engajamento, crescimento e conteúdo.",
  },
  {
    icon: <BarChart3 className="w-10 h-10 text-accent" />,
    title: "Receba insights",
    description: "Obtenha dados claros e acionáveis para melhorar sua estratégia.",
  },
];

const HowItWorks = () => {
  return (
    <section className="px-6 py-24 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-sm font-medium tracking-widest uppercase text-muted-foreground mb-3">
          Como funciona
        </p>
        <h2 className="text-center font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-16">
          Simples. Rápido. Fácil.
        </h2>

        <div className="space-y-8">
          {steps.map((s, i) => {
            const isEven = i % 2 === 1;
            return (
              <div
                key={i}
                className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? "md:flex-row-reverse" : ""}`}
              >
                {/* Text */}
                <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"} text-center`}>
                  <h3 className="font-display font-bold text-xl text-foreground mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto md:mx-0 ${isEven ? 'md:ml-auto' : ''}">
                    {s.description}
                  </p>
                </div>

                {/* Icon Card */}
                <div className="flex-1 flex justify-center">
                  <div className="w-48 h-32 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-center hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    {s.icon}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
