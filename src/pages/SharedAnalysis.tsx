import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import AnalysisResults from "@/components/AnalysisResults";

const SharedAnalysis = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
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

  if (status === "loading" || authLoading) {
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

  // Logged-in visitor: render the exact same header/actions as the authenticated dashboard.
  if (user) {
    return <AnalysisResults result={result} onReset={() => navigate("/analisar")} />;
  }

  // Anonymous visitor: read-only view with conversion CTAs.
  return <AnalysisResults result={result} onReset={() => {}} readOnly publicView />;
};

export default SharedAnalysis;
