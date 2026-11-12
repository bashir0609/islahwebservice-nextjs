// Commercial engagement model data for One-Time Setup and Ongoing Management offer pages

export interface OfferDetail {
  slug: string;
  title: string;
  eyebrow: string;
  headline: string;
  description: string;
  bestFor: string[];
  scope: string[];
  deliverables: string[];
  clientInputs: string[];
  included: string[];
  optional: string[];
  ownership: string[];
  commercialModel: string;
  commercialDetail: string[];
  process: { title: string; text: string }[];
  limitations: string[];
  industries: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
  primaryCta: string;
  primaryHref: string;
  secondaryCta: string;
  secondaryHref: string;
  metaTitle: string;
  metaDescription: string;
}

export const offers: Record<string, OfferDetail> = {
  'one-time-setup': {
    slug: 'one-time-setup',
    eyebrow: 'ONE-TIME ENGAGEMENT',
    title: 'One-Time Outbound Setup',
    headline: 'Your B2B Outbound Email System, Built and Ready for Your Team',
    description:
      'We research your market, define your ideal customers, configure your outbound email infrastructure, prepare targeted prospect data and messaging, test the system, and hand it over to your team.',
    bestFor: [
      'Businesses with an internal sales or marketing team that will manage campaigns independently.',
      'Founders who want to run outreach themselves but need a structured starting point.',
      'Agencies requiring a documented outbound system for their own business development.',
      'B2B teams replacing manual, ad-hoc prospecting with a reviewable, criteria-led workflow.',
    ],
    scope: [
      'Discovery and targeting workshop to understand your offer, market and commercial objectives.',
      'Ideal Customer Profile definition with firmographic and decision-maker criteria.',
      'Market and audience segmentation by company type, geography and role function.',
      'Initial prospect research scoped to agreed markets and exclusions.',
      'Business contact enrichment and verification where available.',
      'Client-controlled sending domains and dedicated outreach inboxes.',
      'SPF, DKIM and DMARC configuration review and setup.',
      'Campaign platform configuration to agreed specifications.',
      'Sending limits, gradual warmup plan and deliverability readiness checks.',
      'Email sequence writing and client review.',
      'Follow-up sequences and objection-handling templates.',
      'Exclusion lists, suppression settings and opt-out workflow.',
      'Basic reply classification and interested-lead handoff workflow.',
      'CRM integration or structured export configuration where contracted.',
      'Campaign readiness review and QA checks.',
      'Handover documentation covering systems, access, accounts and operating instructions.',
      'Agreed knowledge transfer and operational orientation.',
    ],
    deliverables: [
      'Approved ICP document with targeting and exclusion criteria.',
      'Initial scoped prospect list in agreed format.',
      'Configured sending infrastructure with authentication records.',
      'Approved email and follow-up sequences.',
      'Campaign platform configured and ready for first send.',
      'Setup and QA report documenting completed checks.',
      'Handover documentation and agreed access transfer.',
    ],
    clientInputs: [
      'A clear description of your offer and what problem it solves.',
      'Your target geography, company type, size preferences and exclusions.',
      'Decision-maker functions most relevant to the buying decision.',
      'Access to or authorization to configure agreed domains and mailboxes.',
      'Timely reviews at each stage gate — brief, sample, copy and infrastructure.',
      'Internal owner for replies, conversations and ongoing campaign management after handover.',
      'Existing suppression lists or customer exclusion data.',
    ],
    included: [
      'ICP definition and targeting criteria document.',
      'Initial research project scoped at setup.',
      'Infrastructure and authentication configuration.',
      'Email copy and sequence writing.',
      'Campaign platform setup.',
      'Handover documentation.',
    ],
    optional: [
      'Additional research projects beyond the initial setup scope.',
      'Ongoing campaign management after handover.',
      'CRM integration requiring bespoke development.',
      'Appointment coordination or reply management.',
    ],
    ownership: [
      'You retain ownership of configured domains, mailboxes and campaign accounts.',
      'Prospect data and ICP documentation are delivered to you at handover.',
      'Email sequences and campaign materials become yours at project completion.',
      'Islah does not retain access to your infrastructure after handover unless separately agreed.',
      'Ongoing subscriptions for domains, inboxes and campaign tools are your responsibility.',
    ],
    commercialModel: 'ONE-TIME FIXED PROJECT',
    commercialDetail: [
      'A single engagement priced around the agreed setup scope.',
      'Priced after a discovery conversation defining markets, infrastructure needs and copy requirements.',
      'Third-party domain registrar, mailbox and campaign platform costs are identified separately.',
      'Setup does not include indefinite ongoing management unless separately agreed.',
      'Delivery timeline depends on complexity, approval turnaround and infrastructure readiness.',
    ],
    process: [
      { title: 'Discovery and Feasibility', text: 'Understand your offer, target market, deal economics, available infrastructure and outreach feasibility before confirming the setup scope.' },
      { title: 'ICP and Data Qualification', text: 'Agree company filters, decision-maker functions, research fields, exclusions and sample quality before building the full prospect list.' },
      { title: 'Infrastructure and Campaign Setup', text: 'Configure domains, authentication, mailboxes, campaign platform, sending limits and CRM handoff to agreed specifications.' },
      { title: 'Quality Review and Approval', text: 'Review prospect data, infrastructure readiness, email copy, sending limits and compliance checks. No sending begins without your explicit approval.' },
      { title: 'Handover', text: 'Deliver all agreed assets, documentation and access. Your team takes ownership of the operational system and manages campaigns independently from this point.' },
    ],
    limitations: [
      'Technical setup does not guarantee inbox placement, positive replies or sales.',
      'Email verification does not establish legal permission to contact a business address.',
      'Domain and mailbox warmup takes time; a fully ramped sending programme requires gradual ramp following handover.',
      'Third-party software, domains and mailbox subscriptions are excluded unless incorporated into the agreed contract.',
      'Actual delivery timeline depends on brief complexity, approval turnaround and infrastructure readiness.',
      'Legal responsibility for outreach compliance rests with the client as sender.',
    ],
    industries: [
      { title: 'SaaS & Technology', text: 'Configure research around product fit, company maturity, geography and the revenue, operations or technical roles involved in evaluating your software.' },
      { title: 'IT Services & MSPs', text: 'Define serviceable geographies, eligible company profiles and relevant IT or business leadership contacts within your support boundary.' },
      { title: 'Recruitment & Staffing', text: 'Set up employer-side prospecting with desk-aligned criteria, relevant hiring functions and suppression of active clients.' },
      { title: 'Professional Services', text: 'Build an outbound system around a defined advisory offer, serviceable company profile and the functions that own the buying decision.' },
      { title: 'Commercial Real Estate', text: 'Configure research around commercial property operators, relevant acquisitions or portfolio contacts, and agreed geography.' },
    ],
    faqs: [
      { question: 'Does setup include indefinite campaign management?', answer: 'No. One-Time Setup delivers a configured, documented and handed-over system. Ongoing management is a separately agreed engagement.' },
      { question: 'Who manages the campaigns after handover?', answer: 'Your internal team or a separately nominated owner. The handover documentation covers operating instructions and access.' },
      { question: 'What if our infrastructure does not exist yet?', answer: 'Domain acquisition, mailbox setup and campaign platform selection are part of the setup scope. These carry separate third-party costs.' },
      { question: 'Is inbox placement or reply volume guaranteed?', answer: 'No. Setup creates the conditions for a correctly configured outbound programme. Delivery, replies, meetings and revenue depend on many factors and are not guaranteed.' },
      { question: 'How long does setup take?', answer: 'Timing depends on the scope, complexity of the brief, approval turnaround and infrastructure readiness. This is discussed and agreed at the discovery stage.' },
    ],
    primaryCta: 'Request One-Time Setup',
    primaryHref: '#enquiry',
    secondaryCta: 'Compare Engagement Models',
    secondaryHref: '/pricing',
    metaTitle: 'One-Time B2B Outbound Email System Setup & Handover',
    metaDescription: 'Get your B2B outbound email system built and handed over: ICP definition, prospect research, sending infrastructure, email sequences and campaign configuration.',
  },

  'ongoing-management': {
    slug: 'ongoing-management',
    eyebrow: 'RECURRING ENGAGEMENT',
    title: 'Ongoing Campaign Management',
    headline: 'Managed B2B Email Outreach, From Prospect Research to Qualified Conversations',
    description:
      'We continuously identify suitable prospects, maintain the agreed outreach infrastructure, prepare and manage approved email campaigns, monitor replies, improve targeting and provide performance reporting.',
    bestFor: [
      'B2B companies without a dedicated outbound sales or prospecting team.',
      'Sales teams wanting to outsource prospect research, campaign operations and reply monitoring.',
      'Founders or revenue leaders who need recurring pipeline development without building an internal function.',
      'Agencies requiring managed business-development outreach for their own growth.',
    ],
    scope: [
      'Initial business and sales discovery to understand your offer, market and commercial objectives.',
      'ICP development and ongoing refinement as targeting learns from campaign data.',
      'Recurring market and account research against agreed criteria.',
      'Decision-maker identification and business contact enrichment.',
      'Segmentation, contact-list refresh and suppression management.',
      'Email infrastructure setup or ongoing maintenance.',
      'Approved outreach campaign creation with client review before sending.',
      'Personalization using verified, agreed contact context — no fabricated details.',
      'Follow-up sequence management and reply monitoring.',
      'Gradual sending ramp and deliverability monitoring.',
      'Reply classification and interested-lead handover to your team.',
      'Objection and response workflow where explicitly agreed.',
      'Appointment coordination where contracted and subject to agreed qualification rules.',
      'CRM updates or structured exports where contracted.',
      'Campaign experiments and iterative audience or message improvement.',
      'Weekly operational updates and monthly performance and strategy review.',
    ],
    deliverables: [
      'Monthly researched and verified prospect additions.',
      'Client-approved email sequences and campaign content.',
      'Ongoing suppression management and list hygiene.',
      'Interested-lead handover with account context.',
      'Weekly operational report and monthly performance review.',
      'Campaign experiment results and recommended next steps.',
    ],
    clientInputs: [
      'A clear offer, target market rationale and commercial context updated when it changes.',
      'Timely reviews and approvals at each campaign stage — audience, copy and before sending.',
      'Defined internal owner for receiving interested leads and managing sales conversations.',
      'Existing customer and suppression data maintained up to date.',
      'Access to agreed domains, mailboxes and campaign tools.',
      'Transparent feedback on lead quality and commercial outcomes to inform targeting improvement.',
    ],
    included: [
      'Recurring prospect research within the agreed monthly scope.',
      'Campaign management including audience, copy, sending and deliverability monitoring.',
      'Reply monitoring and interested-lead classification.',
      'Weekly updates and monthly performance review.',
      'Ongoing ICP refinement based on campaign learning.',
    ],
    optional: [
      'Appointment coordination or calendar management, subject to agreed qualification rules.',
      'CRM integration requiring bespoke development.',
      'Channels beyond the agreed outreach scope.',
      'Dedicated content or design production.',
    ],
    ownership: [
      'Sending domains, mailboxes and campaign accounts remain in your control.',
      'Prospect data researched and prepared under this engagement belongs to you.',
      'On termination, agreed assets, data and access are transferred to you.',
      'Islah does not retain campaign or contact data after the engagement ends and handover is complete.',
    ],
    commercialModel: 'MONTHLY MANAGED SERVICE',
    commercialDetail: [
      'Recurring monthly fee for agreed research, campaign and reporting scope.',
      'Pricing reflects target market complexity, research volume, campaign capacity and reply-handling responsibilities.',
      'Third-party domain, inbox and campaign platform costs are identified separately.',
      'Scope changes, pause terms, cancellation notice and handover procedure are set out in writing before the engagement begins.',
      'No meetings, pipeline or revenue volume is guaranteed or used as a pricing basis.',
    ],
    process: [
      { title: 'Discovery and Feasibility', text: 'Review your offer, target market, deal economics, existing assets and what a managed engagement can and cannot guarantee before confirming scope.' },
      { title: 'ICP and Data Qualification', text: 'Agree targeting criteria, exclusions, research fields, sample standards and the monthly research volume appropriate to your market.' },
      { title: 'Infrastructure and Campaign Setup', text: 'Configure or validate infrastructure, authentication, platform, suppression and CRM handoff before the first campaign begins.' },
      { title: 'Review and Approval', text: 'Client approval of research, copy and campaign configuration before every send. No campaign launches without your explicit sign-off.' },
      { title: 'Managed Launch and Execution', text: 'Begin outreach within agreed sending limits. Monitor deliverability, classify replies and hand interested leads to your team with context.' },
      { title: 'Continuous Optimisation', text: 'Refine targeting, audience segments, message variants and sending cadence each month based on performance data and your commercial feedback.' },
    ],
    limitations: [
      'No meetings, reply rate, qualified pipeline or revenue volume is guaranteed.',
      'Appointment coordination requires a separately agreed and documented qualification process.',
      'Campaign launch requires legal eligibility review by the client for the target geography and audience.',
      'Deliverability cannot be guaranteed regardless of authentication or list quality.',
      'Reply handling scope is defined in writing; unagreed escalations are not assumed.',
    ],
    industries: [
      { title: 'SaaS & Technology', text: 'Recurring research into product-fit accounts, relevant evaluation roles and campaign management aligned to a defined sales cycle and geography.' },
      { title: 'IT Services & MSPs', text: 'Monthly prospect additions within a serviceable territory, maintenance of suppression lists, and campaign management for a defined service line.' },
      { title: 'Recruitment & Staffing', text: 'Ongoing employer-side prospecting, campaign management and interested-lead handoff for recruitment business development across a defined desk.' },
      { title: 'Professional Services', text: 'Recurring research and outreach for consultancies, advisories and agencies targeting a specific decision-maker function and commercial problem.' },
      { title: 'Commercial Real Estate', text: 'Managed prospecting and outreach to commercial property operators, asset managers and acquisition contacts in an agreed market.' },
    ],
    faqs: [
      { question: 'Is ongoing management currently available?', answer: 'Current availability, capacity and scope are confirmed through consultation before any commitment. This page explains the managed engagement model.' },
      { question: 'Who approves copy and audiences?', answer: 'You do. No campaign sends without your explicit approval of the audience and message.' },
      { question: 'Who handles interested replies?', answer: 'Reply ownership and escalation routes are agreed in writing during scoping. It is never assumed.' },
      { question: 'Is appointment setting included?', answer: 'Calendar coordination is an optional addition, subject to agreed qualification rules, documented separately.' },
      { question: 'How is the engagement paused or ended?', answer: 'Pause, change and cancellation terms are defined in the written agreement before the engagement begins. Data and assets are transferred at close.' },
      { question: 'Will you guarantee meetings or pipeline?', answer: 'No. Meeting volume, reply rate, qualified pipeline and revenue are not guaranteed.' },
    ],
    primaryCta: 'Discuss Ongoing Management',
    primaryHref: '#enquiry',
    secondaryCta: 'Compare Engagement Models',
    secondaryHref: '/pricing',
    metaTitle: 'Managed B2B Outbound Email Outreach Service',
    metaDescription: 'Managed B2B email outreach from prospect research to qualified conversations. Recurring research, campaign execution, reply monitoring and performance reporting.',
  },
};
