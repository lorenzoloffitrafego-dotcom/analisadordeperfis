import { BarChart3, TrendingUp, Users } from "lucide-react";

const DashboardPreview = () => {
  return (
    <section className="px-6 py-20 bg-background">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-2">
          Pronto para transformar sua
        </h2>
        <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          estratégia no Instagram?
        </h2>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Bar Chart Card */}
        <div className="md:col-span-5 bg-card rounded-2xl p-5 border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-accent" />
            <span className="text-xs font-medium text-muted-foreground">Distribuição de Conteúdo</span>
          </div>
          <div className="flex items-end gap-3 h-36 px-2">
            {[
              { label: "Reels", h: "45%", color: "bg-[hsl(270,80%,65%)]" },
              { label: "Img", h: "70%", color: "bg-[hsl(270,80%,65%)]" },
              { label: "Carousel", h: "55%", color: "bg-[hsl(270,80%,65%)]" },
              { label: "Stories", h: "85%", color: "bg-[hsl(270,80%,65%)]" },
            ].map((bar) => (
              <div key={bar.label} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-full rounded-lg ${bar.color} transition-all duration-500`}
                  style={{ height: bar.h }}
                />
                <span className="text-[10px] text-muted-foreground">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right side cards */}
        <div className="md:col-span-7 grid grid-rows-2 gap-4">
          {/* Engagement Card */}
          <div className="bg-card rounded-2xl p-5 border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[hsl(160,80%,50%)]/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-[hsl(160,80%,50%)]" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Taxa de Engajamento</p>
              <p className="text-3xl font-bold text-foreground">5.27%</p>
            </div>
          </div>

          {/* Posts Chart Card */}
          <div className="bg-card rounded-2xl p-5 border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-xs font-medium text-muted-foreground">Número de Posts</span>
            </div>
            <div className="flex items-end gap-1 h-16">
              {[20, 35, 28, 45, 60, 52, 70].map((v, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end h-full">
                  <div
                    className="w-full bg-accent/20 rounded-sm relative"
                    style={{ height: `${v}%` }}
                  >
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-accent rounded-sm"
                      style={{ height: "100%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6", "Sem 7"].map((l) => (
                <span key={l} className="text-[8px] text-muted-foreground">{l}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
