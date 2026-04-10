# CLAUDE.md — Project Briefing

Read this at the start of every session before touching any file.

---

## Session startup — copy this prompt

Use this to begin any new session:

```
Read CLAUDE.md, DECISIONS.md, and AMENDMENTS-001.md.
Repo is at: /Users/timhalmshaw/dev/med-startup/medtech-platform-docs
Use native Claude tools for all file operations (Read, Write, Edit, Glob, Grep, Bash).
For edits to existing files use Edit (str_replace), never rewrite the whole file.
We're working on: [paste GitHub Issue title and number]
```

---

## Tools and environment

**Environment:** VS Code with Claude extension. Claude uses native built-in tools for all file and shell operations.

**Repo path:** `/Users/timhalmshaw/dev/med-startup/medtech-platform-docs`

**GitHub:** owner is `halmstraw` — always use this value, not `timhalmshaw`. Using the wrong owner returns silent 404s.

**File operation rules:**
- Read files: `Read` tool
- Write new files: `Write` tool
- Edit existing files: `Edit` tool — surgical str_replace only. Never rewrite a whole file unless it is genuinely new or the change exceeds ~50% of content.
- Search files: `Glob` and `Grep` tools
- Shell commands: `Bash` tool

**Critical editing discipline:**
- Always read before editing — Edit requires exact string matching and stale context causes failures
- Make one focused change per Edit call
- Never rewrite a file to make a small change — find the exact block and replace only that

**Live site:** Azure Static Web Apps — `https://lively-tree-004b4fc10.2.azurestaticapps.net`

**Local preview:** `python3 -m http.server 8765 &` from `site/` then `http://localhost:8765/`

**OptiPlex (homebridgehub):** Tim's home Debian server, Tailscale IP 100.80.15.123. Not directly accessible from Claude — changes sync via GitHub push/pull.

---

## Visual design language

See `assets/DESIGN-LANGUAGE.md` for the full reference.

Summary: All visuals use the professional corporate register established in the first session — dark navy header (`#09213a`), warm cream body (`#fffdf4`), teal accent (`#04bca9`), coral highlight (`#ff9452`), blue info (`#3797c4`), colour-coded tool pills, DM Sans / DM Mono typography, clean structured layout. Any new HTML visual must match the existing `assets/platform-overview.html` in tone and quality.

---

## What this project is

A professional reference architecture document set for a Class IIa medical device software company. The intended audience is the CTO and wider engineering team.

The documents must be technically credible, professionally presented, and demonstrate a clear understanding of both where the company currently is and where it needs to get to. This is not a theoretical exercise — it reflects real conversations from real engineering contexts.

The repo is framed generically (not company-branded) so it can be shared professionally without appearing presumptuous. All content should read as "reference architecture for a Class IIa medical device company with these characteristics."

---

## The company — what you need to know

**Product:** A smartphone-based contactless blood pressure monitor. The phone camera captures micro colour changes in facial skin (remote photoplethysmography / rPPG) using the green colour spectrum. The RGB signal is sent to the cloud, processed by ML algorithms, and returns systolic/diastolic BP and pulse rate. No cuff, no hardware, no contact.

**Regulatory status:** CE Class IIa under EU MDR (BP and heart rate). Pursuing FDA 510(k) or De Novo in the US. ISO 13485:2016 QMS in place. NHS Digital Toolkit compliant. ORCHA certified. Cyber Essentials Plus.

**Current tech stack:**
- Mobile SDK: iOS and Android (native, both platforms)
- Signal processing and ML inference: Python / Flask web application
- Cloud: Microsoft Azure
- Deployment: new container instance per assessment (approx. 7p per assessment)
- ML pipeline: data scientist-led, likely notebooks/scripts, no formal model versioning
- CI/CD: not matured — "data scientist releasing software"
- Monitoring/observability: minimal
- Documentation: minimal to none
- Testing: third-party engaged, not integrated into pipeline

**Engineering team:** Approximately one person per discipline. Mobile engineer, data scientist/ML engineer, backend engineer, possibly DevOps. Small, specialist, research-background team.

**Goals Tim is coming in to address:**
1. Mature the CI/CD and release process to FDA-submission standard
2. Reduce per-assessment cost (container-per-request is expensive and fragile)
3. Introduce AI agents to multiply team throughput
4. Build ML pipeline maturity (model versioning, experiment tracking, controlled releases)
5. Position the company for acquisition — clean engineering story, auditable processes
6. Replatform onto something resilient, maintainable, and scalable without disrupting existing NHS commitments

---

## Key technical decisions already made

See DECISIONS.md for the full log. Summary:

- **Azure, not AWS** — already on Azure, migration cost not justified
- **GitHub Actions, not Jenkins or Azure DevOps** — better developer experience, managed infrastructure, native audit trail
- **GitHub Issues + Projects, not Jira** — leaner, faster, traceability chain stays in GitHub
- **Qualio for eQMS** — purpose-built for medical device companies, ISO 13485 ready, e-signatures
- **TestRail for test management** — standalone, integrates with GitHub, regulated environment standard
- **MLflow for ML experiment tracking** — open source, Azure-compatible, model registry capability
- **Generic repo framing** — company-agnostic, shareable as reference architecture

---

## The four priority phases

**Phase 1 — Stabilise and make auditable (months 1–3)**
Wrap existing system in proper engineering process. Source control discipline, reproducible builds, deployment records, model versioning. AI agents introduced here to maximise immediate value.

**Phase 2 — Reduce cost and improve resilience (months 2–4)**
Replace per-container pattern with inference service (warm pool or Azure ML endpoints). Target: under 1p per assessment. Also improves availability — container spin-up failures currently cause assessment failures.

**Phase 3 — ML pipeline maturity (months 3–6)**
MLflow or Azure ML for experiment tracking, model registry, versioned deployments. Directly unblocks FDA submission — can now demonstrate controlled model releases with full change history.

**Phase 4 — Platform and developer experience (months 4–8)**
SDK versioning strategy, B2B developer portal, Backstage for internal use, full observability stack. Acquirer-readiness layer.

---

## Trust zones (AI access model)

**Zone 1 — Development:** AI has broad read/write on feature branches. Coding assistance, test generation, ADR drafting.

**Zone 2 — Review and CI gate:** AI reads code, writes PR comments only. Review agent, compliance agent, traceability checks.

**Zone 3 — Operations:** AI reads metrics and logs, writes GitHub Issues only. Incident summarisation, anomaly flagging.

No agent can merge PRs, push to main/release branches, write to Qualio, modify infrastructure, or silence alerts. Ever.

---

## AI agents in this stack

Four agents, each with a fixed identity and scoped permissions:

1. **Code Review Agent** — triggered on PR, posts structured review (CRITICAL/WARNING/INFO), cannot approve or block
2. **Compliance Agent** — triggered on PR, posts traceability report (req → test → execution), cannot block merge
3. **Documentation Agent** — triggered on merge/release, drafts changelog and release records, cannot write to Qualio
4. **Ops Agent** — triggered by alerts, queries Grafana/Loki, creates GitHub Issues, cannot remediate
5. **ML Validation Agent** — triggered when ML-related files change, flags if change constitutes a design change requiring regulatory review

---

## Writing conventions

- **Tone:** Professional, direct, technically credible. Not sales-y. Not academic. How a senior engineer briefs a CTO.
- **Tense:** Present tense for target state ("the pipeline produces..."), past/current tense for current state ("currently, releases are...")
- **Headers:** Use H2 for major sections, H3 for subsections. No H1 inside content files (reserved for the file title).
- **Tables:** Use for comparisons, tool choices with rationale, compliance mappings. Keep concise.
- **Regulatory references:** Always cite the specific clause (e.g. IEC 62304 §8.1, ISO 13485 §4.2). Do not make vague regulatory claims.
- **Current state:** Always describe honestly and without judgment. The science is proven — the engineering wrapper is what needs work.
- **Company-specific context:** Reference as "the company" or "the product" not by name. Exception: ADRs and compliance docs where specificity matters.
- **File length:** Keep individual files under 300 lines. If a section grows beyond that, split it.
- **No duplication:** If something is covered in another file, link to it. Do not repeat it.

---

## File structure

```
medtech-platform-docs/
├── CLAUDE.md                          ← you are here
├── DECISIONS.md                       ← key decisions log
├── AMENDMENTS-001.md                  ← additional layers added after initial scope
├── README.md                          ← human entry point
├── SETUP-ISSUES.md                    ← GitHub Issues backlog
├── zensical.toml                      ← MkDocs/Zensical site config and nav
├── radar/
│   ├── data/
│   │   ├── config.json                ← AOE radar config (quadrants, rings, colours)
│   │   └── radar/
│   │       └── 2026-04-09/            ← dated release folder — add .md files here
│   └── public/
│       └── back-link.js               ← injected on all radar pages — back to docs
├── docs/
│   ├── staticwebapp.config.json       ← Azure SWA routing config
│   ├── SKILLS.md                      ← general docs conventions
│   ├── platform-overview.html         ← narrative "on a page"
│   ├── current-vs-target.html         ← honest current assessment
│   ├── roadmap.md                     ← prioritised path to target
│   ├── zones/
│   ├── layers/
│   ├── agents/
│   ├── compliance/
│   └── architecture/
└── assets/
    ├── DESIGN-LANGUAGE.md
    └── platform-overview.html
```

---

## How to work across sessions

1. Read this file first
2. Read the SKILLS.md in the folder you're working in
3. Check DECISIONS.md before making any tool or architectural choice
4. Check open GitHub Issues to know what's in progress and what's next
5. Use str_replace for edits — never rewrite a whole file unless it's a new file
6. Keep files under 300 lines — split if needed
7. Close the relevant GitHub Issue when a file is complete and Tim has reviewed it
