---
title: "DVC"
ring: assess
quadrant: languages-frameworks
tags: [ml, data-versioning]
---

Data version control. Git-like versioning for datasets and model artefacts. Viable for versioning the training datasets used in the rPPG BP prediction model, filling a gap that MLflow does not cover (MLflow focuses on experiment and model versioning, not raw training data).

Assess whether the combined use of MLflow (model registry) + DVC (data versioning) adds meaningful value over MLflow alone for this use case. The Phase 3 ML pipeline maturity work is the right moment to evaluate. See **DEC-006**.
