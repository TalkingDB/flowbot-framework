# Troubleshooting

[Docs home](README.md) › Troubleshooting

| Symptom | Likely cause | Fix |
| :--- | :--- | :--- |
| The default chatbot appears instead of yours | `chat-id` is missing or misspelt, or the configuration folder was not present at build time | Check the URL, and that `configuration/<id>/webapp/index.js` exists before `yarn build` or the [Docker](https://docs.docker.com/get-started/docker-overview/) build |
| `Module not found: Can't resolve '@/configuration/...'` | The configuration was added after the build | Rebuild; configurations are bundled at build time |
| Sign in fails or loops | Google OAuth values or `NEXT_PUBLIC_NEXTAUTH_URL` do not match the URL you opened | Use the same host and port in `.env` and in the Google console |
| `MongooseServerSelectionError` | MongoDB is not running or `MONGODB_URI` is wrong | Start it (`./develop.sh` runs one on 27017) and check the URI |
| Answers never arrive when streaming | A proxy buffers `text/event-stream` responses | Turn off response buffering for `/api/chat` in the proxy |
| Admin pages say access denied | Your email is not in `ADMIN_EMAILS` | Add it, comma separated, and restart |
| A chatbot that searches documents returns nothing | `NEXT_PUBLIC_TDB_TTT_SERVICE` or its authorization is wrong, or no graph IDs were sent | Check the TTT service with `GET /health` and the key with a direct `POST /v1/queries` |
| Quota or token errors for a user | Token usage is recorded per user after each answer | Check the user's record in MongoDB |
| `./deploy.sh` copies nothing | `../configurations/` does not exist | Create it next to this repository and clone chatbot repositories into it |

---

**Related:** [Architecture](architecture.md) · [Usage and examples](usage-and-examples.md) · [README](../README.md)
