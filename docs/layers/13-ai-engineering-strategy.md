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
