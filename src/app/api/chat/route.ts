import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText, type CoreMessage } from "ai";
import { type NextRequest } from "next/server";

import { env } from "@/env";

type ChatRequest = {
  messages: CoreMessage[];
  data?: { model?: string };
  model?: string;
};

export const runtime = "edge";

const openrouter = createOpenRouter({
  apiKey: env.OPENROUTER_API_KEY,
});

export async function POST(req: NextRequest) {
  let data: ChatRequest["data"] | undefined;
  try {
    const requestBody: ChatRequest = await req.json();
    console.log("🔥 Raw request body:", JSON.stringify(requestBody, null, 2));

    const { messages, data: requestData, model } = requestBody;
    data = requestData;

    console.log("🔥 Chat API received:", {
      messagesCount: messages.length,
      data,
      model: data?.model || model,
      lastMessage: messages[messages.length - 1],
    });

    // Extract model from multiple possible locations
    const lastUserMessage = messages.filter(m => m.role === "user").slice(-1)[0];
    const modelFromMessageData = (lastUserMessage?.data as any)?.model;
    const modelId = data?.model || model || modelFromMessageData || "google/gemini-flash-1.5";
    
    console.log("🔥 Model resolution:", {
      topLevelData: data?.model,
      topLevelModel: model,
      messageData: modelFromMessageData,
      finalModel: modelId
    });
    console.log("🔥 Available models in OpenRouter:", {
      "google/gemini-flash-1.5": "Gemini Flash",
      "anthropic/claude-3.5-sonnet": "Claude Sonnet",
      "openai/gpt-4o": "GPT-4o",
    });

    console.log("🔥 About to call OpenRouter with model:", modelId);

    const result = streamText({
      model: openrouter.chat(modelId),
      messages,
      temperature: 0.7,
      maxTokens: 2000,
    });

    console.log("🔥 OpenRouter call successful, returning stream");

    // Use the new toDataStreamResponse() method (replaces StreamingTextResponse)
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("🔥 OpenRouter API error:", error);
    console.error("🔥 Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      modelId: data?.model ?? "google/gemini-flash-1.5",
    });
    return new Response(
      `Error processing request: ${error instanceof Error ? error.message : "Unknown error"}`,
      { status: 500 },
    );
  }
}
