import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Loader2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnalysisResults from "@/components/AnalysisResults";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface AnalysisResult {
  meu_perfil: Record<string, any>;
  perfil1: Record<string, any>;
  perfil2: Record<string, any>;
}


const AnalysisFlow = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [mainProfile, setMainProfile] = useState("");
  const [competitor1, setCompetitor1] = useState("");
  const [competitor2, setCompetitor2] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const sanitize = (v: string) => v.replace(/@/g, "").trim();

  const handleNext = () => {
    if (!sanitize(mainProfile)) {
      toast.error("Por favor, informe o perfil principal.");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!sanitize(competitor1) || !sanitize(competitor2)) {
      toast.error("Por favor, preencha os dois perfis concorrentes.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://n8n.srv1414258.hstgr.cloud/webhook/7392a7ab-3d13-400b-8f00-079fc44a82f6",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            meu_instagram: `@${sanitize(mainProfile)}`,
            concorrente_1: `@${sanitize(competitor1)}`,
            concorrente_2: `@${sanitize(competitor2)}`,
          }),
        }
      );

      const data = await response.json();
      const output = Array.isArray(data) ? data[0]?.output : data?.output;

      if (!output) {
        throw new Error("Resposta inválida do servidor.");
      }

      setResult(output);
      toast.success("Análise concluída!");
    } catch {
      toast.error("Erro ao analisar os perfis. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setMainProfile("");
    setCompetitor1("");
    setCompetitor2("");
    setResult(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen aurora-bg flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Analisando os perfis do Instagram
          </h2>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto">
            Estamos coletando e comparando os dados dos perfis.
          </p>
        </div>
      </div>
    );
  }

  if (result) {
    return <AnalysisResults result={result} onReset={handleReset} />;
  }

  return (
    <div className="min-h-screen aurora-bg flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${step >= 1 ? "bg-accent" : "bg-border"}`} />
          <div className={`w-8 h-0.5 rounded-full transition-colors duration-300 ${step >= 2 ? "bg-accent" : "bg-border"}`} />
          <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${step >= 2 ? "bg-accent" : "bg-border"}`} />
        </div>

        <div className="glass-surface rounded-2xl p-8 tactile-shadow">
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Defina o perfil principal
                </h2>
                <p className="text-sm text-muted-foreground">
                  Digite o @ do Instagram que você deseja monitorar.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-secondary/50 border border-border/50 px-3 py-2 focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 ring-offset-background transition-shadow">
                <span className="text-muted-foreground text-sm">@</span>
                <input
                  value={mainProfile}
                  onChange={(e) => setMainProfile(e.target.value)}
                  placeholder="perfil_principal"
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60 text-sm"
                />
              </div>
              <div className="flex gap-3">
                <Button variant="accent-outline" size="lg" className="flex-1" onClick={() => navigate("/")}>
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </Button>
                <Button variant="accent" size="lg" className="flex-1" onClick={handleNext}>
                  Seguir
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Defina dois concorrentes
                </h2>
                <p className="text-sm text-muted-foreground">
                  Insira os @ de dois perfis para análise comparativa de métricas.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 rounded-xl bg-secondary/50 border border-border/50 px-3 py-2 focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 ring-offset-background transition-shadow">
                  <span className="text-muted-foreground text-sm">@</span>
                  <input
                    value={competitor1}
                    onChange={(e) => setCompetitor1(e.target.value)}
                    placeholder="perfil_concorrente_1"
                    className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60 text-sm"
                  />
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-secondary/50 border border-border/50 px-3 py-2 focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 ring-offset-background transition-shadow">
                  <span className="text-muted-foreground text-sm">@</span>
                  <input
                    value={competitor2}
                    onChange={(e) => setCompetitor2(e.target.value)}
                    placeholder="perfil_concorrente_2"
                    className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60 text-sm"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="accent-outline" size="lg" className="flex-1" onClick={() => setStep(1)}>
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </Button>
                <Button variant="accent" size="lg" className="flex-1" onClick={handleSubmit}>
                  Enviar
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisFlow;
