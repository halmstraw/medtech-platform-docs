# DESIGN-LANGUAGE.md — Visual Design Reference

Read this before creating or editing any file in `assets/`.

All visuals in this project follow a consistent professional corporate register. The aesthetic is clean, structured, and information-dense. Not a slide deck. Not a marketing brochure. A document a senior engineer would hand to a CTO.

---

## Aesthetic reference

The reference is the Lifelight website (lifelight.ai) brand language. Key characteristics:
- Clean white background (`#ffffff`) with structured panel layout
- Deep charcoal header (`#0d1b2a`) with white text and brand green accent (`#00c389`)
- Orange (`#f97316`) for highlights, active states, and AI-related badges
- Blue (`#3797c4`) for info and link accents
- Colour-coded sections with clear labelling
- Dense but readable — uses space efficiently
- Every element earns its place — no decorative flourishes

The `docs/platform-overview.html` produced in session 1 is the canonical example for this project. All new visuals must match it in tone, quality, and register.

---

## Typography

**Primary font:** DM Sans (Google Fonts)
- Headings: DM Sans 700
- Body: DM Sans 400 / 300
- Labels and monospace elements: DM Mono 400 / 500

**Fallback stack:** `'DM Sans', system-ui, sans-serif`

**Import:**
```html
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
```

**Do not use:** Inter, Roboto, Arial, Space Grotesk, or any generic system font as the primary face.

---

## Colour palette

```css
/* Backgrounds */
--white:        #ffffff;
--off-white:    #f7f8fa;   /* primary page background — clean white-grey */
--grey-50:      #f1f3f6;
--grey-100:     #d8dbde33; /* light borders, dividers (with transparency) */

/* Text */
--ink:          #0d1b2a;   /* body text — deep charcoal */
--grey-700:     #6b7280;   /* secondary text, labels */
--grey-400:     #9ca3af;   /* dim text */
--grey-200:     #d1d5db;   /* borders, dividers */

/* Primary — Deep charcoal (headers, primary actions) */
--navy:         #0d1b2a;
--navy-mid:     #1a2940;
--navy-light:   #e2e8f0;

/* Brand green (Lifelight primary accent) */
--brand:        #00c389;
--brand-dark:   #00a074;
--brand-light:  #e6fff5;

/* Teal (Observability tools) */
--teal:         #0b7a8a;
--teal-mid:     #14b8a6;
--teal-light:   #e0f4f0;

/* Coral/Orange (Highlights, CTAs, AI badges) */
--coral:        #f97316;
--coral-light:  #fff7ed;

/* Blue (Info, links, secondary accent) */
--blue:         #3797c4;
--blue-light:   #e4f2f8;

/* Green (Regulated / QMS tools) */
--green:        #15803d;
--green-light:  #dcfce7;
--green-mid:    #22c55e;

/* Amber (Infrastructure / Azure) */
--amber:        #92400e;
--amber-light:  #fef3c7;
--amber-mid:    #f59e0b;

/* Purple (Design tools / AI agents) */
--purple:       #6d28d9;
--purple-light: #ede9fe;
--purple-mid:   #8b5cf6;

/* Red (Security / Monitoring) */
--red:          #991b1b;
--red-light:    #fee2e2;
--red-mid:      #ef4444;

/* Trust zones */
--zone1:        #0d1b2a;   /* Development — Charcoal */
--zone2:        #0b7a8a;   /* Review/CI — Teal */
--zone3:        #15803d;   /* Operations — Green */
```

---

## Tool pill component

Every tool reference in architecture diagrams uses a colour-coded pill. Colour indicates the tool's family/category.

```html
<span class="tool-pill t-navy">
  <span class="dot"></span>GitHub Actions
</span>
```

```css
.tool-pill {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 9px;
  border-radius: 2px;
  font-size: 11px;
  font-weight: 500;
  border: 1px solid transparent;
  white-space: nowrap;
}

.tool-pill .dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* Colour variants */
.t-navy   { background: var(--navy-light);   border-color: #b0c8e0; color: var(--navy);   }
.t-navy   .dot { background: var(--navy); }
.t-teal   { background: var(--teal-light);   border-color: #a8d8d0; color: var(--teal);   }
.t-teal   .dot { background: var(--teal); }
.t-green  { background: var(--green-light);  border-color: #a8d8be; color: var(--green);  }
.t-green  .dot { background: var(--green); }
.t-amber  { background: var(--amber-light);  border-color: #e0c880; color: var(--amber);  }
.t-amber  .dot { background: var(--amber); }
.t-purple { background: var(--purple-light); border-color: #c0a8e8; color: var(--purple); }
.t-purple .dot { background: var(--purple); }
.t-red    { background: var(--red-light);    border-color: #d8a0a8; color: var(--red);    }
.t-red    .dot { background: var(--red); }
.t-coral  { background: var(--coral-light);  border-color: #f0c8a0; color: #9a3412;       }
.t-coral  .dot { background: var(--coral); }
.t-blue   { background: var(--blue-light);   border-color: #a0cce0; color: #1a6890;       }
.t-blue   .dot { background: var(--blue); }
```

---

## Tool category → colour mapping

| Category | Colour | Tools |
|---|---|---|
| GitHub ecosystem | Navy | GitHub, GitHub Actions, GitHub Pages, GitHub Projects |
| Regulated / QMS | Green | Qualio, TestRail, ISO docs, risk register |
| Observability | Teal | Grafana, Prometheus, Loki, Sentry, PagerDuty |
| Infrastructure / Azure | Amber | Terraform, AKS, Azure Key Vault, ACR, Azure Monitor |
| Design | Purple | Figma, Storybook |
| Security / Monitoring | Red | Snyk, SonarCloud, SBOM tools |
| AI / Agents | Brand Green | Claude, MCP servers, agent tooling |
| Info / Links | Blue | Documentation links, informational callouts |

---

## Page structure for single-page reference documents

All single-page architecture documents follow this structure:

```
┌─────────────────────────────────────────────────────┐
│  HEADER — deep charcoal (#0d1b2a), white text, reg badges  │
│  Title + subtitle + regulatory framework chips                  │
│  Brand green accent (#00c389) on eyebrow text                   │
├────────────────────────────────┬────────────────────┤
│                                │                    │
│  MAIN COLUMN (~75% width)      │  SIDEBAR (~25%)    │
│                                │                    │
│  Business context box          │  Agents            │
│  Trust zones diagram           │  Governance        │
│  Architecture layer stack      │  Compliance map    │
│  Change ticket flow            │  Cost table        │
│                                │                    │
├────────────────────────────────┴────────────────────┤
│  FOOTER — legend + document status                  │
└─────────────────────────────────────────────────────┘
```

Page width: 1100px, centred, white background (`#ffffff`), subtle shadow.

---

## Regulatory badge chips

Used in headers and compliance sections:

```html
<span class="reg-chip">IEC 62304</span>
```

```css
.reg-chip {
  font-family: 'DM Mono', monospace;
  font-size: 9.5px;
  padding: 3px 8px;
  border-radius: 2px;
  border: 1px solid rgba(255,255,255,0.25);
  color: rgba(255,255,255,0.85);
  letter-spacing: 0.06em;
}
```

---

## Section labels

Monospace uppercase labels used to introduce sections:

```css
.section-label {
  font-family: 'DM Mono', monospace;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--grey-400);
  margin-bottom: 10px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--grey-200);
}
```

---

## Trust zone blocks

Three-column coloured band used to show the zone model:

- Zone 1 (Development): `background: #0d1b2a`
- Zone 2 (Review/CI): `background: #0b7a8a`
- Zone 3 (Operations): `background: #15803d`

All white text. Zone name in small monospace uppercase. Zone title in 12px semibold. Items as a list with `›` prefix.

---

## Document status footer

Every document ends with a status footer in small monospace grey:

```
DRAFT · FOR INTERNAL REVIEW · NOT A CONTROLLED DOCUMENT · v0.1
```

---

## What to avoid

- Purple gradients on white backgrounds — generic AI aesthetic
- Rounded cards with drop shadows — too consumer/SaaS
- Emoji in headers or section titles in formal documents
- Centred body text
- More than 5 font weights in one document
- Animations in print-intended documents
- Any layout that breaks when printed to PDF
