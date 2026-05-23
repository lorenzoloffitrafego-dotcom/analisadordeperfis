import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ShareDialogProps {
  open: boolean;
  onClose: () => void;
  result: Record<string, any>;
}

const ShareDialog = ({ open, onClose, result }: ShareDialogProps) => {
  const [link, setLink] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLink("");
    setError("");
    setCopied(false);
    setLoading(true);
    (async () => {
      const { data, error: insErr } = await supabase
        .from("shared_analyses")
        .insert({ result })
        .select("id")
        .maybeSingle();
      if (insErr || !data) {
        setError("Não foi possível gerar o link. Tente novamente.");
      } else {
        setLink(`${window.location.origin}/share/${data.id}`);
      }
      setLoading(false);
    })();
  }, [open, result]);

  const handleCopy = async () => {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Não foi possível copiar. Selecione o link manualmente.");
    }
  };

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15, 18, 30, 0.55)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full bg-white"
        style={{
          maxWidth: 440,
          borderRadius: 16,
          boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
          padding: "28px 28px 24px",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-4 right-4 rounded-full p-1 hover:bg-black/5 transition-colors"
          style={{ color: "#6b7280" }}
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-bold text-xl mb-1" style={{ color: "#0f172a" }}>
          Compartilhar análise
        </h2>
        <p className="text-sm mb-5" style={{ color: "#6b7280" }}>
          Qualquer pessoa com o link pode visualizar
        </p>

        <div className="flex items-center gap-2">
          <input
            readOnly
            value={loading ? "Gerando link..." : link}
            className="flex-1 text-sm outline-none"
            style={{
              background: "#f5f6fb",
              border: "1px solid #e2e4ea",
              borderRadius: 999,
              padding: "10px 14px",
              color: "#0f172a",
            }}
            onFocus={(e) => e.currentTarget.select()}
          />
          <button
            onClick={handleCopy}
            disabled={loading || !link}
            className="text-sm font-medium text-white whitespace-nowrap transition-opacity disabled:opacity-50"
            style={{
              background: "hsl(258, 80%, 62%)",
              borderRadius: 999,
              padding: "10px 16px",
            }}
          >
            {copied ? "Copiado! ✓" : "Copiar link"}
          </button>
        </div>

        {error && (
          <p className="text-xs mt-3" style={{ color: "#dc2626" }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default ShareDialog;
