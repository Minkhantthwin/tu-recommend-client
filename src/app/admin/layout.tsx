"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminFooter } from "@/components/admin/admin-footer";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between border-b p-4 bg-background sticky top-0 z-30">
        <span className="font-bold text-lg">TU Recommend Admin</span>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </header>

      <div className="flex-1 flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1 p-4 lg:p-6 bg-muted/30">
            <div className="container max-w-7xl mx-auto">{children}</div>
          </main>
          <AdminFooter />
        </div>
      </div>
    </div>
  );
}
