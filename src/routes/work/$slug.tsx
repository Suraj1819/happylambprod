import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { 
  ArrowRight, 
  Quote, 
  Image as ImageIcon, 
  Video, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Briefcase, 
  Tag,
  Award,
  Clock,
  Sparkles,
  Film
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "@/components/site/Reveal";
import { VideoPlayer } from "@/components/site/VideoPlayer";
import { PROJECTS, type Project } from "@/data/site";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }): { project: Project } => {
    const project = PROJECTS.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  component: ProjectPage,
  head: ({ loaderData, params }) => {
    const p = loaderData?.project;
    const title = p ? `${p.title} — HappyLamb Production` : "Case study";
    const desc = p?.objective.slice(0, 155) ?? "";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/work/${params.slug}` },
        { property: "og:image", content: p?.image || "/og-image.jpg" },
      ],
      links: [{ rel: "canonical", href: `/work/${params.slug}` }],
    };
  },
});

// ============== LIGHTBOX ==============
function Lightbox({ 
  items, 
  initialIndex, 
  onClose 
}: { 
  items: { src: string; type: 'image' | 'video'; title?: string; poster?: string }[]; 
  initialIndex: number; 
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (items[currentIndex]?.type === 'video' && videoRef.current) {
      videoRef.current.play();
    }
  }, [currentIndex, items]);

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    if (e.key === 'ArrowRight') setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const currentItem = items[currentIndex];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/98"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="dialog"
      aria-label="Media lightbox"
    >
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent p-4 sm:p-6">
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/40 font-light tracking-wider sm:text-sm">
            {String(currentIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
          {currentItem?.title && (
            <span className="hidden text-sm text-white/60 sm:block">{currentItem.title}</span>
          )}
          {currentItem?.type === 'video' && (
            <span className="flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/40">
              <Video className="h-3 w-3" /> Video
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="rounded-full bg-white/5 p-2 text-white/50 transition-all hover:bg-white/20 hover:text-white hover:scale-110 sm:p-3"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {items.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/5 p-2 text-white/50 transition-all hover:bg-white/20 hover:text-white hover:scale-110 sm:left-6 sm:p-3"
          >
            <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/5 p-2 text-white/50 transition-all hover:bg-white/20 hover:text-white hover:scale-110 sm:right-6 sm:p-3"
          >
            <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
          </button>
        </>
      )}

      <div className="relative flex max-h-[90vh] max-w-[95vw] items-center justify-center sm:max-w-[90vw]">
        {currentItem?.type === 'video' ? (
          <video
            ref={videoRef}
            src={currentItem.src}
            controls
            className="max-h-[80vh] w-full max-w-full rounded-lg shadow-2xl sm:max-h-[85vh]"
            poster={currentItem.poster}
          />
        ) : (
          <img
            src={currentItem.src}
            alt={currentItem?.title || `Media ${currentIndex + 1}`}
            className="max-h-[80vh] w-auto max-w-full rounded-lg object-contain shadow-2xl sm:max-h-[85vh]"
            loading="lazy"
          />
        )}
        
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:bottom-6 sm:gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(i);
              }}
              className={`h-1 rounded-full transition-all sm:h-1.5 ${
                i === currentIndex ? 'w-6 bg-white sm:w-8' : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ============== STATS BAR ==============
function StatsBar({ results }: { results: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {results.map((r) => (
        <div key={r.label} className="text-center">
          <p className="text-2xl font-display tracking-tight text-primary sm:text-3xl">
            {r.value}
          </p>
          <p className="mt-0.5 text-[10px] text-muted-foreground uppercase tracking-wider">
            {r.label}
          </p>
        </div>
      ))}
    </div>
  );
}

// ============== VIDEO THUMBNAIL ==============
function VideoThumbnail({ video, index, onClick }: { video: any; index: number; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-xl border border-border/30 transition-all hover:shadow-lg hover:border-primary/20"
    >
      <img
        src={video.poster || video.thumbnail || "/video-placeholder.jpg"}
        alt={video.title || `Video ${index + 1}`}
        loading="lazy"
        className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
        <span className="rounded-full bg-white/90 p-3 text-black opacity-0 transition-opacity group-hover:opacity-100 shadow-lg">
          <Play className="h-5 w-5 fill-current" />
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
        <p className="text-xs font-medium text-white truncate">{video.title || `Video ${index + 1}`}</p>
      </div>
      <div className="absolute top-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] text-white/80 backdrop-blur-sm">
        <span className="flex items-center gap-1">
          <Film className="h-3 w-3" /> Video
        </span>
      </div>
    </button>
  );
}

// ============== MAIN ==============
function ProjectPage() {
  const { project } = Route.useLoaderData() as { project: Project };
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const infoRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (infoRef.current) {
        const rect = infoRef.current.getBoundingClientRect();
        setIsSticky(rect.top < 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prepare videos array - support both single video and multiple videos
  const videos = project.videos || (project.video ? [{ src: project.video, title: project.title, poster: project.image }] : []);
  const hasMultipleVideos = videos.length > 1;

  // Prepare media items for lightbox
  const mediaItems = [
    ...videos.map(v => ({ src: v.src, type: 'video' as const, title: v.title || project.title, poster: v.poster || project.image })),
    ...project.gallery.map(img => ({ src: img, type: 'image' as const, title: project.title })),
  ];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  // Get main video (first one or the one selected)
  const mainVideo = videos[activeVideoIndex] || videos[0];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative pt-28 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/3 via-transparent to-transparent" />
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-primary/3 blur-3xl" />
        
        <div className="relative mx-auto max-w-[1100px] px-5 sm:px-8">
          <Link 
            to="/work" 
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground group"
          >
            <ArrowRight className="h-3.5 w-3.5 rotate-180 transition-transform group-hover:-translate-x-1" />
            Back to projects
          </Link>

          <div className="mt-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-0.5 text-[10px] font-medium text-primary uppercase tracking-wider">
                {project.category}
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{project.year}</span>
            </div>
            
            <h1 className="mt-3 text-[clamp(2.2rem,5vw,3.8rem)] font-display leading-[1.05] tracking-tight">
              {project.title}
            </h1>
            
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Briefcase className="h-3.5 w-3.5 text-primary/60" />
                {project.client}
              </span>
              <span className="flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5 text-primary/60" />
                {project.service}
              </span>
              {hasMultipleVideos && (
                <span className="flex items-center gap-1.5 text-xs">
                  <Film className="h-3.5 w-3.5 text-primary/60" />
                  {videos.length} Videos
                </span>
              )}
            </div>
          </div>

          {/* Main Video Player */}
          <Reveal delay={0.08} className="mt-8">
            {videos.length > 0 ? (
              <div 
                className="relative cursor-pointer overflow-hidden rounded-2xl border border-border/50 shadow-2xl"
                onClick={() => openLightbox(activeVideoIndex)}
              >
                <VideoPlayer 
                  src={mainVideo.src} 
                  poster={mainVideo.poster || project.image} 
                  title={mainVideo.title || project.title} 
                  client={project.client}
                  meta="Play the film"
                  category={project.category}
                  className="aspect-video w-full"
                />
              </div>
            ) : (
              <div 
                className="relative overflow-hidden rounded-2xl border border-border/50 shadow-2xl cursor-pointer group"
                onClick={() => openLightbox(0)}
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full max-h-[500px] object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
                  <span className="rounded-full bg-white/90 p-4 text-black opacity-0 transition-opacity group-hover:opacity-100 shadow-xl">
                    <ImageIcon className="h-6 w-6" />
                  </span>
                </div>
              </div>
            )}
          </Reveal>

          {/* Video Thumbnails - Show if multiple videos */}
          {hasMultipleVideos && (
            <div className="mt-4">
              <p className="text-xs text-muted-foreground mb-2">More videos from this project</p>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                {videos.map((video, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveVideoIndex(i);
                      // Scroll to video
                      document.querySelector('.rounded-2xl')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                      i === activeVideoIndex ? 'border-primary' : 'border-border/50 hover:border-primary/50'
                    }`}
                  >
                    <img
                      src={video.poster || project.image}
                      alt={video.title || `Video ${i + 1}`}
                      className="aspect-video w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play className="h-6 w-6 text-white fill-current" />
                    </div>
                    {i === activeVideoIndex && (
                      <div className="absolute inset-0 ring-2 ring-primary ring-inset" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stats Bar */}
          <div className="mt-8 pt-6 border-t border-border/30">
            <StatsBar results={project.results} />
          </div>
        </div>
      </section>

      {/* ===== STICKY NAV ===== */}
      <AnimatePresence>
        {isSticky && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl px-5 py-3 sm:px-8"
          >
            <div className="mx-auto max-w-[1100px] flex items-center justify-between">
              <span className="text-sm font-medium truncate">{project.title}</span>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground">{project.client}</span>
                <Link 
                  to="/contact" 
                  className="rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground transition-all hover:shadow-lg"
                >
                  Enquire
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== INFO SECTION ===== */}
      <section ref={infoRef} className="py-12 border-y border-border/30 bg-surface/10">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { 
                label: "Objective", 
                text: project.objective,
                icon: <Award className="h-4 w-4 text-primary/60" />
              },
              { 
                label: "Challenge", 
                text: project.challenge,
                icon: <Clock className="h-4 w-4 text-primary/60" />
              },
              { 
                label: "Approach", 
                text: project.approach,
                icon: <Sparkles className="h-4 w-4 text-primary/60" />
              },
            ].map((item, i) => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center gap-2">
                  {item.icon}
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                    {item.label}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEEDBACK ===== */}
      <section className="py-16">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
          <div className="relative rounded-2xl border border-border/30 bg-surface/10 p-8 md:p-10">
            <Quote className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-primary p-1.5 text-primary-foreground" />
            <div className="pl-4">
              <p className="text-base leading-relaxed text-foreground/80 md:text-lg">
                "{project.feedback.quote}"
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                  {project.feedback.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium">{project.feedback.author}</p>
                  <p className="text-xs text-muted-foreground">Client Feedback</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      {project.gallery.length > 0 && (
        <section className="py-12 border-t border-border/30">
          <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                  Gallery
                </p>
                <h2 className="text-xl font-display tracking-tight">Visual Story</h2>
              </div>
              <button
                onClick={() => openLightbox(videos.length)}
                className="group flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                View all 
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
            
            <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
              {project.gallery.slice(0, 4).map((g, i) => (
                <button
                  key={i}
                  onClick={() => openLightbox(videos.length + i)}
                  className="group relative overflow-hidden rounded-xl border border-border/30 transition-all hover:shadow-lg hover:border-primary/20"
                >
                  <img 
                    src={g} 
                    alt={`${project.title} ${i + 1}`} 
                    loading="lazy" 
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
                    <span className="rounded-full bg-white/80 p-2 text-black opacity-0 transition-opacity group-hover:opacity-100 shadow-lg">
                      <ImageIcon className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== RELATED PROJECTS ===== */}
      <section className="py-16 border-t border-border/30 bg-surface/10">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                Explore More
              </p>
              <h2 className="text-xl font-display tracking-tight">Related Work</h2>
            </div>
            <Link 
              to="/work" 
              className="group flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              View all projects
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            {PROJECTS.filter(p => p.slug !== project.slug).slice(0, 4).map((p) => (
              <Link
                key={p.slug}
                to="/work/$slug"
                params={{ slug: p.slug }}
                className="group overflow-hidden rounded-xl border border-border/30 bg-background transition-all hover:shadow-lg hover:border-primary/20"
              >
                <img 
                  src={p.image} 
                  alt={p.title} 
                  loading="lazy" 
                  className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{p.client}</p>
                  <p className="text-xs font-medium line-clamp-1">{p.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16">
        <div className="mx-auto max-w-[1100px] px-5 text-center sm:px-8">
          <div className="rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-primary/5 border border-primary/10 p-10">
            <h2 className="text-2xl font-display tracking-tight sm:text-3xl">
              Ready to create something <span className="text-primary">exceptional</span>?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
              Let's bring your brand story to life with our production expertise.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-xl hover:scale-105"
              >
                Start a project <ArrowRight className="h-4 w-4" />
              </Link>
              <Link 
                to="/services" 
                className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3 text-sm font-medium transition-all hover:bg-muted"
              >
                Explore services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LIGHTBOX ===== */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox 
            items={mediaItems}
            initialIndex={lightboxIndex} 
            onClose={closeLightbox} 
          />
        )}
      </AnimatePresence>
    </>
  );
}