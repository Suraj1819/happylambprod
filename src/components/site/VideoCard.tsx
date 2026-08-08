import { Play } from "lucide-react";
import { useRef, useState } from "react";

export function VideoCard({
  src,
  poster,
  title,
  meta,
  className = "",
}: {
  src: string;
  poster: string;
  title: string;
  meta?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-border/70 bg-ink shadow-soft transition-shadow duration-500 hover:shadow-lift ${className}`}
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        controls={started}
        playsInline
        preload="none"
        className="h-full w-full object-cover"
      />
      {!started && (
        <button
          type="button"
          aria-label={`Play ${title}`}
          onClick={() => {
            setStarted(true);
            void ref.current?.play();
          }}
          className="absolute inset-0 flex flex-col items-end justify-end gap-3 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent p-6 text-left"
        >
          <span className="grid h-16 w-16 place-items-center self-center rounded-full bg-primary text-primary-foreground shadow-glow transition-transform duration-300 group-hover:scale-110">
            <Play className="h-6 w-6 translate-x-[1px]" />
          </span>
          <span className="w-full">
            <span className="block font-heading text-lg tracking-wide text-ink-foreground uppercase">
              {title}
            </span>
            {meta && <span className="block text-sm text-ink-foreground/70">{meta}</span>}
          </span>
        </button>
      )}
    </div>
  );
}