import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Linkedin, Youtube } from "lucide-react";
import { useState } from "react";
import teamGroup from "@/assets/team.jpeg";
import m1 from "@/assets/Dilip Cofounder.jpeg";
import m2 from "@/assets/Executive Director.jpeg";
import m3 from "@/assets/Creative Director.jpeg";
import m4 from "@/assets/Director.jpeg";
import m5 from "@/assets/Head Editor.jpeg";
import m6 from "@/assets/Social Media.jpeg";
import m7 from "@/assets/Assistant.jpeg";
import intern1 from "@/assets/interns/Editor.jpeg";
import intern2 from "@/assets/interns/Climb.jpeg";
import intern3 from "@/assets/interns/Creative media associate.jpeg";
import { Reveal } from "@/components/site/Reveal";
import { TEAM, INTERNS } from "@/data/site";

const PHOTOS = [m1, m2, m3, m4, m5, m6, m7];
const INTERN_PHOTOS = [intern1, intern2, intern3];

export const Route = createFileRoute("/team")({
  component: Team,
  head: () => ({
    meta: [
      { title: "Our Team — Directors, DOPs & Producers | HappyLamb Production" },
      {
        name: "description",
        content:
          "The directors, cinematographers, producers, strategists and post artists behind HappyLamb Production's advertising and film work.",
      },
      { property: "og:title", content: "Meet the HappyLamb Production Team" },
      { property: "og:description", content: "The people who write, shoot, cut and deliver every campaign." },
      { property: "og:url", content: "/team" },
    ],
    links: [{ rel: "canonical", href: "/team" }],
  }),
});

function Team() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Check if member is Founder & CEO
  const isFounder = (role: string) => {
    return role === "Founder & CEO";
  };

  // Check if member is Creative Director - Patna Branch (HEAD)
  const isBranchHead = (role: string) => {
    return role === "Creative Director - Patna Branch (HEAD)";
  };

  return (
    <>
      {/* ═══════════════ 1. HERO (SYMMETRIC) ═══════════════ */}
      <section className="relative overflow-hidden min-h-[50vh] flex items-center pt-28 pb-12 bg-background border-b border-border/40">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10 w-full">
          <Reveal>
            {/* Tiny Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-primary/50"></div>
              <p className="text-xs tracking-[0.3em] text-foreground/60 uppercase font-medium">Our Team</p>
            </div>
            
            {/* Italic + Bold Heading */}
            <h1 className="text-[clamp(3rem,7.5vw,5.5rem)] leading-[0.95] tracking-tighter font-medium text-foreground max-w-4xl">
              The crew behind <br />
              <span className="italic text-muted-foreground/60">every frame.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ 2. TEAM GROUP PHOTO ═══════════════ */}
      <section className="py-12 bg-background">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <Reveal delay={0.1} className="overflow-hidden rounded-xl border border-border/40 shadow-sm">
            <img
              src={teamGroup}
              alt="The full HappyLamb Production crew in the studio"
              width={1920}
              height={912}
              className="w-full aspect-video object-cover grayscale-[10%]"
            />
          </Reveal>
          <p className="mt-4 text-center text-xs text-muted-foreground tracking-wider">
            Studio 04, Mumbai — the full crew, between two shoot days.
          </p>
        </div>
      </section>

      {/* ═══════════════ 3. TEAM GRID (Professional & Minimal) ═══════════════ */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member, i) => {
              const photo = PHOTOS[i % PHOTOS.length];
              const lead = member.rank === 1;
              const offset =
                i % 3 === 1 ? "lg:translate-y-14" : i % 3 === 2 ? "lg:translate-y-6" : "";
              const isFounderMember = isFounder(member.role);
              const isBranchHeadMember = isBranchHead(member.role);
              const showSocial = isFounderMember || isBranchHeadMember;
              
              return (
                <Reveal
                  key={member.name}
                  delay={(i % 3) * 0.08}
                  className={`${lead ? "sm:col-span-2 lg:col-span-2" : ""} ${offset}`}
                >
                  <article 
                    className={`group h-full ${lead ? "grid gap-8 sm:grid-cols-2 sm:items-center" : ""}`}
                    onMouseEnter={() => setHoveredId(member.name)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {/* Photo */}
                    <div className="relative aspect-3/4 overflow-hidden rounded-xl border border-border/40 bg-surface shadow-sm transition-all duration-300 group-hover:shadow-lg">
                      <img
                        src={photo}
                        alt={`${member.name}, ${member.role}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* Social Links - Only visible on hover */}
                      {showSocial && (
                        <div className="absolute inset-x-0 bottom-0 flex justify-end gap-2 bg-gradient-to-t from-ink/60 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                          {/* LinkedIn */}
                          <a 
                            href={member.linkedin || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on LinkedIn`} 
                            className="grid h-9 w-9 place-items-center rounded-full bg-background/90 text-foreground transition hover:bg-primary hover:text-primary-foreground"
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                          
                          {/* Instagram */}
                          <a 
                            href={member.instagram || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on Instagram`} 
                            className="grid h-9 w-9 place-items-center rounded-full bg-background/90 text-foreground transition hover:bg-primary hover:text-primary-foreground"
                          >
                            <Instagram className="h-4 w-4" />
                          </a>
                          
                          {/* YouTube - only for Branch Head */}
                          {isBranchHeadMember && (
                            <a 
                              href={member.youtube || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${member.name} on YouTube`} 
                              className="grid h-9 w-9 place-items-center rounded-full bg-background/90 text-foreground transition hover:bg-primary hover:text-primary-foreground"
                            >
                              <Youtube className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Text - Professional & Minimal */}
                    <div className={lead ? "max-w-xl sm:mt-0" : "mt-6"}>
                      {/* ✅ FULL NAME: Bold (font-medium), tracking-tight, Black */}
                      <h2 className={`font-medium tracking-tight text-foreground ${lead ? "text-4xl sm:text-5xl" : "text-3xl"}`}>
                        {member.name}
                      </h2>
                      
                      {/* ✅ ROLE: Dark Gray (text-muted-foreground/80) + Uppercase */}
                      <p className="mt-2 text-xs tracking-[0.2em] text-muted-foreground/80 uppercase font-medium">
                        {member.role}
                      </p>
                      
                      {/* ✅ BIO: Gray + Italic (Professional Magazine Style) */}
                      <p className={`mt-4 leading-relaxed italic text-muted-foreground/80 ${lead ? "text-base" : "text-sm"}`}>
                        {member.bio}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ 4. INTERNSHIP PROGRAM (Clean & Premium) ═══════════════ */}
      <section className="border-y border-border/30 bg-surface/50 py-24">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <Reveal className="mb-16 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-6 bg-border"></div>
              <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Internship Program</p>
              <div className="h-px w-6 bg-border"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
              Future talent <br />
              <span className="italic text-muted-foreground/60">in the making.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-base">
              Meet the bright minds learning the craft alongside our core team — 
              bringing fresh energy, new perspectives, and a hunger to create.
            </p>
          </Reveal>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {INTERNS.map((intern, i) => {
              const photo = INTERN_PHOTOS[i % INTERN_PHOTOS.length];
              return (
                <Reveal key={intern.name} delay={i * 0.08}>
                  <div 
                    className="group relative overflow-hidden rounded-xl border border-border/40 bg-background shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    onMouseEnter={() => setHoveredId(intern.name)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {/* Intern Photo */}
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={photo}
                        alt={`${intern.name}, ${intern.role}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[10%] group-hover:grayscale-0"
                      />
                      
                      {/* Badge */}
                      <div className="absolute left-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-[10px] font-medium text-white uppercase backdrop-blur-sm">
                        Intern
                      </div>

                      {/* Social Links - Only LinkedIn */}
                      <div className="absolute inset-x-0 bottom-0 flex justify-end gap-2 bg-gradient-to-t from-ink/70 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <a 
                          href={intern.linkedin || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${intern.name} on LinkedIn`} 
                          className="grid h-9 w-9 place-items-center rounded-full bg-background/90 text-foreground transition hover:bg-primary hover:text-primary-foreground"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </div>
                    </div>

                    {/* Intern Info - Professional & Minimal */}
                    <div className="p-6">
                      {/* ✅ FULL NAME: Bold (font-medium), tracking-tight, Black */}
                      <h3 className="font-medium text-2xl tracking-tight text-foreground">{intern.name}</h3>
                      
                      {/* ✅ ROLE: Dark Gray + Uppercase */}
                      <p className="mt-1 text-xs tracking-[0.15em] text-muted-foreground/80 uppercase">
                        {intern.role}
                      </p>
                      
                      {/* ✅ BIO: Gray + Italic */}
                      <p className="mt-3 text-sm leading-relaxed italic text-muted-foreground/80">
                        {intern.bio}
                      </p>
                      
                      {/* Intern-specific details */}
                      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border/30 pt-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-medium text-primary">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                          {intern.duration || "6 months"}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          Mentored by {intern.mentor || "Core Team"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* CTA - Apply for Internship */}
          <Reveal delay={0.2} className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 rounded-full border border-border/40 bg-background/50 px-6 py-3 backdrop-blur-sm">
              <span className="text-sm text-muted-foreground">
                🌱 Interested in interning with us?
              </span>
              <a 
                href="/careers"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:gap-3"
              >
                Apply now →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ 5. STUDIO CULTURE (Clean Split) ═══════════════ */}
      <section className="py-24 bg-background">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 sm:px-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-6 bg-border"></div>
              <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Culture</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight">How we work together.</h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-muted-foreground">
            <p className="text-lg leading-relaxed">
              Small teams, senior people, no layers between the client and the person actually making
              the work. Every project has one producer who owns it end to end.
            </p>
            <p className="leading-relaxed">
              We invest in craft and in tooling — our AI-assisted post pipeline exists so our editors
              spend their hours on taste, not on logging footage. Machines handle the repetition. The
              decisions stay human.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}