import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-background">
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center pt-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-8 border border-accent/30 bg-accent/5">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse-soft" />
          <span className="text-sm font-medium text-accent">Insights em 60 segundos</span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-2">
          Análise Inteligente de
        </h1>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6 text-accent">
          Instagram
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Analise perfis do Instagram, compare métricas importantes e receba insights automáticos para melhorar sua estratégia de conteúdo.
        </p>

        {/* CTA */}
        <button
          onClick={() => navigate("/analisar")}
          className="inline-flex items-center gap-2 bg-[hsl(0,75%,55%)] hover:bg-[hsl(0,75%,48%)] text-white px-8 py-3.5 rounded-full font-medium text-base shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-150 cursor-pointer"
        >
          Iniciar
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
