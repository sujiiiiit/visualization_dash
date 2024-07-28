import {
  HomeIcon,
  ChartIcon,
  MailIcon,
  SettingsIcon,
  BlogIcon,
} from "@/components/ui/icon";

const sectors = [
  "Energy",
  "Information Technology",
  "Retail",
  "Construction",
  "Transport",
  "Media & entertainment",
  "Financial services",
  "Security",
  "Support services",
  "Manufacturing",
];

const navItem = [
  {
    title: "Blogs",
    link: "/",
    icon: BlogIcon,
  },
  {
    title: "Analytics",
    link: "/analytics",
    icon: ChartIcon,
  },
  {
    title: "Mail",
    link: "/email",
    icon: MailIcon,
  },
  {
    title: "Settings",
    link: "/setting",
    icon: SettingsIcon,
  },
];

export interface DataType {
    _id: number;
    end_year: string;
    intensity: number;
    sector: string;
    top: string;
    insights: string;
    URL: string;
    region: string;
    start_year: string;
    impact: string;
    added: string;
    published: string;
    country: string;
    relevance: number;
    pestle: string;
    source: string;
    title: string;
    likelihood: number;
};


export { navItem, sectors };

