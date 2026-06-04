import { useState, useRef, useEffect } from "react";
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
// Altura aproximada para mostrar ~4 linhas quando colapsado
const COLLAPSED_HEIGHT = 110;

const ResumoIACard = ({ resumo, objetivo, contexto, solucao, conclusao }: ResumoIACardProps) => {
  // Colapsado por padrão
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [fullHeight, setFullHeight] = useState(0);

  const sections = [
    { title: "Objetivo", text: objetivo },
    { title: "Contexto", text: contexto },
    { title: "Solução", text: solucao },
    { title: "Conclusão", text: conclusao },
  ].filter((s) => s.text && String(s.text).trim().length > 0);

  const hasResumoText = resumo && String(resumo).trim().length > 0;
  const hasContent = hasResumoText || sections.length > 0;

  useEffect(() => {
    if (contentRef.current) {
      setFullHeight(contentRef.current.scrollHeight);
    }
  }, [resumo, objetivo, contexto, solucao, conclusao]);

  return (
    <div
      className="rounded-2xl bg-white p-6 mb-6"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.05)" }}
      data-resumo-ia-card
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

      {/* Conteúdo - colapsável com transição suave */}
      <div
        data-resumo-ia-content
        style={{
          maxHeight: expanded ? `${fullHeight || 9999}px` : `${COLLAPSED_HEIGHT}px`,
          overflow: "hidden",
          transition: "max-height 400ms ease",
          position: "relative",
        }}
      >
        <div ref={contentRef} className="space-y-4">
          {!hasContent ? (
            <p className="text-sm" style={{ color: "hsl(220,15%,55%)" }}>
              O resumo da IA aparecerá aqui assim que os dados forem processados.
            </p>
          ) : hasResumoText ? (
            <div style={{ color: "#000000" }}>
              {(() => {
                // Limpa marcadores markdown e quebra em parágrafos
                const cleaned = resumo!
                  // remove headings markdown (### Titulo) mantendo só o texto, vira parágrafo próprio
                  .replace(/^#{1,6}\s*/gm, "")
                  // remove marcadores de lista no início da linha (-, *, •, 1.)
                  .replace(/^\s*([-*•]|\d+\.)\s+/gm, "")
                  // remove comentários estilo // e barras isoladas
                  .replace(/^\s*\/\/+\s*/gm, "")
                  // remove blockquotes
                  .replace(/^\s*>\s?/gm, "")
                  // remove código inline `texto`
                  .replace(/`([^`]+)`/g, "$1")
                  // remove links markdown [texto](url) → texto
                  .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

                // Renderiza **negrito** como <strong>, ignora demais marcações
                const renderInline = (text: string) => {
                  const parts = text.split(/(\*\*[^*]+\*\*|__[^_]+__)/g);
                  return parts.map((part, i) => {
                    const m = part.match(/^(\*\*|__)(.+)\1$/);
                    if (m) return <strong key={i} className="font-semibold">{m[2]}</strong>;
                    return <span key={i}>{part}</span>;
                  });
                };

                const paragraphs = cleaned
                  .split(/\n\s*\n+/)
                  .map((p) => p.replace(/\s*\n\s*/g, " ").trim())
                  .filter((p) => p.length > 0);

                return paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className="text-sm leading-relaxed"
                    style={{ marginBottom: idx === paragraphs.length - 1 ? 0 : "0.9rem" }}
                  >
                    {renderInline(p)}
                  </p>
                ));
              })()}
            </div>

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

        {/* Fade overlay quando colapsado */}
        {!expanded && hasContent && (
          <div
           
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "40px",
              background: "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))",
              pointerEvents: "none",
            }}
          />
        )}
      </div>

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
