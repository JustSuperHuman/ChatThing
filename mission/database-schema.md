# Database Schema

The application will use a SQLite database. The schema is defined below using Prisma-like syntax for clarity.

## User Table

Stores information about registered users.

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  Subscription  Subscription?
  threads       Thread[]
  settings      UserSettings?
}
```

## UserSettings Table

Stores user-specific customization settings.

```prisma
model UserSettings {
  id                      String   @id @default(cuid())
  userId                  String   @unique
  user                    User     @relation(fields: [userId], references: [id])

  // Profile Settings
  profession              String?  // e.g., "Engineer, student, etc."
  aiTraits                String?  // JSON string array of traits like ["friendly", "witty"]
  userPreferences         String?  // For "Anything else T3 Chat should know about you?"

  // Visual Options
  boringTheme             Boolean  @default(false)
  hidePersonalInfo        Boolean  @default(false)
  disableThematicBreaks   Boolean  @default(false)
  statsForNerds           Boolean  @default(false)
  mainTextFont            String   @default("Proxima Vara")
  codeFont                String?

  // Model Management
  enabledModels           String? // JSON string array of model_ids
}
```

## Thread Table

Organizes messages into distinct conversations.

```prisma
model Thread {
  id        String    @id @default(cuid())
  title     String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  userId    String
  user      User      @relation(fields: [userId], references: [id])
  messages  Message[]

  // Sharing
  isShared  Boolean   @default(false)
  shareId   String?   @unique // Unique ID for public sharing
}
```

## Message Table

Stores all messages sent by users within a thread.

```prisma
model Message {
  id        String   @id @default(cuid())
  content   String
  createdAt DateTime @default(now())
  threadId  String
  thread    Thread   @relation(fields: [threadId], references: [id])
  model     String   // e.g., "openai/chatgpt-4o-latest"
  isFromUser Boolean // True for user messages, false for AI responses
  attachments String? // JSON string array of file URLs

  // Branching
  parentId  String?
  parent    Message? @relation("MessageChildren", fields: [parentId], references: [id], onDelete: NoAction, onUpdate: NoAction)
  children  Message[] @relation("MessageChildren")
}
```

## Subscription Table

Manages user subscriptions with Stripe.

```prisma
model Subscription {
  id                     String    @id @default(cuid())
  userId                 String    @unique
  user                   User      @relation(fields: [userId], references: [id])
  stripeCustomerId       String    @unique
  stripeSubscriptionId   String?   @unique
  stripePriceId          String?
  stripeCurrentPeriodEnd DateTime?
}
