---
title: How I Organize My Projects with Turborepo
description: My monorepo setup for a cleaner dev workflow.
pubDate: 2025-06-20
---

## Why Turborepo makes dev life smoother

Managing multiple packages used to be a mess — until I tried Turborepo.

Now I structure my projects like this:

```
apps/
  web/
  docs/
packages/
  ui/
  utils/
```

This setup makes sharing code between apps painless. Lerna walked so Turborepo could run.
