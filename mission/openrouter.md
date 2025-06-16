# Using AI SDK 4.0 with OpenRouter

## Overview

OpenRouter is a unified API gateway that provides access to hundreds of AI models from leading providers like Anthropic, Google, Meta, Mistral, and more. This guide shows how to use OpenRouter with AI SDK 4.0, including the new streaming approach.

## Key Benefits

- **Universal Model Access**: One API key for hundreds of models from multiple providers
- **Cost-Effective**: Pay-as-you-go pricing with no monthly fees or commitments
- **Transparent Pricing**: Clear per-token costs for all models
- **High Availability**: Enterprise-grade infrastructure with automatic failover
- **Simple Integration**: Standardized API across all models
- **Latest Models**: Immediate access to new models as they're released

## Installation

```bash
pnpm add @openrouter/ai-sdk-provider ai
```

## Basic Setup

```javascript
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";

// Create OpenRouter provider instance
const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY, // Get from https://openrouter.ai/dashboard
});
```

## Streaming with OpenRouter (AI SDK 4.0)

### Important: StreamingTextResponse is Removed

In AI SDK 4.0, `StreamingTextResponse` has been removed. Use `streamText().toDataStreamResponse()` instead.

### Basic Streaming Example

```javascript
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";

export async function POST(req) {
  const { messages } = await req.json();

  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const result = streamText({
    model: openrouter.chat("anthropic/claude-3.5-sonnet"),
    messages,
  });

  // New way to create streaming response (replaces StreamingTextResponse)
  return result.toDataStreamResponse();
}
```

### Streaming with Custom Options

```javascript
const result = streamText({
  model: openrouter.chat("meta-llama/llama-3.1-405b-instruct"),
  messages,
  temperature: 0.7,
  maxTokens: 1000,
});

// Configure response options
return result.toDataStreamResponse({
  headers: {
    "X-Model-Used": "llama-3.1-405b",
  },
  sendUsage: true, // Include token usage data
  sendReasoning: false, // Include reasoning data (if available)
  sendSources: false, // Include source data (if available)
});
```

## Available Models

OpenRouter supports both chat and completion models:

```javascript
// Chat models (recommended)
const chatModel = openrouter.chat("anthropic/claude-3.5-sonnet");
const gpt4 = openrouter.chat("openai/gpt-4-turbo");
const llama = openrouter.chat("meta-llama/llama-3.1-405b-instruct");

// Completion models
const completionModel = openrouter.completion(
  "meta-llama/llama-3.1-405b-instruct",
);
```

## Full Example: Next.js API Route

```javascript
// app/api/chat/route.js
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const openrouter = createOpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const result = streamText({
      model: openrouter.chat("anthropic/claude-3.5-sonnet"),
      messages,
      temperature: 0.7,
      maxTokens: 2000,
    });

    // Use the new toDataStreamResponse() method
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("OpenRouter API error:", error);
    return new Response("Error processing request", { status: 500 });
  }
}
```

## Client-Side Integration

```javascript
// app/chat/page.jsx
"use client";

import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>
          <strong>{message.role}:</strong> {message.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
```

## Advanced Usage

### Using Different Models

```javascript
// Switch between models easily
const models = {
  claude: openrouter.chat("anthropic/claude-3.5-sonnet"),
  gpt4: openrouter.chat("openai/gpt-4-turbo"),
  llama: openrouter.chat("meta-llama/llama-3.1-405b-instruct"),
  mistral: openrouter.chat("mistralai/mistral-large"),
};

const result = streamText({
  model: models.claude, // Easy to switch
  messages,
});

return result.toDataStreamResponse();
```

### Non-Streaming Usage

```javascript
import { generateText } from "ai";

const { text, usage } = await generateText({
  model: openrouter.chat("anthropic/claude-3.5-sonnet"),
  prompt: "Explain quantum computing in simple terms",
});

console.log("Response:", text);
console.log("Tokens used:", usage);
```

## Migration Summary

If you're migrating from AI SDK 3.x to 4.0 with OpenRouter:

1. Remove any imports of `StreamingTextResponse`
2. Use `streamText()` instead of direct model calls
3. Replace `new StreamingTextResponse(stream)` with `result.toDataStreamResponse()`
4. Update your error handling to work with the new API

## Resources

- [OpenRouter Dashboard](https://openrouter.ai/dashboard) - Get your API key
- [OpenRouter Models](https://openrouter.ai/models) - Browse available models
- [AI SDK Documentation](https://sdk.vercel.ai/docs) - Full AI SDK docs
- [OpenRouter Documentation](https://openrouter.ai/docs) - OpenRouter-specific features

## Tips

1. **Model Selection**: Choose models based on your needs - Claude for complex reasoning, GPT-4 for general tasks, Llama for open-source requirements
2. **Cost Optimization**: Monitor usage through the OpenRouter dashboard
3. **Error Handling**: Always implement proper error handling for API failures
4. **Environment Variables**: Never expose your API key in client-s
