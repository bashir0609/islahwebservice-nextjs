export interface ServiceDetail {
  audience: string;
  problemTitle: string;
  problems: string[];
  scopeIntro: string;
  briefTitle: string;
  briefText: string;
  deliverableTitles: string[];
  benefits: string[];
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
    audience: 'For founders, sales teams and agencies that need new target accounts or decision-makers, but do not want a generic database assembled around vague filters.',
    problemTitle: 'Turn a broad market into a researchable sales brief.',
    problems: ['Your market definition is too broad to guide useful account research.', 'Salespeople spend prospecting time checking basic company and role information.', 'Purchased lists ignore your exclusions, required fields and actual route to market.'],
    scopeIntro: 'The brief defines what qualifies for research, which roles matter, what fields are required and what must be excluded before volume is discussed.',
    briefTitle: 'Define the accounts before researching the people.', briefText: 'Share your target geography, company profile, role functions, required fields and exclusions.',
    deliverableTitles: ['Criteria-matched accounts', 'Relevant business contacts', 'Documented handoff'],
    benefits: ['A repeatable account definition your team can review.', 'Less sales time spent on first-pass company and role research.', 'CRM-ready records with source notes and unresolved fields visible.'],
    clientInput: 'You provide the offer, target market, company criteria, relevant role functions, exclusions and intended use. Islah turns that into a sample and documented research workflow.',
    stepTitles: ['Define the brief', 'Review a sample', 'Receive the dataset'], visualSteps: ['Target criteria agreed', 'Accounts and roles researched', 'Records reviewed and formatted'],
    useCases: [{title:'New-market research',text:'Map eligible accounts in a defined UK, US or European segment before your team begins outreach.'},{title:'Specialist account lists',text:'Build a focused dataset for a technical, advisory or high-consideration B2B offer.'},{title:'Decision-maker mapping',text:'Research relevant functions and available business-contact fields within agreed accounts.'}],
    faqs: [{question:'What should a research brief include?',answer:'Start with geography, company type, size, target role functions, required fields and exclusions. Explain the intended use so the handoff can be structured appropriately.'},{question:'Do criteria-matched records indicate buying intent?',answer:'No. Research can establish fit against observable criteria, not budget, need or readiness to buy.'},{question:'Can you verify every business email?',answer:'No. Business emails can be verified where suitable data is available. Missing or uncertain fields remain identified rather than guessed.'}],
    ctaTitle: 'See how your criteria translate into a prospect sample.', ctaText: 'Share a focused brief and review the structure before discussing a larger research project.',
    relatedSlugs: ['contact-enrichment', 'cold-email-marketing', 'campaign-management']
  },
  'contact-enrichment': {
    audience: 'For teams that already have account or contact records but cannot rely on them for segmentation, CRM workflows or targeted outreach.',
    problemTitle: 'Improve the database you already own.',
    problems: ['Important CRM fields are incomplete or formatted inconsistently.', 'Roles, employers and company details may have changed since collection.', 'Duplicate and unmatched records weaken segmentation and reporting.'],
    scopeIntro: 'Enrichment begins with your existing schema and agreed field rules. It does not silently replace your records or promise that every gap can be filled.',
    briefTitle: 'Start with fields, matching rules and safe transfer.', briefText: 'Identify the records you hold, the gaps that matter and how updates or conflicts should be handled.',
    deliverableTitles: ['Researched gaps', 'Consistent records', 'Transparent exceptions'],
    benefits: ['More useful records without discarding the database you have built.', 'Explicit overwrite, matching and duplicate-handling rules.', 'A reviewable file showing additions, changes and unresolved fields.'],
    clientInput: 'You provide a field inventory and representative sample—not a confidential database through the enquiry form. Transfer, access and retention must be agreed separately.',
    stepTitles: ['Assess the schema', 'Agree update rules', 'Review the enriched file'], visualSteps: ['Fields and matching rules mapped', 'Supplied records enriched', 'Changes and exceptions documented'],
    useCases: [{title:'CRM preparation',text:'Improve completeness before segmentation, routing or a controlled campaign.'},{title:'Migration cleanup',text:'Standardise formats and identify duplicates before records move into a new system.'},{title:'Field completion',text:'Research agreed company, role or business-contact fields across an agreed dataset.'}],
    faqs: [{question:'Is enrichment the same as prospect research?',answer:'No. Enrichment improves records you provide. Prospect research discovers new accounts or contacts.'},{question:'Should I upload my database through the form?',answer:'No. Use the form to describe the dataset only. Any file transfer requires a separately arranged secure method.'},{question:'Will every missing field be completed?',answer:'No. Availability varies. Unresolved information remains visible rather than being inferred or fabricated.'}],
    ctaTitle: 'Make your existing records easier to trust and use.', ctaText: 'Describe the dataset, missing fields and workflow problem. We can then define a safe, reviewable enrichment scope.',
    relatedSlugs: ['b2b-prospect-research', 'cold-email-marketing', 'campaign-management']
  },
  'cold-email-marketing': {
    audience: 'For B2B teams exploring managed support because audience research, messaging, campaign ownership and reply handoff are currently disconnected.',
    problemTitle: 'Build a campaign plan before considering delivery.',
    problems: ['Audience criteria and campaign messaging are developed in isolation.', 'Generic copy does not connect the offer to a specific recipient context.', 'Audience review, suppression and reply ownership are not documented.'],
    scopeIntro: 'A managed engagement can connect audience preparation, message review, operating controls and handoff. Current availability depends on business, legal and capacity review.',
    briefTitle: 'Connect audience, offer and operating responsibility.', briefText: 'Bring your offer, target segment, existing systems, constraints and internal owners to a scoping discussion.',
    deliverableTitles: ['Audience plan', 'Messaging review', 'Operating scope'], benefits: ['One reviewable plan connecting audience, message and handoff.', 'Clear client review before any campaign begins.', 'Reporting definitions tied to observable activity rather than revenue promises.'],
    clientInput: 'You provide a confirmed offer, sender identity, target-market rationale, legal review where required, suppression data and accountable campaign and reply owners.',
    stepTitles: ['Scope the campaign', 'Review controls', 'Confirm or stop'], visualSteps: ['Audience and offer reviewed', 'Copy and controls documented', 'Written scope confirmed'],
    useCases: [{title:'Founder-led outbound',text:'Explore structured support around a specific offer while retaining clear founder or sales-team ownership.'},{title:'Segment testing',text:'Plan a controlled audience and message review without treating early activity as proven demand.'},{title:'Research-to-campaign handoff',text:'Connect an agreed prospect dataset to a documented outreach workflow.'}],
    faqs: [{question:'Can a campaign launch from this website?',answer:'No. The page supports scoping only. No sending platform or live campaign is connected.'},{question:'Are replies or meetings guaranteed?',answer:'No. Delivery, replies, meetings and revenue are separate outcomes and are not guaranteed.'},{question:'Is managed cold email currently available?',answer:'Current availability and responsibilities are confirmed through consultation and documented before work begins.'}],
    ctaTitle: 'Discuss whether a managed campaign scope is appropriate.', ctaText: 'A consultation reviews fit, responsibilities and delivery requirements. It does not start sending or reserve delivery capacity.',
    relatedSlugs: ['b2b-prospect-research', 'email-infrastructure', 'campaign-management']
  },
  'email-infrastructure': {
    audience: 'For teams considering cold email that need to clarify domain, mailbox, authentication, access and monitoring responsibilities before launch planning.',
    problemTitle: 'Resolve technical ownership before campaign work begins.', problems: ['Domain and mailbox responsibilities are unclear.', 'SPF, DKIM and DMARC records have not been reviewed in context.', 'Access, monitoring and incident ownership are undefined.'],
    scopeIntro: 'The consultation scope is a readiness and responsibility review. It does not promise inbox placement or permit changes without explicit authorization.',
    briefTitle: 'Map the systems and owners first.', briefText: 'Document domains, mailboxes, authentication state, authorized administrators and the intended operating model.',
    deliverableTitles: ['Ownership checklist', 'Authentication review', 'Handover controls'], benefits: ['A documented readiness checklist before sending is considered.', 'Clear responsibility for authentication and authorized changes.', 'Safer access and handoff boundaries without deliverability guarantees.'],
    clientInput: 'You provide domain ownership context and current configuration details through an agreed secure process. Never submit passwords or secret keys through a website form.',
    stepTitles: ['Map the setup', 'Review authorization', 'Document readiness'], visualSteps: ['Domains and owners inventoried', 'Authentication checks scoped', 'Monitoring responsibilities assigned'],
    useCases: [{title:'Existing setup review',text:'Assess ownership and configuration questions before expanding campaign activity.'},{title:'Dedicated-domain planning',text:'Document campaign-domain responsibilities subject to client authorization.'},{title:'Operational handover',text:'Clarify monitoring, access revocation and incident escalation between teams.'}],
    faqs: [{question:'Should I send credentials with my enquiry?',answer:'No. Never submit passwords, API keys or DNS credentials. Any access requires a separately arranged least-privilege process.'},{question:'Does authentication guarantee inbox placement?',answer:'No. Authentication is important, but deliverability depends on multiple technical and operational factors.'},{question:'Will Islah change DNS records automatically?',answer:'No. No domains, mailboxes or DNS records are changed through this website.'}],
    ctaTitle: 'Review responsibilities before changing infrastructure.', ctaText: 'Use a consultation to discuss the existing setup and required checks without sharing credentials or authorizing changes.',
    relatedSlugs: ['cold-email-marketing', 'campaign-management', 'appointment-setting']
  },
  'campaign-management': {
    audience: 'For B2B teams exploring operational support because campaign changes, replies and reporting lack accountable owners.',
    problemTitle: 'Give campaign decisions a documented owner.', problems: ['Audience, copy and launch changes happen without clear ownership.', 'Replies, objections and suppression requests are handled inconsistently.', 'Activity reporting is confused with pipeline or revenue attribution.'],
    scopeIntro: 'A managed scope can define review cycles, stop conditions, escalation routes and reporting boundaries before implementation.',
    briefTitle: 'Turn campaign activity into an accountable workflow.', briefText: 'Define objectives, owners, review stages, suppression rules and the measures that can be reported accurately.',
    deliverableTitles: ['Review cadence', 'Reply responsibilities', 'Reporting definitions'], benefits: ['Defined review cycles and stop conditions.', 'Clear suppression, reply and escalation ownership.', 'Reporting based on agreed observable measures.'],
    clientInput: 'You provide the confirmed offer, audience rationale, brand constraints, suppression requirements, internal owners and timely decisions at each review gate.',
    stepTitles: ['Clarify objectives', 'Assign controls', 'Confirm scope'], visualSteps: ['Campaign inputs reviewed', 'Owners and stop rules assigned', 'Scope status documented'],
    useCases: [{title:'Cross-team coordination',text:'Document responsibilities across client, research and managed campaign teams.'},{title:'Controlled message review',text:'Manage confirmed changes without losing version history or decision ownership.'},{title:'Operational reporting',text:'Separate sending activity, replies and commercial outcomes in the reporting plan.'}],
    faqs: [{question:'Is a live campaign platform connected?',answer:'No sending workflow is connected to this website. Current campaign-management availability is confirmed through consultation.'},{question:'Does reporting prove revenue attribution?',answer:'Not by default. Activity, replies, opportunities and revenue are distinct measures with different evidence requirements.'},{question:'Who handles replies?',answer:'Reply ownership and escalation must be agreed during scoping. It should never be assumed.'}],
    ctaTitle: 'Define the operating model before managing a campaign.', ctaText: 'Discuss owners, review gates and reporting needs. Requesting a consultation does not start a campaign.',
    relatedSlugs: ['cold-email-marketing', 'email-infrastructure', 'appointment-setting']
  },
  'appointment-setting': {
    audience: 'For teams considering a structured handoff after positive replies and needing to define relevance, qualification and calendar ownership first.',
    problemTitle: 'Define a useful conversation before counting meetings.', problems: ['A calendar booking is treated as qualification by default.', 'Acceptance and exclusion criteria are not agreed before reply handling.', 'Sales teams receive meetings without enough account or conversation context.'],
    scopeIntro: 'This service discussion concerns human review and handoff rules. It does not promise meeting volume, attendance, qualification or sales outcomes.',
    briefTitle: 'Agree what deserves a calendar handoff.', briefText: 'Define relevant roles, conversation context, exclusions, sales-team availability and the information needed before scheduling.',
    deliverableTitles: ['Acceptance criteria', 'Reply escalation', 'Contextual handoff'], benefits: ['A shared definition of a relevant conversation.', 'Qualification and exclusion rules recorded before handling replies.', 'A context-rich handoff to the responsible sales owner.'],
    clientInput: 'You provide qualification boundaries, calendar availability, routing owners, required context and a process for accepting or rejecting potential conversations.',
    stepTitles: ['Define relevance', 'Agree routing', 'Confirm capability'], visualSteps: ['Conversation criteria recorded', 'Human review path defined', 'Sales-owner handoff documented'],
    useCases: [{title:'Founder handoff',text:'Route an eligible conversation to a founder with the account and reply context attached.'},{title:'Sales-team routing',text:'Assign conversations by territory, account ownership or agreed service line.'},{title:'Calendar coordination',text:'Coordinate a proposed time only after human review against agreed criteria.'}],
    faqs: [{question:'Are meetings included with prospect research?',answer:'No. Research delivers data. Any future reply or booking support requires a separate confirmed scope.'},{question:'Are booked meetings guaranteed?',answer:'No. Meeting volume, attendance, qualification and sales outcomes are not guaranteed.'},{question:'Can this site reserve a calendar slot?',answer:'No. The consultation form requests a review only and does not book a meeting automatically.'}],
    ctaTitle: 'Define the handoff before discussing appointment support.', ctaText: 'A consultation can clarify acceptance criteria and responsibilities. Current availability is confirmed through consultation.',
    relatedSlugs: ['campaign-management', 'cold-email-marketing', 'b2b-prospect-research']
  }
};
