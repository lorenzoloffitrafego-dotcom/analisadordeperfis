const Logo = ({ className = "" }: { className?: string }) => (
  <span className={`font-sans font-bold text-xl tracking-tight ${className}`}>
    <span className="text-foreground">Easy</span>
    <span className="text-brand-gradient">Dash</span>
  </span>
);

export default Logo;
