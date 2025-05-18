
# ReproNLP 2025 App for surveys

Simple Next.js app that uses [Vercel KV for Redis](https://vercel.com/kv).

### Setup

We use [pnpm](https://pnpm.io/installation) for package installation:

```bash
pnpm install
```

Once that's done, copy the .env.example file in this directory to .env.local (which will be ignored by Git):

```bash
cp .env.example .env.local
```

Then open `.env.local` and set the environment variables to match the ones in your Vercel Storage Dashboard.

Next, run Next.js in development mode:

```bash
pnpm dev
```
