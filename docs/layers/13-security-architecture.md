# Layer 13 — Security Architecture

<!-- STATUS: STUB — not yet written -->
<!-- Read docs/layers/SKILLS.md before writing this file -->

## Purpose

Defines security as an architectural discipline — not a set of tools bolted onto the
pipeline, but a set of principles applied at every layer. For a medical device handling
anonymised biometric data from NHS patients, security-by-design is both a regulatory
requirement and a commercial necessity. A breach or vulnerability in a clinical context
carries consequences beyond the technical.

## Current state

Security tooling exists at the pipeline level (Snyk, SonarCloud) but there is no
documented security architecture, threat model, or data classification framework.
Cyber Essentials Plus certification is held, which provides a baseline.

## Key areas to cover when writing

- Threat modelling approach (STRIDE or similar) applied to the rPPG assessment flow
- Data classification: what is the sensitivity of the RGB signal data, assessment
  results, device identifiers?
- Encryption at rest and in transit — Azure Key Vault, TLS configuration standards
- Anonymisation pipeline: where exactly does anonymisation occur (on-device, in SDK,
  before cloud transmission)?
- Audit logging strategy: what is logged, where, for how long, and who can access?
- Identity and access management: engineers, agents, service accounts, B2B partners
- Vulnerability management lifecycle: Snyk findings → triage → remediation → closure
- SBOM as a security artefact (FDA cybersecurity guidance 2023)
- Penetration testing cadence and scope

## Regulatory hooks

- ISO 13485 §4.1 — General QMS requirements (security as part of quality)
- IEC 62304 §5.2 — Software requirements (security requirements)
- FDA Cybersecurity Guidance 2023 — SBOM, vulnerability management, coordinated
  disclosure policy
- GDPR Article 32 — Security of processing (encryption, pseudonymisation)
- NHS DSP Toolkit — Data Security Standard requirements

*This section is in progress.*
