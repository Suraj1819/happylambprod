import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Clock, Mail, MapPin, MessageCircle, Phone, CheckCircle, Sparkles } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SERVICES } from "@/data/site";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact HappyLamb Production — Get a Shoot Quote" },
      {
        name: "description",
        content:
          "Get a quote for ad films, product photography, corporate films or line production. Mumbai & Patna studios.",
      },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

const STUDIOS = [
  {
    city: "Mumbai",
    address: "Happy Lamb Production OPC PVT.LTD, 505, 5th Floor, Bhoomi Building, Sanjay Nagar Co.Op. Society, Cama Estate, Behind Future Studio, Goregoan (E.), Mumbai - 400063",
    mapEmbed:
      "https://www.google.com/maps?q=Goregoan+East+Mumbai&output=embed",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Happy+Lamb+Production+Goregoan+East+Mumbai",
    phone: "+91 9820778491",
    phoneRaw: "919820778491",
    email: "info@happylamb.in",
    whatsapp: "919820778491",
  },
  {
    city: "Patna",
    address: "WorkSpace - Co-Working Space in Patna, 2nd Floor, Kanti Factory Rd, above Drug Point, near Bank of Baroda, New Colony, Mahatma Gandhi Nagar, Kankarbagh, Patna, Bihar 800020",
    mapEmbed:
      "https://www.google.com/maps?q=Kankarbagh+Patna&output=embed",
    mapsUrl: "https://maps.app.goo.gl/p3Aux8ziTfCXWDMV8",
    phone: "+91 6207462473",
    phoneRaw: "916207462473",
    email: "ankit@happylamb.co.in",
    whatsapp: "916207462473",
  },
];

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  phone: z.string().min(8, "Enter a valid phone"),
  email: z.string().email("Enter a valid email"),
  company: z.string().min(2, "Enter your company"),
  service: z.string().min(1, "Select a service"),
  budget: z.string().min(1, "Select a budget"),
  studio: z.string().min(1, "Select a studio"),
  message: z.string().min(10, "Tell us more about the brief"),
});

type FormValues = z.infer<typeof schema>;

const BUDGETS = ["Under ₹1 Lakh", "₹1–5 Lakh", "₹5–15 Lakh", "₹15 Lakh+", "Not sure yet"];

const field =
  "mt-1.5 w-full rounded-lg border border-border/40 bg-background px-4 py-3 text-sm outline-none transition focus:border-foreground/30 focus:ring-1 focus:ring-foreground/10";

// ============== PREMIUM TOAST ==============
const showSuccessToast = (name: string, studio: string) => {
  toast.success(
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <span className="text-lg">🎉</span>
        <span className="font-semibold text-foreground">Thanks {name}!</span>
      </div>
      <p className="text-sm text-muted-foreground">
        We'll reply within one working day from our <span className="font-medium text-foreground">{studio}</span> studio.
      </p>
      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground/60">
        <Sparkles className="h-3 w-3 text-muted-foreground/60" />
        <span>We'll reach out to you shortly</span>
      </div>
    </div>,
    {
      duration: 5000,
      position: "top-center",
      className: "!bg-background !border !border-border/40 !shadow-2xl !shadow-border/10 !rounded-2xl !p-4",
      icon: <CheckCircle className="h-5 w-5 text-muted-foreground/60" />,
    }
  );
};

function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = (values: FormValues) => {
    const firstName = values.name.split(" ")[0];
    const studioName = values.studio;
    showSuccessToast(firstName, studioName);
    reset();
  };

  return (
    <section className="pt-28 pb-20 sm:pt-32 bg-background">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        
        {/* ═══════════════ 1. HEADER (SYMMETRIC - BOLD + ITALIC) ═══════════════ */}
        <Reveal className="max-w-3xl mb-12">
          {/* Tiny Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-border/50"></div>
            <p className="text-xs tracking-[0.3em] text-muted-foreground/80 uppercase font-medium">Contact</p>
          </div>
          
          <h1 className="text-[clamp(2.5rem,6.5vw,4.5rem)] leading-[0.95] tracking-tighter font-medium text-foreground">
            Let's talk <br />
            <span className="italic text-muted-foreground/60">about your next film.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
            Share your brief. We'll come back with a clear plan and quote. Crafted with precision.
          </p>
        </Reveal>

        {/* ═══════════════ 2. FORM & STUDIOS (Clean Split) ═══════════════ */}
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          
          {/* Left: Form (Clean & Minimal) */}
          <Reveal>
            <div className="rounded-2xl border border-border/40 bg-surface/30 p-6 sm:p-8 shadow-sm">
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Name
                  </label>
                  <input {...register("name")} className={field} placeholder="Full name" />
                  {errors.name && (
                    <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Phone
                  </label>
                  <input {...register("phone")} className={field} placeholder="+91" />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Email
                  </label>
                  <input {...register("email")} className={field} placeholder="you@company.com" />
                  {errors.email && (
                    <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Company
                  </label>
                  <input {...register("company")} className={field} placeholder="Brand name" />
                  {errors.company && (
                    <p className="mt-1 text-xs text-destructive">{errors.company.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Service
                  </label>
                  <select {...register("service")} className={field} defaultValue="">
                    <option value="" disabled>
                      Select service
                    </option>
                    {SERVICES.map((s) => (
                      <option key={s.slug} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="mt-1 text-xs text-destructive">{errors.service.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Studio
                  </label>
                  <select {...register("studio")} className={field} defaultValue="">
                    <option value="" disabled>
                      Preferred studio
                    </option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Patna">Patna</option>
                    <option value="Either">Either / Remote</option>
                  </select>
                  {errors.studio && (
                    <p className="mt-1 text-xs text-destructive">{errors.studio.message}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Budget
                  </label>
                  <select {...register("budget")} className={field} defaultValue="">
                    <option value="" disabled>
                      Select budget
                    </option>
                    {BUDGETS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                  {errors.budget && (
                    <p className="mt-1 text-xs text-destructive">{errors.budget.message}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    className={field}
                    placeholder="Project details, timeline, references..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-ink py-3.5 text-sm font-medium tracking-wide text-ink-foreground transition hover:bg-primary hover:text-ink disabled:opacity-60 sm:w-auto sm:px-10"
                  >
                    {isSubmitting ? "Sending..." : "Send Enquiry"}
                  </button>
                </div>
              </form>
            </div>
          </Reveal>

          {/* Right: Studios (Clean Cards) */}
          <Reveal delay={0.08} className="space-y-6">
            {STUDIOS.map((s) => (
              <div
                key={s.city}
                className="overflow-hidden rounded-2xl border border-border/40 bg-surface/30 shadow-sm"
              >
                {/* Map */}
                <div className="relative h-32 w-full">
                  <iframe
                    title={`${s.city} Studio map`}
                    src={s.mapEmbed}
                    loading="lazy"
                    className="h-full w-full border-0 grayscale-[20%]"
                  />
                </div>

                {/* Details */}
                <div className="p-6">
                  {/* ✅ FIX: Mumbai Bold + Studio Italic (Gray) */}
                  <p className="text-xs tracking-[0.2em] uppercase font-medium">
                    <span className="text-foreground">{s.city}</span>{' '}
                    <span className="italic text-muted-foreground/60">Studio</span>
                  </p>

                  <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                    <a
                      href={s.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-3 transition hover:text-foreground"
                    >
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/60" />
                      <span className="leading-snug">{s.address}</span>
                    </a>

                    <a
                      href={`tel:${s.phoneRaw}`}
                      className="flex items-center gap-3 transition hover:text-foreground"
                    >
                      <Phone className="h-4 w-4 shrink-0 text-muted-foreground/60" />
                      {s.phone}
                    </a>

                    <a
                      href={`mailto:${s.email}`}
                      className="flex items-center gap-3 break-all transition hover:text-foreground"
                    >
                      <Mail className="h-4 w-4 shrink-0 text-muted-foreground/60" />
                      {s.email}
                    </a>

                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 shrink-0 text-muted-foreground/60" />
                      Mon–Sat · 10am – 7pm
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/${s.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] py-2.5 text-xs font-medium text-white transition hover:opacity-90"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp {s.city}
                  </a>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}