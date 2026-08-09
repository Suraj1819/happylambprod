import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { ArrowRight, Play, Film, Camera, Sparkles, ChevronRight, Calendar, Briefcase, Tag } from "lucide-react";
import { motion } from "motion/react";
import { Reveal } from "@/components/site/Reveal";
import { CATEGORIES, PROJECTS } from "@/data/site";

export const Route = createFileRoute("/work/")({
  component: WorkIndex,
  head: () => ({
    meta: [
      {
        title: "Our Work — Ad Films, Campaigns & Photography Portfolio",
      },
      {
        name: "description",
        content:
          "Browse HappyLamb Production's portfolio of ad films, product photography, corporate films and performance campaigns for national brands.",
      },
      { property: "og:title", content: "Portfolio — HappyLamb Production" },
      {
        property: "og:description",
        content: "Films, photography and campaigns, with full case studies.",
      },
      { property: "og:url", content: "/work" },
      { property: "og:image", content: "/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "/work" }],
  }),
});

function WorkIndex() {
  const [filter, setFilter] = useState<string>("All");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const list =
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  const categoryCounts = CATEGORIES.map((cat) => ({
    name: cat,
    count:
      cat === "All"
        ? PROJECTS.length
        : PROJECTS.filter((p) => p.category === cat).length,
  }));

  useEffect(() => {
    return () => {
      Object.values(videoRefs.current).forEach(video => {
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      });
    };
  }, []);

  const handleMouseEnter = (slug: string) => {
    setHoveredId(slug);
    const video = videoRefs.current[slug];
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  const handleMouseLeave = (slug: string) => {
    setHoveredId(null);
    const video = videoRefs.current[slug];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Film': return <Film className="h-3 w-3" />;
      case 'Photography': return <Camera className="h-3 w-3" />;
      case 'Campaign': return <Tag className="h-3 w-3" />;
      default: return <Sparkles className="h-3 w-3" />;
    }
  };

  return (
    <>
      {/* ═══════════════ HERO (SYMMETRIC) ═══════════════ */}
      <section className="relative overflow-hidden min-h-[50vh] flex items-center pt-28 pb-12 bg-background border-b border-border/40">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10 w-full">
          <Reveal>
            {/* Tiny Divider (Same as About/Services) */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-primary/50"></div>
              <p className="text-xs tracking-[0.3em] text-foreground/60 uppercase font-medium">Portfolio</p>
            </div>
            
            {/* Italic + Bold Heading (Same style) */}
            <h1 className="text-[clamp(3rem,7.5vw,5.5rem)] leading-[0.95] tracking-tighter font-medium text-foreground max-w-4xl">
              Work we are <br />
              <span className="italic text-foreground/60">proud to share.</span>
            </h1>
            
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              A curated collection of films, campaigns, and photography crafted for brands that refuse to settle.
              Every project reflects our commitment to craft, contracts, and credibility.
            </p>
            
            <div className="mt-8 flex flex-wrap items-center gap-6">
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

      {/* ═══════════════ FILTERS (Minimal Pill Style) ═══════════════ */}
      <section className="sticky top-0 z-30 border-b border-border/30 bg-background/90 backdrop-blur-md">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <div className="flex items-center justify-center md:justify-start gap-2 py-4 overflow-x-auto scrollbar-none">
            {categoryCounts.map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={() => setFilter(cat.name)}
                className={`group relative shrink-0 rounded-full px-5 py-2 text-xs font-medium tracking-wide transition-all ${
                  filter === cat.name
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {filter === cat.name && (
                  <motion.span
                    layoutId="activeFilter"
                    className="absolute inset-0 rounded-full bg-foreground/5 border border-border"
                    transition={{ type: "spring", duration: 0.3 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  {cat.name !== "All" && getCategoryIcon(cat.name)}
                  {cat.name}
                  <span className={`text-[10px] ${
                    filter === cat.name ? 'text-foreground/40' : 'text-muted-foreground/30'
                  }`}>
                    ({cat.count})
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PROJECTS GRID (Clean & Modern) ═══════════════ */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <Link
                  to="/work/$slug"
                  params={{ slug: p.slug }}
                  className="group block"
                  onMouseEnter={() => handleMouseEnter(p.slug)}
                  onMouseLeave={() => handleMouseLeave(p.slug)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink border border-border/40 transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
                    {/* Image */}
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] grayscale-[10%] group-hover:grayscale-0"
                    />

                    {/* Video on hover - only on desktop */}
                    {p.video && (
                      <video
                        ref={(el) => {
                          if (el) videoRefs.current[p.slug] = el;
                        }}
                        src={p.video}
                        poster={p.image}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 sm:group-hover:opacity-100"
                      />
                    )}

                    {/* Category Tag */}
                    <div className="absolute top-4 left-4">
                      <span className="flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-[10px] font-medium text-white/80 backdrop-blur-sm border border-white/10">
                        {getCategoryIcon(p.category)}
                        {p.category}
                      </span>
                    </div>

                    {/* Video indicator - only on desktop hover */}
                    {p.video && (
                      <div className="absolute top-4 right-4 opacity-0 transition-opacity duration-300 sm:group-hover:opacity-100">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/20">
                          <Play className="h-3 w-3 fill-current" />
                        </span>
                      </div>
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Project info - Always visible on mobile, hover on desktop */}
                    <div className="absolute inset-x-0 bottom-0 p-5 translate-y-0 opacity-100 sm:translate-y-2 sm:opacity-0 transition-all duration-400 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                      <div className="space-y-1">
                        <p className="text-[10px] font-medium tracking-wider text-white/70 uppercase">
                          {p.client}
                        </p>
                        <h3 className="font-medium text-lg tracking-tight text-white">
                          {p.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-white/80 sm:text-white/0 transition-all duration-300 sm:group-hover:text-white/80">
                          <span className="text-xs font-medium tracking-wide">
                            View case study
                          </span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform sm:group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Empty state */}
          {list.length === 0 && (
            <div className="py-20 text-center border border-border/40 rounded-2xl bg-surface/30">
              <p className="text-sm text-muted-foreground tracking-wide">
                No projects in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════ BOTTOM CTA (SYMMETRIC - DARK) ═══════════════ */}
      <section className="bg-ink py-32 text-ink-foreground relative overflow-hidden text-center border-t border-ink-foreground/10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none"></div>
        
        <div className="relative mx-auto max-w-4xl px-6">
          <Reveal>
            <h2 className="text-5xl md:text-6xl font-medium tracking-tight leading-tight">
              Ready to see your brand <br />
              <span className="italic text-ink-foreground/40">on this page</span>?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-ink-foreground/60 text-lg">
              Whether it's a single product shoot or a full brand launch — let's talk about what you need.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-primary text-ink px-10 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-xl shadow-primary/20"
              >
                Start a project <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-sm text-ink-foreground/60 hover:text-ink-foreground transition-colors"
              >
                Our services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}