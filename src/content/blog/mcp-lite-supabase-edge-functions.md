---
title: "supah mcp-lite on Supabase Edge Functions"
description: "Deploy production-ready MCP servers to Supabase's edge network running on Deno with the new mcp-lite Supabase Edge Functions starter template"
pubDate: 2025-10-28
author: "Fiberplane Team"
tags: ["mcp-lite", "supabase", "edge-functions", "deno", "mcp"]
---

We're excited to announce that **mcp-lite** now ships with a Supabase Edge Functions starter template. You can now deploy production-ready MCP servers to Supabase's edge network running on Deno.

## **What's New**

Starting with `create-mcp-lite@0.3.0`, you can scaffold a complete MCP server that runs on Supabase Edge Functions. The template includes:

* **Deno runtime** with TypeScript support out of the box
* **Hono** for HTTP routing
* **Zod** for schema validation
* **mcp-lite** for MCP protocol handling
* A working `sum` tool to get you started

```shell
npm create mcp-lite@latest
```

When prompted, select **Supabase Edge Functions (MCP server)** from the template options.

## **Project Structure**

The template creates a focused structure for Edge Functions development:

```
my-mcp-server/
├── supabase/
│   ├── config.toml                    # Minimal Supabase config (Edge Functions only)
│   └── functions/
│       └── mcp-server/
│           ├── index.ts               # MCP server implementation
│           └── deno.json              # Deno imports and configuration
├── package.json
└── tsconfig.json
```

### **Why Two Hono Apps?**

The template uses a specific pattern required by Supabase Edge Functions:

```ts
// Root handler - matches the function name
const app = new Hono();

// MCP protocol handler
const mcpApp = new Hono();

mcpApp.get("/", (c) => {
  return c.json({
    message: "MCP Server on Supabase Edge Functions",
    endpoints: {
      mcp: "/mcp",
      health: "/health",
    },
  });
});

mcpApp.all("/mcp", async (c) => {
  const response = await httpHandler(c.req.raw);
  return response;
});

// Mount at /mcp-server (the function name)
app.route("/mcp-server", mcpApp);
```

This is required because **Supabase routes all requests to `/<function-name>/*`**. The outer `app` handles the function-level routing, while `mcpApp` handles your actual MCP endpoints.

## **Local Development Setup**

### **Prerequisites**

You'll need:

* Docker (to run Supabase locally)
* Deno (Supabase Edge Functions runtime)
* [Supabase CLI](https://supabase.com/docs/guides/cli/getting-started)

### **Initialize and Start**

The template includes a minimal `config.toml` that runs **only Edge Functions** \- no database, storage, or Studio UI. This keeps your local setup lightweight \- you can always add more as you wish:

```
# Minimal config for running only Edge Functions (no DB, storage, or studio)
project_id = "starter-mcp-supabase"

[api]
enabled = true
port = 54321

[edge_runtime]
enabled = true
policy = "per_worker"
deno_version = 2
```

Start your development environment:

```shell
# Start Supabase services
supabase start

# Serve your MCP function locally
supabase functions serve --no-verify-jwt mcp-server
```

For convenience, the template has a `dev` script, which just runs the `supabase functions serve` command from above:

```shell
npm run dev
```

Your MCP server will be available at:

`http://localhost:54321/functions/v1/mcp-server/mcp`

### **Testing Your Server**

Test the MCP server by adding it to your Claude Code, Claude Desktop, Cursor or wherever you're using them.

```shell
claude mcp add my-mcp-server -t http http://localhost:54321/functions/v1/mcp-server/mcp
```

You can also test it in the inspector:

```shell
npx @modelcontextprotocol/inspector
```

And adding the MCP endpoint in the UI.

## **How It Works**

The MCP server setup is straightforward:

```ts
import { McpServer, StreamableHttpTransport } from "mcp-lite";
import { z } from "zod";

// Create MCP server instance
const mcp = new McpServer({
  name: "starter-mcp-supabase-server",
  version: "1.0.0",
  schemaAdapter: (schema) => z.toJSONSchema(schema as z.ZodType),
});

// Define a tool
mcp.tool("sum", {
  description: "Adds two numbers together",
  inputSchema: z.object({
    a: z.number(),
    b: z.number(),
  }),
  handler: (args: { a: number; b: number }) => ({
    content: [{ type: "text", text: String(args.a + args.b) }],
  }),
});

// Bind to HTTP transport
const transport = new StreamableHttpTransport();
const httpHandler = transport.bind(mcp);
```

### **Deno Import Maps**

The template uses Deno's import maps in `deno.json` to manage dependencies:

```json
{
  "compilerOptions": {
    "lib": ["deno.window", "deno.ns"],
    "strict": true
  },
  "imports": {
    "hono": "npm:hono@^4.6.14",
    "mcp-lite": "npm:mcp-lite@0.8.2",
    "zod": "npm:zod@^4.1.12"
  }
}
```

This gives you npm package access while staying in the Deno ecosystem.

## **Adding More Tools**

Extend your MCP server by adding tools directly to the `mcp` instance:

```ts
mcp.tool("searchDatabase", {
  description: "Search your Supabase database",
  inputSchema: z.object({
    table: z.string(),
    query: z.string(),
  }),
  handler: async (args) => {
    // Access Supabase client here
    // const { data } = await supabase.from(args.table).select('*')
    return {
      content: [{ type: "text", text: `Searching ${args.table}...` }],
    };
  },
});
```

## **Deploy to Production**

When ready, deploy to Supabase's global edge network:

```shell
supabase functions deploy --no-verify-jwt mcp-server
```

Or use the npm script:

```shell
npm run deploy
```

Your MCP server will be live at:

```
https://your-project-ref.supabase.co/functions/v1/mcp-server/mcp
```

## **Authentication Note**

⚠️ **Important**: The template uses `--no-verify-jwt` for quick development. **This means authentication is not enforced by Supabase's JWT layer**.

For production, you should probably implement authentication at the MCP server level following the [MCP Authorization specification](https://modelcontextprotocol.io/specification/draft/basic/authorization). This gives you control over who can access your MCP tools.

## **Why Supabase \+ mcp-lite?**

This combination gives you zero cold starts with Edge Functions that stay warm, global distribution where you deploy once and run everywhere, direct database access to your Supabase Postgres, zero runtime dependencies with mcp-lite's minimal footprint, full type safety with TypeScript support in Deno, and simple deployment with just one command to production.

## **What's Next**

With your MCP server running on Supabase Edge Functions, you can:

* Connect it to your Supabase database for data-driven tools
* Use Supabase Auth to secure your endpoints
* Access Supabase Storage for file operations
* Deploy to multiple regions automatically
* Scale to handle production traffic

## **Get Started**

```shell
npm create mcp-lite@latest
# Select "Supabase Edge Functions (MCP server)" when prompted
```

## **Resources**

* [mcp-lite on GitHub](https://github.com/fiberplane/mcp-lite)
* [Supabase Edge Functions Docs](https://supabase.com/docs/guides/functions)
* [Model Context Protocol Spec](https://modelcontextprotocol.io/)
* [Deno Runtime Documentation](https://deno.land/)

**About mcp-lite:** A lightweight, zero-dependency TypeScript framework for building Model Context Protocol servers. Works everywhere the Fetch API is available: Node, Bun, Cloudflare Workers, Deno, and Supabase Edge Functions.
