# SKILLS.md — Zone Documentation Conventions

Read this before working on any file in `docs/zones/`.

---

## What zones describe

Each zone document defines:
1. What activities happen in this zone
2. What AI agents are permitted to do
3. What humans must do
4. What is explicitly forbidden
5. How the zone connects to the next

## Zone colours (for visual consistency)
- Zone 1 (Development): Navy `#0f2a4a`
- Zone 2 (Review/CI): Teal `#0b5a6a`
- Zone 3 (Operations): Green `#1a5a3a`

## The core principle to reinforce in every zone file

AI agents assist and accelerate. Humans retain all approval authority. Every agent action is logged and attributable. No agent can escalate its own permissions.

## Forbidden actions (apply to all zones, repeat in each file)

No agent in any zone may:
- Merge a pull request
- Push to `main` or any release branch
- Approve another agent's action
- Write to Qualio
- Access production infrastructure directly
- Modify test execution records in TestRail
- Silence or acknowledge PagerDuty alerts

## Connecting zones

Each zone file should end with a brief "handoff" section — what leaves this zone and enters the next. This makes the flow readable as a sequence, not just three isolated documents.
