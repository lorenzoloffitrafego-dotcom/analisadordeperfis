import { useNavigate } from "react-router-dom";
import { ArrowLeft, RotateCcw, Users, Eye, Heart, MessageCircle, CalendarDays, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileData {
  foto?: string;
  seguidores: string;
  total_posts_3m: string;
  total_views: string;
  total_likes: string;
  total_comentarios: string;
  posts_por_semana: string;
}

type AnalysisResult = Record<string, ProfileData>;

interface AnalysisResultsProps {
  result: AnalysisResult;
  onReset: () => void;
}

const metricConfig = [
  { key: "seguidores" as const, label: "Seguidores", icon: Users },
  { key: "total_posts_3m" as const, label: "Posts (3 meses)", icon: FileText },
  { key: "total_views" as const, label: "Visualizações", icon: Eye },
  { key: "total_likes" as const, label: "Likes", icon: Heart },
  { key: "total_comentarios" as const, label: "Comentários", icon: MessageCircle },
  { key: "posts_por_semana" as const, label: "Posts / semana", icon: CalendarDays },
];

function parseNumber(value: string): number {
  if (!value) return 0;
  const cleaned = value.replace(/[^\d.,]/g, "").replace(",", ".");
  return parseFloat(cleaned) || 0;
}

function formatNumber(value: string): string {
  const num = parseNumber(value);
  if (num >= 1_000_000_000) {
    const v = num / 1_000_000_000;
    return v % 1 === 0 ? `${v}B` : `${v.toFixed(1)}B`;
  }
  if (num >= 1_000_000) {
    const v = num / 1_000_000;
    return v % 1 === 0 ? `${v}M` : `${v.toFixed(1)}M`;
  }
  if (num >= 1_000) {
    const v = num / 1_000;
    return v % 1 === 0 ? `${v}K` : `${v.toFixed(1)}K`;
  }
  return value;
}

function getBestIndex(profiles: ProfileData[], key: keyof ProfileData): number {
  let bestIdx = 0;
  let bestVal = -1;
  profiles.forEach((p, i) => {
    const v = parseNumber(p[key] as string);
    if (v > bestVal) {
      bestVal = v;
      bestIdx = i;
    }
  });
  return bestIdx;
}

const AnalysisResults = ({ result, onReset }: AnalysisResultsProps) => {
  const navigate = useNavigate();
  const profileNames = Object.keys(result);
  const profiles = profileNames.map((n) => result[n]);

  return (
    <div className="min-h-screen aurora-bg flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-foreground mb-2">
            Resultado da Análise
          </h2>
          <p className="text-muted-foreground text-sm">
            Comparação entre os perfis analisados
          </p>
        </div>

        {/* Profile headers */}
        <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `200px repeat(${profileNames.length}, 1fr)` }}>
          <div />
          {profileNames.map((name, i) => (
            <div
              key={name}
              className={`rounded-xl p-4 flex items-center gap-3 border ${
                i === 0
                  ? "bg-accent/10 border-accent/30"
                  : "glass-surface border-border/50"
              }`}
            >
              <img
                src={`https://images.weserv.nl/?url=${encodeURIComponent(result[name].foto || "")}`}
                alt={name.replace("@", "")}
                width={44}
                height={44}
                style={{ borderRadius: "50%", objectFit: "cover", minWidth: 44 }}
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
              <div className="min-w-0">
                <span className={`font-display font-bold text-sm truncate block ${i === 0 ? "text-accent" : "text-foreground"}`}>
                  {name.replace("@", "")}
                </span>
                {i === 0 && (
                  <span className="text-[10px] uppercase tracking-widest text-accent/70 font-semibold">
                    Seu perfil
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Metric rows */}
        <div className="space-y-2">
          {metricConfig.map(({ key, label, icon: Icon }) => {
            const bestIdx = getBestIndex(profiles, key);
            return (
              <div
                key={key}
                className="grid gap-4 items-center"
                style={{ gridTemplateColumns: `200px repeat(${profileNames.length}, 1fr)` }}
              >
                <div className="flex items-center gap-2.5 py-3 px-1">
                  <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-sm font-medium text-muted-foreground">{label}</span>
                </div>
                {profiles.map((profile, i) => {
                  const isBest = i === bestIdx;
                  const isUser = i === 0;
                  return (
                    <div
                      key={profileNames[i]}
                      className={`rounded-lg py-3 px-4 text-center border transition-colors ${
                        isBest
                          ? "bg-accent/10 border-accent/20"
                          : "glass-surface border-border/30"
                      }`}
                    >
                      <span
                        className={`font-display text-lg font-bold ${
                          isBest
                            ? "text-accent"
                            : isUser
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {formatNumber(profile[key] as string)}
                      </span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-3 mt-10">
          <Button variant="accent-outline" size="lg" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4" />
            Início
          </Button>
          <Button variant="accent" size="lg" onClick={onReset}>
            <RotateCcw className="w-4 h-4" />
            Nova Análise
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
