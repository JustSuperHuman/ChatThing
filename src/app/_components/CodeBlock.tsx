"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Clipboard, Download, WrapText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  language: string;
  code: string;
}

export default function CodeBlock({ language, code }: CodeBlockProps) {
  const [isTextWrapped, setIsTextWrapped] = useState(false);

  const handleCopy = () => {
    void navigator.clipboard.writeText(code);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${language}_code.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleTextWrap = () => {
    setIsTextWrapped(!isTextWrapped);
  };

  return (
    <div className="relative">
      <div className="absolute top-2 right-2 flex space-x-2">
        <Button variant="ghost" size="icon" onClick={handleCopy}>
          <Clipboard className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleDownload}>
          <Download className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleTextWrap}>
          <WrapText className="h-4 w-4" />
        </Button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          whiteSpace: isTextWrapped ? "pre-wrap" : "pre",
          overflowX: isTextWrapped ? "hidden" : "auto",
        }}
        wrapLongLines={isTextWrapped}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}