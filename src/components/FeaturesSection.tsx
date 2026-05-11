import { BarChart3, Users, Sparkles } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Métricas claras",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Visualize engajamento e crescimento.",
  },
  {
    icon: Users,
    title: "Compare perfis",
    desc: "Sed do eiusmod tempor incididunt ut labore. Veja side by side até 3 perfis lado a lado.",
  },
  {
    icon: Sparkles,
    title: "Insights automáticos",
    desc: "Ut enim ad minim veniam, quis nostrud. Receba recomendações prontas para aplicar.",
  },
];

const FeaturesSection = () => (
  <section className="px-6 py-28">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
          Recursos
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl bg-card border border-border p-8 shadow-card-soft hover:-translate-y-1 hover:shadow-brand-glow/20 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-gradient flex items-center justify-center mb-6 shadow-brand-glow">
              <f.icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-lg text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
