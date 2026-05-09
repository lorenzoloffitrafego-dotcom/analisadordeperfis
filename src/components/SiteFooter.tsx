import Logo from "./Logo";

const SiteFooter = () => (
  <footer className="px-6 py-10 border-t border-border bg-background">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div>
        <Logo />
        <p className="text-xs text-muted-foreground mt-2">Análise inteligente de perfis Instagram.</p>
      </div>
      <nav className="flex gap-6 text-sm text-muted-foreground">
        <a href="#features" className="hover:text-foreground transition">Recursos</a>
        <a href="#" className="hover:text-foreground transition">Preços</a>
        <a href="#" className="hover:text-foreground transition">Blog</a>
        <a href="#" className="hover:text-foreground transition">Contato</a>
      </nav>
      <span className="text-xs text-muted-foreground">© 2025 InstaInsight</span>
    </div>
  </footer>
);

export default SiteFooter;
