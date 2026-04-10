---
title: "Flask"
ring: adopt
quadrant: languages-frameworks
tags: [framework, backend, api]
---

Current API framework for the ML inference service. Lightweight and Python-native — a sensible choice for a small team where the priority has been on the ML science rather than the API layer. Currently in production.

A future consideration for Phase 2: whether Flask scales appropriately to the inference service pattern (warm pool / Azure ML endpoint) or whether a higher-performance ASGI framework (FastAPI) would better serve latency requirements at scale. Adopt for now; reassess if Phase 2 reveals bottlenecks.
