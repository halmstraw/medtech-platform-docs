# SKILLS.md — General Documentation Conventions

Read this before working on any file in the `docs/` folder.

---

## Tone and voice

Write as a senior engineer briefing a CTO. Direct, technically specific, no fluff. Not a sales pitch, not an academic paper. Assume the reader is intelligent and time-poor.

- Good: "GitHub Actions produces an immutable workflow run log for every build, retained by GitHub automatically."
- Bad: "GitHub Actions is a powerful and flexible CI/CD solution that can help your team."

## Regulatory references

Always cite the specific clause. Never make vague regulatory claims.

- Good: "IEC 62304 §8.1.3 requires that each software release be reproducible from source."
- Bad: "This helps with IEC 62304 compliance."

If you are not certain of the exact clause, say "IEC 62304 requires..." without a clause number rather than citing incorrectly.

## Current state vs target state

When describing the current state, be honest and non-judgmental. The team built a clinically validated product — the engineering wrapper is what needs work, not the science.

- Good: "Currently, releases are performed manually without a formal build record."
- Bad: "The current process is inadequate and does not meet regulatory requirements."

## Cross-references

Never duplicate content from another file. Link to it instead.

- Good: "See [04-source-control.md](../layers/04-source-control.md) for branch protection configuration."
- Bad: [repeating the branch protection rules]

## File length

Keep files under 300 lines. If a section needs more, split into sub-files and link.

## Tables

Use tables for: tool comparisons, compliance mappings, human vs AI responsibility splits, cost breakdowns. Keep tables concise — if a cell needs more than two sentences, the content belongs in prose below the table.

## Lifelight specifics

Refer to the company as "the company" and the product as "the product" or "the application" unless in a compliance or ADR document where specificity is required. The product characteristics (rPPG, BP measurement, Azure cloud, Python/Flask, iOS/Android SDK) can and should be referenced — just not by brand name.
