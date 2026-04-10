---
title: "Azure Static Web Apps"
ring: adopt
quadrant: platforms
tags: [cloud, hosting, docs]
---

Documentation and tech radar hosting. Replaced GitHub Pages as the documentation platform once an Azure subscription was established. Advantages: Azure AD access control (docs are internal-only), PR preview deployments (each pull request gets a staging URL), and consistent platform — all tooling on Azure.

The MkDocs/Zensical docs site deploys at the root; the AOE Tech Radar deploys at `/radar/`. Both are built in the same GitHub Actions workflow and deployed to this single resource. See **DEC-008**.
