import { useState } from "react";
import { Users, Eye } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import InfoTooltip from "@/components/InfoTooltip";
import ProfileAvatar from "@/components/ProfileAvatar";

interface EngajamentoCardProps {
  profiles: Record<string, Record<string, any>>;
  profileNames: string[];
  getLabel: (key: string) => string;
  getFoto: (key: string) => string | undefined;
}

const PURPLE = "hsl(258, 80%, 62%)";
const PROFILE_DOTS: Record<string, string> = {
  meu_perfil: "hsl(170, 65%, 60%)",
  perfil1: "hsl(250, 70%, 78%)",
  perfil2: "hsl(0, 75%, 82%)",
};

function formatEngagementValue(value: number | null | undefined): string {
  if (value === null || value === undefined || value === 0) return "—";
  return `${Number(value).toFixed(1)}%`;
}

const EngajamentoCard = ({ profiles, profileNames, getLabel, getFoto }: EngajamentoCardProps) => {
  const [selectedKey, setSelectedKey] = useState(profileNames[0] || "meu_perfil");
  const dados = profiles[selectedKey] || {};

  return (
    <div className="rounded-2xl bg-white p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.05)" }}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-bold text-base" style={{ color: "hsl(225,30%,15%)" }}>Engajamento do Público</h3>
        <Select value={selectedKey} onValueChange={setSelectedKey}>
          <SelectTrigger className="w-[150px] h-9 rounded-full text-xs bg-white" style={{ borderColor: "hsl(220,15%,90%)" }}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {profileNames.map((key) => (
              <SelectItem key={key} value={key} className="text-xs">
                <div className="flex items-center gap-2">
                  <ProfileAvatar label={getLabel(key)} foto={getFoto(key)} size={32} ringColor={PROFILE_DOTS[key]} />
                  {getLabel(key)}
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
            value: dados.engajamento_por_seguidor,
            icon: Users,
            tip: "Percentual de seguidores que interage ativamente com seus posts.",
          },
          {
            label: "Engajamento por Views",
            value: dados.engajamento_por_views,
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
