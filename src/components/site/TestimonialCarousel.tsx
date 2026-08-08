import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/data/site";
import p1 from "@/assets/team-1.jpg";
import p2 from "@/assets/team-2.jpg";
import p3 from "@/assets/team-3.jpg";
import p4 from "@/assets/team-4.jpg";

const FACES = [p1, p2, p3, p4];

export function TestimonialCarousel() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 5200);
    return () => clearInterval(id);
  }, []);

  const t = TESTIMONIALS[i]!;

  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="relative min-h-[19rem] sm:min-h-[16rem]">
        <AnimatePresence mode="wait">
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="glass rounded-[2rem] p-8 shadow-lift sm:p-12"
          >
            <div className="flex gap-1 text-primary">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-6 font-display text-2xl leading-tight tracking-wide text-foreground sm:text-3xl">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-7 flex items-center gap-4">
              <img
                src={FACES[i % FACES.length]}
                alt={t.author}
                loading="lazy"
                className="h-14 w-14 shrink-0 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="font-heading text-sm tracking-[0.14em] uppercase">{t.author}</p>
                <p className="truncate text-sm text-muted-foreground">{t.role}</p>
              </div>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-7 flex justify-center gap-2">
        {TESTIMONIALS.map((_, d) => (
          <button
            key={d}
            type="button"
            aria-label={`Show testimonial ${d + 1}`}
            onClick={() => setI(d)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              d === i ? "w-10 bg-primary" : "w-4 bg-border hover:bg-primary/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}