import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative px-6 pt-36 pb-28 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 -top-32 h-[520px] -z-10"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 30%, hsl(var(--primary) / 0.12), transparent 70%)",
        }}
      />
      <div className="max-w-3xl mx-auto text-center animate-fade-up">
        <span className="inline-block text-xs font-medium tracking-[0.18em] uppercase text-primary mb-6">
          InstaInsight
        </span>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.05] mb-6">
          Analise. Compare.{" "}
          <span className="text-brand-gradient">Cresça.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Compare perfis do Instagram em segundos e descubra insights acionáveis.
        </p>
        <button
          onClick={() => navigate("/analisar")}
          className="inline-flex items-center gap-2 bg-brand-gradient text-primary-foreground px-8 py-4 rounded-full font-semibold shadow-brand-glow hover:opacity-95 active:scale-[0.98] transition"
        >
          Começar agora <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
