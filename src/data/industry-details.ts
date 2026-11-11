export interface IndustryOffering {
  title: string;
  summary: string;
  includes: string[];
}

export interface IndustryDetail {
  heroText: string;
  visualLabel: string;
  challengeTitle: string;
  challenges: { title: string; text: string }[];
  criteriaIntro: string;
  criteria: { title: string; text: string }[];
  exclusions: string[];
  rolesIntro: string;
  roles: { title: string; context: string }[];
  observableSignals: { signal: string; interpretation: string }[];
  exampleProject: { title: string; scenario: string; criteria: string[]; deliverables: string[] };
  caseStudyLink: { href: string; label: string };
  compliance: { framework: string; rules: string[] };
  setupOffering: IndustryOffering;
  managementOffering: IndustryOffering;
  researchOffering: IndustryOffering;
  useCases: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
  relatedServices: { title: string; href: string; status: string; text: string }[];
  ctaTitle: string;
  ctaText: string;
}

// Destinations and scope are defined in offers.ts and page-details.ts.
const baseRelatedServices = [
  { title: 'B2B Prospect Research', href: '/b2b-prospect-research', status: 'Data Foundation', text: 'Discover verified accounts and relevant decision-maker roles with multi-step email verification. No campaign sending included.' },
  { title: 'Email Infrastructure Setup', href: '/email-infrastructure', status: 'Technical Setup', text: 'Client-owned sending domains, DNS authentication (SPF, DKIM, DMARC), and gradual warmup guidance.' },
  { title: 'One-Time Outbound Setup', href: '/one-time-setup', status: 'Build & Handover', text: 'Initial research, infrastructure, approved sequences and a documented handover for your team to run.' },
  { title: 'Ongoing Campaign Management', href: '/ongoing-management', status: 'Recurring Operations', text: 'Agreed recurring research, approved sending, deliverability monitoring and prompt reply triage.' },
];

export const industryDetails: Record<string, IndustryDetail> = {
  saas: {
    heroText: 'Define product-relevant accounts by software category, company scale, geography and observable technology context. Map revenue, operational and technical roles without treating funding or a technology tag as purchase intent.',
    visualLabel: 'SaaS ICP',
    challengeTitle: 'Find product-relevant accounts inside a crowded software market.',
    challenges: [
      { title: 'Category overlap', text: 'Separate B2B software vendors from agencies, resellers and consumer apps before applying size or technology filters.' },
      { title: 'Different evaluation roles', text: 'A CRM integration and a developer tool call for different functional contacts. Titles alone do not establish purchasing authority.' },
      { title: 'Incomplete technology evidence', text: 'A job advert or integration page can provide context, but may not confirm current internal deployment. Record the source and uncertainty.' },
    ],
    criteriaIntro: 'Agree the product use case, required fields and acceptable evidence before researching accounts. Size bands and funding stages are project choices, not default qualification rules.',
    criteria: [
      { title: 'Product & Business Model', text: 'B2B versus B2C focus, software category, published customer segments and integrations. Use published pricing where available rather than inventing contract value.' },
      { title: 'Scale & Serviceable Market', text: 'Client-defined headcount band, headquarters and operating markets, supported languages and publicly announced funding stage, with dates and source notes.' },
      { title: 'Technology Context', text: 'Named CRM, API or infrastructure references from documentation, company announcements or job descriptions; distinguish an offered integration from confirmed internal use.' },
    ],
    exclusions: ['Direct competitors and agreed vendor partners', 'Consumer-only products where the brief requires B2B', 'Unsupported markets or languages', 'Existing customers, opt-outs and accounts below the agreed maturity threshold'],
    rolesIntro: 'Choose functions tied to the product use case; confirm current employment and responsibility where sources allow. Budget ownership still requires discovery.',
    roles: [
      { title: 'VP Sales / CRO', context: 'Research for revenue-workflow software; do not assume every revenue leader owns the relevant tooling budget.' },
      { title: 'Head of RevOps / Operations', context: 'Research for CRM data, reporting and workflow integrations.' },
      { title: 'CTO / VP Engineering', context: 'Research for developer tooling, infrastructure and technical evaluation.' },
      { title: 'Product / Functional Lead', context: 'Research the department using the software, including practitioner input where the brief requests it.' },
    ],
    observableSignals: [
      { signal: 'Dated funding announcement', interpretation: 'Record the announced round and date; it does not establish available budget for your product.' },
      { signal: 'Sales or RevOps vacancies', interpretation: 'Record advertised roles and observation dates; hiring is not evidence of outbound investment or tool demand.' },
      { signal: 'Named platform or migration announcement', interpretation: 'Record exactly what the company announced; do not infer dissatisfaction, renewal timing or readiness to switch.' },
    ],
    exampleProject: {
      title: 'Illustrative SaaS account-research brief',
      scenario: 'Hypothetical brief for an analytics vendor researching B2B software companies in the UK and DACH. This is an illustrative scope, not a client delivery result.',
      criteria: ['Illustrative size band: 50–250 employees', 'UK, Germany, Austria and Switzerland; agreed language coverage', 'Documented CRM context, with internal use distinguished from integrations', 'RevOps and revenue functions; exclude customers and competitors'],
      deliverables: ['Account records with category, geography and size evidence', 'Relevant roles and available business contacts with verification status', 'CRM-ready export with source dates, gaps and suppression notes; volume agreed after sample review'],
    },
    caseStudyLink: { href: '/portfolio/saas-lead-generation-uk-analytics-platform', label: 'UK Analytics Platform Prospect Research Case Study' },
    compliance: {
      framework: 'Distinguish verified contact data from marketing consent under GDPR, PECR, and CAN-SPAM.',
      rules: [
        'Review recipient geography, corporate vs personal status, and sender identification before sending.',
        'Business email verification is not permission to contact a recipient; legal basis must be established by your team.',
        'Maintain customer suppression lists and honor opt-out requests immediately across all campaigns.',
      ],
    },
    setupOffering: {
      title: 'One-Time Outbound Setup',
      summary: 'Build a product-specific SaaS campaign system for your internal sales team to run after handover.',
      includes: ['Product-fit segments and an initial scoped account list', 'Client-controlled mailboxes, authentication and gradual sending plan', 'Client-approved sequences by revenue or technical role', 'Readiness checks, access and operating documentation'],
    },
    managementOffering: {
      title: 'Ongoing Campaign Management',
      summary: 'Maintain agreed SaaS segments, refresh research and operate client-approved email campaigns.',
      includes: ['Recurring account and role research within the agreed scope', 'Approved sending, suppression and deliverability monitoring', 'Reply classification and interested-response handoff to your sales team', 'Weekly operational updates and monthly targeting review'],
    },
    researchOffering: {
      title: 'Research-only',
      summary: 'Supply product-fit account and role data for your existing outreach team; no copywriting, sending or reply handling included.',
      includes: ['Company, role and technology-context research', 'Business email verification where available; unknown fields flagged', 'Deduplicated CSV or agreed CRM-ready format with source notes'],
    },
    useCases: [
      { title: 'CRM reporting workflow', text: 'Illustrative angle: where a company documents the relevant CRM, ask a RevOps contact whether comparing reporting workflows would be useful. Do not claim their current reporting is broken.' },
      { title: 'Developer integration', text: 'Illustrative angle: reference a documented API or platform and offer a relevant integration walkthrough. Confirm technical compatibility before presenting it as a fit.' },
      { title: 'New functional team', text: 'Illustrative angle: reference a dated RevOps vacancy and ask who handles tooling evaluation. Do not equate the vacancy with a buying project.' },
    ],
    faqs: [
      { question: 'Does funding or a technology tag show buying intent?', answer: 'No. These are research context, not proof of need, available budget or readiness to replace a vendor.' },
      { question: 'Can we map several roles per account?', answer: 'Yes, within the agreed scope. Commercial, operational and technical functions can be researched separately, without assuming authority from title alone.' },
      { question: 'What if our SaaS niche is small?', answer: 'Review a sample and source availability before agreeing volume. Missing fields remain flagged rather than filled by inference.' },
    ],
    relatedServices: baseRelatedServices,
    ctaTitle: 'Turn your SaaS market definition into a research brief.',
    ctaText: 'Share the product use case, target markets, size bands, role functions and exclusions. Choose setup, managed campaigns or research-only delivery.',
  },
  msp: {
    heroText: 'Research organisations inside your service territory and agreed company profile. Map IT and business leadership without assuming dissatisfaction with an incumbent provider or an upcoming contract renewal.',
    visualLabel: 'MSP MARKET',
    challengeTitle: 'Define regional service fit before researching IT leadership.',
    challenges: [
      { title: 'Coverage is specific', text: 'Headquarters alone may not show whether branch locations fit your on-site support area. Define the locations and travel limits you can actually serve.' },
      { title: 'Support models differ', text: 'A published IT team can help distinguish account segments, but does not establish a need for co-managed support.' },
      { title: 'Contracts are not public by default', text: 'Do not assign renewal dates or competitor dissatisfaction without explicit evidence supplied or approved for the project.' },
    ],
    criteriaIntro: 'Define service geography, supported environments and company-size thresholds before contact research. Record unknown infrastructure fields as unknown.',
    criteria: [
      { title: 'Territory & Sites', text: 'Named towns, postcodes or regional boundaries, headquarters versus supported sites, and confirmed branch locations.' },
      { title: 'Size & Sector', text: 'Agreed employee bands, commercial sectors and entity types. Headcount is not a verified device count or IT budget.' },
      { title: 'IT Environment', text: 'Public Microsoft 365, Google Workspace or cloud references, advertised IT roles and published certifications, with source dates and limits.' },
    ],
    exclusions: ['Locations outside the agreed support area', 'Companies below the client-defined size threshold, without assuming budget', 'Competitor MSPs, resellers and IT consultancies where excluded', 'Current clients, opt-outs and client-supplied restricted accounts'],
    rolesIntro: 'Map responsibility using the published organisation structure, not a universal headcount rule. A listed IT team does not prove demand for outsourced support.',
    roles: [
      { title: 'Managing Director / Owner', context: 'Relevant where sources place business operations with the owner; confirm IT purchasing responsibility directly.' },
      { title: 'IT Director / Head of Technology', context: 'Relevant for technical discussions about co-managed support or specialist services, not evidence those services are needed.' },
      { title: 'Finance Director / CFO', context: 'A potential commercial stakeholder where the proposed service involves cost planning or supplier review.' },
      { title: 'Operations Director / Practice Manager', context: 'Relevant to site operations, support coordination and business continuity discussions.' },
    ],
    observableSignals: [
      { signal: 'Announced office move or new branch', interpretation: 'Confirms a location event to check against your territory; it does not prove unfilled infrastructure requirements.' },
      { signal: 'Published IT vacancy', interpretation: 'Shows an advertised function and stated technology context, not an overwhelmed team or outsourcing intention.' },
      { signal: 'Published certification or cloud project', interpretation: 'Record the stated scope and date; do not infer security weaknesses or further procurement.' },
    ],
    exampleProject: {
      title: 'Illustrative regional MSP brief',
      scenario: 'Hypothetical research for an MSP serving commercial firms in Greater London. This describes a possible scope, not completed work.',
      criteria: ['Client-approved postcode coverage and supported office locations', 'Illustrative band: 25–150 employees', 'Legal, accounting and architecture firms', 'Exclude current clients, competitors and out-of-area sites'],
      deliverables: ['Territory-matched accounts with site and sector evidence', 'IT, operations or owner roles with available business contacts', 'Source-linked export with technology-context gaps and verification status'],
    },
    caseStudyLink: { href: '/portfolio/msp-prospect-database-us-it-provider', label: 'US IT Provider Prospect Database Case Study' },
    compliance: {
      framework: 'Keep technical context separate from security claims and respect regional outreach regulations.',
      rules: [
        'Do not infer vulnerabilities, breaches or compliance failures from public technology references.',
        'Review recipient eligibility and corporate email rules before approving outreach.',
        'Maintain customer exclusions and opt-out suppression for each campaign.',
      ],
    },
    setupOffering: {
      title: 'One-Time Outbound Setup',
      summary: 'Build a territory-specific outbound system for your MSP business-development owner.',
      includes: ['Coverage map, exclusions and initial account research', 'Sending infrastructure, authentication and gradual ramp plan', 'Approved sequences for IT and operations segments', 'Documented handover; your team manages sending and replies afterward'],
    },
    managementOffering: {
      title: 'Ongoing Campaign Management',
      summary: 'Run approved campaigns for a defined MSP service line within your coverage area.',
      includes: ['Recurring local account research and suppression updates', 'Approved sending and deliverability monitoring', 'Reply classification and interested-response routing to your commercial team', 'Weekly updates and monthly territory or message review'],
    },
    researchOffering: {
      title: 'Research-only',
      summary: 'Deliver territory-matched business and role data to the team operating your existing outreach process.',
      includes: ['Account and site research against your support boundary', 'Available business contacts with verification and source notes', 'CRM-ready export; no managed sending or reply handling'],
    },
    useCases: [
      { title: 'New branch support', text: 'Illustrative angle: reference an announced branch in your coverage area and ask who coordinates IT support there. Do not say the company lacks a provider.' },
      { title: 'Co-managed service introduction', text: 'Illustrative angle: for a documented IT function, offer an overview of your specialist support coverage and ask whether it is relevant. Do not claim the team is understaffed.' },
      { title: 'Supported platform discussion', text: 'Illustrative angle: use a sourced platform reference to introduce a relevant service capability, while confirming the current environment before proposing work.' },
    ],
    faqs: [
      { question: 'Can you identify MSP contract expiry dates?', answer: 'Not by inference. Use a date only when an appropriate source or client-provided record explicitly supports it.' },
      { question: 'Are the example employee bands mandatory?', answer: 'No. Your coverage, service model and preferred company size define the brief; the example bands are illustrative.' },
      { question: 'Can known competitor customers be excluded?', answer: 'Yes, using an agreed account list or supported evidence. An unknown incumbent is not treated as proof of no provider.' },
    ],
    relatedServices: baseRelatedServices,
    ctaTitle: 'Build an MSP brief around your service territory.',
    ctaText: 'Share supported locations, sectors, company sizes and service lines, plus the accounts your team must exclude.',
  },
  recruitment: {
    heroText: 'Research employer clients by desk specialism, geography and published hiring activity. Keep employer business development separate from candidate sourcing, CVs and sensitive applicant data.',
    visualLabel: 'EMPLOYER ICP',
    challengeTitle: 'Focus on employer clients, not candidate sourcing.',
    challenges: [
      { title: 'Employer versus candidate data', text: 'Research the companies and business functions relevant to agency services, not applicants or their personal records.' },
      { title: 'Vacancies are not agency demand', text: 'A listing shows an advertised role, not a failed search, approved agency budget or willingness to use a recruiter.' },
      { title: 'Desk alignment matters', text: 'Match discipline, seniority, location and employment type to the desk being promoted before researching contacts.' },
    ],
    criteriaIntro: 'Define employer sectors, role families, vacancy recency and locations. Keep observations about job adverts distinct from assumptions about hiring urgency.',
    criteria: [
      { title: 'Desk & Employer Alignment', text: 'Named sectors, engineering or technical disciplines, seniority and permanent versus contract roles.' },
      { title: 'Published Hiring Activity', text: 'Company careers-page vacancies, location, advertised date and date checked. Treat reposts and undated listings cautiously.' },
      { title: 'Organisation & Geography', text: 'Agreed company-size bands, hiring locations and published HR or talent functions; no assumed recruitment budget.' },
    ],
    exclusions: ['Candidates, CVs and applicant personal records', 'Competing staffing agencies and RPO providers where excluded', 'Employers outside your desk, location or role scope', 'Current clients, opt-outs and known no-agency or supplier restrictions supplied for the brief'],
    rolesIntro: 'Separate the hiring function from supplier approval. A department manager may describe a role while HR, talent acquisition or procurement controls agency access.',
    roles: [
      { title: 'Head of Talent Acquisition', context: 'Research employer recruitment operations; do not assume an open supplier roster or a review window.' },
      { title: 'HR Director / People Lead', context: 'Relevant to employer hiring processes and agency relationship discussions where their remit supports it.' },
      { title: 'Engineering / Department Lead', context: 'Relevant to the technical discipline being recruited; supplier authority must be confirmed separately.' },
      { title: 'Managing Director / Founder', context: 'Relevant where published information places hiring responsibility with leadership rather than a separate talent team.' },
    ],
    observableSignals: [
      { signal: 'Relevant advertised vacancy', interpretation: 'Record the role, employer source and check date. A vacancy does not demonstrate agency demand or a failed internal search.' },
      { signal: 'Repeated vacancy observations', interpretation: 'Record observation dates without assuming continuous vacancy duration; reposting may reflect multiple roles or stale content.' },
      { signal: 'New facility or talent leader announcement', interpretation: 'Provides company context, not proof of bulk hiring, urgent staffing demand or supplier review.' },
    ],
    exampleProject: {
      title: 'Illustrative engineering employer brief',
      scenario: 'Hypothetical employer research for a technical staffing desk covering the Midlands and North of England; not a placement or campaign result.',
      criteria: ['Manufacturing, robotics and aerospace-component employers', 'Illustrative band: 50–500 employees', 'Published design engineering, CNC or quality-management vacancies', 'Exclude candidates, current clients and known agency restrictions'],
      deliverables: ['Employer accounts with dated vacancy references', 'Relevant HR, talent and department roles with available business contacts', 'Desk-segmented export with verification status and unresolved fields'],
    },
    caseStudyLink: { href: '/portfolio/recruitment-decision-maker-list', label: 'Recruitment Decision-Maker Research Case Study' },
    compliance: {
      framework: 'Keep employer outreach separate from candidate data and maintain supplier-screening rules.',
      rules: [
        'Do not include CVs, applicant histories or sensitive candidate information in this brief.',
        'Review published no-agency notices and client-supplied supplier restrictions.',
        'Approve recipient eligibility, sender identification and opt-out handling before sending.',
      ],
    },
    setupOffering: {
      title: 'One-Time Outbound Setup',
      summary: 'Build a desk-specific employer outreach system for your recruiters to operate after handover.',
      includes: ['Employer criteria, exclusions and initial vacancy-context research', 'Configured infrastructure and gradual sending plan', 'Approved agency-capability sequences without invented candidate claims', 'Operating documentation and reply handoff instructions'],
    },
    managementOffering: {
      title: 'Ongoing Campaign Management',
      summary: 'Refresh employer research and manage approved outreach for agreed recruitment desks.',
      includes: ['Recurring vacancy-context checks within the agreed scope', 'Approved employer campaigns and suppression maintenance', 'Reply classification and interested-employer handoff to your recruiters', 'Weekly updates and monthly desk-level review; no placement guarantee'],
    },
    researchOffering: {
      title: 'Research-only',
      summary: 'Deliver employer and business-role data for your agency to use in its own outreach workflow.',
      includes: ['Desk-aligned accounts with dated employer hiring sources', 'Business contacts verified where available; gaps identified', 'CRM-ready export; no candidate sourcing, sending or reply management'],
    },
    useCases: [
      { title: 'Specialist vacancy context', text: 'Illustrative angle: reference a current engineering vacancy and ask whether external specialist support is considered. Do not claim the vacancy is hard to fill.' },
      { title: 'New location introduction', text: 'Illustrative angle: reference an announced site and introduce your geographic desk coverage, asking who handles relevant recruitment. Do not infer a hiring surge.' },
      { title: 'Supplier process enquiry', text: 'Illustrative angle: ask the appropriate talent function how agency introductions are reviewed, subject to published restrictions. Do not invent a preferred-supplier renewal date.' },
    ],
    faqs: [
      { question: 'Do you source candidates?', answer: 'No. This industry service covers employer-side B2B research and the agreed outbound engagement, not candidate sourcing or applicant data.' },
      { question: 'Does a vacancy prove willingness to use an agency?', answer: 'No. It is an observable listing. Agency eligibility, budget and interest must be confirmed directly.' },
      { question: 'Can we separate multiple desks?', answer: 'Yes. Agree distinct role families, geographies, exclusions and messages for each desk before research or campaign execution.' },
    ],
    relatedServices: baseRelatedServices,
    ctaTitle: 'Map employers in your recruitment market.',
    ctaText: 'Share desk specialism, target sectors, hiring locations, role families and account restrictions. Do not submit candidate records.',
  },
  'professional-services': {
    heroText: 'Translate a defined advisory, legal, financial or consulting offer into observable company criteria and relevant business roles. Corporate change is context for a conversation, not proof of a need for external advice.',
    visualLabel: 'CLIENT ICP',
    challengeTitle: 'Connect a specific practice offer to a serviceable market.',
    challenges: [
      { title: 'Overly broad advisory offers', text: 'Define the actual service and eligible company profile rather than treating every business owner as a prospect.' },
      { title: 'Different functional responsibilities', text: 'Tax, operations and legal services call for different contacts. Published titles do not establish a live mandate.' },
      { title: 'Practice restrictions', text: 'Service geography, professional restrictions and conflicts must shape exclusions before outreach is considered.' },
    ],
    criteriaIntro: 'Agree the practice area, eligible sectors and jurisdiction. Use corporate structure and published activity as research fields, not inferred advisory demand.',
    criteria: [
      { title: 'Structure & Scale', text: 'Headcount bands, entity structure and ownership type. Use turnover only where a reliable dated filing or company source provides it.' },
      { title: 'Serviceable Jurisdiction', text: 'Operating locations, registered entities and sectors within the practice remit; confirm regulatory applicability rather than assuming it from a sector tag.' },
      { title: 'Published Corporate Activity', text: 'Dated acquisitions, entity formations or leadership appointments, with announced versus completed status distinguished.' },
    ],
    exclusions: ['Companies outside the agreed scale, sector or jurisdiction', 'Conflicting accounts, current clients and active retainers identified by your practice', 'Competing firms unless referral-partner research is explicitly scoped', 'Opt-outs and restricted or insolvency-related accounts where outside the agreed practice scope'],
    rolesIntro: 'Choose the function relevant to your service, then verify the published remit. Your partners establish the commercial need and authority through discovery.',
    roles: [
      { title: 'CFO / Finance Director', context: 'For finance, tax and reporting offers, subject to the company structure and remit.' },
      { title: 'Managing Director / CEO', context: 'For strategy and governance discussions where firm-wide leadership is relevant.' },
      { title: 'COO / Operations Director', context: 'For operational processes, supply-chain and transformation services.' },
      { title: 'General Counsel / Legal Lead', context: 'For specialist legal services; do not infer a dispute or an unmet legal requirement.' },
    ],
    observableSignals: [
      { signal: 'Acquisition or joint venture announcement', interpretation: 'Record the parties, date and announced status; advisers may already be appointed and no open mandate is implied.' },
      { signal: 'Published overseas entity or office', interpretation: 'Shows a business footprint change, not an unfulfilled tax, legal or employment-advice requirement.' },
      { signal: 'Leadership appointment', interpretation: 'Supports a dated role update, not an assumption that adviser relationships are under review.' },
    ],
    exampleProject: {
      title: 'Illustrative operational advisory brief',
      scenario: 'Hypothetical research for a consultancy serving UK manufacturing and logistics companies. No client engagement or outcome is claimed.',
      criteria: ['UK manufacturing, logistics and warehousing companies', 'Illustrative band: 75–350 employees', 'Optional turnover filter only where supported by dated financial records', 'Operations and finance functions; apply supplied conflict exclusions'],
      deliverables: ['Company records with sector, scale and corporate-activity sources', 'Relevant executive functions and available verified business contacts', 'CRM-ready export with filing dates, unavailable fields and conflict-screening notes'],
    },
    caseStudyLink: { href: '/portfolio/professional-services-contact-enrichment', label: 'Professional Services Contact Enrichment Case Study' },
    compliance: {
      framework: 'Review practice restrictions, conflict obligations and marketing conduct.',
      rules: [
        'Your practice reviews applicable professional marketing requirements and target jurisdictions.',
        'Use factual service descriptions; do not imply legal problems, distress or confidential mandates.',
        'Apply supplied conflict exclusions and opt-out suppression before approved sending.',
      ],
    },
    setupOffering: {
      title: 'One-Time Outbound Setup',
      summary: 'Build a practice-specific system for your internal business-development team, with partner-approved copy.',
      includes: ['Practice criteria, conflict exclusions and initial research', 'Client-controlled infrastructure and authentication checks', 'Approved sequences for relevant finance, legal or operations functions', 'Documentation and handover; your team owns ongoing operations'],
    },
    managementOffering: {
      title: 'Ongoing Campaign Management',
      summary: 'Maintain agreed account research and approved campaigns for a defined professional service.',
      includes: ['Recurring corporate and role research with conflict-list updates', 'Approved sending, suppression and deliverability checks', 'Interested-reply handoff to your partners for discovery and sales', 'Weekly updates and monthly review; appointment coordination only if separately agreed'],
    },
    researchOffering: {
      title: 'Research-only',
      summary: 'Provide corporate and executive-role data for partner-led business development without managed outreach.',
      includes: ['Sector, structure and available financial-field research', 'Business contacts with verification status and source limitations', 'CRM-ready export; no copywriting, sending or sales qualification'],
    },
    useCases: [
      { title: 'Announced acquisition context', text: 'Illustrative angle: reference the announcement and ask whether a discussion of your relevant integration service would be useful. Do not imply existing advisers are absent.' },
      { title: 'New operating market', text: 'Illustrative angle: reference a documented office opening and offer a discussion within your approved practice remit. Do not diagnose a compliance failure.' },
      { title: 'Function-specific introduction', text: 'Illustrative angle: introduce a defined reporting or operations service to the relevant function and ask whether it is in scope. Use only capabilities your practice can substantiate.' },
    ],
    faqs: [
      { question: 'Can you guarantee outreach will not affect our reputation?', answer: 'No. Audience selection, factual copy and partner approval help control risk, but recipient reactions and sender reputation cannot be guaranteed.' },
      { question: 'Can we filter by turnover?', answer: 'Where reliable dated records disclose it. Missing or outdated figures are flagged, not estimated to force a match.' },
      { question: 'Who handles advisory sales conversations?', answer: 'Your partners or advisors. Managed scope can classify and hand over interested replies; this is not proof of a qualified mandate or budget.' },
    ],
    relatedServices: baseRelatedServices,
    ctaTitle: 'Define the corporate clients your practice serves.',
    ctaText: 'Share the service offer, jurisdiction, sector and scale criteria, role functions and conflict exclusions before choosing an engagement model.',
  },
  'real-estate': {
    heroText: 'Research commercial property businesses, asset managers and portfolio operators by asset class, entity role and geography. Keep homeowner data and assumptions about willingness to sell outside the brief.',
    visualLabel: 'PROPERTY B2B',
    challengeTitle: 'Distinguish commercial owners, managers and operators.',
    challenges: [
      { title: 'Entity relationships', text: 'An SPV, parent company and managing agent may have different roles. Do not treat a registered director as the operational buyer by default.' },
      { title: 'Commercial-only scope', text: 'Commercial entity research is separate from personal residential homeowner or consumer landlord marketing.' },
      { title: 'Portfolio evidence gaps', text: 'Published portfolios and filings may be incomplete or dated. Mark uncertain ownership and management relationships rather than inventing them.' },
    ],
    criteriaIntro: 'Agree asset classes, locations, entity types and evidence requirements. Portfolio size thresholds are project choices, not proof of procurement capacity.',
    criteria: [
      { title: 'Asset Class & Entity Role', text: 'Office, industrial, logistics, retail or other agreed commercial classes; distinguish owner, developer, asset manager and managing agent.' },
      { title: 'Portfolio Scale', text: 'Client-defined asset-count or operating-footprint thresholds, supported by dated portfolio sources; do not assume complete holdings.' },
      { title: 'Geographic Footprint', text: 'Property locations, not just corporate headquarters; named regions, business parks or development areas within your service coverage.' },
    ],
    exclusions: ['Private homeowners and individual consumer landlords', 'Residential-only agents where the brief requires commercial operations', 'Existing clients, tenants, conflicts and opt-outs supplied for suppression', 'Unresolved entity relationships or receivership situations outside the agreed scope'],
    rolesIntro: 'Map the role relevant to the offer and distinguish ownership from operations. A public relationship or title does not prove authority to appoint a supplier or sell an asset.',
    roles: [
      { title: 'Asset Management / Portfolio Director', context: 'Research for portfolio-level services, with responsibility checked against the relevant managing entity.' },
      { title: 'Acquisitions / Investment Director', context: 'Research for acquisition-focused briefs, without assuming an active mandate or available capital.' },
      { title: 'Property Management Director', context: 'Research for operational property services; distinguish the managing agent from the owner.' },
      { title: 'Managing Director / Principal', context: 'Research leadership at commercial developers and investment businesses where the published remit is relevant.' },
    ],
    observableSignals: [
      { signal: 'Commercial acquisition announcement', interpretation: 'Record the asset, parties and date. Existing suppliers may remain; no new tender or willingness to sell is implied.' },
      { signal: 'Published planning decision', interpretation: 'Record the authority reference, decision and date; permission does not establish funding, a start date or procurement demand.' },
      { signal: 'Published retrofit or sustainability plan', interpretation: 'Record the stated assets and targets; do not infer an allocated budget or open supplier opportunity.' },
    ],
    exampleProject: {
      title: 'Illustrative commercial property services brief',
      scenario: 'Hypothetical research for a facilities-services provider covering office and industrial portfolios in South East England, not a completed client project.',
      criteria: ['London and South East commercial asset locations', 'Office, business-park and industrial assets', 'Illustrative threshold: more than five documented commercial assets', 'Asset and property management functions; exclude homeowner records'],
      deliverables: ['Commercial entities with supported owner or manager relationships', 'Relevant roles and available business contacts with verification notes', 'Portfolio sources, dates and unresolved relationships in a CRM-ready export'],
    },
    caseStudyLink: { href: '/portfolio/property-management-prospect-list', label: 'Property Management Prospect List Case Study' },
    compliance: {
      framework: 'Keep property research business-focused and source-specific.',
      rules: [
        'Exclude private homeowner and consumer landlord contact data; commercial business contacts only.',
        'Public ownership records do not themselves establish permission for marketing.',
        'Review recipient eligibility, conflicts and opt-outs before approved outreach.',
      ],
    },
    setupOffering: {
      title: 'One-Time Outbound Setup',
      summary: 'Build a commercial-property campaign system around your asset classes and service footprint.',
      includes: ['Entity criteria, role mapping and initial portfolio-context research', 'Configured mailboxes, authentication and gradual sending plan', 'Approved sequences distinguishing owner and manager audiences', 'Documented handover to your commercial or acquisitions team'],
    },
    managementOffering: {
      title: 'Ongoing Campaign Management',
      summary: 'Refresh agreed commercial-property research and manage approved campaigns by asset class.',
      includes: ['Recurring entity and portfolio-context checks within scope', 'Approved sending, exclusions and deliverability monitoring', 'Interested-reply routing to your commercial team for discovery', 'Weekly updates and monthly audience review; no deal or meeting guarantee'],
    },
    researchOffering: {
      title: 'Research-only',
      summary: 'Deliver commercial company, portfolio-context and role data for your existing business-development team.',
      includes: ['Source-supported ownership or management relationships', 'Available business contacts with verification status and gap notes', 'CRM-ready export; no homeowner data, sending or reply handling'],
    },
    useCases: [
      { title: 'Portfolio service introduction', text: 'Illustrative angle: reference a documented commercial portfolio and ask who reviews facilities-service proposals. Do not imply poor performance by existing suppliers.' },
      { title: 'Planning-context introduction', text: 'Illustrative angle: reference a published planning decision and ask about the process for relevant supplier introductions. Do not assert that work is funded or starting.' },
      { title: 'Published retrofit plan', text: 'Illustrative angle: reference the stated plan and introduce a substantiated service capability, asking whether a discussion is relevant. Do not claim an open procurement budget.' },
    ],
    faqs: [
      { question: 'Do you research private residential landlords?', answer: 'No. This scope covers commercial property businesses, not private homeowners or consumer buy-to-let individuals.' },
      { question: 'How do you research the business behind an SPV?', answer: 'Cross-reference available filings, company websites and portfolio sources. Distinguish legal ownership from management and flag relationships that cannot be verified.' },
      { question: 'Can you identify assets available to buy or lease?', answer: 'Only where a suitable source explicitly states availability. Ownership, planning or portfolio membership alone does not establish willingness to transact.' },
    ],
    relatedServices: baseRelatedServices,
    ctaTitle: 'Define the commercial property businesses you want to reach.',
    ctaText: 'Share asset classes, property locations, portfolio thresholds, entity roles and exclusions to scope setup, managed outreach or research-only delivery.',
  },
};
