import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="group glass-surface rounded-2xl p-6 tactile-shadow hover:tactile-shadow-pressed active:scale-[0.98] transition-all duration-200 cursor-default">
      <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-foreground mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-200">
        {icon}
      </div>
      <h3 className="font-display font-semibold text-lg text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
