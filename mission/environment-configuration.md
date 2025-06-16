# Environment Configuration

All environment-specific settings and secrets must be managed through a `.env` file in the root of the project. A `.env.example` file should be maintained to show all the required variables.

## Database

The application will use SQLite.

```
DATABASE_URL="file:./dev.db"
```

## User Authentication (Mailjet)

Mailjet will be used for sending verification emails.

```
MAILJET_API_KEY="your-mailjet-api-key"
MAILJET_SECRET_KEY="your-mailjet-secret-key"
```

## Billing (Stripe)

Stripe will be used for handling subscriptions.

```
STRIPE_PUBLIC_KEY="your-stripe-public-key"
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"
```

## OpenRouter (LLM Provider)

OpenRouter will be used to access various LLMs.

```
OPENROUTER_API_KEY="your-openrouter-api-key"
```

## ImageRouter (Image Generation)

ImageRouter will be used for generating images.

```
IMAGEROUTER_API_KEY="your-imagerouter-api-key"
```

## Authentication (NextAuth.js)
 
```
# The base URL of the application.
NEXTAUTH_URL="http://localhost:3000"
 
# A secret used to sign and encrypt tokens.
# Generate a new secret with: `openssl rand -hex 32`
NEXTAUTH_SECRET="a-secure-random-string"
```
