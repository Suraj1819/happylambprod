import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SERVICES } from "@/data/site";

export const Route = createFileRoute("/services/")({
  component: ServicesIndex,
  head: () => ({
    meta: [
      {
        title: "Production Services — Ad Films, Photography & Branding | HappyLamb",
      },
      {
        name: "description",
        content:
          "End-to-end advertising production: TVCs, product photography, corporate films, catalogue shoots, social media content and digital campaigns — all under one roof.",
      },
      {
        property: "og:title",
        content: "Production Services — HappyLamb Production",
      },
      {
        property: "og:description",
        content:
          "Strategy to delivery — every production speciality handled by our in-house team.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
});

function ServicesIndex() {
  return (
    <>
      {/* ═══════════════ HEADER ═══════════════ */}
      {/* FIX 1: Mobile ke liye top padding kam kar di (pt-32), taaki small screens pe header zyada space na le */}
      <section className="relative overflow-hidden pt-32 pb-12 sm:pt-36 sm:pb-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--gradient-soft)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow">What we do</p>
            {/* FIX 2: 'break-words' lagaya taaki lamba text mobile pe screen se bahar na nikle */}
            <h1 className="display-xl mt-4 max-w-4xl break-words text-[clamp(2rem,6.5vw,5rem)]">
              Production services built for brands that mean business
            </h1>
            {/* FIX 3: Mobile pe text size thoda chhota (text-base) rakha taaki easily padha ja sake */}
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              From a single product shot to a full brand launch — every service below is
              strategised, produced and finished by our in-house team. No middlemen, no
              handoffs, no accountability gaps.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ SERVICES GRID ═══════════════ */}
      {/* FIX 4: Mobile py-16, Desktop py-24 taaki mobile par thoda compact lage */}
      <section className="border-t border-border bg-surface py-16 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.04}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-500 hover:border-primary/30 hover:shadow-lift"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Subtle overlay on hover */}
                    <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />
                  </div>

                  {/* Content */}
                  {/* FIX 5: Mobile padding (p-5) se content kaafi fit baithta hai, Desktop pe p-7 */}
                  <div className="flex flex-1 flex-col p-5 sm:p-7">
                    <h2 className="font-heading text-base tracking-wide uppercase sm:text-lg">
                      {s.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {s.short}
                    </p>
                    <div className="mt-6 flex items-center gap-2 border-t border-border pt-5">
                      <span className="text-sm font-medium text-primary">
                        View details
                      </span>
                      <ArrowRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-1.5" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ BOTTOM CTA ═══════════════ */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            {/* FIX 6: Mobile pe padding (p-6) aur rounded (rounded-2xl) kar diya taaki screen par jam ke aaye */}
            <div className="grid items-center gap-8 rounded-2xl border border-border bg-card p-6 shadow-soft sm:rounded-[2rem] sm:p-10 lg:grid-cols-[1fr_auto] lg:p-14 lg:gap-10">
              <div>
                <h2 className="display-xl text-[clamp(1.5rem,4vw,3rem)]">
                  Not sure which service fits?
                </h2>
                {/* FIX 7: mobile text base, desktop text base hi rakhna better hai readability ke liye */}
                <p className="mt-3 max-w-xl text-base text-muted-foreground sm:text-base">
                  Tell us what you're trying to achieve. We'll map the right production
                  approach and give you a straight answer on timeline and budget.
                </p>
              </div>
              
              {/* FIX 8 (Most Important): Mobile par buttons 'w-full' (full width) aur gap-4 diya taaki finger se tap karna mushkil na ho */}
              <div className="flex flex-col gap-4 sm:flex-row lg:flex-col w-full sm:w-auto">
                <Link
                  to="/contact"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 font-heading text-[0.7rem] tracking-[0.2em] text-ink-foreground uppercase transition-all hover:bg-primary hover:shadow-glow sm:px-8 sm:text-[0.75rem]"
                >
                  Start a conversation <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/work"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-border px-6 py-4 font-heading text-[0.7rem] tracking-[0.2em] text-foreground uppercase transition-colors hover:bg-surface sm:px-8 sm:text-[0.75rem]"
                >
                  See our work
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}