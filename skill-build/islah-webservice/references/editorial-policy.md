# Editorial Policy — Blog & Content

## 1. Allowed Editorial Topics

Blog content may discuss:
- sales prospecting
- outbound sales
- cold email
- LinkedIn prospecting
- lead scoring
- qualification
- sales workflows
- data quality, enrichment, verification, deduplication
- prospect research methods and criteria

Educational discussion must **not** accidentally redefine Islah's services.
Service CTAs and commercial descriptions inside articles must remain consistent
with the approved service architecture (B2B Prospect Research + Existing
Database Enrichment; see `references/positioning.md`).

## 2. Statistics Policy

**Do not publish precise numerical industry assertions without evidence.**

Examples requiring sourcing:
- data decay percentages
- average bounce rates
- healthy monthly account volumes
- conversion percentages
- filtering percentages
- response rates
- typical pipeline metrics

If a credible source is unavailable → remove the precision and use qualitative
wording.

| Instead of | Use |
|---|---|
| 50–70% filtering is normal | Filtering can remove a substantial portion of the initial candidate pool when strict criteria are applied |
| 22.5% of B2B data decays annually | Business data naturally decays over time and requires regular verification |

Educational numbers about tools/processes (e.g., "the guide covers four
steps") are fine; industry-behavior statistics are not.

## 3. Service Boundary Inside Articles

- Framing for client action: the client runs its own campaigns, messaging,
  execution, and sales conversations. Islah delivers prospect data clients use
  within their own email, LinkedIn, calling, CRM, and sales workflows.
- Do not imply Islah manages cold email, LinkedIn outreach, or appointment
  setting.
- Do not claim improved campaign performance as a guaranteed outcome.

## 4. Terminology Inside Articles

Use the same terminology rules as the site copy:
- criteria matching / client-defined criteria / research signals
- observable company characteristics
- CRM-ready prospect data
- company research / prospect research (not "market research agency")

## 5. Blog Taxonomy

The blog index uses exactly **six editorial categories** (tags):
Industry Guides · Data Quality & Enrichment · Tools & Workflows · (plus the
remaining editorial categories as configured). Legacy tags from old
architectures ("Prospect Lists", "Lead Scoring", "Decision Maker Research")
must not reappear as category pills. Titles may mention such phrases when they
describe article topics, but tags stay within the editorial taxonomy.

## 6. Content Consistency

- Blog content lives in `content/blog/*.md` (front matter + body), seeded to
  the DB via `scripts/seed-blog.mjs`. After editing, re-seed the target DB.
- Keep article CTAs pointing at the canonical pages: `/request-sample`,
  `/b2b-prospect-research`, `/industries`, `/portfolio`, `/about`, `/contact`.
- Internal links must point directly to canonical URLs — never through legacy
  redirects.
- Do not link to non-existent pages (e.g., secondary industry labels are
  experience text, not links).

## 7. Publishing Workflow

1. Write/update markdown in `content/blog/`.
2. Run `node scripts/seed-blog.mjs` against the target DB.
3. Verify: article renders, title/meta correct, canonical www, taxonomy tag
   valid, internal links resolve, no broken links.
4. Confirm the post appears on `/blog` and in the sitemap only when
   `published: true`.
