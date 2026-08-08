import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Instagram, Linkedin, Youtube, ExternalLink } from "lucide-react";
import logo from "@/assets/logo.png";
import { SERVICES } from "@/data/site";

/* ─── branch data ─── */

const MUMBAI_STUDIO = {
  city: "Mumbai",
  address: "Happy Lamb Production OPC PVT.LTD, 505, 5th Floor, Bhoomi Building, Sanjay Nagar Co.Op. Society, Cama Estate, Behind Future Studio, Goregoan (E.), Mumbai - 400063",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Happy+Lamb+Production+Goregoan+East+Mumbai",
  phone: "+91 9820778491",
  phoneRaw: "919819778430",
  email: "info@happylamb.in",
};

const PATNA_STUDIO = {
  city: "Patna",
  address: "WorkSpace - Co-Working Space in Patna, 2nd Floor, Kanti Factory Rd, above Drug Point, near Bank of Baroda, New Colony, Mahatma Gandhi Nagar, Kankarbagh, Patna, Bihar 800020",
  mapsUrl: "https://maps.app.goo.gl/p3Aux8ziTfCXWDMV8",
  phone: "+91 6207462473",
  phoneRaw: "916207462473",
  email: "ankit@happylamb.co.in",
};

const SOCIALS = [
  { icon: Instagram, href: "https://instagram.com/ankith_studios", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/@ankith_studios", label: "YouTube" },
];

/* ─── studio card ─── */

function StudioCard({
  studio,
}: {
  studio: {
    city: string;
    address: string;
    mapsUrl: string;
    phone: string;
    phoneRaw: string;
    email: string;
  };
}) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
          {studio.city} Studio
        </h3>
      </div>

      <ul className="space-y-4 text-sm text-muted-foreground">
        {/* Clickable address → Google Maps */}
        <li>
          <a
            href={studio.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 transition-colors hover:text-primary"
          >
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary/70 transition-colors group-hover:text-primary" />
            <span className="leading-relaxed">
              {studio.address}
              <ExternalLink className="ml-1.5 inline h-3 w-3 opacity-0 transition-opacity group-hover:opacity-60" />
            </span>
          </a>
        </li>

        <li className="flex items-center gap-3">
          <Phone className="h-4 w-4 shrink-0 text-primary/70" />
          <a
            href={`tel:${studio.phoneRaw}`}
            className="transition-colors hover:text-primary"
          >
            {studio.phone}
          </a>
        </li>

        <li className="flex items-center gap-3">
          <Mail className="h-4 w-4 shrink-0 text-primary/70" />
          <a
            href={`mailto:${studio.email}`}
            className="break-all transition-colors hover:text-primary"
          >
            {studio.email}
          </a>
        </li>
      </ul>
    </div>
  );
}

/* ─── footer ─── */

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="HappyLamb Production"
                width={40}
                height={40}
                loading="lazy"
                className="h-10 w-10"
              />
              <span className="font-display text-xl tracking-wide">
                HappyLamb Production
              </span>
            </div>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Advertising, production and branding studio. Cinema-grade craft with AI-accelerated workflows.
            </p>

            {/* Socials */}
            <div className="mt-7 flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-all duration-200 hover:border-primary hover:bg-primary/5 hover:text-primary"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Specialities */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              Specialities
            </h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              {SERVICES.slice(0, 5).map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  to="/services"
                  className="font-medium text-foreground transition-colors hover:text-primary"
                >
                  All specialities →
                </Link>
              </li>
            </ul>
          </div>

          {/* Mumbai */}
          <div className="lg:col-span-3">
            <StudioCard studio={MUMBAI_STUDIO} />
          </div>

          {/* Patna */}
          <div className="lg:col-span-3">
            <StudioCard studio={PATNA_STUDIO} />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-3 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} HappyLamb Production. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>Mumbai</span>
            <span className="text-border">·</span>
            <span>Patna</span>
            <span className="hidden text-border sm:inline">·</span>
            <span className="hidden sm:inline">Ad Films · Photography · Corporate</span>
          </div>
        </div>
      </div>
    </footer>
  );
}