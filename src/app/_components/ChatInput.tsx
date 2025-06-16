"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input/input";
import { Paperclip, Search, ArrowUp, AlertTriangle } from "lucide-react";
import { useState, type FC, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { ModelSelector } from "./ModelSelector";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

interface ChatInputProps {
  threadId?: string;
  onSendMessage: (
    content: string,
    modelId: string,
    attachments?: string[],
  ) => void;
  isStreaming: boolean;
  initialMessage?: string;
  onClearInitialMessage?: () => void;
  initialSelectedModel?: string;
}

const ChatInput: FC<ChatInputProps> = ({
  threadId,
  onSendMessage,
  isStreaming,
  initialMessage,
  onClearInitialMessage,
  initialSelectedModel,
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const utils = api.useUtils();
  
  const { data: messageCount = 0 } = api.chat.getMessageCount.useQuery();

  const createThreadWithMessage = api.chat.createThreadWithMessage.useMutation({
    onSuccess: (thread) => {
      console.log("🎯 Thread created successfully:", thread);
      if (!session?.user) {
        const stored = localStorage.getItem("anonymousThreadIds");
        const existingIds = stored ? (JSON.parse(stored) as string[]) : [];
        const updatedIds = [...existingIds, thread.id];
        localStorage.setItem("anonymousThreadIds", JSON.stringify(updatedIds));
      }
      void utils.chat.getThreads.invalidate();
      void utils.chat.getMessageCount.invalidate();
      router.push(`/chat/${thread.id}?model=${encodeURIComponent(selectedModel)}`);
    },
    onError: (error) => {
      console.error("🎯 Thread creation failed:", error);
      if (error.message.includes("Message limit reached")) {
        // The UI will already show the warning, no need for additional error handling
        return;
      }
      console.error("🎯 Error details:", {
        message: error.message,
        data: error.data,
        shape: error.shape,
      });
    },
  });
  const [content, setContent] = useState(initialMessage ?? "");
  const [selectedModel, setSelectedModel] =
    useState<string>(initialSelectedModel ?? "google/gemini-flash-1.5");
  const [attachments, setAttachments] = useState<
    { url: string; name: string }[]
  >([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showEmailSignUp, setShowEmailSignUp] = useState(false);
  const [signUpEmail, setSignUpEmail] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);

  useEffect(() => {
    if (initialMessage) {
      setContent(initialMessage);
    }
  }, [initialMessage]);

  const handleSend = () => {
    if (!content.trim() && attachments.length === 0) return;

    console.log("🎯 ChatInput handleSend called with model:", selectedModel);

    // Capture values before clearing state
    const messageContent = content;
    const messageAttachments = attachments.map((a) => a.url);

    if (threadId) {
      onSendMessage(
        messageContent,
        selectedModel,
        messageAttachments,
      );
    } else {
      createThreadWithMessage.mutate({
        title: messageContent.slice(0, 50) + (messageContent.length > 50 ? "..." : ""),
        message: messageContent,
        attachments: messageAttachments,
      });
    }

    setContent("");
    setAttachments([]);
    onClearInitialMessage?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const { url } = (await response.json()) as { url: string };
      setAttachments([...attachments, { url, name: file.name }]);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // Show warning for anonymous users approaching the limit
  const showMessageLimitWarning = !session && messageCount >= 8;
  const isAtMessageLimit = !session && messageCount >= 10;

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpEmail) return;
    
    setIsSigningUp(true);
    try {
      await signIn("email", { email: signUpEmail, callbackUrl: "/" });
    } catch (error) {
      console.error("Sign up error:", error);
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Message Limit Warning */}
      {showMessageLimitWarning && (
        <div className="mb-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <span className="text-sm font-medium">
              {isAtMessageLimit 
                ? "Message limit reached! " 
                : `${10 - messageCount} messages remaining. `}
            </span>
          </div>
          
          {!showEmailSignUp ? (
            <Button 
              variant="link" 
              size="sm" 
              className="h-auto p-0 text-sm font-medium text-warning hover:text-warning/80"
              onClick={() => setShowEmailSignUp(true)}
            >
              Sign up to continue chatting
            </Button>
          ) : (
            <form onSubmit={handleEmailSignUp} className="flex items-center gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                className="text-xs h-8"
                required
              />
              <Button type="submit" size="sm" disabled={isSigningUp || !signUpEmail}>
                {isSigningUp ? "Sending..." : "Send Link"}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setShowEmailSignUp(false);
                  setSignUpEmail("");
                }}
              >
                Cancel
              </Button>
            </form>
          )}
        </div>
      )}

      {/* Attachments */}
      {attachments.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {attachments.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm"
            >
              <span className="font-medium">{file.name}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 hover:bg-background"
                onClick={() =>
                  setAttachments(attachments.filter((_, i) => i !== index))
                }
              >
                &times;
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Main Input Container */}
      <div className="bg-background border border-border rounded-3xl shadow-sm">
        {/* Input Area */}
        <div className="flex items-end gap-3 p-4">
          {/* User Avatar */}
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src={session?.user?.image ?? undefined} />
            <AvatarFallback className="bg-gradient-to-r from-pink-500 to-orange-500 text-white text-xs">
              {session?.user?.name?.[0] ?? "J"}
            </AvatarFallback>
          </Avatar>

          {/* Text Input */}
          <div className="flex-1">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="border-0 bg-transparent resize-none min-h-[20px] max-h-32 p-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground"
              disabled={isStreaming}
              rows={1}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Attachment Button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-muted"
              onClick={() => fileInputRef.current?.click()}
              disabled={isStreaming}
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              title="Attach a file"
            />

            {/* Send Button */}
            <Button
              onClick={handleSend}
              disabled={isStreaming || (!content.trim() && attachments.length === 0) || isAtMessageLimit}
              size="icon"
              className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white border-0"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="flex items-center justify-between px-4 pb-3 pt-1 border-t border-border/50">
          <div className="flex items-center gap-3">
            {/* Model Selector */}
            <ModelSelector 
              onModelSelect={setSelectedModel}
              selectedModelId={selectedModel}
            />
            
            {/* Search Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs"
            >
              <Search className="h-3 w-3 mr-1" />
              Search
            </Button>
          </div>

          {/* User Status */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{session?.user?.name ?? "Anonymous"}</span>
            <span>•</span>
            <span className="text-green-600">Free</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;