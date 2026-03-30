import { useState } from "react";
import { Users, Eye, TrendingUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import InfoTooltip from "@/components/InfoTooltip";
import { useResultsTheme, t } from "@/components/ResultsThemeContext";

interface PerfilData {
  engajamento_por_seguidor?: number | null;
  engajamento_por_views?: number | null;
  nome?: string;
  foto?: string;
}

interface EngajamentoCardProps {
  data: { meu_perfil: PerfilData; perfil1?: PerfilData; perfil2?: PerfilData };
}

function formatEngagementValue(value: number | null | undefined): string {
  if (value === null || value === undefined || value === 0) return "—";
  return `${value.toFixed(1)}%`;
}

const EngajamentoCard = ({ data }: EngajamentoCardProps) => {
  const theme = useResultsTheme();
  const th = t(theme);

  const contas = [
    { key: "meu_perfil", label: "Meu Perfil", dados: data.meu_perfil, foto: data.meu_perfil?.foto },
    { key: "perfil1", label: data.perfil1?.nome || "Perfil 1", dados: data.perfil1 || {}, foto: data.perfil1?.foto },
    { key: "perfil2", label: data.perfil2?.nome || "Perfil 2", dados: data.perfil2 || {}, foto: data.perfil2?.foto },
  ];

  const [selectedKey, setSelectedKey] = useState("meu_perfil");
  const contaSelecionada = contas.find((c) => c.key === selectedKey) || contas[0];

  return (
    <div className="rounded-2xl p-5 transition-colors duration-500" style={{ background: th.cardBg, border: `1px solid ${th.cardBorder}`, boxShadow: th.cardShadow }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4" style={{ color: th.accentBlue }} />
          <h3 className="font-display font-bold text-sm">Engajamento do Público</h3>
        </div>
        <Select value={selectedKey} onValueChange={setSelectedKey}>
          <SelectTrigger className="w-[160px] h-8 text-xs" style={{ borderColor: th.selectBorder, background: th.selectBg }}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {contas.map((c) => (
              <SelectItem key={c.key} value={c.key} className="text-xs">
                <div className="flex items-center gap-2">
                  {c.foto && (
                    <img src={`https://images.weserv.nl/?url=${encodeURIComponent(c.foto)}`} className="w-5 h-5 rounded-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                  )}
                  {c.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          {
            label: "Engajamento dos Seguidores",
            value: contaSelecionada.dados.engajamento_por_seguidor,
            icon: Users,
            color: th.accentPurple,
            tip: "Percentual de seguidores que interage ativamente com seus posts.",
          },
          {
            label: "Engajamento por Views",
            value: contaSelecionada.dados.engajamento_por_views,
            icon: Eye,
            color: th.accentGreen,
            tip: "Percentual de quem viu seus posts que interage com eles.",
          },
        ].map(({ label, value, icon: Icon, color, tip }) => (
          <div key={label} className="flex flex-col items-center gap-2 p-4 rounded-xl" style={{ background: th.innerBg }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${color}18` }}>
              <Icon className="w-4 h-4" style={{ color }} />
            </div>
            <span className="font-display text-xl font-bold" style={{ color }}>
              {formatEngagementValue(value)}
            </span>
            <span className="text-[9px] uppercase tracking-wider font-semibold text-center leading-tight inline-flex items-center gap-0.5" style={{ color: th.mutedText }}>
              {label}
              <InfoTooltip text={tip} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EngajamentoCard;
