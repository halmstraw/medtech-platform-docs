---
title: "Graphify"
ring: assess
quadrant: tools
tags: [ai-agents, code-analysis, knowledge-graph, dev-tooling, python]
---

Graphify is an open-source Python skill that ingests code, docs, PDFs, diagrams, and media into a persistent, queryable knowledge graph using Tree-sitter AST parsing, LLM-driven semantic extraction, and Leiden community-detection clustering. Every inferred relationship is tagged EXTRACTED, INFERRED, or AMBIGUOUS with a confidence score, providing an auditable provenance trail useful in regulated development contexts. Code is extracted fully locally with no external API calls; however, non-code artefacts (docs, images) are routed through the configured LLM API, so data-governance and third-party processing policies must be validated before use on regulated artefacts.