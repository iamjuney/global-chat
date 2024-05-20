# 📨Chatteee

Chatteee is a global chat app that allows users to chat with each other in real-time. Users can log in using Github OAuth, and chat with other users. The app is built using **[Sveltekit](https://kit.svelte.dev/)**, **[Supabase](https://supabase.com/)**, **[Shadcn](https://www.shadcn-svelte.com/)**, **[DrizzleORM](https://orm.drizzle.team/)**, and **[Lucia Auth](https://lucia-auth.com/)**.

## Installation

1. Clone the repository
2. Install dependencies
   `pnpm install`
3. Copy the `.env.example` file to `.env` and fill in the required environment variables
4. Run the app
   `pnpm dev`

## Setup Supabase

1. Create a new project on [Supabase](https://supabase.com/)
2. Push the schema using the following command
   `pnpm run db:push`
3. Go to your supabase project /database/publications and turn on the `realtime` option for the `chats` table
