import { Calendar, BarChart3, PieChart as PieChartIcon, ChevronDown, ChevronRight } from "lucide-react";

const bars = [
  { d: "Seg", v: 2, color: "hsl(262 70% 55%)" },        // purple
  { d: "Ter", v: 1, color: "hsl(290 75% 70%)" },        // lavender/pink
  { d: "Qua", v: 3, color: "hsl(320 90% 60%)" },        // magenta (tallest)
  { d: "Qui", v: 1, color: "hsl(255 65% 50%)" },        // indigo
];

const FeaturesSection = () => {
  const max = 3;
  const yTicks = [3, 2, 1];

  return (
    <section className="px-6 py-24 bg-secondary/40">
      <div className="max-w-5xl mx-auto text-lg">
        <h2 className="text-center text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.15] mb-12">
          Pronto para transformar a sua
          <br />
          estratégia no Instagram?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
          {/* ── Calendário de Postagem (tall, left) ── */}
          <div className="md:col-span-3 rounded-3xl bg-card border border-border p-6 shadow-card-soft">
            <div className="flex items-start justify-between mb-6">
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-[15px]">Calendário de Postagem</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5 max-w-[240px] leading-snug">
                    Saiba quais dias da semana seus concorrentes estão mais ativos!
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-full border border-border">
                Esta semana <ChevronDown className="w-3 h-3" />
              </div>
            </div>

            {/* Chart area: y-axis + bars */}
            <div className="flex gap-3 h-80">
              <div className="flex flex-col justify-between text-[11px] text-muted-foreground py-1">
                {yTicks.map((n) => <span key={n}>{n}</span>)}
              </div>
              <div className="flex-1 flex items-end justify-around gap-4 border-l border-border pl-3">
                {bars.map((b) => (
                  <div key={b.d} className="flex-1 flex flex-col items-center gap-2 h-full">
                    <div className="w-full flex-1 flex items-end">
                      <div
                        className="w-full rounded-t-md"
                        style={{
                          height: `${(b.v / max) * 100}%`,
                          background: b.color,
                        }}
                      />
                    </div>
                    <span className="text-[11px] text-muted-foreground font-medium">{b.d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right column ── */}
          <div className="md:col-span-2 flex flex-col gap-5">
            {/* Benchmark */}
            <div className="rounded-3xl bg-card border border-border p-6 shadow-card-soft">
              <div className="flex gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <BarChart3 className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-[15px]">Benchmark Lado a Lado</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                    Compare seus números com os de concorrentes.
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { l: "B", stats: "385K 890 12%" },
                  { l: "F", stats: "1800 2K 53%" },
                ].map(({ l, stats }) => (
                  <div
                    key={l}
                    className="flex items-center justify-between rounded-xl bg-secondary/70 px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-brand-gradient text-primary-foreground text-xs font-semibold flex items-center justify-center">
                        {l}
                      </div>
                      <span className="text-[11px] text-muted-foreground mx-[20px] my-[4px] py-0 px-[10px]">
                        {stats}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>

            {/* Distribuição */}
            <div className="rounded-3xl bg-card border border-border p-6 shadow-card-soft">
              <div className="flex gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <PieChartIcon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-[15px]">Distribuição de Conteúdo</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                    Mapeie o volume de cada tipo de conteúdo!
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="relative shrink-0">
                  <div
                    className="w-[92px] h-[92px] rounded-full"
                    style={{
                      background:
                        "conic-gradient(hsl(262 70% 55%) 0% 60%, hsl(255 65% 45%) 60% 85%, hsl(320 90% 65%) 85% 100%)",
                    }}
                  />
                  <div className="absolute -right-2 top-1 bg-card border border-border rounded-full px-2 py-0.5 text-[9px] font-semibold text-foreground shadow-card-soft whitespace-nowrap">
                    <span className="text-primary">●</span> 60% Reels
                  </div>
                </div>
                <ul className="space-y-1.5 text-[11px] pr-1">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(262 70% 55%)" }} />
                    <span className="text-muted-foreground">60% Reels</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(255 65% 45%)" }} />
                    <span className="text-muted-foreground">25% Carrossel</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(320 90% 65%)" }} />
                    <span className="text-muted-foreground">15% Imagem</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
