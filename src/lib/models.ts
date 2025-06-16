export interface Model {
  name: string;
  model_id: string;
  icon: string;
  tags: string[];
  description: string;
  url: string | null;
}

export const models: Model[] = [
  {
    name: "Gemini 2.5 Flash",
    model_id: "google/gemini-flash-1.5",
    icon: "https://www.gstatic.com/lamda/images/gemini_favicon_f069958c85030456e93de685481c559f160ea06b.png",
    tags: ["Fast", "Accurate", "Web Search"],
    description:
      "Google's latest fast model, known for speed and accuracy (and also web search!).",
    url: null,
  },
  {
    name: "Gemini 2.5 Pro",
    model_id: "google/gemini-pro-2.5",
    icon: "https://www.gstatic.com/lamda/images/gemini_favicon_f069958c85030456e93de685481c559f160ea06b.png",
    tags: ["Advanced", "Complex Reasoning", "Problem-Solving", "Vision"],
    description:
      "Google's most advanced model, excelling at complex reasoning and problem-solving.",
    url: null,
  },
  {
    name: "GPT ImageGen",
    model_id: "openai/dall-e-3",
    icon: "/openai-svgrepo-com.svg",
    tags: ["Image Generation", "Vision"],
    description:
      "OpenAI's latest and greatest image generation model, using lots of crazy tech like custom tools for text and reflections.",
    url: null,
  },
  {
    name: "GPT-4o-mini",
    model_id: "openai/gpt-4o-mini",
    icon: "/openai-svgrepo-com.svg",
    tags: ["Fast", "Non-reasoning", "Vision", "Search"],
    description: "Like gpt-4o, but faster.",
    url: null,
  },
  {
    name: "GPT-4o",
    model_id: "openai/gpt-4o",
    icon: "/openai-svgrepo-com.svg",
    tags: ["Non-reasoning", "Vision", "Search"],
    description: "OpenAI's flagship non-reasoning model.",
    url: null,
  },
  {
    name: "GPT-4.1",
    model_id: "openai/gpt-4-turbo",
    icon: "/openai-svgrepo-com.svg",
    tags: [
      "Advanced Instruction",
      "Software Engineering",
      "Long-context Reasoning",
      "Vision",
      "Search",
    ],
    description:
      "GPT-4.1 is a flagship large language model optimized for advanced instruction following, real-world software engineering, and long-context reasoning.",
    url: null,
  },
  {
    name: "Anthropic Claude 3.5 Sonnet",
    model_id: "anthropic/claude-3.5-sonnet",
    icon: "https://claude.ai/images/claude_app_icon.png",
    tags: ["Smart", "Complex Problems", "Vision", "PDFs", "Search"],
    description: "Smart model for complex problems.",
    url: null,
  },
  {
    name: "Anthropic Claude 3 Opus",
    model_id: "anthropic/claude-3-opus",
    icon: "https://claude.ai/images/claude_app_icon.png",
    tags: ["Latest", "Greatest", "Vision", "Reasoning", "Search"],
    description: "The latest and greatest from Anthropic.",
    url: null,
  },
  {
    name: "Meta Llama 3.1 70b",
    model_id: "meta-llama/llama-3.1-70b-instruct",
    icon: "https://static.xx.fbcdn.net/rsrc.php/y5/r/m4nf26cLQxS.ico",
    tags: ["Open Source", "Industry-leading Speed", "Fast", "Search"],
    description: "Industry-leading speed in an open source model.",
    url: null,
  },
  {
    name: "DeepSeek v2",
    model_id: "deepseek/deepseek-chat",
    icon: "https://www.deepseek.com/favicon.ico",
    tags: ["685B MoE", "Latest", "Search"],
    description:
      "DeepSeek V2, a 236B-parameter, mixture-of-experts model, is the latest iteration of the flagship chat model family from the DeepSeek team.",
    url: null,
  },
  {
    name: "DeepSeek Coder",
    model_id: "deepseek/deepseek-coder",
    icon: "https://www.deepseek.com/favicon.ico",
    tags: ["Open Source", "Reasoning", "Search"],
    description:
      "The open source reasoning model that shook the whole industry.",
    url: null,
  },
  {
    name: "Grok-1.5",
    model_id: "xai/grok-1.5-chat",
    icon: "https://x.ai/favicon.ico",
    tags: ["Flagship", "Data Extraction", "Coding", "Summarization", "Search"],
    description:
      "AI's flagship model that excels at data extraction, coding, and text summarization.",
    url: null,
  },
  {
    name: "Qwen 2 72b",
    model_id: "qwen/qwen-2-72b-instruct",
    icon: "https://assets.alicdn.com/g/qwenweb/qwen-webui-fe/0.0.111/favicon.png",
    tags: ["Open Source", "High Reasoning", "Search"],
    description:
      "A surprisingly smart reasoning model that punches way above its weight.",
    url: null,
  },
];
