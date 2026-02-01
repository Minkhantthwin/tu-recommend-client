"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex-1 flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 p-4 lg:p-6">
          <div className="container max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
