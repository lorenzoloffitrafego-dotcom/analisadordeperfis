import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-secondary/30">
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center pt-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 rounded-full px-5 py-2 mb-10 bg-card border border-border shadow-sm">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-sm font-medium text-muted-foreground">Insights in 60 seconds</span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.08] mb-2">
          Intelligent Instagram
        </h1>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.08] mb-8 bg-gradient-to-r from-[hsl(270,80%,60%)] to-[hsl(340,80%,55%)] bg-clip-text text-transparent">
          Analytics
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed">
          Analyze Instagram profiles, compare key statistics, and gain automated insights to improve your content strategy.
        </p>

        {/* CTA */}
        <button
          onClick={() => navigate("/analisar")}
          className="inline-flex items-center gap-2 text-white px-8 py-3.5 rounded-full font-semibold text-base shadow-lg hover:shadow-xl active:scale-[0.97] transition-all duration-200 cursor-pointer bg-gradient-to-r from-[hsl(0,80%,58%)] to-[hsl(340,75%,55%)] hover:from-[hsl(0,80%,52%)] hover:to-[hsl(340,75%,50%)]"
        >
          Iniciar
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
