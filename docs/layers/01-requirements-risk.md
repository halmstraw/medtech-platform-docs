# Layer: 01 — Requirements and Risk

<!-- STATUS: COMPLETE -->
<!-- Read docs/layers/SKILLS.md before writing this file -->

## Purpose

Defines how requirements are captured, structured, prioritised, and traced through to
delivery — and how risk is identified, classified, and managed in parallel. For a Class
IIa medical device, requirements and risk are not separate concerns: a change to a
clinical requirement may introduce a safety risk, and a risk item may generate a new
requirement. This layer establishes the single source of truth for both.

Traceability from requirement through to test execution is a core FDA and IEC 62304
obligation. This layer makes that chain automatic, not a manual discipline.

---

## Target state

Every piece of work enters the system as a structured GitHub Issue. Issues are
source-labelled, typed, risk-classified by the Product Owner, and DoR-compliant before
entering a sprint. The Compliance agent enforces DoR at sprint entry and traceability
at PR merge. Risk items that require formal management live in Qualio under ISO 14971.

The backlog is the single prioritised list. Grooming is the ongoing process of bringing
issues to DoR-compliant — it is not a separate ceremony but the natural outcome of the
PO maintaining the backlog between sprints.

---

## Issue template

Four variants share a common core. All fields in the core are mandatory for DoR. Type-specific
fields are mandatory for that type only.

### Core fields (all types)

```markdown
## Type
<!-- Epic / Story / Task / Spike / Bug -->

## Why
<!-- Business value or problem statement. What does this solve and for whom? -->

## Acceptance criteria
<!-- Numbered list. Each criterion must be testable. -->

## Non-functional requirements
<!-- Performance, security, availability, regulatory constraints. "None" is acceptable
     only for internal housekeeping tasks. -->

## Risk class
<!-- A / B / C / Not yet assessed — set by Product Owner before sprint entry -->

## Design change?
<!-- Yes / No / TBD — does this change touch architecture or clinical functionality? -->

## Source
<!-- Regulatory / Clinical / Customer / Internal / Agent-generated -->

## Prerequisites
<!-- Designs confirmed, architecture decision made, test data available, etc. -->

## Dependencies
<!-- Links to blocking or related issues -->

## Testing scope
<!-- Unit / Integration / Regression / Performance / Penetration / Manual QA -->

## TestRail link
<!-- Added at sprint entry when test case is created -->
```

### Epic — additional fields

Epics represent a significant piece of work spanning potentially multiple sprints.
They act as the source of truth for a feature — all stories, tasks, and bugs link
back to the parent epic for traceability.

```markdown
## Strategic objective / OKR
<!-- Which business objective does this epic advance?
     e.g. "Phase 1 — Stabilise and make auditable"
          "FDA 510(k) submission readiness"
          "Reduce per-assessment cost to under 1p"
          "Acquirer readiness — clean engineering story" -->

## Scope
<!-- What is in scope and explicitly what is out of scope -->

## Dependencies
<!-- Links to blocking epics or external dependencies -->
```

### Story — additional fields

Stories describe functionality from the user or B2B partner perspective. Include the
user story statement above the acceptance criteria:

```markdown
## User story
As a [role]
I want [capability]
So that [benefit]
```

### Spike — additional fields

Spikes are time-boxed analysis tasks. They produce a decision or a set of stories —
not shippable code. Include:

```markdown
## Analysis context
<!-- What question needs answering? What is currently unknown? -->

## Expected outcome
<!-- Decision made / stories created / technical approach agreed -->

## Timebox
<!-- Maximum sprint allocation — spikes do not carry over -->
```

### Bug — additional fields

Bugs must include reproduction evidence. Without it they cannot be triaged.

```markdown
## Steps to reproduce
<!-- Numbered sequence from a clean state -->

## Current behaviour
<!-- What happens -->

## Expected behaviour
<!-- What should happen -->

## Environment
<!-- OS, device model, app version, SDK version -->

## Evidence
<!-- Screenshots, videos, log extracts — attach to issue -->
```

---

## Definition of Ready

An issue is sprint-ready when all of the following are true. The Compliance agent
checks these criteria when an issue is moved to a sprint milestone:

- [ ] Type set
- [ ] "Why" completed — business value or problem statement present
- [ ] Acceptance criteria defined and testable
- [ ] Non-functional requirements stated (or explicitly noted as none)
- [ ] User story statement present (Stories only)
- [ ] Analysis context and expected outcome present (Spikes only)
- [ ] Reproduction steps and environment present (Bugs only)
- [ ] Risk class set by the Product Owner
- [ ] Design change flag set (Yes / No / TBD not acceptable for sprint entry)
- [ ] Source label applied
- [ ] Prerequisites identified (or explicitly noted as none)
- [ ] Dependencies linked or noted as none
- [ ] Testing scope defined
- [ ] Estimate set (Fibonacci points)

Grooming is the process of bringing backlog issues to this state. The Product Owner
maintains DoR-compliance on the backlog continuously — issues that are not DoR-compliant
cannot enter a sprint.

---

## Requirement sources

Requirements enter the system from multiple sources. Source is a mandatory label on
every issue. Source affects default prioritisation weight and the evidence required
to close the issue.

| Source | Label | Default weight | Notes |
|---|---|---|---|
| Regulatory | `source:regulatory` | Highest | Must be traceable to specific clause at closure |
| Clinical | `source:clinical` | High | Safety-relevant by default — risk class B or C unless PO overrides |
| Customer / B2B | `source:customer` | Medium | Feature requests and SDK integration requirements |
| Internal | `source:internal` | Standard | Tech debt, architectural improvements, engineering-led changes |
| Agent-generated | `source:agent` | Standard | Findings from Compliance, Ops, or ML Validation agents automatically raised as issues |

---

## Risk management

Risk items that require formal management under ISO 14971 are raised in Qualio, not
GitHub. The trigger for a Qualio risk item is a GitHub Issue with:
- Risk class B or C, **and**
- Design change flag set to Yes

The Product Owner owns this decision. When both conditions are met, a Qualio risk item
is created and linked to the GitHub Issue. The GitHub Issue cannot be closed until the
linked Qualio risk item is resolved.

Risk class definitions (IEC 62304 software safety class):
- **Class A** — no injury or damage to health possible
- **Class B** — non-serious injury possible
- **Class C** — death or serious injury possible

For the rPPG BP monitoring product, the inference pipeline and any code that affects
assessment output is Class C by default. SDK components that affect signal capture are
Class B minimum.

---

## AI agent involvement

**Compliance agent** — enforces DoR at sprint entry. Checks all mandatory template
fields are populated when an issue is moved to a sprint milestone. Posts a structured
report to the issue listing any missing fields. The issue cannot be sprint-ready until
the report is clear.

The Compliance agent also enforces traceability at PR merge — confirming that the linked
issue has a TestRail test case and execution record before the PR can be marked ready
for review.

**Documentation agent** — generates two outputs from the requirements layer:

- **What's coming:** a summary of sprint-ready issues for the upcoming sprint, posted
  to the `#sprint` Slack channel ahead of sprint planning
- **What's next:** a prioritised view of the top backlog items approaching DoR-compliant,
  useful for stakeholder visibility and partner communication

---

## Human responsibilities

The following must remain human-owned:

- **Product Owner** — sets risk class and design change flag on every issue. Creates
  Qualio risk items for Class B/C design changes. Owns backlog prioritisation and DoR
  compliance. Accepts or rejects completed issues against AC.
- **Engineers** — raise issues for internal requirements and agent-generated findings.
  Link dependencies. Define testing scope for their own work items.
- **No agent may create, close, or prioritise issues autonomously** — agents may raise
  issues (Compliance, Ops, ML Validation agents) but a human must triage and assign
  them before they enter the backlog.

---

## Regulatory hooks

**IEC 62304 §5.2 — Software requirements analysis**
GitHub Issues with mandatory AC, source label, and risk classification constitute the
software requirements record. The Compliance agent's DoR check produces an auditable
record of each issue's readiness state at sprint entry.

**IEC 62304 §5.7.5 — Traceability**
The requirement → test case → execution chain is enforced automatically. GitHub Issue
links to TestRail test case; TestRail execution links back to the issue. The Compliance
agent's PR traceability check produces evidence of this chain at every merge.

**ISO 14971 §4 — Risk analysis process**
Risk items in Qualio are triggered by Class B/C design changes in GitHub. Every Qualio
risk item is linked to the originating GitHub Issue, creating a traceable connection
between the engineering change and the formal risk record.

**ISO 13485 §7.2 — Customer-related processes**
Customer and B2B partner requirements are source-labelled and traceable through to
delivery. The `source:customer` label and AC sign-off by the PO constitute the
customer requirements review record required by §7.2.

---

## Connections

**Feeds in from:**
- Clinical studies and post-market surveillance — clinical source requirements
- B2B partner integrations — customer source requirements
- Regulatory guidance updates — regulatory source requirements
- Compliance, Ops, and ML Validation agents — agent-generated issues raised automatically

**Feeds into:**
- Layer 05 (Delivery process) — DoR-compliant issues enter the sprint backlog
- Layer 03 (QMS and documentation) — Class B/C design change issues trigger Qualio
  risk items under ISO 14971
- Layer 08 (Testing and verification) — TestRail test cases are created at sprint entry
  from the issue's AC and testing scope fields
