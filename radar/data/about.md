## How to use this Radar

This radar captures the technology decisions made for a Class IIa medical device software platform.
It is derived from [DECISIONS.md](https://github.com/halmstraw/medtech-platform-docs/blob/main/DECISIONS.md)
and [AMENDMENTS-001.md](https://github.com/halmstraw/medtech-platform-docs/blob/main/docs/AMENDMENTS-001.md)
in the platform documentation repository.

### Rings

| Ring | Meaning |
|---|---|
| **Adopt** | Decided and committed to. Use with confidence. Every tool here has a recorded decision rationale. |
| **Trial** | In active use but under active evaluation. Worth pursuing — watch this space. |
| **Assess** | Open decision or deferred to a later phase. Worth understanding before the decision is made. |
| **Hold** | Explicitly rejected or being phased out. Do not start new work with these. |

### Quadrants

| Quadrant | Scope |
|---|---|
| **Tools** | CI/CD, testing, analysis, and development tooling |
| **Platforms** | Cloud, hosting, deployment, and QMS platforms |
| **Languages & Frameworks** | Programming languages, application frameworks, ML toolkits |
| **Techniques** | Engineering processes, governance models, delivery practices |

### Regulatory context

This is a regulated Class IIa medical device product (EU MDR, FDA 510(k) target).
Tool choices are not purely technical — they carry compliance implications.
Where a decision references a regulatory clause, that is noted in the entry.

Decisions marked ⚠ have open flags that need resolution before dependent work can proceed.

### Contributing

To add or update an entry, edit the corresponding markdown file in
`radar/data/radar/2026-04-09/` and open a pull request. All changes follow
the same review process as the documentation layers.
