import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, RotateCcw, Users, Eye, Heart, MessageCircle, CalendarDays, FileText, TrendingUp, BarChart3, LayoutGrid, PieChart as PieChartIcon, ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import PostsTable from "@/components/PostsTable";
import EngajamentoCard from "@/components/EngajamentoCard";
import InfoTooltip from "@/components/InfoTooltip";

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

interface AnalysisResultsProps {
  result: Record<string, any>;
  onReset: () => void;
}

const resumoColumns = [
  { key: "seguidores", label: "Seguidores", icon: Users },
  { key: "total_views", label: "Total de Views", icon: Eye },
  { key: "total_likes", label: "Total de Likes", icon: Heart },
  { key: "total_comentarios", label: "Total de Comentários", icon: MessageCircle },
  { key: "total_posts_3m", label: "Total de Posts", icon: FileText },
  { key: "posts_por_semana", label: "Média de Posts (Semanal)", icon: CalendarDays },
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

function formatComparacao(raw: unknown): string {
  if (raw === null || raw === undefined) return "—";
  const num = typeof raw === "number" ? raw : parseFloat(String(raw));
  if (isNaN(num) || num === 0) return "—";
  const pct = num * 100;
  const abs = Math.abs(pct);
  if (abs >= 1) return `${pct.toFixed(2)}%`;
  const logVal = Math.floor(Math.log10(abs));
  const decimals = Math.max(1, -logVal);
  return `${pct.toFixed(decimals)}%`;
}

const profileKeys = ["meu_perfil", "perfil1", "perfil2"] as const;

type ResumoSortKey = string | null;
type SortDir = "asc" | "desc";

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

  // Resumo table sorting
  const [resumoSortKey, setResumoSortKey] = useState<ResumoSortKey>(null);
  const [resumoSortDir, setResumoSortDir] = useState<SortDir>("desc");

  const handleResumoSort = (key: string) => {
    if (resumoSortKey === key) {
      if (resumoSortDir === "desc") setResumoSortDir("asc");
      else { setResumoSortKey(null); setResumoSortDir("desc"); }
    } else {
      setResumoSortKey(key);
      setResumoSortDir("desc");
    }
  };

  // Sort profiles for resumo table
  const sortedProfileIndices = [0, 1, 2];
  if (resumoSortKey) {
    sortedProfileIndices.sort((a, b) => {
      const va = Number(profiles[a]?.[resumoSortKey] ?? 0) || 0;
      const vb = Number(profiles[b]?.[resumoSortKey] ?? 0) || 0;
      return resumoSortDir === "desc" ? vb - va : va - vb;
    });
  }

  const selectedAvgProfile = result[avgPostAccount];

  const ResumoSortIcon = ({ col }: { col: string }) => {
    if (resumoSortKey !== col) return <ArrowUpDown className="w-3 h-3 ml-1 opacity-30" />;
    return resumoSortDir === "desc"
      ? <ArrowDown className="w-3 h-3 ml-1 text-[hsl(230,80%,70%)]" />
      : <ArrowUp className="w-3 h-3 ml-1 text-[hsl(230,80%,70%)]" />;
  };

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

  const profilesRecord: Record<string, Record<string, any>> = {};
  profileKeys.forEach((k) => { profilesRecord[k] = result[k]; });

  const thBase = "py-4 px-4 text-[10px] font-semibold uppercase tracking-[0.1em] text-[hsl(215,15%,45%)]";

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

        {/* 1. Resumo Inicial */}
        <div className="rounded-2xl overflow-hidden border border-[hsl(220,15%,14%)]/50 bg-[hsl(220,20%,8%)]/80 backdrop-blur-sm" style={{ boxShadow: "0 8px 32px -8px hsl(0 0% 0% / 0.5)" }}>
          <div className="flex items-center gap-2 px-5 pt-5 pb-2">
            <BarChart3 className="w-5 h-5 text-[hsl(230,80%,70%)]" />
            <h3 className="font-display text-lg font-bold">Resumo Inicial</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[hsl(220,15%,14%)]">
                  <th className={`${thBase} text-left min-w-[180px]`}>Conta</th>
                  {resumoColumns.map(({ key, label }) => (
                    <th
                      key={key}
                      className={`${thBase} text-center min-w-[120px] cursor-pointer select-none hover:text-[hsl(210,40%,80%)] transition-colors duration-200`}
                      onClick={() => handleResumoSort(key)}
                    >
                      <span className="inline-flex items-center justify-center">
                        {label}
                        <ResumoSortIcon col={key} />
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedProfileIndices.map((i) => {
                  const name = profileKeys[i];
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
                      {resumoColumns.map(({ key }) => {
                        const bestIdx = sortedProfileIndices.reduce((best, idx) => {
                          const vBest = Number(profiles[best]?.[key] ?? 0) || 0;
                          const vCur = Number(profiles[idx]?.[key] ?? 0) || 0;
                          return vCur > vBest ? idx : best;
                        }, 0);
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

        {/* Desempenho Médio por Post + Engajamento do Público */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          <div className="rounded-2xl border border-[hsl(220,15%,14%)]/50 bg-[hsl(220,20%,8%)]/80 backdrop-blur-sm p-6" style={{ boxShadow: "0 8px 32px -8px hsl(0 0% 0% / 0.5)" }}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[hsl(230,80%,70%)]" />
                <h3 className="font-display font-bold text-sm">Desempenho Médio por Post</h3>
                <InfoTooltip text="Entenda o alcance médio do seu conteúdo através do volume de views e o engajamento direto (likes e comentários)." />
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
                { label: "Views", value: selectedAvgProfile?.media_views_por_post, icon: Eye, color: "hsl(160,80%,50%)", bgColor: "hsl(160,80%,50%,0.12)" },
                { label: "Likes", value: selectedAvgProfile?.media_likes_por_post, icon: Heart, color: "hsl(210,80%,60%)", bgColor: "hsl(210,80%,60%,0.12)" },
                { label: "Comentários", value: selectedAvgProfile?.media_comentarios_por_post, icon: MessageCircle, color: "hsl(45,90%,60%)", bgColor: "hsl(45,90%,60%,0.12)" },
              ].map(({ label, value, icon: Icon, color, bgColor }) => (
                <div key={label} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[hsl(220,20%,10%)] transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-1" style={{ backgroundColor: bgColor }}>
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <span className="font-display text-2xl font-bold transition-all duration-300" style={{ color }}>{fmtVal(value)}</span>
                  <span className="text-[10px] uppercase tracking-wider text-[hsl(215,15%,45%)] font-semibold text-center leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <EngajamentoCard data={{
            meu_perfil: { ...result.meu_perfil },
            perfil1: { ...result.perfil1 },
            perfil2: { ...result.perfil2 },
          }} />
        </div>

        {/* Distribuição de Conteúdo + Comparação com Concorrentes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          <div className="rounded-2xl border border-[hsl(220,15%,14%)]/50 bg-[hsl(220,20%,8%)]/80 backdrop-blur-sm p-6 flex flex-col" style={{ boxShadow: "0 8px 32px -8px hsl(0 0% 0% / 0.5)" }}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <PieChartIcon className="w-4 h-4 text-[hsl(280,80%,65%)]" />
                <h3 className="font-display font-bold text-sm">Distribuição de Conteúdo</h3>
                <InfoTooltip text="Saiba o quanto você postou de cada tipo de conteúdo, como Reels, Carrosséis e Imagens." />
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
                          formatter={(value: number, name: string) => [`${value}%`, name]}
                          contentStyle={{ backgroundColor: '#fff', color: '#000', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px', padding: '8px 12px' }}
                          itemStyle={{ color: '#000' }}
                          labelStyle={{ display: 'none' }}
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

          <div className="rounded-2xl border border-[hsl(220,15%,14%)]/50 bg-[hsl(220,20%,8%)]/80 backdrop-blur-sm p-6 flex flex-col" style={{ boxShadow: "0 8px 32px -8px hsl(0 0% 0% / 0.5)" }}>
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-4 h-4 text-[hsl(40,90%,60%)]" />
              <h3 className="font-display font-bold text-sm">Comparação com Concorrentes</h3>
            </div>
            <div className="flex flex-col gap-3 flex-1">
              {[
                { field: "comparacao_views" as const, icon: Eye, label: "Views vs Concorrentes", tooltip: "Entenda o seu domínio de visualizações em relação ao volume total gerado pelos 3 perfis.", color: "hsl(160,80%,50%)" },
                { field: "comparacao_posts" as const, icon: LayoutGrid, label: "Posts vs Concorrentes", tooltip: "Saiba o quanto você produz comparado à atividade total do grupo analisado.", color: "hsl(45,90%,60%)" },
                { field: "comparacao_seguidores" as const, icon: Users, label: "Seguidores vs Concorrentes", tooltip: "Entenda o seu tamanho de audiência dentro deste recorte de mercado.", color: "hsl(270,80%,65%)" },
              ].map(({ field, icon: Icon, label, tooltip, color }) => (
                <div key={field} className="flex items-center gap-3 p-4 rounded-xl bg-[hsl(220,20%,10%)] flex-1">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${color.replace(")", " / 0.12)")}` }}>
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] uppercase tracking-wider text-[hsl(215,15%,45%)] font-semibold inline-flex items-center">
                      {label}
                      <InfoTooltip text={tooltip} />
                    </span>
                    <span className="font-display text-sm font-bold block">{formatComparacao(result.meu_perfil?.[field])}</span>
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
