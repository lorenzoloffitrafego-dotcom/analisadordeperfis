import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, RotateCcw, Users, Eye, Heart, MessageCircle,
  CalendarDays, FileText, TrendingUp, BarChart3, PieChart as PieChartIcon,
  ArrowUp, ArrowDown, ArrowUpDown, Sun, Moon, Calendar, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import PostsTable from "@/components/PostsTable";
import EngajamentoCard from "@/components/EngajamentoCard";
import PostingDaysCard from "@/components/PostingDaysCard";
import InfoTooltip from "@/components/InfoTooltip";
import { ResultsThemeContext, ResultsTheme, t } from "@/components/ResultsThemeContext";

interface AnalysisResultsProps {
  result: Record<string, any>;
  onReset: () => void;
}

function fmtVal(value: unknown): string {
  if (value === null || value === undefined) return "—";
  const num = typeof value === "number" ? value : parseFloat(String(value));
  if (isNaN(num) || num === 0) return "—";
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  if (Number.isInteger(num)) return String(num);
  return num.toFixed(1);
}

function formatComparacao(raw: unknown): string {
  if (raw === null || raw === undefined) return "—";
  const num = typeof raw === "number" ? raw : parseFloat(String(raw));
  if (isNaN(num) || num === 0) return "—";
  const pct = num * 100;
  return `${pct.toFixed(1)}%`;
}

const profileKeys = ["meu_perfil", "perfil1", "perfil2"] as const;

const AnalysisResults = ({ result, onReset }: AnalysisResultsProps) => {
  const navigate = useNavigate();
  const profiles = profileKeys.map((k) => result[k]);
  const [theme, setTheme] = useState<ResultsTheme>("dark");
  const th = t(theme);

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

  const profilesRecord: Record<string, Record<string, any>> = {};
  profileKeys.forEach((k) => { profilesRecord[k] = result[k]; });

  // Date range
  const now = new Date();
  const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
  const fmt = (d: Date) => d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <ResultsThemeContext.Provider value={theme}>
      <div className="min-h-screen px-4 py-8 transition-colors duration-500" style={{ background: th.pageBg, color: th.pageText }}>
        <div className="w-full max-w-6xl mx-auto">

          {/* ── Header ── */}
          <div className="flex items-start justify-between mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="text-xs gap-1.5 opacity-60 hover:opacity-100"
              style={{ color: th.pageText }}
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Início
            </Button>

            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 mb-3 text-[10px] font-semibold uppercase tracking-wider"
                style={{ background: `${th.accentBlue}15`, color: th.accentBlue }}>
                <Sparkles className="w-3 h-3" /> Análise Completa
              </div>
              <h1 className="font-display text-2xl md:text-3xl font-bold mb-1">Resultado da Análise</h1>
              <div className="flex items-center justify-center gap-1.5 text-xs" style={{ color: th.subtitle }}>
                <Calendar className="w-3 h-3" />
                <span>{fmt(threeMonthsAgo)} — {fmt(now)}</span>
              </div>
            </div>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105"
              style={{ background: th.innerBg, border: `1px solid ${th.cardBorder}` }}
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-[hsl(45,95%,65%)]" /> : <Moon className="w-4 h-4 text-[hsl(230,60%,50%)]" />}
            </button>
          </div>

          {/* ── Profile Cards Row ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {profileKeys.map((key, i) => {
              const p = profiles[i];
              const isMain = i === 0;
              return (
                <div
                  key={key}
                  className="rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: th.cardBg,
                    border: `1px solid ${isMain ? th.accentBlue + "40" : th.cardBorder}`,
                    boxShadow: isMain
                      ? `${th.cardShadow}, 0 0 0 1px ${th.accentBlue}15`
                      : th.cardShadow,
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={`https://images.weserv.nl/?url=${encodeURIComponent(p?.foto || "")}`}
                      className={`w-11 h-11 rounded-full object-cover ring-2 ${isMain ? "ring-[hsl(230,80%,65%)]" : "ring-transparent"}`}
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                    <div>
                      <p className="font-display font-bold text-sm" style={{ color: isMain ? th.accentBlue : th.pageText }}>
                        {getLabel(key)}
                      </p>
                      {isMain && (
                        <span className="text-[9px] uppercase tracking-widest font-semibold" style={{ color: th.accentBlue + "90" }}>
                          Seu perfil
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Seguidores", value: p?.seguidores, icon: Users },
                      { label: "Posts", value: p?.total_posts_3m, icon: FileText },
                      { label: "Views", value: p?.total_views, icon: Eye },
                    ].map(({ label, value, icon: Icon }) => (
                      <div key={label} className="text-center p-2 rounded-lg" style={{ background: th.innerBg }}>
                        <Icon className="w-3.5 h-3.5 mx-auto mb-1" style={{ color: th.mutedText }} />
                        <p className="font-display text-sm font-bold">{fmtVal(value)}</p>
                        <p className="text-[9px] uppercase tracking-wider" style={{ color: th.mutedText }}>{label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {[
                      { label: "Likes", value: p?.total_likes, color: th.accentBlue },
                      { label: "Comentários", value: p?.total_comentarios, color: th.accentYellow },
                    ].map(({ label, value, color }) => (
                      <div key={label} className="text-center p-2 rounded-lg" style={{ background: th.innerBg }}>
                        <p className="font-display text-sm font-bold" style={{ color }}>{fmtVal(value)}</p>
                        <p className="text-[9px] uppercase tracking-wider" style={{ color: th.mutedText }}>{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Desempenho Médio + Engajamento ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Desempenho Médio */}
            <div className="rounded-2xl p-5 transition-colors duration-500" style={{ background: th.cardBg, border: `1px solid ${th.cardBorder}`, boxShadow: th.cardShadow }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" style={{ color: th.accentBlue }} />
                  <h3 className="font-display font-bold text-sm">Desempenho Médio por Post</h3>
                  <InfoTooltip text="Alcance médio do seu conteúdo: views, likes e comentários por post." />
                </div>
                <Select value={avgPostAccount} onValueChange={setAvgPostAccount}>
                  <SelectTrigger className="w-[160px] h-8 text-xs" style={{ borderColor: th.selectBorder, background: th.selectBg }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>{renderProfileOptions()}</SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Views", value: selectedAvgProfile?.media_views_por_post, icon: Eye, color: th.accentGreen },
                  { label: "Likes", value: selectedAvgProfile?.media_likes_por_post, icon: Heart, color: th.accentBlue },
                  { label: "Comentários", value: selectedAvgProfile?.media_comentarios_por_post, icon: MessageCircle, color: th.accentYellow },
                ].map(({ label, value, icon: Icon, color }) => (
                  <div key={label} className="flex flex-col items-center gap-2 p-4 rounded-xl" style={{ background: th.innerBg }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${color}18` }}>
                      <Icon className="w-4 h-4" style={{ color }} />
                    </div>
                    <span className="font-display text-xl font-bold" style={{ color }}>{fmtVal(value)}</span>
                    <span className="text-[9px] uppercase tracking-wider font-semibold" style={{ color: th.mutedText }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <EngajamentoCard data={{ meu_perfil: { ...result.meu_perfil }, perfil1: { ...result.perfil1 }, perfil2: { ...result.perfil2 } }} />
          </div>

          {/* ── Distribuição de Conteúdo + Dia das Postagens ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Pie chart */}
            <div className="rounded-2xl p-5 flex flex-col transition-colors duration-500" style={{ background: th.cardBg, border: `1px solid ${th.cardBorder}`, boxShadow: th.cardShadow }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <PieChartIcon className="w-4 h-4" style={{ color: th.accentPurple }} />
                  <h3 className="font-display font-bold text-sm">Distribuição de Conteúdo</h3>
                  <InfoTooltip text="Proporção de Reels, Carrosséis e Imagens postados." />
                </div>
                <Select value={contentDistAccount} onValueChange={setContentDistAccount}>
                  <SelectTrigger className="w-[160px] h-8 text-xs" style={{ borderColor: th.selectBorder, background: th.selectBg }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>{renderProfileOptions()}</SelectContent>
                </Select>
              </div>
              {(() => {
                const profile = result[contentDistAccount];
                const pieData = [
                  { name: "Reels", value: profile?.porcentagem_reels || 0, color: th.accentPurple },
                  { name: "Imagens", value: profile?.porcentagem_imagens || 0, color: th.accentBlue },
                  { name: "Carrossel", value: profile?.porcentagem_carrossel || 0, color: th.accentPink },
                ];
                return (
                  <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    <div className="w-full h-[170px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={pieData} cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={2} dataKey="value" stroke="none">
                            {pieData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                          </Pie>
                          <Tooltip
                            formatter={(value: number, name: string) => [`${value}%`, name]}
                            contentStyle={{ backgroundColor: theme === "dark" ? "#1a1a2e" : "#fff", color: th.pageText, border: `1px solid ${th.cardBorder}`, borderRadius: "10px", fontSize: "12px", padding: "8px 12px" }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex gap-5">
                      {pieData.map(({ name, value, color }) => (
                        <div key={name} className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                          <span className="text-xs font-medium" style={{ color: th.labelText }}>{name} — {value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>

            <PostingDaysCard profiles={profilesRecord} profileNames={[...profileKeys]} getLabel={getLabel} getFoto={getFoto} />
          </div>

          {/* ── Comparação com Concorrentes ── */}
          <div className="rounded-2xl p-5 mb-4 transition-colors duration-500" style={{ background: th.cardBg, border: `1px solid ${th.cardBorder}`, boxShadow: th.cardShadow }}>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4" style={{ color: th.accentOrange }} />
              <h3 className="font-display font-bold text-sm">Comparação com Concorrentes</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { field: "comparacao_views", icon: Eye, label: "Views", tooltip: "Seu domínio de visualizações em relação ao volume total.", color: th.accentGreen },
                { field: "comparacao_posts", icon: FileText, label: "Posts", tooltip: "Quanto você produz comparado à atividade total do grupo.", color: th.accentYellow },
                { field: "comparacao_seguidores", icon: Users, label: "Seguidores", tooltip: "Seu tamanho de audiência no recorte analisado.", color: th.accentPurple },
              ].map(({ field, icon: Icon, label, tooltip, color }) => {
                const rawVal = result.meu_perfil?.[field];
                const numVal = typeof rawVal === "number" ? rawVal : parseFloat(String(rawVal));
                const pct = !isNaN(numVal) ? numVal * 100 : 0;
                return (
                  <div key={field} className="p-4 rounded-xl" style={{ background: th.innerBg }}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}18` }}>
                        <Icon className="w-4 h-4" style={{ color }} />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-semibold flex items-center gap-0.5" style={{ color: th.mutedText }}>
                          {label} vs Concorrentes
                          <InfoTooltip text={tooltip} />
                        </span>
                      </div>
                    </div>
                    <p className="font-display text-2xl font-bold mb-2" style={{ color }}>{formatComparacao(rawVal)}</p>
                    {/* Progress bar */}
                    <div className="w-full h-1.5 rounded-full" style={{ background: `${color}15` }}>
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.min(pct, 100)}%`, background: color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Posts Table ── */}
          <PostsTable profiles={profilesRecord} profileNames={[...profileKeys]} getLabel={getLabel} getFoto={getFoto} />

          {/* ── Actions ── */}
          <div className="flex justify-center gap-3 mt-8 pb-8">
            <Button
              variant="outline"
              size="lg"
              className="rounded-xl transition-colors duration-300"
              style={{ borderColor: th.cardBorder, background: th.cardBg, color: th.pageText }}
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" /> Início
            </Button>
            <Button
              size="lg"
              className="rounded-xl text-white"
              style={{ background: th.accentBlue }}
              onClick={onReset}
            >
              <RotateCcw className="w-4 h-4 mr-1.5" /> Nova Análise
            </Button>
          </div>
        </div>
      </div>
    </ResultsThemeContext.Provider>
  );
};

export default AnalysisResults;
