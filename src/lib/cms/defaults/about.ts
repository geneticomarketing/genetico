import { NEWSLETTER_URL } from "@/lib/contact";
import { LEAD_FORM_HASH } from "@/lib/routes";
import type { AboutPageData, GrantAward, TeamMember } from "../types";

export const DEFAULT_HERO_LABELS = [
  { label: "Clinical Workflows", anchor: "top-left" },
  { label: "AI Decision Support", anchor: "top-right" },
  { label: "Research Analytics", anchor: "mid-left" },
  { label: "Longitudinal Care", anchor: "mid-right" },
] as const;

export const DEFAULT_TEAM: TeamMember[] = [
  {
    id: 0,
    name: "Arjun Gupta",
    title: "Founder & CEO",
    image: "/team/Arjun Gupta.png",
    about:
      "Masters, Ross School of Business, University of Michigan. B. Tech-Biotech with exposure to drug discovery. 17+ Years across genetics, bioinformatics, testing labs and venture capital.",
    linkedinUrl: "https://www.linkedin.com/in/arjungupta25/",
    color: "#2563eb",
    initials: "AG",
    bg: "from-blue-400 to-blue-600",
  },
  {
    id: 1,
    name: "Saurabh Verma",
    title: "Co-founder & CTO",
    image: "/team/Saurabh Verma.png",
    about:
      "14+ Years of experience Building Software products, M.Tech (Computer Science), Serial Entrepreneur.",
    color: "#7c3aed",
    initials: "SV",
    bg: "from-violet-400 to-violet-600",
  },
  {
    id: 2,
    name: "Dr. Rohit Sadanand",
    title: "Product Lead",
    image: "/team/Dr Rohit Sadanand.png",
    about: "DM Medical Genetics, AIIMS Delhi, MD Paediatrics, MBBS.",
    linkedinUrl: "https://www.linkedin.com/in/rohit-sadanand-2413b213b/",
    color: "#0891b2",
    initials: "RS",
    bg: "from-cyan-400 to-cyan-600",
  },
  {
    id: 3,
    name: "Vikram Kumar",
    title: "Data Scientist",
    image: "/team/Vikram Kumar.png",
    about:
      "Data science, Bioinformatics, Artificial intelligence, Masters in Technology, Computational Biology, IIIT Delhi.",
    linkedinUrl: "https://www.linkedin.com/in/vikram-kumar-233a10193/",
    color: "#0d9488",
    initials: "VK",
    bg: "from-teal-400 to-teal-600",
  },
  {
    id: 4,
    name: "Dr. Shubha Phadke",
    title: "Clinical Advisor",
    image: "/team/Dr Shubha Phadke.png",
    about:
      "Rt. Prof. & HOD - Dept. of Medical Genetics at SGPGI, Lucknow (35+yrs exp). 300+ Publications. Founder President - Society Indian Academy of Medical Genetics. Launched the first DM Medical Genetics program in India.",
    linkedinUrl: "https://www.linkedin.com/in/shubha-phadke-87691960/",
    color: "#1d4ed8",
    initials: "SP",
    bg: "from-blue-500 to-indigo-600",
  },
  {
    id: 5,
    name: "Dr. Kameshwar Rao",
    title: "Public Sector Advisor",
    image: "/team/Dr kameshwar Rao.png",
    about:
      "Rt. Executive Director - National Health Authority. 25 yrs+ of exp. in National Health Systems & Digital Health Transformation. Significant contributions in Ayushman Bharat Mission, AB PM-JAY.",
    linkedinUrl: "https://www.linkedin.com/in/kameshwar-rao-punyamurtula-58751b14/",
    color: "#9333ea",
    initials: "KR",
    bg: "from-purple-400 to-fuchsia-500",
  },
  {
    id: 6,
    name: "Anil Raina",
    title: "Strategy Advisor",
    image: "/team/Anil Raina.png",
    about:
      "Ex-GM, SEA-Sanofi Genzyme. MBA (IB). Senior Biopharma Executive. Strategic Leadership in Speciality Care & Rare Diseases. P&L Management & Launch Expertise.",
    linkedinUrl: "https://www.linkedin.com/in/anilashokraina-consultant-biopharma/",
    color: "#0369a1",
    initials: "AR",
    bg: "from-sky-400 to-blue-500",
  },
  {
    id: 7,
    name: "Amit Mookim",
    title: "Mentor",
    image: "/team/Amit Mookim.png",
    about:
      "CEO - Immuneel Therapeutics (Cell & Gene Therapy). MD of IQVIA South Asia. Partner - Healthcare KPMG. 20 yrs+ of healthcare leadership.",
    linkedinUrl: "https://www.linkedin.com/in/amitmookim/",
    color: "#4f46e5",
    initials: "AM",
    bg: "from-indigo-400 to-indigo-600",
  },
  {
    id: 8,
    name: "Dr. Annie Hasan",
    title: "Mentor",
    image: "/team/Dr Annie hassan.png",
    about:
      "Head - Genetics & Molecular Medicine at Kamineni Hospitals with 35+ yrs of exp. President - Board of Genetic Counselling India.",
    linkedinUrl: "https://www.linkedin.com/in/q-annie-hasan-467b811b4/",
    color: "#b45309",
    initials: "AH",
    bg: "from-amber-400 to-orange-500",
  },
];

export const DEFAULT_GRANTS: GrantAward[] = [
  {
    year: "2019",
    title: "Biotech Ignition Grant — BIRAC",
    subtitle: "Department of Biotechnology, Govt. of India",
    icon: "/logos/grants/1.jpg",
    category: "left",
  },
  {
    year: "2020",
    title: "Seed Investment — IIT Mandi",
    subtitle: "NIDHI SSS",
    icon: "/logos/grants/2.jpg",
    category: "right",
  },
  {
    year: "2022",
    title: "India-Sweden Healthcare Innovation Challenge",
    subtitle: "Winner",
    icon: "/logos/grants/3.png",
    category: "left",
  },
  {
    year: "2024",
    title: "Startup Maharathi Award",
    subtitle: "Startup Mahakumbh — Hon'ble Minister Piyush Goyal",
    icon: "/logos/grants/4.jpg",
    category: "right",
  },
  {
    year: "2024",
    title: "HDFC Bank Parivartan CSR Grant",
    subtitle: "Corporate Social Responsibility",
    icon: "/logos/grants/5.jpg",
    category: "left",
  },
  {
    year: "2025",
    title: "Scale-up Grant — MeitY",
    subtitle: "Ministry of Electronics & Information Technology",
    icon: "/logos/grants/6.png",
    category: "right",
  },
];

export const DEFAULT_ABOUT_PAGE: AboutPageData = {
  hero: {
    titleLine1: "Building Infrastructure",
    titleLine2: "For",
    titleHighlight: "Rare Disease Care",
    subtitle:
      "An AI-enabled digital infrastructure connecting clinical care, research, and public health to transform rare disease diagnosis, management, and outcomes.",
    ctaLabel: "Get In Touch",
    ctaHref: "#get-in-touch",
    labels: DEFAULT_HERO_LABELS.map((l) => l.label),
  },
  vision: {
    eyebrow: "Our Vision",
    heading: "Genetico was built to solve the foundational problem in rare disease care.",
  },
  foundations: [
    {
      index: "01",
      title: "The Core Challenge",
      body: "Rare disease care is limited by fragmented clinical data, disconnected workflows, and a lack of structured information needed to support diagnosis, research, and public health.",
    },
    {
      index: "02",
      title: "The Mission",
      body: "To empower clinicians, institutions, and researchers with AI-enabled workflows, clinical decision support, and structured data that improve care and accelerate discovery.",
    },
    {
      index: "03",
      title: "The Vision",
      body: "To build the digital backbone for the rare disease ecosystem, connecting patient care, research, and public health through intelligent infrastructure at scale.",
    },
  ],
  leadership: {
    eyebrow: "Our Team",
    heading: "Leadership",
    subtitle: "Clinicians, engineers, and advisors united by one mission.",
  },
  grants: {
    eyebrow: "Recognition",
    heading: "Rewards & Recognition",
    description:
      "Recognized and supported by leading government bodies, incubators, and innovation programs across India.",
  },
  cta: {
    heading: "Advancing the Rare Disease Ecosystem Starts with Collaboration",
    description:
      "We work alongside clinicians, institutions, researchers, and public health programs to build intelligent infrastructure that transforms fragmented data into better decisions and better outcomes.",
    buttons: [
      { label: "Book a Demo", href: LEAD_FORM_HASH, variant: "primary" },
      { label: "Subscribe to Updates", href: NEWSLETTER_URL, variant: "secondary" },
    ],
  },
  team: DEFAULT_TEAM,
  grantItems: DEFAULT_GRANTS,
};
