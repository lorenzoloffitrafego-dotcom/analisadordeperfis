import { Check, Loader2, Sparkles } from "lucide-react";

const steps = [
  {
    n: "01",
    title: "Insira os perfis",
    desc: "Adicione até 3 handles do Instagram que deseja comparar — o seu e os dos concorrentes.",
    visual: (
      <div className="rounded-lg bg-background border border-border px-3.5 py-2.5 flex items-center gap-2">
        <span className="text-sm text-muted-foreground">@</span>
        <span className="text-sm text-foreground font-medium">perfil</span>
        <span className="w-px h-4 bg-foreground animate-pulse ml-0.5" />
      </div>
    ),
  },
  {
    n: "02",
    title: "Análise automática",
    desc: "Nosso sistema coleta e compara métricas de engajamento, crescimento e conteúdo em tempo real.",
    visual: (
      <div className="space-y-2.5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-rose-500" />
          Processando perfis…
        </div>
        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
          <div className="h-full w-2/3 bg-brand-gradient rounded-full" />
        </div>
      </div>
    ),
  },
  {
    n: "03",
    title: "Receba insights",
    desc: "Obtenha dados claros e acionáveis. Descubra o que funciona e melhore sua estratégia.",
    visual: (
      <div className="space-y-2">
        <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 font-medium">
          <Check className="w-3 h-3" /> Insight gerado
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-rose-50 text-rose-700 border border-rose-100 font-medium ml-1">
          <Sparkles className="w-3 h-3" /> +3 oportunidades
        </span>
      </div>
    ),
  },
];

const HowItWorks = () => (
  <section className="px-6 py-24 bg-secondary/30">
    <div className="max-w-6xl mx-auto">
      <p className="text-center text-xs font-semibold tracking-[0.22em] uppercase text-rose-500 mb-4">
        Como funciona
      </p>
      <h2 className="text-center text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
        Simples. Rápido.{" "}
        <span className="font-display italic font-medium text-brand-gradient">Fácil.</span>
      </h2>
      <p className="text-center text-muted-foreground mb-16">Três passos para transformar perfis em estratégia.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {steps.map((s) => (
          <div key={s.n} className="rounded-2xl bg-card border border-border shadow-card-soft p-7 hover:-translate-y-0.5 transition">
            <div className="font-display italic text-5xl font-medium text-brand-gradient mb-4">{s.n}</div>
            <h3 className="font-bold text-lg text-foreground mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">{s.desc}</p>
            {s.visual}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
