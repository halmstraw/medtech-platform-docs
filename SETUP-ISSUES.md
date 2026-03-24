# SETUP-ISSUES.md — GitHub Issues to Create

Create these issues on the repository after the first push. They form the task board for all sessions.

Use three labels: `content`, `decision`, `review`
Use four milestones: `Phase 1 — Stabilise`, `Phase 2 — Cost & Resilience`, `Phase 3 — ML Pipeline`, `Phase 4 — Platform`

---

## Create labels first

In GitHub → Issues → Labels, create:

| Label | Colour | Description |
|---|---|---|
| `content` | `#0075ca` | A document that needs writing or refining |
| `decision` | `#e4e669` | A decision needed before content can be written |
| `review` | `#d93f0b` | Written — needs Tim's review before closing |

---

## Create milestones

In GitHub → Issues → Milestones, create:

| Milestone | Description |
|---|---|
| `Phase 1 — Stabilise` | Months 1–3: audit trail, source control discipline, agents introduced |
| `Phase 2 — Cost & Resilience` | Months 2–4: inference service, container pool, cost reduction |
| `Phase 3 — ML Pipeline` | Months 3–6: MLflow, model registry, FDA-ready release process |
| `Phase 4 — Platform` | Months 4–8: Backstage, developer portal, full observability |

---

## Issues to create

### Visual assets (highest priority — anchor everything else)

**#1 — Create platform overview visual (docs/platform-overview.html)**
- Label: `content`
- Milestone: `Phase 1 — Stabilise`
- Body: Single-page HTML architecture diagram showing full target state stack. Current version exists from earlier session — needs refining to reflect Azure (not AWS) and ML pipeline layer.

**#2 — Create current vs target state visual (docs/current-vs-target.html)**
- Label: `content`
- Milestone: `Phase 1 — Stabilise`
- Body: Side-by-side or before/after visual showing current state (Flask, manual releases, no observability) versus target state. Should be compelling for a CTO who needs to understand the gap quickly.

---

### Top-level narrative docs

**#3 — Write platform-overview.md**
- Label: `content`
- Milestone: `Phase 1 — Stabilise`
- Body: The narrative "platform on a page" document. Covers: what the platform is, why it exists, the four phases, and links to all sub-documents. Should read as an executive summary a CTO would skim first.

**#4 — Write current-state.md**
- Label: `content`
- Milestone: `Phase 1 — Stabilise`
- Body: Honest assessment of current engineering state. Flask/container-per-request, no model versioning, manual releases, no observability, third-party testing not integrated. Non-judgmental but specific.

**#5 — Write roadmap.md**
- Label: `content`
- Milestone: `Phase 1 — Stabilise`
- Body: Four-phase roadmap from current state to full platform. Each phase: goals, deliverables, which agents become active, regulatory milestones unlocked.

---

### Layer documents

**#6 — Write layer 01: Requirements and risk**
- Label: `content`
- Milestone: `Phase 1 — Stabilise`
- Body: GitHub Issues with custom templates (risk-class, sw-class, SRS ref fields), GitHub Projects, Notion risk register. ISO 14971 and IEC 62304 §5.2 hooks.

**#7 — Write layer 02: Design and UX**
- Label: `content`
- Milestone: `Phase 1 — Stabilise`
- Body: Figma, Storybook, IEC 62366 usability file. Note: for an rPPG product the primary UX surface is the SDK integration — B2B customer experience matters as much as end-user.

**#8 — Write layer 03: QMS and documentation**
- Label: `content`
- Milestone: `Phase 1 — Stabilise`
- Body: Qualio as eQMS, GitHub Pages for technical docs, ADRs in repo. ISO 13485 §4.2. Note existing ISO 13485:2016 certification — platform must integrate with, not replace, existing QMS.

**#9 — Write layer 04: Source control**
- Label: `content`
- Milestone: `Phase 1 — Stabilise`
- Body: GitHub branch strategy, protection rules, signed commits, Conventional Commits. IEC 62304 §8 configuration management. Current state: likely ad hoc branching.

**#10 — Write layer 05: CI/CD pipeline**
- Label: `content`
- Milestone: `Phase 1 — Stabilise`
- Body: GitHub Actions, Syft SBOM, Snyk, SonarCloud, ArgoCD. Azure Container Registry. FDA cybersecurity 2023 SBOM requirement. Current state: manual / data scientist-led releases.

**#11 — Write layer 06: ML pipeline**
- Label: `content`
- Milestone: `Phase 3 — ML Pipeline`
- Body: This is the most product-specific layer. Covers: current Flask/container-per-request pattern and its problems, MLflow for experiment tracking and model registry, Azure ML endpoints as inference service replacement, the 7p → <1p cost reduction target, on-device GPU inference as phase 4 option and its regulatory implications, ML Validation Agent. IEC 62304 Class C implications for the inference code.

**#12 — Write layer 07: Testing and verification**
- Label: `content`
- Milestone: `Phase 1 — Stabilise`
- Body: TestRail, Playwright, unit test frameworks, traceability matrix. Third-party testing integration. IEC 62304 §5.7. Note: third party currently engaged — their evidence must flow into the traceability matrix.

**#13 — Write layer 08: Infrastructure (Azure)**
- Label: `content`
- Milestone: `Phase 2 — Cost & Resilience`
- Body: Terraform, AKS, Azure Key Vault, Azure Monitor, ACR. NHS data residency (UK South / UK West). 21 CFR Part 11 audit logging via Azure Activity Log.

**#14 — Write layer 09: Observability**
- Label: `content`
- Milestone: `Phase 2 — Cost & Resilience`
- Body: Grafana Cloud, Prometheus, Loki, Sentry, PagerDuty. Post-market surveillance data collection (EU MDR Art. 83). Current state: minimal monitoring.

**#15 — Write layer 10: Developer experience**
- Label: `content`
- Milestone: `Phase 4 — Platform`
- Body: Backstage (phase 4), GitHub Pages (phase 1), ADR process. B2B developer portal for SDK customers — this is a significant need given the SDK integration model.

---

### Agent documents

**#16 — Write agent: Code review**
- Label: `content`
- Milestone: `Phase 1 — Stabilise`
- Body: Full agent spec — identity, trigger, zone, prompt structure, MCP server, restrictions. This is the first agent to implement.

**#17 — Write agent: Compliance check**
- Label: `content`
- Milestone: `Phase 1 — Stabilise`
- Body: Traceability verification agent. Links issue → SRS → TestRail → execution. Advisory only, cannot block.

**#18 — Write agent: Documentation**
- Label: `content`
- Milestone: `Phase 1 — Stabilise`
- Body: Changelog and release record drafting. Cannot write to Qualio — produces drafts for human upload.

**#19 — Write agent: Ops**
- Label: `content`
- Milestone: `Phase 2 — Cost & Resilience`
- Body: Alert-triggered incident summarisation. Grafana read-only, creates GitHub Issues. Zone 3.

**#20 — Write agent: ML validation**
- Label: `content`
- Milestone: `Phase 3 — ML Pipeline`
- Body: Monitors ML file changes, flags design change candidates. Conservative by design. Most clinically significant agent in the stack.

---

### Compliance documents

**#21 — Write ISO 13485 mapping**
- Label: `content`
- Milestone: `Phase 1 — Stabilise`
- Body: Existing certification is ISO 13485:2016. Map each platform layer to specific clauses. Note gaps (current state) and which phase closes them.

**#22 — Write IEC 62304 mapping**
- Label: `content`
- Milestone: `Phase 1 — Stabilise`
- Body: Software lifecycle mapping. The inference code is Class C (safety-critical). The SDK wrapper may be Class B. Clarify classification as a decision item.

**#23 — Write FDA 510(k) readiness**
- Label: `content`
- Milestone: `Phase 3 — ML Pipeline`
- Body: Most detailed compliance document. Maps to FDA SDLC requirements, cybersecurity guidance, SOUP analysis, anomaly resolution. This document directly supports the submission.

**#24 — Write GDPR and NHS DSP Toolkit**
- Label: `content`
- Milestone: `Phase 1 — Stabilise`
- Body: Anonymisation at device, Azure UK data residency, NHS DSP Toolkit annual submission, ORCHA certification. GDPR Article 9 (special category health data) handling.

---

### Architecture documents

**#25 — Write ADR-001: Azure platform**
- Label: `content`
- Milestone: `Phase 1 — Stabilise`
- Body: First ADR. Documents the decision to remain on Azure. Follow ADR format in architecture/SKILLS.md exactly.

**#26 — Write cost model**
- Label: `content`
- Milestone: `Phase 1 — Stabilise`
- Body: Phase 1 minimal cost vs full stack cost. Split by category. All GBP monthly. Based on existing tool decisions in DECISIONS.md.

---

**#31 — Write layer 05: Delivery process**
- Label: `content`
- Milestone: `Phase 1 — Stabilise`
- Body: Scrum implementation, definition of done with regulatory checklist items,
  velocity tracking, retrospectives as ISO 13485 CAPA input, connection between
  sprints and GitHub Projects milestones. Key JD responsibility — sprint discipline
  is named explicitly.

**#32 — Write layer 11: Mobile architecture**
- Label: `content`
- Milestone: `Phase 2 — Cost & Resilience`
- Body: iOS (Swift/SwiftUI) and Android (Kotlin) architectural standards. MVVM and
  Clean Architecture patterns. rPPG signal capture abstraction layer. SDK versioning
  strategy and B2B compatibility matrix. Mobile CI/CD (Fastlane, TestFlight, Play
  internal track). Clinical-grade reliability expectations. Establish current codebase
  structure during onboarding before writing.

**#33 — Write layer 12: Security architecture**
- Label: `content`
- Milestone: `Phase 1 — Stabilise`
- Body: Threat modelling (STRIDE) for the rPPG assessment flow. Data classification
  framework. Encryption at rest and in transit. Anonymisation pipeline location.
  Audit logging strategy. IAM for engineers, agents, and B2B partners. Vulnerability
  management lifecycle. SBOM as security artefact. Pen testing cadence. Builds on
  existing Cyber Essentials Plus baseline.

**#34 — Write layer 13: AI engineering strategy**
- Label: `content`
- Milestone: `Phase 1 — Stabilise`
- Body: LLM tooling selection criteria for regulated context. Agentic framework
  evaluation (Anthropic API primary, LangChain/AutoGen alternatives). Guardrails for
  AI-generated code entering a regulated product. Prompt engineering standards and
  versioning. Trust zone model as governance framework. How AI augmentation multiplies
  throughput for a small team. Longer-term vision. NOTE: this layer covers AI as a
  tool for engineers — distinct from layer 07 (ML pipeline) which covers AI as the
  clinical product.

**#36 — Configure Slack workspace and GitHub integration**
- Label: `content`
- Milestone: `Phase 1 — Stabilise`
- Body: Set up Slack channel structure per layer 05 conventions. Install GitHub Slack
  app. Configure per-channel subscriptions: deployments, CI alerts, incidents, PR
  reviews. Configure GitHub Actions → Slack webhook for deployment notifications.
  Configure PagerDuty → Slack for incident alerts. Document channel conventions in
  layer 05.

**#35 — Decision: Azure-only vs Azure + AWS (revise DEC-001)**
- Label: `decision`
- Milestone: `Phase 1 — Stabilise`
- Body: The JD specifies "Azure and AWS" as required cloud skills. DEC-001 assumed
  Azure only based on interview context. Clarify with CTO: is AWS in active use today,
  is it planned, or is it listed as a desirable skill only? Answer determines scope
  of layer 09 (Infrastructure) and may require updating DEC-001. Block on writing
  layer 09 until resolved.

---

### Decisions still needed

**#27 — Decision: IEC 62304 software class for inference code**
- Label: `decision`
- Milestone: `Phase 1 — Stabilise`
- Body: The rPPG signal processing and BP prediction code — is it Class B or Class C? Class C requires the most stringent controls. Given the clinical significance (BP measurement used for hypertension screening), Class C is likely correct but needs confirmation. This affects testing requirements, independence of verification, and change control stringency. Confirm before writing layers 06 and 07.

**#28 — Decision: Azure ML endpoints vs self-managed inference service**
- Label: `decision`
- Milestone: `Phase 2 — Cost & Resilience`
- Body: Replace the per-container Flask pattern with either (a) Azure ML managed endpoints or (b) self-managed container pool with warm instances on AKS. Azure ML is easier to operate but more expensive. AKS pool gives more control and lower cost but more engineering effort. Decision affects layer 06 and layer 08.

**#29 — Decision: On-device GPU inference feasibility**
- Label: `decision`
- Milestone: `Phase 3 — ML Pipeline`
- Body: Running the BP prediction model on the device GPU (Core ML / TensorFlow Lite) would eliminate cloud inference cost entirely but has regulatory implications — the model runs on uncontrolled hardware, device validation matrix grows, software update process changes. Needs a feasibility assessment and regulatory impact analysis before committing.

**#30 — Decision: Backstage hosting (self-hosted vs Roadie)**
- Label: `decision`
- Milestone: `Phase 4 — Platform`
- Body: Backstage can be self-hosted (free, more effort) or run via Roadie (managed SaaS, ~£400/month). At 20 people, Roadie's operational saving may justify the cost. Decide before writing layer 10.
