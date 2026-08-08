import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

export function Counter({
  to,
  suffix = "+",
  label,
}: {
  to: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1400, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <div ref={ref}>
      <div className="display-xl text-5xl text-foreground sm:text-6xl">
        {value}
        <span className="text-primary">{suffix}</span>
      </div>
      <div className="eyebrow mt-2">{label}</div>
    </div>
  );
}