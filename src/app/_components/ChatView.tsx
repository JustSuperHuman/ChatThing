"use client";

import { useChat, type Message as VercelMessage } from "@ai-sdk/react";
import { type FC, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

import { api } from "@/trpc/react";
import ChatInput from "./ChatInput";
import Message from "./Message";

interface ChatViewProps {
  threadId: string;
  initialMessage?: string;
}

const ChatView: FC<ChatViewProps> = ({ threadId, initialMessage }) => {
  const searchParams = useSearchParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [currentModel, setCurrentModel] = useState<string>(
    searchParams.get("model") ?? "google/gemini-flash-1.5"
  );
  
  const { data: initialMessages } = api.chat.getMessages.useQuery({
    threadId,
  });
  const utils = api.useUtils();
  const sendMessage = api.chat.sendMessage.useMutation({
    onSuccess: () => {
      void utils.chat.getMessageCount.invalidate();
    },
  });
  const saveMessage = api.chat.saveMessage.useMutation();

  const { messages, append, isLoading, setMessages } = useChat({
    api: "/api/chat",
    initialMessages: initialMessages?.map((m) => ({
      id: m.id,
      content: m.content,
      role: m.isFromUser ? "user" : "assistant",
      data: {
        attachments: m.attachments,
        model: m.model,
      },
    })),
    body: (messages) => {
      // Get the last user message to extract the model
      const lastUserMessage = messages.filter(m => m.role === "user").slice(-1)[0];
      const messageModel = (lastUserMessage?.data as any)?.model;
      const modelToUse = messageModel || currentModel;
      
      console.log("🎯 ChatView body function called:", {
        currentModel,
        messageModel,
        modelToUse,
        messagesCount: messages.length,
      });

      return {
        model: modelToUse,
        messages: messages.map(({ role, content }) => ({ role, content })),
      };
    },
    async onFinish(message) {
      await saveMessage.mutateAsync({
        threadId,
        content: message.content,
        isFromUser: false,
        model: currentModel,
      });
    },
  });

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // If we have initial messages from the database, check if we need to generate AI response
    if (initialMessages && initialMessages.length > 0) {
      const lastMessage = initialMessages[initialMessages.length - 1];
      // If the last message is from the user and we haven't loaded messages yet
      if (lastMessage?.isFromUser && messages.length === 0) {
        // Set the messages to include the user message, then trigger AI response
        setTimeout(() => {
          void append({
            role: "user",
            content: lastMessage?.content ?? "",
            data: {
              model: currentModel,
              attachments: lastMessage?.attachments ?? "[]",
            } as Record<string, string>,
          });
        }, 100);
      }
    }
  }, [initialMessages, messages, searchParams, append, currentModel]);

  const handleSendMessage = async (content: string, modelId: string, attachments?: string[]) => {
    console.log("🎯 ChatView handleSendMessage called with model:", modelId);
    
    // Update current model for the chat session
    setCurrentModel(modelId);
    
    await sendMessage.mutateAsync({
      threadId,
      content,
      attachments,
    });
    
    await append({
      role: "user",
      content,
      data: {
        model: modelId,
        attachments: JSON.stringify(attachments ?? []),
      } as Record<string, string>,
    });
  };

  const isNearBottom = () => {
    if (!messagesContainerRef.current) return true;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    return scrollHeight - scrollTop - clientHeight < 100;
  };

  return (
    <div className="flex flex-1 flex-col h-full relative">
      {/* Messages Container */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto"
        style={{ paddingBottom: "120px" }}
      >
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full min-h-[400px]">
              <div className="text-center space-y-4">
                <div className="text-2xl">👋</div>
                <div className="text-muted-foreground">
                  Start a conversation to begin chatting
                </div>
              </div>
            </div>
          )}
          
          {messages.map((message, index) => (
            <Message
              key={message.id}
              message={{
                id: message.id,
                content: message.content,
                isFromUser: message.role === "user",
                createdAt: new Date(),
                threadId: threadId,
                model: (message.data as { model?: string })?.model ?? "unknown",
                attachments: (message.data as { attachments?: string })?.attachments ?? null,
                parentId: null,
              }}
              isLast={index === messages.length - 1}
              isStreaming={isLoading && index === messages.length - 1 && message.role !== "user"}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Scroll to bottom button */}
      {!isNearBottom() && (
        <Button
          onClick={scrollToBottom}
          size="icon"
          className="fixed bottom-32 right-8 rounded-full shadow-lg z-10"
          variant="secondary"
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      )}

      {/* Chat Input - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-background/95 backdrop-blur border-t border-border/30">
        <div className="p-4">
          <ChatInput
            threadId={threadId}
            onSendMessage={handleSendMessage}
            isStreaming={isLoading}
            initialSelectedModel={currentModel}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatView;