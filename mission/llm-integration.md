# LLM Integration with OpenRouter

Chat Thang will use OpenRouter as its backend to provide access to a variety of Large Language Models (LLMs).

## Configuration

The OpenRouter API key must be configured in the `.env` file:

```
OPENROUTER_API_KEY="your-openrouter-api-key"
```

## Enabled Models

The application will maintain a list of enabled models from OpenRouter. The default recommended model is `google/gemini-flash-1.5`.

## Model Icons

The UI will display an icon for each model. The icon will be determined by matching the model name against a predefined configuration file.

### Icon Matching Logic

1.  **Exact Match:** The system will first look for an exact match for the model ID in the `exact_matches` object.
2.  **Provider Match:** If no exact match is found, the system will check for a match with the provider name (the part before the `/`) in the `provider_matches` object.
3.  **Default Icon:** If no match is found, a default icon will be used.

### Icon Configuration

The icon configuration is as follows:

```json
{
  "ui": {
    "model_icons": {
      "exact_matches": {
        "claude": "https://claude.ai/images/claude_app_icon.png",
        "gemini": "https://www.gstatic.com/lamda/images/gemini_favicon_f069958c85030456e93de685481c559f160ea06b.png",
        "grok": "https://x.ai/favicon.ico",
        "llama": "https://static.xx.fbcdn.net/rsrc.php/y5/r/m4nf26cLQxS.ico",
        "qwen": "https://assets.alicdn.com/g/qwenweb/qwen-webui-fe/0.0.111/favicon.png",
        "deepseek": "https://www.deepseek.com/favicon.ico",
        "command": "https://cohere.com/favicon.ico",
        "mistral": "https://mistral.ai/favicon.ico",
        "mixtral": "https://mistral.ai/favicon.ico",
        "codestral": "https://mistral.ai/favicon.ico",
        "phi": "https://www.microsoft.com/favicon.ico",
        "wizard": "https://www.microsoft.com/favicon.ico",
        "orca": "https://www.microsoft.com/favicon.ico"
      },
      "provider_matches": {
        "openai": "/openai-svgrepo-com.svg",
        "arcee": "https://cdn.prod.website-files.com/6781a10424493fe352bc6cb5/678e92c91a0b8ea6a6ecbe34_webclip.png",
        "amazon": "https://m.media-amazon.com/images/I/31mpUpLsu9L._SL48_FMpng_.png",
        "anthropic": "https://claude.ai/images/claude_app_icon.png",
        "google": "https://www.gstatic.com/lamda/images/gemini_favicon_f069958c85030456e93de685481c559f160ea06b.png",
        "xai": "https://x.ai/favicon.ico",
        "meta": "https://static.xx.fbcdn.net/rsrc.php/y5/r/m4nf26cLQxS.ico",
        "mistral": "https://mistral.ai/favicon.ico",
        "mistralai": "https://mistral.ai/favicon.ico",
        "alibaba": "https://assets.alicdn.com/g/qwenweb/qwen-webui-fe/0.0.111/favicon.png",
        "deepseek": "https://www.deepseek.com/favicon.ico",
        "cohere": "https://cohere.com/favicon.ico",
        "huggingface": "https://huggingface.co/front/assets/huggingface_logo.svg",
        "openhands": "https://mintlify.s3-us-west-1.amazonaws.com/allhandsai/_generated/favicon/apple-touch-icon.png",
        "together": "https://together.ai/favicon.ico",
        "perplexity": "https://www.perplexity.ai/favicon.ico",
        "groq": "https://groq.com/favicon.ico",
        "replicate": "https://replicate.com/favicon.ico",
        "opengvlab": "https://static.openxlab.org.cn/gvlab/static/main/common/favicon.svg",
        "fireworks": "https://fireworks.ai/favicon.ico",
        "anyscale": "https://www.anyscale.com/favicon.ico",
        "microsoft": "https://www.microsoft.com/favicon.ico",
        "ollama": "https://ollama.com/public/icon-48x48.png"
      },
      "default_icon": "/static/favicon.png"
    }
  }
}
```
