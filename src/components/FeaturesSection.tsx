import { Calendar, BarChart3, PieChart as PieChartIcon } from "lucide-react";

const bars = [
  { d: "Seg", v: 2 },
  { d: "Ter", v: 1 },
  { d: "Qua", v: 3 },
  { d: "Qui", v: 1 },
];

const FeaturesSection = () => {
  const max = 3;
  return (
    <section className="px-6 py-28 bg-secondary/40">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
            Pronto para transformar a sua
            <br />
            <span className="text-brand-gradient">estratégia no Instagram?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ── Calendário de Postagem ── */}
          <div className="rounded-3xl bg-card border border-border p-7 shadow-card-soft hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-start justify-between mb-6">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Calendário de Postagem</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 max-w-[220px] leading-relaxed">
                    Saiba quais dias da semana seus concorrentes estão mais ativos!
                  </p>
                </div>
              </div>
              <div className="text-[10px] font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-full border border-border">
                Esta semana ⌄
              </div>
            </div>

            {/* Bar chart */}
            <div className="flex items-end justify-between gap-3 h-40 px-2">
              {bars.map((b) => (
                <div key={b.d} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex items-end h-full">
                    <div
                      className="w-full rounded-t-lg bg-brand-gradient shadow-brand-glow/40"
                      style={{ height: `${(b.v / max) * 100}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-muted-foreground font-medium">{b.d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column: 2 stacked cards ── */}
          <div className="flex flex-col gap-6">
            {/* Benchmark */}
            <div className="rounded-3xl bg-card border border-border p-7 shadow-card-soft hover:-translate-y-1 transition-all duration-300">
              <div className="flex gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Benchmark Lado a Lado</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Compare seus números com os de concorrentes.
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {["B", "F"].map((l) => (
                  <div
                    key={l}
                    className="flex items-center justify-between rounded-xl bg-secondary/60 border border-border px-3 py-2.5"
                  >
                    <div className="w-7 h-7 rounded-full bg-brand-gradient text-primary-foreground text-xs font-semibold flex items-center justify-center">
                      {l}
                    </div>
                    <span className="text-muted-foreground text-sm">›</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Distribuição */}
            <div className="rounded-3xl bg-card border border-border p-7 shadow-card-soft hover:-translate-y-1 transition-all duration-300">
              <div className="flex gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <PieChartIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Distribuição de Conteúdo</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Mapeie o volume de cada tipo de conteúdo!
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                {/* Pie via conic-gradient */}
                <div className="relative">
                  <div
                    className="w-24 h-24 rounded-full"
                    style={{
                      background:
                        "conic-gradient(hsl(262 83% 58%) 0% 60%, hsl(270 90% 50%) 60% 85%, hsl(320 85% 70%) 85% 100%)",
                    }}
                  />
                  <div className="absolute inset-3 rounded-full bg-card" />
                  <div className="absolute -right-2 top-2 bg-card border border-border rounded-full px-2 py-0.5 text-[10px] font-semibold text-foreground shadow-card-soft">
                    60% Reels
                  </div>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-muted-foreground">60% Reels</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: "hsl(270 90% 50%)" }} />
                    <span className="text-muted-foreground">25% Carrossel</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: "hsl(320 85% 70%)" }} />
                    <span className="text-muted-foreground">15% Imagem</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
