import { BarChart3, Users, Zap, TrendingUp, ArrowRight } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import FeatureCard from "@/components/FeatureCard";
import HowItWorks from "@/components/HowItWorks";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      {/* Features */}
      <section className="px-6 py-24 max-w-5xl mx-auto">
        <p className="text-center text-sm font-medium tracking-widest uppercase text-muted-foreground mb-12">
          O que você pode fazer
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<BarChart3 className="w-5 h-5" />}
            title="Análise profunda"
            description="Métricas detalhadas de engajamento, crescimento e performance de conteúdo."
          />
          <FeatureCard
            icon={<Users className="w-5 h-5" />}
            title="Compare concorrentes"
            description="Veja como seu perfil se posiciona frente aos seus principais concorrentes."
          />
          <FeatureCard
            icon={<Zap className="w-5 h-5" />}
            title="Insights automáticos"
            description="Receba recomendações personalizadas para melhorar sua estratégia."
          />
        </div>
      </section>

      <HowItWorks />

      {/* CTA Final */}
      <section className="px-6 py-24 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Pronto para crescer no Instagram?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Comece a analisar seus dados e descubra oportunidades escondidas.
          </p>
          <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-medium text-base tactile-shadow hover:tactile-shadow-pressed active:scale-[0.98] transition-all duration-150 cursor-pointer">
            Começar agora
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-border">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <span className="font-display font-bold text-foreground">InstaInsight</span>
          <span className="text-sm text-muted-foreground">© 2026 Todos os direitos reservados.</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
