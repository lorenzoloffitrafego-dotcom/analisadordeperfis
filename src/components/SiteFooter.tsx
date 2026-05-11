import Logo from "./Logo";

const SiteFooter = () => (
  <footer className="px-6 py-10 border-t border-border bg-background">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <Logo />
      <span className="text-xs text-muted-foreground">© 2025 InstaInsight. Todos os direitos reservados.</span>
    </div>
  </footer>
);

export default SiteFooter;
