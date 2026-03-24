# SKILLS.md — Architecture Documentation Conventions

Read this before working on any file in `docs/architecture/`.

---

## What this folder contains

- **cost-model.md** — detailed monthly cost breakdown for the full stack
- **decisions/** — Architecture Decision Records (ADRs), one file per decision

## ADR format

Every ADR follows the Nygard format exactly. Do not deviate.

```markdown
# ADR-NNN — [Title]

**Date:** [YYYY-MM]  
**Status:** [Proposed | Accepted | Superseded by ADR-NNN]  
**Deciders:** [Who was involved]

## Context

What situation or problem led to this decision? What forces were at play?

## Decision

What was decided? State it clearly in one or two sentences.

## Rationale

Why this option over the alternatives?

## Consequences

What becomes easier? What becomes harder? What is the ongoing commitment?

## Alternatives considered

| Option | Reason rejected |
|---|---|
| ... | ... |
```

## ADR numbering

ADRs are numbered sequentially: ADR-001, ADR-002, etc. Never renumber. Superseded ADRs keep their number and get a status update pointing to the superseding ADR.

## ADR immutability

Once an ADR is marked Accepted, its content is not edited. If the decision changes, a new ADR is created with status "Supersedes ADR-NNN" and the original is updated to "Superseded by ADR-NNN."

## Cost model conventions

- All costs in GBP (£), monthly
- Mark as estimates with the basis (per user, usage-based, etc.)
- Split into: Engineering tooling, Regulated/QMS tooling, Infrastructure, AI/agents
- Include a "phase 1 only" column showing the minimal viable cost before the full stack is in place
- Update when decisions change tool choices
