"use client";

import { AuthButton } from "./AuthButton";
import { Button } from "@/components/ui/button";
import { PanelLeft, PanelRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const Header = ({ isSidebarOpen, toggleSidebar }: HeaderProps) => {
  const router = useRouter();
  const createThread = api.chat.createThread.useMutation({
    onSuccess: (thread) => {
      router.push(`/chat/${thread.id}`);
    },
  });

  const handleNewChat = () => {
    createThread.mutate({
      title: "New Conversation",
    });
  };

  return (
    <header className="flex items-center justify-between p-4 border-b w-full">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="hidden md:inline-flex"
        >
          {isSidebarOpen ? <PanelLeft /> : <PanelRight />}
        </Button>
        <Button onClick={handleNewChat} disabled={createThread.isPending}>
          {createThread.isPending ? "Creating..." : "New Chat"}
        </Button>
      </div>
      <h1 className="text-xl font-bold">Chat Thang</h1>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <AuthButton />
      </div>
    </header>
  );
};