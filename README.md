The Quix frontend is built on [Next.js](https://nextjs.org/).

## Getting Started

First, configure the frontend to connect to the Quix backend. All configuration settings are stored in `/shared/config.ts`.

Initially, the only settings that need to be updated are the `BACKEND_URL` and `BACKEND_TOKEN`, though you'll likely want to eventually configure the frontend to use the shared Seaport deployment (or your own deployment).

The `BACKEND_URL` should point to where you are running the Quix backend. The `BACKEND_TOKEN` can be generated using the Django admin under `AUTH TOKEN` (not to be confused with `API KEY`).

Lastly, the frontend is configured to run on Optimism Mainnet by default. To instead run on Optimism Goerli, update the environment variable `NEXT_PUBLIC_NETWORK` from `opt-mainnet` to `opt-goerli`.

## Running the Code

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
