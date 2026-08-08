import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { ArrowUpRight, Play, Film, Camera, Sparkles, ChevronRight, Calendar, Briefcase, Tag } from "lucide-react";
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
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative border-b border-border/30 overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3" />
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
        
        <div className="relative w-full mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <h1 className="max-w-3xl text-[clamp(2.8rem,6vw,4.8rem)] font-display leading-[0.9] tracking-tight">
              Our <span className="text-primary">Work</span>
            </h1>
            
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              A curated collection of films, campaigns and photography 
              crafted for brands that refuse to settle.
            </p>
            
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-2xl hover:shadow-primary/30 hover:scale-105"
              >
                Start a project <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ FILTERS ═══════════════ */}
      <section className="sticky top-0 z-30 border-b border-border/30 bg-background/95 backdrop-blur-xl">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="flex items-center justify-between gap-4 py-3">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
              {categoryCounts.map((cat) => (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setFilter(cat.name)}
                  className={`group relative shrink-0 rounded-full px-4 py-1.5 font-heading text-[0.65rem] tracking-[0.15em] uppercase transition-all ${
                    filter === cat.name
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {filter === cat.name && (
                    <motion.span
                      layoutId="activeFilter"
                      className="absolute inset-0 rounded-full bg-primary/10"
                      transition={{ type: "spring", duration: 0.3 }}
                    />
                  )}
                  <span className="relative flex items-center gap-1.5">
                    {cat.name !== "All" && getCategoryIcon(cat.name)}
                    {cat.name}
                    <span className={`text-[0.5rem] ${
                      filter === cat.name ? 'text-foreground/40' : 'text-muted-foreground/30'
                    }`}>
                      {cat.count}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PROJECTS GRID ═══════════════ */}
      <section className="py-16">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.04}>
                <Link
                  to="/work/$slug"
                  params={{ slug: p.slug }}
                  className="group block"
                  onMouseEnter={() => handleMouseEnter(p.slug)}
                  onMouseLeave={() => handleMouseLeave(p.slug)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink">
                    {/* Image */}
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
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

                    {/* Category tag - always visible on mobile, hover on desktop */}
                    <div className="absolute top-4 left-4">
                      <span className="flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[0.55rem] font-medium text-white/80 backdrop-blur-sm">
                        {getCategoryIcon(p.category)}
                        {p.category}
                      </span>
                    </div>

                    {/* Video indicator - only on desktop hover */}
                    {p.video && (
                      <div className="absolute top-4 right-4 opacity-0 transition-opacity duration-300 sm:group-hover:opacity-100">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm">
                          <Play className="h-3.5 w-3.5 fill-current" />
                        </span>
                      </div>
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

                    {/* Project info - always visible on mobile, hover on desktop */}
                    <div className="absolute inset-x-0 bottom-0 p-5 translate-y-0 opacity-100 sm:translate-y-2 sm:opacity-0 transition-all duration-400 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                      <div className="space-y-1">
                        <p className="text-[0.55rem] font-medium tracking-[0.15em] text-white/70 uppercase">
                          {p.client}
                        </p>
                        <h3 className="font-heading text-base tracking-wide text-white uppercase">
                          {p.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-white/70 sm:text-white/0 transition-all duration-300 sm:group-hover:text-white/70">
                          <span className="text-xs font-medium tracking-wide">
                            View project
                          </span>
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform sm:group-hover:translate-x-0.5 sm:group-hover:-translate-y-0.5" />
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
            <div className="py-20 text-center">
              <p className="font-heading text-sm tracking-widest text-muted-foreground uppercase">
                No projects in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════ BOTTOM CTA ═══════════════ */}
      {list.length > 0 && (
        <section className="border-t border-border/30 bg-surface/20 py-20">
          <div className="mx-auto max-w-[1400px] px-5 text-center sm:px-8">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
                <Sparkles className="h-3 w-3" />
                Let's create together
              </div>
              
              <h2 className="mt-4 max-w-2xl mx-auto text-[clamp(2rem,4vw,3.2rem)] font-display leading-[1.05] tracking-tight">
                Ready to see your brand <br className="sm:hidden" />
                <span className="text-primary">on this page</span>?
              </h2>
              
              <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
                Let's discuss your brief and see how we can bring it to life.
              </p>
              
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 font-heading text-[0.7rem] tracking-[0.2em] text-primary-foreground uppercase transition-all hover:shadow-2xl hover:shadow-primary/30 hover:scale-105"
                >
                  Start a project <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3.5 font-heading text-[0.7rem] tracking-[0.2em] text-foreground uppercase transition-all hover:bg-muted"
                >
                  Our services <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}