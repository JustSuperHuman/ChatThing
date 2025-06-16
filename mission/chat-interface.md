# Chat Interface

This document describes the features and functionality of the main chat interface for Chat Thang.

## Core Experience

- **Real-time Streaming:** Responses from the OpenRouter API will be streamed to the user in real-time whenever possible to provide immediate feedback.
- **Persistent Chat History:** All chat conversations (threads) are saved to the user's account. Users can navigate away from the page and return to their conversations later.
- **Responsive Design:** The interface must be fully functional and visually appealing on both desktop and mobile devices.
- **Code Rendering:** The interface will correctly render code blocks with syntax highlighting.

## Key Features

- **Thread Management:**

  - Conversations are organized into threads.
  - A sidebar displays a list of past threads, grouped by time ("Today," "Last 30 Days," "Older").
  - Users can start a new chat at any time.
  - A search bar allows users to find specific threads.
  - **Chat Branching:** Users can create an alternative conversation path by branching from any message in a thread.
  - **Chat Sharing:** Users can generate a unique, public link to share a read-only version of a conversation thread.
  - **Collapsible Sidebar:** The sidebar contains the user's thread history and can be toggled to maximize the chat area for a more focused view.

- **Message Composition & Controls:**

  - **Floating Input Bar:** The main chat input bar will be "sticky" or "floating" at the bottom of the viewport, ensuring it is always accessible without having to scroll.
  - **Model Selector:** A dropdown menu in the input bar allows users to switch between their enabled models for each message.
  - **File Attachments:** An icon button allows users to attach files to their messages.
  - **Web Search:** A toggle to enable or disable web search capabilities for the current query.
  - **Send Button:** A prominent button to send the message.
  - **Scroll to Bottom:** When the user scrolls up through the chat history, a "Scroll to bottom" button will appear, allowing them to quickly jump back to the most recent messages.

- **Initial State:**
  - When starting a new chat, the interface will greet the user by name.
  - Suggestion chips (e.g., "Create," "Explore," "Code," "Learn") and example prompts will be displayed to help the user get started.
