import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  Sparkles,
  Zap,
  Award,
  Shield,
  Clock,
  Play,
  Camera,
  Film,
} from "lucide-react";

import { Reveal, RevealWords } from "@/components/site/Reveal";
import { BrandMarquee } from "@/components/site/Marquee";
import { Counter } from "@/components/site/Counter";
import { TiltCard } from "@/components/site/TiltCard";
import { VideoPlayer } from "@/components/site/VideoPlayer";
import { StudioLocations } from "@/components/site/StudioLocations";
import { TestimonialCarousel } from "@/components/site/TestimonialCarousel";
import { STUDIO_VIDEOS, VIDEO_CATEGORIES } from "@/data/videos";
import { PROJECTS } from "@/data/site";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "HappyLamb Production — Premium Film & Branding Studio" },
      {
        name: "description",
        content:
          "A craft-driven production studio: ad films, product reels, corporate films and brand campaigns. We build stories that move.",
      },
      { property: "og:title", content: "HappyLamb Production — Premium Film Studio" },
      {
        property: "og:description",
        content:
          "Ad films, product reels, corporate films and brand campaigns. Craft that works.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

// ═══ Carousel Component for Studio Visuals (FIXED: No Flash + 4 Images) ═══
function StudioCarousel() {
  const [current, setCurrent] = useState(0);
  
  // 🟢 Aap yahan apni 4 studios ki real images daal sakte hain
  const visuals = [
    { 
      type: 'image', 
      src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop', 
      alt: 'Studio 1 - Production Floor' 
    },
    { 
      type: 'image', 
      src: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop', 
      alt: 'Studio 2 - Filming Setup' 
    },
    { 
      type: 'image', 
      src: 'https://images.unsplash.com/photo-1533558701576-2c35cd7cb1ef?q=80&w=2070&auto=format&fit=crop', 
      alt: 'Studio 3 - Post Production' 
    },
    { 
      type: 'image', 
      src: 'https://images.unsplash.com/photo-1512418490979-92798cec1380?q=80&w=2070&auto=format&fit=crop', 
      alt: 'Studio 4 - Creative Space' 
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % visuals.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [visuals.length]);

  return (
    <div className="relative w-full h-[450px] sm:h-[550px] rounded-2xl overflow-hidden border border-border/40 shadow-xl">
      {/* ✅ FIX: mode="wait" hata diya aur sirf simple fade animation rakha */}
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={visuals[current].src}
            alt={visuals[current].alt}
            className="w-full h-full object-cover grayscale-[15%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots (4 dots now) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {visuals.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current ? 'w-8 bg-white' : 'w-2 bg-white/40'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function Index() {
  const [cat, setCat] = useState<string>("All");
  const shown = cat === "All" ? STUDIO_VIDEOS : STUDIO_VIDEOS.filter((v) => v.category === cat);

  const featuredMain = STUDIO_VIDEOS[0];
  const featuredGrid = STUDIO_VIDEOS.slice(1, 5);
  const libraryVideos = shown.slice(0, 6);

  // Why Choose Us data
  const whyChooseUs = [
    {
      icon: CheckCircle,
      title: "End-to-End Production",
      desc: "From concept to delivery, everything under one roof. No hand-offs, no delays.",
    },
    {
      icon: Sparkles,
      title: "Craft-First Approach",
      desc: "Every frame is built with precision. We don't ship work we wouldn't sign our names to.",
    },
    {
      icon: Zap,
      title: "Performance Driven",
      desc: "Strategy backed by data. We optimize for attention, engagement, and real results.",
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
      {/* ═══════════════ 1. HERO (SYMMETRIC + CAROUSEL) ═══════════════ */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center pt-28 pb-16 bg-background border-b border-border/40">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Text Content */}
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-primary/50"></div>
                <p className="text-xs tracking-[0.3em] text-foreground/60 uppercase font-medium">Craft-Driven Studio</p>
              </div>
              
              <h1 className="text-[clamp(3rem,7.5vw,5.5rem)] leading-[0.95] tracking-tighter font-medium text-foreground max-w-4xl">
                We build stories <br />
                <span className="italic text-foreground/60">that move.</span>
              </h1>
              
              <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
                Ad films, product reels, and brand campaigns — crafted with precision, backed by data. 
                Every frame serves a purpose.
              </p>
              
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Link
                  to="/work"
                  className="inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm tracking-wider hover:gap-4 transition-all duration-300"
                >
                  View Portfolio <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Book a Call
                </Link>
              </div>
              
              <Reveal delay={0.15} className="mt-10 grid max-w-xs grid-cols-3 gap-8 border-t border-border/60 pt-8">
                <Counter to={100} suffix="+" label="Projects" />
                <Counter to={50} suffix="+" label="Brands" />
                <Counter to={10} suffix="+" label="Industries" />
              </Reveal>
            </Reveal>

            {/* Right: Studio Carousel (4 Photos) */}
            <Reveal delay={0.2}>
              <StudioCarousel />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ 2. TRUSTED BRANDS (SYMMETRIC) ═══════════════ */}
      <section className="border-y border-border/30 bg-surface/50 py-12">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <p className="text-center text-xs tracking-[0.2em] text-muted-foreground uppercase italic mb-8">Trusted by brands across 10+ industries</p>
          <BrandMarquee />
        </div>
      </section>

      {/* ═══════════════ 3. WHO WE ARE (SYMMETRIC) ═══════════════ */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-[1100px] px-6 text-center sm:px-10">
          <Reveal>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-6 bg-border"></div>
              <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase italic">Who We Are</p>
              <div className="h-px w-6 bg-border"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
              A studio built on <br />
              <span className="italic text-muted-foreground/60">craft, contracts & credibility.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground leading-relaxed">
              Strategy, scripting, direction, cinematography, and post — all under one roof. 
              Fewer hand-offs. Tighter timelines. Broadcast quality at digital speed.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { k: "Founded", v: "2021" },
              { k: "Films", v: "100+" },
              { k: "Cities", v: "14" },
              { k: "Turnaround", v: "3 weeks" },
            ].map((s) => (
              <div key={s.k} className="border-b border-border/40 py-4">
                <p className="font-medium text-3xl tracking-tight text-foreground">{s.v}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.k}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ 4. FEATURED WORK (SYMMETRIC + PREMIUM VIDEOS) ═══════════════ */}
      <section className="border-y border-border/30 bg-surface/30 py-24">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-6 bg-border"></div>
                <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase italic">Selected Work</p>
              </div>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
                Featured <br />
                <span className="italic text-muted-foreground/60">Films.</span>
              </h2>
            </div>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-sm font-medium hover:gap-4 transition-all duration-300"
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
                className="rounded-xl shadow-sm border border-border/40"
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
                  className="rounded-xl shadow-sm border border-border/40"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 5. WHY US (SYMMETRIC) ═══════════════ */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <Reveal className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-6 bg-border"></div>
              <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase italic">Why Us</p>
              <div className="h-px w-6 bg-border"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
              We don't just make videos.<br />
              <span className="italic text-muted-foreground/60">We create results.</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 0.05}>
                <div className="group relative h-full overflow-hidden rounded-xl border border-border/40 bg-surface/30 p-7 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <span className="relative grid h-10 w-10 place-items-center rounded-full bg-muted/20 text-muted-foreground">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h3 className="relative mt-5 font-medium text-lg tracking-tight">{item.title}</h3>
                  <p className="relative mt-2 text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 6. PROCESS (SYMMETRIC) ═══════════════ */}
      <section className="border-y border-border/30 bg-surface/50 py-24">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <Reveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-6 bg-border"></div>
              <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase italic">Process</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
              Brief to <br />
              <span className="italic text-muted-foreground/60">broadcast.</span>
            </h2>
          </Reveal>

          <div className="relative mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { step: "Strategy", copy: "Category, audience and the single idea worth filming." },
              { step: "Script", copy: "Script, storyboard and fast AI-assisted variants." },
              { step: "Shoot", copy: "Director-led unit on cinema-grade systems." },
              { step: "Edit", copy: "Grade, sound design and voice-over in one suite." },
              { step: "Delivery", copy: "Every aspect ratio and platform master, on schedule." },
            ].map((p, i) => (
              <Reveal key={p.step} delay={i * 0.06} className="relative flex flex-col border-t-2 border-foreground/10 pt-6">
                <span className="text-4xl font-light tracking-tighter text-foreground/10 mb-2">0{i + 1}</span>
                <p className="text-xs uppercase tracking-wider text-muted-foreground italic">{p.step}</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 7. TESTIMONIALS (SYMMETRIC) ═══════════════ */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <Reveal className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-6 bg-border"></div>
              <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase italic">Client Love</p>
              <div className="h-px w-6 bg-border"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
              What brand teams <br />
              <span className="italic text-muted-foreground/60">say.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-14">
            <TestimonialCarousel />
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ 8. FINAL SYMMETRIC DIVIDER (Only Border) ═══════════════ */}
      <section className="py-24 bg-background border-t border-border/30">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10 text-center">
          <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase italic">
            Crafted with precision in India
          </p>
        </div>
      </section>
    </>
  );
}