import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container max-w-7xl mx-auto px-4 py-8 lg:px-6">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
