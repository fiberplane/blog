---
title: "MCP Gateway: Manage Multiple MCP Servers with Ease"
description: "Introducing MCP Gateway - a powerful tool for managing multiple Model Context Protocol servers with a beautiful terminal UI and web interface."
pubDate: 2025-10-10
author: "Fiberplane Team"
tags: ["mcp", "tools"]
draft: false
image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop"
---

Managing multiple MCP servers can be challenging. That's why we built MCP Gateway - a unified interface for running, monitoring, and debugging your MCP servers.

## What is MCP Gateway?

MCP Gateway is a command-line tool that acts as a central hub for all your MCP servers. It provides:

- **Server Management**: Start, stop, and monitor multiple servers
- **Activity Logging**: See all requests and responses in real-time
- **Terminal UI**: Beautiful interface built with Ink
- **Web Interface**: Optional web-based dashboard

## Key Features

### Multi-Server Support

Run multiple MCP servers simultaneously and switch between them effortlessly:

```bash
mcp-gateway --servers ./config.json
```

### Real-Time Activity Monitoring

See every tool call, resource access, and prompt request as it happens.

### Easy Configuration

Store your server configurations in a simple JSON file:

```json
{
  "servers": [
    {
      "name": "filesystem",
      "command": "npx",
      "args": ["@fiberplane/mcp-server-filesystem"]
    }
  ]
}
```

## Get Started Today

Install MCP Gateway globally:

```bash
npm install -g @fiberplane/mcp-gateway
```

Check out our [documentation](/mcp-gateway) for more details on configuration and usage.
