export interface ServiceDetail {
  audience: string;
  availability: string;
  problemTitle: string;
  problems: string[];
  scopeIntro: string;
  briefTitle: string;
  briefText: string;
  deliverableTitles: string[];
  benefits: string[];
  exclusions: string[];
  clientInput: string;
  stepTitles: string[];
  visualSteps: string[];
  useCases: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
  ctaTitle: string;
  ctaText: string;
  relatedSlugs: string[];
}

export const serviceDetails: Record<string, ServiceDetail> = {
  'b2b-prospect-research': {
    audience: 'For sales leaders, founders, and growth teams who need accurate, criteria-matched B2B accounts and verified decision-makers—without relying on bloated, generic database exports.',
    availability: 'Available as a standalone one-time project, a recurring monthly data feed, or as the foundational research layer of our One-Time Setup and Ongoing Management engagements.',
    problemTitle: 'Turn a broad market definition into a researchable, high-converting brief.',
    problems: [
      'Purchased contact databases are cluttered with stale records, generic inboxes, and contacts who left the company months ago.',
      'Sales reps waste hours manually digging through LinkedIn and search engines rather than holding qualified conversations.',
      'Targeting criteria fail to account for negative exclusions, specific company maturity stages, or specialized tech stack signals.',
    ],
    scopeIntro: 'We research target accounts and relevant decision-maker functions against strict firmographic, technographic, and geographic parameters agreed prior to data collection.',
    briefTitle: 'Define the target accounts before researching individual contacts.',
    briefText: 'Specify target geography, industry classifications, headcount bands, observable tech signals, required contact fields, and exclusions.',
    deliverableTitles: [
      'Criteria-Matched Account Records',
      'Verified Decision-Maker Contacts',
      'Structured CRM-Ready Data Handoff',
    ],
    benefits: [
      'Every record verified against public and commercial data sources before delivery.',
      'Zero invented data: unavailable or unverified fields are transparently flagged.',
      'Formatted for direct import into your CRM (HubSpot, Salesforce, Pipedrive, or CSV/Sheets).',
      'Significant reduction in sales team prospecting overhead.',
    ],
    exclusions: [
      'Consumer marketing or residential personal contact data',
      'Speculative intent data or unverified claims of buying urgency',
      'Automated email campaign execution or sequence delivery (covered under outreach services)',
    ],
    clientInput: 'You provide your ICP criteria, target geographies, target roles, preferred CRM fields, and customer suppression lists. Islah delivers a test sample for review before full batch execution.',
    stepTitles: ['Define the Brief & Exclusions', 'Review a Test Sample', 'Receive the Verified Dataset'],
    visualSteps: ['Criteria & Exclusions Mapped', 'Accounts & Roles Researched', 'Verified & Formatted for CRM'],
    useCases: [
      { title: 'New market or territory expansion', text: 'Map eligible accounts and decision-maker densities across the UK, US, or European regions before launching sales operations.' },
      { title: 'Specialist vertical account lists', text: 'Build focused account datasets for niche technical, industrial, or regulated B2B solutions.' },
      { title: 'Multi-threaded decision-maker mapping', text: 'Identify multiple relevant functional leaders (e.g., both technical and commercial stakeholders) within high-value target accounts.' },
    ],
    faqs: [
      { question: 'What should our prospect research brief include?', answer: 'Include target geography, company categories, employee size ranges, target job titles or functional roles, required fields (e.g. direct email, LinkedIn, phone), and explicit exclusions.' },
      { question: 'Does a criteria-matched prospect indicate active buying intent?', answer: 'No. Research confirms demographic and technographic fit against observable criteria. Buying intent, budget, and readiness must be confirmed during sales discovery.' },
      { question: 'Can you verify every business email address?', answer: 'We verify corporate email addresses using multi-step validation protocols. Where an email cannot be verified with confidence, the field is left transparently flagged rather than guessed.' },
    ],
    ctaTitle: 'See how your criteria translate into a verified prospect sample.',
    ctaText: 'Share your target criteria, exclusions, and preferred fields. We will prepare an initial sample for your review.',
    relatedSlugs: ['contact-enrichment', 'cold-email-marketing', 'campaign-management'],
  },

  'contact-enrichment': {
    audience: 'For revenue teams with existing customer, inbound, or legacy CRM records that suffer from missing fields, outdated titles, inconsistent formatting, or duplicate entries.',
    availability: 'Available as a one-time database hygiene and enrichment project, or as an ongoing quarterly maintenance service.',
    problemTitle: 'Improve the value and utility of the database you already own.',
    problems: [
      'Valuable past leads cannot be segmented or contacted because key fields (industry, size, direct email) are missing.',
      'Contacts have moved companies or changed roles, causing high email bounce rates and wasted sales follow-up.',
      'Duplicate and inconsistent company entries distort pipeline reporting and lead routing.',
    ],
    scopeIntro: 'We audit your supplied dataset, apply agreed deduplication and validation rules, research missing commercial fields, and return a clean, enriched file.',
    briefTitle: 'Start with field schema, matching rules, and secure data transfer.',
    briefText: 'Identify which records you hold, which fields need updating or completing, and the matching rules for resolving conflicts.',
    deliverableTitles: [
      'Missing Field Research & Completion',
      'Contact Status & Employment Verification',
      'Cleaned, Deduplicated CRM Export',
    ],
    benefits: [
      'Reactivate dormant leads without discarding your accumulated historical records.',
      'Dramatically improve deliverability by purging stale and invalid email addresses.',
      'Consistent firmographic labelling for more accurate sales segmentation.',
      'Transparent exception reporting detailing every field update.',
    ],
    exclusions: [
      'Generating net-new accounts outside the records provided in the supplied dataset',
      'Direct CRM integration without explicit contractual authorization',
      'Receiving sensitive personal data, passwords, or confidential customer financial records',
    ],
    clientInput: 'Provide a field inventory, data dictionary, and representative sample via a secure transfer method. Never submit confidential databases through web forms.',
    stepTitles: ['Assess Schema & Missing Fields', 'Agree Conflict & Matching Rules', 'Receive Enriched Dataset'],
    visualSteps: ['Field Gaps Analyzed', 'Records Validated & Enriched', 'Clean File & Audit Log Delivered'],
    useCases: [
      { title: 'CRM migration cleanup', text: 'Cleanse and standardize historical records before migrating to HubSpot, Salesforce, or another CRM platform.' },
      { title: 'Inbound lead enrichment', text: 'Complete missing company size, industry, and decision-maker fields on short web-form submissions.' },
      { title: 'Annual database hygiene', text: 'Re-verify employment status and direct contact info across your existing account universe.' },
    ],
    faqs: [
      { question: 'Is database enrichment the same as prospect research?', answer: 'No. Enrichment improves records you already own. Prospect research identifies and qualifies net-new accounts and contacts.' },
      { question: 'Will every missing field be successfully completed?', answer: 'Data availability depends on public and commercial records. Fields that cannot be verified are clearly flagged rather than fabricated.' },
      { question: 'How is data transferred securely?', answer: 'We establish an encrypted file transfer protocol or direct secure workspace. Confidential databases must never be emailed or submitted via online forms.' },
    ],
    ctaTitle: 'Make your existing records easier to trust and use.',
    ctaText: 'Describe your dataset size, missing fields, and workflow challenges to receive an enrichment scope proposal.',
    relatedSlugs: ['b2b-prospect-research', 'cold-email-marketing', 'campaign-management'],
  },

  'email-infrastructure': {
    audience: 'For B2B companies planning cold email outreach who need their technical sending environment properly architected, authenticated, and warmed before launching campaigns.',
    availability: 'Core component of the One-Time Outbound Setup engagement, and continuously maintained under Ongoing Campaign Management.',
    problemTitle: 'Resolve technical sender ownership before launching campaigns.',
    problems: [
      'Sending outbound campaigns from primary corporate domains puts everyday business email delivery at severe risk.',
      'Missing or misconfigured SPF, DKIM, or DMARC records cause emails to be rejected by Google and Microsoft spam filters.',
      'Uncalibrated sending volume and aggressive sending ramps lead to immediate domain blacklisting.',
    ],
    scopeIntro: 'We configure secondary sending domains, set up dedicated Google Workspace or Microsoft 365 mailboxes, enforce strict DNS authentication, and establish safe gradual sending schedules.',
    briefTitle: 'Engineer dedicated sending infrastructure under full client ownership.',
    briefText: 'Inventory target sending volumes, domain registrar access, mailbox provider choices, and technical administrative owners.',
    deliverableTitles: [
      'Client-Controlled Domain & Mailbox Architecture',
      'Full DNS Authentication (SPF, DKIM, DMARC, MX)',
      'Automated Warmup & Gradual Ramp Protocol',
    ],
    benefits: [
      'Complete protection for your primary corporate website domain and daily business emails.',
      'Full compliance with Google Workspace and Yahoo sender guidelines (2024+ enforcement).',
      'Safe, automated warmup ramp schedules that build positive sender reputation over 2–4 weeks.',
      'Client retains 100% legal and technical ownership of all configured domains and inboxes.',
    ],
    exclusions: [
      'Guaranteeing 100% inbox placement (deliverability depends on continuous sender behavior and recipient filters)',
      'Sharing client administrative passwords via insecure channels',
      'Hosting infrastructure on Islah-owned accounts without client ownership',
    ],
    clientInput: 'Authorize or provision dedicated secondary domain names and email mailbox seats. Provide DNS registrar access via secure delegated administration.',
    stepTitles: ['Domain & Mailbox Provisioning', 'DNS Authentication Configuration', 'Warmup Activation & Verification'],
    visualSteps: ['Secondary Domains Secured', 'SPF / DKIM / DMARC Validated', 'Warmup Scheduled & Monitored'],
    useCases: [
      { title: 'New outbound sales launch', text: 'Set up a clean, isolated 2–4 domain sending infrastructure before hiring SDRs or launching outreach.' },
      { title: 'Reputation recovery', text: 'Transition outreach away from a damaged corporate domain to pristine, dedicated secondary sending domains.' },
      { title: 'Multi-seat outbound scaling', text: 'Scale from 1 to 5+ outbound sending mailboxes while maintaining strict per-mailbox sending limits.' },
    ],
    faqs: [
      { question: 'Why can we not send cold emails from our main company domain?', answer: 'Cold email carries higher spam complaint risks. If your primary domain receives spam flags, your everyday client proposals, invoices, and internal communications will land in spam folders.' },
      { question: 'Does DNS authentication guarantee inbox placement?', answer: 'No. Authentication (SPF, DKIM, DMARC) is mandatory for modern mailbox providers to accept mail, but inbox placement also depends on copy quality, list accuracy, volume, and recipient engagement.' },
      { question: 'Who owns the sending domains and mailboxes?', answer: 'You do. All domains, DNS records, and email accounts are registered under your business name and transferred fully to your control.' },
    ],
    ctaTitle: 'Engineer your outbound infrastructure safely.',
    ctaText: 'Discuss domain choices, mailbox requirements, and warmup timelines with our technical team.',
    relatedSlugs: ['cold-email-marketing', 'campaign-management', 'appointment-setting'],
  },

  'cold-email-marketing': {
    audience: 'For B2B companies looking for targeted, multi-touch email sequences that initiate business conversations without relying on spammy gimmicks or deceptive templates.',
    availability: 'Included in One-Time Outbound Setup and continuously refined under Ongoing Campaign Management.',
    problemTitle: 'Connect your audience, offer, and messaging into an approved outreach plan.',
    problems: [
      'Generic, templated cold emails get ignored or marked as spam because they fail to address the recipient’s specific business context.',
      'Single-touch emails underperform; effective outbound requires multi-step sequences with distinct conversational angles.',
      'Outreach lacks clear call-to-actions, resulting in vague responses that fail to convert into sales opportunities.',
    ],
    scopeIntro: 'We develop research-backed email sequences, follow-up messages, objection handling templates, and opt-out workflows tailored to your verified audience.',
    briefTitle: 'Craft value-led messages around verifiable recipient context.',
    briefText: 'Share your value proposition, customer pain points, case study evidence, objection patterns, and preferred sales conversation goals.',
    deliverableTitles: [
      'Audience Segmentation & Angle Matrix',
      'Multi-Touch Email Sequences & Follow-Ups',
      'Objection Responses & Suppression Protocols',
    ],
    benefits: [
      'Human-sounding, concise copy that respects executive reading time.',
      'Multiple angle testing (problem hook, case evidence, peer reference, breakup message).',
      'Explicit client review and sign-off on every sequence before sending.',
      'Full compliance with CAN-SPAM, PECR, and global commercial email regulations.',
    ],
    exclusions: [
      'Aggressive clickbait, misleading subject lines, or deceptive "FWD:" / "RE:" headers',
      'Sending unapproved message copy without explicit client written authorization',
      'Guaranteeing specific reply percentages or closed revenue figures',
    ],
    clientInput: 'Provide company background, customer case studies, commercial value drivers, and review feedback during the copywriting review stage.',
    stepTitles: ['Value Proposition & Angle Mapping', 'Drafting Sequences & Variations', 'Client Review & Sign-Off'],
    visualSteps: ['Pain Points & Proof Mapped', 'Multi-Step Sequence Authored', 'Client Approved & Loaded'],
    useCases: [
      { title: 'Founder-led sales transition', text: 'Turn founder sales conversations into structured, repeatable email sequence frameworks.' },
      { title: 'Product or service launches', text: 'Engage target market segments with tailored problem-hook sequences for a newly introduced B2B solution.' },
      { title: 'Account re-engagement', text: 'Re-open conversations with previously unresponsive accounts using fresh insight-led messaging.' },
    ],
    faqs: [
      { question: 'Who approves the email copy before sending?', answer: 'You do. Every sequence, follow-up, and objection response is submitted for your team’s explicit written review and approval prior to campaign loading.' },
      { question: 'How many touches are in a typical cold email sequence?', answer: 'A standard sequence typically consists of 3 to 4 thoughtfully spaced touches over 14–21 days, each offering a distinct angle or piece of value.' },
      { question: 'Do you use automated AI spam text generators?', answer: 'No. While we use data to research recipient context, all email copy is crafted and refined by human outbound specialists focusing on clarity, brevity, and business relevance.' },
    ],
    ctaTitle: 'Develop outreach copy your prospects will actually read.',
    ctaText: 'Share your value proposition and target audience to discuss sequence strategy and copywriting scope.',
    relatedSlugs: ['b2b-prospect-research', 'email-infrastructure', 'campaign-management'],
  },

  'campaign-management': {
    audience: 'For B2B companies wanting dedicated operational execution of their outbound email campaigns—including gradual scheduling, deliverability checks, reply handling, and reporting.',
    availability: 'Available as a recurring monthly managed service, subject to confirmed operational capacity and written agreement.',
    problemTitle: 'Give your outbound campaign decisions a dedicated, accountable operational owner.',
    problems: [
      'Campaigns stall because internal staff are too busy with existing client work to manage daily outbound operations.',
      'Positive prospect replies sit in inboxes for days, causing warm opportunities to go cold.',
      'Sending limits and deliverability metrics are not monitored, leading to undetected spam filter placement.',
    ],
    scopeIntro: 'We manage daily campaign operations: scheduled sending within safe limits, inbox deliverability monitoring, reply classification, positive lead routing, and weekly reporting.',
    briefTitle: 'Turn outbound into a reliable, consistent operational discipline.',
    briefText: 'Establish operational boundaries, daily sending volumes, reply classification rules, and sales team lead escalation paths.',
    deliverableTitles: [
      'Daily Sending Execution & Deliverability Monitoring',
      'Reply Classification & Warm Lead Escalation',
      'Weekly Operational Reports & Monthly Strategy Reviews',
    ],
    benefits: [
      'Predictable, consistent outbound cadence without burdening internal team members.',
      'Immediate routing of positive replies with full prospect history attached.',
      'Continuous deliverability monitoring with proactive warmup adjustments.',
      'Actionable reporting focused on qualified conversations rather than vanity vanity metrics.',
    ],
    exclusions: [
      'Closing sales or negotiating commercial contracts (handled by your internal sales team)',
      'Unilateral audience or copy changes without prior client authorization',
      'Guaranteeing specific sales conversion rates or closed revenue totals',
    ],
    clientInput: 'Provide nominated sales reps for lead routing, timely feedback on lead quality, and participate in monthly strategic review calls.',
    stepTitles: ['Campaign Activation & Ramp Plan', 'Daily Operations & Lead Routing', 'Weekly Review & Iteration'],
    visualSteps: ['Batches Scheduled & Ramped', 'Replies Monitored & Classified', 'Qualified Leads Handed to Sales'],
    useCases: [
      { title: 'Outsourced outbound SDR function', text: 'Operate a complete top-of-funnel outbound motion without the overhead of hiring and managing internal SDRs.' },
      { title: 'Ongoing pipeline generation', text: 'Maintain a steady flow of qualified sales conversations for account executives and founders.' },
      { title: 'Territory and sector testing', text: 'Systematically test new geographic territories or vertical markets with dedicated weekly campaign cohorts.' },
    ],
    faqs: [
      { question: 'Who handles positive prospect responses?', answer: 'We monitor outreach inboxes, filter out out-of-office messages and unhelpful automated replies, and immediately forward qualified, interested responses to your designated sales contact.' },
      { question: 'What metrics are included in weekly reporting?', answer: 'Weekly reports include sending volume, bounce rate, open rate, positive response rate, total interested leads routed, and insights gained from prospect replies.' },
      { question: 'How is the service paused or modified?', answer: 'Ongoing management terms are set out in writing with clear notice periods and flexibility to adjust monthly research volumes or target segments.' },
    ],
    ctaTitle: 'Put your outbound email campaigns on an accountable operational rhythm.',
    ctaText: 'Discuss campaign capacity, sending volume, and reply routing workflows with our management team.',
    relatedSlugs: ['cold-email-marketing', 'email-infrastructure', 'appointment-setting'],
  },

  'appointment-setting': {
    audience: 'For sales teams and founders who want interested prospect replies coordinated directly into scheduled calendar discovery calls against documented qualification rules.',
    availability: 'Available as an optional managed addition to Ongoing Campaign Management, subject to explicit qualification criteria.',
    problemTitle: 'Define what makes a conversation qualified before counting calendar bookings.',
    problems: [
      'Sales reps spend valuable time back-and-forth email scheduling rather than preparing for prospect meetings.',
      'Outbound agencies book unqualified meetings with junior staff or companies that do not meet core ICP criteria.',
      'No-show rates are high when meetings are booked without sufficient prospect context and clear meeting agendas.',
    ],
    scopeIntro: 'We coordinate calendar invitations for prospects who have shown positive interest AND satisfy your documented qualification parameters.',
    briefTitle: 'Establish strict qualification gates and calendar coordination rules.',
    briefText: 'Document company size limits, target role seniority, required business need signals, calendar availability, and disqualification criteria.',
    deliverableTitles: [
      'Documented Qualification & Exclusion Matrix',
      'Prospect Scheduling Coordination & Calendar Booking',
      'Pre-Meeting Briefing Notes with Full Communication Context',
    ],
    benefits: [
      'Sales reps speak only with prospects who meet your agreed qualification standards.',
      'Frictionless calendar scheduling handled professionally via calendar integration or email coordination.',
      'Comprehensive meeting briefing notes delivered prior to the scheduled call.',
      'Zero payment for unqualified or out-of-scope bookings.',
    ],
    exclusions: [
      'Conducting sales discovery or demo presentations (conducted by client team)',
      'Booking meetings with unqualified prospects to hit arbitrary quotas',
      'Guaranteeing prospect meeting attendance or subsequent sales contract closure',
    ],
    clientInput: 'Provide sales team calendar availability, meeting link, documented qualification criteria, and post-meeting attendance confirmation.',
    stepTitles: ['Define Qualification Criteria', 'Manage Scheduling Dialogue', 'Deliver Calendar Briefing'],
    visualSteps: ['Prospect Interest Qualified', 'Meeting Scheduled on Calendar', 'Briefing & Context Delivered'],
    useCases: [
      { title: 'Founder calendar management', text: 'Free founders from scheduling logistics, routing only qualified high-value prospective clients to their calendar.' },
      { title: 'Account Executive pipeline loading', text: 'Feed seasoned sales closers with scheduled discovery calls directly within their target territory.' },
      { title: 'Partner / Practice Head scheduling', text: 'Coordinate exploratory advisory consultations with C-level corporate executives.' },
    ],
    faqs: [
      { question: 'How do you define a qualified meeting?', answer: 'A qualified meeting is scheduled with a decision-maker who meets your agreed target firmographic criteria, has verified business contact information, and has explicitly agreed to a meeting to discuss your offer.' },
      { question: 'What happens if a prospect does not attend the scheduled meeting?', answer: 'We attempt re-scheduling coordination. If the meeting does not take place, it does not count as a held meeting in campaign reporting.' },
      { question: 'Is appointment coordination available without campaign management?', answer: 'No. Appointment coordination is an optional extension of our Ongoing Campaign Management service, as it requires active campaign and reply handling.' },
    ],
    ctaTitle: 'Convert positive interest into qualified calendar conversations.',
    ctaText: 'Define your qualification criteria, sales team availability, and calendar workflow during a consultation.',
    relatedSlugs: ['campaign-management', 'cold-email-marketing', 'b2b-prospect-research'],
  },
};
