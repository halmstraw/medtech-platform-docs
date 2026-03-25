# AI-Native Regulated Software Platform

Disclaimer - This site is created as a proof of knowledge to aide job applications.  It is not intended to be used.

## Reference Architecture for a Class IIa Medical Device Company

> A professional reference architecture covering end-to-end software delivery for a regulated medical device company — compliance, AI augmentation, and least-privilege access control integrated from day one.

---

## What this is

This repository contains the architecture, tooling decisions, process documentation, and implementation guidance for an AI-native software development platform designed for a Class IIa medical device company under:

- IEC 62304 (Software lifecycle)
- ISO 13485:2016 (Quality management)
- EU MDR 2017/745
- ISO 14971 (Risk management)
- 21 CFR Part 11 (Electronic records — FDA)
- FDA Cybersecurity Guidance 2023

The platform is designed for a small, specialist engineering team (approximately 20 people) with a proven product moving from research-led delivery toward FDA submission readiness and commercial scale.

---

## Start here

| Document | What it covers |
|---|---|
| [Platform Overview](docs/platform-overview.md) | The full picture — current state, target state, and the path between them |
| [Current State Assessment](docs/current-state.md) | Honest description of where a typical team at this stage is |
| [Roadmap](docs/roadmap.md) | Four phases from stabilisation to full platform maturity |
| [Cost Model](docs/architecture/cost-model.md) | Indicative monthly costs for the full stack |

---

## Architecture layers

| Layer | Document |
|---|---|
| 01 Requirements and risk | [01-requirements-risk.md](docs/layers/01-requirements-risk.md) |
| 02 Design and UX | [02-design-ux.md](docs/layers/02-design-ux.md) |
| 03 QMS and documentation | [03-qms-documentation.md](docs/layers/03-qms-documentation.md) |
| 04 Source control | [04-source-control.md](docs/layers/04-source-control.md) |
| 05 Delivery process | [05-delivery-process.md](docs/layers/05-delivery-process.md) |
| 06 CI/CD pipeline | [06-ci-cd-pipeline.md](docs/layers/06-ci-cd-pipeline.md) |
| 07 ML pipeline | [07-ml-pipeline.md](docs/layers/07-ml-pipeline.md) |
| 08 Testing and verification | [08-testing-verification.md](docs/layers/08-testing-verification.md) |
| 09 Infrastructure | [09-infrastructure.md](docs/layers/09-infrastructure.md) |
| 10 Cloud & backend architecture | [10-cloud-backend-architecture.md](docs/layers/10-cloud-backend-architecture.md) |
| 11 Observability | [11-observability.md](docs/layers/11-observability.md) |
| 12 Mobile architecture | [12-mobile-architecture.md](docs/layers/12-mobile-architecture.md) |
| 13 Security architecture | [13-security-architecture.md](docs/layers/13-security-architecture.md) |
| 14 AI engineering strategy | [14-ai-engineering-strategy.md](docs/layers/14-ai-engineering-strategy.md) |
| 15 Developer experience | [15-developer-experience.md](docs/layers/15-developer-experience.md) |
| 16 Maintenance & automation | [16-maintenance-automation.md](docs/layers/16-maintenance-automation.md) |

---

## AI agents

| Agent | Document |
|---|---|
| Code review | [agent-code-review.md](docs/agents/agent-code-review.md) |
| Compliance check | [agent-compliance.md](docs/agents/agent-compliance.md) |
| Documentation | [agent-documentation.md](docs/agents/agent-documentation.md) |
| Operations | [agent-ops.md](docs/agents/agent-ops.md) |
| ML validation | [agent-ml-validation.md](docs/agents/agent-ml-validation.md) |

---

## Trust zones

| Zone | Document |
|---|---|
| Zone 1 — Development | [zone-1-development.md](docs/zones/zone-1-development.md) |
| Zone 2 — Review and CI gate | [zone-2-review-gate.md](docs/zones/zone-2-review-gate.md) |
| Zone 3 — Operations | [zone-3-operations.md](docs/zones/zone-3-operations.md) |

---

## Compliance

| Framework | Document |
|---|---|
| ISO 13485:2016 | [iso-13485-mapping.md](docs/compliance/iso-13485-mapping.md) |
| IEC 62304 | [iec-62304-mapping.md](docs/compliance/iec-62304-mapping.md) |
| FDA 510(k) readiness | [fda-510k-readiness.md](docs/compliance/fda-510k-readiness.md) |
| GDPR and NHS DSP Toolkit | [gdpr-dsp-toolkit.md](docs/compliance/gdpr-dsp-toolkit.md) |

---

## Visual assets

- [Platform overview diagram](assets/platform-overview.html) — single-page architecture reference
- [Current vs target state](assets/current-vs-target.html) — the gap and the path

---

## For contributors and Claude

- [CLAUDE.md](CLAUDE.md) — project briefing for AI-assisted sessions
- [DECISIONS.md](DECISIONS.md) — log of key architectural decisions
- [SETUP-ISSUES.md](SETUP-ISSUES.md) — GitHub Issues to create for task tracking

---

*Status: In development · Not a controlled document · For review purposes*
