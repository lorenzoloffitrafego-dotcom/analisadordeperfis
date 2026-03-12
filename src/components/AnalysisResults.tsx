import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, RotateCcw, Users, Eye, Heart, MessageCircle, CalendarDays, FileText, TrendingUp, BarChart3, LayoutGrid, PieChart as PieChartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import PostsTable from "@/components/PostsTable";
import EngajamentoCard from "@/components/EngajamentoCard";

interface ProfileData {
  foto?: string;
  nome?: string;
  seguidores: number;
  total_posts_3m: number;
  total_views: number;
  total_likes: number;
  total_comentarios: number;
  posts_por_semana: number;
  engajamento_por_seguidor: number;
  engajamento_por_views: number;
  media_likes_por_post: number;
  media_views_por_post: number;
  media_comentarios_por_post?: number;
  porcentagem_reels: number;
  porcentagem_imagens: number;
  porcentagem_carrossel: number;
  comparacao_views?: string;
  comparacao_posts?: string;
  comparacao_seguidores?: string;
  [key: string]: any;
}

// result keys: meu_perfil, perfil1, perfil2

interface AnalysisResultsProps {
  result: Record<string, any>;
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

function fmtVal(value: unknown): string {
  if (value === null || value === undefined) return "—";
  const num = typeof value === "number" ? value : parseFloat(String(value));
  if (isNaN(num) || num === 0) return "—";
  if (num >= 1_000_000) {
    const v = num / 1_000_000;
    return v % 1 === 0 ? `${v}M` : `${v.toFixed(1)}M`;
  }
  if (num >= 1_000) {
    const v = num / 1_000;
    return v % 1 === 0 ? `${v}K` : `${v.toFixed(1)}K`;
  }
  if (Number.isInteger(num)) return String(num);
  return num.toFixed(1);
}

function getBestIndex(profiles: ProfileData[], key: string): number {
  let bestIdx = 0;
  let bestVal = -Infinity;
  profiles.forEach((p, i) => {
    const v = typeof p[key] === "number" ? p[key] : parseFloat(String(p[key] ?? 0));
    if (!isNaN(v) && v > bestVal) {
      bestVal = v;
      bestIdx = i;
    }
  });
  return bestIdx;
}

function formatComparacao(raw: unknown): string {
  if (raw === null || raw === undefined) return "—";
  const num = typeof raw === "number" ? raw : parseFloat(String(raw));
  if (isNaN(num) || num === 0) return "—";
  // Multiply by 100 as per rules
  const pct = num * 100;
  const abs = Math.abs(pct);
  if (abs >= 1) return `${pct.toFixed(2)}%`;
  const logVal = Math.floor(Math.log10(abs));
  const decimals = Math.max(1, -logVal);
  return `${pct.toFixed(decimals)}%`;
}

const profileKeys = ["meu_perfil", "perfil1", "perfil2"] as const;

const AnalysisResults = ({ result, onReset }: AnalysisResultsProps) => {
  const navigate = useNavigate();
  const profiles = profileKeys.map((k) => result[k]);

  const getLabel = (key: string): string => {
    if (key === "meu_perfil") return "Meu Perfil";
    const profile = result[key];
    if (profile?.nome) return String(profile.nome).charAt(0).toUpperCase() + String(profile.nome).slice(1);
    return key === "perfil1" ? "Perfil 1" : "Perfil 2";
  };

  const getFoto = (key: string): string | undefined => result[key]?.foto;

  const [avgPostAccount, setAvgPostAccount] = useState<string>("meu_perfil");
  const [contentDistAccount, setContentDistAccount] = useState<string>("meu_perfil");

  const selectedAvgProfile = result[avgPostAccount];

  const renderProfileOptions = () =>
    profileKeys.map((name) => (
      <SelectItem key={name} value={name} className="text-xs">
        <div className="flex items-center gap-2">
          <img
            src={`https://images.weserv.nl/?url=${encodeURIComponent(getFoto(name) || "")}`}
            className="w-5 h-5 rounded-full object-cover"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
          {getLabel(name)}
        </div>
      </SelectItem>
    ));

  // Build profiles record for PostsTable
  const profilesRecord: Record<string, Record<string, any>> = {};
  profileKeys.forEach((k) => { profilesRecord[k] = result[k]; });

  return (
    <div className="min-h-screen text-[hsl(210,40%,95%)] px-4 py-12" style={{ background: "linear-gradient(180deg, #0f0f0f 0%, #1a1a2e 100%)" }}>
      <div className="fixed inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 50% at 50% 0%, hsl(230 80% 65% / 0.1) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, hsl(280 60% 50% / 0.05) 0%, transparent 50%)"
      }} />

      <div className="relative w-full max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold mb-2">Resultado da Análise</h2>
          <p className="text-[hsl(215,15%,50%)] text-sm">Comparação entre os perfis analisados</p>
        </div>

        {/* Main comparison table */}
        <div className="rounded-2xl overflow-hidden border border-[hsl(220,15%,14%)]/50 bg-[hsl(220,20%,8%)]/80 backdrop-blur-sm" style={{ boxShadow: "0 8px 32px -8px hsl(0 0% 0% / 0.5)" }}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[hsl(220,15%,14%)]">
                  <th className="text-left py-4 px-5 text-xs font-semibold uppercase tracking-wider text-[hsl(215,15%,45%)] min-w-[200px]">Concorrente</th>
                  {metricConfig.map(({ key, label, icon: Icon }) => (
                    <th key={key} className="py-4 px-4 text-center min-w-[120px]">
                      <div className="flex flex-col items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5 text-[hsl(215,15%,45%)]" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(215,15%,45%)]">{label}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {profileKeys.map((name, i) => {
                  const profile = profiles[i];
                  const isUser = i === 0;
                  return (
                    <tr
                      key={name}
                      className={`border-b border-[hsl(220,15%,10%)] last:border-b-0 transition-all duration-200 ${isUser ? "bg-[hsl(230,80%,65%,0.04)]" : "hover:bg-[hsl(230,30%,12%)]/60"}`}
                      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 2px 8px -2px hsl(230 80% 65% / 0.08)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
                    >
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <img
                            src={`https://images.weserv.nl/?url=${encodeURIComponent(profile.foto || "")}`}
                            alt={getLabel(name)}
                            width={36} height={36}
                            style={{ borderRadius: "50%", objectFit: "cover", minWidth: 36 }}
                            onError={(e) => { e.currentTarget.style.display = "none"; }}
                          />
                          <div className="min-w-0">
                            <span className={`font-display font-bold text-sm truncate block ${isUser ? "text-[hsl(230,80%,70%)]" : ""}`}>{getLabel(name)}</span>
                            {isUser && <span className="text-[10px] uppercase tracking-widest text-[hsl(230,80%,65%,0.6)] font-semibold">Seu perfil</span>}
                          </div>
                        </div>
                      </td>
                      {metricConfig.map(({ key }) => {
                        const bestIdx = getBestIndex(profiles, key);
                        const isBest = i === bestIdx;
                        return (
                          <td key={key} className="py-4 px-4 text-center">
                            <span className={`font-display text-base font-bold ${isBest ? "text-[hsl(230,80%,70%)]" : isUser ? "" : "text-[hsl(215,15%,50%)]"}`}>
                              {fmtVal(profile[key])}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Média por Post + Engajamento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          {/* Card 1 — Média por Post (uses webhook fields directly) */}
          <div className="rounded-2xl border border-[hsl(220,15%,14%)]/50 bg-[hsl(220,20%,8%)]/80 backdrop-blur-sm p-6" style={{ boxShadow: "0 8px 32px -8px hsl(0 0% 0% / 0.5)" }}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[hsl(230,80%,70%)]" />
                <h3 className="font-display font-bold text-sm">Média por Post</h3>
              </div>
              <Select value={avgPostAccount} onValueChange={setAvgPostAccount}>
                <SelectTrigger className="w-[180px] h-8 text-xs border-[hsl(220,15%,14%)] bg-[hsl(220,20%,6%)]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>{renderProfileOptions()}</SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Views", value: selectedAvgProfile?.media_views_por_post, icon: Eye },
                { label: "Likes", value: selectedAvgProfile?.media_likes_por_post, icon: Heart },
                { label: "Comentários", value: selectedAvgProfile?.media_comentarios_por_post, icon: MessageCircle },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[hsl(220,20%,10%)]">
                  <Icon className="w-4 h-4 text-[hsl(215,15%,45%)]" />
                  <span className="font-display text-lg font-bold">{fmtVal(value)}</span>
                  <span className="text-[10px] uppercase tracking-wider text-[hsl(215,15%,45%)] font-semibold">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2 — Engajamento (uses webhook fields directly) */}
          <EngajamentoCard data={{
            meu_perfil: { ...result.meu_perfil },
            perfil1: { ...result.perfil1 },
            perfil2: { ...result.perfil2 },
          }} />
        </div>

        {/* Distribuição de Conteúdo + Comparação com Concorrentes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          {/* Distribuição de Conteúdo */}
          <div className="rounded-2xl border border-[hsl(220,15%,14%)]/50 bg-[hsl(220,20%,8%)]/80 backdrop-blur-sm p-6 flex flex-col" style={{ boxShadow: "0 8px 32px -8px hsl(0 0% 0% / 0.5)" }}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <PieChartIcon className="w-4 h-4 text-[hsl(280,80%,65%)]" />
                <h3 className="font-display font-bold text-sm">Distribuição de Conteúdo</h3>
              </div>
              <Select value={contentDistAccount} onValueChange={setContentDistAccount}>
                <SelectTrigger className="w-[180px] h-8 text-xs border-[hsl(220,15%,14%)] bg-[hsl(220,20%,6%)]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>{renderProfileOptions()}</SelectContent>
              </Select>
            </div>
            {(() => {
              const profile = result[contentDistAccount];
              const pieData = [
                { name: "Reels", value: profile?.porcentagem_reels || 0, color: "#8B5CF6" },
                { name: "Imagens", value: profile?.porcentagem_imagens || 0, color: "#3B82F6" },
                { name: "Carrossel", value: profile?.porcentagem_carrossel || 0, color: "#EC4899" },
              ];
              return (
                <div className="flex-1 flex flex-col items-center gap-4">
                  <div className="w-full h-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value" stroke="none">
                          {pieData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                        </Pie>
                        <Tooltip
                          formatter={(value: number) => `${value}%`}
                          contentStyle={{ background: "hsl(220 20% 8%)", border: "1px solid hsl(220 15% 14%)", borderRadius: "8px", fontSize: "12px", color: "hsl(210 40% 95%)" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex gap-5">
                    {pieData.map(({ name, value, color }) => (
                      <div key={name} className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                        <span className="text-xs text-[hsl(215,15%,50%)] font-medium">{name} — {value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Comparação com Concorrentes (multiply by 100) */}
          <div className="rounded-2xl border border-[hsl(220,15%,14%)]/50 bg-[hsl(220,20%,8%)]/80 backdrop-blur-sm p-6 flex flex-col" style={{ boxShadow: "0 8px 32px -8px hsl(0 0% 0% / 0.5)" }}>
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-4 h-4 text-[hsl(40,90%,60%)]" />
              <h3 className="font-display font-bold text-sm">Comparação com Concorrentes</h3>
            </div>
            <div className="flex flex-col gap-3 flex-1">
              {[
                { field: "comparacao_views" as const, icon: Eye, label: "Views vs Concorrentes", color: "hsl(230,80%,70%)" },
                { field: "comparacao_posts" as const, icon: LayoutGrid, label: "Posts vs Concorrentes", color: "hsl(160,80%,50%)" },
                { field: "comparacao_seguidores" as const, icon: Users, label: "Seguidores vs Concorrentes", color: "hsl(40,90%,60%)" },
              ].map(({ field, icon: Icon, label, color }) => (
                <div key={field} className="flex items-center gap-3 p-4 rounded-xl bg-[hsl(220,20%,10%)] flex-1">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${color.replace(")", " / 0.12)")}` }}>
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-[hsl(215,15%,45%)] font-semibold block">{label}</span>
                    <span className="font-display text-sm font-bold">{formatComparacao(result.meu_perfil?.[field])}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Posts table */}
        <PostsTable profiles={profilesRecord} profileNames={[...profileKeys]} getLabel={getLabel} getFoto={getFoto} />

        <div className="flex justify-center gap-3 mt-10">
          <Button variant="outline" size="lg" className="border-[hsl(220,15%,14%)] bg-[hsl(220,20%,8%)] hover:bg-[hsl(220,20%,12%)] text-[hsl(210,40%,95%)]" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4" />Início
          </Button>
          <Button size="lg" className="bg-[hsl(230,80%,60%)] hover:bg-[hsl(230,80%,55%)] text-white" onClick={onReset}>
            <RotateCcw className="w-4 h-4" />Nova Análise
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
