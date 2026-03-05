import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const sanitizeHandle = (value: string) => value.replace(/@/g, "").trim();

const AnalysisFlow = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [myInstagram, setMyInstagram] = useState("");
  const [competitor1, setCompetitor1] = useState("");
  const [competitor2, setCompetitor2] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    const handle = sanitizeHandle(myInstagram);
    if (!handle) {
      toast.error("Por favor, digite seu nome de usuário do Instagram.");
      return;
    }
    setMyInstagram(handle);
    setStep(2);
  };

  const handleSubmit = async () => {
    const c1 = sanitizeHandle(competitor1);
    const c2 = sanitizeHandle(competitor2);

    if (!c1 || !c2) {
      toast.error("Por favor, preencha os dois perfis de concorrentes.");
      return;
    }

    setCompetitor1(c1);
    setCompetitor2(c2);
    setLoading(true);

    try {
      await fetch(
        "https://n8n.srv1414258.hstgr.cloud/webhook-test/7392a7ab-3d13-400b-8f00-079fc44a82f6",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            meu_instagram: sanitizeHandle(myInstagram),
            concorrente_1: c1,
            concorrente_2: c2,
          }),
        }
      );
      toast.success("Dados enviados com sucesso!");
    } catch {
      toast.error("Erro ao enviar dados. Tente novamente.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen aurora-bg flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Analisando os perfis...
          </h2>
          <p className="text-muted-foreground text-sm">
            Isso pode levar alguns segundos.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen aurora-bg flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${step >= 1 ? "bg-accent" : "bg-border"}`} />
          <div className={`w-8 h-0.5 rounded-full transition-colors duration-300 ${step >= 2 ? "bg-accent" : "bg-border"}`} />
          <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${step >= 2 ? "bg-accent" : "bg-border"}`} />
        </div>

        {/* Card */}
        <div className="glass-surface rounded-2xl p-8 tactile-shadow">
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Escreva o seu Instagram
                </h2>
                <p className="text-sm text-muted-foreground">
                  Digite apenas o nome da conta. Não precisa incluir o símbolo @.
                </p>
              </div>

              <Input
                placeholder="nomedaconta"
                value={myInstagram}
                onChange={(e) => setMyInstagram(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleNext()}
                className="h-12 rounded-xl bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground/60 focus:ring-accent"
              />

              <div className="flex gap-3">
                <Button
                  variant="accent-outline"
                  size="lg"
                  className="flex-1"
                  onClick={() => navigate("/")}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </Button>
                <Button
                  variant="accent"
                  size="lg"
                  className="flex-1"
                  onClick={handleNext}
                >
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
                  Adicione dois concorrentes para análise
                </h2>
                <p className="text-sm text-muted-foreground">
                  Digite o nome de dois perfis que você deseja comparar.
                </p>
              </div>

              <div className="space-y-3">
                <Input
                  placeholder="concorrente1"
                  value={competitor1}
                  onChange={(e) => setCompetitor1(e.target.value)}
                  className="h-12 rounded-xl bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground/60 focus:ring-accent"
                />
                <Input
                  placeholder="concorrente2"
                  value={competitor2}
                  onChange={(e) => setCompetitor2(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  className="h-12 rounded-xl bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground/60 focus:ring-accent"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  variant="accent-outline"
                  size="lg"
                  className="flex-1"
                  onClick={() => setStep(1)}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </Button>
                <Button
                  variant="accent"
                  size="lg"
                  className="flex-1"
                  onClick={handleSubmit}
                >
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
