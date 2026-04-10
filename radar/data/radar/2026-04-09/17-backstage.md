---
title: "Backstage"
ring: assess
quadrant: platforms
tags: [developer-portal, docs, service-catalog]
---

Internal developer portal (Spotify/CNCF). Deferred to Phase 4 — the operational overhead (Node.js backend, PostgreSQL, real hosting) is not justified at the current team size and service count. The TechDocs plugin uses the same MkDocs markdown that is already written, so migration will not require rewriting content.

When the time comes, the tech radar will migrate to Backstage's `@backstage/plugin-tech-radar` plugin. Assess the maturity of the Backstage ecosystem and team capacity before scheduling. See **DEC-008**.
