# Petapon 🎀

A tiny local prototype of a community-powered photo gachapon.

## What it does

- Upload an image
- Give it a name and caption
- Add it to the local gachapon pool
- Pull a random capsule
- Store everything in your browser's localStorage

## Run it

Install Node.js 18.18+ or newer.

Then:

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Important

This is a prototype. Images and submissions are stored only in your browser using localStorage. If you clear browser data, they disappear.

For a real public website, replace localStorage with a backend such as Supabase, add authentication, server-side random selection, image moderation, reporting, rate limits, and secure file validation.
