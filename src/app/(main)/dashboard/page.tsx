import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { UniversityCarousel } from "@/components/dashboard/university-carousel";
import { SuggestedPrograms } from "@/components/dashboard/suggested-programs";

export const metadata = {
  title: "Home",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6 md:space-y-16">
      <section className="rounded-2xl border bg-card p-4 md:p-8 lg:p-12 overflow-hidden">
        <div className="grid gap-8 md:gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
              Trusted pathway to technological universities
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Find the right university program with confidence
            </h1>
            <p className="text-lg text-muted-foreground">
              {siteConfig.descriptionMm}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/programs"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/universities"
                className="inline-flex items-center justify-center rounded-md border px-6 py-3 text-sm font-medium hover:bg-accent"
              >
                Browse Universities
              </Link>
            </div>
          </div>
          
          <div className="relative min-w-0">
             <UniversityCarousel hideHeader />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SuggestedPrograms />
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border bg-card p-8">
          <h2 className="text-2xl font-semibold">About TU Recommend</h2>
          <p className="mt-4 text-muted-foreground">
            TU Recommend helps students discover the best-fit technological university programs by
            combining matriculation results, interests, and program requirements. We guide you from
            exploration to application with curated insights and AI-powered recommendations.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { title: "Data-backed choices", detail: "Compare programs with transparent requirements" },
              { title: "Guided journey", detail: "Clear steps for matriculation and applications" },
              { title: "Localized insights", detail: "Tailored for technological universities in Myanmar" },
              { title: "Always evolving", detail: "New programs and updates added regularly" },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border bg-background p-4">
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border bg-card p-4 md:p-8">
          <h2 className="text-2xl font-semibold">Contact Us</h2>
          <p className="mt-4 text-muted-foreground">
            Reach out for guidance, partnership inquiries, or feedback.
          </p>
          <div className="mt-6 space-y-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-primary" />
              support@turecommend.com
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-primary" />
              +95 9 000 000 000
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-primary" />
              Yangon, Myanmar
            </div>
          </div>
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
