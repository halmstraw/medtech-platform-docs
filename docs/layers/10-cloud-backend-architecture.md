# Layer 10 — Cloud & Backend Architecture

> **Status:** Not started · Tracked in [GitHub Issue #41](https://github.com/halmstraw/medtech-platform-docs/issues/41)

---

## Purpose

This layer documents the design of the cloud-hosted backend — the component where the clinical value of the product is realised. The mobile SDK captures and pre-processes the rPPG signal; everything beyond the device boundary is covered here.

## Scope

- Flask inference service: internal structure, request handling, model invocation
- API contract between the mobile SDK and the backend
- Assessment request lifecycle: RGB signal in → BP/pulse result out
- Service boundaries and responsibilities
- Authentication and authorisation between SDK and backend
- Data flow and transformation stages
- Error handling and graceful degradation

## Current state

The inference service is a Python/Flask application deployed as a new container instance per assessment. No formal API contract documentation exists. Authentication mechanism is not publicly documented. The service is a single deployable unit with no documented internal component boundaries.

## Target state

*To be defined — see linked GitHub Issue.*

---

*This file is a stub. Content to be written as part of the Cloud & Backend Architecture issue.*
