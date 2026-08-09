import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
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
      {/* ═══════════════ HERO (SYMMETRIC - NO ORANGE) ═══════════════ */}
      <section className="relative overflow-hidden min-h-[60vh] flex items-center pt-28 pb-12 bg-background border-b border-border/40">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10 w-full">
          <Reveal>
            {/* Tiny Divider Line (Gray) */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-border/50"></div>
              <p className="text-xs tracking-[0.3em] text-muted-foreground/80 uppercase font-medium">Our Services</p>
            </div>
            
            {/* Italic + Bold Heading (Gray) */}
            <h1 className="text-[clamp(3rem,7.5vw,5.5rem)] leading-[0.95] tracking-tighter font-medium text-foreground max-w-4xl">
              Production services <br />
              <span className="italic text-muted-foreground/60">for brands that mean business.</span>
            </h1>
            
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Our founder believed that mid-market brands deserve global creative standards — 
              not work that looks like it was made on a spreadsheet. Every service listed below 
              is strategized, produced, and finished in-house. No middlemen, no handoffs, no accountability gaps.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm tracking-wider hover:gap-4 transition-all duration-300"
              >
                Start a project <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ SERVICES GRID (Minimal & Symmetric) ═══════════════ */}
      <section className="bg-background py-24 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.06}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-surface border border-border/40 transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 grayscale-[10%] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/10 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Content - Clean Minimal Layout */}
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <h2 className="font-medium text-xl tracking-tight text-foreground/90 group-hover:text-foreground transition-colors">
                      {s.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm text-muted-foreground leading-relaxed">
                      {s.short}
                    </p>
                    <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-5">
                      {/* 🚫 REMOVED ORANGE: Now using `text-muted-foreground/80` */}
                      <span className="text-xs font-medium tracking-wider text-muted-foreground/80">
                        View details
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground/40 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-muted-foreground/80" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ BOTTOM CTA (SYMMETRIC - DARK) ═══════════════ */}
      <section className="bg-ink py-28 text-ink-foreground relative overflow-hidden border-t border-ink-foreground/10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none"></div>
        
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <h2 className="text-5xl md:text-6xl font-medium tracking-tight leading-tight">
              Ready to build something <br />
              <span className="italic text-ink-foreground/40">worth watching</span>?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-ink-foreground/60 text-lg">
              Not sure which service fits? Tell us what you're trying to achieve. 
              We'll map the right production approach and give you a straight answer.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-primary text-ink px-10 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-xl shadow-primary/20"
              >
                Start a conversation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 text-sm text-ink-foreground/60 hover:text-ink-foreground transition-colors"
              >
                See our work
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}