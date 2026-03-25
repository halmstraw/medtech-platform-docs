# Layer 12 — Mobile Architecture

<!-- STATUS: STUB — not yet written -->
<!-- Read docs/layers/SKILLS.md before writing this file -->

## Purpose

Defines architectural standards for the iOS (Swift/SwiftUI) and Android (Kotlin) mobile
SDK and applications. The mobile SDK is the primary integration surface for B2B customers
— it is how the company's technology enters partner apps. Architectural quality here
directly affects customer adoption, clinical reliability, and regulatory traceability.

## Current state

Unknown — to be established during onboarding. Assumed to be functional but lacking
formal architectural patterns, shared abstractions across platforms, or documented
versioning strategy.

## Key areas to cover when writing

- Architecture patterns: MVVM and Clean Architecture for both platforms
- rPPG signal capture abstraction — how the camera/green-spectrum capture layer is
  cleanly separated from business logic and UI
- Shared patterns across iOS and Android without sacrificing platform-native quality
- SDK versioning strategy: semantic versioning, deprecation policy, compatibility matrix
- Mobile CI/CD specifics: Fastlane, TestFlight (iOS), Google Play internal track (Android)
- Clinical-grade reliability expectations: what does this mean for error handling,
  signal quality validation, and failure modes?
- IEC 62304 software item classification for the mobile SDK components

## Regulatory hooks

- IEC 62304 §5.3 — Software architectural design
- IEC 62304 §5.4 — Software detailed design
- IEC 62366-1 — Usability engineering (SDK integration UX for B2B developers)

## Open question

What is the current iOS/Android codebase structure? Is it UIKit or SwiftUI on iOS?
Is there a shared abstraction layer or are the platforms fully independent codebases?
Establish during onboarding before writing this layer.

*This section is in progress.*
