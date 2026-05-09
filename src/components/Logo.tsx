const Logo = ({ className = "" }: { className?: string }) => (
  <span className={`font-sans font-semibold text-xl tracking-tight ${className}`}>
    <span className="text-foreground">Insta</span>
    <span className="text-brand-gradient font-bold">Insight</span>
  </span>
);

export default Logo;
