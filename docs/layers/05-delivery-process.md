# Layer: 05 — Delivery Process

<!-- STATUS: COMPLETE -->
<!-- Read docs/layers/SKILLS.md before writing this file -->

## Purpose

Defines the engineering delivery process — sprint discipline, definition of done,
retrospectives, and velocity tracking. For a regulated MedTech product, the delivery
process is not just an operational concern: it is compliance evidence. IEC 62304 §5.1
requires a documented software development plan, and the sprint cadence, DoD criteria,
and retrospective records collectively constitute that plan in action.

---

## Target state

1-week sprints. Every sprint produces a release candidate tagged in GitHub. Whether that
candidate is promoted to production is a separate human gate — but the pipeline always
produces shippable software. This discipline is intentional: early-phase work is volatile,
and 1-week sprints limit the blast radius when priorities shift while maintaining a
continuous evidence trail of controlled releases.

Ceremonies are kept lightweight for a small team:

| Ceremony | Cadence | Duration | Format |
|---|---|---|---|
| Sprint planning | Weekly (Monday) | 45 min | GitHub Projects board review, milestone set |
| Daily standup | Daily | 15 min | Async via Slack or brief sync |
| Sprint review + retrospective | Weekly (Friday) | 45 min | Combined PO session — show and tell then retro |

The combined Friday session is facilitated by the Documentation agent (see AI agent
involvement below). Engineers arrive without preparation — the agent has done it.

---

## Tool choices

| Need | Tool | Rationale |
|---|---|---|
| Sprint boards and backlog | GitHub Projects (iterations) | Native to GitHub, planning stays in the same audit trail as code |
| Burndown and velocity | GitHub Insights | Built into GitHub Projects, no additional tool required |
| Definition of Done | PR template checklist | Enforced at merge point, version controlled, includes regulatory fields |
| Sprint review and retro prep | Documentation agent | Pre-populates show and tell and retro board from closed issues and sprint data |
| Retro actions | GitHub Issues (`retro-action` label) | Actions land directly in the issue tracker, trackable and closeable |
| Sprint summary | GitHub milestone + `#sprint` Slack | Agent posts ahead of Friday session, visible to whole team |
| Release notifications | GitHub Actions → Slack webhook | Automated, no manual broadcast needed |

**Why no separate Scrum tool:** GitHub Projects covers sprint boards, burndown, and
roadmap for a team this size. Adding Jira, Linear, or Shortcut creates a second system
with no audit trail connection to GitHub. The compliance cost of split records outweighs
any UX benefit.

---

## Definition of Done

Every issue must satisfy the following before it is moved to Done. These are enforced
via the PR template checklist:

**Acceptance criteria**
- [ ] Acceptance criteria are 100% met and confirmed with the Product Owner
- [ ] All functional and non-functional requirements completed
- [ ] No open to-dos remain in the work item
- [ ] Risk class set on the issue by the Product Owner prior to sprint entry

**Code quality**
- [ ] Code peer-reviewed and approved by at least one engineer
- [ ] No open CRITICAL findings from the Code Review agent
- [ ] Static analysis (SonarCloud) reports no new issues
- [ ] Code merged into the sprint branch; build and deployment pipeline passing

**Testing**
- [ ] All required tests written and passing (unit, integration, regression)
- [ ] TestRail execution linked and result recorded
- [ ] Traceability link present (GitHub Issue → test case → execution)
- [ ] No high or critical severity defects open (or explicitly accepted by PO with rationale recorded)
- [ ] No performance degradation from previous version

**Documentation**
- [ ] Documentation created or updated if behaviour changed
- [ ] Release-related documents updated and consistent

**Housekeeping**
- [ ] Temporary environments, test data, or configurations cleaned up

**Sign-off**
- [ ] User story accepted by the Product Owner
- [ ] Feature demonstrated at sprint review

---

## AI agent involvement

The **Documentation agent** owns sprint ceremony preparation:

- At sprint close, queries GitHub for all issues closed in the milestone
- Builds a show and tell narrative from issue titles, descriptions, and linked PRs
- Generates a retro board pre-populated from sprint data: carried-over issues, CI
  failures during the sprint, CRITICAL agent findings raised and resolved
- Posts the sprint summary as a comment on the closing milestone
- Posts the sprint summary to the `#sprint` Slack channel ahead of the Friday session

Engineers and the PO arrive at the Friday session with context already prepared. The
retro facilitation is lightweight — the agent surfaces the data, humans draw the
conclusions and agree actions.

Retro actions are captured as GitHub Issues with the `retro-action` label during the
session.

---

## Human responsibilities

The following must remain human-owned and cannot be delegated to an agent:

- **Sprint planning decisions** — what enters the sprint, what is deferred
- **Risk classification** — the Product Owner sets the IEC 62304 software safety class
  (A, B, or C) on every issue before it enters a sprint. This determines the testing
  rigour required to satisfy the DoD
- **Product Owner acceptance** — AC confirmed and story accepted by the PO
- **Production release sign-off** — every sprint produces a release candidate; promotion
  to production requires explicit human approval
- **Retrospective action decisions** — the agent surfaces data, humans decide actions

---

## Regulatory hooks

**IEC 62304 §5.1 — Software development planning**
The sprint cadence, DoD checklist, and milestone records constitute the software
development plan in action. GitHub Projects iteration records and closed milestone
histories are retained as immutable evidence of the plan being followed.

**ISO 13485 §8.5.1 — Continual improvement**
Retrospective actions captured as `retro-action` GitHub Issues provide a traceable
continual improvement record. Each action is raised, assigned, and closed in the same
system as all other work — creating an auditable CAPA input trail without a separate
process.

---

## Connections

**Feeds in from:**
- Layer 01 (Requirements and risk) — GitHub Issues enter the sprint backlog from the
  requirements layer. Risk class must be set by the PO before an issue is sprint-ready.

**Feeds into:**
- Layer 06 (CI/CD pipeline) — every sprint milestone closure triggers a release
  candidate build. The pipeline produces the tagged artefact; this layer defines the
  cadence that drives it.
- Layer 08 (Testing and verification) — the DoD requires TestRail execution linked and
  passing. Sprint velocity data informs test planning capacity.
- Layer 03 (QMS and documentation) — retrospective `retro-action` issues feed into the
  ISO 13485 CAPA process managed in Qualio.
