# Layer 16 — Maintenance & Automation

<!-- STATUS: STUB — not yet written -->
<!-- Read docs/layers/SKILLS.md before editing this file -->

---

## Purpose

For a small specialist team, manual maintenance competes directly with clinical engineering work. Every hour spent chasing certificate renewals, reviewing routine dependency bumps, or manually patching containers is an hour not spent on the ML pipeline or FDA submission. This layer covers the tooling and process that keeps the platform secure and current without requiring human attention for routine operations.

The goal is not fully autonomous self-management — changes to a Class IIa medical device still require traceability. The goal is to automate the routine, gate the significant, and ensure nothing silently falls out of date.

---

## Current state

Not established. Dependency management, vulnerability monitoring, and certificate/secret rotation are not formally defined processes. At this team size, maintenance work is typically reactive — things are updated when they break or when a problem is noticed, not on a scheduled basis.

---

## Target state

All routine maintenance happens automatically via GitHub Actions and native Azure services. A human decision is required only when a change carries regulatory weight (potential design change) or when automation surfaces something that needs judgement. The team receives batched, scheduled PRs for dependency updates rather than a constant stream of noise. Security advisories create GitHub Issues automatically. Nothing expires silently.

---

## Tool choices

> **Note:** Tool choices in this layer are provisional and require review. See the open GitHub Issue.

| Concern | Candidate tool | Notes |
|---|---|---|
| Dependency updates | Renovate Bot | More configurable than Dependabot: grouping, scheduling, auto-merge rules, supports Python/npm/Docker/GitHub Actions/Helm. Needs evaluation. |
| Dependency updates (alternative) | GitHub Dependabot | Simpler, GitHub-native, less configuration overhead. May be sufficient. |
| Vulnerability scanning | Trivy | Open source, integrates with GitHub Actions, produces SARIF for GitHub Security tab, scans containers and code. |
| Secret and certificate rotation | Azure Key Vault with rotation policies | Native Azure, no external dependency, rotation events can trigger automation. |
| SBOM generation | Syft (CycloneDX/SPDX output) | Required for FDA cybersecurity submissions; generated at build time. |
| Infrastructure drift | Azure Policy + Defender for Cloud | Flags configuration drift against defined baseline. |

---

## Change classification policy

In a regulated environment, not every software change is a design change. The team must have a documented policy distinguishing the two — otherwise every patch update triggers full change control, which is unsustainable at this team size.

| Change type | Examples | Process |
|---|---|---|
| Maintenance change | Security patch, dependency bump with no API change, certificate renewal | Auto-merge (patches) or standard PR review. Git history is the change record. No separate change request. |
| Non-design change | Dev tooling version bump, documentation update, test fixture update | Standard PR review. No regulatory artefact required. |
| Design change | Modified clinical algorithm, change to signal processing logic, model update, change to safety-relevant behaviour | Full change control: change request, impact assessment, updated risk documentation, regression test evidence. See [Layer 01: Requirements and Risk](01-requirements-risk.md). |

This classification is documented as a standing operating procedure in Qualio and referenced by the automated labels applied to dependency PRs.

---

## Dependency update principles

Regardless of which tool is selected (Renovate or Dependabot), the following rules apply:

- **Patch security fixes:** auto-merge if all CI checks pass. These are maintenance changes, not design changes.
- **Minor/major version bumps:** raise PR, do not auto-merge. Engineer reviews and merges.
- **ML/inference dependencies** (packages touching signal processing or model inference): raise PR, tag `regulatory-review`. Treated as potential design changes — see [Layer 06: ML Pipeline](06-ml-pipeline.md).
- **GitHub Actions versions:** auto-update with pinned SHA digests for supply chain security.
- **Schedule:** dependency PRs raised on a fixed day (e.g. Monday), reducing mid-week noise.
- **Grouping:** non-critical dev tooling (linters, formatters, test runners) batched into a single weekly PR.

---

## AI agent involvement

The **Compliance Agent** (see [agent-compliance.md](../agents/agent-compliance.md)) reviews PRs tagged `regulatory-review`. It checks whether the dependency change touches files classified as safety-relevant and posts a finding on the PR.

No agent auto-merges or auto-closes maintenance PRs. Agents flag; humans decide on anything non-trivial.

---

## Human responsibilities

- Review and merge minor/major dependency PRs
- Act on `regulatory-review`-tagged PRs — assess whether the change constitutes a design change
- Review vulnerability findings that exceed the defined severity threshold
- Maintain the change classification policy in Qualio

---

## Regulatory hooks

**IEC 62304 §6.2 — Software maintenance plan**
This layer is the practical implementation of the maintenance plan required by §6.2. The plan must document the process for identifying and evaluating the need for software modifications. Automated dependency tooling provides the identification mechanism; the change classification policy provides the evaluation framework.

**IEC 62304 §6.2.5 — Problem and modification analysis**
Vulnerability alerts feed directly into the problem identification step. GitHub Issues created by scanning tools serve as the modification request record.

**IEC 62304 §8.2 — Software change control**
Every dependency bump merged produces a commit, PR, and CI run record in GitHub. This constitutes the change record for maintenance changes. Design changes additionally require a change request issue and risk documentation before merge.

**FDA Cybersecurity guidance (2023) — SBOM and vulnerability monitoring**
FDA guidance for medical device software requires a Software Bill of Materials and a post-market cybersecurity monitoring programme. SBOM generation at build time satisfies the former. Automated vulnerability scanning constitutes the monitoring programme. Both are evidenced by GitHub Actions run artefacts.

**ISO 13485 §8.5.2 — Corrective action**
Vulnerabilities above the severity threshold require a corrective action. The GitHub Issue created automatically constitutes the CAPA initiation record, subject to the Qualio QMS workflow.

---

## Connections

**Feeds from:**
- [Layer 04: Source Control](04-source-control.md) — dependency tooling runs against the repo
- [Layer 05: CI/CD Pipeline](05-ci-cd-pipeline.md) — maintenance automation runs as GitHub Actions jobs
- [Layer 08: Infrastructure](08-infrastructure.md) — Azure Key Vault and Defender for Cloud are infrastructure-layer services

**Feeds into:**
- [Layer 03: QMS Documentation](03-qms-documentation.md) — SBOM artefacts, change records, CAPA initiation
- [Layer 06: ML Pipeline](06-ml-pipeline.md) — dependency changes to inference packages trigger regulatory-review labelling
- [Layer 09: Observability](09-observability.md) — vulnerability alerts feed the security monitoring view
