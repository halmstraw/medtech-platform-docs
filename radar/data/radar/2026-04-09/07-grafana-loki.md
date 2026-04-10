---
title: "Grafana / Loki"
ring: assess
quadrant: tools
tags: [observability, monitoring, logging]
---

Observability stack — Grafana for metrics dashboards, Loki for log aggregation. Planned for Phase 2 as part of the full observability layer (Layer 11). The Ops Agent queries Grafana to surface anomalies and creates GitHub Issues when thresholds are breached.

Currently the platform has minimal observability. Assess before committing to the full stack — there may be overlap with Azure Monitor depending on how far the Azure-native tooling is taken.
