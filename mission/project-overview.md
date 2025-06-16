# Project Overview: Chat Thang

This document outlines the core features and architecture for "Chat Thang", a web-based chat application.

## Core Concept

Chat Thang is a large language model (LLM) wrapper that provides users with access to various chat models through a single interface. It is built for a clonethon competition.

## High-Level Requirements

- **Hosting:** The application will be hosted at `jamesgreene.com`.
- **Backend:** The backend will integrate with OpenRouter to access different LLMs.
- **Database:** The application will use SQLite for data storage.
- **Authentication:** A simple email-based authentication system will be implemented, using Mailjet for email verification.
- **Billing:** Users will have a free trial period and then can subscribe to a paid plan using Stripe.
- **Configuration:** All sensitive configurations and settings will be managed through `.env` files.

This documentation is organized into separate files for each major component of the application.
