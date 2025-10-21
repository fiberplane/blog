---
title: "Introducing MCP Lite: A Lightweight MCP Server Framework"
description: "Build Model Context Protocol servers with minimal overhead. MCP Lite makes it easy to create tools, resources, and prompts for AI applications."
pubDate: 2025-10-15
author: "Fiberplane Team"
tags: ["mcp", "open-source"]
draft: false
image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop"
---

We're excited to introduce MCP Lite, a lightweight framework for building Model Context Protocol (MCP) servers. MCP Lite provides a clean, type-safe API for creating tools, resources, and prompts that AI models can use.

## Why MCP Lite?

The Model Context Protocol is powerful, but can be complex to implement. MCP Lite simplifies server development while maintaining full compatibility with the MCP specification.

### Key Features

- **Type Safety**: Full TypeScript support with type inference
- **Minimal Overhead**: Small bundle size and fast startup
- **Flexible**: Supports tools, resources, and prompts
- **Extensible**: Middleware system for custom functionality

## Getting Started

Install MCP Lite via npm:

```bash
npm install @fiberplane/mcp-lite
```

Create your first MCP server:

```typescript
import { createServer } from '@fiberplane/mcp-lite';

const server = createServer({
  name: 'my-server',
  version: '1.0.0',
});

server.tool({
  name: 'greet',
  description: 'Greet a user',
  parameters: {
    name: { type: 'string', description: 'User name' },
  },
  handler: async ({ name }) => ({
    content: [{ type: 'text', text: `Hello, ${name}!` }],
  }),
});

server.listen();
```

## What's Next?

We're just getting started with MCP Lite. Check out the [documentation](/mcp-lite) to learn more about building MCP servers.
