# Portfolio metadata evidence

Internal coordination notes; do not publish as site content.

## Scope and integration

`lib/portfolio-seo.ts` exports a standalone `PORTFOLIO_SEO` map for all 15 existing source slugs. No route, helper, database, markdown body, or schema field is changed. The coordinator owns integration. Length limits apply to the exported strings; recheck final rendered titles if integration adds a site-name suffix.

All source bodies and frontmatter in `content/portfolio/*.md` were reviewed alongside `docs/case-study-verification.md`. These are repository-supported claims, not independent verification of client delivery files. The verification ledger still requests documentary evidence for every project.

Titles describe research/data deliverables, not sales outcomes. Public descriptions remain qualitative, contain no count/turnaround placeholders, and do not target the phrase "lead generation". Existing slug keys containing that phrase remain unchanged.

## Evidence by slug

Each linked source supplies the body evidence below. Ledger row numbers refer to the audit table in [case-study-verification.md](case-study-verification.md).

| Source slug | Ledger row | Body evidence used | Geographic boundary / other unknowns |
| --- | --- | --- | --- |
| [b2b-lead-generation-manufacturing-software](../content/portfolio/b2b-lead-generation-manufacturing-software.md) | 1 | CRM-ready plant/operations contacts; plant size and installed equipment criteria | US is the vendor location, not established prospect geography; quarterly refresh is not turnaround. |
| [b2b-prospect-research-fintech-software](../content/portfolio/b2b-prospect-research-fintech-software.md) | 2 | CFO, VP Finance and compliance roles; funding filters and requested hiring signals; CRM delivery | US identifies the fintech client, not necessarily target accounts. |
| [cloud-migration-tech-stack-research](../content/portfolio/cloud-migration-tech-stack-research.md) | 3 | CTO and IT leadership; legacy-tech signals cross-checked across public sources; CRM delivery | UK is only a tag; neither client nor prospect geography is asserted in metadata. |
| [cold-email-ready-list-cybersecurity-msp](../content/portfolio/cold-email-ready-list-cybersecurity-msp.md) | 4 | IT security leader and compliance officer; mid-market manufacturing/healthcare; real-time inbox verification | US identifies the MSP; target country is unspecified; no additional buying signal is invented. |
| [contact-enrichment-uk-consultancy](../content/portfolio/contact-enrichment-uk-consultancy.md) | 5 | Named-account leadership enrichment; hiring, funding, technology fields; direct CRM import | UK identifies the consultancy; exact leadership titles and account geography are unspecified. |
| [crm-ready-prospect-database-staffing](../content/portfolio/crm-ready-prospect-database-staffing.md) | 6 | Hiring managers and talent leaders; active engineering hiring; technical placement; CRM-ready data | UK is only a tag; target geography is unspecified; organization count is not contact count. |
| [decision-maker-research-software-reseller](../content/portfolio/decision-maker-research-software-reseller.md) | 7 | CFO, COO, operations manager; mid-market manufacturers; system-selection role mapping; CRM delivery | USA is only a tag; role involvement does not prove final purchasing authority. |
| [healthcare-it-decision-maker-research](../content/portfolio/healthcare-it-decision-maker-research.md) | 8 | IT Director, CTO and compliance/privacy roles; private clinics/care groups; profiling by IT-related activity; CRM delivery | UK is only a tag; the body mentions geography as a filter without identifying countries. |
| [msp-prospect-database-us-it-provider](../content/portfolio/msp-prospect-database-us-it-provider.md) | 9 | IT director, vCISO, operations leadership; SMB employee-size and metro criteria; verified CRM-ready contacts | US identifies the managed IT provider; target metros/countries are not named. |
| [professional-services-contact-enrichment](../content/portfolio/professional-services-contact-enrichment.md) | 10 | Legacy CRM enrichment; current roles, verified emails, technographics; departed contacts flagged | US identifies the consultancy; exact role titles and prospect geography are unspecified. |
| [property-management-prospect-list](../content/portfolio/property-management-prospect-list.md) | 11 | Property management director, facilities director, COO; owners/operators; property counts; target metros; CRM delivery | USA is only a tag; target metros/countries are not named. |
| [recruitment-decision-maker-list](../content/portfolio/recruitment-decision-maker-list.md) | 12 | Enterprise talent acquisition, IT hiring and procurement contacts; tech hiring volume and contract spend criteria | UK identifies the agency, not necessarily the enterprise accounts. |
| [saas-existing-database-enrichment](../content/portfolio/saas-existing-database-enrichment.md) | 13 | Existing database cleaned and deduplicated; job titles updated; company fields completed; CRM delivery | US identifies the SaaS client; exact contact roles and database geography are unspecified; "verified where available" follows the source results and ledger. |
| [saas-lead-generation-uk-analytics-platform](../content/portfolio/saas-lead-generation-uk-analytics-platform.md) | 14 | Data, CTO and analytics roles; competing stacks, data-team hiring, funding-stage segments; CRM delivery | UK identifies the analytics vendor, not necessarily the accounts. |
| [verified-contact-list-australian-saas](../content/portfolio/verified-contact-list-australian-saas.md) | 15 | Product manager, head of operations, CTO; AU/NZ mid-market accounts; enriched and CRM-formatted records | Australian client and Australian/New Zealand prospects are explicit; exact verification methods/coverage remain unspecified. |

## Human evidence needed

Every entry has an adjacent `TODO(human):` for delivered counts and research turnaround. Confirm counts by unit (organizations/accounts, contacts, or enriched records), with a delivery file or owner-provided evidence reference. Confirm turnaround with project start and delivery dates and clarify calendar versus business days. Do not infer duration from publication dates, refresh cadence, or import timing.

- **Staffing:** The body supports **1,100 organizations**, but the ledger marks this owner-asserted pending evidence. It is not a count of contacts. Salesforce import within 24 hours of delivery is not research turnaround. Neither figure appears in the new public metadata.
- **MSP:** The body supports **1,240 verified contacts**, but the ledger marks this owner-asserted pending evidence. The count is omitted from the new public metadata; do not infer named metros or additional roles.
- **Other projects:** Exact delivered counts and turnaround are absent. Keep qualitative wording until evidence is supplied.
- **Geography:** Client location is explicitly attached to the client in descriptions. Country-only tags are insufficient to establish target geography, so those countries are omitted. AU/NZ is the only explicitly named prospect-country pair used.
- **Roles and signals:** Use only sourced roles and filters. Enrichment projects do not acquire invented targeting signals; technical fields, missing fields and departed-contact flags describe the actual work. AU/NZ metadata uses the sourced market segment rather than inventing a buying signal.
- **Specific remaining gaps:** Leadership titles for the UK consultancy, exact roles for professional-services and SaaS enrichment, target countries/metros where unspecified, and AU/NZ verification methods/coverage are noted beside the relevant entries.

Obtain the evidence requested by the original ledger (owner brief where applicable, Upwork contract, delivery file, or client message). Keep confidential records private and obtain permission before publishing identifiable evidence.
