---
title: "Container-per-Request Pattern"
ring: hold
quadrant: techniques
tags: [deployment, infrastructure, cost]
---

Current deployment anti-pattern: a new Azure Container Instance is created for each BP assessment at approximately 7p/assessment. Two compounding problems make this untenable at scale: cost (commercially fragile — a successful NHS rollout would make this prohibitively expensive) and resilience (container spin-up failures cause assessment failures, a clinical reliability issue with no graceful degradation).

Phase 2 target: replace with a warm pool or Azure ML inference endpoint at under 1p/assessment. Do not extend this pattern to new workloads.
