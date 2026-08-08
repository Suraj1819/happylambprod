import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Camera,
  Clapperboard,
  Clock,
  Film,
  Plane,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import { INDUSTRIES, PROJECTS, TESTIMONIALS } from "@/data/site";

/* ─── import brand logos ─── */
import aureaLogo from "@/assets/brands/hello.png";
import cofsilsLogo from "@/assets/brands/cofsils.png";
import skywayLogo from "@/assets/brands/skyway.jpg";
import lumenLogo from "@/assets/brands/prompt.jpg";
import tataHitachi from "@/assets/brands/tata hitachi.png";

export const Route = createFileRoute("/clients")({
  component: Clients,
  head: () => ({
    meta: [
      { title: "Clients & Industries — HappyLamb Production" },
      {
        name: "description",
        content:
          "Trusted by leading brands across India. Commercials, corporate films, product shoots and digital campaigns.",
      },
    ],
    links: [{ rel: "canonical", href: "/clients" }],
  }),
});

/* ✅ 1. FIX: Aapki requirement ke hisaab se exact Brand List (Meridian aur Skyway add kar diya) */
const BRANDS = [
  "Aurea", 
  "Cofsils", 
  "Skyway", 
  "Lumen", 
  "Meridian", // ✅ Ye add kiya
  "tataHitachi", 
  "Atlas", 
  "Novo", 
  "Kia",
  "Tata", // Example brand
  "Reliance", // Example brand
];

/* ─── logo map ─── */
const LOGO_MAP: Record<string, string> = {
  Aurea: aureaLogo,
  Cofsils: cofsilsLogo,
  Skyway: skywayLogo,
  Lumen: lumenLogo,
  Meridian: "", // Image nahi hai, empty string rakh do, fallback apne aap kaam karega
  Tata: tataHitachi, // Add Tata logo
};

const BRAND_LOGOS = BRANDS.map((name) => ({
  name,
  logo: LOGO_MAP[name] ?? null,
}));

const WHY_US = [
  { icon: Clapperboard, title: "Cinema-grade production", copy: "RED & ARRI systems, controlled lighting, director-led units." },
  { icon: Zap, title: "Fast turnaround", copy: "Locked timelines. Broadcast masters delivered on schedule." },
  { icon: Users, title: "Professional crew", copy: "Vetted talent across Mumbai, Patna and pan-India." },
  { icon: Film, title: "Creative storytelling", copy: "Strategy-first films built for recall and response." },
  { icon: Plane, title: "Drone cinematography", copy: "Licensed aerial units for real estate, plants and events." },
  { icon: Sparkles, title: "AI-assisted workflows", copy: "Faster edits, variants and multi-format delivery." },
  { icon: Camera, title: "End-to-end production", copy: "From brief to final master — one accountable team." },
  { icon: Clock, title: "Multi-platform content", copy: "TV, OTT, vertical and paid-ready assets from one shoot." },
];

const RETENTION = [
  { value: 95, suffix: "%", label: "Repeat Clients" },
  { value: 100, suffix: "+", label: "Campaigns Delivered" },
  { value: 50, suffix: "+", label: "Brands Served" },
  { value: 4.9, suffix: "/5", label: "Client Satisfaction" },
];

function Clients() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-background pt-32 pb-20 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="relative mx-auto max-w-[1200px] px-5 text-center sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Clients
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-6xl">
              Trusted By Leading Brands
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
              We help brands tell powerful stories through commercials, corporate films,
              product shoots, digital campaigns and cinematic content.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
            <Counter to={100} suffix="+" label="Projects Delivered" />
            <Counter to={50} suffix="+" label="Happy Clients" />
            <Counter to={5} suffix="+" label="Years Experience" />
            <Counter to={10} suffix="M+" label="Views Generated" />
          </Reveal>
        </div>
      </section>

      {/* ─── LOGO MARQUEE (2 ROWS) ─── */}
      <section className="overflow-hidden border-y border-border bg-surface py-14">
        <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          Brands we’ve worked with
        </p>

        <div className="space-y-6">
          {/* Row 1 */}
          <div className="relative">
            <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-10 px-4">
              {[...BRAND_LOGOS, ...BRAND_LOGOS].map((brand, i) => (
                <div
                  key={`r1-${brand.name}-${i}`}
                  className="flex h-24 w-48 shrink-0 items-center justify-center rounded-2xl border border-border bg-card px-6"
                >
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="max-h-14 max-w-[140px] object-contain"
                    />
                  ) : (
                    <span className="font-display text-base font-bold tracking-wide text-foreground/50">
                      {brand.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 */}
          <div className="relative">
            <div className="flex w-max animate-[marquee-reverse_32s_linear_infinite] gap-10 px-4">
              {[...BRAND_LOGOS, ...BRAND_LOGOS].map((brand, i) => (
                <div
                  key={`r2-${brand.name}-${i}`}
                  className="flex h-24 w-48 shrink-0 items-center justify-center rounded-2xl border border-border bg-card px-6"
                >
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="max-h-14 max-w-[140px] object-contain"
                    />
                  ) : (
                    <span className="font-display text-base font-bold tracking-wide text-foreground/50">
                      {brand.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
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
      </section>

      {/* ─── LOGO WALL ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <Reveal className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Client roster
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Brands that keep coming back
            </h2>
          </Reveal>

          {/* ✅ Fixed Grid: Mobile - 2 cols, Tablet - 3 cols, Desktop - 4 cols */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {BRAND_LOGOS.map((brand, i) => (
              <Reveal key={brand.name} delay={(i % 8) * 0.04}>
                <div className="group flex h-32 items-center justify-center rounded-2xl border border-border bg-card px-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_24px_rgba(243,111,33,0.12)]">
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="max-h-16 max-w-[150px] object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    // ✅ 2. FIX: Beautiful Fallback Logo (Jo "Meridian" jaise brands ke liye automatic aayega)
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 font-display text-xl font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                        {brand.name.charAt(0)}
                      </div>
                      <span className="text-xs font-semibold tracking-wide text-foreground/75">
                        {brand.name}
                      </span>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SUCCESS STORIES (simple cards) ─── */}
      <section className="border-y border-border bg-surface py-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                Success stories
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Results that speak
              </h2>
            </div>
            <Link to="/work" className="text-sm font-medium text-primary hover:underline">
              View all work →
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link
                  to="/work/$slug"
                  params={{ slug: p.slug }}
                  className="group block overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift"
                >
                  <div className="overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-medium uppercase tracking-wider text-primary">
                      {p.client} · {p.category}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-bold tracking-wide">
                      {p.title}
                    </h3>
                    {p.results[0] && (
                      <p className="mt-3 text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">
                          {p.results[0].value}
                        </span>{" "}
                        {p.results[0].label.toLowerCase()}
                      </p>
                    )}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INDUSTRIES ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Industries served
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Twelve categories, one standard
            </h2>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind} delay={(i % 4) * 0.05}>
                <div className="group rounded-2xl border border-border bg-card px-5 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(243,111,33,0.1)]">
                  <p className="text-sm font-semibold tracking-wide text-foreground/80 group-hover:text-primary">
                    {ind}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY CLIENTS CHOOSE US ─── */}
      <section className="border-y border-border bg-surface py-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Why brands choose us
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Built for teams that demand excellence
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_US.map((item, i) => (
              <Reveal key={item.title} delay={(i % 4) * 0.06}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40">
                  <item.icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-4 font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RETENTION STATS ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <Reveal className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Client retention
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Numbers that build trust
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {RETENTION.map((s) => (
              <Reveal key={s.label}>
                <div className="text-center">
                  <p className="font-display text-4xl font-extrabold text-primary sm:text-5xl">
                    {s.value}
                    {s.suffix}
                  </p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="border-y border-border bg-surface py-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Testimonials
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              In their words
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.author} delay={i * 0.07}>
                <blockquote className="flex h-full flex-col rounded-2xl border border-border bg-card p-7">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="flex-1 text-base leading-relaxed text-foreground/90">
                    “{t.quote}”
                  </p>
                  <footer className="mt-6 border-t border-border pt-4 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{t.author}</span>
                    <span className="mx-1.5">·</span>
                    {t.role}
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STUDIOS ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <Reveal className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Our studios
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Mumbai · Patna
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Two production hubs. Pan-India crew and permissions capability.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {["Mumbai", "Patna"].map((city, i) => (
              <Reveal key={city} delay={i * 0.1}>
                <div className="rounded-2xl border border-border bg-card p-8 text-center transition-all hover:border-primary/40">
                  <p className="font-display text-2xl font-bold">{city}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Full production studio · On-ground units · Client-ready facilities
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="pb-24">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-16 text-center sm:px-12">
              <motion.div
                aria-hidden
                className="absolute -top-24 left-1/3 h-64 w-64 rounded-full bg-primary/15 blur-[100px]"
                animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              />
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                Let’s work together
              </p>
              <h2 className="relative mt-4 font-display text-3xl font-bold tracking-tight sm:text-5xl">
                Let’s Create Something
                <br />
                Extraordinary Together
              </h2>
              <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  Start Your Project <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-sm font-semibold transition hover:border-primary hover:text-primary"
                >
                  Schedule A Call
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}