export interface ServiceDetail {
  audience: string;
  availability: string;
  engagementLink: { href: string; label: string };
  industryLink: { href: string; label: string };
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
    audience: 'For sales leaders, founders, and growth teams who need accurate, criteria-matched B2B accounts and relevant decision-maker records—without relying on bloated, generic database exports.',
    availability: 'Choose Research & Enrichment when your team runs outreach and needs a new account list. Scope a project or recurring dataset by market, required fields and research volume; setup and managed sending are separate engagements.',
    engagementLink: { href: '/pricing', label: 'Compare Research & Enrichment pricing models' },
    industryLink: { href: '/industries/saas', label: 'SaaS & Technology targeting criteria' },
    problemTitle: 'Turn a broad market definition into a scoped prospect research brief.',
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
      'Relevant Roles & Available Business Contacts',
      'Structured CRM-Ready Data Handoff',
    ],
    benefits: [
      'Company and role research against agreed criteria, with source notes and verification metadata.',
      'Zero invented data: unavailable or unverified fields are transparently flagged.',
      'Formatted for direct import into your CRM (HubSpot, Salesforce, Pipedrive, or CSV/Sheets).',
      'A sample review before full-batch research so your team can check fit and field coverage.',
    ],
    exclusions: [
      'Consumer marketing or residential personal contact data',
      'Speculative intent data or unverified claims of buying urgency',
      'Automated email campaign execution or sequence delivery (covered under outreach services)',
    ],
    clientInput: 'You provide your ICP criteria, target geographies, target roles, preferred CRM fields, and customer suppression lists. Islah delivers a test sample for review before full batch execution.',
    stepTitles: ['Define the Brief & Exclusions', 'Review a Test Sample', 'Receive Data & Verification Notes'],
    visualSteps: ['Criteria & Exclusions Mapped', 'Accounts & Roles Researched', 'Verified & Formatted for CRM'],
    useCases: [
      { title: 'New market or territory expansion', text: 'Map eligible accounts and decision-maker densities across the UK, US, or European regions before launching sales operations.' },
      { title: 'Specialist vertical account lists', text: 'Build focused account datasets for niche technical, industrial, or regulated B2B solutions.' },
      { title: 'Multi-threaded decision-maker mapping', text: 'Identify multiple relevant functional leaders (e.g., both technical and commercial stakeholders) within high-value target accounts.' },
    ],
    faqs: [
      { question: 'What should our prospect research brief include?', answer: 'Include target geography, company categories, employee size ranges, target job titles or functional roles, required fields (e.g. direct email, LinkedIn, phone), and explicit exclusions.' },
      { question: 'Does a criteria-matched prospect indicate active buying intent?', answer: 'No. Research confirms demographic and technographic fit against observable criteria. Buying intent, budget, and readiness must be confirmed during sales discovery.' },
      { question: 'Can you verify every business email address?', answer: 'Business emails are verified where available, with verification status and unresolved fields identified in the handoff. Verification does not prove permission to contact someone or guarantee delivery.' },
    ],
    ctaTitle: 'Review a prospect sample against your criteria before scaling research.',
    ctaText: 'Share your target criteria, exclusions, and preferred fields. We will prepare an initial sample for your review.',
    relatedSlugs: ['contact-enrichment', 'cold-email-marketing', 'campaign-management'],
  },

  'contact-enrichment': {
    audience: 'For revenue teams with existing customer, inbound, or legacy CRM records that suffer from missing fields, outdated titles, inconsistent formatting, or duplicate entries.',
    availability: 'Choose Research & Enrichment when you already hold the records. The quote depends on dataset size, fields to research, matching rules and cleanup requirements; net-new account discovery is scoped separately.',
    engagementLink: { href: '/pricing', label: 'Compare scoped data-service pricing' },
    industryLink: { href: '/industries/recruitment', label: 'Recruitment & Staffing employer-data criteria' },
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
      'Duplicate Resolution & Field Standardisation',
      'Updated File & Unresolved Field Notes',
    ],
    benefits: [
      'Retain supplied records while reviewing missing or outdated company and contact fields.',
      'Identify email verification status and unresolved records before your team decides how to use them.',
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
      { question: 'Is database enrichment the same as prospect research?', answer: 'No. Enrichment improves records you already own. Prospect research discovers net-new accounts and relevant contacts against agreed criteria, not assumed buying intent.' },
      { question: 'Will every missing field be successfully completed?', answer: 'Data availability depends on public and commercial records. Fields that cannot be verified are clearly flagged rather than fabricated.' },
      { question: 'How is data transferred securely?', answer: 'Agree a secure transfer method during scoping, before sharing records. Start with a field inventory and dataset description; do not submit confidential databases or credentials through online forms.' },
    ],
    ctaTitle: 'Make your existing records easier to trust and use.',
    ctaText: 'Describe your dataset size, missing fields, and workflow challenges to receive an enrichment scope proposal.',
    relatedSlugs: ['b2b-prospect-research', 'cold-email-marketing', 'campaign-management'],
  },

  'email-infrastructure': {
    audience: 'For B2B companies planning cold email outreach who need their technical sending environment properly architected, authenticated, and warmed before launching campaigns.',
    availability: 'Included in One-Time Outbound Setup for a documented handover to your team. Continued maintenance belongs in Ongoing Campaign Management. Domain, mailbox and campaign-tool subscriptions are identified separately.',
    engagementLink: { href: '/one-time-setup', label: 'Review One-Time Outbound Setup scope and ownership' },
    industryLink: { href: '/industries/msp', label: 'MSP service-area and audience planning' },
    problemTitle: 'Resolve technical sender ownership before launching campaigns.',
    problems: [
      'Sending outbound campaigns from primary corporate domains puts everyday business email delivery at severe risk.',
      'Missing or misconfigured authentication records can affect message acceptance and require review before sending.',
      'Sending volume without an agreed ramp plan makes it harder to assess delivery problems and decide when to pause.',
    ],
    scopeIntro: 'We configure agreed client-controlled domains and mailboxes, review SPF, DKIM, DMARC and MX records, and document readiness checks and a gradual sending plan for handover.',
    briefTitle: 'Engineer dedicated sending infrastructure under full client ownership.',
    briefText: 'Inventory target sending volumes, domain registrar access, mailbox provider choices, and technical administrative owners.',
    deliverableTitles: [
      'Client-Controlled Domain & Mailbox Architecture',
      'Full DNS Authentication (SPF, DKIM, DMARC, MX)',
      'Gradual Ramp Plan & Monitoring Guidelines',
    ],
    benefits: [
      'Dedicated outbound domains and a documented account inventory, without a promise of immunity from reputation risks.',
      'Authentication configuration and DNS checks recorded for your technical owner to review.',
      'A gradual ramp plan based on infrastructure readiness, rather than a guaranteed warmup deadline.',
      'Client retains 100% legal and technical ownership of all configured domains and inboxes.',
    ],
    exclusions: [
      'Guaranteeing 100% inbox placement (deliverability depends on continuous sender behavior and recipient filters)',
      'Sharing client administrative passwords via insecure channels',
      'Hosting infrastructure on Islah-owned accounts without client ownership',
    ],
    clientInput: 'Nominate a technical owner, authorize agreed domains and mailbox seats, and arrange delegated access without sharing passwords through forms. Your team owns subscriptions and post-handover operation unless ongoing maintenance is contracted.',
    stepTitles: ['Confirm Accounts & Technical Owner', 'Configure & Check Authentication', 'Review Readiness & Handover Plan'],
    visualSteps: ['Secondary Domains Secured', 'SPF / DKIM / DMARC Validated', 'Warmup Scheduled & Monitored'],
    useCases: [
      { title: 'New outbound sales launch', text: 'Agree the domain and mailbox requirements for a new outbound programme before approving campaign launch.' },
      { title: 'Reputation recovery', text: 'Review existing domain use, authentication and sending practices before agreeing changes; a new domain does not guarantee reputation recovery.' },
      { title: 'Multi-seat outbound scaling', text: 'Plan additional mailboxes around agreed sending limits, account ownership and monitoring responsibilities.' },
    ],
    faqs: [
      { question: 'Why can we not send cold emails from our main company domain?', answer: 'Cold email carries higher spam complaint risks. Reputation problems can also affect everyday business messages. Dedicated sending domains separate operations but do not eliminate deliverability risk.' },
      { question: 'Does DNS authentication guarantee inbox placement?', answer: 'No. Authentication supports sender validation, but inbox placement also depends on copy quality, list accuracy, volume, and recipient engagement.' },
      { question: 'Who owns the sending domains and mailboxes?', answer: 'You do. All domains, DNS records, and email accounts are registered under your business name and transferred fully to your control.' },
    ],
    ctaTitle: 'Engineer your outbound infrastructure safely.',
    ctaText: 'Discuss domain choices, mailbox requirements, and warmup timelines with our technical team.',
    relatedSlugs: ['cold-email-marketing', 'campaign-management', 'appointment-setting'],
  },

  'cold-email-marketing': {
    audience: 'For B2B companies looking for targeted, multi-touch email sequences that initiate business conversations without relying on spammy gimmicks or deceptive templates.',
    availability: 'Choose One-Time Outbound Setup for approved sequences handed over with your system, or Ongoing Campaign Management for agreed campaign execution and iteration. Research & Enrichment alone does not include copywriting or sending.',
    engagementLink: { href: '/one-time-setup', label: 'Review messaging within One-Time Outbound Setup' },
    industryLink: { href: '/industries/professional-services', label: 'Professional Services audience and offer criteria' },
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
      'Sequences, Follow-Ups & Objection Responses',
      'Suppression Rules & Opt-Out Workflow',
    ],
    benefits: [
      'Human-sounding, concise copy that respects executive reading time.',
      'Multiple angle testing (problem hook, case evidence, peer reference, breakup message).',
      'Explicit client review and sign-off on every sequence before sending.',
      'Documented opt-out and suppression workflow; your team reviews legal eligibility for the audience and geography before launch.',
    ],
    exclusions: [
      'Aggressive clickbait, misleading subject lines, or deceptive "FWD:" / "RE:" headers',
      'Sending unapproved message copy without explicit client written authorization',
      'Guaranteeing specific reply percentages or closed revenue figures',
    ],
    clientInput: 'Provide your offer, target segments, usable case-study evidence and current suppression lists. Nominate a copy approver and sales-response owner; confirm claims and legal eligibility before approving final sequences and sending.',
    stepTitles: ['Agree Audience, Offer & Evidence', 'Draft & Review Message Variants', 'Approve Copy & Suppression Rules'],
    visualSteps: ['Pain Points & Proof Mapped', 'Multi-Step Sequence Authored', 'Client Approved & Loaded'],
    useCases: [
      { title: 'Founder-led sales transition', text: 'Turn founder sales conversations into structured, repeatable email sequence frameworks.' },
      { title: 'Product or service launches', text: 'Engage target market segments with tailored problem-hook sequences for a newly introduced B2B solution.' },
      { title: 'Account re-engagement', text: 'Re-open conversations with previously unresponsive accounts using fresh insight-led messaging.' },
    ],
    faqs: [
      { question: 'Who approves the email copy before sending?', answer: 'You do. Every sequence, follow-up, and objection response is submitted for your team’s explicit written review and approval prior to campaign loading.' },
      { question: 'How many touches are in a typical cold email sequence?', answer: 'Sequence length, follow-up spacing and message variants are agreed around your audience and offer. The handoff identifies approved messages, next-step requests and stop or suppression rules rather than promising a universal cadence.' },
      { question: 'Does copywriting include ongoing sending and reply handling?', answer: 'Not by itself. One-Time Outbound Setup hands approved copy and the configured system to your team. Sending, reply classification and ongoing testing require an agreed Ongoing Campaign Management scope.' },
    ],
    ctaTitle: 'Scope email sequences around your audience, offer and evidence.',
    ctaText: 'Share your value proposition and target audience to discuss sequence strategy and copywriting scope.',
    relatedSlugs: ['b2b-prospect-research', 'email-infrastructure', 'campaign-management'],
  },

  'campaign-management': {
    audience: 'For B2B companies wanting dedicated operational execution of their outbound email campaigns—including gradual scheduling, deliverability checks, reply handling, and reporting.',
    availability: 'Choose Ongoing Campaign Management when you need recurring research, approved sending, reply monitoring and reporting. The monthly fee reflects research volume, campaign capacity and reply-handling scope; third-party costs are identified separately.',
    engagementLink: { href: '/ongoing-management', label: 'Review Ongoing Campaign Management inclusions and terms' },
    industryLink: { href: '/industries/recruitment', label: 'Recruitment & Staffing employer-side outreach criteria' },
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
      'Interested replies routed with account context to the nominated sales owner under agreed handling rules.',
      'Continuous deliverability monitoring with proactive warmup adjustments.',
      'Weekly operational updates and monthly reviews of campaign activity, reply patterns and proposed changes.',
    ],
    exclusions: [
      'Closing sales or negotiating commercial contracts (handled by your internal sales team)',
      'Unilateral audience or copy changes without prior client authorization',
      'Guaranteeing specific sales conversion rates or closed revenue totals',
    ],
    clientInput: 'Nominate a sales owner for interested replies, approve audiences and copy, maintain customer exclusions, and provide feedback on follow-up outcomes. Your team handles discovery, proposals and closing; appointment coordination and CRM updates require explicit scope.',
    stepTitles: ['Approve Audience, Copy & Limits', 'Monitor Sending & Classify Replies', 'Route Interest & Review Results'],
    visualSteps: ['Approved Batches Scheduled', 'Replies Monitored & Classified', 'Interested Replies Routed to Sales'],
    useCases: [
      { title: 'Campaign operations for a lean sales team', text: 'Assign sending, reply classification and reporting to an agreed operational owner while your team retains sales conversations and closing.' },
      { title: 'Recurring audience and message testing', text: 'Review prospect additions, message variants and reply patterns each month without treating activity as guaranteed pipeline.' },
      { title: 'Territory and sector testing', text: 'Systematically test new geographic territories or vertical markets with dedicated weekly campaign cohorts.' },
    ],
    faqs: [
      { question: 'Who handles positive prospect responses?', answer: 'We monitor outreach inboxes, filter out out-of-office messages and unhelpful automated replies, and route interested responses with context to your designated sales contact under the agreed workflow. Reply interest is not proof of budget or sales qualification.' },
      { question: 'What metrics are included in weekly reporting?', answer: 'Agree reporting definitions at kickoff. Weekly updates cover available sending and bounce data, reply classifications, interested-lead handoffs and operational issues; monthly reviews use those observations and your sales feedback to propose changes.' },
      { question: 'How is the service paused or modified?', answer: 'Ongoing management terms are set out in writing with clear notice periods and flexibility to adjust monthly research volumes or target segments.' },
    ],
    ctaTitle: 'Put your outbound email campaigns on an accountable operational rhythm.',
    ctaText: 'Discuss campaign capacity, sending volume, and reply routing workflows with our management team.',
    relatedSlugs: ['cold-email-marketing', 'email-infrastructure', 'appointment-setting'],
  },

  'appointment-setting': {
    audience: 'For sales teams and founders who want interested prospect replies coordinated directly into scheduled calendar discovery calls against documented qualification rules.',
    availability: 'An optional addition to Ongoing Campaign Management, not an included outcome of setup or Research & Enrichment. Agree qualification rules, scheduling responsibilities and commercial terms before coordination starts; no meeting volume is guaranteed.',
    engagementLink: { href: '/ongoing-management', label: 'Review appointment coordination as a managed option' },
    industryLink: { href: '/industries/professional-services', label: 'Professional Services prospect-fit criteria' },
    problemTitle: 'Define what makes a conversation qualified before counting calendar bookings.',
    problems: [
      'Sales reps spend valuable time back-and-forth email scheduling rather than preparing for prospect meetings.',
      'Outbound agencies book unqualified meetings with junior staff or companies that do not meet core ICP criteria.',
      'No-show rates are high when meetings are booked without sufficient prospect context and clear meeting agendas.',
    ],
    scopeIntro: 'We coordinate calendar invitations for prospects who have shown positive interest AND satisfy your documented qualification parameters.',
    briefTitle: 'Establish strict qualification gates and calendar coordination rules.',
    briefText: 'Document company size limits, target role seniority, prospect-stated requirements, calendar availability, and disqualification criteria.',
    deliverableTitles: [
      'Documented Qualification & Exclusion Matrix',
      'Prospect Scheduling Coordination & Calendar Booking',
      'Pre-Meeting Briefing Notes with Full Communication Context',
    ],
    benefits: [
      'Documented fit and exclusion checks before scheduling, with unknowns kept visible for sales discovery.',
      'Frictionless calendar scheduling handled professionally via calendar integration or email coordination.',
      'Comprehensive meeting briefing notes delivered prior to the scheduled call.',
      'Agreed definitions distinguish scheduled, held and missed meetings; fees and scope are set in writing, not assumed to be pay-per-meeting.',
    ],
    exclusions: [
      'Conducting sales discovery or demo presentations (conducted by client team)',
      'Booking meetings with unqualified prospects to hit arbitrary quotas',
      'Guaranteeing prospect meeting attendance or subsequent sales contract closure',
    ],
    clientInput: 'Provide attendee requirements, qualification and exclusion rules, calendar availability and meeting links. Nominate an owner for exceptions and rescheduling; your team conducts discovery and confirms attendance and outcomes for reporting.',
    stepTitles: ['Agree Fit Checks & Attendee Rules', 'Coordinate Interested Prospects', 'Hand Off Invitation & Reply Context'],
    visualSteps: ['Prospect Interest Qualified', 'Meeting Scheduled on Calendar', 'Briefing & Context Delivered'],
    useCases: [
      { title: 'Founder calendar management', text: 'Free founders from scheduling logistics, routing only qualified high-value prospective clients to their calendar.' },
      { title: 'Territory-based sales handoff', text: 'Route scheduling requests from interested prospects to the appropriate account executive with the agreed fit checks and reply history.' },
      { title: 'Partner / Practice Head scheduling', text: 'Coordinate exploratory advisory consultations with C-level corporate executives.' },
    ],
    faqs: [
      { question: 'How do you define a qualified meeting?', answer: 'Agree company fit, relevant attendee roles, exclusions and explicit prospect interest before coordination. Record confirmed facts and unknowns in the briefing; a booking does not establish budget, purchasing authority or a guaranteed sales opportunity.' },
      { question: 'What happens if a prospect does not attend the scheduled meeting?', answer: 'We attempt re-scheduling coordination. If the meeting does not take place, it does not count as a held meeting in campaign reporting.' },
      { question: 'Is appointment coordination available without campaign management?', answer: 'No. Appointment coordination is an optional extension of our Ongoing Campaign Management service, as it requires active campaign and reply handling.' },
    ],
    ctaTitle: 'Convert positive interest into qualified calendar conversations.',
    ctaText: 'Define your qualification criteria, sales team availability, and calendar workflow during a consultation.',
    relatedSlugs: ['campaign-management', 'cold-email-marketing', 'b2b-prospect-research'],
  },
};
