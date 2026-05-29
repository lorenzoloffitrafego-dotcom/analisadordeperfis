const Logo = ({ className = "" }: { className?: string }) => (
  <span className={`font-sans font-bold text-xl tracking-tight ${className}`}>
    <span className="text-foreground">Métrica</span>
    <span className="text-brand-gradient">Fácil</span>
  </span>
);

export default Logo;
