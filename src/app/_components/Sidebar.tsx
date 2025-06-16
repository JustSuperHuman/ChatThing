"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, MessageSquare, Plus, Settings, User } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { AuthButton } from "./AuthButton";
import { useState, useEffect } from "react";

export const Sidebar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [anonymousThreadIds, setAnonymousThreadIds] = useState<string[]>([]);
  const utils = api.useUtils();

  const { data: threads, isLoading, refetch } = api.chat.getThreads.useQuery(
    { 
      anonymousThreadIds: !session?.user ? anonymousThreadIds : undefined 
    },
    {
      enabled: true, // Always enabled to catch new threads
    },
  );

  // Load anonymous thread IDs from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && !session?.user) {
      const stored = localStorage.getItem('anonymousThreadIds');
      if (stored) {
        try {
          const ids = JSON.parse(stored) as string[];
          setAnonymousThreadIds(ids);
        } catch (error) {
          console.error('Failed to parse anonymous thread IDs:', error);
          localStorage.removeItem('anonymousThreadIds');
        }
      }
    }
  }, [session?.user]);

  // Refetch when anonymousThreadIds changes
  useEffect(() => {
    if (!session?.user && anonymousThreadIds.length > 0 && refetch) {
      void refetch();
    }
  }, [anonymousThreadIds, session?.user, refetch]);

  const createThread = api.chat.createThread.useMutation({
    onSuccess: (thread) => {
      // Save anonymous thread ID to localStorage
      if (!session?.user && typeof window !== 'undefined') {
        const currentIds = [...anonymousThreadIds, thread.id];
        setAnonymousThreadIds(currentIds);
        localStorage.setItem('anonymousThreadIds', JSON.stringify(currentIds));
      }
      
      // Invalidate and refetch threads query to show new thread
      void utils.chat.getThreads.invalidate();
      void refetch();
      
      router.push(`/chat/${thread.id}`);
    },
  });

  const handleNewChat = () => {
    router.push("/");
  };

  // Group threads by time periods
  type ThreadType = {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string | null;
  };

  const groupThreadsByTime = (threads: ThreadType[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const groups = {
      today: [] as ThreadType[],
      yesterday: [] as ThreadType[],
      last30Days: [] as ThreadType[],
      older: [] as ThreadType[],
    };

    threads.forEach((thread) => {
      const threadDate = new Date(thread.createdAt);
      if (threadDate >= today) {
        groups.today.push(thread);
      } else if (threadDate >= yesterday) {
        groups.yesterday.push(thread);
      } else if (threadDate >= thirtyDaysAgo) {
        groups.last30Days.push(thread);
      } else {
        groups.older.push(thread);
      }
    });

    return groups;
  };

  const groupedThreads = groupThreadsByTime(threads ?? []);

  return (
    <div className="flex flex-col h-full bg-background border-r border-border/50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 bg-gradient-to-br from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CT</span>
          </div>
          <h1 className="text-lg font-semibold">Chat Thang</h1>
        </Link>
        <div className="flex items-center gap-1">
          <ThemeToggle />
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <Button
          onClick={handleNewChat}
          className="w-full justify-start gap-2 bg-transparent border border-border/50 hover:bg-accent/50 text-foreground"
          variant="outline"
        >
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </div>

      {/* Search */}
      <div className="px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search chats..."
            className="pl-10 bg-transparent border-border/50"
          />
        </div>
      </div>

      {/* Thread Groups */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        {isLoading && (
          <div className="text-sm text-muted-foreground px-2">Loading chats...</div>
        )}
        
        {!isLoading && threads?.length === 0 && (
          <div className="text-sm text-muted-foreground px-2">No chats yet. Start a conversation!</div>
        )}

        {!session && threads?.length === 0 && !isLoading && (
          <div className="px-2 py-4 text-center">
            <p className="text-sm text-muted-foreground mb-3">Sign in to sync your chat history across devices</p>
            <AuthButton />
          </div>
        )}

        {/* Today */}
        {groupedThreads.today.length > 0 && (
          <div>
            <h3 className="text-xs font-medium text-muted-foreground mb-2 px-2 uppercase tracking-wider">Today</h3>
            <div className="space-y-1">
              {groupedThreads.today.map((thread) => (
                <Link
                  key={thread.id}
                  href={`/chat/${thread.id}`}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/30 transition-colors group text-sm"
                >
                  <MessageSquare className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="truncate flex-1">{thread.title}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Yesterday */}
        {groupedThreads.yesterday.length > 0 && (
          <div>
            <h3 className="text-xs font-medium text-muted-foreground mb-2 px-2 uppercase tracking-wider">Yesterday</h3>
            <div className="space-y-1">
              {groupedThreads.yesterday.map((thread) => (
                <Link
                  key={thread.id}
                  href={`/chat/${thread.id}`}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/30 transition-colors group text-sm"
                >
                  <MessageSquare className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="truncate flex-1">{thread.title}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Last 30 Days */}
        {groupedThreads.last30Days.length > 0 && (
          <div>
            <h3 className="text-xs font-medium text-muted-foreground mb-2 px-2 uppercase tracking-wider">Last 30 Days</h3>
            <div className="space-y-1">
              {groupedThreads.last30Days.map((thread) => (
                <Link
                  key={thread.id}
                  href={`/chat/${thread.id}`}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/30 transition-colors group text-sm"
                >
                  <MessageSquare className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="truncate flex-1">{thread.title}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Older */}
        {groupedThreads.older.length > 0 && (
          <div>
            <h3 className="text-xs font-medium text-muted-foreground mb-2 px-2 uppercase tracking-wider">Older</h3>
            <div className="space-y-1">
              {groupedThreads.older.map((thread) => (
                <Link
                  key={thread.id}
                  href={`/chat/${thread.id}`}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/30 transition-colors group text-sm"
                >
                  <MessageSquare className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="truncate flex-1">{thread.title}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="border-t border-border/50 p-4">
        <div className="flex items-center gap-2">
          {session ? (
            <>
              <Link href="/settings" className="flex-1">
                <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                {session.user.name?.split(' ')[0] ?? 'User'}
              </Button>
            </>
          ) : (
            <div className="w-full">
              <AuthButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};