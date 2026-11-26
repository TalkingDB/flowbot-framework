# Usage and examples

[Docs home](README.md) › Usage and examples

## Run locally

```bash
cp .env.example .env
yarn install
yarn dev                     # http://localhost:3000
```

Other scripts from [`package.json`](../package.json):

| Script | Does |
| :--- | :--- |
| `yarn build`, `yarn start` | Production build and server |
| `yarn type-check` | TypeScript check without emitting files |
| `yarn lint`, `yarn format` | ESLint and Prettier |
| `yarn ingest` | Runs `scripts/ingest-data.ts` with `.env` loaded |

With [Docker](https://docs.docker.com/get-started/docker-overview/) and a local MongoDB:

```bash
./develop.sh                 # app on 3000, MongoDB on 27017
```

## Add a chatbot

1. Create `configuration/my-bot/server/index.js`:

   ```js
   export const streaming = false;
   export const conversational = true;

   export const start = async (handler, question) => {
     return {
       text: `You asked: ${question}`,
       sourceDocuments: [],
       error: false,
       errorMessage: "",
       tokens: { input_tokens: 0, output_tokens: 0, total_tokens: 0 },
     };
   };
   ```

2. Create `configuration/my-bot/webapp/index.js` and `configuration/my-bot/webapp/Index.module.css`:

   ```js
   export const getTitle = "My bot";
   export const getWelcomeMessage = "Ask me anything.";
   export const getInputPlaceholder = "Type your question here...";
   export const botName = "My bot";
   export const enabled = true;
   ```

3. Restart `yarn dev` and open `http://localhost:3000/?chat-id=my-bot`.

Copy a full working example from [flowbot-chatbot-ttt](https://github.com/TalkingDB/flowbot-chatbot-ttt), which searches documents with TTT and streams an answer from an [LLM](https://en.wikipedia.org/wiki/Large_language_model).

> [!NOTE]
> The fields above mirror what [flowbot-chatbot-ttt's `start`](https://github.com/TalkingDB/flowbot-chatbot-ttt/blob/main/server/index.js) returns. `tokens` is used to record usage per user. Start from an existing configuration rather than from scratch, and test with streaming both on and off.

## Use a chatbot from its own repository

Keep the chatbot in its own repository and copy it in before building:

```text
parent/
├── flowbot-framework/
└── configurations/
    └── flowbot-chatbot-ttt/     <- clone of the chatbot repository
```

```bash
cd flowbot-framework
./deploy.sh                  # copies ../configurations/* into ./configuration/, then docker compose up
```

## Deploy

[`deploy.sh`](../deploy.sh) rebuilds and restarts `docker-compose.yml`. [Traefik](https://doc.traefik.io/traefik/) for HTTPS is in `docker-compose-lb.yml` and `docker-compose.traefik.yml`; start it once per server if it is not already running.

---

**Related:** [Architecture](architecture.md) · [Troubleshooting](troubleshooting.md) · [README](../README.md)
