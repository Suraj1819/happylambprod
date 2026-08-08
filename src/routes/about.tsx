import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Building2,
  CalendarCheck,
  Camera,
  CheckCircle2,
  Clock,
  Clapperboard,
  Compass,
  FileCheck,
  Globe2,
  HeartHandshake,
  Layers,
  Lightbulb,
  MonitorPlay,
  Palette,
  Rocket,
  ShieldCheck,
  Target,
  TrendingUp,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import heroStudio from "@/assets/hero-studio.jpg";
import teamGroup from "@/assets/team-group.jpg";
import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About HappyLamb Production — Our Story, Team & Process" },
      {
        name: "description",
        content:
          "HappyLamb Production is a full-service advertising, film production and branding studio based in India. Learn about our journey, capabilities, team and why 50+ brands trust us.",
      },
      { property: "og:title", content: "About HappyLamb Production" },
      {
        property: "og:description",
        content:
          "From a two-person studio to India's trusted production partner — discover our story, process, infrastructure and the people behind the work.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

/* ──────────────────────────────────────── DATA ──────────────────────────────────────── */

const TIMELINE = [
  {
    year: "2016",
    title: "Humble beginnings",
    text: "Founded by two creatives with one camera, one light kit and a firm belief that Indian brands — regardless of size — deserved advertising craft that could stand beside any global campaign.",
  },
  {
    year: "2018",
    title: "First national campaign",
    text: "Landed our first pan-India FMCG television commercial. The campaign delivered a 3.2× ROAS, put the studio on the national map, and taught us how to scale a production unit under real pressure.",
  },
  {
    year: "2020",
    title: "Resilience through disruption",
    text: "When the pandemic shut every set in India, we pivoted to remote-directed shoots, built a home-studio network across 8 cities and delivered 40+ campaigns without a single day of lost output.",
  },
  {
    year: "2021",
    title: "Full-service integration",
    text: "Brought line production, in-house catalogue/e-commerce studios, a dedicated post-production suite and a brand-strategy division under one roof — eliminating vendor chains entirely.",
  },
  {
    year: "2023",
    title: "Performance creative lab",
    text: "Merged media planning and creative execution into a single performance team. Ad-performance data now directly shapes scripting, casting and edit decisions — closing the feedback loop.",
  },
  {
    year: "2025",
    title: "AI-accelerated workflows",
    text: "Integrated AI-assisted scripting, automated transcript-based rough cuts and bulk retouching pipelines — cutting average review cycles by 45 % and turnaround times by a third.",
  },
];

const WHY = [
  {
    icon: Layers,
    title: "End-to-end under one roof",
    text: "Strategy, creative direction, film production, still photography, design, post-production, media planning and line production — all in-house. No middlemen, no finger-pointing, one P&L.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance & permissions managed",
    text: "Government shooting permissions, location agreements, artist contracts, insurance, broadcast clearance and censorship submissions — handled by our dedicated compliance cell across all 28 states.",
  },
  {
    icon: Clock,
    title: "Deadline-as-contract culture",
    text: "Every project gets a producer-led schedule with built-in contingencies. On-time delivery is written into our contracts — not treated as a hopeful target.",
  },
  {
    icon: Award,
    title: "Craft-first, always",
    text: "Our directors colour-grade their own work. Our DOPs refuse to ship a frame they wouldn't sign. This isn't aspiration — it's our operational standard.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Brief & brand immersion",
    text: "We study the brand book, audit existing assets, interview stakeholders and map the competitive landscape before writing a single word.",
  },
  {
    step: "02",
    title: "Strategy & the big idea",
    text: "Data-informed creative strategy. We define the target psyche, single-minded proposition and creative territory — then pressure-test it before ideation.",
  },
  {
    step: "03",
    title: "Pre-production & approvals",
    text: "Storyboards, casting, location recce, permits, shot lists, crew booking and a detailed production budget — all signed off before any gear leaves the shelf.",
  },
  {
    step: "04",
    title: "Production",
    text: "Producer-led floor management with real-time client dashboards. Multi-camera film shoots, controlled studio stills, or hybrid setups — executed to the frame plan.",
  },
  {
    step: "05",
    title: "Post, grade & sound",
    text: "Edit, VFX, colour grading, sound design and music — all in-house. Review happens on secure client portals with frame-accurate annotations.",
  },
  {
    step: "06",
    title: "Delivery, launch & learnings",
    text: "Final assets delivered in every required format and spec. Post-launch, we measure performance, document learnings and feed them back into the next brief.",
  },
];

const VALUES = [
  {
    icon: Target,
    title: "Relentless precision",
    text: "Every frame, every word, every pixel has a reason to exist. If it doesn't serve the brief, it doesn't make the cut.",
  },
  {
    icon: HeartHandshake,
    title: "Partnership over transactions",
    text: "We don't want to be a vendor on your list. We want to be the studio you call first when the stakes are high.",
  },
  {
    icon: Lightbulb,
    title: "Informed creativity",
    text: "Intuition backed by data. We combine audience insights, performance metrics and cultural context to make work that moves people — and moves product.",
  },
  {
    icon: Zap,
    title: "Speed without shortcuts",
    text: "AI tools and lean processes help us move fast. Craft standards and review rigour ensure we never move careless.",
  },
];

const CAPABILITIES = [
  { icon: Clapperboard, label: "Film Commercials (TVC & Digital)" },
  { icon: Camera, label: "Product & Lifestyle Photography" },
  { icon: Palette, label: "Brand Identity & Packaging Design" },
  { icon: MonitorPlay, label: "Social Media Content Production" },
  { icon: TrendingUp, label: "Performance Creative & A/B Testing" },
  { icon: Globe2, label: "Pan-India Line Production" },
  { icon: Building2, label: "Catalogue & E-commerce Shoots" },
  { icon: Truck, label: "On-location Production Management" },
  { icon: FileCheck, label: "Broadcast Clearance & Compliance" },
  { icon: Compass, label: "Location Scouting & Permitting" },
  { icon: CalendarCheck, label: "Event Coverage & Documentation" },
  { icon: Users, label: "Casting & Talent Management" },
];

const CERTIFICATIONS = [
  "MSME Registered",
  "GST Compliant (India)",
  "ISO 9001:2015 Quality Management",
  "MPAA / CBFC Broadcast Clearance Partner",
  "Professional Indemnity Insured",
  "ShopAct & Trade License — Maharashtra",
];

/* ──────────────────────────────────── COMPONENT ──────────────────────────────────── */

function About() {
  return (
    <>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden pt-36 pb-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--gradient-soft)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow">About HappyLamb Production</p>
            <h1 className="display-xl mt-4 max-w-5xl text-[clamp(2.6rem,6.5vw,5rem)] leading-[1.05]">
              A production studio built on craft, contracts and credibility
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              HappyLamb Production is a full-service advertising, film production and branding
              studio headquartered in India. We conceive the idea, produce it to broadcast
              standards, finish it in-house and deploy it with measurable intent. Since 2016,
              we've delivered over 100 projects for 50+ brands across 10 industries — without
              missing a single deadline.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            <Reveal
              delay={0.1}
              className="overflow-hidden rounded-[2rem] border border-border shadow-lift lg:col-span-2"
            >
              <img
                src={heroStudio}
                alt="Studio floor — cameras, lighting rigs and grip equipment at HappyLamb Production"
                width={1600}
                height={1008}
                className="h-[320px] w-full object-cover sm:h-[480px] lg:h-[540px]"
              />
            </Reveal>
            <Reveal
              delay={0.18}
              className="flex flex-col justify-between rounded-[2rem] border border-border bg-card p-8 shadow-soft"
            >
              <div>
                <p className="eyebrow">At a glance</p>
                <ul className="mt-5 space-y-4">
                  {[
                    "Founded in 2016 — 9+ years in operation",
                    "Headquarters: Mumbai, India",
                    "Active across 28 Indian states",
                    "Full-time crew of 35+ specialists",
                    "In-house post-production suite",
                    "Dedicated compliance & permits cell",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to="/contact"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3 font-heading text-[0.7rem] tracking-[0.2em] text-ink-foreground uppercase hover:bg-primary"
              >
                Start a conversation <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ COUNTERS ═══════════════ */}
      <section className="border-y border-border bg-surface py-16">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-8 px-5 sm:px-8 lg:grid-cols-4">
          <Counter to={100} suffix="+" label="Projects delivered" />
          <Counter to={50} suffix="+" label="Brands served" />
          <Counter to={10} suffix="+" label="Industries covered" />
          <Counter to={300} suffix="+" label="Permissions cleared" />
        </div>
      </section>

      {/* ═══════════════ FOUNDER NOTE ═══════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-[320px_1fr]">
            <Reveal>
              <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Users className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-heading text-lg tracking-wide uppercase">
                  From the founders
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Why we started this studio — and why we're still obsessing over every frame.
                </p>
                <div className="mt-6 border-t border-border pt-5">
                  <p className="font-heading text-sm tracking-wide">Founding Team</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Creative Director & Producer
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <blockquote className="border-l-4 border-primary pl-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
                "We started HappyLamb because we kept seeing the same problem: mid-market Indian
                brands were paying for advertising that looked like it was made on a spreadsheet,
                not on a set. The strategy was sound but the craft was missing. The idea was right
                but the execution couldn't carry it. We wanted to close that gap — not by charging
                agency-level fees, but by building a studio where efficiency and craft aren't
                opposites."
              </blockquote>
              <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Over nine years we've built a production infrastructure that most studios our
                  size outsource: our own lighting and grip inventory, a colour-graded screening
                  room, a dedicated compliance desk that handles everything from municipal
                  shooting permits to CBFC censorship submissions, and a post-production pipeline
                  that now incorporates AI-assisted workflows without ever letting a machine make
                  a creative decision.
                </p>
                <p>
                  The result is a studio where a brand can walk in with a brief and walk out with
                  broadcast-ready assets — strategy, shoot, finish and deployment — without ever
                  talking to a third party. That's not a marketing line. It's how our P&L is
                  structured.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ MISSION & VISION ═══════════════ */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal className="text-center">
            <p className="eyebrow">What drives us</p>
            <h2 className="display-xl mt-4 text-[clamp(2rem,5vw,3.6rem)]">
              Mission & Vision
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <Reveal delay={0.08}>
              <div className="h-full rounded-3xl border border-border bg-card p-10 shadow-soft">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-6 font-heading text-xl tracking-wide uppercase">Our Mission</h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  To deliver advertising craft that punches above a brand's category and budget —
                  combining the operational discipline of a producer with the aesthetic standards
                  of a creative director. Every project, regardless of scale, receives the same
                  process rigour and quality gates.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="h-full rounded-3xl border border-border bg-card p-10 shadow-soft">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Rocket className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-6 font-heading text-xl tracking-wide uppercase">Our Vision</h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  To be the first-call production partner for national brands and international
                  productions operating in India — a studio known not for the size of its office
                  but for the reliability of its output, the depth of its infrastructure and the
                  consistency of its craft.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ CORE VALUES ═══════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow">Core values</p>
            <h2 className="display-xl mt-4 text-[clamp(2rem,5vw,3.6rem)]">
              Principles we don't negotiate
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              These aren't posters on a wall. They're the criteria we use when hiring, when
              accepting a brief and when deciding whether a cut is ready to ship.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.07}>
                <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                  <v.icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-5 font-heading text-base tracking-wide uppercase">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TIMELINE ═══════════════ */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow">Our journey</p>
            <h2 className="display-xl mt-4 text-[clamp(2rem,5vw,3.6rem)]">
              Nine years, one obsession
            </h2>
          </Reveal>
          <div className="mt-14 space-y-0">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.05}>
                <div className="grid gap-4 border-t border-border py-8 sm:grid-cols-[140px_1fr] sm:gap-10">
                  <span className="font-display text-3xl text-primary">{t.year}</span>
                  <div>
                    <h3 className="font-heading text-lg tracking-wide uppercase">{t.title}</h3>
                    <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
                      {t.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CAPABILITIES GRID ═══════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow">What we do</p>
            <h2 className="display-xl mt-4 text-[clamp(2rem,5vw,3.6rem)]">
              Full-service capabilities
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Every service below is delivered by our in-house team — no freelancers, no
              sub-contracted agencies, no accountability gaps.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.04}>
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 shadow-soft transition-colors duration-300 hover:border-primary/30 hover:bg-primary/5">
                  <c.icon className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm font-medium leading-snug">{c.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY CHOOSE US ═══════════════ */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow">Why brands choose us</p>
            <h2 className="display-xl mt-4 text-[clamp(2rem,5vw,3.6rem)]">
              Four reasons clients stay
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.07}>
                <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                  <w.icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-5 font-heading text-base tracking-wide uppercase">
                    {w.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PROCESS ═══════════════ */}
      <section className="bg-ink py-24 text-ink-foreground">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow text-ink-foreground/60">Production process</p>
            <h2 className="display-xl mt-4 text-[clamp(2rem,5vw,3.6rem)]">
              Six steps, zero surprises
            </h2>
            <p className="mt-4 max-w-2xl text-ink-foreground/70">
              Every project follows this exact process. No shortcuts, no skipped stages. This
              rigour is why our deadlines hold.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.06}>
                <div className="rounded-2xl border border-ink-foreground/12 p-7">
                  <span className="font-display text-3xl text-primary">{p.step}</span>
                  <h3 className="mt-3 font-heading text-sm tracking-wide uppercase">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-foreground/65">
                    {p.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CERTIFICATIONS ═══════════════ */}
      <section className="py-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal className="text-center">
            <p className="eyebrow">Trust & compliance</p>
            <h2 className="display-xl mt-4 text-2xl sm:text-3xl">
              Registered, certified and insured
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {CERTIFICATIONS.map((cert) => (
                <span
                  key={cert}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-xs font-medium tracking-wide text-muted-foreground shadow-soft"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  {cert}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ TEAM CTA ═══════════════ */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal className="overflow-hidden rounded-[2rem] border border-border shadow-lift">
            <img
              src={teamGroup}
              alt="The HappyLamb Production crew on set"
              width={1920}
              height={912}
              loading="lazy"
              className="w-full object-cover"
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="display-xl text-[clamp(1.8rem,4vw,3rem)]">
                The people behind the work
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                35+ full-time specialists — directors, DOPs, editors, designers, producers and
                strategists — united by an unreasonable standard of craft.
              </p>
            </div>
            <Link
              to="/team"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-heading text-[0.75rem] tracking-[0.2em] text-ink-foreground uppercase hover:bg-primary"
            >
              Meet the team <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ BOTTOM CTA ═══════════════ */}
      <section className="bg-ink py-24 text-ink-foreground">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 text-center">
          <Reveal>
            <h2 className="display-xl text-[clamp(2rem,5vw,3.6rem)]">
              Ready to work with a studio that delivers?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-ink-foreground/70">
              Whether it's a single product shoot or a full brand launch — let's talk about what
              you need, not what we want to sell.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-heading text-[0.75rem] tracking-[0.2em] text-ink uppercase hover:bg-primary/90"
              >
                Get a quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 rounded-full border border-ink-foreground/20 px-8 py-4 font-heading text-[0.75rem] tracking-[0.2em] text-ink-foreground uppercase hover:border-ink-foreground/50"
              >
                View our work
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}