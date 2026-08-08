import { BRANDS } from "@/data/site";

/* ─── import logos here ─── */
import aureaLogo from "@/assets/brands/hello.png";
// import meridianLogo from "@/assets/brands/meridian.png";
// import novoLogo from "@/assets/brands/novo.png";

const LOGO_MAP: Record<string, string> = {
  Aurea: aureaLogo,
  // Meridian: meridianLogo,
  // Novo: novoLogo,
};

function Logo({ name }: { name: string }) {
  const logo = LOGO_MAP[name] ?? null;

  return (
    <div className="group flex h-20 w-44 shrink-0 items-center justify-center gap-3 rounded-2xl border border-border bg-card px-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lift">
      {logo ? (
        <img
          src={logo}
          alt={name}
          className="max-h-12 max-w-[130px] object-contain"
        />
      ) : (
        <>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-[0.7rem] font-semibold tracking-wider text-primary transition-colors group-hover:bg-primary group-hover:text-white">
            {name.slice(0, 2).toUpperCase()}
          </span>
          <span className="font-heading text-sm tracking-[0.15em] whitespace-nowrap text-muted-foreground uppercase transition-colors group-hover:text-foreground">
            {name}
          </span>
        </>
      )}
    </div>
  );
}

export function BrandMarquee() {
  const rowA = BRANDS.slice(0, Math.ceil(BRANDS.length / 2));
  const rowB = BRANDS.slice(Math.ceil(BRANDS.length / 2));

  return (
    <div className="space-y-5 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
      {/* Row 1 */}
      <div className="flex w-max gap-5 animate-[marquee_30s_linear_infinite]">
        {[...rowA, ...rowA].map((b, i) => (
          <Logo key={`a-${b}-${i}`} name={b} />
        ))}
      </div>

      {/* Row 2 (reverse) */}
      <div className="flex w-max gap-5 animate-[marquee-reverse_36s_linear_infinite]">
        {[...rowB, ...rowB].map((b, i) => (
          <Logo key={`b-${b}-${i}`} name={b} />
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}