---
title: "Azure ML"
ring: assess
quadrant: platforms
tags: [ml, cloud, model-registry]
---

Azure-native alternative to MLflow. Provides built-in MLflow compatibility, meaning any experiment tracking done in MLflow today can be pointed at an Azure ML backend without code changes. Higher operational overhead and cost than a self-hosted MLflow instance, but eliminates a separate managed service.

Assess as part of the Phase 2 ML pipeline maturity work. If the team grows and Azure ML's managed compute and endpoint features become compelling, the migration path is low-friction. See **DEC-006**.
