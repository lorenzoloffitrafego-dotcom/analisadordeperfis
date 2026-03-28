import { BarChart3, TrendingUp, Users, AlertCircle } from "lucide-react";

const features = [
  {
    title: "Escale sem perder controle",
    description: "Um dashboard para todos os seus perfis. Veja quem está engajado, quem não está — sem abrir um por um.",
    link: "Ver dashboard →",
    chart: (
      <div className="flex items-end gap-2 h-20 mt-4">
        {[35, 55, 40, 70, 50].map((v, i) => (
          <div key={i} className="flex-1 rounded-md bg-[hsl(270,80%,65%)]" style={{ height: `${v}%` }} />
        ))}
      </div>
    ),
  },
  {
    title: "Compare qualquer período",
    description: "Mês passado vs este mês. Semana passada vs a anterior. Qual grupo cresceu? Descubra.",
    link: "Explorar →",
    chart: (
      <div className="flex items-end gap-2 h-20 mt-4">
        {[
          { a: 30, b: 50 },
          { a: 45, b: 60 },
          { a: 55, b: 40 },
          { a: 35, b: 70 },
        ].map((v, i) => (
          <div key={i} className="flex-1 flex gap-1 items-end h-full">
            <div className="flex-1 rounded-sm bg-accent/30" style={{ height: `${v.a}%` }} />
            <div className="flex-1 rounded-sm bg-accent" style={{ height: `${v.b}%` }} />
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Reduza churn, comprove valor",
    description: "Identifique voluntários em risco antes que cancelem. Mostre com dados o retorno que sua comunidade gera.",
    link: "Saiba mais →",
    chart: (
      <div className="space-y-2 mt-4">
        {[
          { label: "Queda de engajamento", color: "bg-[hsl(25,90%,55%)]", w: "85%" },
          { label: "2 membros saíram", color: "bg-[hsl(45,90%,55%)]", w: "60%" },
          { label: "Executor dominando", color: "bg-[hsl(160,70%,45%)]", w: "40%" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`h-2 rounded-full ${item.color}`} style={{ width: item.w }} />
            <span className="text-[10px] text-muted-foreground whitespace-nowrap">{item.label}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Saiba antes, não depois",
    description: "Alertas de queda de engajamento, pólvora e riscos em massa. Você age antes de virar problema.",
    link: "Configurar alertas →",
    chart: (
      <div className="flex items-end gap-1.5 h-20 mt-4">
        {[20, 45, 35, 60, 75, 55, 80].map((v, i) => (
          <div key={i} className="flex-1 rounded-sm bg-accent" style={{ height: `${v}%`, opacity: 0.4 + i * 0.09 }} />
        ))}
      </div>
    ),
  },
];

const FeaturesSection = () => {
  return (
    <section className="px-6 py-24 bg-background">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-[hsl(25,90%,55%)] mb-3">
          Qualquer que seja seu ecossistema
        </p>
        <h2 className="text-center font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
          InstaInsight te dá <span className="text-foreground">superpoderes.</span>
        </h2>
        <p className="text-center text-muted-foreground text-base max-w-xl mx-auto mb-16">
          Da ideia à empresa, o InstaInsight se adapta à forma como você gerencia presença, transformando cada interação em um ativo.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl p-6 border border-border hover:border-border/80 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <h3 className="font-display font-bold text-lg text-foreground mb-1.5">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-1">{f.description}</p>
              <span className="text-xs font-semibold text-accent cursor-pointer hover:underline">{f.link}</span>
              {f.chart}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
