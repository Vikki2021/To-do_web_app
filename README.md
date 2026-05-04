# Dropshipping Automation Harness

A Claude Code harness for running an Indian dropshipping (Shopify) business
through specialized AI agents. Each pillar of the business — research, store,
creative, ads, analytics, support, fulfillment, planning — has a dedicated
subagent with concrete decision rules.

## Layout

```
CLAUDE.md                       # top-level orchestrator and pillar map
.claude/
  settings.json                 # permission allowlist for connector tools
  agents/                       # one file per pillar
    product-research.md
    store-manager.md
    creative-studio.md
    ads-manager.md
    marketing-analytics.md
    customer-support.md
    order-fulfillment.md
    ops-planner.md
    india-localizer.md
  skills/                       # reusable decision frameworks
    indian-dropshipping/
    winning-product-criteria/
    ad-scaling-rules/
    creative-brief/
  playbooks/                    # repeatable workflows
    daily-ops.md
    weekly-review.md
    launch-product.md
    festival-sale.md
    scale-winner.md
    kill-loser.md
docs/
  limits.md                     # spend caps, approval thresholds, blocklists
```

## Connectors used

Shopify · Meta Ads · Supermetrics · Windsor.ai · Higgsfield · Canva · Notion ·
Gmail · Google Calendar · Google Drive · Vercel · Coupler.io · GitHub.

## Getting started

1. Open this repo in Claude Code (CLI, web, or IDE).
2. Verify each MCP connector is authenticated (`mcp` UI in Claude Code).
3. Run `daily-ops` first thing in the morning — Claude routes to the right agents.
4. For a new SKU, run `launch-product`. For a sale window, run `festival-sale`.

Read `CLAUDE.md` for the pillar-to-agent map and the operator interaction model.
