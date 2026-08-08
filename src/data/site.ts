// data/site.ts

import productImg from "@/assets/work-product.jpg";
import furnitureImg from "@/assets/work-furniture.jpg";
import corporateImg from "@/assets/work-corporate.jpg";
import brandImg from "@/assets/work-brand.jpg";
import catalogueImg from "@/assets/work-catalogue.jpg";

export const COMPANY = {
  name: "HappyLamb Production",
  tagline: "Premium Advertising • Production • Photography • Branding",
  phone: "+91 6207462473",
  whatsapp: "916207462473",
  email: "hello@happylambproduction.com",
  address: "Studio 04, Creative Quarter, New Delhi, India",
  
  youtube: "https://youtube.com/@happylambproduction",
  facebook: "https://facebook.com/happylambproduction",
  twitter: "https://twitter.com/happylambprod",
  instagram: "https://instagram.com/happylambproduction",
  website: "https://happylambproduction.com",
};

// ============================================
// VIDEO URLs - Supports all formats
// ============================================

export const VIDEOS = {
  // Commercial Reels
  commercialReel: "https://www.youtube.com/embed/bP8ATWCvqzw",
  commercialReel2: "https://www.youtube.com/embed/C_ntYvAagQY",
  commercialReel3: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  
  // Corporate Videos
  corporateFilm1: "https://www.youtube.com/embed/jNQXAC9IVRw",
  corporateFilm2: "https://www.youtube.com/embed/9bZkp7q19f0",
  
  // Brand Campaigns
  brandCampaign1: "https://www.youtube.com/embed/XqZsoesa55w",
  brandCampaign2: "https://www.youtube.com/embed/fJ9rUzIMcZQ",
  
  // Product Videos
  productReel: "https://www.youtube.com/embed/YE7VzlLtp-4",
  catalogueReel: "https://www.youtube.com/embed/TgOu00Mf3kI",
  
  // AV Production
  avShowreel: "https://www.youtube.com/embed/L_jWHffIx5E",
  
  // Social Media
  socialReel: "https://www.youtube.com/embed/kJQP7kiw5Fk",
};

export const MP4_VIDEOS = {
  sample1: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  sample2: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  sample3: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
};

export type Service = {
  slug: string;
  title: string;
  short: string;
  hero: string;
  overview: string;
  benefits: string[];
  detailedBenefits?: string[];
  process: { step: string; detail: string }[];
  gallery: string[];
  faqs: { q: string; a: string }[];
  image: string;
  video?: string;
  videos?: { src: string; title: string; poster?: string }[];
};

const proc = (a: string, b: string, c: string, d: string) => [
  { step: "Discovery & Brief", detail: a },
  { step: "Pre-Production", detail: b },
  { step: "Production Day", detail: c },
  { step: "Post & Delivery", detail: d },
];

export const SERVICES: Service[] = [
  {
    slug: "commercial-ad-film-production",
    title: "Commercial Ad Film Production",
    short: "Story-first TV and digital commercials engineered for recall.",
    hero: "Ad films that make the nation remember your brand.",
    overview:
      "We write, direct and deliver commercial ad films for television, OTT and digital-first campaigns. From a single insight to a broadcast-ready master, every frame is built around one job: making your brand impossible to ignore.",
    benefits: [
      "Concept, script and storyboard in-house",
      "Broadcast, OTT and vertical-first masters",
      "AI-assisted script variants and edit selects for faster approvals",
      "Pan-India crew, cast and location capability",
    ],
    detailedBenefits: [
      "Concept, script and storyboard in-house",
      "AI-assisted script variants and edit selects for faster approvals",
      "Broadcast, OTT and vertical-first masters",
      "Pan-India crew, cast and location capability",
    ],
    process: proc(
      "We decode your brand, category and audience to lock the single big idea.",
      "Casting, locations, permissions, storyboards and shot lists are approved before day one.",
      "A tight director-led unit shoots on cinema-grade RED and ARRI systems.",
      "Edit, grade, sound design, VO and multi-format masters delivered on schedule.",
    ),
    gallery: [brandImg, corporateImg, productImg],
    faqs: [
      { q: "How long does an ad film take?", a: "A focused digital commercial runs 2–3 weeks end to end. Full TVC campaigns typically take 4–6 weeks." },
      { q: "Do you handle casting and permissions?", a: "Yes. Casting, locations, government shooting permissions and line production are all handled in-house." },
      { q: "What's your pricing model?", a: "We offer custom quotes based on project scope, crew requirements, and post-production needs." },
    ],
    image: brandImg,
    video: VIDEOS.commercialReel,
    videos: [
      { src: VIDEOS.commercialReel, title: "Commercial Showreel 2024", poster: brandImg },
      { src: VIDEOS.commercialReel2, title: "Brand Campaign Compilation", poster: corporateImg },
      { src: MP4_VIDEOS.sample1, title: "Sample Commercial", poster: productImg },
    ],
  },
  {
    slug: "corporate-video-production",
    title: "Corporate Video Production",
    short: "Films that make companies look as serious as they are.",
    overview:
      "Brand films, founder stories, plant walkthroughs, CSR documentaries, investor and induction films — produced with editorial restraint and cinematic craft.",
    hero: "Corporate films with the polish of cinema.",
    benefits: [
      "Interview direction that gets usable soundbites",
      "Multi-cam, gimbal, drone and plant-safe coverage",
      "AI transcript-based paper edits for rapid client review",
      "Subtitled and multilingual versions",
    ],
    detailedBenefits: [
      "Interview direction that gets usable soundbites",
      "Multi-cam, gimbal, drone and plant-safe coverage",
      "AI transcript-based paper edits for rapid client review",
      "Subtitled and multilingual versions",
    ],
    process: proc(
      "Stakeholder interviews to find the real story worth telling.",
      "Shot list, schedule and site recce with your operations team.",
      "Discreet, efficient units that respect live workplaces.",
      "Edit, motion graphics, music and delivery in every format you need.",
    ),
    gallery: [corporateImg, brandImg, catalogueImg],
    faqs: [
      { q: "Can you shoot inside factories?", a: "Yes — we run safety-compliant, low-footprint units used to live industrial sites." },
      { q: "How long is a typical corporate film?", a: "Most corporate films run 2-5 minutes, but we deliver in any length you need." },
    ],
    image: corporateImg,
    video: VIDEOS.corporateFilm1,
    videos: [
      { src: VIDEOS.corporateFilm1, title: "Corporate Brand Film", poster: corporateImg },
      { src: MP4_VIDEOS.sample2, title: "Corporate Showreel", poster: brandImg },
    ],
  },
  {
    slug: "product-photography",
    title: "Product Photography",
    short: "Studio-grade stills that sell on every screen.",
    overview:
      "E-commerce, packshot, hero and lifestyle product photography lit to make texture, finish and detail feel premium — optimised for marketplaces, ads and print.",
    hero: "Every product deserves its best light.",
    benefits: [
      "Marketplace-compliant white background sets",
      "Hero, macro, splash and set-styled lifestyle frames",
      "AI-assisted retouching for faster bulk turnarounds",
      "Per-SKU pricing that scales with volume",
    ],
    detailedBenefits: [
      "Marketplace-compliant white background sets",
      "Hero, macro, splash and set-styled lifestyle frames",
      "AI-assisted retouching for faster bulk turnarounds",
      "Per-SKU pricing that scales with volume",
    ],
    process: proc(
      "SKU list, references and usage formats are locked upfront.",
      "Set design, props, styling and lighting tests approved on a sample.",
      "High-volume tethered shooting with live client approval.",
      "Retouch, colour match and export in every required ratio.",
    ),
    gallery: [productImg, catalogueImg, furnitureImg],
    faqs: [
      { q: "What is your per-SKU turnaround?", a: "Typical volume shoots deliver 60–120 finished SKUs per shoot day." },
      { q: "Do you provide retouching?", a: "Yes, all images come with professional retouching included." },
    ],
    image: productImg,
  },
  {
    slug: "catalogue-shoot",
    title: "Catalogue Shoot",
    short: "High-volume catalogue production without losing craft.",
    overview:
      "Season catalogues, price lists and dealer books shot, styled and delivered as press-ready layouts with consistent light across thousands of frames.",
    hero: "Catalogues that look designed, not documented.",
    benefits: [
      "Consistent lighting across the full range",
      "Model, flat-lay and mannequin options",
      "Print-ready CMYK and digital exports",
      "Layout and brochure design available",
    ],
    detailedBenefits: [
      "Consistent lighting across the full range",
      "Model, flat-lay and mannequin options",
      "Print-ready CMYK and digital exports",
      "Layout and brochure design available",
    ],
    process: proc(
      "Range plan, look book and shot count agreed with your merchandising team.",
      "Sample intake, steaming, styling and sequence planning.",
      "Assembly-line studio flow with QC at every station.",
      "Batch retouch, naming conventions and layout handoff.",
    ),
    gallery: [catalogueImg, productImg, brandImg],
    faqs: [
      { q: "Do you also design the catalogue?", a: "Yes — brochure and catalogue design is an in-house specialism." },
      { q: "How many pages can you handle?", a: "We've handled catalogues from 8 pages to 200+ pages." },
    ],
    image: catalogueImg,
  },
  {
    slug: "furniture-photography",
    title: "Furniture Photography",
    short: "Scale, material and craft, captured honestly.",
    overview:
      "Studio and in-situ furniture photography with set builds that place your pieces in aspirational, believable interiors.",
    hero: "Furniture shot the way architects photograph rooms.",
    benefits: [
      "Set-built room vignettes and cyclorama sets",
      "Detail frames for joinery, fabric and finish",
      "Tilt-shift correction for true verticals",
      "360° spins and AR-ready assets",
    ],
    detailedBenefits: [
      "Set-built room vignettes and cyclorama sets",
      "Detail frames for joinery, fabric and finish",
      "Tilt-shift correction for true verticals",
      "360° spins and AR-ready assets",
    ],
    process: proc(
      "Piece list, materials and target interiors defined.",
      "Set design, props and lighting plan approved.",
      "Careful handling units with on-set stylists.",
      "Colour-accurate retouch matched to your fabric swatches.",
    ),
    gallery: [furnitureImg, catalogueImg, productImg],
    faqs: [
      { q: "Can you shoot at our showroom?", a: "Yes, we run full location units with portable studio lighting." },
      { q: "Do you handle styling?", a: "Yes, we have professional stylists on our team." },
    ],
    image: furnitureImg,
  },
  {
    slug: "brand-photography",
    title: "Brand Photography",
    short: "A visual language your whole team can use.",
    overview:
      "Campaign, editorial, founder and culture photography that gives your brand one consistent, ownable look across every channel.",
    hero: "One look. Every touchpoint.",
    benefits: [
      "Art-directed campaign shoots",
      "Reusable image libraries and usage guidelines",
      "Talent casting and wardrobe styling",
      "Content bundles built for paid performance",
    ],
    detailedBenefits: [
      "Art-directed campaign shoots",
      "Reusable image libraries and usage guidelines",
      "Talent casting and wardrobe styling",
      "Content bundles built for paid performance",
    ],
    process: proc(
      "Brand audit and mood direction.",
      "Casting, wardrobe, location and art direction sign-off.",
      "Campaign shoot with stills and motion captured together.",
      "Curated library plus a visual guideline document.",
    ),
    gallery: [brandImg, corporateImg, productImg],
    faqs: [
      { q: "Do you shoot stills and video together?", a: "Yes — combined stills and motion days are our most requested format." },
      { q: "How many images do you deliver?", a: "Typically 50-100+ final images per shoot day." },
    ],
    image: brandImg,
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    short: "Always-on content engineered for the algorithm.",
    overview:
      "Monthly content systems: strategy, shoot days, reels, statics, copy, community and reporting — run by people who actually produce the content they plan.",
    hero: "Content calendars that behave like campaigns.",
    benefits: [
      "One shoot day, a full month of assets",
      "AI-assisted hook, caption and hashtag testing",
      "Reels-first vertical production",
      "Transparent monthly performance reporting",
    ],
    detailedBenefits: [
      "One shoot day, a full month of assets",
      "AI-assisted hook, caption and hashtag testing",
      "Reels-first vertical production",
      "Transparent monthly performance reporting",
    ],
    process: proc(
      "Audit, competitor mapping and content pillars.",
      "Monthly calendar and shot list approval.",
      "Bulk shoot day covering the entire month.",
      "Publishing, community management and reporting.",
    ),
    gallery: [brandImg, productImg, catalogueImg],
    faqs: [
      { q: "Is there a minimum engagement?", a: "Retainers start at three months so results have room to compound." },
      { q: "Do you create copy too?", a: "Yes, we provide full copywriting and caption support." },
    ],
    image: brandImg,
    video: VIDEOS.socialReel,
    videos: [
      { src: VIDEOS.socialReel, title: "Social Media Campaign Reel", poster: brandImg },
    ],
  },
  {
    slug: "digital-advertising",
    title: "Digital Advertising",
    short: "Performance creative plus the media to match.",
    overview:
      "Meta, Google, YouTube and programmatic campaigns where the creative and the media plan are built by the same team — so learnings feed straight back into production.",
    hero: "Creative that performs, media that compounds.",
    benefits: [
      "Creative testing frameworks with 10+ variants",
      "AI-driven audience and budget optimisation",
      "Landing page and funnel support",
      "ROAS-led weekly reporting",
    ],
    detailedBenefits: [
      "Creative testing frameworks with 10+ variants",
      "AI-driven audience and budget optimisation",
      "Landing page and funnel support",
      "ROAS-led weekly reporting",
    ],
    process: proc(
      "Funnel, offer and measurement audit.",
      "Creative matrix and media plan build.",
      "Launch, test and scale the winners.",
      "Iterate creative from live performance data.",
    ),
    gallery: [productImg, brandImg, corporateImg],
    faqs: [
      { q: "Do you manage ad spend?", a: "Yes — we can run media directly or work alongside your existing agency." },
      { q: "What platforms do you handle?", a: "Meta, Google, YouTube, and programmatic display." },
    ],
    image: productImg,
  },
  {
    slug: "av-production",
    title: "AV Production",
    short: "Audio-visual storytelling for stage and screen.",
    overview:
      "Event AVs, launch films, conference openers, product reveals and digital AV shoots produced with sound design and motion built in from the first frame.",
    hero: "Big rooms. Bigger reveals.",
    benefits: [
      "Launch films and stage-ready AV formats",
      "3D, motion graphics and VFX",
      "Original music and sound design",
      "On-site playback and technical supervision",
    ],
    detailedBenefits: [
      "Launch films and stage-ready AV formats",
      "3D, motion graphics and VFX",
      "Original music and sound design",
      "On-site playback and technical supervision",
    ],
    process: proc(
      "Event objective, run-of-show and AV role defined.",
      "Script, storyboard, style frames and music direction.",
      "Shoot, animation and 3D build.",
      "Screen-spec masters plus on-site support.",
    ),
    gallery: [corporateImg, brandImg, furnitureImg],
    faqs: [
      { q: "Can you deliver for LED walls?", a: "Yes — we deliver custom-ratio masters mapped to your screen spec." },
      { q: "Do you provide on-site support?", a: "Yes, we provide technical supervision and playback support." },
    ],
    image: corporateImg,
    video: VIDEOS.avShowreel,
    videos: [
      { src: VIDEOS.avShowreel, title: "AV Production Showreel", poster: corporateImg },
    ],
  },
  {
    slug: "line-production",
    title: "Line Production",
    short: "Your India unit, fully handled.",
    overview:
      "Full-service line production for domestic and international clients: budgets, crew, kit, cast, locations, logistics and all government shooting permissions, 360° across India.",
    hero: "Land in India. We handle the rest.",
    benefits: [
      "All government shooting permissions",
      "Vetted crew and equipment across India",
      "Transparent, auditable budgeting",
      "Fixers, logistics, travel and compliance",
    ],
    detailedBenefits: [
      "All government shooting permissions",
      "Vetted crew and equipment across India",
      "Transparent, auditable budgeting",
      "Fixers, logistics, travel and compliance",
    ],
    process: proc(
      "Script breakdown and budget estimate.",
      "Recce, permissions, crew and vendor lock.",
      "On-ground production management and cost control.",
      "Wrap, reconciliation and rushes handover.",
    ),
    gallery: [corporateImg, furnitureImg, brandImg],
    faqs: [
      { q: "How early should we brief you?", a: "Three to four weeks gives permissions and locations comfortable room." },
      { q: "Do you handle international crews?", a: "Yes, we've handled production for clients from UK, Germany, and USA." },
    ],
    image: furnitureImg,
  },
];

export const CATEGORIES = ["All", "Film", "Photography", "Campaign"] as const;

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: "Film" | "Photography" | "Campaign";
  service: string;
  year: string;
  image: string;
  video?: string;
  videos?: { src: string; title: string; poster?: string }[];
  objective: string;
  challenge: string;
  approach: string;
  results: { label: string; value: string }[];
  feedback: { quote: string; author: string };
  gallery: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "aurea-fragrance-launch",
    title: "Aurea — Fragrance Launch Film",
    client: "Aurea Beauty",
    category: "Film",
    service: "Commercial Ad Film Production",
    year: "2026",
    image: productImg,
    video: VIDEOS.commercialReel,
    videos: [
      { src: VIDEOS.commercialReel, title: "Main Commercial", poster: productImg },
      { src: VIDEOS.commercialReel2, title: "BTS - Making Of", poster: brandImg },
      { src: MP4_VIDEOS.sample1, title: "Behind The Scenes", poster: corporateImg },
    ],
    objective: "Launch a premium fragrance line to a young, digital-first audience without diluting its luxury positioning.",
    challenge: "A tight 12-day window from brief to first media flight, with three language versions required at launch.",
    approach: "A single-set macro film shot at high frame rate, cut into one hero film and eleven vertical variants for paid testing.",
    results: [
      { label: "Views in week one", value: "4.2M" },
      { label: "Lift in add-to-cart", value: "+38%" },
      { label: "Cost per view", value: "-27%" },
    ],
    feedback: { quote: "They turned a packshot brief into a brand moment. The film still carries our entire campaign.", author: "Head of Marketing, Aurea Beauty" },
    gallery: [productImg, brandImg, catalogueImg],
  },
  {
    slug: "novo-living-catalogue",
    title: "Novo Living — Season Catalogue",
    client: "Novo Living",
    category: "Photography",
    service: "Furniture Photography",
    year: "2025",
    image: furnitureImg,
    objective: "Photograph 240 furniture SKUs with a single consistent visual language for print and web.",
    challenge: "Four material families with wildly different reflectance had to feel like one collection.",
    approach: "Built three modular room sets and locked one lighting recipe per family, with tethered live approval.",
    results: [
      { label: "SKUs delivered", value: "240" },
      { label: "Shoot days", value: "6" },
      { label: "Return rate drop", value: "-19%" },
    ],
    feedback: { quote: "The most organised shoot we have ever run. Every frame looked like the same brand.", author: "Category Head, Novo Living" },
    gallery: [furnitureImg, catalogueImg, productImg],
  },
  {
    slug: "meridian-brand-film",
    title: "Meridian Group — Corporate Brand Film",
    client: "Meridian Group",
    category: "Film",
    service: "Corporate Video Production",
    year: "2025",
    image: corporateImg,
    video: VIDEOS.corporateFilm1,
    videos: [
      { src: VIDEOS.corporateFilm1, title: "Corporate Brand Film", poster: corporateImg },
      { src: MP4_VIDEOS.sample2, title: "Behind The Scenes", poster: brandImg },
    ],
    objective: "Tell a 40-year manufacturing story to investors without sounding like an annual report.",
    challenge: "Nine plants across five states, shot inside live production lines.",
    approach: "Documentary-led interviews cut against precision plant photography and an original score.",
    results: [
      { label: "Plants covered", value: "9" },
      { label: "Investor deck usage", value: "100%" },
      { label: "Completion rate", value: "72%" },
    ],
    feedback: { quote: "Our chairman watched it twice without a single note. That has never happened.", author: "VP Communications, Meridian Group" },
    gallery: [corporateImg, brandImg, furnitureImg],
  },
  {
    slug: "lumen-always-on",
    title: "Lumen — Always-On Social Engine",
    client: "Lumen Wellness",
    category: "Campaign",
    service: "Social Media Marketing",
    year: "2026",
    image: brandImg,
    objective: "Build a repeatable content engine that could feed paid and organic from one shoot day a month.",
    challenge: "A small internal team with no in-house production capability.",
    approach: "Monthly bulk shoot days, AI-assisted hook testing, and a creative matrix rebuilt from live performance data.",
    results: [
      { label: "Monthly assets", value: "60+" },
      { label: "Follower growth", value: "+214%" },
      { label: "Blended ROAS", value: "4.1x" },
    ],
    feedback: { quote: "One shoot day now covers a whole month of marketing. It changed how we plan.", author: "Founder, Lumen Wellness" },
    gallery: [brandImg, productImg, corporateImg],
  },
  {
    slug: "atlas-line-production",
    title: "Atlas Motors — India Line Production",
    client: "Atlas Motors (Germany)",
    category: "Campaign",
    service: "Line Production",
    year: "2025",
    image: corporateImg,
    objective: "Deliver a European crew a shoot-ready India unit across three cities in eleven days.",
    challenge: "Highway closures, monsoon contingency and multi-state permissions.",
    approach: "Parallel permission tracks, two recce teams and a fully costed contingency schedule.",
    results: [
      { label: "Cities", value: "3" },
      { label: "Permissions cleared", value: "17" },
      { label: "Budget variance", value: "0%" },
    ],
    feedback: { quote: "Nothing surprised us on the ground. That is the highest compliment for a line producer.", author: "Executive Producer, Atlas Motors" },
    gallery: [corporateImg, furnitureImg, brandImg],
  },
  {
    slug: "kaya-brand-campaign",
    title: "Kaya — Spring Brand Campaign",
    client: "Kaya Apparel",
    category: "Photography",
    service: "Brand Photography",
    year: "2026",
    image: brandImg,
    objective: "Reset a heritage label's visual identity for a younger buyer.",
    challenge: "One shoot had to serve retail, e-commerce, OOH and social.",
    approach: "A combined stills and motion day on cyclorama, with a documented visual guideline delivered alongside the library.",
    results: [
      { label: "Assets delivered", value: "420" },
      { label: "Channels served", value: "6" },
      { label: "Store footfall", value: "+23%" },
    ],
    feedback: { quote: "They gave us a look we can actually keep using. That is rare.", author: "Brand Director, Kaya Apparel" },
    gallery: [brandImg, catalogueImg, productImg],
  },
];

export const BRANDS = [
  "Aurea", "Meridian", "Novo", "Lumen", "Kaya", "Atlas", "Vireo", "Orbit",
  "Nordis", "Saffron", "Tessa", "Halcyon", "Verve", "Kite", "Solace", "Mantle",
];

export const TESTIMONIALS = [
  { quote: "They think like a brand team and execute like a film unit. That combination is very hard to find in India.", author: "Ritika Malhotra", role: "CMO, Aurea Beauty" },
  { quote: "Every deadline held. Every frame was on brand. We have moved all our production to them.", author: "Sandeep Rao", role: "VP Communications, Meridian Group" },
  { quote: "Our catalogue conversion rate jumped the month the new photography went live.", author: "Aisha Kapoor", role: "Category Head, Novo Living" },
  { quote: "As an international producer, I judge line production by how few calls I have to make. I made none.", author: "Lukas Berger", role: "Executive Producer, Atlas Motors" },
];

export const INDUSTRIES = [
  "FMCG", "Fashion & Apparel", "Furniture & Interiors", "Beauty & Personal Care",
  "Real Estate", "Automotive", "Healthcare", "Manufacturing", "Hospitality",
  "Education", "Jewellery", "Technology",
];

// ============================================
// TEAM - Fixed and Error-Free
// ============================================

export type Member = {
  name: string;
  role: string;
  rank: 1 | 2 | 3; // 1 = Lead, 2 = Senior, 3 = Team Member
  bio: string;
  prompt: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
};

export const TEAM: Member[] = [
  {
    name: "Dilip Gupta",
    role: "Founder & CEO",
    rank: 1,
    bio: "Dilip Gupta is a respected name in the Indian production industry, known for delivering high-impact corporate films, commercial campaigns, and brand-focused visual storytelling. As the Founder of Happy Lamb Production, he has dedicated his career to building a creative platform where brands can transform ideas into compelling visual experiences. Beginning his journey at the age of 18, Dilip gained extensive industry experience by working with renowned production houses including VISCOMM 360 Communications Pvt. Ltd., MAD Digital Film Production, Mac Guffin Picture, and Reliance Big Production. Through years of commitment, leadership, and hands-on production expertise, he has established himself as one of India's most sought-after line producers. A self-made professional, Dilip continues to lead projects with a passion for innovation, quality, and cinematic excellence.",
    prompt: "portrait of Indian creative director",
    linkedin: "https://linkedin.com/in/dilipgupta",
    instagram: "https://instagram.com/dilipgupta",
  },
  {
    name: "Kapil Rawat",
    role: "Business Head",
    rank: 1,
    bio: "Kapil runs the business side of the studio with the discipline of a producer and the instincts of a strategist. He has overseen campaigns for more than fifty national brands and is the reason our budgets, timelines and promises hold.",
    prompt: "portrait of Indian businessman",
    linkedin: "https://linkedin.com/in/kapilrawat",
    instagram: "https://instagram.com/kapilrawat",
  },
  {
    name: "Ankit Kumar",
    role: "Creative Director - Patna Branch (HEAD)",
    rank: 1,
    bio: "Ankit Kumar is an Electronics & Communication Engineering student at Government Engineering College, Vaishali (BEU), Director of Navrang Drama Club, and Founder of Ankith Studios. With a strong passion for creativity, theatre, and filmmaking, he works across creative direction, story writing, acting, singing, and visual storytelling. As a Creative Director & Patna Branch Head, he brings together creative vision, leadership, communication, team management, volunteer coordination, and project execution to build collaborative teams and transform ideas into meaningful creative work.",
    prompt: "portrait of Indian cinematographer",
    linkedin: "https://www.linkedin.com/in/ankit-kumar-1b9666313?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    instagram: "https://www.instagram.com/ankith_studios?igsh=MTUwcjR3MWo4Y3l2eA==",
    youtube: "https://youtube.com/@ankith_studio?si=Xn3MqWPhcWe2VDMC",
  },
  {
    name: "Ankit Kumar",
    role: "Director - Patna Branch",
    rank: 2,
    bio: "Ankit turns category noise into a single ownable idea. He writes the brief the film is built on, and he is unreasonably good at defending it.",
    prompt: "portrait of Indian brand strategist",
  },
  {
    name: "Deepak Gupta",
    role: "Head Editor",
    rank: 2,
    bio: "Permissions, logistics, crew and contingency across India. Deepak has cleared more than 300 government shooting permissions and has never lost a shoot day to paperwork.",
    prompt: "portrait of Indian film producer",
  },
  {
    name: "Raushani Kumari",
    role: "Social Media Manager",
    rank: 3,
    bio: "Hi, I’m Raushani a creative mind with a passion for social media, content creators and storytelling. I love transforming simple ideas into meaningful and engaging digital experiences. As a BPT student and aspiring digital professional, I’m constantly learning, creating, and challenging myself to grow both personally and professionally.",
    prompt: "portrait of Indian product photographer",
  },
  {
    name: "Sudhanshu Ranjan",
    role: "Production Assistant",
    rank: 3,
    bio: "Sudhanshu built our AI-assisted edit, transcript and retouch pipeline, cutting client review cycles nearly in half without letting a machine anywhere near the final taste calls.",
    prompt: "portrait of Indian video editor",
  },
];

// ============================================
// INTERNS - Added for the Intern Section
// ============================================

export type Intern = {
  name: string;
  role: string;
  bio: string;
  duration: string;
  mentor: string;
  linkedin?: string;
  instagram?: string;
};

export const INTERNS: Intern[] = [
  {
    name: "Shashank Kumar",
    role: "Editor",
    bio: "A dedicated creator with five years of hands-on video editing experience, Shashank is the talented mind powering the Yuvansh Yadav YouTube channel. His technical skill, consistency, and passion for visual storytelling truly set him apart in the digital content space",
    duration: "6 months",
    mentor: "Ankit Kumar",
    linkedin: "https://www.linkedin.com/in/shashank-kumar-44bb91263?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    name: "Madhu Kumari",
    role: "Client Relation Associate",
    bio: "Communication-focused student with a keen interest in client relations, media, and creative production. Eager to contribute, learn, and grow in a professional creative environment.",
    duration: "6 months",
    mentor: "Ankit Kumar",
    linkedin: "#",
  },
  {
    name: "Raveen Singh",
    role: "Creative Media Associate",
    bio: "Creative video editor with a strong eye for storytelling, pacing, and visual design. Skilled in creating engaging social media content, editing videos, and bringing creative ideas to life through compelling visuals.",
    duration: "6 months",
    mentor: "Ankit Kumar",
    linkedin: "#",
  },
];