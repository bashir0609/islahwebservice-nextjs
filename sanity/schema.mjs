import {DOCUMENT_TYPES, CLAIM_KINDS, publicationErrors, validTimestamp} from './policy.mjs';

const text = (name, extra = {}) => ({name, type: 'string', ...extra});
const required = rule => rule.required();
const timestamp = name => text(name, {description: 'Original lexical value; never inferred from filesystem mtime.', validation: rule => rule.custom(value => !value || validTimestamp(value) || 'Use a real ISO date or timestamp with timezone')});
const refs = (name, types) => ({name, type: 'array', of: [{type: 'reference', to: types.map(type => ({type}))}]});
const approval = {
  name: 'approval', type: 'object', fields: [
    text('state', {initialValue: 'pending', options: {list: ['pending', 'approved', 'rejected']}}),
    text('evidenceReference', {description: 'Non-sensitive evidence ticket/reference only. Do not paste evidence files, customer records or secrets.'}),
    text('reviewer'), timestamp('reviewedAt'),
    {name: 'bodyReviewed', type: 'boolean', initialValue: false, description: 'Owner reviewed prose, metadata and links for unsupported claims, numerical prices and sensitive information.'},
  ],
};
const seo = {
  name: 'seo', type: 'object', fields: [text('title'), {name: 'description', type: 'text'},
    {name: 'canonicalUrl', type: 'url'}, {name: 'noIndex', type: 'boolean', initialValue: true},
    {name: 'socialImage', type: 'imageSource'}],
};
const imageSource = {
  name: 'imageSource', type: 'object', fields: [
    text('source', {description: 'Existing local path or remote URL; preserved, not downloaded or uploaded.'}),
    {name: 'asset', type: 'image', options: {hotspot: true}}, text('alt'), text('caption'), text('attribution'),
    text('creditUrl'), text('license'),
  ],
};
const claim = {
  name: 'evidenceClaim', type: 'object', fields: [
    text('kind', {options: {list: CLAIM_KINDS}, validation: required}),
    {name: 'statement', type: 'text', validation: required}, {name: 'approval', type: 'approval'},
  ],
};
const migration = {
  name: 'migrationSource', type: 'object', fields: [
    text('sourcePath', {readOnly: true}), text('sha256', {readOnly: true}),
    text('sourceStatus', {readOnly: true}), text('sourceId', {readOnly: true}),
    timestamp('sourceDate'), timestamp('sourceCreatedAt'), timestamp('sourceUpdatedAt'), timestamp('sourcePublishedAt'),
    {name: 'frontmatter', type: 'text', readOnly: true, description: 'Exact original frontmatter; quarantined migration data, never public output.'},
    text('reconciliation', {initialValue: 'required', options: {list: ['required', 'verified']}}),
  ],
};
const common = () => [
  text('title', {validation: required}),
  {name: 'slug', type: 'slug', description: 'Preserve existing route slug; do not regenerate during migration.', validation: required},
  text('editorialStatus', {initialValue: 'draft', options: {list: ['draft', 'review', 'approved']}}),
  {name: 'markdown', type: 'text', description: 'Original Markdown. Not Portable Text; rendering/sanitization belongs to a future public adapter.'},
  {name: 'seo', type: 'seo'}, {name: 'image', type: 'imageSource'},
  {name: 'approval', type: 'approval'}, {name: 'claims', type: 'array', of: [{type: 'evidenceClaim'}]},
  {name: 'migration', type: 'migrationSource'},
];
const specifics = {
  page: [refs('services', ['service']), refs('faqs', ['faq'])],
  service: [{name: 'summary', type: 'text'}, refs('industries', ['industry']), refs('packages', ['package']), refs('faqs', ['faq'])],
  industry: [{name: 'summary', type: 'text'}, refs('services', ['service']), refs('caseStudies', ['caseStudy'])],
  blogPost: [text('author'), {name: 'excerpt', type: 'text'}, {name: 'tags', type: 'array', of: [{type: 'string'}]}, {name: 'readTime', type: 'number'}, timestamp('publishedAt'), timestamp('updatedAt')],
  caseStudy: [text('attribution'), {name: 'featured', type: 'boolean'}, {name: 'tags', type: 'array', of: [{type: 'string'}]}, refs('services', ['service']), refs('industries', ['industry'])],
  faq: [{name: 'question', type: 'text'}, {name: 'answer', type: 'text'}],
  testimonial: [{name: 'quote', type: 'text'}, text('attribution'), {name: 'consentConfirmed', type: 'boolean', initialValue: false}],
  package: [{name: 'summary', type: 'text'}, text('priceLabel', {initialValue: 'Request a quote', options: {list: ['Request a quote']}, validation: rule => rule.required().custom(value => value === 'Request a quote' || 'Numerical prices are prohibited')}), refs('services', ['service'])],
  navigation: [{name: 'items', type: 'array', of: [{type: 'object', name: 'navigationLink', fields: [text('label', {validation: required}), text('href', {description: 'Preserve relative internal URLs including fragments.'}), {name: 'target', type: 'reference', to: ['page', 'service', 'industry', 'blogPost', 'caseStudy'].map(type => ({type}))}]}]}],
  siteSettings: [text('siteName'), {name: 'siteUrl', type: 'url'}, {name: 'defaultSeo', type: 'seo'}, refs('navigation', ['navigation'])],
};

export const schemaTypes = [approval, seo, imageSource, claim, migration, ...DOCUMENT_TYPES.map(name => ({
  name, type: 'document', title: name.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase()),
  initialValue: {editorialStatus: 'draft'},
  fields: [...common(), ...specifics[name]],
  validation: rule => rule.custom(document => {
    if (!document || document.editorialStatus !== 'approved') return true;
    const errors = publicationErrors(document);
    return errors.length ? errors.join('; ') : true;
  }),
  preview: {select: {title: 'title', subtitle: 'editorialStatus'}},
}))];
