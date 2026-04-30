# Interview Q&A — One Liners
## Lifelight · Principal Architect & AI Lead · May 2026

Quick reference for Q&A. One crisp answer per topic. Read the night before, not the morning of.

---

## The Product & Science

**What is rPPG?**
The camera captures micro colour changes in facial skin caused by blood flow. Those colour changes are the cardiac signal. From that signal we extract heart rate and blood pressure.

**Has Lifelight solved BP measurement?**
Yes — both systolic and diastolic, calibration-free, validated to CE Class IIa standard. Six patents, 25,000 paired clinical recordings from 12,500 patients. The science is solved. The platform is what needs to scale.

**What is systolic vs diastolic BP?**
Systolic is the pressure when the heart contracts and pumps — the higher number, the push. Diastolic is the pressure when the heart rests between beats — the lower number. 120/80 means 120 systolic, 80 diastolic.

**What is the ISP problem?**
The phone's image signal processor — auto-exposure, auto-white-balance, H.264 video compression — degrades the rPPG signal before it reaches the pipeline. The on-device extraction pipeline is designed to work around this.

**What is POS and CHROM?**
Two different mathematical methods for separating the cardiac signal from background noise in the video. POS uses the known optical properties of skin. CHROM uses colour ratios. Running both and combining the best signal gives more reliable results than either alone.

**What is SNR?**
Signal to Noise Ratio — how clean the signal is relative to the interference. High SNR means the camera captured a clear blood volume pulse. Low SNR means the signal is buried in noise. After every assessment, the device reports its SNR back — that number is the difference between knowing an assessment failed and knowing why it failed.

**What is MediaPipe?**
A Google framework for on-device computer vision. For Lifelight it tracks 468 face landmarks in real time — forehead, cheeks, eye corners — so the signal extraction always knows exactly which pixels to measure, even if the person moves during the assessment.

**What is the iOS equivalent of MediaPipe?**
Apple's Vision framework — VNDetectFaceLandmarksRequest. Native, optimised for Apple Silicon and the Neural Engine, no third party dependency. The argument for MediaPipe on both platforms is consistency — same landmark behaviour, one thing to validate, one thing to debug.

---

## Architecture & Cost

**Why does the current architecture create a new container per assessment?**
Almost certainly because the Flask app holds assessment state in memory. A new container per assessment guarantees patient data isolation — no risk of data from one patient leaking into another's session. It was a safe pragmatic call. The cost consequence wasn't the priority at that stage.

**Where does the cost saving actually come from?**
The saving comes from keeping the model hot. Currently every cold start loads the ML model weights from scratch — seconds of compute before a single reading runs. A warm pool keeps containers alive between assessments. The model loads once and serves many requests. Same container, many patients, one model load.

**What is the difference between serverless and Flask containers?**
Serverless hides the containers from you. It doesn't remove them. The cold start still happens — Microsoft just makes it invisible. You've moved the problem, not solved it.

**What are sticky sessions and why don't they work here?**
A load balancer trick that routes all requests from one session to the same container. Keeps the stateful design intact but solves nothing on cost — containers still can't be shared between patients. Under load, some containers get overwhelmed while others sit idle.

**What is Redis and why might we need it?**
An in-memory data store — an extremely fast temporary notepad all container instances can read and write to. If the Flask app holds session state, Redis moves that state outside the container so any warm instance can handle any assessment. Patient isolation is then guaranteed by unique assessment IDs, not container boundaries.

**What is AKS vs Azure Container Apps?**
AKS is full Kubernetes — you manage the cluster, more control, more complexity. Azure Container Apps is a managed service — Microsoft handles the orchestration, simpler to operate, right size for a small team. Start with Container Apps. Migrate to AKS when scale and complexity justify it.

---

## Performance & Mobile

**Why is the phone a signal processor not just a camera?**
The rPPG signal is approximately a 1% colour change in skin. The phone has to extract that signal accurately despite ISP interference, motion, and variable lighting — before anything reaches the cloud. Signal quality is determined on the device, not in the cloud.

**What is Metal and Vulkan?**
GPU compute frameworks — Metal on iOS, Vulkan on Android. They give direct access to the phone's graphics processor for compute-heavy workloads. Running the signal extraction pipeline on the GPU means it processes every video frame fast enough to keep up with live camera input without draining the battery or blocking the UI.

**What is MVVM and Clean Architecture?**
MVVM separates what the user sees from the business logic — the signal processing never knows about the UI. Clean Architecture takes that further, organising code in layers where dependencies only point inward. For Lifelight it means the rPPG signal capture pipeline is isolated — you can swap the camera implementation, add GPU acceleration, or change the UI without touching anything else.

---

## Governance & Compliance

**What does "every change auditable, the architecture is evidence" mean?**
Two things. First: the FDA doesn't just test the product — they audit the process. Git history, pull requests, test records, and deployment logs together tell the story a regulator needs to follow. Second: architectural decisions are regulatory artefacts. Why is the BP model not updated without human review? That answer needs to exist in a document a regulator can find — not just in someone's head.

**What is an ADR?**
Architecture Decision Record. A short document written before code is written — context, decision, rationale, alternatives rejected. Stored in the repo, reviewed via PR, immutable once merged. In a regulated context, "why did we choose this?" has a legal answer. The ADR is that answer.

**What is IEC 62304?**
The international standard for medical device software lifecycle processes. It defines how software for medical devices must be developed, tested, and maintained. The test evidence in TestRail — requirement to test case to execution to result — is the IEC 62304 §5.7 artefact that appears in a regulatory submission.

**What is an SBOM?**
Software Bill of Materials — a complete list of every software component in the product, every library, dependency, and version. The FDA now requires this for medical device submissions as part of their cybersecurity guidance. Generated automatically by Syft on every build.

**What is STRIDE?**
A threat modelling framework. You ask six questions about your system: what can be Spoofed, Tampered with, Repudiated, Information disclosed, Denied service, or Privileges escalated. Applied to the rPPG assessment flow it maps every step from signal capture to result delivery and identifies where an attacker could interfere.

**What is Qualio?**
A cloud-based eQMS — electronic Quality Management System — built specifically for medical device companies. Handles document control, SOPs, CAPA, training records, and audit trails. Right size for a small team, designed for CE and FDA regulated environments. The right call is to present the requirement and evaluate Qualio on day one rather than commit before seeing what's already in place.

**What is Cyber Essentials Plus?**
A UK government-backed security certification. A baseline audit that the system has the fundamentals right — patching, access control, firewalls, malware protection. NHS suppliers are expected to hold it.

---

## Agentic AI

**Why is AI the vertical column not a row?**
Because it's not a separate workstream — it's the multiplier on all five areas. It's how a small team executes cost reduction, performance, release, observability, and governance at pace. A row says "here's another thing we do." A vertical says "this is how we do all of it."

**When does AI add value and when doesn't it?**
Cost monitoring and performance alerting don't need AI — Grafana threshold rules detect those. Where AI earns its place is interpretation: correlating a cost spike with a deployment, detecting model drift across thousands of assessments, flagging when traceability is missing before it becomes a submission problem. Knowing when not to use AI is as important as knowing when to.

**What are the hard constraints on agents?**
No agent merges PRs, pushes to main or release, writes to the QMS, modifies infrastructure, or silences alerts. Humans approve. Agents do the legwork.

**How do you measure whether agentic AI is actually delivering value?**
PR cycle time before and after rollout. Review comment action rate — what percentage of AI comments result in a code change. Traceability coverage at PR time. False positive rate on the compliance agent. Quarterly engineer satisfaction. Don't fly blind on AI ROI — measure it from day one.

---

## The Honest Ones

**Why a new container per assessment rather than per request?**
Per request would be broken — frame 1 lands on container A, frame 2 lands on container B, no way to reconstruct the assessment. It's per assessment. One container holds the session for the full 40 seconds, then is destroyed. Safe, but expensive at scale.

**What is no root cause analysis of failure?**
You see the symptom, not the cause. Errors are visible, causes are invisible — you can't connect failures to signal quality, device type, or clinical outcome without the telemetry to correlate them.

**What is the Discover phase and why does it come first?**
Four weeks of onboarding audit before any architecture changes. Understand the actual codebase, current test evidence, team shape, what's working, what's painful. Every assumption in this presentation gets validated or corrected here. You cannot fix what you don't understand.

---

## Release Safely at Pace

**What is ACR?**
Azure Container Registry — where the immutable build artefacts are stored. Once a container image is built and pushed to ACR it cannot be modified. What was tested is exactly what gets deployed. No changes between test and production, which is what a regulator needs to trust the evidence.

**What is Syft?**
The tool that generates the SBOM. It scans your container image and produces a complete ingredient list — every library, dependency, and version bundled inside. Runs automatically on every build. The output is the FDA cybersecurity artefact.

**What is Bland-Altman analysis?**
A statistical method for comparing two measurement techniques. For Lifelight it compares rPPG-derived BP readings against a gold standard auscultatory reference — a trained clinician with a manual cuff. It shows not just whether the measurements agree on average, but how much they vary across the range of readings. It is the standard method for validating clinical measurement devices.

**What is Fitzpatrick I-VI?**
A scale for classifying skin tone from very fair (Type I) to very dark (Type VI). Originally designed for dermatology. Now used in medical device validation to ensure performance is consistent across skin tones. The FDA expects clinical validation to include representation across the full scale, because darker skin tones absorb more light, which can affect the rPPG signal quality.

**What is longitudinal stability?**
Proving the device performs consistently over time, not just in a single session. A device might pass accuracy tests on day one but drift as conditions change — different lighting, different clinicians, software updates. The FDA and ESH both require longitudinal follow-up as part of BP device validation.

**What is the AI code review agent and why does it belong in the pipeline?**
It sits between Snyk and TestRail as a first pass before any human reviewer sees the PR. It catches security issues, missing traceability links, test coverage gaps, and regulatory conventions consistently every time. The value is not intelligence, it is consistency. In a regulated environment "we always check X" is a compliance statement. The human reviewer then focuses on judgment, not checklist. The risk is false positives. If the agent flags too many non-issues engineers start ignoring it, and it becomes noise. That is why we measure the review comment action rate. If engineers are not acting on the comments, the agent is not earning its place.


**What is SonarCloud?**
A static analysis tool that scans source code for quality issues, security vulnerabilities, and code smells without running it. Acts as a quality gate in the CI pipeline — if the code does not meet the defined standard, the build fails before it goes any further.

**What is Snyk?**
A security scanning tool that checks your dependencies and container images for known vulnerabilities. Runs in the CI pipeline. If a critical vulnerability is found in a library you depend on, the build fails. Keeps the software supply chain clean without manual effort.

---

## Observability

**Why Sentry Mobile SDK and not Firebase, New Relic, or Datadog?**
Sentry is the pragmatic phase 1 call. It covers crash reporting, error tracking, and release correlation. It is already in the cloud stack so one less vendor to manage. Firebase Crashlytics is excellent and free but runs on Google infrastructure, which raises data residency questions for NHS and GDPR compliance. New Relic and Datadog are full observability platforms, much more powerful for performance monitoring and correlating mobile behaviour with backend metrics, but overkill for a small team in phase 1 and significantly more expensive. AppDynamics is enterprise grade and not the right fit. The mobile observability tooling should be revisited once the cloud stack is stable and the team has the capacity to get value from a more powerful tool.

**What is Grafana and Prometheus?**
Prometheus collects metrics from your services and stores them. Grafana sits on top and visualises them as dashboards and alerts. Together they give you a live view of what is happening across the platform. Open source, widely adopted, and flexible enough to correlate cloud and mobile signals in a single view which is why Azure Monitor alone was rejected.

**What is Loki?**
Grafana's log aggregation tool. Where Prometheus handles metrics, Loki handles logs. Structured logs from every service flow into Loki and can be queried alongside the metrics in Grafana. Keeps the observability stack consistent rather than mixing tools.

**What is PagerDuty?**
On-call routing. When an alert fires in Grafana, PagerDuty decides who gets woken up and how. Escalation policies, on-call schedules, and acknowledgement tracking. Keeps incidents from falling through the cracks at 3am.

---

## Governance, Planning & Control

**What is Wardley mapping?**
A technique for visualising the competitive landscape and understanding where to invest. You map your capabilities on two axes: how visible they are to the user, and how mature they are. Commodity things like cloud infrastructure sit at the bottom right. Novel things that differentiate you sit at the top left. It helps you answer the question "what should we build, what should we buy, and what should we stop doing." For Lifelight it is useful for understanding which parts of the platform are genuinely differentiating and which are just the cost of playing in this space.

**What is the difference between differentiating work and the cost of being in this space?**
The cost of being in this space is everything a regulated medical device company has to do regardless of what makes them special. GDPR compliance, ISO 13485, IEC 62304 documentation, SBOM generation, vulnerability scanning, audit logging. None of that wins Lifelight a single extra customer. It is the price of admission.

Differentiating work is what actually moves the needle. The rPPG signal accuracy and the proprietary dataset. The on-device processing pipeline. Cost per assessment getting to under 1p. Clinical validation across a diverse population. The SDK developer experience that makes B2B partners choose Lifelight over a competitor.

The planning principle is to make sure the compliance work gets done efficiently so it does not crowd out the differentiating work. Both have to happen. But table stakes should not consume all the capacity. This is how you prioritise in a small team.


Everyone works on short-lived feature branches that merge back to main frequently, usually within a day or two. No long-lived feature branches. No merge conflicts that have been accumulating for weeks. The main branch is always in a releasable state. The audit trail is a side effect of good discipline rather than something you have to reconstruct.



---

*Keep this close. Read it on the train. Do not memorise it — know it.*
