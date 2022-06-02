# habits-backend

## Development

```bash
yarn install
yarn dev
```

### Creating a new KV namespace

```bash
wrangler init habits-backend
wrangler kv:namespace create "HABITS"
wrangler kv:namespace create "HABITS" --preview
```

Then add those to your `wrangler.toml` file as such:

```toml
kv_namespaces = [
  { binding = "HABITS", id = "<ID_FROM_THE_FIRST_COMMAND>", preview_id = "<ID_FROM_THE_SECOND_COMMAND>" }
]
```
