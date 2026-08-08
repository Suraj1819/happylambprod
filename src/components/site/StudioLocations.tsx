import { useCallback, useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import mumbai from "@/assets/studio-mumbai.jpg";
import patna from "@/assets/studio-patna.jpg";

const LOCATIONS = [
  { id: "mumbai", city: "Mumbai", label: "Studio 01 • Andheri West", img: mumbai },
  { id: "patna", city: "Patna", label: "Studio 02 • Boring Road", img: patna },
];

export function StudioLocations() {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const i = Math.round(el.scrollTop / el.clientHeight);
    setActive(Math.max(0, Math.min(LOCATIONS.length - 1, i)));
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const goTo = (i: number) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollTo({ top: i * el.clientHeight, behavior: "smooth" });
  };

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-lift">
      <div
        ref={scroller}
        className="h-[26rem] snap-y snap-mandatory overflow-y-auto scroll-smooth sm:h-[32rem] lg:h-[36rem] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {LOCATIONS.map((l, i) => (
          <div key={l.id} className="relative h-full w-full snap-start">
            <img
              src={l.img}
              alt={`HappyLamb Production studio in ${l.city}`}
              width={1280}
              height={1280}
              loading={i === 0 ? "eager" : "lazy"}
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/70 to-transparent" />
            <div className="absolute bottom-5 left-5 rounded-2xl border border-border/40 bg-card/90 px-5 py-3 shadow-soft backdrop-blur">
              <p className="eyebrow flex items-center gap-1.5">
                <MapPin className="h-3 w-3 text-primary" />
                Our studio
              </p>
              <p className="mt-1 font-display text-xl tracking-wide text-foreground">
                {l.city} — {l.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute top-5 right-5 flex flex-col gap-2">
        {LOCATIONS.map((l, i) => (
          <button
            key={l.id}
            type="button"
            aria-label={`Show ${l.city} studio`}
            onClick={() => goTo(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              active === i ? "h-7 bg-primary" : "bg-card/80 hover:bg-primary/60"
            } w-2.5`}
          />
        ))}
      </div>

      <div className="absolute top-5 left-5 rounded-full border border-border/40 bg-card/90 px-4 py-2 font-heading text-[0.62rem] tracking-[0.22em] uppercase shadow-soft backdrop-blur">
        Scroll ↑↓ • 2 studios
      </div>
    </div>
  );
}
