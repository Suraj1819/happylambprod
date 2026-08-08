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
  Globe
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
        <ArrowRight className="h-4 w-4 sm:h-6 sm:w-6 rotate-180" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 sm:right-6 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/5 p-2 sm:p-4 text-white transition-all hover:bg-white/20 hover:scale-110"
        aria-label="Next"
      >
        <ArrowRight className="h-4 w-4 sm:h-6 sm:w-6" />
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

// ============== PHOTO GALLERY (MOBILE FIX) ==============
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
      {/* ========== HERO ========== */}
      <section className="relative min-h-screen overflow-hidden pt-20 sm:pt-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background" />
        <div className="absolute -right-20 -top-20 h-[600px] sm:h-[800px] w-[600px] sm:w-[800px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-[400px] sm:h-[600px] w-[400px] sm:w-[600px] rounded-full bg-primary/5 blur-3xl" />
        
        <div className="relative mx-auto flex min-h-screen max-w-[1400px] items-center px-5 sm:px-8">
          <div className="grid w-full items-center gap-12 sm:gap-16 lg:grid-cols-2">
            <div className="pt-4 sm:pt-0">
              <h1 className="display-xl mt-4 text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.9] tracking-tighter break-words">
                {service.title}
              </h1>
              
              <div className="mt-4 sm:mt-6 flex items-center gap-4">
                <span className="inline-block h-0.5 w-10 sm:h-1 sm:w-16 rounded-full bg-primary" />
                <p className="font-heading text-xs sm:text-lg tracking-widest text-primary uppercase">
                  {service.hero}
                </p>
              </div>
              
              <p className="mt-4 sm:mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
                {service.overview}
              </p>
              
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  to="/contact"
                  className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-primary px-6 sm:px-8 py-3.5 sm:py-4 font-heading text-[10px] sm:text-sm tracking-[0.2em] text-primary-foreground uppercase transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/30"
                >
                  <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Get a Quote
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/work"
                  className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full border border-border bg-background/50 px-6 sm:px-8 py-3.5 sm:py-4 font-heading text-[10px] sm:text-sm tracking-[0.2em] text-foreground uppercase backdrop-blur-sm transition-all hover:bg-accent hover:shadow-xl"
                >
                  <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  View Portfolio
                </Link>
              </div>

              <Link 
                to="/services" 
                className="mt-6 sm:mt-8 inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground transition-colors hover:text-primary group"
              >
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
                Back to Services
              </Link>
            </div>
            
            <div className="relative mt-4 sm:mt-0">
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-2xl">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="h-[300px] sm:h-[500px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
              
              <div className="absolute -bottom-4 sm:-bottom-6 -right-2 sm:-right-6 rounded-full bg-primary px-4 sm:px-8 py-2 sm:py-4 shadow-2xl">
                <span className="flex items-center gap-1.5 sm:gap-2 font-heading text-[10px] sm:text-sm tracking-widest text-primary-foreground uppercase whitespace-nowrap">
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                  Premium Service
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block h-0.5 w-10 sm:h-1 sm:w-16 rounded-full bg-primary" />
            <p className="eyebrow mt-3 sm:mt-4">Why Choose Us</p>
            <h2 className="display-xl mt-2 sm:mt-3 text-3xl sm:text-5xl">Premium Features</h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground">
              We combine creativity with technical excellence to deliver outstanding results.
            </p>
          </div>
          
          <div className="mt-10 sm:mt-12 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <div key={i} className="group rounded-2xl border border-border bg-card p-6 sm:p-8 text-center shadow-soft transition-all hover:border-primary hover:shadow-2xl hover:-translate-y-1">
                <div className="mx-auto rounded-full bg-primary/10 p-3 sm:p-4 w-fit transition-all group-hover:bg-primary/20">
                  <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                </div>
                <h3 className="mt-3 sm:mt-4 font-heading text-base sm:text-lg tracking-wide">{feature.label}</h3>
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== VIDEO FORMATS SECTION ========== */}
      <section className="bg-surface/30 py-16 sm:py-20 backdrop-blur-sm">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block h-0.5 w-10 sm:h-1 sm:w-16 rounded-full bg-primary" />
            <p className="eyebrow mt-3 sm:mt-4">Multi-Platform Delivery</p>
            <h2 className="display-xl mt-2 sm:mt-3 text-3xl sm:text-5xl">Video Formats</h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground">
              We deliver content optimized for every platform and screen size.
            </p>
          </div>
          
          <div className="mt-10 sm:mt-12 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {formats.map((format, i) => (
              <div key={i} className="group rounded-2xl border border-border bg-card p-6 sm:p-8 text-center shadow-soft transition-all hover:border-primary hover:shadow-2xl hover:-translate-y-1">
                <format.icon className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-primary transition-transform group-hover:scale-110" />
                <h3 className="mt-3 sm:mt-4 font-heading text-base sm:text-xl tracking-wide">{format.label}</h3>
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted-foreground">{format.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-3 sm:gap-4">
            {platforms.map((platform, i) => (
              <div key={i} className="flex items-center gap-2 rounded-full border border-border bg-card px-4 sm:px-6 py-2 sm:py-3 shadow-soft transition-all hover:border-primary hover:shadow-lg">
                <platform.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${platform.color}`} />
                <span className="text-[10px] sm:text-sm font-medium">{platform.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== MEDIA GALLERY ========== */}
      {(galleryImages.length > 0 || videos.length > 0) && (
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block h-0.5 w-10 sm:h-1 sm:w-16 rounded-full bg-primary" />
              <p className="eyebrow mt-3 sm:mt-4">Portfolio</p>
              <h2 className="display-xl mt-2 sm:mt-3 text-3xl sm:text-5xl">Our Work</h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground">
                Explore our portfolio of stunning visuals and cinematic experiences.
              </p>
            </div>

            <div className="mt-8 sm:mt-10 flex justify-center">
              <div className="inline-flex rounded-full border border-border bg-card p-1 shadow-soft">
                <button
                  onClick={() => setActiveTab('photos')}
                  className={`flex items-center gap-1.5 sm:gap-2 rounded-full px-4 sm:px-6 py-2 sm:py-2.5 text-[10px] sm:text-sm font-medium transition-all ${
                    activeTab === 'photos' 
                      ? 'bg-primary text-primary-foreground shadow-lg' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <ImageIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                  Photos
                </button>
                <button
                  onClick={() => setActiveTab('videos')}
                  className={`flex items-center gap-1.5 sm:gap-2 rounded-full px-4 sm:px-6 py-2 sm:py-2.5 text-[10px] sm:text-sm font-medium transition-all ${
                    activeTab === 'videos' 
                      ? 'bg-primary text-primary-foreground shadow-lg' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Video className="h-3 w-3 sm:h-4 sm:w-4" />
                  Videos
                </button>
              </div>
            </div>

            <div className="mt-8 sm:mt-10">
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
                  <div className="rounded-2xl border border-border bg-card p-10 sm:p-16 text-center">
                    <ImageIcon className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground" />
                    <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground">No photos available</p>
                  </div>
                )
              ) : (
                videos.length > 0 ? (
                  <VideoGallery videos={videos} />
                ) : (
                  <div className="rounded-2xl border border-border bg-card p-10 sm:p-16 text-center">
                    <Video className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground" />
                    <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground">No videos available</p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* ========== CASE STUDIES ========== */}
      <section className="bg-surface/30 py-16 sm:py-20 backdrop-blur-sm">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block h-0.5 w-10 sm:h-1 sm:w-16 rounded-full bg-primary" />
            <p className="eyebrow mt-3 sm:mt-4">Brands We've Worked With</p>
            <h2 className="display-xl mt-2 sm:mt-3 text-3xl sm:text-5xl">Case Studies</h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground">
              Real results from real projects. See how we've helped brands tell their stories.
            </p>
          </div>
          
          <div className="mt-10 sm:mt-12 grid gap-6 sm:grid-cols-2">
            {cases.map((p, i) => (
              <Link 
                key={p.slug} 
                to="/work/$slug" 
                params={{ slug: p.slug }} 
                className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    loading="lazy" 
                    className="h-48 sm:h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="eyebrow text-[10px] sm:text-xs">{p.client}</span>
                    <span className="h-0.5 w-0.5 sm:h-1 sm:w-1 rounded-full bg-muted-foreground" />
                    <span className="text-[10px] sm:text-xs text-muted-foreground">{p.year}</span>
                  </div>
                  <h3 className="mt-1.5 sm:mt-2 font-heading text-base sm:text-xl tracking-wide uppercase">{p.title}</h3>
                  <span className="mt-3 sm:mt-4 inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-sm font-medium text-primary transition-all group-hover:gap-2 sm:group-hover:gap-3">
                    Read Case Study
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FAQS ========== */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block h-0.5 w-10 sm:h-1 sm:w-16 rounded-full bg-primary" />
            <p className="eyebrow mt-3 sm:mt-4">Questions</p>
            <h2 className="display-xl mt-2 sm:mt-3 text-3xl sm:text-5xl">FAQs</h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground">
              Everything you need to know about our {service.title.toLowerCase()} services.
            </p>
          </div>
          
          <div className="mt-10 sm:mt-12 space-y-3 sm:space-y-4">
            {service.faqs.map((f, i) => (
              <details key={f.q} className="group rounded-2xl border border-border bg-card shadow-soft transition-all hover:border-primary">
                <summary className="flex cursor-pointer items-center justify-between p-4 sm:p-6 font-heading text-sm sm:text-base tracking-wide uppercase transition-colors marker:content-none hover:text-primary">
                  <span>{f.q}</span>
                  <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                  <div className="h-px w-full bg-border" />
                  <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />
        <div className="absolute -right-40 -top-40 h-[400px] sm:h-[600px] w-[400px] sm:w-[600px] rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute -left-40 -bottom-40 h-[400px] sm:h-[600px] w-[400px] sm:w-[600px] rounded-full bg-primary/20 blur-3xl" />
        
        <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
          <span className="inline-block h-0.5 w-10 sm:h-1 sm:w-16 rounded-full bg-primary" />
          <h2 className="display-xl mt-3 sm:mt-4 text-[clamp(2.2rem,7vw,4.5rem)] leading-[0.9] break-words">
            Ready to Shoot<br />
            <span className="text-primary">{service.title}</span>?
          </h2>
          <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-sm sm:text-lg text-muted-foreground">
            Let's bring your vision to life. Get in touch with our team and create something extraordinary.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/contact"
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-primary px-6 sm:px-10 py-4 sm:py-5 font-heading text-[10px] sm:text-sm tracking-[0.2em] text-primary-foreground uppercase shadow-2xl shadow-primary/30 transition-all hover:scale-105 hover:shadow-primary/50"
            >
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              Start the Conversation
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/work"
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full border border-border bg-background/50 px-6 sm:px-10 py-4 sm:py-5 font-heading text-[10px] sm:text-sm tracking-[0.2em] text-foreground uppercase backdrop-blur-sm transition-all hover:bg-accent hover:shadow-xl"
            >
              <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
              See Our Work
            </Link>
          </div>
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