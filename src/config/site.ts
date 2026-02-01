export const siteConfig = {
  name: "TU Recommendation System",
  nameMm: "တက္ကသိုလ်ဝင်ခွင့်လျှောက်ထားရေးစနစ်",
  description: "Technological University Recommendation & Application System",
  descriptionMm: "တက္ကသိုလ်ဝင်ခွင့်လျှောက်ထားရေးစနစ်",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/og-image.png",
  links: {
    github: "https://github.com",
  },
  creator: "TU Recommendation Team",
  keywords: [
    "university",
    "recommendation",
    "myanmar",
    "education",
    "application",
    "matriculation",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
