# Feature Scope

This document provides a high-level checklist of all features to be included in the Chat Thang application, based on the project requirements.

## Core Requirements

- [x] **Chat with Various LLMs:** The application supports multiple language models and providers, managed through a user-facing model selection screen.
- [x] **Authentication & Sync:** Full user authentication with persistent, synchronized chat history across sessions.
- [x] **Browser Friendly:** The application is fully responsive and designed to work flawlessly on modern web browsers on both desktop and mobile.
- [x] **Easy to Try:** A free tier with a message limit allows new users to try the application's core functionality without creating an account.

## Bonus Features

- [x] **Attachment Support:** Users can upload files (images, PDFs) to be sent to compatible models.
- [x] **Syntax Highlighting:** Code blocks in chat messages are rendered with proper formatting and syntax highlighting.
- [x] **Image Generation Support:** The model list includes AI models specifically designed for image generation.
- [x] **Resumable Streams:** The application will stream responses in real-time. Chat history is saved, allowing users to continue conversations after a page refresh.
- [x] **Web Search:** Models with web search capabilities are available and clearly tagged.
- [x] **Chat Branching:** Users can create alternative conversation paths from any message in a thread.
- [x] **Chat Sharing:** Users can generate a public link to share a specific chat thread.
- [x] **Mobile App:** The responsive web design ensures a seamless experience on mobile devices.

## Out of Scope

- **Bring Your Own Key (BYOK):** Users will not be able to use their own personal API keys for the models. All API access will be managed through the application's central configuration.
