import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { 
  ArrowRight, 
  Check, 
  X, 
  Play, 
  Maximize2, 
  Image as ImageIcon, 
  Video, 
  Clock, 
  Users, 
  Award,
  Star,
  Quote,
  Briefcase,
  Camera,
  Sparkles,
  ChevronDown,
  Eye,
  Send,
  MessageCircle,
  Film,
  Monitor,
  Smartphone,
  Tv,
  Youtube,
  Instagram,
  Facebook,
  Share2,
  Clapperboard,
  Mic,
  Palette,
  Zap,
  Heart,
  Globe,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Reveal } from "@/components/site/Reveal";
import { VideoPlayer } from "@/components/site/VideoPlayer";
import { PROJECTS, SERVICES, type Service } from "@/data/site";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = SERVICES.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  component: ServicePage,
  head: ({ loaderData, params }) => {
    const s = loaderData?.service;
    const title = s ? `${s.title} — HappyLamb Production` : "Service — HappyLamb";
    const desc = s?.overview.slice(0, 155) ?? "";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/services/${params.slug}` },
        { property: "og:image", content: s?.image || "/og-image.jpg" },
      ],
      links: [{ rel: "canonical", href: `/services/${params.slug}` }],
      scripts: s
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: s.faqs.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              }),
            },
          ]
        : [],
    };
  },
});

// ============== LIGHTBOX COMPONENT ==============
function Lightbox({ 
  items, 
  initialIndex, 
  onClose 
}: { 
  items: { type: 'image' | 'video'; src: string; title?: string }[]; 
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
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/98"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="dialog"
      aria-label="Media lightbox"
    >
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent p-4 sm:p-6">
        <span className="text-xs sm:text-sm text-white/60 font-light tracking-wider">
          {String(currentIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </span>
        <button
          onClick={onClose}
          className="rounded-full bg-white/5 p-2 sm:p-3 text-white transition-all hover:bg-white/20 hover:scale-110"
          aria-label="Close lightbox"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-2 sm:left-6 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/5 p-2 sm:p-4 text-white transition-all hover:bg-white/20 hover:scale-110"
        aria-label="Previous"
      >
        <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 sm:right-6 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/5 p-2 sm:p-4 text-white transition-all hover:bg-white/20 hover:scale-110"
        aria-label="Next"
      >
        <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
      </button>

      <div className="relative max-h-[85vh] max-w-[92vw] sm:max-w-[90vw]">
        {currentItem.type === 'video' ? (
          <video
            ref={videoRef}
            src={currentItem.src}
            controls
            className="max-h-[80vh] max-w-full rounded-xl shadow-2xl"
            poster={currentItem.title}
          />
        ) : (
          <img
            src={currentItem.src}
            alt={currentItem.title || `Media ${currentIndex + 1}`}
            className="max-h-[80vh] w-auto object-contain rounded-xl shadow-2xl"
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
}

// ============== HERO CAROUSEL ==============
function HeroCarousel({ 
  images, 
  title 
}: { 
  images: string[]; 
  title: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  
  const validImages = images.filter(img => img && img.trim() !== "");
  const hasMultipleImages = validImages.length > 1;

  // Auto-play functionality
  useEffect(() => {
    if (hasMultipleImages && !isPaused) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % validImages.length);
      }, 4000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [validImages.length, isPaused, hasMultipleImages]);

  // Pause on hover for desktop
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsPaused(false);
      return;
    }
    
    const diff = touchStart - touchEnd;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe left - next
        setCurrentIndex((prev) => (prev + 1) % validImages.length);
      } else {
        // Swipe right - previous
        setCurrentIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
      }
    }
    
    setTouchStart(null);
    setTouchEnd(null);
    setIsPaused(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % validImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // If no images, show placeholder
  if (validImages.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
        <div className="flex h-[300px] sm:h-[500px] items-center justify-center bg-gradient-to-br from-surface to-muted">
          <ImageIcon className="h-12 w-12 sm:h-20 sm:w-20 text-muted-foreground/30" />
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative overflow-hidden rounded-2xl border border-border shadow-2xl group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Main Image Container */}
      <div 
        className="relative"
        style={{ 
          height: 'clamp(250px, 50vw, 500px)',
          minHeight: '250px'
        }}
      >
        <img 
          src={validImages[currentIndex]} 
          alt={`${title} - ${currentIndex + 1}`} 
          className="h-full w-full object-cover transition-all duration-700 ease-in-out"
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      {/* Navigation Arrows - Desktop only */}
      {hasMultipleImages && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1.5 sm:p-2.5 text-white opacity-0 transition-all hover:bg-black/60 hover:scale-110 group-hover:opacity-100 focus:opacity-100"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1.5 sm:p-2.5 text-white opacity-0 transition-all hover:bg-black/60 hover:scale-110 group-hover:opacity-100 focus:opacity-100"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </>
      )}

      {/* Dots Navigation */}
      {hasMultipleImages && (
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
          {validImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-6 sm:w-8 h-1.5 sm:h-2 bg-white'
                  : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Slide Counter - Mobile friendly */}
      {hasMultipleImages && (
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 rounded-full bg-black/40 px-2 py-0.5 sm:px-3 sm:py-1 text-[8px] sm:text-xs text-white/80 backdrop-blur-sm">
          {currentIndex + 1} / {validImages.length}
        </div>
      )}
    </div>
  );
}

// ============== VIDEO GALLERY ==============
function VideoGallery({ videos }: { videos: { src: string; title: string; poster?: string }[] }) {
  const [activeVideo, setActiveVideo] = useState(0);

  if (!videos.length) return null;

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
        <VideoPlayer 
          src={videos[activeVideo].src} 
          poster={videos[activeVideo].poster || "/video-poster.jpg"} 
          title={videos[activeVideo].title} 
          meta="Play Video" 
          className="aspect-video w-full" 
        />
      </div>

      {videos.length > 1 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4">
          {videos.map((video, i) => (
            <button
              key={i}
              onClick={() => setActiveVideo(i)}
              className={`group relative overflow-hidden rounded-xl transition-all ${
                i === activeVideo 
                  ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' 
                  : 'hover:ring-2 hover:ring-primary/50 hover:ring-offset-2 hover:ring-offset-background'
              }`}
            >
              <div className="aspect-video bg-surface">
                {video.poster ? (
                  <img 
                    src={video.poster} 
                    alt={video.title} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-muted">
                    <Video className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <Play className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 sm:p-3">
                <p className="text-[10px] sm:text-xs font-medium text-white truncate">{video.title}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ============== PHOTO GALLERY ==============
function PhotoGallery({ images, onImageClick }: { images: string[]; onImageClick: (index: number) => void }) {
  if (!images.length) return null;

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
      {images.map((img, i) => (
        <button
          key={i}
          onClick={() => onImageClick(i)}
          className="group relative overflow-hidden rounded-xl sm:rounded-2xl transition-all hover:scale-[1.02] hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <div className="aspect-[3/4] sm:aspect-[4/5] md:aspect-square lg:aspect-[4/5] w-full">
            <img 
              src={img} 
              alt={`Gallery ${i + 1}`} 
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/30">
            <div className="rounded-full bg-white/90 p-1.5 sm:p-3 text-black opacity-0 transition-all scale-75 group-hover:opacity-100 group-hover:scale-100">
              <Maximize2 className="h-3 w-3 sm:h-5 sm:w-5" />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

// ============== MAIN PAGE ==============
function ServicePage() {
  const { service } = Route.useLoaderData() as { service: Service };
  const related = PROJECTS.filter((p) => p.service === service.title);
  const cases = related.length ? related : PROJECTS.slice(0, 2);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');

  const galleryImages = service.gallery?.filter((g) => g && g.trim() !== "") || [];
  const videos = service.videos || (service.video ? [{ src: service.video, title: `${service.title} Showreel`, poster: service.image }] : []);

  // Create carousel images from service image + gallery
  const carouselImages = service.image ? [service.image, ...galleryImages] : galleryImages;

  const allMedia = [
    ...galleryImages.map(src => ({ type: 'image' as const, src, title: '' })),
    ...videos.map(v => ({ type: 'video' as const, src: v.src, title: v.poster || v.title }))
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

  const platforms = [
    { icon: Youtube, label: "YouTube", color: "text-red-500" },
    { icon: Instagram, label: "Instagram", color: "text-pink-500" },
    { icon: Facebook, label: "Facebook", color: "text-blue-500" },
    { icon: Tv, label: "Broadcast", color: "text-purple-500" },
  ];

  const formats = [
    { icon: Monitor, label: "16:9", desc: "Standard & Broadcast" },
    { icon: Smartphone, label: "9:16", desc: "Vertical & Reels" },
    { icon: Film, label: "Cinematic", desc: "Wide Screen" },
    { icon: Share2, label: "Multi-Platform", desc: "Optimized for All" },
  ];

  const features = [
    { icon: Clapperboard, label: "End-to-End Production", desc: "From concept to final delivery" },
    { icon: Palette, label: "Creative Excellence", desc: "Award-winning creative team" },
    { icon: Zap, label: "Fast Turnaround", desc: "Efficient workflow and delivery" },
    { icon: Heart, label: "Client First", desc: "Dedicated support throughout" },
  ];

  return (
    <>
      {/* ========== HERO (SYMMETRIC - ITALIC & BOLD) ========== */}
      <section className="relative min-h-screen flex items-center pt-32 pb-16 bg-background border-b border-border/40">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Text Content (Italic & Bold) */}
            <Reveal>
              {/* Tiny Divider */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-primary/50"></div>
                <p className="text-xs tracking-[0.3em] text-foreground/60 uppercase font-medium">
                  {service.hero}
                </p>
              </div>
              
              {/* ✅ FIX: Heading split into Two Lines. 2nd Line is Italic & Gray */}
              <h1 className="text-[clamp(3rem,7.5vw,5.5rem)] leading-[0.95] tracking-tighter font-medium text-foreground max-w-4xl break-words">
                Commercial Ad <br />
                <span className="italic text-muted-foreground/60">Film Production</span>
              </h1>
              
              {/* Overview Text - Gray */}
              <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
                {service.overview}
              </p>
              
              {/* Minimal Buttons */}
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm tracking-wider transition-all hover:gap-4 hover:border-primary"
                >
                  <Send className="h-4 w-4" />
                  Get a Quote
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/work"
                  className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Eye className="h-4 w-4" />
                  View Portfolio
                </Link>
              </div>

              {/* Back to Services Link */}
              <Link 
                to="/services" 
                className="mt-10 inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-primary group"
              >
                <ArrowRight className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
                Back to Services
              </Link>
            </Reveal>

            {/* Right: Image Carousel */}
            <Reveal delay={0.2}>
              <HeroCarousel 
                images={carouselImages} 
                title={service.title}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========== FEATURES SECTION (SYMMETRIC) ========== */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <Reveal className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-6 bg-border"></div>
              <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Why Choose Us</p>
              <div className="h-px w-6 bg-border"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
              Premium <br />
              <span className="italic text-foreground/60">Features.</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              We combine creativity with technical excellence to deliver outstanding results.
            </p>
          </Reveal>
          
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="group rounded-xl border border-border/40 bg-surface/30 p-6 text-center transition-all hover:border-primary/30 hover:shadow-sm">
                  <div className="mx-auto rounded-full bg-primary/10 p-3 w-fit">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 font-medium text-base tracking-tight">{feature.label}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== VIDEO FORMATS SECTION (SYMMETRIC) ========== */}
      <section className="border-y border-border/30 bg-surface/50 py-24">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <Reveal className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-6 bg-border"></div>
              <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Delivery</p>
              <div className="h-px w-6 bg-border"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
              Multi-Platform <br />
              <span className="italic text-foreground/60">Formats.</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              We deliver content optimized for every platform and screen size.
            </p>
          </Reveal>
          
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {formats.map((format, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="group rounded-xl border border-border/40 bg-background p-6 text-center transition-all hover:border-primary/30 hover:shadow-sm">
                  <format.icon className="mx-auto h-8 w-8 text-primary transition-transform group-hover:scale-110" />
                  <h3 className="mt-3 font-medium text-base">{format.label}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{format.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {platforms.map((platform, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div className="flex items-center gap-2 rounded-full border border-border/40 bg-background/50 px-5 py-2 transition-all hover:border-primary/30">
                  <platform.icon className={`h-4 w-4 ${platform.color}`} />
                  <span className="text-xs font-medium">{platform.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== MEDIA GALLERY (SYMMETRIC) ========== */}
      {(galleryImages.length > 0 || videos.length > 0) && (
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
            <Reveal className="text-center max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px w-6 bg-border"></div>
                <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Portfolio</p>
                <div className="h-px w-6 bg-border"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
                Our <br />
                <span className="italic text-foreground/60">Work.</span>
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                Explore our portfolio of stunning visuals and cinematic experiences.
              </p>
            </Reveal>

            <div className="mt-10 flex justify-center">
              <div className="inline-flex rounded-full border border-border/40 bg-surface/30 p-1">
                <button
                  onClick={() => setActiveTab('photos')}
                  className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs font-medium transition-all ${
                    activeTab === 'photos' 
                      ? 'bg-primary text-primary-foreground shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <ImageIcon className="h-3.5 w-3.5" />
                  Photos
                </button>
                <button
                  onClick={() => setActiveTab('videos')}
                  className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs font-medium transition-all ${
                    activeTab === 'videos' 
                      ? 'bg-primary text-primary-foreground shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Video className="h-3.5 w-3.5" />
                  Videos
                </button>
              </div>
            </div>

            <div className="mt-10">
              {activeTab === 'photos' ? (
                galleryImages.length > 0 ? (
                  <PhotoGallery 
                    images={galleryImages} 
                    onImageClick={(index) => {
                      const mediaIndex = allMedia.findIndex(
                        (m, i) => m.type === 'image' && i === index
                      );
                      openLightbox(mediaIndex);
                    }}
                  />
                ) : (
                  <div className="rounded-xl border border-border/40 bg-surface/30 p-12 text-center">
                    <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-3 text-sm text-muted-foreground">No photos available</p>
                  </div>
                )
              ) : (
                videos.length > 0 ? (
                  <VideoGallery videos={videos} />
                ) : (
                  <div className="rounded-xl border border-border/40 bg-surface/30 p-12 text-center">
                    <Video className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-3 text-sm text-muted-foreground">No videos available</p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* ========== CASE STUDIES (SYMMETRIC) ========== */}
      <section className="border-y border-border/30 bg-surface/50 py-24">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <Reveal className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-6 bg-border"></div>
              <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Case Studies</p>
              <div className="h-px w-6 bg-border"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
              Brands We've <br />
              <span className="italic text-foreground/60">Worked With.</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              Real results from real projects. See how we've helped brands tell their stories.
            </p>
          </Reveal>
          
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {cases.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <Link 
                  key={p.slug} 
                  to="/work/$slug" 
                  params={{ slug: p.slug }} 
                  className="group block overflow-hidden rounded-xl border border-border/40 bg-background transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img 
                      src={p.image} 
                      alt={p.title} 
                      loading="lazy" 
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[10%] group-hover:grayscale-0" 
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2">
                      <span className="text-xs tracking-wider text-primary uppercase">{p.client}</span>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{p.year}</span>
                    </div>
                    <h3 className="mt-2 font-medium text-lg tracking-tight">{p.title}</h3>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-primary transition-all group-hover:gap-3">
                      Read Case Study <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FAQS (SYMMETRIC) ========== */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-4xl px-6 sm:px-10">
          <Reveal className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-6 bg-border"></div>
              <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Questions</p>
              <div className="h-px w-6 bg-border"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
              FAQs.
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              Everything you need to know about our {service.title.toLowerCase()} services.
            </p>
          </Reveal>
          
          <div className="mt-12 space-y-4">
            {service.faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.05}>
                <details className="group rounded-xl border border-border/40 bg-surface/30 transition-all hover:border-primary/30">
                  <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-sm tracking-tight transition-colors marker:content-none hover:text-primary">
                    <span>{f.q}</span>
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-5 pb-5">
                    <div className="h-px w-full bg-border/40" />
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA (SYMMETRIC - DARK) ========== */}
      <section className="bg-ink py-32 text-ink-foreground relative overflow-hidden text-center border-t border-ink-foreground/10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none"></div>
        
        <div className="relative mx-auto max-w-4xl px-6">
          <Reveal>
            <h2 className="text-5xl md:text-6xl font-medium tracking-tight leading-tight">
              Ready to shoot <br />
              <span className="italic text-ink-foreground/40">{service.title}</span>?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-ink-foreground/60 text-lg">
              Let's bring your vision to life. Get in touch with our team and create something extraordinary.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-primary text-ink px-10 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-xl shadow-primary/20"
              >
                Start the Conversation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 text-sm text-ink-foreground/60 hover:text-ink-foreground transition-colors"
              >
                See Our Work
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== LIGHTBOX ========== */}
      {lightboxOpen && (
        <Lightbox 
          items={allMedia}
          initialIndex={lightboxIndex} 
          onClose={closeLightbox} 
        />
      )}
    </>
  );
}