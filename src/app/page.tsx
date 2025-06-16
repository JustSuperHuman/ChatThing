"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sparkles, Code, BookOpen, Search } from "lucide-react";
import ChatInput from "@/app/_components/ChatInput";
import { useSession } from "next-auth/react";

const suggestionChips = [
  { icon: Sparkles, label: "Create" },
  { icon: Search, label: "Explore" },
  { icon: Code, label: "Code" },
  { icon: BookOpen, label: "Learn" },
];

const examplePrompts = [
  "How does AI work?",
  "Are black holes real?",
  "How many Rs are in the word \"strawberry\"?",
  "What is the meaning of life?",
];

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedPrompt, setSelectedPrompt] = useState<string>("");

  const handlePromptClick = (prompt: string) => {
    setSelectedPrompt(prompt);
  };

  return (
    <div className="flex flex-1 flex-col h-full relative">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-32">
        <div className="flex flex-col items-center space-y-8 w-full max-w-2xl">
          {/* Main Greeting */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-semibold text-foreground">
              How can I help you, {session?.user?.name ?? "James"}?
            </h1>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              {suggestionChips.map((chip) => (
                <Button
                  key={chip.label}
                  variant="outline"
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:bg-accent/50 transition-colors"
                  onClick={() => handlePromptClick(`Help me ${chip.label.toLowerCase()} something interesting`)}
                >
                  <chip.icon className="h-4 w-4" />
                  {chip.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Example Questions */}
          <div className="w-full space-y-3">
            {examplePrompts.map((prompt, index) => (
              <button
                key={index}
                className="w-full text-left p-3 rounded-lg hover:bg-accent/30 transition-colors text-muted-foreground hover:text-foreground"
                onClick={() => handlePromptClick(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Input at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-background border-t border-border">
        <div className="max-w-4xl mx-auto p-4">
          <ChatInput
            onSendMessage={() => {
              // This is a dummy function, as ChatInput now handles its own logic.
              // We could also pass a function that shows a notification.
            }}
            isStreaming={false} // This can be managed within ChatInput itself
            initialMessage={selectedPrompt}
            onClearInitialMessage={() => setSelectedPrompt("")}
          />
        </div>
      </div>
    </div>
  );
}
