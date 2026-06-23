export const SITE = {
  name: "Benjamen Oladokun",
  title: "Entrepreneur",
  tagline: "Entrepreneur • Builder • Visionary",
  description:
    "Benjamen Oladokun is an entrepreneur, business strategist, leadership speaker, and public figure building ventures that scale with purpose.",
  email: "hello@benjamenoladokun.com",
  linkedin: "https://linkedin.com",
  linkedinHandle: "Benjamen Oladokun",
  instagram: "https://instagram.com",
  instagramHandle: "@benjamenoladokun",
  twitter: "https://x.com",
} as const;

export const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Speaking", href: "#speaking" },
  { label: "Achievements", href: "#achievements" },
  { label: "Work with me", href: "#contact" },
] as const;

export const ACHIEVEMENT_METRICS = [
  { value: 15, prefix: "", suffix: "+", label: "Years of Experience" },
  { value: 1, prefix: "$", suffix: "B+", label: "Transactions Facilitated" },
  { value: 1000, prefix: "", suffix: "+", label: "Entrepreneurs Empowered" },
  { value: 4, prefix: "", suffix: "", label: "Continents of Impact" },
  { value: 36, prefix: "", suffix: "", label: "Nigerian States Served" },
  { value: 10, prefix: "", suffix: "+", label: "Notable Speaking Engagements" },
] as const;

export const ACHIEVEMENT_RECOGNITION = [
  "Forbes Business Council Member",
  "Harambeans Fellow — H'24",
  "Global Entrepreneurship Award",
  "Y Combinator Alumni",
] as const;

export const ACHIEVEMENT_LEADERSHIP = [
  "Community Leader, GIBC",
  "1000+ entrepreneurs across Africa",
  "Building Africa's first mobility unicorn",
  "Devoted husband and father",
  "Faith-driven leadership model",
] as const;

export const JOURNEY = [
  {
    year: "University Years · Obafemi Awolowo University",
    title: "Foundations — The Spark",
    description:
      "Benjamen's entrepreneurial journey began at Obafemi Awolowo University, where he ignited his passion for ventures in gaming, hospitality, and mobility while earning his degree in Civil Engineering. This passion led to the successful establishment of CampusChow and Snack It Distro — early proof that bold ideas could scale.",
  },
  {
    year: "Infrastructure Chapter",
    title: "Eazypapers Technologies",
    description:
      "Co-founded Eazypapers — a leading digital vehicle documentation and fleet management platform in Nigeria. Built a robust online system connecting processing centres and thousands of agents across all 36 states to consumers, bringing order and scale to Nigeria's fragmented car paperwork market.",
  },
  {
    year: "Market-Building Chapter",
    title: "Shekel Mobility — Africa's Auto OS",
    description:
      "Co-founded Shekel Mobility, building the operating system for Africa's auto trade. Empowering auto dealers — the true engine of the market — with financing, sourcing, logistics, and execution infrastructure. Backed by Y Combinator, Shekel is helping thousands of dealers move from informal hustle to institutional scale, facilitating over $1B+ in transactions.",
  },
  {
    year: "Thought Leadership",
    title: "Global Voice for African Innovation",
    description:
      "From GITEX Global in Dubai to AfroTech in Texas, Founders Huddle, Art of Technology Lagos, and the Digital Technology Showcase with Secretary Blinken — Benjamen has taken Africa's entrepreneurial story to the world's most prestigious stages.",
  },
] as const;

export const INITIATIVES = [
  {
    title: "Fellowship Program",
    description:
      "An exclusive cohort for emerging leaders ready to accelerate their impact through mentorship, resources, and a global network.",
  },
  {
    title: "Leadership Academy",
    description:
      "Intensive programs designed to cultivate executive presence, strategic thinking, and the confidence to lead at scale.",
  },
  {
    title: "Business Masterclass",
    description:
      "Deep-dive sessions on scaling ventures, fundraising, and building resilient organizations in competitive markets.",
  },
  {
    title: "Mentorship Initiative",
    description:
      "One-on-one guidance for founders and professionals navigating pivotal moments in their careers and businesses.",
  },
] as const;

export const PRESS = [
  { publication: "Forbes", title: "The New Face of African Entrepreneurship" },
  { publication: "CNN", title: "Building Beyond Borders" },
  { publication: "BBC", title: "From Campus to Corporation" },
  { publication: "The Guardian", title: "Leadership in the Digital Age" },
  { publication: "TEDx", title: "Win at Work, Win at Life" },
  { publication: "Google", title: "Innovation Summit Feature" },
] as const;

export const BRANDS = [
  "Forbes",
  "CNN",
  "BBC",
  "Guardian",
  "TEDx",
  "Google",
  "Microsoft",
  "Meta",
] as const;

export const SPEAKING = [
  {
    topic: "GITEX Global",
    location: "Dubai, UAE",
    description: "Africa's Role in Shaping the Future of Innovation",
  },
  {
    topic: "AfroTech",
    location: "Houston, USA",
    description: "Building Fintech Solutions in Africa",
  },
  {
    topic: "Digital Technology Showcase",
    location: "Lagos, Nigeria",
    description: "AI & Innovation in the Nigerian Mobility Sector",
  },
  {
    topic: "Art of Technology Lagos 7.0",
    location: "Lagos, Nigeria",
    description: "Future Technologies & a Sustainable Lagos",
  },
  {
    topic: "Art of Technology Lagos 5.0",
    location: "Lagos, Nigeria",
    description: "The Creative Economy & a Digital Lagos",
  },
  {
    topic: "Founders Huddle 3.0",
    location: "Lagos, Nigeria",
    description: "Vision, Focus & Saying No",
  },
  {
    topic: "GIBC Forward",
    location: "Lagos, Nigeria",
    description: "Build the Change You Want to See",
  },
  {
    topic: "Africa Tech Summit",
    location: "London, UK",
    description: "Featured Speaker",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Benjamen brings a rare combination of strategic depth and authentic leadership. His insights have transformed how we approach growth.",
    name: "Sarah Mitchell",
    position: "CEO",
    organization: "Horizon Ventures",
  },
  {
    quote:
      "Working with Benjamen elevated our entire leadership team. His mentorship is direct, insightful, and genuinely transformative.",
    name: "James Okonkwo",
    position: "Founder",
    organization: "TechBridge Africa",
  },
  {
    quote:
      "A commanding speaker who connects with every audience. Benjamen doesn't just inspire — he equips leaders to act.",
    name: "Dr. Amara Chen",
    position: "Dean",
    organization: "Global Leadership Institute",
  },
] as const;

export const SERVICES = [
  "Speaking Engagements",
  "Consulting",
  "Advisory Services",
  "Brand Partnerships",
  "Corporate Training",
  "Mentorship",
] as const;

export const IMAGE = "/images/benjamen-oladokun.jpg";
