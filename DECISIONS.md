# DECISIONS.md — Key Decision Log

Every significant architectural, tool, or process decision is recorded here with rationale. Before making a new choice, check here first to avoid relitigating settled decisions.

---

## Format

Each entry: **Decision** | **Date** | **Rationale** | **Alternatives considered**

---

## Platform and Infrastructure

### DEC-001 — Azure as the cloud platform
**Date:** Session 1  
**Decision:** Azure is the target cloud platform, not AWS or GCP.  
**Rationale:** The company is already running on Azure. Migrating cloud providers would be a major distraction with no clinical or regulatory benefit. Azure has strong healthcare compliance posture (ISO 27001, SOC 2, HIPAA BAA available).  
**Alternatives considered:** AWS (rejected — migration cost, no existing footprint), GCP (rejected — same reasons).

> ⚠️ **FLAG — AMENDMENTS-001:** The March 2026 JD specifies "Azure and AWS" as a
> required skill. This may indicate the company is multi-cloud or planning to be.
> Clarify with CTO before writing layer 09 (Infrastructure). If AWS is in active use,
> this decision must be revised and layer 09 rewritten to cover both platforms.
> Update this entry and remove this flag once clarified.

---

### DEC-002 — GitHub Actions as CI/CD, not Jenkins or Azure DevOps
**Date:** Session 1  
**Decision:** GitHub Actions for all CI/CD pipelines.  
**Rationale:** Managed infrastructure — no server to validate as a computerised system under 21 CFR Part 11. Native integration with GitHub repos means the audit trail (every workflow run, every step, every artefact) is automatic. Better developer experience than Jenkins. Azure DevOps is an option given the Azure footprint but adds a second Microsoft tool without significant benefit over GitHub Actions.  
**Alternatives considered:** Jenkins (rejected — infrastructure overhead, requires validation as computerised system), Azure DevOps Pipelines (rejected — GitHub Actions achieves same outcome with less context switching).

---

## Planning and Requirements

### DEC-003 — GitHub Issues + Projects, not Jira
**Date:** Session 1  
**Decision:** GitHub Issues with custom templates and GitHub Projects for planning.  
**Rationale:** Keeps the entire traceability chain (issue → branch → PR → build → deploy) within one system with one audit trail. Jira is slow, adds separate user management, and requires synchronisation with GitHub. At 20 people the complexity is not justified. Prior experience confirms Jira's overhead at scale.
**Alternatives considered:** Jira (rejected — overhead, separate system, Tim's prior negative experience), Linear (rejected — less established compliance story).

---

## Quality Management

### DEC-004 — Qualio as eQMS
**Date:** Session 1  
**Decision:** Qualio for the Quality Management System.  
**Rationale:** Purpose-built for medical device companies. ISO 13485 ready out of the box. Provides e-signatures (21 CFR Part 11), CAPA, NCR, training records, controlled document workflows. Far less engineering effort than building compliance workflows on top of Confluence or Notion.  
**Alternatives considered:** Confluence (rejected — requires custom approval workflow plugins, not purpose-built), Veeva QMS (rejected — enterprise pricing, overkill at 20 people), Greenlight Guru (viable alternative if Qualio pricing is an issue).

---

## Testing

### DEC-005 — TestRail for test management
**Date:** Session 1  
**Decision:** TestRail as the dedicated test management tool.  
**Rationale:** Standalone (not tied to Jira), integrates with GitHub via API, well-established in regulated environments, generates traceability matrix directly. Third-party testing engagement can be given TestRail access to submit results, closing the traceability loop without manual data entry.  
**Alternatives considered:** Xray for Jira (rejected — requires Jira as host, DEC-003 rules out Jira), Zephyr (viable but less established than TestRail in regulated contexts).

---

## ML Pipeline

### DEC-006 — MLflow for experiment tracking and model registry
**Date:** Session 1  
**Decision:** MLflow as the ML experiment tracking and model registry solution.  
**Rationale:** Open source, Azure-compatible, provides experiment tracking, model versioning, and a model registry. Directly addresses the FDA submission requirement to demonstrate controlled model releases. Data scientist-friendly — low adoption barrier. Can be self-hosted on Azure or use Azure ML's built-in MLflow compatibility.  
**Alternatives considered:** Azure ML (viable — native Azure integration, but higher cost and more complex for a small team), DVC (viable for data versioning but less strong on model registry), Weights & Biases (good UX but SaaS-only, data residency concerns for clinical data).

---

## Documentation and Developer Experience

### DEC-007 — Generic repo framing, company-agnostic
**Date:** Session 1
**Decision:** All documents framed as reference architecture for "a Class IIa medical device company" rather than naming a specific company.
**Rationale:** The repo is intended as a shareable professional reference. Company-specific naming reduces reusability and may appear presumptuous if shared before a formal engagement. Generic framing allows the repo to function as a credible portfolio piece applicable to any company fitting the profile.
**Alternatives considered:** Company-branded (rejected — reduces reusability, professional risk), fully anonymised with no specific details (rejected — too vague to be credible).

---

### DEC-008 — Azure Static Web Apps for docs, Backstage deferred to phase 4
**Date:** Session 1 (revised April 2026)
**Decision:** Azure Static Web Apps (single resource) for all documentation publishing — MkDocs site at root, AOE Tech Radar at `/radar/`. Backstage introduced in phase 4 when team size and service count justify it.
**Rationale:** Azure subscription is being created for Phase 2 infrastructure (AKS, Key Vault, Container Instances). Hosting docs on the same platform removes a split and avoids a second provider. Azure SWA free tier covers all requirements. Key advantages over GitHub Pages: Azure AD access control (docs are internal-only), PR preview deployments (staging URL per PR), and consistent platform story. TechDocs content is still the same markdown — Backstage migration in Phase 4 unchanged.
**Alternatives considered:** GitHub Pages (rejected at revision — no access control, no PR previews, splits hosting across two platforms once Azure subscription exists), Backstage from day one (rejected — operational overhead not justified at phase 1 team size), Vercel (viable but not on the Azure stack), Confluence (rejected — DEC-004 gives Qualio the controlled-docs role).
**Deployment token:** Secret name `AZURE_STATIC_WEB_APPS_API_TOKEN` in GitHub repo settings. Token retrieved from Azure portal → Static Web App resource → Settings → Deployment token.
**Live URL:** https://lively-tree-004b4fc10.2.azurestaticapps.net

---

## Repo and Workflow

### DEC-009 — CLAUDE.md + per-folder SKILLS.md for session continuity
**Date:** Session 1  
**Decision:** CLAUDE.md at repo root contains full project briefing. Each folder has a SKILLS.md with section-specific conventions. DECISIONS.md logs all choices.  
**Rationale:** Claude has no memory between sessions. These files provide the context needed to work accurately across multiple sessions without drift, duplication, or relitigating settled decisions. Combined with str_replace editing (never full-file rewrites), this keeps document quality high over time.  
**Alternatives considered:** Relying on chat history (rejected — unreliable across sessions), single large context file (rejected — unwieldy, harder to maintain).

---

### DEC-010 — GitHub Issues as task board, not TODO.md
**Date:** Session 1  
**Decision:** GitHub Issues with labels (content / decision / review) and milestones per phase as the task tracking mechanism.  
**Rationale:** Sits next to the files, visible to stakeholders, closeable on completion. A well-organised Issues board on a professional repo is itself a signal of engineering maturity — consistent with the message the whole project is trying to send.  
**Alternatives considered:** TODO.md (rejected — flat list, not communicable, no status tracking), Notion board (rejected — separate system).
