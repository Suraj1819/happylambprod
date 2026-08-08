import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Linkedin, Youtube } from "lucide-react";
import { useState } from "react";
import teamGroup from "@/assets/team-group.jpg";
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
      {/* ===== HERO ===== */}
      <section className="pt-36 pb-12">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow">Our team</p>
            <h1 className="display-xl mt-4 max-w-4xl text-[clamp(2.6rem,6.5vw,5rem)]">
              The crew behind every frame
            </h1>
          </Reveal>
          <Reveal delay={0.12} className="mt-12 overflow-hidden rounded-[2rem] border border-border shadow-lift">
            <img
              src={teamGroup}
              alt="The full HappyLamb Production crew in the studio"
              width={1920}
              height={912}
              className="w-full object-cover"
            />
          </Reveal>
          <p className="mt-4 text-sm text-muted-foreground">
            Studio 04, New Delhi — the full crew, between two shoot days.
          </p>
        </div>
      </section>

      {/* ===== TEAM GRID ===== */}
      <section className="py-16">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
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
                    <div className="relative aspect-3/4 overflow-hidden rounded-[2rem] border border-border bg-surface shadow-soft transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-lift">
                      <img
                        src={photo}
                        alt={`${member.name}, ${member.role}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* Social Links */}
                      {showSocial && (
                        <div className="absolute inset-x-0 bottom-0 flex justify-end gap-2 bg-gradient-to-t from-ink/60 to-transparent p-5 opacity-100 sm:opacity-0 transition-opacity duration-500 sm:group-hover:opacity-100">
                          {/* LinkedIn - for both Founder and Branch Head */}
                          <a 
                            href={member.linkedin || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on LinkedIn`} 
                            className="grid h-10 w-10 place-items-center rounded-full bg-background/90 text-foreground transition hover:bg-primary hover:text-primary-foreground"
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                          
                          {/* Instagram - for both Founder and Branch Head */}
                          <a 
                            href={member.instagram || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on Instagram`} 
                            className="grid h-10 w-10 place-items-center rounded-full bg-background/90 text-foreground transition hover:bg-primary hover:text-primary-foreground"
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
                              className="grid h-10 w-10 place-items-center rounded-full bg-background/90 text-foreground transition hover:bg-primary hover:text-primary-foreground"
                            >
                              <Youtube className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Text */}
                    <div className={lead ? "max-w-xl sm:mt-0" : "mt-6"}>
                      <h2 className={`display-xl text-foreground ${lead ? "text-4xl sm:text-5xl" : "text-2xl"}`}>
                        {member.name}
                      </h2>
                      <p className="mt-2 font-heading text-[0.78rem] tracking-[0.2em] text-primary uppercase">
                        {member.role}
                      </p>
                      <p className={`mt-4 leading-relaxed text-muted-foreground ${lead ? "text-base" : "text-sm"}`}>
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

      {/* ===== INTERNS SECTION ===== */}
      <section className="py-20 bg-gradient-to-b from-background to-surface/50">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal className="mb-16 text-center">
            <p className="eyebrow justify-center">Internship Program</p>
            <h2 className="display-xl mt-4 text-3xl sm:text-4xl">
              Future talent <span className="text-primary">in the making</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
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
                    className="group relative overflow-hidden rounded-[2rem] border border-border bg-background shadow-soft transition-all duration-500 hover:-translate-y-3 hover:shadow-lift"
                    onMouseEnter={() => setHoveredId(intern.name)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {/* Intern Photo */}
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={photo}
                        alt={`${intern.name}, ${intern.role}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* Badge */}
                      <div className="absolute left-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-[0.6rem] font-bold tracking-wider text-primary-foreground uppercase backdrop-blur-sm">
                        Intern
                      </div>

                      {/* Social Links - Only LinkedIn for interns */}
                      <div className="absolute inset-x-0 bottom-0 flex justify-end gap-2 bg-gradient-to-t from-ink/70 to-transparent p-5 opacity-100 sm:opacity-0 transition-opacity duration-500 sm:group-hover:opacity-100">
                        <a 
                          href={intern.linkedin || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${intern.name} on LinkedIn`} 
                          className="grid h-10 w-10 place-items-center rounded-full bg-background/90 text-foreground transition hover:bg-primary hover:text-primary-foreground"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </div>
                    </div>

                    {/* Intern Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground">
                        {intern.name}
                      </h3>
                      <p className="mt-1 font-heading text-[0.7rem] tracking-[0.15em] text-primary uppercase">
                        {intern.role}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {intern.bio}
                      </p>
                      
                      {/* Intern-specific details */}
                      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border/60 pt-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[0.65rem] font-medium text-primary">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                          {intern.duration || "6 months"}
                        </span>
                        <span className="text-[0.65rem] text-muted-foreground">
                          Mentored by {intern.mentor || "Core Team"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Call to Action */}
          <Reveal delay={0.2} className="mt-16 text-center">
            <div className="inline-flex items-center gap-6 rounded-full border border-border bg-surface/80 px-8 py-4 backdrop-blur-sm">
              <span className="text-sm text-muted-foreground">
                🌱 Interested in interning with us?
              </span>
              <a 
                href="/careers"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:gap-3"
              >
                Apply now
                <span className="text-lg">→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== STUDIO CULTURE ===== */}
      <section className="bg-surface py-20">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="eyebrow">Studio culture</p>
            <h2 className="display-xl mt-4 text-3xl sm:text-4xl">How we work together</h2>
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