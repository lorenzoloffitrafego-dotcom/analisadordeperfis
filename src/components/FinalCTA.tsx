import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FinalCTA = () => {
  const navigate = useNavigate();
  return (
    <section className="px-6 py-28">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 leading-[1.1]">
          Pronto para crescer{" "}
          <span className="text-brand-gradient">no Instagram?</span>
        </h2>
        <p className="text-muted-foreground mb-10">
          Lorem ipsum dolor sit amet, comece sua primeira análise agora mesmo.
        </p>
        <button
          onClick={() => navigate("/analisar")}
          className="inline-flex items-center gap-2 bg-brand-gradient text-primary-foreground px-8 py-4 rounded-full font-semibold shadow-brand-glow hover:opacity-95 active:scale-[0.98] transition"
        >
          Começar agora <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default FinalCTA;
