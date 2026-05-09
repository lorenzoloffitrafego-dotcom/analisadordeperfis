import { ArrowRight, Clock, AlertTriangle } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section className="px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-xs font-semibold tracking-[0.22em] uppercase text-rose-500 mb-4">
          Recursos
        </p>
        <h2 className="text-center text-3xl md:text-5xl font-bold tracking-tight text-foreground max-w-3xl mx-auto leading-[1.15] mb-16">
          Qualquer que seja seu ecossistema,{" "}
          <span className="font-display italic font-medium text-brand-gradient">InstaInsight te dá superpoderes.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-fr">
          {/* Card 1 - wide */}
          <div className="md:col-span-2 rounded-2xl bg-card border border-border shadow-card-soft p-7 hover:-translate-y-0.5 transition">
            <h3 className="font-bold text-xl text-foreground mb-2">Escale sem perder controle</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-md">
              Um dashboard para todos os seus perfis. Veja quem está engajado, quem não está — sem abrir um por um.
            </p>
            <div className="flex items-end gap-3 h-28 mb-4">
              {[
                { h: 55, c: "from-rose-400 to-rose-500", label: "@natalia" },
                { h: 35, c: "from-violet-400 to-violet-600", label: "@brand" },
                { h: 70, c: "from-amber-400 to-orange-500", label: "@mkt" },
                { h: 45, c: "from-pink-400 to-rose-500", label: "@studio" },
                { h: 85, c: "from-fuchsia-400 to-purple-600", label: "@hub" },
              ].map((b, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className={`w-full rounded-t-lg bg-gradient-to-t ${b.c}`} style={{ height: `${b.h}%` }} />
                  <span className="text-[10px] text-muted-foreground">{b.label}</span>
                </div>
              ))}
            </div>
            <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-rose-600 hover:gap-2 transition-all">
              Ver dashboard <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl bg-card border border-border shadow-card-soft p-7 hover:-translate-y-0.5 transition">
            <h3 className="font-bold text-lg text-foreground mb-2">Compare qualquer período</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Mês passado vs este mês. Semana vs semana. Qual perfil cresceu mais?
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 font-medium">
                Esta semana +12%
              </span>
              <span className="text-xs px-3 py-1.5 rounded-full bg-secondary text-muted-foreground border border-border font-medium">
                Semana passada +4%
              </span>
            </div>
            <a href="#" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-rose-600 hover:gap-2 transition-all">
              Explorar <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl bg-card border border-border shadow-card-soft p-7 hover:-translate-y-0.5 transition">
            <h3 className="font-bold text-lg text-foreground mb-2">Insights automáticos</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Padrões detectados automaticamente, prontos para ação — sem interpretar números.
            </p>
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-card border border-border font-medium">
                <Clock className="w-3 h-3 text-rose-500" /> Melhor horário: Seg 19h
              </span>
              <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-card border border-border font-medium">
                📈 Reels +38% alcance
              </span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="rounded-2xl bg-card border border-border shadow-card-soft p-7 hover:-translate-y-0.5 transition">
            <h3 className="font-bold text-lg text-foreground mb-2">Reduza churn, comprove valor</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Mostre com dados o retorno que sua estratégia gera. Relatórios claros para impressionar clientes.
            </p>
            <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-rose-600 hover:gap-2 transition-all">
              Saiba mais <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 5 */}
          <div className="rounded-2xl bg-card border border-border shadow-card-soft p-7 hover:-translate-y-0.5 transition">
            <h3 className="font-bold text-lg text-foreground mb-2">Saiba antes, não depois</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Alertas de queda de engajamento e riscos. Você age antes de virar problema.
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-rose-50 text-rose-700 border border-rose-100 font-medium mb-4">
              <AlertTriangle className="w-3 h-3" /> Queda de engajamento detectada
            </span>
            <div className="mt-3">
              <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-rose-600 hover:gap-2 transition-all">
                Configurar alertas <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 6 - wide */}
          <div className="md:col-span-3 rounded-2xl bg-card border border-border shadow-card-soft p-7 hover:-translate-y-0.5 transition">
            <h3 className="font-bold text-xl text-foreground mb-2">Comparativo visual em segundos</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xl">
              Veja side by side quem performa melhor em cada métrica. Dados claros, decisões rápidas.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Engajamento", values: [{ name: "@natalia", w: 88 }, { name: "@brand", w: 38 }, { name: "@mkt", w: 66 }] },
                { label: "Crescimento", values: [{ name: "@natalia", w: 70 }, { name: "@brand", w: 25 }, { name: "@mkt", w: 50 }] },
                { label: "Alcance", values: [{ name: "@natalia", w: 80 }, { name: "@brand", w: 55 }, { name: "@mkt", w: 45 }] },
              ].map((m) => (
                <div key={m.label} className="rounded-xl border border-border p-4 bg-background/40">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{m.label}</div>
                  <div className="space-y-2">
                    {m.values.map((v) => (
                      <div key={v.name}>
                        <div className="flex justify-between text-[11px] mb-1 text-muted-foreground">
                          <span>{v.name}</span><span className="font-semibold text-foreground">{v.w}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                          <div className="h-full bg-brand-gradient rounded-full" style={{ width: `${v.w}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
