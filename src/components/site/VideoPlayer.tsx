// components/site/VideoPlayer.tsx

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  Maximize2,
  Minimize2,
  Pause,
  Play,
  Volume2,
  VolumeX,
  X,
  Video,
  Youtube,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ═══════════════════ HELPERS ═══════════════════ */

function isYouTubeUrl(src?: string) {
  if (!src) return false;
  return /(?:youtube\.com|youtu\.be)/i.test(src);
}

function getYouTubeId(src: string): string | null {
  if (!src) return null;
  
  try {
    const url = src.trim();
    
    if (url.includes('/embed/')) {
      const match = url.match(/\/embed\/([^?&]+)/);
      return match ? match[1] : null;
    }
    
    if (url.includes('youtu.be/')) {
      const match = url.match(/youtu\.be\/([^?&]+)/);
      return match ? match[1] : null;
    }
    
    if (url.includes('watch?v=') || (url.includes('watch?') && url.includes('v='))) {
      const match = url.match(/[?&]v=([^?&]+)/);
      return match ? match[1] : null;
    }
    
    if (url.includes('/shorts/')) {
      const match = url.match(/\/shorts\/([^?&]+)/);
      return match ? match[1] : null;
    }
    
    if (/^[\w-]{11}$/.test(url)) {
      return url;
    }
    
    const idMatch = url.match(/([\w-]{11})(?=[?&]|$)/);
    return idMatch ? idMatch[1] : null;
    
  } catch {
    const fallbackMatch = src.match(/([\w-]{11})/);
    return fallbackMatch ? fallbackMatch[1] : null;
  }
}

function ytThumb(id: string, q: "maxresdefault" | "hqdefault" = "maxresdefault") {
  return `https://i.ytimg.com/vi/${id}/${q}.jpg`;
}

// ✅ FIX: window.location.origin ko safe kiya
function ytModalEmbed(id: string) {
  const p = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    fs: "1",
    origin: typeof window !== "undefined" ? window.location.origin : "", // ✅ Important fix
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${p}`;
}

// ✅ FIX: youtube-nocookie use kiya taaki "Sign in" error na aaye
function ytHoverEmbed(id: string) {
  const p = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    controls: "0",
    disablekb: "1",
    fs: "0",
    modestbranding: "1",
    playsinline: "1",
    rel: "0",
    iv_load_policy: "3",
    loop: "1",
    playlist: id,
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${p}`;
}

function fmt(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

/* ═══════════════════ TYPES ═══════════════════ */

export type VideoPlayerProps = {
  src: string;
  poster?: string;
  title?: string;
  client?: string;
  meta?: string;
  category?: string;
  aspect?: string;
  autoplayInView?: boolean;
  className?: string;
};

/* ═══════════════════ COMPONENT ═══════════════════ */

export function VideoPlayer({
  src,
  poster,
  title,
  client,
  meta,
  category,
  aspect = "16/9",
  className,
}: VideoPlayerProps) {
  const isYT = isYouTubeUrl(src);
  const ytId = useMemo(() => (isYT ? getYouTubeId(src) : null), [isYT, src]);

  const previewRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const modalShellRef = useRef<HTMLDivElement>(null);

  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [thumb, setThumb] = useState<string | undefined>();
  const [videoError, setVideoError] = useState(false);

  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.9);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fs, setFs] = useState(false);

  useEffect(() => {
    if (ytId) {
      setThumb(ytThumb(ytId));
      setVideoError(false);
    } else {
      setThumb(poster);
    }
  }, [ytId, poster, src]);

  /* ── hover play ── */
  const onEnter = async () => {
    setHovered(true);
    if (isYT) return;

    const v = previewRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.volume = 0.9;
    v.muted = false;
    try {
      await v.play();
    } catch {
      v.muted = true;
      await v.play().catch(() => {});
    }
  };

  const onLeave = () => {
    setHovered(false);
    const v = previewRef.current;
    if (!isYT && v) {
      v.pause();
      v.currentTime = 0;
      v.muted = true;
    }
  };

  const openModal = (e?: MouseEvent) => {
    e?.stopPropagation();
    const v = previewRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
      v.muted = true;
    }
    setHovered(false);
    setOpen(true);
    setPlaying(true);
    setMuted(false);
  };

  const closeModal = useCallback(() => {
    setOpen(false);
    setPlaying(false);
    const v = modalVideoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, closeModal]);

  useEffect(() => {
    if (!open || isYT) return;
    const el = modalVideoRef.current;
    if (!el) return;
    const onTime = () => {
      if (!el.duration) return;
      setDuration(el.duration);
      setTime(el.currentTime);
      setProgress((el.currentTime / el.duration) * 100);
    };
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onTime);
    el.volume = volume;
    el.muted = false;
    el.play().then(() => setPlaying(true)).catch(() => {});
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onTime);
    };
  }, [open, isYT, volume]);

  const seek = (e: MouseEvent<HTMLDivElement>) => {
    const el = modalVideoRef.current;
    if (!el?.duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    el.currentTime = pct * el.duration;
  };

  const togglePlay = () => {
    const el = modalVideoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const el = modalVideoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  const onVolume = (v: number) => {
    setVolume(v);
    const el = modalVideoRef.current;
    if (!el) return;
    el.volume = v;
    el.muted = v === 0;
    setMuted(v === 0);
  };

  const toggleFs = async () => {
    const node = modalShellRef.current;
    if (!node) return;
    try {
      if (!document.fullscreenElement) {
        await node.requestFullscreen();
        setFs(true);
      } else {
        await document.exitFullscreen();
        setFs(false);
      }
    } catch {
      /* */
    }
  };

  useEffect(() => {
    const fn = () => setFs(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", fn);
    return () => document.removeEventListener("fullscreenchange", fn);
  }, []);

  const ratio = aspect.includes("/") ? aspect.replace(":", "/") : aspect;

  // Watch on YouTube link
  const watchOnYouTube = useMemo(() => {
    if (ytId) {
      return `https://www.youtube.com/watch?v=${ytId}`;
    }
    return null;
  }, [ytId]);

  /* ═══════════════ MODAL ═══════════════ */
  const modal = (
    <motion.div
      key="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-3 sm:p-6"
      onClick={closeModal}
    >
      <motion.div
        ref={modalShellRef}
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.22 }}
        className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-zinc-950 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
          <div className="min-w-0">
            {title && (
              <p className="truncate font-display text-sm tracking-wide text-white sm:text-base">
                {title}
              </p>
            )}
            {(client || meta) && (
              <p className="truncate text-xs text-white/50 sm:text-sm">
                {[client, meta].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="relative w-full bg-black" style={{ aspectRatio: "16 / 9" }}>
          {isYT && ytId ? (
            <iframe
              src={ytModalEmbed(ytId)}
              title={title ?? "Video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <>
              <video
                ref={modalVideoRef}
                src={src}
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
                onClick={togglePlay}
                onError={() => setVideoError(true)}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent px-3 pt-14 pb-3 sm:px-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="w-9 text-right font-mono text-[11px] text-white/80">
                    {fmt(time)}
                  </span>
                  <div
                    className="relative h-1.5 flex-1 cursor-pointer rounded-full bg-white/20"
                    onClick={seek}
                  >
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-red-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="w-9 font-mono text-[11px] text-white/80">
                    {fmt(duration)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="grid h-9 w-9 place-items-center rounded-full text-white hover:bg-white/15"
                    >
                      {playing ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5 fill-current" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={toggleMute}
                      className="grid h-9 w-9 place-items-center rounded-full text-white hover:bg-white/15"
                    >
                      {muted || volume === 0 ? (
                        <VolumeX className="h-5 w-5" />
                      ) : (
                        <Volume2 className="h-5 w-5" />
                      )}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={muted ? 0 : volume}
                      onChange={(e) => onVolume(Number(e.target.value))}
                      className="h-1 w-20 cursor-pointer accent-red-500 sm:w-28"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={toggleFs}
                    className="grid h-9 w-9 place-items-center rounded-full text-white hover:bg-white/15"
                  >
                    {fs ? (
                      <Minimize2 className="h-5 w-5" />
                    ) : (
                      <Maximize2 className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );

  /* ═══════════════ CARD ═══════════════ */
  return (
    <>
      <div
        className={cn(
          "group relative w-full cursor-pointer overflow-hidden rounded-[1.5rem] border border-border bg-black shadow-soft",
          className
        )}
        style={{ aspectRatio: ratio }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={openModal}
      >
        {/* Thumbnail */}
        <img
          src={thumb}
          alt={title ?? ""}
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 ease-out",
            hovered && "scale-[1.02]"
          )}
          loading="lazy"
          onError={() => {
            if (ytId) setThumb(ytThumb(ytId, "hqdefault"));
          }}
        />

        {/* MP4 hover preview */}
        {!isYT && (
          <video
            ref={previewRef}
            src={src}
            loop
            playsInline
            preload="metadata"
            className={cn(
              "absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-300",
              hovered ? "opacity-100" : "opacity-0"
            )}
            onError={() => setVideoError(true)}
          />
        )}

        {/* YouTube hover preview - Fixed with youtube-nocookie */}
        {isYT && ytId && hovered && (
          <iframe
            src={ytHoverEmbed(ytId)}
            title="preview"
            allow="autoplay; encrypted-media"
            className="pointer-events-none absolute inset-0 h-full w-full border-0"
            style={{
              transform: "scale(1.02)",
            }}
          />
        )}

        {/* gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

        {/* play button */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-300",
            hovered ? "opacity-0" : "opacity-100"
          )}
        >
          <span className="grid h-14 w-14 place-items-center rounded-full border border-white/30 bg-white/20 text-white shadow-lg backdrop-blur-md sm:h-16 sm:w-16">
            <Play className="h-6 w-6 fill-current pl-0.5 sm:h-7 sm:w-7" />
          </span>
        </div>

        {/* Watch on YouTube button */}
        {isYT && ytId && hovered && (
          <a
            href={watchOnYouTube || '#'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-4 right-4 z-10 flex items-center gap-2 rounded-full bg-red-600 px-3 py-1.5 text-xs font-medium text-white shadow-lg transition-all hover:bg-red-700 hover:scale-105"
          >
            <Youtube className="h-4 w-4" />
            Watch on YouTube
          </a>
        )}

        {/* Video unavailable overlay */}
        {videoError && !isYT && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10">
            <Video className="h-12 w-12 text-white/40" />
            <p className="mt-2 text-sm text-white/60">Video unavailable</p>
            <p className="text-xs text-white/30 mt-1">The video couldn't be loaded</p>
          </div>
        )}

        {/* meta */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
          {category && (
            <p className="mb-1 font-heading text-[0.6rem] tracking-[0.2em] text-white/70 uppercase">
              {category}
            </p>
          )}
          {title && (
            <h3 className="truncate font-display text-base tracking-wide text-white drop-shadow sm:text-lg">
              {title}
            </h3>
          )}
          {(client || meta) && (
            <p className="mt-0.5 truncate text-xs text-white/60 sm:text-sm">
              {[client, meta].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>{open ? modal : null}</AnimatePresence>,
          document.body
        )}
    </>
  );
}