// Standalone metadata only; integration is intentionally left to the coordinator.
// Evidence and geographic scope: docs/portfolio-metadata-evidence.md.
export const PORTFOLIO_SEO: Record<string, { title: string; description: string }> = {
  // TODO(human): Confirm delivered account/contact counts, turnaround, and prospect geography; US identifies the vendor.
  "b2b-lead-generation-manufacturing-software": {
    title: "CRM-Ready Plant and Operations Contacts",
    description:
      "Delivered CRM-ready plant manager and operations contacts for a US manufacturing software vendor, matching plant size and installed equipment signals.",
  },
  // TODO(human): Confirm delivered account/contact counts, turnaround, and prospect geography; US identifies the client.
  "b2b-prospect-research-fintech-software": {
    title: "Funding-Filtered Finance and Compliance Contacts",
    description:
      "Delivered CRM-ready CFO, finance and compliance contacts for a US fintech vendor, with funding-stage filters and client-requested hiring signals.",
  },
  // TODO(human): Confirm delivered account/contact counts, turnaround, and geographic scope; UK appears only in source tags.
  "cloud-migration-tech-stack-research": {
    title: "CRM-Ready IT Contacts With Legacy-Tech Signals",
    description:
      "Delivered CRM-ready CTO and IT leadership contacts for a cloud migration consultancy, with legacy-tech signals cross-checked across public sources.",
  },
  // TODO(human): Confirm delivered account/contact counts, turnaround, and prospect geography; US identifies the MSP.
  "cold-email-ready-list-cybersecurity-msp": {
    title: "Inbox-Checked Security and Compliance Contacts",
    description:
      "Delivered inbox-checked IT security and compliance contacts at mid-market manufacturing and healthcare companies for a US cybersecurity provider.",
  },
  // TODO(human): Confirm enriched account/contact counts, turnaround, exact leadership roles, and prospect geography; UK identifies the client.
  "contact-enrichment-uk-consultancy": {
    title: "CRM-Ready Leadership Data for Named Accounts",
    description:
      "Delivered CRM-ready leadership contact data for a UK management consultancy's named accounts, enriched with hiring, funding and technology signals.",
  },
  // TODO(human): Evidence the owner-asserted 1,100 organizations; confirm contact count, research turnaround, and geographic scope (UK tag only).
  // Same-day/24-hour Salesforce import is not research turnaround.
  "crm-ready-prospect-database-staffing": {
    title: "CRM-Ready Hiring Contacts for Technical Staffing",
    description:
      "Delivered CRM-ready hiring manager and talent leader contacts at organizations actively hiring engineers for a staffing firm's technical placement work.",
  },
  // TODO(human): Confirm delivered account/contact counts, turnaround, and geographic scope; USA appears only in source tags.
  "decision-maker-research-software-reseller": {
    title: "Verified ERP Selection Contacts at Manufacturers",
    description:
      "Delivered CRM-ready CFO, COO and operations manager contacts at mid-market manufacturers for an ERP reseller, mapping roles involved in system selection.",
  },
  // TODO(human): Confirm delivered account/contact counts, turnaround, and geographic scope; UK appears only in source tags.
  "healthcare-it-decision-maker-research": {
    title: "Verified IT and Compliance Contacts in Healthcare",
    description:
      "Delivered CRM-ready IT, CTO and compliance contacts at private clinics and care groups for a healthcare IT consultancy, profiled by IT-related activity.",
  },
  // TODO(human): Evidence the owner-asserted 1,240 verified contacts; confirm account count, turnaround, and target metros/countries (US identifies the client).
  "msp-prospect-database-us-it-provider": {
    title: "Verified SMB IT Contacts Ready for CRM Import",
    description:
      "Delivered CRM-ready IT director, vCISO and operations contacts at SMBs for a US managed IT provider, matched by employee size and target metro areas.",
  },
  // TODO(human): Confirm enriched record/account counts, turnaround, exact roles, and prospect geography; US identifies the consultancy.
  "professional-services-contact-enrichment": {
    title: "Updated CRM Contacts With Departures Flagged",
    description:
      "Delivered refreshed CRM contacts for a US professional services consultancy, with current roles, verified emails, technographics and departures flagged.",
  },
  // TODO(human): Confirm delivered owner/contact counts, turnaround, and target metros/countries; USA appears only in source tags.
  "property-management-prospect-list": {
    title: "CRM-Ready Property Contacts With Portfolio Data",
    description:
      "Delivered CRM-ready property management, facilities and COO contacts for a CRE software vendor, with owner and operator property counts by target metro.",
  },
  // TODO(human): Confirm delivered account/contact counts, turnaround, and prospect geography; UK identifies the recruitment agency.
  "recruitment-decision-maker-list": {
    title: "CRM-Ready Enterprise Hiring and Procurement Contacts",
    description:
      "Delivered enterprise talent, IT hiring and procurement contacts for a UK IT staffing agency, profiling accounts by tech hiring volume and contract spend.",
  },
  // TODO(human): Confirm enriched record/account counts, turnaround, exact roles, and database geography; US identifies the SaaS client, not its contacts.
  "saas-existing-database-enrichment": {
    title: "Enriched and Deduplicated SaaS CRM Records",
    description:
      "Delivered a cleaned, CRM-ready database for a US SaaS team, with updated job titles, completed company fields and business emails verified where available.",
  },
  // TODO(human): Confirm delivered account/contact counts, turnaround, and prospect geography; UK identifies the analytics vendor.
  "saas-lead-generation-uk-analytics-platform": {
    title: "Verified Analytics Contacts by Technology Segment",
    description:
      "Delivered CRM-ready data, CTO and analytics contacts for a UK SaaS vendor, segmented by competing analytics stacks, data-team hiring and funding stage.",
  },
  // TODO(human): Confirm delivered account/contact counts, turnaround, and exact email verification methods and coverage.
  "verified-contact-list-australian-saas": {
    title: "CRM-Ready Mid-Market Contacts Across AU and NZ",
    description:
      "Delivered CRM-ready product manager, operations and CTO contacts at Australian and New Zealand mid-market companies for an Australian SaaS business.",
  },
};
