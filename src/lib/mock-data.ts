// Mock data for the Fashion Commerce CMS

export interface MenuNode {
  label: string;
  href: string;
  image?: string;
  featured?: boolean;
  children?: MenuNode[];
}

export const megaMenu: MenuNode[] = [
  {
    label: "Men",
    href: "/category/men",
    children: [
      {
        label: "Shirt",
        href: "/category/men/shirt",
        children: [
          { label: "Formal Shirt", href: "/category/men/shirt/formal" },
          { label: "Casual Shirt", href: "/category/men/shirt/casual" },
          { label: "Half Shirt", href: "/category/men/shirt/half" },
        ],
      },
      {
        label: "T-Shirt",
        href: "/category/men/tshirt",
        children: [
          { label: "Round Neck", href: "/category/men/tshirt/round" },
          { label: "V-Neck", href: "/category/men/tshirt/v-neck" },
          { label: "Oversized", href: "/category/men/tshirt/oversized" },
        ],
      },
      { label: "Polo", href: "/category/men/polo" },
      { label: "Panjabi", href: "/category/men/panjabi" },
      {
        label: "Jacket",
        href: "/category/men/jacket",
        children: [
          { label: "Bomber", href: "/category/men/jacket/bomber" },
          { label: "Leather", href: "/category/men/jacket/leather" },
          { label: "Denim", href: "/category/men/jacket/denim" },
        ],
      },
      { label: "Trousers", href: "/category/men/trousers" },
    ],
  },
  {
    label: "Women",
    href: "/category/women",
    children: [
      {
        label: "Dresses",
        href: "/category/women/dresses",
        children: [
          { label: "Evening", href: "/category/women/dresses/evening" },
          { label: "Casual", href: "/category/women/dresses/casual" },
          { label: "Maxi", href: "/category/women/dresses/maxi" },
        ],
      },
      { label: "Tops", href: "/category/women/tops" },
      { label: "Sarees", href: "/category/women/sarees" },
      { label: "Kurtis", href: "/category/women/kurtis" },
      { label: "Jackets", href: "/category/women/jackets" },
    ],
  },
  {
    label: "Kids",
    href: "/category/kids",
    children: [
      { label: "Boys", href: "/category/kids/boys" },
      { label: "Girls", href: "/category/kids/girls" },
      { label: "Infants", href: "/category/kids/infants" },
    ],
  },
  {
    label: "Accessories",
    href: "/category/accessories",
    children: [
      { label: "Watches", href: "/category/accessories/watches" },
      { label: "Bags", href: "/category/accessories/bags" },
      { label: "Belts", href: "/category/accessories/belts" },
      { label: "Sunglasses", href: "/category/accessories/sunglasses" },
    ],
  },
  {
    label: "Wedding",
    href: "/category/wedding",
    children: [
      { label: "Groom", href: "/category/wedding/groom" },
      { label: "Bride", href: "/category/wedding/bride" },
      { label: "Sherwani", href: "/category/wedding/sherwani" },
    ],
  },
];

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  subcategory?: string;
  price: number;
  comparePrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  fabric: string;
  badge?: "new" | "sale" | "best";
  inStock: boolean;
  description: string;
  features: string[];
  tags?: string[];
}

const img = (seed: string, w = 800, h = 1000) =>
  `https://images.unsplash.com/photo-${seed}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

const imgPairs = [
  ["1521572163474-6864f9cf17ab", "1503341504253-dff4815485f1"],
  ["1542272604-787c3835535d", "1556905055-8f358a7a47b2"],
  ["1564584217132-2271feaeb3c5", "1591047139829-d91aecb6caea"],
  ["1591047139756-eb13c382a3a3", "1602810318383-e386cc2a3ccf"],
  ["1620799140408-edc6dcb6d633", "1551232864-3f0890e580d9"],
  ["1551028719-00167b16eac5", "1542327897-4141c8f06f48"],
  ["1490481651871-ab68de25d43d", "1485518882345-15568b007407"],
  ["1539109136881-3be0616acf4b", "1576566588028-4147f3842f27"],
  ["1554568218-0f1715e72254", "1583743814966-8936f5b7be1a"],
  ["1551803091-e20673f15770", "1611312449412-6cefac5dc3e4"],
  ["1583744946564-b52ac1c389c8", "1593030761757-71fae45fa0e7"],
  ["1469334031218-e382a71b716b", "1521119989659-a83eee488004"],
];

const brands = ["Atelier 9", "Noir & Co", "Maison Lux", "Veluxe", "Studio Ren", "Ember"];
const fabrics = ["Cotton", "Linen", "Silk", "Wool", "Denim", "Polyester", "Cashmere"];
const sizesAll = ["XS", "S", "M", "L", "XL", "XXL"];

const colors = [
  { name: "Black", hex: "#0d0d0d" },
  { name: "Ivory", hex: "#f5f0e6" },
  { name: "Gold", hex: "#c9a84c" },
  { name: "Olive", hex: "#5a5a2e" },
  { name: "Navy", hex: "#1c2541" },
  { name: "Burgundy", hex: "#6b1d28" },
  { name: "Sand", hex: "#d4c4a8" },
];

const sampleNames = [
  "Atelier Oversized Tee",
  "Maison Silk Shirt",
  "Veluxe Tailored Blazer",
  "Noir Linen Panjabi",
  "Ember Leather Jacket",
  "Studio Wool Coat",
  "Heritage Denim Jacket",
  "Riviera Cotton Polo",
  "Monaco Formal Shirt",
  "Soho Cashmere Sweater",
  "Velvet Wedding Sherwani",
  "Sahara Linen Trousers",
  "Florence Evening Dress",
  "Kyoto Wrap Dress",
  "Milan Pleated Skirt",
  "Aspen Quilted Jacket",
  "Brooklyn Bomber",
  "Hudson Half Shirt",
  "Marrakech Maxi Dress",
  "Capri Cotton Saree",
  "Geneva Wool Trousers",
  "Verona Velvet Kurti",
  "Tokyo Oversized Shirt",
  "Lisbon Casual Polo",
];

const categories = [
  { c: "men", s: "shirt" },
  { c: "men", s: "tshirt" },
  { c: "men", s: "polo" },
  { c: "men", s: "panjabi" },
  { c: "men", s: "jacket" },
  { c: "women", s: "dresses" },
  { c: "women", s: "tops" },
  { c: "women", s: "kurtis" },
  { c: "wedding", s: "groom" },
  { c: "accessories", s: "bags" },
];

export const products: Product[] = sampleNames.map((name, i) => {
  const pair = imgPairs[i % imgPairs.length];
  const cat = categories[i % categories.length];
  const price = 39 + ((i * 17) % 360);
  const hasDiscount = i % 3 === 0;
  return {
    id: `p-${i + 1}`,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name,
    brand: brands[i % brands.length],
    category: cat.c,
    subcategory: cat.s,
    price,
    comparePrice: hasDiscount ? Math.round(price * 1.35) : undefined,
    rating: 3.8 + ((i * 13) % 12) / 10,
    reviewCount: 12 + ((i * 47) % 480),
    images: [img(pair[0]), img(pair[1]), img(pair[0], 1200, 1500)],
    colors: colors.slice(i % 3, (i % 3) + 3 + (i % 2)),
    sizes: sizesAll.slice(0, 4 + (i % 3)),
    fabric: fabrics[i % fabrics.length],
    badge: i % 7 === 0 ? "best" : i % 5 === 0 ? "new" : hasDiscount ? "sale" : undefined,
    inStock: i % 11 !== 0,
    description:
      "Crafted from premium materials, this piece blends modern silhouettes with timeless tailoring. A signature item from our latest seasonal drop.",
    features: [
      "Premium fabric construction",
      "Reinforced stitching",
      "Tailored modern fit",
      "Pre-washed for softness",
    ],
    tags: [cat.c, cat.s, brands[i % brands.length].toLowerCase()],
  };
});

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug) ?? products[0];

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    slug: "fall-essentials-2025",
    title: "Fall Essentials: 7 Pieces Every Wardrobe Needs",
    excerpt: "From the perfect overcoat to elevated knitwear, our editors break down the season's must-haves.",
    cover: img("1483985988355-763728e1935b", 1600, 900),
    author: "Mira Chen",
    date: "Nov 12, 2025",
    readTime: "6 min",
    category: "Style Guide",
  content: "Cooler weather calls for a refreshed silhouette...",
  },
  {
    id: "b2",
    slug: "art-of-tailoring",
    title: "The Art of Tailoring — A Modern Perspective",
    excerpt: "How traditional craft meets contemporary cuts in our newest collection.",
    cover: img("1490481651871-ab68de25d43d", 1600, 900),
    author: "Daniel Hart",
    date: "Oct 28, 2025",
    readTime: "8 min",
    category: "Craft",
    content: "Tailoring has always been about precision...",
  },
  {
    id: "b3",
    slug: "wedding-edit",
    title: "The Wedding Edit: Looks Beyond White",
    excerpt: "A guide to dressing for every wedding event with confidence and individuality.",
    cover: img("1519741497674-611481863552", 1600, 900),
    author: "Aaliya Khan",
    date: "Oct 15, 2025",
    readTime: "5 min",
    category: "Occasion",
    content: "Wedding season is upon us...",
  },
  {
    id: "b4",
    slug: "sustainable-fabrics",
    title: "Why Fabric Choice Matters More Than Ever",
    excerpt: "A deep dive into sustainable materials and the future of fashion.",
    cover: img("1558769132-cb1aea458c5e", 1600, 900),
    author: "Leo Park",
    date: "Sep 30, 2025",
    readTime: "7 min",
    category: "Sustainability",
    content: "The conversation around sustainability...",
  },
];

export interface Order {
  id: string;
  date: string;
  status:
    | "Pending"
    | "Confirmed"
    | "Processing"
    | "Packed"
    | "Shipped"
    | "Delivered"
    | "Returned"
    | "Cancelled";
  items: { name: string; image: string; qty: number; price: number }[];
  total: number;
  customer: string;
  email: string;
}

const statuses: Order["status"][] = [
  "Pending",
  "Confirmed",
  "Processing",
  "Packed",
  "Shipped",
  "Delivered",
  "Returned",
  "Cancelled",
];

export const orders: Order[] = Array.from({ length: 14 }).map((_, i) => {
  const p = products[i % products.length];
  const p2 = products[(i + 3) % products.length];
  return {
    id: `#ORD-${10240 + i}`,
    date: `Nov ${(i % 28) + 1}, 2025`,
    status: statuses[i % statuses.length],
    items: [
      { name: p.name, image: p.images[0], qty: 1 + (i % 3), price: p.price },
      ...(i % 2 === 0
        ? [{ name: p2.name, image: p2.images[0], qty: 1, price: p2.price }]
        : []),
    ],
    total: p.price * (1 + (i % 3)) + (i % 2 === 0 ? p2.price : 0) + 9,
    customer: ["Sara Ahmed", "John Doe", "Maya Lee", "Arjun Rao", "Eva Cole"][i % 5],
    email: ["sara@mail.com", "john@mail.com", "maya@mail.com", "arjun@mail.com", "eva@mail.com"][i % 5],
  };
});

export interface Category {
  id: string;
  name: string;
  image: string;
  href: string;
  count: number;
}

export const featuredCategories: Category[] = [
  { id: "c1", name: "Men's Edit", image: img("1490481651871-ab68de25d43d", 800, 1000), href: "/category/men", count: 124 },
  { id: "c2", name: "Women's Edit", image: img("1581044777550-4cfa60707c03", 800, 1000), href: "/category/women", count: 168 },
  { id: "c3", name: "Wedding", image: img("1519741497674-611481863552", 800, 1000), href: "/category/wedding", count: 42 },
  { id: "c4", name: "Accessories", image: img("1523275335684-37898b6baf30", 800, 1000), href: "/category/accessories", count: 88 },
  { id: "c5", name: "Kids", image: img("1503944583220-79d8926ad5e2", 800, 1000), href: "/category/kids", count: 56 },
  { id: "c6", name: "New Drops", image: img("1485518882345-15568b007407", 800, 1000), href: "/new", count: 24 },
];

export const testimonials = [
  {
    id: "t1",
    name: "Aisha M.",
    role: "Verified Buyer",
    avatar: img("1494790108377-be9c29b29330", 200, 200),
    quote: "The tailoring is impeccable. Better than pieces I've bought at three times the price.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Rohan S.",
    role: "Verified Buyer",
    avatar: img("1500648767791-00dcc994a43e", 200, 200),
    quote: "Wedding sherwani arrived perfectly fitted. Got compliments all night.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Lina T.",
    role: "Verified Buyer",
    avatar: img("1438761681033-6461ffad8d80", 200, 200),
    quote: "Fabric quality is luxe-tier. Will be ordering again for the holidays.",
    rating: 5,
  },
];

// Homepage builder default sections
export type SectionType =
  | "hero-slider"
  | "category-slider"
  | "featured-products"
  | "trending-products"
  | "new-arrivals"
  | "promo-banner"
  | "testimonials"
  | "blog-section"
  | "newsletter"
  | "video-banner";

export interface HomeSection {
  id: string;
  type: SectionType;
  title: string;
  enabled: boolean;
}

export const defaultHomeSections: HomeSection[] = [
  { id: "s1", type: "hero-slider", title: "Hero Slider", enabled: true },
  { id: "s2", type: "category-slider", title: "Category Slider", enabled: true },
  { id: "s3", type: "featured-products", title: "Featured Products", enabled: true },
  { id: "s4", type: "promo-banner", title: "Promo Banner", enabled: true },
  { id: "s5", type: "trending-products", title: "Trending Products", enabled: true },
  { id: "s6", type: "new-arrivals", title: "New Arrivals", enabled: true },
  { id: "s7", type: "testimonials", title: "Testimonials", enabled: true },
  { id: "s8", type: "blog-section", title: "Blog Section", enabled: true },
  { id: "s9", type: "newsletter", title: "Newsletter", enabled: true },
];

// Analytics mock
export const revenueData = Array.from({ length: 12 }).map((_, i) => ({
  month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  revenue: 12000 + Math.round(Math.sin(i / 1.7) * 4000) + i * 800,
  orders: 120 + Math.round(Math.cos(i / 2) * 30) + i * 6,
}));

export const topCategoriesData = featuredCategories.slice(0, 5).map((c) => ({
  name: c.name,
  value: 20 + (parseInt(c.id.replace("c","")) * 13) % 60,
}));
