import Link from "next/link";
import { GraduationCap, BookOpen, Building2, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="font-bold text-xl">
            {siteConfig.name}
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center">
        <div className="container py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center space-y-8">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Find Your Perfect
              <span className="text-primary"> University Program</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              {siteConfig.descriptionMm}
            </p>
            <p className="text-lg text-muted-foreground">
              Get personalized university recommendations based on your matriculation results and interests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="rounded-md bg-primary px-8 py-3 text-lg font-medium text-primary-foreground hover:bg-primary/90"
              >
                Start Now
              </Link>
              <Link
                href="/universities"
                className="rounded-md border px-8 py-3 text-lg font-medium hover:bg-accent"
              >
                Browse Universities
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-muted/30 py-24">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center space-y-4 p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <GraduationCap className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Enter Your Scores</h3>
              <p className="text-muted-foreground">
                Input your matriculation exam results and academic information
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Get Recommendations</h3>
              <p className="text-muted-foreground">
                Receive AI-powered program recommendations based on your profile
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Building2 className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Explore Universities</h3>
              <p className="text-muted-foreground">
                Browse universities and programs that match your qualifications
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <BookOpen className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Apply Online</h3>
              <p className="text-muted-foreground">
                Submit your applications and track their status online
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
