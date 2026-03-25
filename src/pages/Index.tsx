import { BarChart3, Users, Zap, TrendingUp, ArrowRight, LogIn, LogOut, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import FeatureCard from "@/components/FeatureCard";
import HowItWorks from "@/components/HowItWorks";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Index = () => {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  return (
    <div className="min-h-screen bg-background">
      {/* Top nav bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-surface border-b border-border/50">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-display font-bold text-foreground text-lg">InstaInsight</span>
          {!loading && (
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <span className="text-sm text-muted-foreground hidden sm:block">
                    {user.email}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={signOut}
                    className="gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Sair</span>
                  </Button>
                </>
              ) : (
                <Button
                  variant="accent"
                  size="sm"
                  onClick={() => navigate("/auth")}
                  className="gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Entrar
                </Button>
              )}
            </div>
          )}
        </div>
      </nav>

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
          <button onClick={() => navigate("/analisar")} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-medium text-base tactile-shadow hover:tactile-shadow-pressed active:scale-[0.98] transition-all duration-150 cursor-pointer">
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
