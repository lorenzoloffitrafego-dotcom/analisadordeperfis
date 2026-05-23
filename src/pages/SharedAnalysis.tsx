import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AnalysisResults from "@/components/AnalysisResults";

const SharedAnalysis = () => {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<Record<string, any> | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "notfound">("loading");

  useEffect(() => {
    if (!id) {
      setStatus("notfound");
      return;
    }
    (async () => {
      const { data, error } = await supabase
        .from("shared_analyses")
        .select("result")
        .eq("id", id)
        .maybeSingle();
      if (error || !data) {
        setStatus("notfound");
      } else {
        setResult(data.result as Record<string, any>);
        setStatus("ok");
      }
    })();
  }, [id]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#f5f6fb" }}>
        <p className="text-sm" style={{ color: "#6b7280" }}>Carregando análise...</p>
      </div>
    );
  }

  if (status === "notfound" || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#f5f6fb" }}>
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold mb-2" style={{ color: "#0f172a" }}>
            Link inválido ou expirado
          </h1>
          <p className="text-sm" style={{ color: "#6b7280" }}>
            Não foi possível encontrar essa análise.
          </p>
        </div>
      </div>
    );
  }

  return <AnalysisResults result={result} onReset={() => {}} readOnly />;
};

export default SharedAnalysis;
