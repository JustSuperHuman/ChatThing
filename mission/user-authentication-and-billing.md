# User Authentication and Billing

This document describes the user authentication flow, free trial, and subscription model for Chat Thang.

## Free Tier

- **Anonymous Access:** New users can access the application without creating an account.
- **Message Limit:** Unauthenticated users can send up to 10 messages.
- **Call to Action:** After the 10th message, the user will be prompted to create an account to continue using the service.

## Technology Stack

Authentication will be implemented using **NextAuth.js** with the **`@auth/prisma-adapter`**. This approach ensures that user sessions are tightly integrated with the SQLite database via Prisma, providing a seamless and secure authentication experience.

## Account Creation and Email Verification

- **Sign-up:** Users will sign up using their email address.
- **Verification:** Upon sign-up, a verification email will be sent to the user's email address using Mailjet.
- **Account Activation:** The user must click a link in the email to verify their account.

## Subscription and Billing

- **Pricing:** A subscription costs $1 per week.
- **Message Quota:** A paid subscription provides the user with 300 messages per week.
- **Payment Provider:** Stripe will be used to handle all payments and subscriptions.
