"use client";

import { useState, type FC } from "react";
import { useSession } from "next-auth/react";
import { Check, Copy, MoreHorizontal, RotateCcw, ThumbsDown, ThumbsUp } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { type Message } from "@prisma/client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { models } from "@/lib/models";
import CodeBlock from "./CodeBlock";

interface MessageProps {
  message: Message;
  isLast?: boolean;
  isStreaming?: boolean;
}

const Message: FC<MessageProps> = ({ message, isLast = false, isStreaming = false }) => {
  const { data: session } = useSession();
  const { content, isFromUser, attachments, model } = message;
  const [isCopied, setIsCopied] = useState(false);

  const parsedAttachments = attachments
    ? (JSON.parse(attachments) as string[])
    : [];

  const isImage = (url: string) => {
    return /\.(jpg|jpeg|png|gif)$/.test(url);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getModelIcon = (modelId: string) => {
    const model = models.find(m => m.model_id === modelId);
    return model?.icon;
  };

  const getModelName = (modelId: string) => {
    const model = models.find(m => m.model_id === modelId);
    return model?.name ?? modelId;
  };

  if (isFromUser) {
    return (
      <div className="group flex items-start gap-4 p-6 max-w-4xl mx-auto">
        <div className="flex-1" />
        <div className="max-w-2xl flex items-end gap-2">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              className="h-8 px-2"
            >
              {isCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            </Button>
          </div>
          <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-2xl px-4 py-3">
            <div className="whitespace-pre-wrap break-words">
              {content}
            </div>
            {parsedAttachments.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {parsedAttachments.map((url, index) => (
                  <div key={index}>
                    {isImage(url) ? (
                      <img
                        src={url}
                        alt={`attachment ${index + 1}`}
                        className="max-w-xs rounded-lg"
                      />
                    ) : (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/80 hover:text-white underline"
                      >
                        {url.split("/").pop()}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={session?.user?.image ?? undefined} />
          <AvatarFallback className="bg-gradient-to-r from-pink-500 to-orange-500 text-white text-sm">
            {session?.user?.name?.[0] ?? "J"}
          </AvatarFallback>
        </Avatar>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-4 p-6 max-w-4xl mx-auto group">
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarImage 
          src={getModelIcon(model)} 
          alt={getModelName(model)}
          className="object-contain"
        />
        <AvatarFallback className="bg-muted text-xs">
          {getModelName(model).slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <ReactMarkdown
            components={{
              code({ node, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className ?? "");
                return match ? (
                  <CodeBlock
                    language={match[1] ?? ""}
                    code={String(children as string).replace(/\n$/, "")}
                  />
                ) : (
                  <code 
                    className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" 
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              p({ children }) {
                return <p className="mb-4 last:mb-0 leading-relaxed">{children}</p>;
              },
              ul({ children }) {
                return <ul className="mb-4 last:mb-0 space-y-1">{children}</ul>;
              },
              ol({ children }) {
                return <ol className="mb-4 last:mb-0 space-y-1">{children}</ol>;
              },
              h1({ children }) {
                return <h1 className="text-xl font-semibold mb-3 mt-6 first:mt-0">{children}</h1>;
              },
              h2({ children }) {
                return <h2 className="text-lg font-semibold mb-2 mt-5 first:mt-0">{children}</h2>;
              },
              h3({ children }) {
                return <h3 className="text-base font-semibold mb-2 mt-4 first:mt-0">{children}</h3>;
              },
            }}
          >
            {content}
          </ReactMarkdown>
          
          {isStreaming && (
            <div className="flex items-center gap-1 mt-2">
              <div className="animate-pulse bg-muted-foreground rounded-full h-2 w-2" />
              <div className="animate-pulse bg-muted-foreground rounded-full h-2 w-2" style={{ animationDelay: '0.2s' }} />
              <div className="animate-pulse bg-muted-foreground rounded-full h-2 w-2" style={{ animationDelay: '0.4s' }} />
            </div>
          )}
        </div>
        
        {parsedAttachments.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-3">
            {parsedAttachments.map((url, index) => (
              <div key={index}>
                {isImage(url) ? (
                  <img
                    src={url}
                    alt={`attachment ${index + 1}`}
                    className="max-w-sm rounded-lg border border-border"
                  />
                ) : (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {url.split("/").pop()}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Action buttons */}
        <div className="flex items-center gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="h-8 px-2"
          >
            {isCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2"
          >
            <ThumbsUp className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2"
          >
            <ThumbsDown className="h-3 w-3" />
          </Button>
          {isLast && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2"
            >
              <RotateCcw className="h-3 w-3" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2"
          >
            <MoreHorizontal className="h-3 w-3" />
          </Button>
        </div>
        
        {/* Model info */}
        <div className="text-xs text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {model !== "user" && model !== "unknown" && (
            <span>Generated by {getModelName(model)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;