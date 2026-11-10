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
  buyingSignals: { signal: string; interpretation: string }[];
  exampleProject: {
    title: string;
    scenario: string;
    criteria: string[];
    deliverables: string[];
  };
  compliance: {
    framework: string;
    rules: string[];
  };
  setupOffering: IndustryOffering;
  managementOffering: IndustryOffering;
  researchOffering: IndustryOffering;
  useCases: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
  relatedServices: { title: string; href: string; status: string; text: string }[];
  ctaTitle: string;
  ctaText: string;
}

const relatedServices = [
  { title: 'One-Time Outbound Setup', href: '/one-time-setup', status: 'System Build', text: 'Build a dedicated outbound system and hand it over to your team.' },
  { title: 'Ongoing Campaign Management', href: '/ongoing-management', status: 'Managed Service', text: 'Recurring research, execution, reply monitoring, and weekly reporting.' },
  { title: 'B2B Prospect Research', href: '/b2b-prospect-research', status: 'Standalone Data', text: 'Discover new companies and verified business roles against an agreed brief.' },
];

export const industryDetails: Record<string, IndustryDetail> = {
  saas: {
    heroText: 'Build a research brief around software category, company maturity, tech stack, and evaluation roles—without treating generic technology tags as proof of buying intent.',
    visualLabel: 'SaaS ICP',
    challengeTitle: 'Find product-relevant accounts inside a crowded software market.',
    challenges: [
      { title: 'Broad category overlap', text: 'Categories like "marketing tech" or "analytics" contain widely divergent buyers, price tolerances, and implementation requirements.' },
      { title: 'Multi-stakeholder buying groups', text: 'SaaS evaluation typically involves revenue, operational, security, and financial decision-makers at different stages.' },
      { title: 'Unreliable intent assumptions', text: 'Recent funding or advertised job openings show company activity, but do not prove active demand or readiness to switch vendors.' },
    ],
    criteriaIntro: 'Effective SaaS prospecting connects your product use case to observable firmographic and technographic characteristics.',
    criteria: [
      { title: 'Product Category & Business Model', text: 'B2B vs B2C focus, ACV tiers, platform integrations, and primary customer segments.' },
      { title: 'Company Scale & Stage', text: 'Headcount bands, funding stage (Seed to Series C+), operating geography, and sales team size.' },
      { title: 'Observable Technographic Context', text: 'Publicly observable technology stack, CRM platforms, and infrastructure integrations relevant to your offer.' },
    ],
    exclusions: [
      'Direct competitors and vendor partners',
      'Early pre-product or pre-revenue startups without sales infrastructure',
      'Companies outside agreed language or geographical support boundaries',
      'Non-B2B organisations or consumer software providers',
    ],
    rolesIntro: 'Identify functional decision-makers and influencers tied to your specific value driver rather than generic C-suite titles.',
    roles: [
      { title: 'VP Sales / Chief Revenue Officer', context: 'For software products impacting pipeline generation, sales acceleration, or revenue intelligence.' },
      { title: 'Head of Operations / RevOps', context: 'For tools addressing workflow automation, CRM integration, data hygiene, or internal efficiency.' },
      { title: 'CTO / VP Engineering', context: 'For developer tooling, infrastructure software, API integrations, and security solutions.' },
      { title: 'Product & Functional Leads', context: 'For specialized departmental software where evaluation begins with the day-to-day practitioner.' },
    ],
    buyingSignals: [
      { signal: 'Recent funding rounds (Seed/Series A-C)', interpretation: 'Indicates budget expansion and commercial scaling, but requires discovery on specific priorities.' },
      { signal: 'Sales or RevOps team hiring', interpretation: 'Signals outbound investment and expanding go-to-market infrastructure.' },
      { signal: 'New executive leadership appointments', interpretation: 'New leaders often review legacy tooling within their first 90–180 days.' },
      { signal: 'Technology migration announcements', interpretation: 'Public adoption of related platforms creates integration opportunities.' },
    ],
    exampleProject: {
      title: 'European B2B Analytics Platform',
      scenario: 'Targeting mid-market B2B software companies (50–250 employees) in the UK and DACH regions using HubSpot or Salesforce.',
      criteria: [
        'Geography: UK, Germany, Austria, Switzerland',
        'Company Size: 50–250 employees',
        'Observed Tech Stack: HubSpot or Salesforce CRM identified via public signatures',
        'Target Roles: VP Sales, Head of RevOps, Commercial Director',
      ],
      deliverables: [
        '350 criteria-matched SaaS accounts with verified firmographics',
        '720 verified decision-maker contacts with direct business emails and LinkedIn URLs',
        'CRM-ready CSV export with source annotations and gap notes',
      ],
    },
    compliance: {
      framework: 'PECR, UK GDPR & EU ePrivacy Guidelines',
      rules: [
        'B2B outreach to corporate subscribers permitted with clear commercial context and legitimate interest documentation.',
        'Immediate, functional unsubscribe / opt-out mechanisms included in every communication.',
        'Strict suppression management against existing customer and churned account databases.',
      ],
    },
    setupOffering: {
      title: 'One-Time SaaS Outbound Engine',
      summary: 'Build your entire SaaS outbound infrastructure and hand it over to your internal SDR or sales team.',
      includes: [
        'SaaS ICP definition and account scoring matrix',
        'Secondary domain configuration with SPF, DKIM, and DMARC',
        'Multi-touch sequence writing (value-led problem hooks + follow-ups)',
        'Full setup report, deliverability checklist, and team handover session',
      ],
    },
    managementOffering: {
      title: 'Ongoing SaaS Campaign Operations',
      summary: 'Recurring monthly research, campaign execution, deliverability monitoring, and reply routing.',
      includes: [
        'Monthly batches of fresh, criteria-matched SaaS accounts',
        'Daily send monitoring within safe deliverability thresholds',
        'Auto-reply filtering and positive response escalation with context',
        'Weekly pipeline reporting and iterative sequence optimization',
      ],
    },
    researchOffering: {
      title: 'Standalone SaaS Prospect Data',
      summary: 'Custom-built SaaS account lists and decision-maker contact data for your existing team.',
      includes: [
        'Target accounts filtered by employee size, funding, and tech stack',
        'Verified executive and functional decision-maker emails and LinkedIn URLs',
        'Clean, CRM-compatible CSV formatting with source notes',
      ],
    },
    useCases: [
      { title: 'Vertical SaaS expansion', text: 'Map eligible accounts in specific vertical subsectors while preserving strict company-fit exclusions.' },
      { title: 'New geography testing', text: 'Test enterprise and mid-market accounts in the US or UK before establishing local sales offices.' },
      { title: 'Competitive replacement research', text: 'Identify accounts using legacy platforms where contract renewal cycles justify outbound outreach.' },
    ],
    faqs: [
      { question: 'Can you guarantee that targeted SaaS companies want our tool?', answer: 'No. Observable signals like headcount, funding, and tech stack confirm demographic fit, not active purchase intention. Discovery is required during sales conversations.' },
      { question: 'Can we research multiple decision-makers per SaaS account?', answer: 'Yes. For mid-market and enterprise deals, multi-threading (targeting both commercial and technical leaders) is explicitly supported.' },
      { question: 'What if our target market is very narrow?', answer: 'We begin with an exploratory sample to verify account density and contact availability before committing to a larger project scope.' },
    ],
    relatedServices,
    ctaTitle: 'Turn your SaaS market definition into a verified pipeline brief.',
    ctaText: 'Share your product use case, target geography, size bands, and decision-maker roles to review a representative sample.',
  },

  msp: {
    heroText: 'Research organisations inside your serviceable territory and IT complexity profile, then identify technology and business leadership without assuming dissatisfaction with their existing provider.',
    visualLabel: 'MSP MARKET',
    challengeTitle: 'Define regional service fit before researching IT leadership.',
    challenges: [
      { title: 'Territorial and on-site support limits', text: 'MSPs typically require client locations within 30–90 minutes of support hubs for hybrid or on-site coverage.' },
      { title: 'Varied IT co-management models', text: 'Organisations with internal IT directors need co-managed support, while smaller firms without IT staff need fully managed services.' },
      { title: 'Incumbent contract invisibility', text: 'Public data cannot reveal existing MSP contract expiration dates; outreach must focus on service capabilities rather than contract poaching.' },
    ],
    criteriaIntro: 'A high-converting MSP brief aligns geographic service area, headcount thresholds, and observable IT infrastructure needs.',
    criteria: [
      { title: 'Service Territory & Multi-Site Profile', text: 'County/state boundaries, office count, primary headquarters, and remote workforce distribution.' },
      { title: 'Organisation Scale & Industry Risk', text: '20–250 employees (illustrative range), professional sectors with compliance burdens (finance, legal, manufacturing).' },
      { title: 'Observable IT Infrastructure Context', text: 'Microsoft 365 vs Google Workspace usage, public cybersecurity postures, and cloud infrastructure signals.' },
    ],
    exclusions: [
      'Companies outside your documented on-site support territory',
      'Micro-businesses (<10 users) lacking commercial IT support budgets',
      'Competitor MSPs, telecoms resellers, and IT consultancies',
      'Existing clients and previously churned accounts',
    ],
    rolesIntro: 'Targeting depends on company size: operational leadership at smaller firms, dedicated IT directors at mid-sized firms.',
    roles: [
      { title: 'Managing Director / Business Owner', context: 'At organisations with 20–75 employees where technology decisions and budget approvals remain with executive ownership.' },
      { title: 'IT Director / Head of Technology', context: 'At organisations with 75–250+ employees seeking co-managed IT, specialized cybersecurity, or cloud migration assistance.' },
      { title: 'Finance Director / CFO', context: 'Where IT risk, insurance compliance, capital expenditure, and predictable monthly recurring costs drive evaluation.' },
      { title: 'Operations Director / COO', context: 'Where system uptime, remote work reliability, and operational continuity are primary management concerns.' },
    ],
    buyingSignals: [
      { signal: 'Office relocation or branch expansion', interpretation: 'Creates immediate network infrastructure, structured cabling, and cloud setup requirements.' },
      { signal: 'Cybersecurity or compliance regulations', interpretation: 'Industry mandates (Cyber Essentials, ISO 27001, HIPAA) prompt IT posture reviews.' },
      { signal: 'Rapid headcount expansion', interpretation: 'Internal IT staff become overwhelmed, increasing co-managed support viability.' },
      { signal: 'Legacy server decommissioning', interpretation: 'Opportunities for Microsoft Azure or hybrid cloud migration projects.' },
    ],
    exampleProject: {
      title: 'Regional UK Managed Service Provider',
      scenario: 'A London-based MSP targeting professional service firms (legal, accounting, architectural) with 25–150 employees within the M25 ring.',
      criteria: [
        'Geography: Greater London (within 45-minute transit radius)',
        'Company Size: 25–150 employees (illustrative client-defined range)',
        'Sectors: Legal, Accounting, Architecture, Wealth Management',
        'Exclusions: Educational institutions, public sector, current client roster',
      ],
      deliverables: [
        '400 verified regional commercial organisations matching sector and size criteria',
        '650 decision-maker contacts (Managing Partners, Practice Managers, Operations Directors)',
        'Documented source records with verified corporate emails and phone numbers',
      ],
    },
    compliance: {
      framework: 'PECR (UK) & CAN-SPAM (US) Standards',
      rules: [
        'Clear commercial identification showing the MSP entity name and physical address.',
        'Relevance requirement: messages address genuine business IT and risk considerations.',
        'Immediate removal and permanent suppression upon receiving an opt-out request.',
      ],
    },
    setupOffering: {
      title: 'One-Time MSP Outbound Engine',
      summary: 'Configure a dedicated outbound business development system for your internal sales rep or account executive.',
      includes: [
        'Regional territory mapping and account qualification checklist',
        'Dedicated sending domains and warmed mailboxes configured for IT decision-makers',
        'Peer-to-peer sequence writing addressing cybersecurity, cloud, and operational uptime',
        'Complete handover guide with reply-routing templates and CRM import workflows',
      ],
    },
    managementOffering: {
      title: 'Ongoing MSP Campaign Management',
      summary: 'Continuous monthly account research and managed email campaigns across your target territory.',
      includes: [
        'Monthly additions of verified regional business accounts',
        'Gradual outreach execution respecting sender reputation limits',
        'Lead routing for positive replies directly to your commercial director',
        'Weekly reporting detailing delivery metrics and verified conversation opportunities',
      ],
    },
    researchOffering: {
      title: 'Standalone MSP Prospect Lists',
      summary: 'Verified contact lists of business owners and IT leaders within your exact geographic service footprint.',
      includes: [
        'Territory-filtered account datasets with employee count verification',
        'Direct business email and phone data for executive and IT decision-makers',
        'Deduplicated and structured for immediate import into your CRM (HubSpot, ConnectWise, Autotask)',
      ],
    },
    useCases: [
      { title: 'Regional business development', text: 'Systematically map every eligible business within a defined radius of your operations center.' },
      { title: 'Cybersecurity service launches', text: 'Target companies in regulated sectors with messaging focused on vulnerability assessments and compliance.' },
      { title: 'Cloud migration campaigns', text: 'Engage companies running legacy infrastructure to introduce managed cloud services.' },
    ],
    faqs: [
      { question: 'Can you tell when an MSP contract expires?', answer: 'No. Contract dates are private commercial agreements. We target observable business characteristics and growth triggers rather than making speculative contract timing assumptions.' },
      { question: 'Is the 20–250 employee range required?', answer: 'No. The 20–250 range is an illustrative client-defined example. Your brief defines your exact preferred headcount, revenue, and infrastructure thresholds.' },
      { question: 'Can we exclude businesses already using our competitors?', answer: 'Yes. If competitor client lists or specific accounts are known, they are incorporated directly into the project suppression list.' },
    ],
    relatedServices,
    ctaTitle: 'Build an MSP prospect brief around your exact service territory.',
    ctaText: 'Share your coverage area, target sectors, employee ranges, and specialist services to request a verified sample.',
  },

  recruitment: {
    heroText: 'Organise employer client research around your industry desk, geography, and hiring specialism—keeping business development strictly separate from candidate sourcing and sensitive applicant data.',
    visualLabel: 'EMPLOYER ICP',
    challengeTitle: 'Focus on employer client acquisition, not candidate sourcing.',
    challenges: [
      { title: 'Confusing candidates with clients', text: 'Recruitment outreach must target hiring managers and HR directors who buy recruitment services, never candidate profiles.' },
      { title: 'Job post signal misinterpretation', text: 'An active job listing proves hiring activity, but does not prove willingness to engage external agency support.' },
      { title: 'Desk specialism misalignment', text: 'Target companies must match the exact sector, seniority level, and discipline handled by the specific recruiter desk.' },
    ],
    criteriaIntro: 'Successful agency business development targets companies with repeated hiring needs and structural talent competition.',
    criteria: [
      { title: 'Employer Sector & Desk Alignment', text: 'Engineering, technology, life sciences, healthcare, finance, or executive placement sectors.' },
      { title: 'Hiring Volume & Expansion Activity', text: 'Observable job openings, department expansion, new facility launches, and rapid headcount increases.' },
      { title: 'Company Scale & Organizational Structure', text: 'Mid-market to enterprise employers with sufficient hiring budgets and structured talent acquisition functions.' },
    ],
    exclusions: [
      'Candidate profiles, CVs, and individual applicant personal records',
      'Competing recruitment agencies, staffing firms, and RPO providers',
      'Small firms without recruitment budgets or formal agency engagement policies',
      'Active agency clients and accounts with existing PSL agreements',
    ],
    rolesIntro: 'Map decision-makers based on whether your agency sells to internal talent acquisition or directly to departmental hiring managers.',
    roles: [
      { title: 'Head of Talent Acquisition / Recruitment', context: 'At larger organisations with structured hiring functions, vendor management systems, and PSL review windows.' },
      { title: 'HR Director / Chief People Officer', context: 'At mid-sized employers where recruitment strategy, fee agreements, and agency relationships sit with HR leadership.' },
      { title: 'Engineering / Departmental Hiring Managers', context: 'For niche, technical, or executive desks where business leaders initiate agency engagements for hard-to-fill roles.' },
      { title: 'Managing Director / Business Founder', context: 'At boutique, fast-growing companies without dedicated internal recruiters.' },
    ],
    buyingSignals: [
      { signal: 'Repeated specialist vacancies open for >60 days', interpretation: 'Indicates internal talent teams are struggling to fill the role organically.' },
      { signal: 'New regional office or technical facility', interpretation: 'Signals bulk hiring requirements across multiple operational functions.' },
      { signal: 'Major client wins or project expansion announcements', interpretation: 'Creates urgent delivery capacity requirements for contract or permanent talent.' },
      { signal: 'Appointment of a new Head of People or Talent', interpretation: 'New leadership frequently reviews supplier performance and existing agency rosters.' },
    ],
    exampleProject: {
      title: 'UK Engineering & Technical Staffing Agency',
      scenario: 'Targeting manufacturing, aerospace, and robotics engineering employers in the Midlands and North of England with 50–500 employees.',
      criteria: [
        'Geography: UK Midlands, Yorkshire, North West',
        'Industry: Advanced Manufacturing, Robotics, Aerospace Components',
        'Company Size: 50–500 employees',
        'Hiring Indicators: Public vacancies for Design Engineers, CNC Programmers, or Quality Managers',
      ],
      deliverables: [
        '300 engineering employer accounts with active or recurring technical hiring requirements',
        '550 verified hiring decision-makers (Engineering Directors, Operations Managers, HR Heads)',
        'Structured spreadsheet with verified corporate emails, direct phone lines, and vacancy context',
      ],
    },
    compliance: {
      framework: 'UK GDPR, Employment Agency Regulations & Data Protection',
      rules: [
        'Strict separation: employer business development data is strictly isolated from candidate database repositories.',
        'No processing of special category personal data or individual CV credentials.',
        'Transparent corporate B2B identification with standard opt-out provisions on all communications.',
      ],
    },
    setupOffering: {
      title: 'One-Time Recruiter Outbound Engine',
      summary: 'Build an automated client-acquisition outbound system tailored to your specific recruitment desk.',
      includes: [
        'Desk-specific ICP definition covering employer size, sectors, and hiring signals',
        'Dedicated sending domains and inboxes warmed to protect primary email reputation',
        'Value-oriented email sequences addressing talent shortages, time-to-hire, and niche skill access',
        'Complete setup documentation and recruiter orientation session',
      ],
    },
    managementOffering: {
      title: 'Ongoing Recruiter Client Acquisition',
      summary: 'Monthly research of hiring employers and managed outreach to generate recruitment brief opportunities.',
      includes: [
        'Weekly tracking of companies advertising relevant vacancies within your desk specialism',
        'Outreach to hiring managers and talent leaders with tailored vacancy context',
        'Immediate forwarding of positive client responses requesting fee terms or discovery calls',
        'Monthly review of sector response rates and targeting refinements',
      ],
    },
    researchOffering: {
      title: 'Standalone Employer Prospect Data',
      summary: 'Verified contact lists of hiring decision-makers at employers actively recruiting in your specialist sector.',
      includes: [
        'Employer accounts filtered by active vacancy signals and company size',
        'Verified direct contact details for hiring managers and HR directors',
        'CRM-ready formatting compatible with Bullhorn, Vincere, or Salesforce',
      ],
    },
    useCases: [
      { title: 'Specialist desk launching', text: 'Build a targeted database of 500 employer prospects when launching a new geographical or functional recruitment desk.' },
      { title: 'Hard-to-fill role campaigns', text: 'Identify companies with long-standing vacancies in your niche and introduce pre-qualified candidate profiles.' },
      { title: 'PSL tender prospecting', text: 'Map enterprise HR and talent leaders ahead of annual Preferred Supplier List renewal windows.' },
    ],
    faqs: [
      { question: 'Do you source candidates or job applicants?', answer: 'No. This service is strictly B2B employer client acquisition for recruitment agencies looking for companies that buy recruitment services. We do not source candidates.' },
      { question: 'Does an active vacancy guarantee the employer will use an agency?', answer: 'No. A vacancy indicates hiring need, but many companies attempt direct hiring first. Outreach introduces your agency capability when internal methods fall short.' },
      { question: 'Can we run campaigns across multiple specialist desks?', answer: 'Yes. Campaigns and prospect lists can be segmented by discipline (e.g. Technology, Finance, Engineering) with distinct messaging for each.' },
    ],
    relatedServices,
    ctaTitle: 'Map the hiring employers in your recruitment market.',
    ctaText: 'Tell us your desk specialism, target sectors, geography, and ideal client size to request an employer prospect sample.',
  },

  'professional-services': {
    heroText: 'Translate specialist consulting, legal, financial, or agency expertise into observable business criteria and leadership roles—without treating every business owner as the same prospect.',
    visualLabel: 'CLIENT ICP',
    challengeTitle: 'Connect specialist advisory expertise to serviceable corporate needs.',
    challenges: [
      { title: 'Vague advisory language', text: 'Broad terms like "business advisory" or "growth consulting" fail to resonate; outreach must address specific commercial friction points.' },
      { title: 'Fragmented buying authority', text: 'The purchasing executive varies dramatically depending on whether the service touches tax, technology, governance, or operations.' },
      { title: 'Jurisdictional and regulatory fit', text: 'Advisory capabilities depend heavily on licensing, geographic jurisdiction, and compliance applicability.' },
    ],
    criteriaIntro: 'Professional services prospecting connects specific commercial problems to organisations with the scale and complexity to require external counsel.',
    criteria: [
      { title: 'Organisation Structure & Scale', text: 'Revenue thresholds, headcount tiers, multi-entity corporate structures, and ownership models (private equity, family-owned, corporate).' },
      { title: 'Regulatory & Operating Environment', text: 'Subject to specific reporting standards, compliance frameworks, or cross-border trade regulations.' },
      { title: 'Corporate Transition Triggers', text: 'Mergers, acquisitions, restructuring, executive succession, international expansion, or capital events.' },
    ],
    exclusions: [
      'Micro-businesses without commercial advisory or legal budgets',
      'Insolvent companies or organisations in administration (unless in turnaround scope)',
      'Direct peer consulting practices and conflicting service providers',
      'Existing clients, active retainers, and formal conflict-of-interest accounts',
    ],
    rolesIntro: 'Align targeting with the specific executive who owns the commercial problem your practice solves.',
    roles: [
      { title: 'Chief Financial Officer / Finance Director', context: 'For corporate finance, forensic accounting, tax restructuring, audit, and transaction advisory services.' },
      { title: 'Managing Partner / Chief Executive Officer', context: 'For corporate strategy, executive governance, leadership development, and firm-wide restructuring.' },
      { title: 'Chief Operating Officer / Operations Director', context: 'For operational excellence, supply chain optimization, business transformation, and process consulting.' },
      { title: 'General Counsel / Head of Legal', context: 'For specialist commercial law, employment compliance, IP protection, and regulatory advisory engagements.' },
    ],
    buyingSignals: [
      { signal: 'M&A transactions or joint venture announcements', interpretation: 'Triggers due diligence, post-merger integration, tax structuring, and contractual review needs.' },
      { signal: 'Regulatory changes affecting the sector', interpretation: 'Creates urgent compliance, policy review, and strategic adaptation requirements.' },
      { signal: 'International entity formation or expansion', interpretation: 'Requires cross-border tax, transfer pricing, and local employment law counsel.' },
      { signal: 'C-suite or board-level succession announcements', interpretation: 'Prompts strategic reviews of corporate direction, governance, and advisor relationships.' },
    ],
    exampleProject: {
      title: 'B2B Commercial Advisory Firm',
      scenario: 'A specialist consultancy targeting mid-market UK manufacturing and logistics firms (£10M–£50M turnover) undergoing digital supply chain transformation.',
      criteria: [
        'Geography: United Kingdom nationwide',
        'Sector: Logistics, Warehousing, Industrial Manufacturing',
        'Scale: 75–350 employees / £10M–£50M annual turnover',
        'Target Roles: Managing Director, Finance Director, Supply Chain Director',
      ],
      deliverables: [
        '350 verified mid-market corporate accounts meeting turnover and industry criteria',
        '580 senior executive contacts with verified corporate emails and direct phone numbers',
        'Structured spreadsheet with verified corporate metadata, ownership structure, and recent company activity',
      ],
    },
    compliance: {
      framework: 'PECR, SRA / ICAEW Marketing Guidelines & UK GDPR',
      rules: [
        'Outreach strictly adheres to professional standards and ethical advertising guidelines.',
        'Factual, non-misleading messaging focused on verifiable business advisory capabilities.',
        'Complete opt-out mechanisms and data subject suppression honored instantly.',
      ],
    },
    setupOffering: {
      title: 'One-Time Practice Outbound Setup',
      summary: 'Build a dignified, professional outbound business development system for your partners and practice heads.',
      includes: [
        'Practice-specific ICP definition and corporate trigger mapping',
        'Executive secondary domains and authenticated mailboxes protecting practice reputation',
        'Thought-leadership and insight-led email sequences written with professional tone',
        'Complete operating manual for internal business development teams',
      ],
    },
    managementOffering: {
      title: 'Ongoing Practice BD Management',
      summary: 'Monthly research and managed campaign execution to initiate conversations with prospective corporate clients.',
      includes: [
        'Continuous research of qualifying corporate accounts and leadership appointments',
        'Managed campaign sending strictly controlled for executive sender reputation',
        'Warm handover of interested executive replies directly to practice partners',
        'Monthly strategic review of market reception and targeting criteria',
      ],
    },
    researchOffering: {
      title: 'Standalone Corporate Prospect Data',
      summary: 'Verified executive contact lists for mid-market and enterprise organisations matching your practice focus.',
      includes: [
        'Turnover- and employee-verified corporate account lists',
        'Verified direct contact details for C-suite and partner-level decision-makers',
        'Formatted for seamless import into professional services CRMs (HubSpot, Salesforce)',
      ],
    },
    useCases: [
      { title: 'Niche practice area expansion', text: 'Engage target organisations when launching a specialized regulatory, tax, or transformation advisory line.' },
      { title: 'Trigger-based corporate outreach', text: 'Reach leadership teams at companies that have recently announced acquisitions, funding, or executive changes.' },
      { title: 'Referral and partnership mapping', text: 'Identify complementary advisory firms (e.g. accounting firms for a legal practice) to build reciprocal referral relationships.' },
    ],
    faqs: [
      { question: 'Will cold outreach harm our professional firm reputation?', answer: 'Not when conducted with professional dignity. We write conservative, insight-led messages that respect executive tone and present relevant business ideas rather than aggressive sales pitches.' },
      { question: 'Can you filter companies by turnover or revenue?', answer: 'Yes. Where reliable public financial records or company registries exist (e.g. UK Companies House), financial thresholds are incorporated directly into the research.' },
      { question: 'Who handles the sales discussions?', answer: 'Your partners or senior advisors. We generate and qualify initial interest; complex advisory sales conversations remain firmly with your subject-matter experts.' },
    ],
    relatedServices,
    ctaTitle: 'Define the corporate clients your advisory practice needs.',
    ctaText: 'Share your practice area, client turnover thresholds, target sectors, and executive roles to request a tailored research sample.',
  },

  'real-estate': {
    heroText: 'Research commercial real estate businesses, asset managers, and portfolio operators by property type and geography—keeping private individuals and homeowner marketing strictly outside the default scope.',
    visualLabel: 'PROPERTY B2B',
    challengeTitle: 'Target commercial property entities, not private homeowners.',
    challenges: [
      { title: 'Complex commercial entity structures', text: 'Property holdings often operate through SPVs, fund managers, asset operators, and development entities that require careful disambiguation.' },
      { title: 'Consumer vs commercial boundary', text: 'B2B commercial real estate prospecting must be strictly isolated from consumer residential landlord or homeowner marketing.' },
      { title: 'Portfolio data fragmentation', text: 'Property registry records rarely include direct commercial contact details; research requires manual cross-referencing of corporate filings.' },
    ],
    criteriaIntro: 'Commercial property prospecting focuses on operating entities, portfolio scale, asset classes, and regional investment focus.',
    criteria: [
      { title: 'Commercial Asset Class Focus', text: 'Industrial, logistics, office, retail, purpose-built student accommodation (PBSA), or hospitality real estate.' },
      { title: 'Portfolio Scale & Operating Structure', text: 'Asset managers, REITs, private equity property funds, commercial landlords with >5 properties, or development firms.' },
      { title: 'Geographic Investment Footprint', text: 'Specific urban centers, business parks, regional development corridors, or national logistics hubs.' },
    ],
    exclusions: [
      'Private residential homeowners and individual consumer landlords',
      'Small residential letting agents without commercial operations',
      'Entities in liquidation or property portfolios under receivership',
      'Existing clients, tenants, and conflicting regional suppliers',
    ],
    rolesIntro: 'Identify decision-makers responsible for property acquisitions, asset management, capital expenditure, and facility operations.',
    roles: [
      { title: 'Head of Asset Management / Portfolio Director', context: 'Responsible for portfolio performance, operational efficiency, supplier procurement, and tenant retention.' },
      { title: 'Acquisitions Director / Head of Investment', context: 'Responsible for sourcing, evaluating, and closing commercial property transactions and site acquisitions.' },
      { title: 'Property Management Director', context: 'Oversees day-to-day facility maintenance, supplier contracts, security, and operational standards.' },
      { title: 'Managing Director / Principal', context: 'At commercial property development and private investment groups where executive leadership controls major purchasing decisions.' },
    ],
    buyingSignals: [
      { signal: 'Commercial property acquisition announcements', interpretation: 'Newly acquired assets immediately require surveying, facilities management, leasing, and renovation suppliers.' },
      { signal: 'Planning permission approvals for commercial developments', interpretation: 'Triggers contracting requirements for engineering, environmental, construction, and marketing services.' },
      { signal: 'New property fund close or capital raise', interpretation: 'Signals active investment deployment and upcoming transaction activity.' },
      { signal: 'ESG and sustainability retrofit commitments', interpretation: 'Creates urgent demand for energy efficiency, solar, HVAC, and building automation retrofits.' },
    ],
    exampleProject: {
      title: 'Commercial Facilities & ESG Solutions Provider',
      scenario: 'Targeting commercial property asset managers and REITs in the UK South East holding commercial office and industrial portfolios.',
      criteria: [
        'Geography: London and South East England',
        'Asset Types: Commercial Office, Business Parks, Industrial Warehouses',
        'Portfolio Size: Ownership or management of >5 commercial assets',
        'Target Roles: Head of Asset Management, Operations Director, ESG Lead',
      ],
      deliverables: [
        '250 commercial property ownership and asset management entities',
        '420 verified decision-maker contacts with business emails and telephone lines',
        'Documented portfolio notes detailing primary asset classes and regional holdings',
      ],
    },
    compliance: {
      framework: 'PECR, B2B Marketing Rules & Commercial Property Standards',
      rules: [
        'Strict commercial focus: no personal residential homeowner data is ever researched or contacted.',
        'Corporate subscriber validation ensures outreach targets verified business legal entities.',
        'Immediate suppression honored for any entity requesting exclusion from future communications.',
      ],
    },
    setupOffering: {
      title: 'One-Time CRE Outbound Engine',
      summary: 'Build an outbound business development infrastructure tailored to commercial real estate deal-sourcing and supplier contracting.',
      includes: [
        'Commercial property ICP definition covering asset classes and entity types',
        'Dedicated sending domains and warmed mailboxes configured for property executives',
        'High-context sequence copy addressing asset yield, ESG compliance, and operating efficiency',
        'Complete setup report and operational handover session for your acquisitions team',
      ],
    },
    managementOffering: {
      title: 'Ongoing CRE Campaign Management',
      summary: 'Recurring monthly research and managed outreach across commercial property operators and asset managers.',
      includes: [
        'Ongoing tracking of commercial property transactions, planning approvals, and portfolio changes',
        'Managed email outreach with tailored messaging per asset class',
        'Direct escalation of interested responses to your acquisitions or commercial team',
        'Weekly reporting tracking outreach deliverability and verified commercial conversations',
      ],
    },
    researchOffering: {
      title: 'Standalone Commercial Property Data',
      summary: 'Custom-researched lists of commercial property owners, asset managers, and developers in your target market.',
      includes: [
        'Verified corporate ownership entities cross-referenced with commercial registry records',
        'Direct business contact details for property directors, asset managers, and acquisitions leads',
        'CRM-ready data delivery formatted for immediate use',
      ],
    },
    useCases: [
      { title: 'Commercial tenant representation', text: 'Engage commercial office and industrial occupiers ahead of lease expiry events.' },
      { title: 'Off-market site sourcing', text: 'Identify commercial land and asset owners matching specific redevelopment or acquisition briefs.' },
      { title: 'Property supplier business development', text: 'Connect commercial suppliers (facilities, security, solar, proptech) with asset management leadership.' },
    ],
    faqs: [
      { question: 'Do you research private residential landlords?', answer: 'No. This service is strictly focused on commercial real estate (B2B). We do not research or market to private residential homeowners or consumer buy-to-let individuals.' },
      { question: 'How do you identify the actual decision-maker behind an SPV?', answer: 'Special Purpose Vehicles rarely have direct contacts. We research the managing entity, asset management firm, or parent investment group responsible for day-to-day operations.' },
      { question: 'Can you research portfolios in specific asset classes?', answer: 'Yes. Criteria can specify logistics, industrial, commercial office, retail parks, student housing, or mixed-use developments.' },
    ],
    relatedServices,
    ctaTitle: 'Define the commercial property operators you want to reach.',
    ctaText: 'Share your target asset classes, geographic market, portfolio scale, and relevant business roles to request a verified sample.',
  },
};
