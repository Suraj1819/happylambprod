import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Our Work" },
  { to: "/clients", label: "Clients" },
  { to: "/team", label: "Team" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || open
            ? "border-b border-border/50 bg-background/90 backdrop-blur-md shadow-sm"
            : "bg-background/70 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:h-[4.25rem] sm:px-8">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5"
            onClick={() => setOpen(false)}
          >
            <img
              src={logo}
              alt="HappyLamb Production"
              width={36}
              height={36}
              className="h-9 w-9"
            />
            <span className="leading-none">
              <span className="block font-display text-xl tracking-wide text-foreground sm:text-[1.35rem]">
                HappyLamb
              </span>
              <span className="block font-heading text-[0.55rem] tracking-[0.38em] text-muted-foreground uppercase">
                Production
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-primary bg-primary/10" }}
                className="rounded-full px-3.5 py-2 font-heading text-[0.72rem] tracking-[0.15em] text-foreground/75 uppercase transition-all duration-200 hover:bg-primary/5 hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-2.5">
            <Link
              to="/contact"
              className="hidden rounded-full bg-primary px-5 py-2.5 font-heading text-[0.68rem] tracking-[0.18em] text-primary-foreground uppercase shadow-glow transition-all duration-300 hover:scale-[1.03] sm:inline-flex"
            >
              Hire Us
            </Link>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground transition-colors duration-200 hover:border-primary hover:text-primary lg:hidden"
            >
              {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 z-40 flex flex-col bg-background/95 backdrop-blur-lg lg:hidden">
          <div className="h-16 shrink-0 sm:h-[4.25rem]" />

          <nav className="flex flex-1 flex-col items-center justify-center gap-1.5 px-6">
            {NAV.map((item, i) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="w-full max-w-[280px] rounded-xl border border-border/60 py-3.5 text-center font-heading text-[0.85rem] tracking-[0.2em] uppercase text-foreground/80 transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                style={{
                  animation: "fadeSlideUp 0.35s ease both",
                  animationDelay: `${i * 40}ms`,
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 flex-col items-center gap-3 px-6 pb-10">
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="inline-flex w-full max-w-[280px] items-center justify-center rounded-full bg-primary px-7 py-3.5 font-heading text-[0.72rem] tracking-[0.18em] text-primary-foreground uppercase shadow-glow"
            >
              Hire Us
            </Link>
            <p className="text-center text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase">
              Mumbai · Patna
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}