# Commercial Offering Research and Implementation
## Islah Web Service 2.0 Architectural Specification

---

## Executive Summary & Strategic Rationale

This document establishes the commercial offering framework for Islah Web Service, providing end-to-end traceability between market research, operational capabilities, regulatory standards, and public website implementation.

### Why We Chose the Three Primary Engagement Paths

Market research across leading outbound agencies (Belkins, SalesHive, SoPro, SalesRoads, Cold Delivered) reveals a critical buyer divergence in the B2B market:
1. **Internal Team Execution (One-Time Setup)**: High-growth companies and founders with internal sales reps or SDRs want a properly engineered outbound infrastructure (secondary domains, SPF/DKIM/DMARC authentication, warmed inboxes, tested copy sequences) but do not want to pay recurring monthly agency fees for basic execution.
2. **Outsourced Pipeline Generation (Ongoing Campaign Management)**: Companies lacking dedicated outbound sales staff require end-to-end monthly management—continuous prospect research, campaign ramp, daily deliverability maintenance, auto-reply filtering, and warm lead routing.
3. **Data-Only Buyers (B2B Prospect Research & Enrichment)**: Teams with established outbound sequences and sending tools only need verified, criteria-matched account and decision-maker contact data.

Structuring Islah Web Service around these **Three Distinct Buying Paths** eliminates buyer friction and clarifies operational expectations upfront.

---

## 1. Key Lessons from Researched Competitors

| Agency Reference | Public Positioning Model | Key Operational Lesson Applied | Islah Differentiation |
|---|---|---|---|
| **Belkins** (`belkins.io`) | Full-service SDR outsourcing & appointment booking | Emphasizes dedicated secondary domains and multi-step copy review gates | Islah explicitly separates technical setup from ongoing management without locking clients into multi-quarter contracts. |
| **SalesHive** (`saleshive.com`) | Month-to-month cold email & SDR capacity | Shows transparent capacity tiers (mailboxes and send limits) | Islah enforces client ownership of sending infrastructure and transparently identifies third-party software costs. |
| **SoPro** (`sopro.io`) | Technology-driven campaign platform | Focuses on buyer journey and strict audience exclusion rules | Islah provides raw, portable data in CRM-ready formats with zero platform lock-in. |
| **SalesRoads** (`salesroads.com`) | US-based appointment setting & BDR management | Highlights strict qualification criteria (BANT / FAINT) before scheduling calls | Islah separates meeting booking from research, preventing deceptive "vanity" bookings. |
| **Cold Delivered** (`colddelivered.com`) | Cold email infrastructure setup as a service | Validates the massive demand for one-time, done-for-you technical outbound builds | Islah pairs technical setup with deep, research-backed ICP definition and custom sequence copy. |

---

## 2. Setup vs. Managed Delivery Matrix

| Operational Component | Offer A: One-Time Setup (`/one-time-setup`) | Offer B: Ongoing Management (`/ongoing-management`) | Offer C: Standalone Research (`/b2b-prospect-research`) |
|---|---|---|---|
| **Commercial Model** | One-Time Fixed Project | Monthly Recurring Managed Service | Fixed Scope or Recurring Records |
| **ICP Definition** | Initial discovery workshop & document | Continuous refinement via campaign data | Client-supplied targeting brief |
| **Infrastructure Setup** | Provisioning domains, mailboxes & DNS auth | Ongoing warmup & deliverability maintenance | Not included |
| **Email Sequence Copy** | Multi-touch sequence + follow-ups | Continuous angle testing & iteration | Not included |
| **Prospect Research** | Initial kickoff batch included | Recurring monthly prospect additions | Core standalone deliverable |
| **Campaign Execution** | Client executes post-handover | Islah manages daily sends within safe limits | Client executes independently |
| **Reply Handling** | Workflow templates provided to client | Daily monitoring & warm lead routing | Client handles |
| **Reporting Cadence** | Handover QA audit report | Weekly operational metrics + monthly review | Delivery metadata & audit notes |
| **Handover Point** | Completed at formal asset transfer | Ongoing; full asset transfer upon termination | Immediate upon dataset delivery |

---

## 3. Service Inclusion Matrix & Existing Route Mapping

The six existing SEO service URLs are preserved and mapped directly into the commercial framework:

| Existing Route | Service Name | Offering Framework Role | Key Inclusions | Explicit Exclusions |
|---|---|---|---|---|
| `/b2b-prospect-research` | B2B Prospect Research | Standalone data & managed research layer | Account research, decision-maker mapping, email verification, CRM formatting | Outbound sending, copy writing, intent speculation |
| `/contact-enrichment` | Existing Database Enrichment | Standalone data quality & CRM readiness | Gap analysis, re-verification, deduplication, field standardisation | Net-new lead generation outside supplied dataset |
| `/email-infrastructure` | Email Infrastructure Setup | Setup core & managed technical foundation | Secondary domains, SPF, DKIM, DMARC, automated warmup protocol | Guarantee of 100% inbox placement, hosting without client ownership |
| `/cold-email-marketing` | Cold Email Strategy & Copy | Strategy, messaging & sequence copy | Multi-touch copy, value hooks, follow-ups, objection responses, opt-out formatting | Deceptive subject lines, unapproved sending, guaranteed reply rates |
| `/campaign-management` | Ongoing Campaign Management | Recurring operational outreach management | Daily send management, reply classification, warm lead routing, weekly reporting | Closing sales contracts, unapproved copy changes, revenue guarantees |
| `/appointment-setting` | Appointment Coordination | Optional managed capability | Documented qualification gates, scheduling coordination, calendar briefing notes | Sales presentations, unqualified bookings, attendance guarantees |

---

## 4. Five Industry Targeting Matrices

### 4.1 B2B SaaS & Technology (`/industries/saas`)
- **Target Company Criteria**: Headcount (e.g. 50–250 employees), funding stages (Seed to Series C+), observed technology stack (CRM, marketing automation, cloud infrastructure), target geography (UK, US, DACH).
- **Decision-Maker Functions**: VP Sales, CRO, Head of RevOps, CTO, VP Engineering, Functional Department Leads.
- **Observable Buying Signals**: New funding rounds, sales team hiring expansion, executive appointments, platform migrations.
- **Exclusions**: Non-B2B organisations, early pre-product startups without sales infrastructure, direct competitor peers.
- **Example Project**: European B2B Analytics Platform targeting mid-market B2B software companies using HubSpot/Salesforce in UK/DACH.

### 4.2 Managed Service Providers & IT Services (`/industries/msp`)
- **Target Company Criteria**: Service territory (e.g. 45-minute transit radius), 20–250 employees (illustrative range), multi-site operations, regulated sectors (finance, legal, engineering).
- **Decision-Maker Functions**: Managing Director / Business Owner (20–75 employees), IT Director / Head of Tech (75–250+ employees), CFO, Operations Director.
- **Observable Buying Signals**: Office relocation/expansion, compliance mandates (Cyber Essentials, ISO 27001), rapid headcount growth, legacy server retirement.
- **Exclusions**: Companies outside physical support territory, micro-businesses (<10 users), competitor MSPs, current client roster.
- **Example Project**: London MSP targeting legal, accounting, and architecture firms (25–150 employees) within the M25 ring.

### 4.3 Recruitment & Staffing (`/industries/recruitment`)
- **Target Company Criteria**: Focus strictly on **EMPLOYER CLIENT ACQUISITION**, sector desk alignment (engineering, tech, life sciences), active hiring volumes, organizational maturity.
- **Decision-Maker Functions**: Head of Talent Acquisition, HR Director / CPO, Departmental Hiring Managers, Managing Director.
- **Observable Buying Signals**: Repeated specialist vacancies open for >60 days, new regional technical facility, major commercial project wins, new Head of People appointed.
- **Exclusions**: Candidate CVs/resumes, job applicants, competing recruitment agencies, current PSL client accounts.
- **Example Project**: UK Engineering Staffing Agency targeting advanced manufacturing employers with long-standing technical vacancies in the Midlands/North.

### 4.4 Professional Services (`/industries/professional-services`)
- **Target Company Criteria**: Consulting, legal, accounting, or specialist advisory client profiles; £10M–£50M turnover or 75–350 employees; complex corporate structures.
- **Decision-Maker Functions**: CFO / Finance Director, Managing Partner / CEO, COO / Operations Director, General Counsel.
- **Observable Buying Signals**: M&A transactions, regulatory reporting changes, cross-border expansion, board-level executive transitions.
- **Exclusions**: Micro-businesses without commercial advisory budgets, insolvent companies, peer consulting practices, conflict-of-interest accounts.
- **Example Project**: B2B Commercial Advisory Firm targeting mid-market logistics and industrial firms undergoing supply chain transformation.

### 4.5 Commercial Real Estate (`/industries/real-estate`)
- **Target Company Criteria**: Commercial property asset managers, REITs, investment funds, operators with >5 commercial assets; industrial, office, retail, and logistics sectors.
- **Decision-Maker Functions**: Head of Asset Management, Acquisitions Director, Property Management Director, Principal / Managing Director.
- **Observable Buying Signals**: Commercial property transaction filings, planning permission approvals, new property fund closures, ESG/retrofit mandates.
- **Exclusions**: Private residential homeowners, individual consumer buy-to-let landlords, residential letting agents, liquidating property portfolios.
- **Example Project**: Commercial Facilities & ESG Solutions Provider targeting asset managers holding commercial office and industrial portfolios in SE England.

---

## 5. Transparent Delivery Process (The 6 Stages)

1. **Discovery and Feasibility**: Audit commercial offer, target economics, market size, infrastructure readiness, and legal outreach feasibility.
2. **ICP and Data Qualification**: Document firmographic criteria, target functions, research fields, exclusion lists, and test sample benchmarks.
3. **Infrastructure and Campaign Setup**: Configure client-owned secondary domains, SPF/DKIM/DMARC records, inboxes, warmup ramp, sequence copy, and CRM routing.
4. **Quality Review and Approval**: Formal client sign-off on researched data batches, copy sequences, and compliance parameters before sending.
5. **Handover or Managed Launch**:
   - *One-Time Setup*: Complete asset delivery, technical QA report, and operational team orientation.
   - *Ongoing Management*: Controlled launch within safe deliverability thresholds.
6. **Continuous Optimization**: Ongoing prospect refreshes, deliverability monitoring, reply classification, weekly reporting, and iterative targeting adjustments.

---

## 6. Project Fit & Acceptance Criteria (The 6 Feasibility Filters)

Islah assesses six commercial criteria before confirming project acceptance:
1. **Clear Client Offer & Commercial Objective**: Defined value proposition, verifiable customer proof, and realistic sales objectives.
2. **Identifiable & Targetable Market**: Sufficient universe of target accounts identifiable via verifiable public or commercial data.
3. **Research & Data Feasibility**: Target contact fields (corporate email, LinkedIn, telephone) legally and technically discoverable.
4. **Legal & Compliance Eligibility**: Proposed outreach complies with applicable regional statutes (PECR, CAN-SPAM, CASL, Spam Act).
5. **Internal Sales Follow-Up Ownership**: Client has designated internal sales personnel responsible for responding to warm leads within 24 hours.
6. **Agreed Commercial Scope & Acceptance Terms**: Mutually signed agreement defining deliverables, revision limits, and handover parameters.

---

## 7. Results & Qualification Definitions

To maintain absolute integrity, metrics are defined strictly without ambiguity:

- **Verified Prospect**: An individual contact and parent company verified to match all documented ICP criteria with multi-step validated corporate contact information.
- **Positive Reply**: An authentic, human response expressing interest in learning more, requesting information, or consenting to a conversation. Excludes auto-responders, unsubscribes, and out-of-office messages.
- **Qualified Meeting Booked**: A scheduled calendar conversation with a decision-maker who explicitly satisfies all agreed ICP criteria (geography, company size, role authority) and confirmed availability.
- **Meeting Held**: A scheduled meeting where the qualified prospect attended and engaged in a commercial conversation with the client sales representative.
- **Sales-Accepted Opportunity**: A lead that the client's internal sales leadership officially accepts into their active CRM pipeline following initial discovery.

**Guarantee Prohibition**: Islah Web Service never guarantees reply rates, meeting counts, or closed sales revenue, as these depend on market dynamics, offer competitiveness, and internal sales execution.

---

## 8. Pricing & Engagement Principles

- **No Fabricated Pricing**: Islah does not publish speculative pricing tables. Pricing is scoped following discovery based on market complexity, research volume, and technical requirements.
- **Three Transparent Models**:
  1. *One-Time Fixed Project*: Defined setup milestones, deliverables, and acceptance criteria.
  2. *Monthly Managed Service*: Predictable monthly operational fee covering ongoing research, campaign management, and reporting.
  3. *Standalone Research*: Scope-based quotation tied to validated record volume and research depth.
- **Third-Party Costs Disclosed**: Domain registrar fees, Google Workspace / Microsoft 365 mailbox fees, and campaign sending platform subscriptions are transparently identified as client-owned and billed directly.

---

## 9. Compliance & Deliverability Standards

### Global Regulatory Frameworks
- **United Kingdom (PECR / UK GDPR)**: B2B outreach to corporate subscribers (Ltd, PLC, LLP) permitted under legitimate interests; mandatory transparent sender identification and immediate opt-out mechanism.
- **United States (CAN-SPAM Act)**: Non-deceptive headers and subject lines, valid physical postal address included, clear notice of commercial nature, and functioning opt-out honored within 10 days.
- **European Union (ePrivacy & GDPR)**: Member state national implementations respected (e.g. CNIL guidelines in France requiring professional context relevance); fundamental right to object honored instantly.
- **Australia (Spam Act 2003)**: Express or qualifying inferred consent standards enforced; public address harvesting strictly prohibited.
- **Canada (CASL)**: Strict consent documentation or verified statutory implied consent exemptions verified prior to outreach.

### Technical Deliverability Protocols
- **Authentication**: Mandatory SPF, DKIM, and DMARC (`p=none` moving to `p=quarantine/reject`) configuration on dedicated secondary domains.
- **Gradual Warmup**: 2–4 week automated warmup cycle before commercial messaging, ramping from 5 to maximum 30–40 emails per inbox per day.
- **List Hygiene**: Multi-step SMTP handshake and syntax verification; bounce rates strictly maintained below 2%.
- **Zero Deceptive Practices**: No domain spoofing, no artificial "RE:" / "FWD:" subject headers, and no fake conversation threading.

---

## 10. Customer Intake & Safe Email Workflow

Because live backend integrations (Supabase, HubSpot, Resend) are deliberately kept inactive pending contractual review, client intake is conducted through a **Structured Email Brief Workflow**:
- Official Mailbox: `hello@islahwebservice.com`
- Pre-formatted mailto links populate structured brief fields (Company Name, Website, Engagement Model, Target Criteria, Decision-Maker Roles, CRM Tools, Timeline).
- Clear client warnings against submitting credentials, passwords, or confidential databases.

---

## 11. Traceability Checklist

| Research & Brief Requirement | Website Location | Status | Implementation Notes |
|---|---|---|---|
| **Three Primary Choices** (Setup, Managed, Data) | Homepage (`/`), Services (`/services`), Pricing (`/pricing`) | ✅ Complete | Expressed across hero actions, feature grids, and service headers |
| **Offer A Landing Page** (One-Time Setup) | `/one-time-setup` | ✅ Complete | Full landing page component with scope, deliverables, handover, and FAQs |
| **Offer B Landing Page** (Ongoing Management) | `/ongoing-management` | ✅ Complete | Full landing page component with monthly operations, reply routing, and FAQs |
| **Offer C Positioning** (Prospect Research) | `/b2b-prospect-research`, `/request-sample` | ✅ Complete | Preserved standalone route with explicit data delivery parameters |
| **Preserve Six Service Pages** | `/[slug]` (6 existing service slugs) | ✅ Complete | URLs preserved; enhanced with availability, deliverables, and exclusions |
| **Preserve Five Industry Pages** | `/industries/[slug]` (5 existing industry slugs) | ✅ Complete | URLs preserved; updated with signals, exclusions, example project, and 3 CTAs |
| **Homepage Messaging Overhaul** | `/` (`src/pages/index.astro`) | ✅ Complete | Approved headline, 3 customer buttons, 6-stage process, and credibility cards |
| **B2B SaaS Industry Profile** | `/industries/saas` | ✅ Complete | Covers tech stack, funding signals, multi-role evaluation, and DACH/UK example |
| **MSP / IT Services Profile** | `/industries/msp` | ✅ Complete | Covers regional territory, 20–250 employee range, IT vs Owner roles, and M25 example |
| **Recruitment Industry Profile** | `/industries/recruitment` | ✅ Complete | Strictly focused on employer client acquisition; candidate sourcing isolated |
| **Professional Services Profile** | `/industries/professional-services` | ✅ Complete | Mid-market turnover thresholds, partner-level roles, and advisory triggers |
| **Commercial Real Estate Profile** | `/industries/real-estate` | ✅ Complete | B2B commercial property operators, asset managers; residential excluded |
| **6-Stage Delivery Process** | `/`, `/one-time-setup`, `/ongoing-management` | ✅ Complete | Discovery -> ICP -> Setup -> Approval -> Handover/Launch -> Optimization |
| **6 Project Fit Criteria** | `/pricing`, `/about`, `/one-time-setup` | ✅ Complete | Documented feasibility assessment criteria |
| **Metric & Result Definitions** | `/pricing`, `OfferPage.astro`, `docs/...` | ✅ Complete | Explicit definitions for Verified Prospect, Positive Reply, Booked Meeting, etc. |
| **Pricing Transparency & Models** | `/pricing`, `src/data/packages.ts` | ✅ Complete | Three models detailed; third-party software costs clearly separated |
| **Compliance & Deliverability** | Industry pages, Offer pages, `docs/...` | ✅ Complete | UK, US, EU, AU, CA frameworks detailed; SPF/DKIM/DMARC protocols enforced |
| **Intake Distinction & Safe Mailbox** | `/contact`, `/free-consultation`, `ContactChannel.astro` | ✅ Complete | Structured mailto templates for all 3 engagement types; no fake forms |
| **Navigation & Footer Updates** | `SiteHeader.astro`, `SiteFooter.astro` | ✅ Complete | Header and footer links updated to reflect all primary commercial offers |
| **SEO & Canonical Integrity** | `src/content/routes.mjs`, `sitemap.xml.ts` | ✅ Complete | Static paths updated; 60+ static pages prerendered; canonical origin preserved |
| **Preserve Blogs & Portfolio** | `/blog`, `/portfolio`, all slugs | ✅ Complete | All 18 blogs, 15 case studies, and author pages verified intact |
| **Zero Secrets Staged** | `.gitignore`, `.env.local` | ✅ Complete | Verified `.env.local` is untracked; zero secrets staged |
