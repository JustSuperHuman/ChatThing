# 🏆 T3 Chat Clone - 2025 Clonethon Entry

> **Competing for the ultimate prize!** 🎯 This is our submission to the **2025 Clonethon** hosted by [@theo](https://github.com/t3dotgg) - a

## 🚀 Project Overview

**Chat Thang** is a ~~modern~~ basic-af, ~~feature~~bug-rich chat application that provides seamless access to multiple Large Language Models (LLMs) through a single, ~~elegant~~ interface. Built with the T3 Stack and designed to compete with ~~the best~~ **that guy who unrandomizes UUIDs for breakfast**, this application delivers ~~enterprise~~passing-grade features with a focus on user experience and performance.

TBH - Works, but not well and with nothing novel. If it places, maybe I'll build on it! I did it mostly for (ai generated) speed and as of submission it took ~5 hours.

### ✨ What Makes This Special

This ~~isn't~~ is literally just another chat app - it's a ~~comprehensive~~ C- from a generous professor LLM wrapper that brings together the ~~best~~ most affordable AI models from OpenAI, Anthropic, Google, Meta, and more, all accessible through one ~~beautifully~~ vibe designed interface.

## 🎯 Core Features (Competition Requirements)

### ✅ Chat with Various LLMs

- **12+ Premium Models** including GPT-4o, Claude 3.5 Sonnet, Gemini 2.5 Pro, Llama 3.1, and more
- **Smart Model Selection** with detailed descriptions, tags, and capabilities
- **Real-time Streaming** responses for instant feedback
- **OpenRouter Integration** for reliable API access

### ✅ Authentication & Sync

- **NextAuth.js** with email and GitHub providers
- **Persistent Chat History** across all devices
- **User Settings & Preferences** with full customization (untested)
- **Secure Session Management** with Prisma adapter

### ✅ Browser Friendly

- **Fully Responsive Design** optimized for desktop, tablet, and mobile
- **Modern UI/UX** with Tailwind CSS and Radix UI components
- **Dark/Light Theme Support** with system preference detection
- **Progressive Web App** capabilities

### ✅ Easy to Try

- **Free Tier Access** with message limits for new users
- **No Credit Card Required** to start chatting
- **Instant Setup** - just sign up and start chatting
- **Guest Mode** for quick testing (local storage)

## 🌟 Bonus Features Implemented

### 🎨 Syntax Highlighting

- **React Syntax Highlighter** with Prism.js
- **50+ Programming Languages** supported
- **Copy & Download** code blocks with one click
- **Text Wrapping Toggle** for better readability

### 🤖 Model Selection & Management

- **Visual Model Picker** with icons and descriptions
- **Smart Tagging System** (Fast, Vision, Reasoning, etc.)
- **Model Capabilities** clearly displayed
- **User Preferences** for favorite models

### 💾 Chat History & Management

- **Thread-based Conversations** with unique URLs
- **Local & Cloud Sync** for seamless experience
- **Chat Titles** automatically generated
- **Search & Filter** through chat history

### 🎨 Modern UI/UX

- **Framer Motion** animations for smooth interactions
- **Custom Component Library** built on Radix UI
- **Consistent Design System** with CSS variables
- **Accessibility First** approach

### 📁 File Upload Support

- **Image Upload** for vision-capable models
- **PDF Processing** for document analysis
- **Upload.io Integration** for reliable file handling
- **Drag & Drop** interface

### 🔧 Advanced Customization

- **User Settings Panel** with multiple tabs
- **Font Customization** (main text and code fonts)
- **Theme Preferences** and visual options
- **AI Personality Traits** configuration

## 🛠️ Tech Stack

### Core Framework

- **[Next.js 15](https://nextjs.org)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[tRPC](https://trpc.io)** - End-to-end typesafe APIs
- **[Prisma](https://prisma.io)** - Next-generation ORM

### Authentication & Database

- **[NextAuth.js](https://next-auth.js.org)** - Authentication solution
- **[SQLite](https://www.sqlite.org/)** - Lightweight database
- **[Prisma Adapter](https://authjs.dev/reference/adapter/prisma)** - Database integration

### UI & Styling

- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Lucide React](https://lucide.dev/)** - Beautiful icons

### AI & APIs

- **[AI SDK](https://sdk.vercel.ai/)** - Vercel's AI SDK for streaming
- **[OpenRouter](https://openrouter.ai/)** - Access to multiple LLM providers
- **[React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)** - Code highlighting

### Additional Tools

- **[Stripe](https://stripe.com)** - Payment processing
- **[Upload.io](https://upload.io)** - File upload service
- **[React Hook Form](https://react-hook-form.com/)** - Form management
- **[Zod](https://zod.dev/)** - Schema validation

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** or **Bun** (recommended)
- **Git** for version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/chat-thang.git
   cd chat-thang
   ```

2. **Install dependencies**

   ```bash
   # Using bun (recommended)
   bun install

   # Or using npm
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

4. **Configure your `.env` file**

   ```env
   # Required for basic functionality
   NEXTAUTH_SECRET="your-secret-here"
   NEXTAUTH_URL="http://localhost:3000"
   DATABASE_URL="file:./dev.db"

   # Required for AI features
   OPENROUTER_API_KEY="sk-or-v1-your-key-here"

   # Optional: For file uploads
   UPLOAD_IO_API_KEY="public_your-key-here"

   # Optional: For payments
   STRIPE_SECRET_KEY="sk_test_your-key-here"
   ```

5. **Set up the database**

   ```bash
   bun run db:push
   ```

6. **Start the development server**

   ```bash
   bun run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Environment Setup

### Required Environment Variables

| Variable             | Description                       | Required |
| -------------------- | --------------------------------- | -------- |
| `NEXTAUTH_SECRET`    | NextAuth.js secret key            | ✅       |
| `NEXTAUTH_URL`       | Application URL                   | ✅       |
| `DATABASE_URL`       | Prisma database connection        | ✅       |
| `OPENROUTER_API_KEY` | OpenRouter API key for LLM access | ✅       |

### Optional Environment Variables

| Variable                | Description                 | Required |
| ----------------------- | --------------------------- | -------- |
| `UPLOAD_IO_API_KEY`     | File upload service         | ❌       |
| `STRIPE_SECRET_KEY`     | Payment processing          | ❌       |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook verification | ❌       |
| `MAILJET_API_KEY`       | Email service               | ❌       |
| `MAILJET_SECRET_KEY`    | Email service secret        | ❌       |

### Getting API Keys

1. **OpenRouter**: Sign up at [openrouter.ai](https://openrouter.ai) and get your API key
2. **Upload.io**: Create account at [upload.io](https://upload.io) for file uploads
3. **Stripe**: Set up at [stripe.com](https://stripe.com) for payment processing

## 📱 Usage

### Starting a Chat

1. **Sign up** with email or GitHub
2. **Select a model** from the dropdown (12+ options available)
3. **Start chatting** - responses stream in real-time
4. **Upload files** for vision-capable models

### Managing Conversations

- **Create new threads** for different topics
- **Switch between conversations** using the sidebar
- **Search chat history** to find previous discussions
- **Share conversations** with public links

### Customization

- **Access Settings** via the user menu
- **Customize appearance** with themes and fonts
- **Configure AI behavior** with personality traits
- **Manage model preferences** and enabled models

## 🏆 Competition Compliance

### Open Source License

This project is released under the **MIT License**, making it fully open source and compliant with Clonethon requirements.

### Core Requirements Met

- ✅ **Chat with Various LLMs** - 12+ models supported
- ✅ **Authentication & Sync** - Full user system with persistent data
- ✅ **Browser Friendly** - Responsive design, works everywhere
- ✅ **Easy to Try** - Free tier, no barriers to entry

### Bonus Features Delivered

- ✅ **Syntax Highlighting** - Professional code rendering
- ✅ **Model Selection** - Rich model picker with descriptions
- ✅ **Chat History** - Persistent, searchable conversations
- ✅ **Modern UI/UX** - Beautiful, accessible interface

## 📊 Project Stats

- **📁 100+ Files** - Comprehensive codebase
- **🎨 50+ UI Components** - Reusable design system
- **🤖 12+ AI Models** - Diverse LLM selection
- **⚡ Real-time Streaming** - Instant response delivery
- **📱 Mobile Optimized** - Works on all devices

## 🙏 Acknowledgments

- **[@theo](https://github.com/t3dotgg)** for hosting the 2025 Clonethon and inspiring the community
- **[T3 Stack](https://create.t3.gg/)** for the amazing foundation and tools
- **[OpenRouter](https://openrouter.ai)** for providing access to multiple LLM providers
- **The Open Source Community** for all the incredible tools and libraries

---

<div align="center">

**Built with ❤️ for the 2025 Clonethon**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/chat-thang)

</div>
