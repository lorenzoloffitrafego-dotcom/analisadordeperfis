const brands = ["AGÊNCIA NORTE", "STUDIO K", "CREATOR HUB", "MIND DIGITAL", "BRANDLY"];

const SocialProof = () => (
  <section className="px-6 py-16 border-y border-border/60 bg-secondary/30">
    <div className="max-w-5xl mx-auto text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
        Usado por creators e agências em todo o Brasil
      </p>
      <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
        {brands.map((b) => (
          <span key={b} className="text-xs sm:text-sm font-semibold tracking-[0.18em] text-muted-foreground/70">
            {b}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default SocialProof;
