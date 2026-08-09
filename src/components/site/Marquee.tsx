import { BRANDS } from "@/data/site";

/* ─── IMPORT LOGOS (Aapki screenshot ki files exact yahan hain) ─── */
import aureaLogo from "@/assets/brands/hello.png";
import cofsilsLogo from "@/assets/brands/cofsils.png";
import promptLogo from "@/assets/brands/prompt.jpg";
import skywayLogo from "@/assets/brands/skyway.jpg";
import tataHitachiLogo from "@/assets/brands/tata hitachi.png";

/* ─── MAP LOGOS TO BRAND NAMES ─── */
const LOGO_MAP: Record<string, string> = {
  Aurea: aureaLogo,
  Cofsils: cofsilsLogo,
  Prompt: promptLogo,       // ✅ Fix: 'Prompt' map ho raha hai 'prompt.jpg' se
  Skyway: skywayLogo,
  "Tata Hitachi": tataHitachiLogo, // ✅ Fix: Space wala naam exact match
};

function Logo({ name }: { name: string }) {
  const logo = LOGO_MAP[name] ?? null;

  return (
    <div className="group flex h-20 w-44 shrink-0 items-center justify-center gap-3 rounded-2xl border border-border/30 bg-surface/30 px-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-border/60 hover:shadow-md">
      {logo ? (
        <img
          src={logo}
          alt={name}
          className="max-h-12 max-w-[130px] object-contain transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        // ✅ CLEAN GRAY FALLBACK (Agar kisi brand ki file missing hai)
        <>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-muted/20 text-[0.7rem] font-medium tracking-wider text-muted-foreground/70 transition-colors group-hover:bg-foreground/10 group-hover:text-foreground">
            {name.slice(0, 2).toUpperCase()}
          </span>
          <span className="font-medium text-xs tracking-wide text-muted-foreground/60 transition-colors group-hover:text-foreground">
            {name}
          </span>
        </>
      )}
    </div>
  );
}

export function BrandMarquee() {
  // Split brands into two rows for a dynamic marquee effect
  const rowA = BRANDS.slice(0, Math.ceil(BRANDS.length / 2));
  const rowB = BRANDS.slice(Math.ceil(BRANDS.length / 2));

  return (
    <div className="space-y-5 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
      {/* Row 1 - Moving Left */}
      <div className="flex w-max gap-5 animate-[marquee_30s_linear_infinite]">
        {[...rowA, ...rowA].map((b, i) => (
          <Logo key={`r1-${b}-${i}`} name={b} />
        ))}
      </div>

      {/* Row 2 - Moving Right (Reverse) */}
      <div className="flex w-max gap-5 animate-[marquee-reverse_36s_linear_infinite]">
        {[...rowB, ...rowB].map((b, i) => (
          <Logo key={`r2-${b}-${i}`} name={b} />
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