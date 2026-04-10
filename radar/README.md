# Tech Radar — Data Directory

This directory contains the content for the AOE Technology Radar instance
deployed at `/radar/` on the docs site.

**Only the `data/` directory is committed to this repo.** The AOE radar
source code is cloned at build time in the GitHub Actions workflow at a
pinned release (v4.6.1). See `.github/workflows/docs.yml`.

## Structure

```
radar/
└── data/
    ├── config.json            ← quadrants, rings, colours, labels
    ├── about.md               ← how-to-read page
    └── radar/
        └── 2026-04-09/        ← release date — one folder per release
            ├── 01-github-actions.md
            ├── 02-github-issues-projects.md
            └── ...            ← one file per blip (34 total)
```

## Adding or updating an entry

1. Edit the relevant `.md` file in `radar/data/radar/2026-04-09/`
2. Frontmatter fields: `title`, `ring` (adopt/trial/assess/hold),
   `quadrant` (tools/platforms/languages-frameworks/techniques), `tags`
3. Open a pull request — the PR preview deployment will show the radar
   with your changes before merge

## Running locally

To preview the radar locally during content editing:

```bash
# Clone the AOE radar source alongside this repo
git clone --depth 1 --branch v4.6.1 \
  https://github.com/AOEpeople/aoe_technology_radar.git /tmp/aoe_radar

# Overlay our data
cp -r radar/data/. /tmp/aoe_radar/data/

# Install and run
cd /tmp/aoe_radar
npm install
npm run dev
# → http://localhost:3000/radar
```

## Decision source

All entries are derived from `DECISIONS.md` and `AMENDMENTS-001.md`.
Before adding a new entry, check whether the decision has been formally
recorded. If not, record it in `DECISIONS.md` first.
