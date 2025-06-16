"use client";

import ChatView from "@/app/_components/ChatView";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ChatPage() {
  const { threadId } = useParams();
  const searchParams = useSearchParams();
  const initialMessage = searchParams.get("initialMessage");

  if (!threadId || typeof threadId !== "string") {
    return <div>Invalid Thread ID</div>;
  }

  return (
    <ChatView
      threadId={threadId}
      initialMessage={initialMessage ?? undefined}
    />
  );
}