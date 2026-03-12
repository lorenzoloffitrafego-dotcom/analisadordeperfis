import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, RotateCcw, Users, Eye, Heart, MessageCircle, CalendarDays, FileText, TrendingUp, BarChart3, LayoutGrid, PieChart as PieChartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import PostsTable from "@/components/PostsTable";

interface ProfileData {
  foto?: string;
  seguidores: string;
  total_posts_3m: string;
  total_views: string;
  total_likes: string;
  total_comentarios: string;
  posts_por_semana: string;
  porcentagem_reels?: string;
  porcentagem_imagens?: string;
  porcentagem_carrossel?: string;
  comparacao_views?: string;
  comparacao_posts?: string;
  comparacao_seguidores?: string;
  [key: string]: any;
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

function parseNumber(value: unknown): number {
  if (!value) return 0;
  const str = String(value);
  const cleaned = str.replace(/[^\d.,]/g, "").replace(",", ".");
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

function formatProfileName(key: string): string {
  if (key === "meu_perfil") return "Meu Perfil";
  // Remove @ and capitalize first letter of each word
  const clean = key.replace("@", "");
  return clean
    .split(/[\s_]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const AnalysisResults = ({ result, onReset }: AnalysisResultsProps) => {
  const navigate = useNavigate();
  const profileNames = Object.keys(result);
  const profiles = profileNames.map((n) => result[n]);

  const getLabel = (key: string): string => {
    if (profileNames.indexOf(key) === 0) return "Meu Perfil";
    const nome = result[key]?.nome;
    if (nome) return String(nome).charAt(0).toUpperCase() + String(nome).slice(1);
    return formatProfileName(key);
  };

  const getFoto = (key: string): string | undefined => result[key]?.foto;

  const [avgPostAccount, setAvgPostAccount] = useState(profileNames[0]);
  const [engagementAccount, setEngagementAccount] = useState(profileNames[0]);
  const [contentDistAccount, setContentDistAccount] = useState(profileNames[0]);

  const selectedAvgProfile = result[avgPostAccount];
  const selectedEngProfile = result[engagementAccount];

  const totalPosts3m = parseNumber(selectedAvgProfile?.total_posts_3m as string);
  const avgViews = totalPosts3m > 0 ? parseNumber(selectedAvgProfile?.total_views as string) / totalPosts3m : 0;
  const avgLikes = totalPosts3m > 0 ? parseNumber(selectedAvgProfile?.total_likes as string) / totalPosts3m : 0;
  const avgComments = totalPosts3m > 0 ? parseNumber(selectedAvgProfile?.total_comentarios as string) / totalPosts3m : 0;

  const engTotalPosts = parseNumber(selectedEngProfile?.total_posts_3m as string);
  const engFollowers = parseNumber(selectedEngProfile?.seguidores as string);
  const engTotalLikes = parseNumber(selectedEngProfile?.total_likes as string);
  const engTotalComments = parseNumber(selectedEngProfile?.total_comentarios as string);
  const engTotalViews = parseNumber(selectedEngProfile?.total_views as string);

  const followerEngagement = engFollowers > 0 && engTotalPosts > 0
    ? ((engTotalLikes + engTotalComments) / engTotalPosts / engFollowers) * 100
    : 0;
  const viewEngagement = engTotalViews > 0 && engTotalPosts > 0
    ? ((engTotalLikes + engTotalComments) / engTotalPosts / (engTotalViews / engTotalPosts)) * 100
    : 0;

  // Reusable dropdown items renderer
  const renderProfileOptions = () =>
    profileNames.map((name) => (
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

  return (
    <div className="min-h-screen bg-[hsl(220,20%,4%)] text-[hsl(210,40%,95%)] px-4 py-12">
      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 50% at 50% 0%, hsl(230 80% 65% / 0.08) 0%, transparent 60%)"
      }} />

      <div className="relative w-full max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold mb-2">
            Resultado da Análise
          </h2>
          <p className="text-[hsl(215,15%,50%)] text-sm">
            Comparação entre os perfis analisados
          </p>
        </div>

        {/* Horizontal table */}
        <div className="rounded-2xl overflow-hidden border border-[hsl(220,15%,12%)] bg-[hsl(220,20%,8%)]" style={{ boxShadow: "0 8px 32px -8px hsl(0 0% 0% / 0.4)" }}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[hsl(220,15%,14%)]">
                  <th className="text-left py-4 px-5 text-xs font-semibold uppercase tracking-wider text-[hsl(215,15%,45%)] min-w-[200px]">
                    Concorrente
                  </th>
                  {metricConfig.map(({ key, label, icon: Icon }) => (
                    <th key={key} className="py-4 px-4 text-center min-w-[120px]">
                      <div className="flex flex-col items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5 text-[hsl(215,15%,45%)]" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(215,15%,45%)]">
                          {label}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {profileNames.map((name, i) => {
                  const profile = profiles[i];
                  const isUser = i === 0;
                  return (
                    <tr
                      key={name}
                      className={`border-b border-[hsl(220,15%,12%)] last:border-b-0 transition-colors ${
                        isUser ? "bg-[hsl(230,80%,65%,0.04)]" : "hover:bg-[hsl(220,20%,10%)]"
                      }`}
                    >
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <img
                            src={`https://images.weserv.nl/?url=${encodeURIComponent(profile.foto || "")}`}
                            alt={getLabel(name)}
                            width={36}
                            height={36}
                            style={{ borderRadius: "50%", objectFit: "cover", minWidth: 36 }}
                            onError={(e) => { e.currentTarget.style.display = "none"; }}
                          />
                          <div className="min-w-0">
                            <span className={`font-display font-bold text-sm truncate block ${isUser ? "text-[hsl(230,80%,70%)]" : ""}`}>
                              {getLabel(name)}
                            </span>
                            {isUser && (
                              <span className="text-[10px] uppercase tracking-widest text-[hsl(230,80%,65%,0.6)] font-semibold">
                                Seu perfil
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      {metricConfig.map(({ key }) => {
                        const bestIdx = getBestIndex(profiles, key);
                        const isBest = i === bestIdx;
                        return (
                          <td key={key} className="py-4 px-4 text-center">
                            <span
                              className={`font-display text-base font-bold ${
                                isBest
                                  ? "text-[hsl(230,80%,70%)]"
                                  : isUser
                                  ? ""
                                  : "text-[hsl(215,15%,50%)]"
                              }`}
                            >
                              {formatNumber(profile[key] as string)}
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

        {/* Two metric cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          {/* Card 1 — Média por Post */}
          <div className="rounded-2xl border border-[hsl(220,15%,12%)] bg-[hsl(220,20%,8%)] p-6" style={{ boxShadow: "0 8px 32px -8px hsl(0 0% 0% / 0.4)" }}>
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
                { label: "Views", value: avgViews, icon: Eye },
                { label: "Likes", value: avgLikes, icon: Heart },
                { label: "Comentários", value: avgComments, icon: MessageCircle },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[hsl(220,20%,10%)]">
                  <Icon className="w-4 h-4 text-[hsl(215,15%,45%)]" />
                  <span className="font-display text-lg font-bold">
                    {formatNumber(String(Math.round(value)))}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[hsl(215,15%,45%)] font-semibold">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2 — Média de Engajamento */}
          <div className="rounded-2xl border border-[hsl(220,15%,12%)] bg-[hsl(220,20%,8%)] p-6" style={{ boxShadow: "0 8px 32px -8px hsl(0 0% 0% / 0.4)" }}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[hsl(160,80%,50%)]" />
                <h3 className="font-display font-bold text-sm">Média de Engajamento</h3>
              </div>
              <Select value={engagementAccount} onValueChange={setEngagementAccount}>
                <SelectTrigger className="w-[180px] h-8 text-xs border-[hsl(220,15%,14%)] bg-[hsl(220,20%,6%)]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>{renderProfileOptions()}</SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Engajamento dos Seguidores", value: followerEngagement },
                { label: "Engajamento por Views", value: viewEngagement },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 p-4 rounded-xl bg-[hsl(220,20%,10%)]">
                  <span className="font-display text-2xl font-bold text-[hsl(160,80%,50%)]">
                    {value.toFixed(2)}%
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[hsl(215,15%,45%)] font-semibold text-center leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Distribuição de Conteúdo + Comparação com Concorrentes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          {/* Bloco 1 — Distribuição de Conteúdo */}
          <div className="rounded-2xl border border-[hsl(220,15%,12%)] bg-[hsl(220,20%,8%)] p-6 flex flex-col" style={{ boxShadow: "0 8px 32px -8px hsl(0 0% 0% / 0.4)" }}>
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
              const parsePercent = (v?: string | number) => parseFloat(String(v ?? "0").replace("%", "")) || 0;
              const pieData = [
                { name: "Reels", value: parsePercent(profile?.porcentagem_reels), color: "#8B5CF6" },
                { name: "Imagens", value: parsePercent(profile?.porcentagem_imagens), color: "#3B82F6" },
                { name: "Carrossel", value: parsePercent(profile?.porcentagem_carrossel), color: "#EC4899" },
              ];
              return (
                <div className="flex-1 flex flex-col items-center gap-4">
                  <div className="w-full h-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={75}
                          paddingAngle={3}
                          dataKey="value"
                          stroke="none"
                        >
                          {pieData.map((entry, idx) => (
                            <Cell key={idx} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value: number) => `${value}%`}
                          contentStyle={{
                            background: "hsl(220 20% 8%)",
                            border: "1px solid hsl(220 15% 14%)",
                            borderRadius: "8px",
                            fontSize: "12px",
                            color: "hsl(210 40% 95%)",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex gap-5">
                    {pieData.map(({ name, value, color }) => (
                      <div key={name} className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                        <span className="text-xs text-[hsl(215,15%,50%)] font-medium">
                          {name} — {value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Bloco 2 — Comparação com Concorrentes */}
          <div className="rounded-2xl border border-[hsl(220,15%,12%)] bg-[hsl(220,20%,8%)] p-6 flex flex-col" style={{ boxShadow: "0 8px 32px -8px hsl(0 0% 0% / 0.4)" }}>
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
                    <span className="text-[10px] uppercase tracking-wider text-[hsl(215,15%,45%)] font-semibold block">
                      {label}
                    </span>
                    <span className="font-display text-sm font-bold">
                      {(profiles[0] as any)?.[field] || "—"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Posts dos últimos 3 meses */}
        <PostsTable profiles={result} profileNames={profileNames} getLabel={getLabel} getFoto={getFoto} />

        <div className="flex justify-center gap-3 mt-10">
          <Button
            variant="outline"
            size="lg"
            className="border-[hsl(220,15%,14%)] bg-[hsl(220,20%,8%)] hover:bg-[hsl(220,20%,12%)] text-[hsl(210,40%,95%)]"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-4 h-4" />
            Início
          </Button>
          <Button
            size="lg"
            className="bg-[hsl(230,80%,60%)] hover:bg-[hsl(230,80%,55%)] text-white"
            onClick={onReset}
          >
            <RotateCcw className="w-4 h-4" />
            Nova Análise
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
