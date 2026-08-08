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
    address: "Studio 04, Creative Quarter, Andheri West, Mumbai 400053",
    mapEmbed:
      "https://www.google.com/maps?q=Andheri+West+Mumbai&output=embed",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Andheri+West+Mumbai",
    phone: "+91 98765 43210",
    phoneRaw: "919876543210",
    email: "mumbai@happylambproduction.com",
    whatsapp: "919876543210",
  },
  {
    city: "Patna",
    address: "WorkSpace - Co-Working Space in Patna, 2nd Floor, Kanti Factory Rd, above Drug Point, near Bank of Baroda, New Colony, Mahatma Gandhi Nagar, Kankarbagh, Patna, Bihar 800020",
    mapEmbed:
      "https://www.google.com/maps?q=Boring+Road+Patna&output=embed",
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
  "mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20";

// ============== PREMIUM TOAST ==============
const showSuccessToast = (name: string, studio: string) => {
  toast.success(
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <span className="text-lg">🎉</span>
        <span className="font-semibold text-foreground">Thanks {name}!</span>
      </div>
      <p className="text-sm text-muted-foreground">
        We'll reply within one working day from our <span className="font-medium text-primary">{studio}</span> studio.
      </p>
      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground/60">
        <Sparkles className="h-3 w-3 text-primary" />
        <span>We'll reach out to you shortly</span>
      </div>
    </div>,
    {
      duration: 5000,
      position: "top-center",
      className: "!bg-background !border !border-primary/20 !shadow-2xl !shadow-primary/10 !rounded-2xl !p-4",
      icon: <CheckCircle className="h-5 w-5 text-primary" />,
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
    <section className="pt-28 pb-20 sm:pt-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        {/* Header */}
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Contact
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Let's talk about your next film
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            Share your brief. We'll come back with a clear plan and quote.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Form */}
          <Reveal>
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
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
                    className="w-full rounded-lg bg-primary py-3.5 text-sm font-semibold tracking-wide text-primary-foreground transition hover:opacity-90 disabled:opacity-60 sm:w-auto sm:px-10"
                  >
                    {isSubmitting ? "Sending..." : "Send Enquiry"}
                  </button>
                </div>
              </form>
            </div>
          </Reveal>

          {/* Sidebar — Studios with maps */}
          <Reveal delay={0.08} className="space-y-5">
            {STUDIOS.map((s) => (
              <div
                key={s.city}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                {/* Map */}
                <div className="relative h-36 w-full">
                  <iframe
                    title={`${s.city} Studio map`}
                    src={s.mapEmbed}
                    loading="lazy"
                    className="h-full w-full border-0"
                  />
                </div>

                {/* Details */}
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    {s.city} Studio
                  </p>

                  <div className="mt-3 space-y-2.5 text-sm text-muted-foreground">
                    <a
                      href={s.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-2.5 transition hover:text-primary"
                    >
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      <span className="leading-snug">{s.address}</span>
                    </a>

                    <a
                      href={`tel:${s.phoneRaw}`}
                      className="flex items-center gap-2.5 transition hover:text-primary"
                    >
                      <Phone className="h-3.5 w-3.5 shrink-0 text-primary" />
                      {s.phone}
                    </a>

                    <a
                      href={`mailto:${s.email}`}
                      className="flex items-center gap-2.5 break-all transition hover:text-primary"
                    >
                      <Mail className="h-3.5 w-3.5 shrink-0 text-primary" />
                      {s.email}
                    </a>

                    <div className="flex items-center gap-2.5">
                      <Clock className="h-3.5 w-3.5 shrink-0 text-primary" />
                      Mon–Sat · 10am – 7pm
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/${s.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] py-2.5 text-xs font-semibold text-white transition hover:opacity-90"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
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