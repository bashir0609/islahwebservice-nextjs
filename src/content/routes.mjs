export const STATIC_PUBLIC_PATHS = Object.freeze([
  '/', '/about', '/appointment-setting', '/authors/bashir-ahmed', '/b2b-prospect-research', '/blog',
  '/campaign-management', '/cold-email-marketing', '/contact', '/contact-enrichment',
  '/email-infrastructure', '/free-consultation', '/industries', '/industries/msp',
  '/industries/professional-services', '/industries/real-estate', '/industries/recruitment',
  '/industries/saas', '/ongoing-management', '/one-time-setup', '/portfolio', '/pricing',
  '/privacy-policy', '/request-sample', '/services', '/terms',
]);

export const REVIEWED_REDIRECTS = Object.freeze([
  {source: '/feed.xml', destination: '/blog/rss.xml', status: 308},
  {source: '/feed', destination: '/blog/rss.xml', status: 308},
  {source: '/technical-seo', destination: '/b2b-prospect-research', status: 301},
  {source: '/why-us', destination: '/', status: 301},
  {source: '/b2b-lead-generation', destination: '/', status: 301},
  {source: '/decision-maker-research', destination: '/b2b-prospect-research', status: 301},
  {source: '/prospect-list-building', destination: '/b2b-prospect-research', status: 301},
  {source: '/services/verified-b2b-contact-lists', destination: '/b2b-prospect-research', status: 301},
  {source: '/services/lead-generation-analysis', destination: '/b2b-prospect-research', status: 301},
  {source: '/services/business-process-automation', destination: '/', status: 301},
]);
