import { useState } from "react";
import { Sparkles, ChevronDown, ChevronUp } from "lucide-react";

interface ResumoIACardProps {
  // Dados vindos do N8N (campo `resumo_ia` no payload do webhook)
  // Pode ser uma string única OU um objeto com seções
  resumo?: string;
  objetivo?: string;
  contexto?: string;
  solucao?: string;
  conclusao?: string;
}

const PURPLE = "hsl(258, 80%, 62%)";

const ResumoIACard = ({ resumo, objetivo, contexto, solucao, conclusao }: ResumoIACardProps) => {
  const [expanded, setExpanded] = useState(true);

  // Seções estruturadas (quando o N8N retorna objeto)
  const sections = [
    { title: "Objetivo", text: objetivo },
    { title: "Contexto", text: contexto },
    { title: "Solução", text: solucao },
    { title: "Conclusão", text: conclusao },
  ].filter((s) => s.text && String(s.text).trim().length > 0);

  const hasResumoText = resumo && String(resumo).trim().length > 0;
  const hasContent = hasResumoText || sections.length > 0;

  return (
    <div
      className="rounded-2xl bg-white p-6 mb-6"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.05)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: `${PURPLE}1A` }}
        >
          <Sparkles className="w-5 h-5" style={{ color: PURPLE }} />
        </div>
        <h3 className="font-display font-bold text-lg" style={{ color: "hsl(225,30%,15%)" }}>
          Resumo da IA
        </h3>
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{ background: `${PURPLE}1A`, color: PURPLE }}
        >
          Gerado automaticamente
        </span>
      </div>

      {/* Conteúdo - dados do N8N entram aqui */}
      {expanded && (
        <div className="space-y-4">
          {sections.length === 0 ? (
            <p className="text-sm" style={{ color: "hsl(220,15%,55%)" }}>
              {/* TODO: Quando N8N não retorna dados, exibe placeholder */}
              O resumo da IA aparecerá aqui assim que os dados forem processados.
            </p>
          ) : (
            sections.map((s, i) => (
              <div key={s.title} className={i > 0 ? "pt-4 border-t" : ""} style={i > 0 ? { borderColor: "hsl(220,15%,93%)" } : {}}>
                <h4 className="font-bold text-sm mb-1.5" style={{ color: "hsl(225,30%,15%)" }}>
                  {s.title}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: "hsl(220,15%,35%)" }}>
                  {s.text}
                </p>
              </div>
            ))
          )}
        </div>
      )}

      {/* Toggle */}
      <div className="flex justify-center mt-5">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-1.5 text-sm font-semibold hover:opacity-80 transition-opacity"
          style={{ color: PURPLE }}
        >
          {expanded ? "Ver menos" : "Ver mais"}
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

export default ResumoIACard;
