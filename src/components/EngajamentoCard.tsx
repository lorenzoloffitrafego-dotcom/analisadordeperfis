import { useState } from "react";
import { Users, Eye } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import InfoTooltip from "@/components/InfoTooltip";

interface PerfilData {
  engajamento_por_seguidor?: number | null;
  engajamento_por_views?: number | null;
  nome?: string;
  foto?: string;
}

interface EngajamentoCardProps {
  data: { meu_perfil: PerfilData; perfil1?: PerfilData; perfil2?: PerfilData };
}

const PURPLE = "hsl(258, 80%, 62%)";
const PROFILE_DOTS: Record<string, string> = {
  meu_perfil: "hsl(170, 65%, 60%)",
  perfil1: "hsl(250, 70%, 78%)",
  perfil2: "hsl(0, 75%, 82%)",
};

function formatEngagementValue(value: number | null | undefined): string {
  if (value === null || value === undefined || value === 0) return "—";
  return `${value.toFixed(1)}%`;
}

const EngajamentoCard = ({ data }: EngajamentoCardProps) => {
  const contas = [
    { key: "meu_perfil", label: "Meu Perfil", dados: data.meu_perfil },
    { key: "perfil1", label: data.perfil1?.nome || "Perfil 1", dados: data.perfil1 || {} },
    { key: "perfil2", label: data.perfil2?.nome || "Perfil 2", dados: data.perfil2 || {} },
  ];

  const [selectedKey, setSelectedKey] = useState("meu_perfil");
  const contaSelecionada = contas.find((c) => c.key === selectedKey) || contas[0];

  return (
    <div className="rounded-2xl bg-white p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.05)" }}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-bold text-base" style={{ color: "hsl(225,30%,15%)" }}>Engajamento do Público</h3>
        <Select value={selectedKey} onValueChange={setSelectedKey}>
          <SelectTrigger className="w-[150px] h-9 rounded-full text-xs bg-white" style={{ borderColor: "hsl(220,15%,90%)" }}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {contas.map((c) => (
              <SelectItem key={c.key} value={c.key} className="text-xs">
                <div className="flex items-center gap-2">
                  {c.dados?.foto ? (
                    <img
                      src={`https://images.weserv.nl/?url=${encodeURIComponent(c.dados.foto)}`}
                      className="w-5 h-5 rounded-full object-cover"
                      style={{ border: `1.5px solid ${PROFILE_DOTS[c.key]}` }}
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: PROFILE_DOTS[c.key] }} />
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
            label: "Engajamento por Seguidor",
            value: contaSelecionada.dados.engajamento_por_seguidor,
            icon: Users,
            tip: "Percentual de seguidores que interage ativamente com seus posts.",
          },
          {
            label: "Engajamento por Views",
            value: contaSelecionada.dados.engajamento_por_views,
            icon: Eye,
            tip: "Percentual de quem viu seus posts que interage com eles.",
          },
        ].map(({ label, value, icon: Icon, tip }) => (
          <div key={label} className="flex flex-col items-center gap-3 py-6 rounded-xl" style={{ border: "1px solid hsl(220,15%,93%)" }}>
            <Icon className="w-6 h-6" style={{ color: PURPLE }} />
            <span className="font-display text-3xl font-extrabold" style={{ color: "hsl(225,30%,15%)" }}>
              {formatEngagementValue(value)}
            </span>
            <span className="text-xs text-center inline-flex items-center gap-1" style={{ color: "hsl(220,15%,50%)" }}>
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
