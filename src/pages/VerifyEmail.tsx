import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, ArrowLeft } from "lucide-react";

const VerifyEmail = () => {
  const { user } = useAuth();
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleResend = async () => {
    if (!user?.email) return;
    setResending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: user.email,
      });
      if (error) throw error;
      toast({ title: "Email reenviado!", description: "Verifique sua caixa de entrada." });
    } catch (error: any) {
      toast({
        title: "Erro ao reenviar",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setResending(false);
    }
  };

  const handleSignUpAgain = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen aurora-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="glass-surface rounded-2xl p-10 tactile-shadow">
          <div className="mx-auto w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
            <Mail className="w-8 h-8 text-accent" />
          </div>

          <h1 className="font-display text-2xl font-bold text-foreground mb-3">
            Verifique seu email
          </h1>

          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            Enviamos um link de confirmação para{" "}
            <span className="font-medium text-foreground">{user?.email}</span>.
            Clique nele para ativar sua conta.
          </p>

          <Button
            variant="accent-outline"
            onClick={handleResend}
            disabled={resending}
            className="mb-4"
          >
            {resending ? "Reenviando..." : "Reenviar email"}
          </Button>

          <p className="text-xs text-muted-foreground">
            Email errado?{" "}
            <button
              onClick={handleSignUpAgain}
              className="text-accent hover:underline font-medium"
            >
              Cadastre-se novamente
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
