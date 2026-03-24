# AMENDMENTS-001 — Layer Structure Revision

**Reason:** Job description received (Principal Architect and AI Lead, March 2026 v1).
Four responsibilities are not adequately covered by the current ten layers.
This document contains every change needed. Execute in order.

**New layers being added:**
- Delivery Process (Scrum, sprint discipline, DoD)
- Mobile Architecture (iOS/Android SDK, rPPG abstraction)
- Security Architecture (threat modelling, encryption, audit logging)
- AI Engineering Strategy (agentic frameworks, guardrails, LLM tooling)

**Decision flag raised:**
- DEC-001 assumed Azure-only. JD specifies "Azure and AWS." Needs clarification
  before layer 08 (Infrastructure) is written. See Amendment 6.

---

## Amendment 1 — Rename and reorder layer files

Run these shell commands from the repo root to rename existing files.
The new numbering creates space for the four new layers in logical positions.

```bash
BASE="/Users/timhalmshaw/dev/med-startup/medtech-platform-docs/docs/layers"

# Rename existing layers to revised numbering
mv "$BASE/01-requirements-risk.md"    "$BASE/01-requirements-risk.md"      # unchanged
mv "$BASE/02-design-ux.md"            "$BASE/02-design-ux.md"              # unchanged
mv "$BASE/03-qms-documentation.md"    "$BASE/03-qms-documentation.md"      # unchanged
mv "$BASE/04-source-control.md"       "$BASE/04-source-control.md"         # unchanged
mv "$BASE/05-ci-cd-pipeline.md"       "$BASE/06-ci-cd-pipeline.md"         # 05 → 06
mv "$BASE/06-ml-pipeline.md"          "$BASE/07-ml-pipeline.md"            # 06 → 07
mv "$BASE/07-testing-verification.md" "$BASE/08-testing-verification.md"   # 07 → 08
mv "$BASE/08-infrastructure.md"       "$BASE/09-infrastructure.md"         # 08 → 09
mv "$BASE/09-observability.md"        "$BASE/10-observability.md"          # 09 → 10
mv "$BASE/10-developer-experience.md" "$BASE/14-developer-experience.md"   # 10 → 14
```

**New numbering rationale:**
- 01 Requirements and risk
- 02 Design and UX
- 03 QMS and documentation
- 04 Source control
- **05 Delivery process** ← NEW
- 06 CI/CD pipeline
- 07 ML pipeline
- 08 Testing and verification
- 09 Infrastructure
- 10 Observability
- **11 Mobile architecture** ← NEW
- **12 Security architecture** ← NEW
- **13 AI engineering strategy** ← NEW
- 14 Developer experience

---

## Amendment 2 — Create four new stub files

Create each file with the content shown exactly.

### File: `docs/layers/05-delivery-process.md`

```markdown
# Layer: 05 — Delivery Process

<!-- STATUS: STUB — not yet written -->
<!-- Read docs/layers/SKILLS.md before writing this file -->

## Purpose

Defines the engineering delivery process — sprint discipline, definition of done,
retrospectives, and velocity tracking. For a regulated MedTech product, the delivery
process is not just an operational concern: it is compliance evidence. IEC 62304 §5.1
requires a documented software development plan, and the sprint cadence, DoD criteria,
and retrospective records collectively constitute that plan in action.

## Current state

Delivery is ad hoc. No formal sprint structure. No documented definition of done.
Releases are driven by the data scientist or individual engineers without a coordinated
cadence or governance checkpoint.

## Key areas to cover when writing

- Scrum implementation: sprint length, ceremonies, roles (who is the Product Owner?)
- Definition of Done — must include regulatory checklist items (risk class set,
  traceability link present, tests passing in TestRail)
- Velocity tracking and capacity planning
- Retrospectives as a continuous improvement record (ISO 13485 §8.5 CAPA input)
- How sprints connect to GitHub Projects milestones and release branches
- AI agent involvement in sprint reporting or retrospective summarisation

## Regulatory hooks

- IEC 62304 §5.1 — Software development planning
- ISO 13485 §8.5.1 — Continual improvement (retrospectives as evidence)

*This section is in progress.*
```

---

### File: `docs/layers/11-mobile-architecture.md`

```markdown
# Layer: 11 — Mobile Architecture

<!-- STATUS: STUB — not yet written -->
<!-- Read docs/layers/SKILLS.md before writing this file -->

## Purpose

Defines architectural standards for the iOS (Swift/SwiftUI) and Android (Kotlin) mobile
SDK and applications. The mobile SDK is the primary integration surface for B2B customers
— it is how the company's technology enters partner apps. Architectural quality here
directly affects customer adoption, clinical reliability, and regulatory traceability.

## Current state

Unknown — to be established during onboarding. Assumed to be functional but lacking
formal architectural patterns, shared abstractions across platforms, or documented
versioning strategy.

## Key areas to cover when writing

- Architecture patterns: MVVM and Clean Architecture for both platforms
- rPPG signal capture abstraction — how the camera/green-spectrum capture layer is
  cleanly separated from business logic and UI
- Shared patterns across iOS and Android without sacrificing platform-native quality
- SDK versioning strategy: semantic versioning, deprecation policy, compatibility matrix
- Mobile CI/CD specifics: Fastlane, TestFlight (iOS), Google Play internal track (Android)
- Clinical-grade reliability expectations: what does this mean for error handling,
  signal quality validation, and failure modes?
- IEC 62304 software item classification for the mobile SDK components

## Regulatory hooks

- IEC 62304 §5.3 — Software architectural design
- IEC 62304 §5.4 — Software detailed design
- IEC 62366-1 — Usability engineering (SDK integration UX for B2B developers)

## Open question

What is the current iOS/Android codebase structure? Is it UIKit or SwiftUI on iOS?
Is there a shared abstraction layer or are the platforms fully independent codebases?
Establish during onboarding before writing this layer.

*This section is in progress.*
```

---

### File: `docs/layers/12-security-architecture.md`

```markdown
# Layer: 12 — Security Architecture

<!-- STATUS: STUB — not yet written -->
<!-- Read docs/layers/SKILLS.md before writing this file -->

## Purpose

Defines security as an architectural discipline — not a set of tools bolted onto the
pipeline, but a set of principles applied at every layer. For a medical device handling
anonymised biometric data from NHS patients, security-by-design is both a regulatory
requirement and a commercial necessity. A breach or vulnerability in a clinical context
carries consequences beyond the technical.

## Current state

Security tooling exists at the pipeline level (Snyk, SonarCloud) but there is no
documented security architecture, threat model, or data classification framework.
Cyber Essentials Plus certification is held, which provides a baseline.

## Key areas to cover when writing

- Threat modelling approach (STRIDE or similar) applied to the rPPG assessment flow
- Data classification: what is the sensitivity of the RGB signal data, assessment
  results, device identifiers?
- Encryption at rest and in transit — Azure Key Vault, TLS configuration standards
- Anonymisation pipeline: where exactly does anonymisation occur (on-device, in SDK,
  before cloud transmission)?
- Audit logging strategy: what is logged, where, for how long, and who can access?
- Identity and access management: engineers, agents, service accounts, B2B partners
- Vulnerability management lifecycle: Snyk findings → triage → remediation → closure
- SBOM as a security artefact (FDA cybersecurity guidance 2023)
- Penetration testing cadence and scope

## Regulatory hooks

- ISO 13485 §4.1 — General QMS requirements (security as part of quality)
- IEC 62304 §5.2 — Software requirements (security requirements)
- FDA Cybersecurity Guidance 2023 — SBOM, vulnerability management, coordinated
  disclosure policy
- GDPR Article 32 — Security of processing (encryption, pseudonymisation)
- NHS DSP Toolkit — Data Security Standard requirements

*This section is in progress.*
```

---

### File: `docs/layers/13-ai-engineering-strategy.md`

```markdown
# Layer: 13 — AI Engineering Strategy

<!-- STATUS: STUB — not yet written -->
<!-- Read docs/layers/SKILLS.md before writing this file -->

## Purpose

Defines the strategy for AI augmentation of the engineering organisation — which
agentic frameworks are used, how LLM-based tooling is selected and governed, and
critically what guardrails exist for AI-generated code in a regulated product context.
This layer is distinct from the individual agent specifications in `docs/agents/` —
it covers the strategic and governance level, not the implementation detail.

## Current state

No formal AI augmentation in the engineering workflow. Individual engineers may use
AI coding assistants informally, but there are no standards, no guardrails, and no
governance. AI-generated code entering a regulated medical device without review
standards is a specific risk that needs to be addressed explicitly.

## Key areas to cover when writing

- LLM tooling selection criteria: what makes a tool appropriate for use in a regulated
  engineering context? (Data residency, audit trail, no training on proprietary code)
- Agentic framework evaluation: Claude/Anthropic API as primary, LangChain and AutoGen
  as alternatives — rationale for choice
- The five agents defined in this stack and how they implement the strategy
- Guardrails for AI-generated code: review requirements, test coverage expectations,
  the prohibition on AI merging or deploying
- Prompt engineering standards: how prompts are versioned, reviewed, and updated
- The trust zone model as the governance framework for all agent activity
- How AI augmentation multiplies throughput for a small team
- Longer-term vision: on-device inference, AI-assisted clinical evidence synthesis,
  automated PMS reporting

## Regulatory hooks

- IEC 62304 §5.5 — Software unit implementation (AI-generated code is still code
  that must meet implementation standards)
- ISO 13485 §7.5 — Production and service provision (AI tooling as part of the
  development infrastructure)
- FDA AI/ML SaMD guidance — if the ML model itself is updated by AI-assisted
  processes, additional considerations apply

## Note on scope

This layer covers AI as a tool for engineers. The ML pipeline (layer 07) covers AI
as the clinical product — the BP prediction model. These are distinct and must not
be conflated in documentation.

*This section is in progress.*
```

---

## Amendment 3 — Update README.md layer table

In `README.md`, find the architecture layers table and replace it with the updated version.

**Find this exact block:**

```markdown
| Layer | Document |
|---|---|
| Requirements and planning | [01-requirements-risk.md](docs/layers/01-requirements-risk.md) |
| Design and UX | [02-design-ux.md](docs/layers/02-design-ux.md) |
| QMS and documentation | [03-qms-documentation.md](docs/layers/03-qms-documentation.md) |
| Source control | [04-source-control.md](docs/layers/04-source-control.md) |
| CI/CD pipeline | [05-ci-cd-pipeline.md](docs/layers/05-ci-cd-pipeline.md) |
| ML pipeline | [06-ml-pipeline.md](docs/layers/06-ml-pipeline.md) |
| Testing and verification | [07-testing-verification.md](docs/layers/07-testing-verification.md) |
| Infrastructure (Azure) | [08-infrastructure.md](docs/layers/08-infrastructure.md) |
| Observability | [09-observability.md](docs/layers/09-observability.md) |
| Developer experience | [10-developer-experience.md](docs/layers/10-developer-experience.md) |
```

**Replace with:**

```markdown
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
| 10 Observability | [10-observability.md](docs/layers/10-observability.md) |
| 11 Mobile architecture | [11-mobile-architecture.md](docs/layers/11-mobile-architecture.md) |
| 12 Security architecture | [12-security-architecture.md](docs/layers/12-security-architecture.md) |
| 13 AI engineering strategy | [13-ai-engineering-strategy.md](docs/layers/13-ai-engineering-strategy.md) |
| 14 Developer experience | [14-developer-experience.md](docs/layers/14-developer-experience.md) |
```

---

## Amendment 4 — Update CLAUDE.md file structure block

In `CLAUDE.md`, find the layers section of the file structure block and replace it.

**Find:**

```
│   ├── layers/
│   │   ├── SKILLS.md
│   │   ├── 01-requirements-risk.md
│   │   ├── 02-design-ux.md
│   │   ├── 03-qms-documentation.md
│   │   ├── 04-source-control.md
│   │   ├── 05-ci-cd-pipeline.md
│   │   ├── 06-ml-pipeline.md
│   │   ├── 07-testing-verification.md
│   │   ├── 08-infrastructure.md
│   │   ├── 09-observability.md
│   │   └── 10-developer-experience.md
```

**Replace with:**

```
│   ├── layers/
│   │   ├── SKILLS.md
│   │   ├── 01-requirements-risk.md
│   │   ├── 02-design-ux.md
│   │   ├── 03-qms-documentation.md
│   │   ├── 04-source-control.md
│   │   ├── 05-delivery-process.md
│   │   ├── 06-ci-cd-pipeline.md
│   │   ├── 07-ml-pipeline.md
│   │   ├── 08-testing-verification.md
│   │   ├── 09-infrastructure.md
│   │   ├── 10-observability.md
│   │   ├── 11-mobile-architecture.md
│   │   ├── 12-security-architecture.md
│   │   ├── 13-ai-engineering-strategy.md
│   │   └── 14-developer-experience.md
```

---

## Amendment 5 — Update SKILLS.md layer numbering note

In `docs/layers/SKILLS.md`, find the layer numbering section and replace it.

**Find:**

```markdown
## Layer numbering

Layers are numbered 01–10. Do not renumber — GitHub Issues and cross-references use these numbers.
```

**Replace with:**

```markdown
## Layer numbering

Layers are numbered 01–14 following AMENDMENTS-001. Do not renumber further without
creating a new amendments document. GitHub Issues and cross-references use these numbers.

Current order:
01 Requirements and risk · 02 Design and UX · 03 QMS and documentation
04 Source control · 05 Delivery process · 06 CI/CD pipeline · 07 ML pipeline
08 Testing and verification · 09 Infrastructure · 10 Observability
11 Mobile architecture · 12 Security architecture · 13 AI engineering strategy
14 Developer experience
```

---

## Amendment 6 — Flag DEC-001 for revision

In `DECISIONS.md`, find DEC-001 and add a flag at the end of that entry.

**Find:**

```markdown
**Alternatives considered:** AWS (rejected — migration cost, no existing footprint), GCP (rejected — same reasons).
```

**Replace with:**

```markdown
**Alternatives considered:** AWS (rejected — migration cost, no existing footprint), GCP (rejected — same reasons).

> ⚠️ **FLAG — AMENDMENTS-001:** The March 2026 JD specifies "Azure and AWS" as a
> required skill. This may indicate the company is multi-cloud or planning to be.
> Clarify with CTO before writing layer 09 (Infrastructure). If AWS is in active use,
> this decision must be revised and layer 09 rewritten to cover both platforms.
> Update this entry and remove this flag once clarified.
```

---

## Amendment 7 — Add four new issues to SETUP-ISSUES.md

In `SETUP-ISSUES.md`, find the line:

```markdown
### Decisions still needed
```

Insert the following four issues immediately before that line:

```markdown
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

```

Also add one new decision issue:

```markdown
**#35 — Decision: Azure-only vs Azure + AWS (revise DEC-001)**
- Label: `decision`
- Milestone: `Phase 1 — Stabilise`
- Body: The JD specifies "Azure and AWS" as required cloud skills. DEC-001 assumed
  Azure only based on interview context. Clarify with CTO: is AWS in active use today,
  is it planned, or is it listed as a desirable skill only? Answer determines scope
  of layer 09 (Infrastructure) and may require updating DEC-001. Block on writing
  layer 09 until resolved.

```

---

## Verification checklist

After making all amendments, confirm:

- [ ] `docs/layers/` contains exactly 14 numbered files plus SKILLS.md
- [ ] `docs/layers/05-delivery-process.md` exists with stub content
- [ ] `docs/layers/11-mobile-architecture.md` exists with stub content
- [ ] `docs/layers/12-security-architecture.md` exists with stub content
- [ ] `docs/layers/13-ai-engineering-strategy.md` exists with stub content
- [ ] `docs/layers/06-ci-cd-pipeline.md` exists (was 05)
- [ ] `docs/layers/07-ml-pipeline.md` exists (was 06)
- [ ] `docs/layers/08-testing-verification.md` exists (was 07)
- [ ] `docs/layers/09-infrastructure.md` exists (was 08)
- [ ] `docs/layers/10-observability.md` exists (was 09)
- [ ] `docs/layers/14-developer-experience.md` exists (was 10)
- [ ] README.md layer table has 14 rows
- [ ] CLAUDE.md file structure block shows 14 layers
- [ ] DECISIONS.md DEC-001 has the ⚠️ flag
- [ ] SETUP-ISSUES.md has issues #31–#35
- [ ] No files named `05-ci-cd-pipeline.md`, `06-ml-pipeline.md`, `07-testing-*`,
      `08-infrastructure.md`, `09-observability.md`, `10-developer-experience.md` exist
      (old numbering — should all be renamed)

---

*AMENDMENTS-001 — created from session 1 conversation, March 2026*
*Apply in full before starting any new layer content work*
