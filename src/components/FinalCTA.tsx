import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FinalCTA = () => {
  const navigate = useNavigate();
  return (
    <section className="px-6 py-24 relative overflow-hidden" style={{ background: "hsl(240 30% 8%)" }}>
      <div className="pointer-events-none absolute inset-0 -z-0"
           style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(345 90% 60% / 0.18), transparent 70%), radial-gradient(ellipse 50% 40% at 30% 60%, hsl(271 91% 65% / 0.14), transparent 70%)" }} />
      <div className="relative max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-[1.1]">
          Pronto para crescer{" "}
          <span className="font-display italic font-medium text-brand-gradient">no Instagram?</span>
        </h2>
        <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
          Comece a analisar seus dados e monte estratégias que realmente funcionam.
        </p>
        <button
          onClick={() => navigate("/analisar")}
          className="inline-flex items-center gap-2 bg-brand-gradient text-white px-8 py-4 rounded-full font-semibold text-base shadow-brand-glow hover:opacity-95 active:scale-[0.98] transition"
        >
          Começar agora — é grátis
          <ArrowRight className="w-4 h-4" />
        </button>
        <p className="text-white/40 text-sm mt-5">Sem cartão de crédito. Cancele quando quiser.</p>
      </div>
    </section>
  );
};

export default FinalCTA;
