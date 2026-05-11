import { LogOut, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import FinalCTA from "@/components/FinalCTA";
import SiteFooter from "@/components/SiteFooter";
import Logo from "@/components/Logo";
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
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-border/60">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo("features")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Recursos
            </button>
            <button onClick={() => scrollTo("how")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Como usar
            </button>
          </div>

          {!loading && (
            <div className="flex items-center gap-2">
              {user ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <UserCircle className="w-6 h-6" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-auto p-4 space-y-3">
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <Button variant="ghost" size="sm" onClick={signOut} className="w-full justify-start gap-2">
                      <LogOut className="w-4 h-4" />
                      Sair
                    </Button>
                  </PopoverContent>
                </Popover>
              ) : (
                <button
                  onClick={() => navigate("/auth")}
                  className="inline-flex items-center gap-1 bg-brand-gradient text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold shadow-brand-glow hover:opacity-95 active:scale-[0.98] transition"
                >
                  Começar grátis
                </button>
              )}
            </div>
          )}
        </div>
      </nav>

      <HeroSection />
      <div id="features" />
      <FeaturesSection />
      <div id="how" />
      <HowItWorks />
      <FinalCTA />
      <SiteFooter />
    </div>
  );
};

export default Index;
