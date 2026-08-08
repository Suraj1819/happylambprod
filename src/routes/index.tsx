import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Clapperboard,
  Film,
  MonitorPlay,
  MousePointerClick,
  Package,
  PenLine,
  Plane,
  Play,
  Send,
  Share2,
  Sparkles,
  Video,
  Wand2,
  CheckCircle,
  Star,
  Users,
  Briefcase,
  Zap,
  Award,
  Shield,
  Clock,
} from "lucide-react";

import { Reveal, RevealWords } from "@/components/site/Reveal";
import { BrandMarquee } from "@/components/site/Marquee";
import { Counter } from "@/components/site/Counter";
import { MagneticLink, TiltCard } from "@/components/site/TiltCard";
import { VideoPlayer } from "@/components/site/VideoPlayer";
import { StudioLocations } from "@/components/site/StudioLocations";
import { TestimonialCarousel } from "@/components/site/TestimonialCarousel";
import { STUDIO_VIDEOS, VIDEO_CATEGORIES } from "@/data/videos";
import { PROJECTS } from "@/data/site";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "HappyLamb Production — Ad Film & Video Production Studio" },
      {
        name: "description",
        content:
          "A video-first production studio: ad films, product reels, corporate films and brand campaigns. Watch the work, then brief us.",
      },
      { property: "og:title", content: "HappyLamb Production — Video-First Advertising Studio" },
      {
        property: "og:description",
        content:
          "Ad films, product reels, corporate films and brand campaigns for national brands. Watch the showreel.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  const [cat, setCat] = useState<string>("All");
  const shown = cat === "All" ? STUDIO_VIDEOS : STUDIO_VIDEOS.filter((v) => v.category === cat);

  const featuredMain = STUDIO_VIDEOS[0];
  const featuredGrid = STUDIO_VIDEOS.slice(1, 5);
  const libraryVideos = shown.slice(0, 6);

  // Why Choose Us data - NO Rocket or TrendingUp
  const whyChooseUs = [
    {
      icon: CheckCircle,
      title: "End-to-End Production",
      desc: "From concept to delivery, everything under one roof. No hand-offs, no delays.",
    },
    {
      icon: Sparkles,
      title: "AI-Assisted Workflow",
      desc: "Faster edits, smarter scripts, and better results with AI-accelerated production.",
    },
    {
      icon: Zap,
      title: "Performance Driven",
      desc: "Every frame is built to convert. We optimize for attention and action.",
    },
    {
      icon: Shield,
      title: "Expert Team",
      desc: "Award-winning directors, DOPs, editors, and strategists who love what they do.",
    },
    {
      icon: Award,
      title: "Premium Quality",
      desc: "Cinema-grade equipment, broadcast-quality finishing, and meticulous attention to detail.",
    },
    {
      icon: Clock,
      title: "Fast Turnaround",
      desc: "3-week average from brief to delivery. Speed without compromising quality.",
    },
  ];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative isolate overflow-hidden bg-background pt-32 pb-24 sm:pt-40">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: "var(--gradient-soft)" }}
          aria-hidden
        />
        <motion.div
          aria-hidden
          className="absolute -top-40 -left-24 -z-10 h-[28rem] w-[28rem] rounded-full blur-[120px]"
          style={{ background: "var(--gradient-warm)", opacity: 0.12 }}
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
        />

        <div className="relative mx-auto grid max-w-[1400px] items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 font-heading text-[0.66rem] tracking-[0.24em] text-foreground uppercase shadow-soft">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                AI-Accelerated Video Ad Studio
              </span>
            </Reveal>

            <h1 className="display-xl mt-8 text-[clamp(2.6rem,6vw,5rem)] leading-[0.95] text-foreground">
              <RevealWords text="We Create Video Ads" />{" "}
              <span className="text-gradient">
                <RevealWords text="That Sell." />
              </span>
            </h1>

            <Reveal delay={0.15}>
              <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground">
                High-converting commercials, product films and brand content — scripted, shot and delivered under one roof.
              </p>
            </Reveal>

            <Reveal delay={0.24} className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticLink>
                <Link
                  to="/work"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-heading text-[0.78rem] tracking-[0.2em] text-primary-foreground uppercase shadow-glow transition-transform duration-300 hover:scale-[1.03]"
                >
                  View Portfolio
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </MagneticLink>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 font-heading text-[0.78rem] tracking-[0.2em] uppercase transition-all duration-300 hover:border-primary hover:text-primary"
              >
                Book a Free Call
              </Link>
            </Reveal>

            <Reveal delay={0.3} className="mt-14 grid max-w-md grid-cols-3 gap-8 border-t border-border pt-8">
              <Counter to={100} label="Projects" />
              <Counter to={50} label="Brands" />
              <Counter to={10} label="Industries" />
            </Reveal>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
            >
              <StudioLocations />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== TRUSTED BRANDS ===== */}
      <section className="border-y border-border bg-surface py-12">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <p className="eyebrow mb-8 text-center">Trusted by brands across 10+ industries</p>
          <BrandMarquee />
        </div>
      </section>

      {/* ===== WHO WE ARE ===== */}
      <section className="py-24">
        <div className="mx-auto max-w-[1100px] px-5 text-center sm:px-8">
          <Reveal>
            <p className="eyebrow">Who we are</p>
            <h2 className="display-xl mt-5 text-[clamp(2rem,4.3vw,3.4rem)]">
              A video-first advertising studio, engineered end to end.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Strategy, scripting, direction, cinematography and post — all under one roof. Fewer hand-offs. Tighter timelines. Broadcast quality at digital speed.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {[
              { k: "Founded", v: "2021" },
              { k: "Films", v: "100+" },
              { k: "Cities", v: "14" },
              { k: "Turnaround", v: "3 weeks" },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl border border-border bg-card px-5 py-6 shadow-soft">
                <p className="font-display text-3xl tracking-wide text-foreground">{s.v}</p>
                <p className="eyebrow mt-2">{s.k}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ===== FEATURED WORK ===== */}
      <section className="border-y border-border bg-surface py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="display-xl mt-4 text-[clamp(2rem,4.3vw,3.4rem)]">Featured Films</h2>
            </div>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 font-heading text-sm tracking-[0.18em] uppercase transition-colors hover:text-primary"
            >
              View all projects <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>

          {featuredMain && (
            <Reveal className="mt-14">
              <VideoPlayer
                src={featuredMain.src}
                poster={featuredMain.poster}
                title={featuredMain.title}
                client={featuredMain.client}
                meta={featuredMain.meta}
                category={featuredMain.category}
                aspect="16/9"
                className="rounded-2xl"
              />
            </Reveal>
          )}

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {featuredGrid.map((v, i) => (
              <Reveal key={v.id} delay={i * 0.06}>
                <VideoPlayer
                  src={v.src}
                  poster={v.poster}
                  title={v.title}
                  client={v.client}
                  meta={v.meta}
                  category={v.category}
                  aspect="16/9"
                  className="rounded-2xl"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY US ===== */}
      <section className="py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal className="text-center max-w-3xl mx-auto">
            <p className="eyebrow">Why Choose Us</p>
            <h2 className="display-xl mt-4 text-[clamp(2rem,4.2vw,3.2rem)]">
              We don't just make videos.<br />
              <span className="text-primary">We create results.</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 0.05}>
                <TiltCard className="h-full">
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
                    <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <h3 className="relative mt-6 font-display text-xl tracking-wide">{item.title}</h3>
                    <p className="relative mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="border-y border-border bg-surface py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow">Our process</p>
            <h2 className="display-xl mt-4 text-[clamp(2rem,4.2vw,3.2rem)]">Brief to broadcast</h2>
          </Reveal>

          <div className="relative mt-16">
            <div className="absolute top-6 right-0 left-0 hidden h-px bg-border lg:block" aria-hidden />
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
              {[
                { step: "Strategy", copy: "Category, audience and the single idea worth filming." },
                { step: "Script", copy: "Script, storyboard and fast AI-assisted variants." },
                { step: "Shoot", copy: "Director-led unit on RED & ARRI systems." },
                { step: "Edit", copy: "Grade, sound design and voice-over in one suite." },
                { step: "Delivery", copy: "Every aspect ratio and platform master, on schedule." },
              ].map((p, i) => (
                <Reveal key={p.step} delay={i * 0.06} className="relative">
                  <span className="relative grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-primary shadow-soft">
                    {i + 1}
                  </span>
                  <p className="eyebrow mt-5">Step {i + 1}</p>
                  <h3 className="mt-1.5 font-display text-lg tracking-wide">{p.step}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal className="text-center">
            <p className="eyebrow">Client love</p>
            <h2 className="display-xl mt-4 text-[clamp(2rem,4.2vw,3.2rem)]">
              What brand teams say
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-14">
            <TestimonialCarousel />
          </Reveal>
        </div>
      </section>

      {/* ===== STUDIO LIBRARY ===== */}
      <section className="border-y border-border bg-surface py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Studio library</p>
              <h2 className="display-xl mt-4 text-[clamp(2rem,4.2vw,3.2rem)]">
                More from the archive
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="mt-10">
            <div className="flex flex-wrap gap-2.5">
              {VIDEO_CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  className={`rounded-full px-5 py-2.5 font-heading text-[0.68rem] tracking-[0.16em] uppercase transition-all duration-300 ${
                    cat === c
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "border border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {libraryVideos.map((v, i) => (
              <Reveal key={v.id} delay={(i % 2) * 0.06}>
                <VideoPlayer
                  src={v.src}
                  poster={v.poster}
                  title={v.title}
                  client={v.client}
                  meta={v.meta}
                  category={v.category}
                  aspect="16/9"
                  className="rounded-2xl"
                />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14 flex justify-center">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3.5 font-heading text-sm tracking-[0.18em] uppercase transition-all hover:border-primary hover:text-primary"
            >
              View All Films <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ===== CASE STUDIES ===== */}
      <section className="py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display-xl text-[clamp(2rem,4.2vw,3.2rem)]">Case studies</h2>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-heading text-[0.7rem] tracking-[0.18em] uppercase transition-colors hover:border-primary hover:text-primary"
            >
              All projects <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {PROJECTS.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.07} className={i === 0 ? "lg:col-span-2" : ""}>
                <Link
                  to="/work/$slug"
                  params={{ slug: p.slug }}
                  className="group relative block h-full overflow-hidden rounded-2xl border border-border shadow-soft"
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="h-[280px] w-full object-cover transition-transform duration-700 group-hover:scale-105 lg:h-[360px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <p className="eyebrow text-ink-foreground/80">
                      {p.client} • {p.category}
                    </p>
                    <h3 className="mt-2 font-display text-xl tracking-wide text-ink-foreground sm:text-2xl">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="pb-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal className="relative isolate overflow-hidden rounded-[2rem] border border-border bg-surface px-8 py-20 text-center">
            <motion.div
              aria-hidden
              className="absolute -top-32 left-1/4 -z-10 h-[24rem] w-[24rem] rounded-full blur-[130px]"
              style={{ background: "var(--gradient-warm)", opacity: 0.14 }}
              animate={{ x: [0, 100, 0], y: [0, 40, 0] }}
              transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
            />
            <p className="eyebrow">Let's roll camera</p>
            <h2 className="display-xl mx-auto mt-5 max-w-3xl text-[clamp(2rem,4.8vw,3.6rem)]">
              Ready to create your next winning video ad?
            </h2>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <MagneticLink>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-9 py-4 font-heading text-[0.78rem] tracking-[0.2em] text-primary-foreground uppercase shadow-glow transition-transform hover:scale-[1.03]"
                >
                  Book a Call <ArrowRight className="h-4 w-4" />
                </Link>
              </MagneticLink>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border px-9 py-4 font-heading text-[0.78rem] tracking-[0.2em] uppercase transition-colors hover:border-primary hover:text-primary"
              >
                <MousePointerClick className="h-4 w-4" /> Get Free Quote
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}