import { ArrowRight, LogIn, LogOut, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Index = () => {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-display font-bold text-foreground text-lg">InstaInsight</span>

          {/* Center links */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo("top")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Início
            </button>
            <button onClick={() => scrollTo("features")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Recursos
            </button>
            <button onClick={() => scrollTo("how")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Como Funciona
            </button>
          </div>

          {/* Right */}
          {!loading && (
            <div className="flex items-center gap-3">
              {user ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground">
                      <UserCircle className="w-6 h-6" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-auto p-4 space-y-3">
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <Button variant="ghost" size="sm" onClick={signOut} className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground">
                      <LogOut className="w-4 h-4" />
                      Sair
                    </Button>
                  </PopoverContent>
                </Popover>
              ) : (
                <>
                  <Button variant="ghost" size="sm" onClick={() => navigate("/auth")} className="text-muted-foreground hover:text-foreground">
                    Entrar
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => navigate("/auth")}
                    className="bg-foreground text-background hover:bg-foreground/90 rounded-lg px-4"
                  >
                    Começar
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </nav>

      <div id="top" />
      <HeroSection />
      <div id="features" />
      <FeaturesSection />
      <div id="how" />
      <HowItWorks />

      {/* CTA Final — gradient to dark */}
      <section
        className="px-6 pt-24 pb-0 text-center"
        style={{
          background: "linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(220, 15%, 8%) 100%)",
        }}
      >
        <div className="max-w-2xl mx-auto pb-20">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Pronto para crescer no Instagram?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Comece a analisar seus dados e monte estratégias.
          </p>
          <button
            onClick={() => navigate("/analisar")}
            className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-3.5 rounded-full font-medium text-base shadow-lg hover:opacity-90 active:scale-[0.98] transition-all duration-150 cursor-pointer"
          >
            Começar
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Dark footer */}
      <footer className="px-6 py-8" style={{ background: "hsl(220, 15%, 8%)" }}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="font-display font-bold text-white/90">InstaInsight</span>
          <span className="text-sm text-white/40">© 2026 Todos os direitos reservados.</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
