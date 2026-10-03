import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft } from "lucide-react";

const GoogleLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
    />
  </svg>
);

const Auth = () => {
  const { user, loading: authLoading } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  if (!authLoading && user) {
    return <Navigate to="/analisar" replace />;
  }

  const handleGoogleAuth = async () => {
    setSubmitting(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}${import.meta.env.BASE_URL}analisar`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Não foi possível entrar com o Google. Tente novamente.",
        variant: "destructive",
      });
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen aurora-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Voltar</span>
        </button>

        <div className="glass-surface rounded-2xl p-8 tactile-shadow">
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              Acesse sua conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Entre ou cadastre-se com sua conta Google para começar a analisar seus perfis
            </p>
          </div>

          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={submitting}
            className="w-full h-12 rounded-xl bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center gap-3 text-sm font-medium shadow-sm disabled:opacity-60"
          >
            <GoogleLogo />
            {submitting ? "Conectando..." : "Continuar com Google"}
          </button>

          <p className="text-center text-xs text-muted-foreground mt-6 leading-relaxed">
            Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
