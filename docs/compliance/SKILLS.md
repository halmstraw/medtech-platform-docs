# SKILLS.md — Compliance Documentation Conventions

Read this before working on any file in `docs/compliance/`.

---

## What compliance files cover

Each compliance file maps the platform's tooling and processes to the specific requirements of a regulatory framework. They are evidence documents — they answer the question "how does this platform satisfy [regulation]?"

## Audience

These files may be read by:
- A Notified Body assessor (EU MDR / ISO 13485)
- An FDA reviewer (510(k) submission support)
- An internal quality manager
- A potential acquirer's due diligence team

Write accordingly — precise, evidenced, no hand-waving.

## Structure for each compliance file

1. **Framework overview** — brief statement of what the regulation requires at a high level
2. **Applicability** — how it applies to this specific product (Class IIa, rPPG, SaaS delivery model)
3. **Requirement mapping table** — clause by clause, what the platform does to address it, and what evidence it produces
4. **Gaps and mitigations** — honest statement of any areas not yet fully addressed (current state) and the plan
5. **Evidence artefacts** — list of the specific artefacts this platform produces that constitute compliance evidence

## The FDA 510(k) file is the most critical

The FDA submission is the company's stated near-term goal. This file should be detailed enough to inform the actual SDLC section of a submission. Key areas:
- Software level of concern (likely Moderate given Class IIa, BP measurement)
- SOUP (Software of Unknown Provenance) analysis requirements
- Cybersecurity documentation requirements (SBOM, vulnerability management)
- Anomaly resolution process (maps to GitHub Issues defect workflow)
- Version control evidence (maps to GitHub source control layer)

## Regulatory clause citation format

Always use the format: `[Standard] [Clause number] — [Clause title]`

Example: `IEC 62304 §5.7.4 — Evaluate software system testing`

## Never overstate compliance

If the platform addresses a requirement partially, say so. If a requirement is not yet addressed (current state gap), say so and reference the roadmap phase that closes it. Auditors respect honesty; they distrust overstatement.

## GDPR / NHS DSP Toolkit specifics

The product processes anonymised biometric data from NHS patients. Key considerations:
- Data is anonymised before leaving the device — this is a significant privacy protection
- The cloud processing (Azure UK South / UK West for NHS data residency) must be documented
- NHS Digital Data Security and Protection Toolkit submission is an annual requirement
- ORCHA certification is already held — reference this as evidence of app store compliance
