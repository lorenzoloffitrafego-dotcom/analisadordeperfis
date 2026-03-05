import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Loader2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

const sanitizeHandle = (value: string) => value.replace(/@/g, "").trim();

interface ProfileData {
  seguidores: string;
  total_posts_3m: string;
  total_views: string;
  total_likes: string;
  total_comentarios: string;
  posts_por_semana: string;
}

interface AnalysisResult {
  meu_perfil: ProfileData;
  concorrente_1: ProfileData;
  concorrente_2: ProfileData;
}

const metricLabels: { key: keyof ProfileData; label: string }[] = [
  { key: "seguidores", label: "Seguidores" },
  { key: "total_posts_3m", label: "Posts últimos 3 meses" },
  { key: "total_views", label: "Total de visualizações" },
  { key: "total_likes", label: "Total de likes" },
  { key: "total_comentarios", label: "Total de comentários" },
  { key: "posts_por_semana", label: "Posts por semana" },
];

const AnalysisFlow = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [myInstagram, setMyInstagram] = useState("");
  const [competitor1, setCompetitor1] = useState("");
  const [competitor2, setCompetitor2] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

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
      const response = await fetch(
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
    setMyInstagram("");
    setCompetitor1("");
    setCompetitor2("");
    setResult(null);
  };

  // Loading screen
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

  // Results screen
  if (result) {
    return (
      <div className="min-h-screen aurora-bg flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">
              Resultado da Análise
            </h2>
            <p className="text-muted-foreground text-sm">
              Comparação entre os perfis analisados.
            </p>
          </div>

          <div className="glass-surface rounded-2xl tactile-shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50">
                  <TableHead className="text-muted-foreground font-medium">Métrica</TableHead>
                  <TableHead className="text-accent font-semibold">@{sanitizeHandle(myInstagram)}</TableHead>
                  <TableHead className="text-muted-foreground font-medium">@{sanitizeHandle(competitor1)}</TableHead>
                  <TableHead className="text-muted-foreground font-medium">@{sanitizeHandle(competitor2)}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {metricLabels.map(({ key, label }) => (
                  <TableRow key={key} className="border-border/30">
                    <TableCell className="font-medium text-foreground">{label}</TableCell>
                    <TableCell className="text-accent font-semibold">{result.meu_perfil[key]}</TableCell>
                    <TableCell className="text-muted-foreground">{result.concorrente_1[key]}</TableCell>
                    <TableCell className="text-muted-foreground">{result.concorrente_2[key]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            <Button variant="accent-outline" size="lg" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4" />
              Início
            </Button>
            <Button variant="accent" size="lg" onClick={handleReset}>
              <RotateCcw className="w-4 h-4" />
              Nova Análise
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Steps screen
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
