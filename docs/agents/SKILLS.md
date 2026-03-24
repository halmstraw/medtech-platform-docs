# SKILLS.md — Agent Documentation Conventions

Read this before working on any file in `docs/agents/`.

---

## What each agent file covers

Every agent file follows the same structure:

1. **Purpose** — the specific problem this agent solves
2. **Identity** — the GitHub App / service account name and token scopes
3. **Trigger** — what causes the agent to run
4. **Zone** — which trust zone this agent operates in
5. **Inputs** — what the agent reads
6. **Outputs** — what the agent produces (always a comment, issue, or draft — never a merge or deployment)
7. **Prompt design** — the system prompt structure and key instructions
8. **Explicit restrictions** — what this agent cannot do (repeat the global forbidden list plus agent-specific limits)
9. **Audit trail** — how this agent's actions are logged and attributable
10. **MCP server** — which MCP server(s) this agent uses and what scopes are granted

## The golden rule for every agent file

State explicitly: **this agent cannot approve, merge, deploy, or remediate.** It can only inform. If an agent's output requires action, that action must be taken by a human.

## Token scoping conventions

Every agent operates under a GitHub App with the minimum permissions required. Document the exact scopes:

- `contents: read` — can read code
- `pull-requests: write` — can post PR comments
- `issues: write` — can create issues
- `checks: read` — can read CI status

No agent ever holds `administration` scope. No agent ever holds write access to `main` or release branches.

## The ML Validation Agent (agent-ml-validation.md) is unique

This agent is specific to companies where the ML model is a regulated medical device output. It monitors for changes to ML-related files (model weights, training scripts, inference code, feature engineering) and determines whether the change constitutes a design change requiring a formal change request. This is not a generic software engineering agent — it has clinical significance. The prompt must be conservative: when in doubt, flag it.

## MCP server references

Each agent uses one or more MCP servers. The servers available are:
- `github-mcp` — GitHub API access (scoped per agent)
- `grafana-mcp` — Grafana read-only (ops agent only)
- `testrail-mcp` — TestRail read/limited write (compliance agent, CI pipeline)

Document which MCP server each agent uses and what operations it calls.
