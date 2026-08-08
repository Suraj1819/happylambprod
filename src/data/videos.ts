import productImg from "@/assets/work-product.jpg";
import furnitureImg from "@/assets/work-furniture.jpg";
import corporateImg from "@/assets/work-corporate.jpg";
import brandImg from "@/assets/work-brand.jpg";
import catalogueImg from "@/assets/work-catalogue.jpg";
import heroStudio from "@/assets/hero-studio.jpg";

const CDN = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample";

export type StudioVideo = {
  id: string;
  title: string;
  client: string;
  category: "Ad Films" | "Product Reels" | "Corporate Films" | "Brand Campaigns" | "Social Media";
  meta: string;
  src: string;
  poster: string;
  aspect: "16/9" | "9/16" | "21/9" | "1/1";
  span?: "hero" | "tall" | "wide";
};

export const STUDIO_VIDEOS: StudioVideo[] = [
  {
    id: "tata-zaxis",
    title: "Tata Hitachi ZAXIS Commercial",
    client: "Tata Hitachi",
    category: "Ad Films",
    meta: "55s • YouTube commercial",
    src: "https://www.youtube.com/watch?v=JTT5I84Sz4k",
    poster: productImg,
    aspect: "16/9",
    span: "hero",
  },
  {
    id: "novo-reel",
    title: "Novo Living Product Reel",
    client: "Novo Living",
    category: "Product Reels",
    meta: "15s • Vertical",
    src: "https://www.youtube.com/watch?v=e_2cBYTz_eA",
    poster: furnitureImg,
    aspect: "9/16",
    span: "tall",
  },
  {
    id: "meridian-film",
    title: "Meridian Group Brand Film",
    client: "Meridian Group",
    category: "Corporate Films",
    meta: "3:20 • Documentary",
    src: "https://www.youtube.com/watch?v=BjVIJHfOvEI",
    poster: corporateImg,
    aspect: "16/9",
  },
  {
    id: "kaya-spring",
    title: "Kaya Spring Campaign",
    client: "Kaya Apparel",
    category: "Brand Campaigns",
    meta: "45s • Multi-channel",
    src: "https://www.youtube.com/watch?v=39Cka5MciW8",
    poster: brandImg,
    aspect: "16/9",
  },
  {
    id: "lumen-launch",
    title: "Lumen Launch Spot",
    client: "Lumen Wellness",
    category: "Ad Films",
    meta: "20s • Digital",
    src: "https://www.youtube.com/watch?v=39Cka5MciW8",
    poster: catalogueImg,
    aspect: "16/9",
  },
  {
    id: "atlas-bts",
    title: "Atlas Motors BTS",
    client: "Atlas Motors",
    category: "Corporate Films",
    meta: "1:10 • Behind the scenes",
    src: "https://www.youtube.com/watch?v=VuiOXiYmGqs",
    poster: heroStudio,
    aspect: "16/9",
    span: "hero",
  },
  {
    id: "vireo-reel",
    title: "Vireo Skin Macro Reel",
    client: "Vireo",
    category: "Product Reels",
    meta: "12s • Vertical",
    src: `${CDN}/ForBiggerFun.mp4`,
    poster: productImg,
    aspect: "9/16",
    span: "tall",
  },
  {
    id: "orbit-social",
    title: "Orbit Streetwear Drop",
    client: "Orbit Apparel",
    category: "Social Media",
    meta: "18 reels • One day",
    src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    poster: brandImg,
    aspect: "9/16",
  },
  {
    id: "halcyon-catalogue",
    title: "Halcyon Catalogue In Motion",
    client: "Halcyon Living",
    category: "Brand Campaigns",
    meta: "60s • Retail + Web",
    src: `${CDN}/ElephantsDream.mp4`,
    poster: catalogueImg,
    aspect: "16/9",
  },
  {
    id: "saffron-square",
    title: "Saffron Kitchen Loop",
    client: "Saffron Foods",
    category: "Social Media",
    meta: "10s • Square loop",
    src: `${CDN}/ForBiggerMeltdowns.mp4`,
    poster: furnitureImg,
    aspect: "1/1",
  },
  {
    id: "showreel-2026",
    title: "HappyLamb Showreel 2026",
    client: "HappyLamb Production",
    category: "Ad Films",
    meta: "2:10 • Studio reel",
    src: "https://www.youtube.com/watch?v=JTT5I84Sz4k",
    poster: heroStudio,
    aspect: "16/9",
    span: "hero",
  },
  {
    id: "tessa-corporate",
    title: "Tessa Plant Story",
    client: "Tessa Industries",
    category: "Corporate Films",
    meta: "2:40 • Interview led",
    src: `${CDN}/Sintel.mp4`,
    poster: corporateImg,
    aspect: "16/9",
  },
];

export const SHOWREEL = STUDIO_VIDEOS.find((v) => v.id === "showreel-2026")!;

export const VIDEO_CATEGORIES = [
  "All",
  "Ad Films",
  "Product Reels",
  "Corporate Films",
  "Brand Campaigns",
  "Social Media",
] as const;