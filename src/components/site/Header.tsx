import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

// ✅ यहाँ सिर्फ एक लाइन बदली गई है
import logo from "@/assets/brands/hello.png";

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
            ? "border-b border-border/40 bg-background/90 backdrop-blur-md shadow-sm"
            : "bg-background/70 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 sm:h-[4.25rem] sm:px-10">
          
          {/* Logo (अब यह brands/hello.png से आएगा) */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            onClick={() => setOpen(false)}
          >
            <img
              src={logo}
              alt="HappyLamb Production"
              width={36}
              height={36}
              className="h-9 w-9 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="leading-none">
              <span className="block font-medium text-lg tracking-tight text-foreground sm:text-xl">
                HappyLamb
              </span>
              <span className="block text-[0.55rem] tracking-[0.35em] text-muted-foreground uppercase mt-0.5">
                Production
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-foreground bg-foreground/5" }}
                className="rounded-full px-4 py-2 text-[0.7rem] tracking-[0.15em] text-muted-foreground uppercase transition-all duration-200 hover:bg-foreground/5 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden rounded-full bg-ink px-6 py-2.5 text-[0.7rem] tracking-[0.18em] text-ink-foreground uppercase transition-all duration-300 hover:bg-primary hover:text-ink hover:shadow-lg hover:scale-105 sm:inline-flex"
            >
              Hire Us
            </Link>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-border/60 text-foreground/60 transition-colors duration-200 hover:border-primary/50 hover:text-foreground lg:hidden"
            >
              {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 z-40 flex flex-col bg-background/98 backdrop-blur-xl lg:hidden">
          <div className="h-16 shrink-0 sm:h-[4.25rem]" />

          <nav className="flex flex-1 flex-col items-center justify-center gap-2 px-6">
            {NAV.map((item, i) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="w-full max-w-xs rounded-xl border border-border/30 py-4 text-center text-[0.8rem] tracking-[0.2em] uppercase text-foreground/70 transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                style={{
                  animation: "fadeSlideUp 0.35s ease both",
                  animationDelay: `${i * 40}ms`,
                }}
              >
                {item.label}
              </Link>
            ))}
            
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-4 w-full max-w-xs rounded-full bg-ink px-7 py-4 text-center text-[0.7rem] tracking-[0.18em] text-ink-foreground uppercase transition-all duration-300 hover:bg-primary hover:text-ink"
              style={{
                animation: "fadeSlideUp 0.35s ease both",
                animationDelay: `${NAV.length * 40}ms`,
              }}
            >
              Hire Us
            </Link>
          </nav>

          <div className="flex shrink-0 justify-center pb-10">
            <p className="text-[0.55rem] tracking-[0.2em] text-muted-foreground uppercase">
              Crafted with precision
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(16px);
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