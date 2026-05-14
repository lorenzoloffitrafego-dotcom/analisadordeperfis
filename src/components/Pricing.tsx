import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Feature = { text: string; included?: boolean; highlight?: boolean; pill?: string };

const starterFeatures: Feature[] = [
  { text: "5 relatórios por mês", included: true, highlight: true, pill: "5 relatórios" },
  { text: "Dashboard comparativo", included: true },
  { text: "Resumo executivo com IA", included: true },
  { text: "Download em PDF", included: true },
  { text: "Recomendações de conteúdo", included: false },
];

const agencyFeatures: Feature[] = [
  { text: "20 relatórios por mês", included: true, highlight: true, pill: "20 relatórios" },
  { text: "Dashboard comparativo", included: true },
  { text: "Resumo executivo com IA", included: true },
  { text: "Download em PDF", included: true },
  { text: "Recomendações de conteúdo", included: true },
  { text: "Acesso antecipado a novas features", included: true },
];

const FeatureItem = ({ f }: { f: Feature }) => (
  <li className="flex items-start gap-3">
    {f.included ? (
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100">
        <Check className="h-3.5 w-3.5 text-green-600" strokeWidth={3} />
      </span>
    ) : (
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100">
        <X className="h-3.5 w-3.5 text-red-600" strokeWidth={3} />
      </span>
    )}
    <div className="flex flex-wrap items-center gap-2">
      <span
        className={[
          "text-sm",
          f.highlight ? "font-semibold text-foreground" : "text-muted-foreground",
          !f.included ? "line-through text-muted-foreground/70" : "",
        ].join(" ")}
      >
        {f.text}
      </span>
      {f.pill && (
        <span className="inline-flex items-center rounded-full bg-brand-gradient px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
          {f.pill}
        </span>
      )}
    </div>
  </li>
);

const Pricing = () => {
  const navigate = useNavigate();
  return (
    <section id="pricing" className="px-6 py-28">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Escolha seu plano
          </h2>
          <p className="text-muted-foreground">
            Comece com 3 relatórios grátis. Sem cartão de crédito.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Starter */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-card-soft flex flex-col">
            <span className="inline-flex w-fit items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              Starter
            </span>
            <div className="mt-5 flex items-baseline gap-1">
              <span className="text-5xl font-bold tracking-tight text-foreground">R$49</span>
              <span className="text-muted-foreground text-sm">/mês</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Para quem está começando a monitorar
            </p>

            <ul className="mt-8 space-y-4 flex-1">
              {starterFeatures.map((f) => (
                <FeatureItem key={f.text} f={f} />
              ))}
            </ul>

            <button
              onClick={() => navigate("/auth")}
              className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition"
            >
              Começar grátis
            </button>
          </div>

          {/* Agency */}
          <div className="relative rounded-2xl border-2 border-primary/70 bg-card p-8 shadow-brand-glow flex flex-col">
            <span className="inline-flex w-fit items-center rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold text-primary-foreground">
              Mais popular
            </span>
            <h3 className="mt-4 text-lg font-semibold text-foreground">Agência</h3>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-5xl font-bold tracking-tight text-foreground">R$129</span>
              <span className="text-muted-foreground text-sm">/mês</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Para agências que atendem múltiplos clientes
            </p>

            <ul className="mt-8 space-y-4 flex-1">
              {agencyFeatures.map((f) => (
                <FeatureItem key={f.text} f={f} />
              ))}
            </ul>

            <button
              onClick={() => navigate("/auth")}
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-brand-glow hover:opacity-95 active:scale-[0.98] transition"
            >
              Começar grátis
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
