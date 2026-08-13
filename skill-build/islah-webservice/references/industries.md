# Industries — Primary & Secondary

> **Contents:** [Primary Industries](#1-primary-industries-locked) · [Secondary Experience](#2-secondary-industry-experience) · [Expansion Rule](#3-industry-expansion-rule) · [Case Studies](#4-case-studies-as-breadth-evidence)

## 1. Primary Industries (Locked)

The following are the **only** primary industries with dedicated commercial
landing pages. Do not remove, rename, or reposition them without a verified
technical reason.

1. **SaaS & Technology** — `/industries/saas`
2. **Managed Service Providers / IT Services** — `/industries/msp`
3. **Recruitment & Staffing** — `/industries/recruitment`
4. **Professional Services** — `/industries/professional-services`
5. **Real Estate & Property** — `/industries/real-estate`

Configuration: `lib/industries.ts` → `INDUSTRIES` (single source of truth for
identity). Icons/tints/criteria/roles are page-specific in the hub and each
industry page.

### Example research criteria per primary industry

- **SaaS & Technology:** industry/software category · employee size · geography
  · technology stack · funding information · hiring activity ·
  founder/executive roles · IT/Operations/Sales leadership
- **MSP & IT Services:** geography · company size · industry · existing
  technology environment · internal IT structure where researchable ·
  business/IT leadership roles
- **Recruitment & Staffing:** hiring activity · geography · company size ·
  department · hiring roles · talent/HR/operations leadership
- **Professional Services:** company type · service specialization · geography ·
  employee size · partners · founders · managing directors · relevant functional
  leadership
- **Real Estate & Property:** ownership entity · property type · portfolio size
  · property count · geography · property-management company · acquisitions /
  asset management / property management roles

## 2. Secondary Industry Experience

Historical/supporting experience may include:

- Ecommerce & Retail
- Healthcare & Medical
- Marketing Agencies
- Local Businesses
- Home Services
- Construction-related businesses
- Manufacturers
- Distributors
- other legitimate B2B industries supported by real projects

### Where secondary experience may appear
- About page credibility
- Industries overview ("Additional Industries We Have Researched" section)
- Case Studies
- Portfolio filtering
- historical experience

### Where secondary experience must NOT appear automatically
- Main navigation
- Primary footer industry list
- Sitemap as new landing pages
- Dedicated SEO landing pages

Configuration: `lib/industries.ts` → `ADDITIONAL_INDUSTRY_EXPERIENCE`. This
array is deliberately separate from `INDUSTRIES` so it cannot feed footer, nav,
services, or sitemap generation. Present secondary industries as **experience**,
not as new flagship service pages. Do not link labels to nonexistent pages. Do
not create thin SEO pages to increase page count.

### Example criteria for secondary experience
- **Ecommerce & Retail:** brand/company discovery · retailer research ·
  manufacturer/distributor research · partnership roles
- **Healthcare & Medical:** organization research · geography · relevant
  executive/operational roles · client-defined organization criteria. Never
  imply research of regulated personal medical information.
- **Marketing Agencies:** agency type · geography · employee size ·
  founder/partner leadership
- **Local Businesses / Home Services:** Google Maps/business-directory research
  · geography · business category · owner/manager research

### Evidence rule for secondary industries
Industry-experience claims must correspond to genuine historical work (Upwork
project history, client brief, delivery spreadsheet, contract, case study, or
internal project record). If an industry is only aspirational, do not describe
it as historical experience.

## 3. Industry Expansion Rule

Do **not** create a sixth primary industry page unless supported by **all** of:

- legitimate Islah project history
- commercial fit
- search demand
- ability to create substantive industry-specific content
- owner approval

Search Console impressions alone are not enough. New industry landing pages
should be considered only when supported by a combination of impressions,
keyword demand, commercial relevance, genuine project experience, case-study
evidence, and the ability to create substantial industry-specific content.

## 4. Case Studies as Breadth Evidence

Where genuine case studies already represent secondary industries (e.g.,
Healthcare, Manufacturing, Fintech), retain those industry tags even though no
dedicated landing page exists. This demonstrates breadth without creating
unnecessary SEO landing pages. Every case-study claim must remain supported by
actual project evidence — do not invent case studies to fill industry gaps.
