---
id: ai_mcp_and_rest
title: Use MCP and REST endpoints for AI-assisted coding
sidebar_label: Use MCP and REST endpoints
slug: ai_mcp_and_rest
---

You can use AI-assisted authoring tools without installing `docassemble.ALWeaver` or `docassemble.ALDashboard` in your local Python environment.

Instead, call the APIs on a running docassemble server:

- ALWeaver REST API (`/al/api/v1/weaver...`)
- ALDashboard REST API (`/al/api/v1/dashboard/...`)
- ALDashboard MCP bridge (`/al/api/v1/mcp`)

## Why use APIs instead of local package installs?

- Keeps your AI workflow lightweight on local machines.
- Lets your AI agent work against one shared, server-side environment.
- Avoids local dependency setup for OCR, PDF tooling, and docassemble internals.
- Makes async jobs available for longer-running tasks.

## Authentication

These endpoints use docassemble API auth (`api_verify()`), typically:

- `X-API-Key: YOUR_API_KEY`, or
- `Authorization: Bearer ...` (if configured on your server).

## Option 1: MCP bridge (tool discovery + tool execution)

The MCP bridge is exposed by ALDashboard:

- `POST /al/api/v1/mcp` (JSON-RPC 2.0)
- `GET /al/api/v1/mcp` (metadata)
- `GET /al/api/v1/mcp/tools` (tool list)
- `GET /al/api/v1/mcp/docs` (human docs)

Supported methods:

- `initialize`
- `ping`
- `tools/list`
- `tools/call`

Use this when your AI coding tool can speak MCP or JSON-RPC and you want dynamic tool discovery.

### Example: list MCP tools

```bash
curl -X POST "https://YOURSERVER/al/api/v1/mcp" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'
```

### Example: call a discovered tool

```bash
curl -X POST "https://YOURSERVER/al/api/v1/mcp" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"aldashboard.get_al_api_v1_dashboard_openapi_json","arguments":{}}}'
```

`tools/call` reuses the same request authentication context, so you do not need a second API key just for MCP.

## Option 2: Direct REST calls

Use REST directly when you want explicit control over endpoints and payloads.

### ALWeaver API

- `POST /al/api/v1/weaver`
- `GET /al/api/v1/weaver/jobs/{job_id}`
- `DELETE /al/api/v1/weaver/jobs/{job_id}`
- `GET /al/api/v1/weaver/openapi.json`
- `GET /al/api/v1/weaver/docs`

### ALDashboard API

Examples include:

- `POST /al/api/v1/dashboard/docx/auto-label`
- `POST /al/api/v1/dashboard/docx/relabel`
- `POST /al/api/v1/dashboard/pdf/fields/detect`
- `POST /al/api/v1/dashboard/review-screen/draft`
- `GET /al/api/v1/dashboard/jobs/{job_id}`
- `GET /al/api/v1/dashboard/openapi.json`
- `GET /al/api/v1/dashboard/docs`

## Async mode for long-running jobs

Many endpoints support async processing:

- include `mode=async` (or `async=true`)
- poll `/jobs/{job_id}`
- optionally download artifacts from `/jobs/{job_id}/download` (ALDashboard)

To enable async workers, configure:

```yaml
celery modules:
  - docassemble.ALWeaver.api_weaver_worker
  - docassemble.ALDashboard.api_dashboard_worker
```

## Recommended workflow

1. Use [Coding with AI assistance](authoring_with_ai.md) for overall flow.
2. Use MCP `tools/list` to discover available server capabilities.
3. Use REST/MCP calls for concrete tasks (labeling, draft generation, validation).
4. Apply the focused checklists in this section to review outputs before publishing.

