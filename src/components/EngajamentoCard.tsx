import { useState } from "react";
import { Users, Eye, TrendingUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InfoTooltip from "@/components/InfoTooltip";
import { useResultsTheme, t } from "@/components/ResultsThemeContext";

interface PerfilData {
  engajamento_por_seguidor?: number | null;
  engajamento_por_views?: number | null;
  nome?: string;
  foto?: string;
}

interface EngajamentoData {
  meu_perfil: PerfilData;
  perfil1?: PerfilData;
  perfil2?: PerfilData;
}

interface ContaOption {
  key: string;
  label: string;
  dados: PerfilData;
  foto?: string;
}

interface EngajamentoCardProps {
  data: EngajamentoData;
}

function formatEngagementValue(value: number | null | undefined): string {
  if (value === null || value === undefined || value === 0) return "—";
  return `${value.toFixed(1)}%`;
}

const EngajamentoCard = ({ data }: EngajamentoCardProps) => {
  const theme = useResultsTheme();
  const th = t(theme);

  const contas: ContaOption[] = [
    { key: "meu_perfil", label: "Meu Perfil", dados: data.meu_perfil, foto: data.meu_perfil?.foto },
    { key: "perfil1", label: data.perfil1?.nome || "Perfil 1", dados: data.perfil1 || {}, foto: data.perfil1?.foto },
    { key: "perfil2", label: data.perfil2?.nome || "Perfil 2", dados: data.perfil2 || {}, foto: data.perfil2?.foto },
  ];

  const [selectedKey, setSelectedKey] = useState("meu_perfil");
  const contaSelecionada = contas.find((c) => c.key === selectedKey) || contas[0];

  return (
    <div className="rounded-2xl border backdrop-blur-sm p-6 transition-colors duration-500" style={{ borderColor: th.cardBorder, background: th.cardBg, boxShadow: th.cardShadow }}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[hsl(230,80%,70%)]" />
          <h3 className="font-display font-bold text-sm">Engajamento do Público</h3>
        </div>
        <Select value={selectedKey} onValueChange={setSelectedKey}>
          <SelectTrigger className="w-[180px] h-8 text-xs" style={{ borderColor: th.selectBorder, background: th.selectBg }}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {contas.map((conta) => (
              <SelectItem key={conta.key} value={conta.key} className="text-xs">
                <div className="flex items-center gap-2">
                  {conta.foto && (
                    <img
                      src={`https://images.weserv.nl/?url=${encodeURIComponent(conta.foto)}`}
                      alt={conta.label}
                      className="w-5 h-5 rounded-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  )}
                  {conta.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300" style={{ background: th.innerBg }}>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-1" style={{ backgroundColor: "hsl(230, 80%, 65%, 0.12)" }}>
            <Users className="w-5 h-5" style={{ color: "hsl(230, 80%, 70%)" }} />
          </div>
          <span className="font-display text-2xl font-bold text-[hsl(230,80%,70%)] transition-all duration-300">
            {formatEngagementValue(contaSelecionada.dados.engajamento_por_seguidor)}
          </span>
          <span className="text-[10px] uppercase tracking-wider font-semibold text-center leading-tight inline-flex items-center gap-0.5" style={{ color: th.mutedText }}>
            Engajamento dos Seguidores
            <InfoTooltip text="Entenda o percentual de seguidores que reage e interage ativamente com o que você posta." />
          </span>
        </div>

        <div className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300" style={{ background: th.innerBg }}>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-1" style={{ backgroundColor: "hsl(160, 80%, 50%, 0.12)" }}>
            <Eye className="w-5 h-5" style={{ color: "hsl(160, 80%, 50%)" }} />
          </div>
          <span className="font-display text-2xl font-bold text-[hsl(160,80%,50%)] transition-all duration-300">
            {formatEngagementValue(contaSelecionada.dados.engajamento_por_views)}
          </span>
          <span className="text-[10px] uppercase tracking-wider font-semibold text-center leading-tight inline-flex items-center gap-0.5" style={{ color: th.mutedText }}>
            Engajamento por Views
            <InfoTooltip text="Entenda o percentual de pessoas que viram os seus posts que interagem ativamente com o que você posta." />
          </span>
        </div>
      </div>
    </div>
  );
};

export default EngajamentoCard;
