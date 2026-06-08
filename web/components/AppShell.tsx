"use client";

import { usePathname } from "next/navigation";
import HeaderPublic from "@/components/Header";
import Footer from "@/components/Footer";
import { ChatProvider } from "@/context/chat-context";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isChat = pathname?.startsWith("/chat");

  return (
    <ChatProvider>
      <div className="min-h-full flex flex-col">
        {!isChat && <HeaderPublic />}
        <main className="flex-1">{children}</main>
        {!isChat && <Footer />}
      </div>
    </ChatProvider>
  );
}
