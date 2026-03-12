import { useState } from "react";
import { Users, Eye, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  label: string;
  dados: PerfilData;
  foto?: string;
}

interface EngajamentoCardProps {
  data: EngajamentoData;
}

function formatEngagementValue(value: number | null | undefined): string {
  if (value === null || value === undefined || value === 0) {
    return "—";
  }
  return `${value.toFixed(1)}%`;
}

const EngajamentoCard = ({ data }: EngajamentoCardProps) => {
  const contas: ContaOption[] = [
    { label: "Meu Perfil", dados: data.meu_perfil, foto: data.meu_perfil?.foto },
    {
      label: data.perfil1?.nome || "Perfil 1",
      dados: data.perfil1 || {},
      foto: data.perfil1?.foto,
    },
    {
      label: data.perfil2?.nome || "Perfil 2",
      dados: data.perfil2 || {},
      foto: data.perfil2?.foto,
    },
  ];

  const [contaSelecionada, setContaSelecionada] = useState<ContaOption>(contas[0]);

  return (
    <div className="rounded-2xl border border-[hsl(220,15%,14%)]/50 bg-[hsl(220,20%,8%)]/80 backdrop-blur-sm p-6" style={{ boxShadow: "0 8px 32px -8px hsl(0 0% 0% / 0.5)" }}>
      {/* Dropdown */}
      <div className="mb-5">
        <Select
          value={contaSelecionada.label}
          onValueChange={(value) => {
            const conta = contas.find((c) => c.label === value);
            if (conta) setContaSelecionada(conta);
          }}
        >
          <SelectTrigger className="w-full h-11 text-sm border-[hsl(220,15%,14%)] bg-[hsl(220,20%,6%)] hover:bg-[hsl(220,20%,10%)] transition-colors">
            <div className="flex items-center gap-2.5">
              {contaSelecionada.foto && (
                <img
                  src={`https://images.weserv.nl/?url=${encodeURIComponent(contaSelecionada.foto)}`}
                  alt={contaSelecionada.label}
                  className="w-6 h-6 rounded-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
              )}
              <span className="font-medium">{contaSelecionada.label}</span>
            </div>
            <ChevronDown className="w-4 h-4 text-[hsl(215,15%,45%)] ml-auto" />
          </SelectTrigger>
          <SelectContent className="border-[hsl(220,15%,14%)] bg-[hsl(220,20%,8%)]">
            {contas.map((conta) => (
              <SelectItem
                key={conta.label}
                value={conta.label}
                className="text-sm cursor-pointer focus:bg-[hsl(230,80%,65%,0.08)]"
              >
                <div className="flex items-center gap-2.5 py-1">
                  {conta.foto && (
                    <img
                      src={`https://images.weserv.nl/?url=${encodeURIComponent(conta.foto)}`}
                      alt={conta.label}
                      className="w-5 h-5 rounded-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  )}
                  <span>{conta.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Cards de Engajamento */}
      <div className="grid grid-cols-2 gap-4">
        {/* Card 1 — Engajamento dos Seguidores */}
        <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[hsl(220,20%,10%)] transition-all duration-300">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-1" style={{ backgroundColor: "hsl(230, 80%, 65%, 0.12)" }}>
            <Users className="w-5 h-5" style={{ color: "hsl(230, 80%, 70%)" }} />
          </div>
          <span className="font-display text-2xl font-bold text-[hsl(230,80%,70%)] transition-all duration-300">
            {formatEngagementValue(contaSelecionada.dados.engajamento_por_seguidor)}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-[hsl(215,15%,45%)] font-semibold text-center leading-tight">
            Engajamento dos Seguidores
          </span>
        </div>

        {/* Card 2 — Engajamento por Views */}
        <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[hsl(220,20%,10%)] transition-all duration-300">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-1" style={{ backgroundColor: "hsl(160, 80%, 50%, 0.12)" }}>
            <Eye className="w-5 h-5" style={{ color: "hsl(160, 80%, 50%)" }} />
          </div>
          <span className="font-display text-2xl font-bold text-[hsl(160,80%,50%)] transition-all duration-300">
            {formatEngagementValue(contaSelecionada.dados.engajamento_por_views)}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-[hsl(215,15%,45%)] font-semibold text-center leading-tight">
            Engajamento por Views
          </span>
        </div>
      </div>
    </div>
  );
};

export default EngajamentoCard;
