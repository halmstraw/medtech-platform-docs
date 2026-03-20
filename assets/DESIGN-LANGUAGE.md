# DESIGN-LANGUAGE.md — Visual Design Reference

Read this before creating or editing any file in `assets/`.

All visuals in this project follow a consistent professional corporate register — the same style used in HSBC Mobile Platform documentation. The aesthetic is clean, structured, and information-dense. Not a slide deck. Not a marketing brochure. A document a senior engineer would hand to a CTO.

---

## Aesthetic reference

The reference document is the HSBC Mobile Platform Definition screenshot shared in session 1. Key characteristics:
- White background with structured panel layout
- Dark header bar with white text
- Colour-coded sections with clear labelling
- Dense but readable — uses space efficiently
- Every element earns its place — no decorative flourishes

The `assets/platform-overview.html` produced in session 1 is the canonical example for this project. All new visuals must match it in tone, quality, and register.

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
--off-white:    #f8f9fb;
--grey-50:      #f1f3f6;
--grey-100:     #e4e8ef;

/* Text */
--ink:          #0d1b2a;
--grey-700:     #3d4f63;
--grey-400:     #8896aa;

/* Primary — Navy (GitHub ecosystem, headers, primary actions) */
--navy:         #0f2a4a;
--navy-mid:     #1a4068;
--navy-light:   #dce8f5;

/* Teal (Observability tools) */
--teal:         #0b7a8a;
--teal-light:   #e0f4f6;
--teal-mid:     #5bbecb;

/* Green (Regulated / QMS tools) */
--green:        #1a7a4a;
--green-light:  #d8f0e4;
--green-mid:    #4ab87a;

/* Amber (Infrastructure / Azure) */
--amber:        #8a5a00;
--amber-light:  #fef3d8;
--amber-mid:    #f0a830;

/* Purple (Design tools / AI agents) */
--purple:       #5a2a8a;
--purple-light: #ede8f8;
--purple-mid:   #9060d0;

/* Red (Security / Monitoring) */
--red:          #8a1a2a;
--red-light:    #fde8ea;
--red-mid:      #d04060;

/* Trust zones */
--zone1:        #0f2a4a;   /* Development — Navy */
--zone2:        #0b5a6a;   /* Review/CI — Teal-navy */
--zone3:        #1a5a3a;   /* Operations — Green */
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
.t-teal   { background: var(--teal-light);   border-color: #a8d8e0; color: var(--teal);   }
.t-teal   .dot { background: var(--teal); }
.t-green  { background: var(--green-light);  border-color: #a8d8be; color: var(--green);  }
.t-green  .dot { background: var(--green); }
.t-amber  { background: var(--amber-light);  border-color: #e0c880; color: var(--amber);  }
.t-amber  .dot { background: var(--amber); }
.t-purple { background: var(--purple-light); border-color: #c0a8e8; color: var(--purple); }
.t-purple .dot { background: var(--purple); }
.t-red    { background: var(--red-light);    border-color: #d8a0a8; color: var(--red);    }
.t-red    .dot { background: var(--red); }
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
| AI / Agents | Purple | Claude, MCP servers, agent tooling |

---

## Page structure for single-page reference documents

All single-page architecture documents follow this structure:

```
┌─────────────────────────────────────────────────────┐
│  HEADER — dark navy, white text, reg badges         │
│  Title + subtitle + regulatory framework chips      │
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

Page width: 1100px, centred, white background, subtle shadow.

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
  border-bottom: 1px solid var(--grey-100);
}
```

---

## Trust zone blocks

Three-column coloured band used to show the zone model:

- Zone 1 (Development): `background: #0f2a4a`
- Zone 2 (Review/CI): `background: #0b5a6a`
- Zone 3 (Operations): `background: #1a5a3a`

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
