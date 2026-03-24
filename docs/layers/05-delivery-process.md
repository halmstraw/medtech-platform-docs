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

## Tooling decisions

| Need | Tool | Rationale |
|---|---|---|
| Sprint boards and backlog | GitHub Projects (iterations) | Native to GitHub, keeps planning in the same audit trail as code |
| Burndown and velocity | GitHub Insights | Built into GitHub Projects, no additional tool needed |
| Definition of Done | PR template checklist | Enforced at merge point, version controlled, includes regulatory fields |
| Retrospectives | Notion page → actions to GitHub Issues | Low friction, actions land in the issue tracker automatically |
| Async standup and comms | Slack + GitHub integration | Surfaces PR, CI, and deployment events in relevant channels |
| Release notifications | GitHub Actions → Slack webhook | Automated, no manual broadcast needed |

**Why no separate Scrum tool:** GitHub Projects covers sprint boards, burndown, and roadmap for a team this size. Adding Jira, Linear, or Shortcut creates a second system with no audit trail connection to GitHub. The compliance cost of split records outweighs any UX benefit.

**Why not a dedicated retrospective tool:** EasyRetro and similar tools produce outputs that don't connect to the issue tracker. Retrospective actions belong in GitHub Issues (labelled `retro-action`) where they are trackable and closeable. The facilitation board can be a shared Notion page — ephemeral is fine, the actions are what matter.

## Slack workspace conventions

Slack is a communication tool, not a decision record. The following conventions apply:

- Architectural decisions → DECISIONS.md and ADRs, not Slack threads
- Process decisions → GitHub Issues, not Slack
- Sprint actions → GitHub Issues labelled `retro-action`
- Slack is inspectable informally but is not compliance evidence

**Recommended channel structure:**

| Channel | Purpose | Key integrations |
|---|---|---|
| `#engineering-general` | Team communication | — |
| `#deployments` | Release and deploy notifications | GitHub Actions webhook |
| `#ci-alerts` | Build failures, Snyk findings | GitHub Actions, Snyk |
| `#incidents` | Production alerts and response | PagerDuty, Grafana |
| `#pr-reviews` | PR opened, review requested | GitHub |
| `#sprint` | Sprint ceremony reminders, velocity posts | GitHub Projects (manual or automated) |

**GitHub + Slack integration:** Install the official GitHub Slack app. Configure per-channel subscriptions so noise is routed correctly — `#pr-reviews` does not need deployment alerts, `#incidents` does not need PR activity.

**Agent notifications:** The ops agent creates GitHub Issues on alert. A separate GitHub → Slack integration surfaces that issue creation in `#incidents` automatically — no additional agent work required.

## Key areas to cover when writing

- Scrum implementation: sprint length (recommend 2 weeks), ceremonies, roles
- Definition of Done checklist items — must include: risk-class field set, traceability
  link present, tests passing in TestRail, no open CRITICAL agent findings
- Velocity tracking via GitHub Insights closed issues per sprint
- Retrospectives: Notion facilitation board, actions to GitHub Issues
- How sprint milestones connect to release branches in GitHub
- AI agent involvement: documentation agent can draft sprint summary from closed issues

## Regulatory hooks

- IEC 62304 §5.1 — Software development planning
- ISO 13485 §8.5.1 — Continual improvement (retrospective actions as CAPA input)
