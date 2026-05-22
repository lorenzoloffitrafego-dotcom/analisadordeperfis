import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home, Eye, Heart, MessageCircle, Users, FileText,
  PieChart as PieChartIcon, Calendar, Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PostsTable from "@/components/PostsTable";
import EngajamentoCard from "@/components/EngajamentoCard";
import PostingDaysCard from "@/components/PostingDaysCard";
import InfoTooltip from "@/components/InfoTooltip";
import ResumoIACard from "@/components/ResumoIACard";
import { ResultsThemeContext, t } from "@/components/ResultsThemeContext";

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
  return `${(num * 100).toFixed(0)}%`;
}

const profileKeys = ["meu_perfil", "perfil1", "perfil2"] as const;

// Dot colors matching the reference (teal, lavender, coral)
const PROFILE_DOTS: Record<string, string> = {
  meu_perfil: "hsl(170, 65%, 60%)",
  perfil1: "hsl(250, 70%, 78%)",
  perfil2: "hsl(0, 75%, 82%)",
};

const AnalysisResults = ({ result, onReset }: AnalysisResultsProps) => {
  const navigate = useNavigate();
  const profiles = profileKeys.map((k) => result[k]);
  const theme = "light" as const;
  const th = t(theme);

  const PURPLE = "hsl(258, 80%, 62%)";
  const CYAN = "hsl(190, 80%, 55%)";
  const CORAL = "hsl(5, 80%, 70%)";

  const getLabel = (key: string): string => {
    if (key === "meu_perfil") return "Meu Perfil";
    const profile = result[key];
    if (profile?.nome) return String(profile.nome).charAt(0).toUpperCase() + String(profile.nome).slice(1);
    return key === "perfil1" ? "Perfil 1" : "Perfil 2";
  };
  const getFoto = (key: string): string | undefined => result[key]?.foto;

  const [avgPostAccount, setAvgPostAccount] = useState<string>("meu_perfil");
  const [contentDistAccount, setContentDistAccount] = useState<string>("meu_perfil");
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);

  const handleDownloadPDF = async () => {
    if (!dashboardRef.current || exporting) return;
    setExporting(true);
    try {
      const element = dashboardRef.current;
      const canvas = await html2canvas(element, {
        scale: 1,
        useCORS: true,
        backgroundColor: "#f5f6fb",
        logging: false,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });
      const imgData = canvas.toDataURL("image/png");
      // Single-page PDF sized to the captured canvas
      const pdf = new jsPDF({
        orientation: canvas.width >= canvas.height ? "landscape" : "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
        hotfixes: ["px_scaling"],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("dashboard.pdf");
    } finally {
      setExporting(false);
    }
  };

  const DownloadPdfButton = () => (
    <Button
      size="lg"
      onClick={handleDownloadPDF}
      disabled={exporting}
      className="rounded-xl text-white gap-2"
      style={{ background: PURPLE }}
    >
      <Download className="w-4 h-4" />
      {exporting ? "Gerando PDF..." : "Baixar em PDF"}
    </Button>
  );

  const selectedAvgProfile = result[avgPostAccount];

  const ProfileAvatar = ({ name, size = 20 }: { name: string; size?: number }) => {
    const foto = getFoto(name);
    const fallback = PROFILE_DOTS[name];
    if (!foto) {
      return <span className="rounded-full shrink-0" style={{ width: size, height: size, background: fallback }} />;
    }
    return (
      <img
        src={`https://images.weserv.nl/?url=${encodeURIComponent(foto)}`}
        className="rounded-full object-cover shrink-0"
        style={{ width: size, height: size, border: `1.5px solid ${fallback}` }}
        onError={(e) => {
          const el = e.currentTarget;
          el.style.display = "none";
          const sib = el.nextElementSibling as HTMLElement | null;
          if (sib) sib.style.display = "inline-block";
        }}
      />
    );
  };

  const renderProfileOptions = () =>
    profileKeys.map((name) => (
      <SelectItem key={name} value={name} className="text-xs">
        <div className="flex items-center gap-2">
          <ProfileAvatar name={name} size={20} />
          {getLabel(name)}
        </div>
      </SelectItem>
    ));

  const profilesRecord: Record<string, Record<string, any>> = {};
  profileKeys.forEach((k) => { profilesRecord[k] = result[k]; });

  return (
    <ResultsThemeContext.Provider value={theme}>
      <div className="min-h-screen px-4 sm:px-8 py-6" style={{ background: "#f5f6fb", color: th.pageText }}>
        <div ref={dashboardRef} className="w-full max-w-6xl mx-auto">

          {/* ── Top Bar ── */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity"
              style={{ color: "#000000" }}
            >
              <Home className="w-4 h-4" />
              <span>Início</span>
            </button>
            <div className="flex items-center gap-2 text-sm" style={{ color: "#000000" }}>
              <Calendar className="w-4 h-4" />
              <span>
                {(() => {
                  const fmt = (d: Date) => `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
                  const today = new Date();
                  const past = new Date();
                  past.setDate(today.getDate() - 30);
                  return `${fmt(past)} – ${fmt(today)}`;
                })()}
              </span>
            </div>
          </div>

          {/* ── Title + Download PDF ── */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight mb-1" style={{ color: "hsl(225, 30%, 15%)" }}>
                Dashboard Pronto!
              </h1>
              <p className="text-base" style={{ color: "hsl(220,15%,55%)" }}>Visão geral do seu desempenho</p>
            </div>
            <div data-html2canvas-ignore="true" className="shrink-0">
              <DownloadPdfButton />
            </div>
          </div>

          {/* ── Resumo da IA (dados vêm do N8N via `result.resumo_ia`) ── */}
          {/* N8N payload: `resumo_ia` pode ser string OU objeto { objetivo, contexto, solucao, conclusao } */}
          <ResumoIACard
            resumo={typeof result.resumo_ia === "string" ? result.resumo_ia : undefined}
            objetivo={typeof result.resumo_ia === "object" ? result.resumo_ia?.objetivo : undefined}
            contexto={typeof result.resumo_ia === "object" ? result.resumo_ia?.contexto : undefined}
            solucao={typeof result.resumo_ia === "object" ? result.resumo_ia?.solucao : undefined}
            conclusao={typeof result.resumo_ia === "object" ? result.resumo_ia?.conclusao : undefined}
          />


          {/* ── Perfis Table ── */}
          <div className="rounded-2xl bg-white mb-6 overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.05)" }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    {["Perfis", "Seguidores", "Quantidade de Posts", "Total de Visualizações", "Total de Curtidas", "Total de Comentários"].map((h, i) => (
                      <th
                        key={h}
                        className={`py-5 px-6 text-xs font-semibold ${i === 0 ? "text-left" : "text-center"}`}
                        style={{ color: "hsl(220,15%,35%)" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {profileKeys.map((key, i) => {
                    const p = profiles[i];
                    const isLast = i === profileKeys.length - 1;
                    return (
                      <tr key={key} style={{ borderTop: "1px solid hsl(220,15%,94%)" }}>
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-3">
                            <ProfileAvatar name={key} size={28} />
                            <span className="text-sm font-medium" style={{ color: "hsl(225,30%,20%)" }}>{getLabel(key)}</span>
                          </div>
                        </td>
                        <td className="py-5 px-6 text-center font-display text-sm font-bold" style={{ color: "hsl(225,30%,15%)" }}>{fmtVal(p?.seguidores)}</td>
                        <td className="py-5 px-6 text-center font-display text-sm font-bold" style={{ color: "hsl(225,30%,15%)" }}>{fmtVal(p?.total_posts_3m)}</td>
                        <td className="py-5 px-6 text-center font-display text-sm font-bold" style={{ color: "hsl(225,30%,15%)" }}>{fmtVal(p?.total_views)}</td>
                        <td className="py-5 px-6 text-center font-display text-sm font-bold" style={{ color: "hsl(225,30%,15%)" }}>{fmtVal(p?.total_likes)}</td>
                        <td className="py-5 px-6 text-center font-display text-sm font-bold" style={{ color: "hsl(225,30%,15%)" }}>{fmtVal(p?.total_comentarios)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Desempenho Médio + Engajamento ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {/* Desempenho Médio */}
            <div className="rounded-2xl bg-white p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.05)" }}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-bold text-base" style={{ color: "hsl(225,30%,15%)" }}>Desempenho Médio por Post</h3>
                <Select value={avgPostAccount} onValueChange={setAvgPostAccount}>
                  <SelectTrigger className="w-[150px] h-9 rounded-full text-xs bg-white" style={{ borderColor: "hsl(220,15%,90%)" }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>{renderProfileOptions()}</SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Visualizações", value: selectedAvgProfile?.media_views_por_post, icon: Eye },
                  { label: "Curtidas", value: selectedAvgProfile?.media_likes_por_post, icon: Heart },
                  { label: "Comentários", value: selectedAvgProfile?.media_comentarios_por_post, icon: MessageCircle },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex flex-col items-center gap-3 py-6 rounded-xl" style={{ border: "1px solid hsl(220,15%,93%)" }}>
                    <Icon className="w-6 h-6" style={{ color: PURPLE }} />
                    <span className="font-display text-3xl font-extrabold" style={{ color: "hsl(225,30%,15%)" }}>{fmtVal(value)}</span>
                    <span className="text-xs" style={{ color: "hsl(220,15%,50%)" }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <EngajamentoCard data={{ meu_perfil: { ...result.meu_perfil }, perfil1: { ...result.perfil1 }, perfil2: { ...result.perfil2 } }} />
          </div>

          {/* ── Distribuição de Conteúdo + Distribuição por Dia ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {/* Pie chart */}
            <div className="rounded-2xl bg-white p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.05)" }}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-bold text-base" style={{ color: "hsl(225,30%,15%)" }}>Distribuição de Conteúdo</h3>
                <Select value={contentDistAccount} onValueChange={setContentDistAccount}>
                  <SelectTrigger className="w-[150px] h-9 rounded-full text-xs bg-white" style={{ borderColor: "hsl(220,15%,90%)" }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>{renderProfileOptions()}</SelectContent>
                </Select>
              </div>
              {(() => {
                const profile = result[contentDistAccount];
                const pieData = [
                  { name: "Imagem", value: profile?.porcentagem_imagens || 0, color: CYAN },
                  { name: "Carrossel", value: profile?.porcentagem_carrossel || 0, color: CORAL },
                  { name: "Reels", value: profile?.porcentagem_reels || 0, color: PURPLE },
                ];
                return (
                  <div className="flex items-center justify-between gap-4">
                    <div className="w-[200px] h-[200px] shrink-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={pieData} cx="50%" cy="50%" innerRadius={0} outerRadius={95} dataKey="value" stroke="#fff" strokeWidth={2}>
                            {pieData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                          </Pie>
                          <Tooltip
                            formatter={(value: number, name: string) => [`${value}%`, name]}
                            contentStyle={{ backgroundColor: "#fff", border: "1px solid hsl(220,15%,90%)", borderRadius: "10px", fontSize: "12px", padding: "8px 12px" }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex flex-col gap-3">
                      {pieData.map(({ name, value, color }) => (
                        <div key={name} className="flex items-center gap-2.5">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                          <span className="text-sm font-medium" style={{ color: "hsl(225,30%,25%)" }}>{name} – {value}%</span>
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
          <div className="rounded-2xl bg-white p-6 mb-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.05)" }}>
            <h3 className="font-display font-bold text-base text-center mb-6" style={{ color: "hsl(225,30%,15%)" }}>Comparação com Concorrentes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { field: "comparacao_views", icon: Eye, label: "Visualizações x Concorrentes", tooltip: "Seu domínio de visualizações em relação ao volume total.", color: PURPLE },
                { field: "comparacao_posts", icon: FileText, label: "Posts x Concorrentes", tooltip: "Quanto você produz comparado à atividade total do grupo.", color: CYAN },
                { field: "comparacao_seguidores", icon: Users, label: "Seguidores x Concorrentes", tooltip: "Seu tamanho de audiência no recorte analisado.", color: CORAL },
              ].map(({ field, icon: Icon, label, tooltip, color }) => {
                const rawVal = result.meu_perfil?.[field];
                const numVal = typeof rawVal === "number" ? rawVal : parseFloat(String(rawVal));
                const pct = !isNaN(numVal) ? numVal * 100 : 0;
                return (
                  <div key={field} className="p-5 rounded-xl" style={{ border: "1px solid hsl(220,15%,93%)" }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${color}20` }}>
                        <Icon className="w-4 h-4" style={{ color }} />
                      </div>
                      <span className="text-sm font-medium inline-flex items-center gap-1" style={{ color: "hsl(225,30%,25%)" }}>
                        {label}
                        <InfoTooltip text={tooltip} />
                      </span>
                    </div>
                    <p className="font-display text-4xl font-extrabold mb-3" style={{ color: "hsl(225,30%,15%)" }}>{formatComparacao(rawVal)}</p>
                    <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: `${color}20` }}>
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
          <div className="flex justify-center gap-3 mt-8 pb-8" data-html2canvas-ignore="true">
            <Button
              variant="outline"
              size="lg"
              className="rounded-xl bg-white"
              style={{ borderColor: "hsl(220,15%,88%)", color: "hsl(225,30%,20%)" }}
              onClick={() => navigate("/")}
            >
              Início
            </Button>
            <Button
              size="lg"
              className="rounded-xl text-white"
              style={{ background: PURPLE }}
              onClick={onReset}
            >
              Nova Análise
            </Button>
            <DownloadPdfButton />
          </div>
        </div>
      </div>
    </ResultsThemeContext.Provider>
  );
};

export default AnalysisResults;
