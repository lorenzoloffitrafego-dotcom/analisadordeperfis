import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center aurora-bg overflow-hidden">
      {/* Floating orbs for depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-30 animate-float"
          style={{
            background: "radial-gradient(circle, hsl(210 100% 90% / 0.5) 0%, transparent 70%)",
            top: "10%",
            left: "15%",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-25 animate-float"
          style={{
            background: "radial-gradient(circle, hsl(260 80% 92% / 0.5) 0%, transparent 70%)",
            top: "20%",
            right: "10%",
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full opacity-20 animate-float"
          style={{
            background: "radial-gradient(circle, hsl(190 70% 88% / 0.5) 0%, transparent 70%)",
            bottom: "15%",
            left: "40%",
            animationDelay: "4s",
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass-surface rounded-full px-4 py-1.5 mb-8 tactile-shadow">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse-soft" />
          <span className="text-sm font-medium text-muted-foreground">Análise inteligente de Instagram</span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
          Compare seu perfil com concorrentes e receba insights em{" "}
          <span className="relative inline-block">
            60 segundos
            <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
              <path d="M2 6C50 2 150 2 198 6" stroke="hsl(230 80% 65%)" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Analise perfis do Instagram, compare métricas importantes e receba insights automáticos para melhorar sua estratégia de conteúdo.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-medium text-base tactile-shadow hover:tactile-shadow-pressed active:scale-[0.98] transition-all duration-150 cursor-pointer">
            Começar análise
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="inline-flex items-center gap-2 glass-surface px-6 py-3.5 rounded-full font-medium text-sm text-muted-foreground hover:text-foreground tactile-shadow hover:tactile-shadow-pressed active:scale-[0.98] transition-all duration-150 cursor-pointer">
            Ver demonstração
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
