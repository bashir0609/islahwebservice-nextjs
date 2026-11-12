export const site = {
  name: 'Islah Web Service',
  canonical: 'https://www.islahwebservice.com',
  headline: 'B2B Lead Generation, Built and Managed Around Your Business',
  subheading: 'Find your ideal customers, build a professional outbound email system, or let Islah manage your ongoing prospect research and outreach.',
};

export const primaryNav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Case Studies', href: '/portfolio' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About Us', href: '/about' },
];

export interface ServiceItem {
  slug: string;
  title: string;
  category: string;
  pending: boolean;
  metaTitle?: string;
  metaDescription?: string;
  summary: string;
  headline: string;
  intro: string;
  deliverables: string[];
  steps: string[];
  boundary: string;
  question: string;
  answer: string;
}

export interface IndustryItem {
  slug: string;
  title: string;
  headline: string;
  summary: string;
  metaTitle?: string;
  metaDescription?: string;
  signals: string[];
  context: string;
  brief: string;
}

export const services: ServiceItem[] = [
  {
    slug: 'b2b-prospect-research',
    title: 'B2B Prospect Research',
    category: 'Data Foundation & Standalone Service',
    pending: false,
    metaTitle: 'B2B Prospect Research & List Building | Islah Web Service',
    metaDescription: 'Discover verified B2B accounts, decision-maker roles, and direct business contacts tailored to your sales criteria. CRM-ready delivery with full data source notes.',
    summary: 'Find companies and verified decision-makers against a brief tailored to your sales process.',
    headline: 'B2B Prospect Research & Custom Account Mapping',
    intro: 'A useful prospect database begins with clear boundaries. We research target accounts and relevant decision-maker roles against your exact sales criteria, documenting verification status and source metadata.',
    deliverables: [
      'Target accounts researched against strict industry, size, geography, and technographic parameters',
      'Functional decision-maker roles identified, distinguishing operational buyers from executive sponsors',
      'Direct business emails verified through multi-step SMTP checks where available, with invalid records flagged',
      'Transparent documentation of data sources, check dates, and confidence indicators for every record',
      'Cleanly formatted CSV or spreadsheet exports tailored to your CRM schema (HubSpot, Salesforce, Pipedrive)',
    ],
    steps: [
      'Define your target market, exclusions, and required fields.',
      'Review a representative research sample before expanding the brief.',
      'Receive a structured dataset with verified contacts and transparent limitations.',
    ],
    boundary: 'A match to your criteria is not evidence of buying intent. Business emails are verified where available; no response rate or sales outcome is guaranteed.',
    question: 'What should I include in a research brief?',
    answer: 'Start with geography, company type, employee ranges, target roles, and exclusions. Tell us how you plan to use the records so we can agree on required fields and a suitable handoff format.',
  },
  {
    slug: 'contact-enrichment',
    title: 'Existing Database Enrichment',
    category: 'Data Quality & Standalone Service',
    pending: false,
    metaTitle: 'B2B Contact Enrichment & CRM Hygiene | Islah Web Service',
    metaDescription: 'Enrich existing CRM records with missing firmographic fields, updated decision-maker contacts, and email verification. Transparent exception reporting.',
    summary: 'Make the records you already own more complete, consistent, and usable for outreach.',
    headline: 'B2B Contact Enrichment & CRM Database Hygiene',
    intro: 'When you already have account or contact records, starting over is rarely the best choice. Our contact enrichment service focuses on researching missing fields, updating outdated titles, and verifying emails across your existing database.',
    deliverables: [
      'Research and complete essential firmographic and demographic gaps in your existing records',
      'De-duplicate records and standardise company names, industries, and job titles to consistent schemas',
      'Audit historical contacts to confirm whether decision-makers remain at the company and in role',
      'Re-verify existing business email addresses, identifying deliverable, risky, and invalid addresses',
      'Clean dataset delivered alongside an exception log detailing every field added, updated, or unresolvable',
    ],
    steps: [
      'Agree on a safe transfer method and review your existing schema.',
      'Set matching, overwrite, and duplicate-handling rules.',
      'Review changes and import the cleaned file directly into your workflow.',
    ],
    boundary: 'We cannot promise every missing field can be recovered. Do not upload confidential databases through online forms; arrange a secure transfer after scoping.',
    question: 'Is this the same as building a new prospect list?',
    answer: 'No. Enrichment improves records you supply. If new accounts or decision-makers need to be discovered, prospect research is the appropriate starting point.',
  },
  {
    slug: 'email-infrastructure',
    title: 'Email Infrastructure Setup',
    category: 'One-Time Setup & Technical Foundation',
    pending: false,
    metaTitle: 'Cold Email Infrastructure Setup & DNS | Islah Web Service',
    metaDescription: 'Configure client-owned outbound sending domains with SPF, DKIM, DMARC, MX records, and safe mailbox warmup guidelines for reliable inbox deliverability.',
    summary: 'Configure client-controlled outbound sending domains, DNS authentication, and mailbox warmup.',
    headline: 'Cold Email Infrastructure Setup & Domain Authentication',
    intro: 'Dedicated domains, authentication, and mailbox ownership deserve deliberate technical review. We configure client-controlled sending environments with strict compliance and deliverability controls before you launch outreach.',
    deliverables: [
      'Secondary sending domains registered and configured to isolate outbound volume from primary corporate mail',
      'Full implementation of SPF, DKIM, DMARC, and MX records verified against DNS propagation standards',
      'Dedicated Google Workspace or Microsoft 365 outbound mailboxes created under your direct administrative ownership',
      'Structured warmup schedules and sending-volume ramp parameters based on infrastructure maturity',
      'Complete documentation of accounts, DNS records, deliverability baselines, and ongoing monitoring procedures',
    ],
    steps: [
      'Map the domains and sending infrastructure you control.',
      'Configure authentication records and verify DNS propagation.',
      'Review deliverability readiness and gradual ramp schedule before sending.',
    ],
    boundary: 'All sending infrastructure remains under client ownership and control. Authentication is a prerequisite for deliverability, but does not guarantee inbox placement.',
    question: 'Do you need our primary corporate domain passwords?',
    answer: 'No. Never submit primary domain credentials. Outreach should always use dedicated secondary domains configured specifically for outbound messaging.',
  },
  {
    slug: 'cold-email-marketing',
    title: 'Cold Email Strategy & Copywriting',
    category: 'Campaign Strategy & Messaging',
    pending: false,
    metaTitle: 'B2B Cold Email Copywriting & Strategy | Islah Web Service',
    metaDescription: 'Develop research-backed, multi-touch cold email sequences, objection handling templates, and compliance workflows tailored to your target audience.',
    summary: 'Develop relevant, multi-touch email sequences tailored to your target audience and value proposition.',
    headline: 'B2B Cold Email Strategy & Sequence Copywriting',
    intro: 'Effective outbound connects a defined audience with a compelling, specific message. We write client-approved email sequences that respect recipient context and present a clear next step.',
    deliverables: [
      'Target audience segments mapped to specific commercial pain points, value propositions, and proof assets',
      'Tailored, conversational multi-step email sequences, including problem hooks, case evidence, and low-friction CTAs',
      'Contextual follow-up messages addressing different prospect priorities, plus clean closure messages',
      'Pre-drafted, client-approved responses for common objections, timing questions, and referral requests',
      'Documented opt-out phrasing, unsubscribe handling workflows, and suppression list integration',
    ],
    steps: [
      'Discuss your offer, value drivers, and target audience context.',
      'Write tailored email sequences and review with your team.',
      'Approve final copy and suppression rules before any campaign launches.',
    ],
    boundary: 'All copy is submitted for explicit client review and sign-off. We never publish or send unapproved messaging, nor do we guarantee reply rates.',
    question: 'Who writes and approves the email copy?',
    answer: 'We develop the sequences based on your offer and target audience, but no message is sent without your explicit written approval.',
  },
  {
    slug: 'campaign-management',
    title: 'Ongoing Campaign Management',
    category: 'Recurring Operational Service',
    pending: false,
    metaTitle: 'B2B Cold Email Campaign Management | Islah Web Service',
    metaDescription: 'Operational execution for B2B cold email: scheduled sending within safe limits, inbox deliverability monitoring, reply triage, and sales routing.',
    summary: 'Manage daily outbound operations: gradual sending, reply classification, and performance reporting.',
    headline: 'Cold Email Campaign Execution & Deliverability Operations',
    intro: 'A successful cold email campaign needs consistent operational attention. We manage scheduled sending within deliverability limits, monitor inbox reputation, classify prospect replies, and route interested leads to your sales team.',
    deliverables: [
      'Managed campaign distribution adhering to strict daily volume limits and sending window rules across inboxes',
      'Continuous tracking of bounce rates, DNS authentication stability, and mailbox reputation indicators',
      'Filtering out-of-office notices, bounces, and automated responses from human prospect communications',
      'Interested replies and exploratory enquiries routed promptly to nominated sales owners with full account history',
      'Transparent reporting on sends, bounces, response classifications, and monthly strategic targeting iterations',
    ],
    steps: [
      'Confirm approved audience batches, email copy, and sending limits.',
      'Execute campaigns with daily deliverability and response monitoring.',
      'Route interested leads with context and report weekly metrics.',
    ],
    boundary: 'Campaign management availability and scope are confirmed through written agreement. We report observable campaign activity, not speculative revenue attribution.',
    question: 'Who handles positive responses and sales conversations?',
    answer: 'We filter out auto-replies, classify responses, and immediately route positive replies with full account context to your nominated sales representative.',
  },
  {
    slug: 'appointment-setting',
    title: 'Appointment Coordination',
    category: 'Optional Managed Capability',
    pending: false,
    metaTitle: 'B2B Appointment Setting & Scheduling | Islah Web Service',
    metaDescription: 'Coordinate calendar discovery calls with interested prospects who satisfy your agreed qualification criteria. Full pre-meeting briefings for your sales team.',
    summary: 'Coordinate calendar scheduling for qualified prospects meeting documented criteria.',
    headline: 'B2B Appointment Setting & Qualified Sales Scheduling',
    intro: 'A calendar booking is only valuable when the prospect fits your sales requirements. We provide qualified appointment coordination governed by strictly agreed qualification and exclusion rules.',
    deliverables: [
      'Explicit criteria defining eligible prospect company size, decision-maker seniority, and stated interest',
      'Professional, responsive calendar coordination and invitation management with interested, qualified prospects',
      'Detailed briefing delivered prior to each call, including communication history, company context, and confirmed criteria',
      'Active follow-up for meeting confirmations, calendar changes, and rescheduling coordination for missed calls',
      'Objective reporting distinguishing scheduled, held, and disqualified conversations to inform campaign targeting',
    ],
    steps: [
      'Define qualification criteria, attendee requirements, and exclusions.',
      'Coordinate scheduling with interested prospects who meet criteria.',
      'Deliver calendar invitation with full communication history to your team.',
    ],
    boundary: 'Appointment coordination is an optional addition to ongoing management, subject to explicit qualification rules. Meeting attendance, qualification, and sales outcomes are never guaranteed.',
    question: 'Are booked meetings included in standard research or setup?',
    answer: 'No. Standalone research and setup do not include meeting booking. Appointment coordination is an optional managed capability with explicit qualification rules.',
  },
];

export const industries: IndustryItem[] = [
  {
    slug: 'saas',
    title: 'SaaS & Technology',
    metaTitle: 'SaaS B2B Lead Generation & Prospecting | Islah Web Service',
    metaDescription: 'Account research and outbound campaign strategy for B2B SaaS and technology companies. Target revenue, RevOps, and engineering decision-makers.',
    headline: 'B2B Lead Generation & Account Research for SaaS & Technology',
    summary: 'Segment companies by business model, tech stack, maturity, and evaluation functions.',
    signals: ['Company category and target geography', 'Relevant operational or technical roles', 'Publicly observable technology information, where available'],
    context: 'A broad technology label can hide very different markets. Separate your ideal customer definition from assumptions about tools, budgets, or readiness to switch.',
    brief: 'Describe your product use case, the company types it fits, and the roles involved in evaluating it.',
  },
  {
    slug: 'msp',
    title: 'Managed Service Providers',
    metaTitle: 'MSP Lead Generation & IT Account Mapping | Islah Web Service',
    metaDescription: 'Territory-based account mapping and outbound email campaigns for Managed Service Providers (MSPs). Target regional business owners and IT leaders.',
    headline: 'MSP Lead Generation & Territory Account Mapping for IT Providers',
    summary: 'Find organisations within your geographic and operational support boundaries.',
    signals: ['Service-area and location requirements', 'Company size and sector criteria', 'IT leadership or operational contact roles'],
    context: 'Local coverage and service fit matter as much as company size. Research can document observable characteristics, but cannot establish dissatisfaction with an incumbent provider.',
    brief: 'Share your service area, supported business types, and any sectors or account types you exclude.',
  },
  {
    slug: 'recruitment',
    title: 'Recruitment & Staffing',
    metaTitle: 'Recruitment Agency Lead Generation | Islah Web Service',
    metaDescription: 'Employer client research and outbound campaigns for recruitment agencies. Target hiring decision-makers, HR leaders, and corporate department heads.',
    headline: 'B2B Client Acquisition & Lead Generation for Recruitment Agencies',
    summary: 'Organise employer client acquisition around sectors, hiring volumes, and HR leadership.',
    signals: ['Employer sector and location', 'Public hiring activity when included in the brief', 'Talent, HR and department leadership roles'],
    context: 'An advertised role is a research signal, not proof that a company wants agency support. Keep employer prospecting distinct from candidate sourcing and sensitive applicant data.',
    brief: 'Tell us your recruiting specialism, employer geography, and the decision-maker functions you need.',
  },
  {
    slug: 'professional-services',
    title: 'Professional Services',
    metaTitle: 'Professional Services Lead Generation | Islah Web Service',
    metaDescription: 'Account research and outbound messaging for consulting, legal, and financial advisory practices. Target C-suite executives and functional directors.',
    headline: 'B2B Lead Generation & Account Research for Professional Services',
    summary: 'Research organisations that fit your advisory, legal, accounting, or consulting brief.',
    signals: ['Business type and operating market', 'Relevant leadership and functional roles', 'Company characteristics tied to your service criteria'],
    context: 'Consulting, accounting, and specialist advisory firms have different account needs. A carefully scoped brief is more useful than treating every business owner as the same prospect.',
    brief: 'Explain the service you provide, your preferred client profile, and which business functions typically engage you.',
  },
  {
    slug: 'real-estate',
    title: 'Commercial Real Estate',
    metaTitle: 'Commercial Real Estate Lead Generation | Islah Web Service',
    metaDescription: 'Target commercial property operators, asset managers, developers, and CRE investors by asset class, serviceable geography, and portfolio criteria.',
    headline: 'Commercial Real Estate Prospect Research & B2B Lead Generation',
    summary: 'Target commercial property operators, asset managers, investors, and developers.',
    signals: ['Property-business category and geography', 'Public company and portfolio characteristics', 'Relevant acquisition, operations or management roles'],
    context: 'Property records can mix commercial companies and private individuals. This journey focuses on commercial B2B research with a clearly agreed scope, not private homeowner targeting.',
    brief: 'Specify the commercial property categories, markets, and business roles relevant to your offer.',
  },
];

export const homeFaqs = [
  {
    question: 'How do I choose between One-Time Setup, Ongoing Management, and Prospect Research?',
    answer: 'Choose One-Time Setup if you have an internal sales team and want a complete outbound system configured and handed over. Choose Ongoing Management if you want Islah to handle research, campaign execution, and reporting on a recurring monthly basis. Choose Prospect Research if your team already manages outreach and only needs verified prospect data.',
  },
  {
    question: 'How do you price your engagements?',
    answer: 'We operate three transparent commercial models: One-Time Fixed Project for setups, Monthly Managed Service for recurring campaigns, and Scope-based Research for standalone datasets. Pricing is determined after discovery based on market complexity, research volume, and technical requirements.',
  },
  {
    question: 'Can you guarantee reply rates, booked meetings, or sales revenue?',
    answer: 'No. We strictly adhere to evidence-based sales standards. Prospect targeting, email deliverability, reply rates, meetings, and revenue are distinct outcomes influenced by offer, market conditions, and client follow-up. We never make speculative performance guarantees.',
  },
  {
    question: 'How do I submit an enquiry or project brief?',
    answer: 'Contact our team directly at hello@islahwebservice.com with your project brief, preferred engagement model (One-Time Setup, Ongoing Management, or Prospect Research), target market, and timeline. We will review feasibility and arrange a discovery conversation.',
  },
];

export const enquiryPages = [
  {
    slug: 'contact',
    kind: 'contact',
    metaTitle: 'Contact Us | B2B Lead Generation | Islah Web Service',
    title: 'Contact Us About B2B Lead Generation & Outbound Systems',
    description: 'Share whether you need One-Time Outbound Setup, Ongoing Campaign Management, or custom B2B Prospect Research. We respond within one business day.',
    tips: ['Your business model and offer', 'Target markets and geographies', 'Preferred engagement model (Setup, Management, or Data)'],
  },
  {
    slug: 'request-sample',
    kind: 'research',
    metaTitle: 'Request a B2B Prospect Research Sample | Islah Web Service',
    title: 'Request a B2B Prospect Research Sample Built to Your Criteria',
    description: 'Share the companies, markets, roles, fields, and exclusions that matter. The sample is designed to test your brief before committing to a larger project.',
    tips: ['Target geography and company types', 'Decision-maker titles and departments', 'Required fields, exclusions, and CRM format'],
  },
  {
    slug: 'free-consultation',
    kind: 'consultation',
    metaTitle: 'B2B Outbound Lead Gen Consultation | Islah Web Service',
    title: 'Book a Consultation for B2B Outbound Lead Generation',
    description: 'Request a consultation about One-Time Outbound Setup, Ongoing Campaign Management, or custom prospect research. We review feasibility and commercial fit.',
    tips: ['Your current outbound approach', 'Target audience and customer criteria', 'Internal resources for sales follow-up'],
  },
] as const;
