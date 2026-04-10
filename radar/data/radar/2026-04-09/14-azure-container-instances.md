---
title: "Azure Container Instances"
ring: trial
quadrant: platforms
tags: [cloud, deployment, inference]
---

Current deployment model for ML inference: a new container instance is created per BP assessment at approximately 7p/assessment. In active production use.

This pattern is under active evaluation for replacement in Phase 2. It has two significant problems: cost (7p/assessment is commercially fragile at scale) and resilience (container spin-up failures cause assessment failures — a clinical reliability issue). Target: replace with a warm pool or Azure ML inference endpoint at under 1p/assessment.
