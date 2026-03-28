import { Search, Settings, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-8 h-8 text-[hsl(160,70%,42%)]" />,
    title: "Insira os perfis",
    description: "Adicione seu perfil e os perfis dos concorrentes que deseja comparar.",
    mockup: (
      <div className="bg-secondary/60 rounded-xl px-4 py-2.5 flex items-center gap-2 w-48 mx-auto md:mx-0">
        <Search className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">@perfil</span>
      </div>
    ),
  },
  {
    icon: <Settings className="w-8 h-8 text-[hsl(160,70%,42%)]" />,
    title: "Análise automática",
    description: "Nosso sistema coleta e compara métricas de engajamento, crescimento e conteúdo.",
    mockup: (
      <div className="flex gap-1.5 justify-center md:justify-start">
        {[40, 65, 50, 80].map((v, i) => (
          <div key={i} className="w-6 rounded bg-[hsl(160,70%,42%)]/70" style={{ height: `${v * 0.5}px` }} />
        ))}
      </div>
    ),
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-accent" />,
    title: "Receba insights",
    description: "Obtenha dados claros e acionáveis para melhorar sua estratégia.",
    mockup: (
      <div className="flex gap-1 justify-center md:justify-start">
        {[25, 55, 45, 70, 60].map((v, i) => (
          <div key={i} className="w-5 rounded-sm bg-accent/60" style={{ height: `${v * 0.45}px` }} />
        ))}
      </div>
    ),
  },
];

const HowItWorks = () => {
  return (
    <section className="px-6 py-24 bg-secondary/20">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-3">
          Como funciona
        </p>
        <h2 className="text-center font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-16">
          Simples. Rápido. Fácil.
        </h2>

        <div className="space-y-10">
          {steps.map((s, i) => {
            const isEven = i % 2 === 1;
            return (
              <div
                key={i}
                className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? "md:flex-row-reverse" : ""}`}
              >
                {/* Text side */}
                <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"} text-center`}>
                  <h3 className="font-display font-bold text-xl text-foreground mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto md:mx-0" style={isEven ? { marginLeft: "auto" } : {}}>
                    {s.description}
                  </p>
                </div>

                {/* Card side */}
                <div className="flex-1 flex justify-center">
                  <div className="w-56 h-36 rounded-2xl bg-card border border-border shadow-sm flex flex-col items-center justify-center gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                    {s.icon}
                    {s.mockup}
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
