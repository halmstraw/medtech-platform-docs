---
title: "AI Trust Zones"
ring: adopt
quadrant: techniques
tags: [ai-agents, governance, security]
---

Governance model for all AI agents in the engineering stack. Three zones with progressively restricted permissions:

- **Zone 1 (Development):** AI has broad read/write access on feature branches. Coding assistance, test generation, ADR drafting.
- **Zone 2 (Review and CI gate):** AI reads code and writes PR comments only. Review agent, compliance agent, traceability checks.
- **Zone 3 (Operations):** AI reads metrics and logs, writes GitHub Issues only. Incident summarisation, anomaly flagging.

No agent can merge PRs, push to main or release branches, write to Qualio, modify infrastructure, or silence alerts. These constraints are not configurable — they are architectural.
