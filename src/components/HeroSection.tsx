import { ArrowRight, Sparkles, TrendingUp, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const profiles = [
  { handle: "@natalia.fit", initials: "NF", color: "from-rose-400 to-pink-500", followers: "128.4K", eng: 7.2, engBar: 88, growth: "+4.8%", growthUp: true, time: "Seg · 19h" },
  { handle: "@brandstudio", initials: "BS", color: "from-violet-400 to-purple-600", followers: "84.1K", eng: 3.1, engBar: 38, growth: "-1.2%", growthUp: false, time: "Qua · 12h" },
  { handle: "@mktpro", initials: "MP", color: "from-amber-400 to-orange-500", followers: "56.7K", eng: 5.4, engBar: 66, growth: "+2.3%", growthUp: true, time: "Sex · 20h" },
];

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative pt-32 pb-24 px-6 overflow-hidden">
      {/* radial brand glow */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-[600px] -z-10"
           style={{ background: "radial-gradient(ellipse 60% 50% at 50% 30%, hsl(345 90% 60% / 0.10), transparent 60%), radial-gradient(ellipse 50% 40% at 70% 40%, hsl(271 91% 65% / 0.10), transparent 60%)" }} />

      <div className="max-w-5xl mx-auto text-center animate-fade-up">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 bg-rose-50 border border-rose-100">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span className="text-xs font-medium text-rose-600">Análise automática de perfis · Novo</span>
        </div>

        <h1 className="font-sans text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.05] mb-6">
          Analise perfis do Instagram.
          <br />
          Compare. Descubra.{" "}
          <span className="font-display italic font-medium text-brand-gradient">Cresça.</span>
        </h1>

        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Analyze Instagram profiles, compare key statistics, and gain automated insights to improve your content strategy.
          Digite 3 perfis e veja o dashboard em segundos.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          <button
            onClick={() => navigate("/analisar")}
            className="inline-flex items-center gap-2 bg-brand-gradient text-white px-7 py-3.5 rounded-full font-semibold shadow-brand-glow hover:opacity-95 active:scale-[0.98] transition"
          >
            Começar grátis <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold border border-border bg-card text-foreground hover:bg-secondary transition"
          >
            Ver demo →
          </button>
        </div>
      </div>

      {/* Mock dashboard */}
      <div className="max-w-5xl mx-auto animate-fade-up" style={{ animationDelay: "120ms" }}>
        <div className="rounded-2xl bg-card border border-border shadow-card-soft overflow-hidden">
          {/* browser bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/40">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
            <div className="ml-3 text-xs text-muted-foreground bg-card border border-border rounded-md px-3 py-1">
              app.instainsight.com/comparar
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {profiles.map((p) => (
                <div key={p.handle} className="rounded-xl border border-border p-5 bg-background/60">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${p.color} text-white text-xs font-bold flex items-center justify-center`}>
                      {p.initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{p.handle}</div>
                      <div className="text-xs text-muted-foreground">{p.followers} seguidores</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-muted-foreground">Engajamento</span>
                        <span className="font-semibold text-foreground">{p.eng}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                        <div className="h-full bg-brand-gradient rounded-full" style={{ width: `${p.engBar}%` }} />
                      </div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Crescimento mensal</span>
                      <span className={`inline-flex items-center gap-1 font-semibold ${p.growthUp ? "text-emerald-600" : "text-rose-600"}`}>
                        {p.growthUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {p.growth}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Melhor horário</span>
                      <span className="font-medium text-foreground">{p.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                ✦ @natalia.fit lidera engajamento
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-rose-50 text-rose-700 border border-rose-100">
                ↘ @brandstudio perdendo alcance
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
