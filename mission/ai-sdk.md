# AI SDK 4.0 Migration: StreamingTextResponse Removal

## Breaking Change

In AI SDK 4.0, `StreamingTextResponse` has been removed. This class was previously used to create streaming responses for text generation.

## Migration Guide

### Before (AI SDK 3.x)

```javascript
import { StreamingTextResponse } from "ai";

// Old approach
const response = new StreamingTextResponse(stream);
```

### After (AI SDK 4.0)

```javascript
import { streamText } from "ai";

// New approach
const result = streamText({
  model: yourModel,
  prompt: yourPrompt,
});

// Convert to response
const response = result.toDataStreamResponse();
```

## Why This Change?

The removal of `StreamingTextResponse` is part of AI SDK 4.0's streamlined API design. The new `streamText` function provides a more unified and powerful approach to streaming, with built-in methods like `toDataStreamResponse()` that handle the response creation automatically.

## Key Benefits

- **Unified API**: All streaming functionality is now centralized in the `streamText` function
- **Better Type Safety**: The new approach provides improved TypeScript support
- **More Features**: `toDataStreamResponse()` includes additional options for controlling usage data, reasoning, and sources in the stream

## Additional Options

The `toDataStreamResponse()` method accepts optional configuration:

```javascript
const response = result.toDataStreamResponse({
  status: 200,
  headers: { "Custom-Header": "value" },
  sendUsage: true, // Include token usage (default: true)
  sendReasoning: false, // Include reasoning data (default: false)
  sendSources: false, // Include source data (default: false)
});
```

This migration is required when upgrading to AI SDK 4.0 and affects all code using `StreamingTextResponse`.
