import {publicationErrors, validTimestamp} from '../../sanity/policy.mjs';
import {safeUrl} from './markdown.mjs';

const TYPES = {blog: 'blogPost', portfolio: 'caseStudy'};
export class ContentUnavailableError extends Error {
  constructor(code) { super(`Editorial content unavailable (${code})`); this.name = 'ContentUnavailableError'; this.code = code; }
}
const text = value => typeof value === 'string' ? value : undefined;
const date = value => value === undefined || value === null ? undefined : validTimestamp(value) ? value : (() => { throw new ContentUnavailableError('INVALID_DATE'); })();

export function publicDocument(document, collection) {
  try {
    if (!document || document._type !== TYPES[collection] || typeof document._id !== 'string' || document._id.startsWith('drafts.') || document._id.startsWith('versions.')) return null;
    if (publicationErrors(document).length) return null;
    const slug = document.slug?.current;
    if (typeof slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !document.title?.trim() || typeof document.markdown !== 'string') throw new ContentUnavailableError('INVALID_DOCUMENT');
    const image = value => value ? {source: safeUrl(value.source ?? value.asset?.asset?.url) ?? undefined, alt: text(value.alt), caption: text(value.caption), attribution: text(value.attribution), creditUrl: safeUrl(value.creditUrl) ?? undefined, license: text(value.license)} : undefined;
    // Explicit public projection: never expose approval identities/evidence, claims,
    // raw frontmatter, source IDs or migration review state to list consumers.
    return {
      slug, collection, title: document.title, markdown: document.markdown,
      excerpt: text(document.excerpt), author: text(document.author), attribution: text(document.attribution),
      tags: Array.isArray(document.tags) ? document.tags.filter(tag => typeof tag === 'string') : [],
      featured: document.featured === true, readTime: Number.isInteger(document.readTime) && document.readTime > 0 ? document.readTime : undefined,
      publishedAt: date(document.publishedAt), updatedAt: date(document.updatedAt),
      sourceDates: {date: date(document.migration?.sourceDate), createdAt: date(document.migration?.sourceCreatedAt), updatedAt: date(document.migration?.sourceUpdatedAt), publishedAt: date(document.migration?.sourcePublishedAt)},
      image: image(document.image),
      seo: {title: text(document.seo?.title), description: text(document.seo?.description), canonicalUrl: safeUrl(document.seo?.canonicalUrl) ?? undefined, noIndex: document.seo?.noIndex !== false, socialImage: image(document.seo?.socialImage)},
    };
  } catch (error) { if (error instanceof ContentUnavailableError) throw error; throw new ContentUnavailableError('INVALID_DOCUMENT'); }
}

export function createContentClient({env = process.env, fetch: fetchImpl = globalThis.fetch, timeoutMs = 8000} = {}) {
  const project = env.SANITY_PROJECT_ID, dataset = env.SANITY_DATASET, token = env.SANITY_READ_TOKEN;
  async function listPublished(collection) {
    if (!Object.hasOwn(TYPES, collection)) throw new ContentUnavailableError('INVALID_COLLECTION');
    if (!project || !dataset) throw new ContentUnavailableError('MISSING_CONFIGURATION');
    if (!/^[a-z0-9]+$/.test(project) || !/^[a-z0-9_-]+$/.test(dataset)) throw new ContentUnavailableError('INVALID_CONFIGURATION');
    const url = new URL(`https://${project}.api.sanity.io/v2025-02-19/data/query/${dataset}`);
    url.searchParams.set('perspective', 'published');
    url.searchParams.set('query', '*[_type == $type && !(_id in path("drafts.**")) && !(_id in path("versions.**")) && editorialStatus == "approved"]{_id,_type,title,slug,editorialStatus,markdown,excerpt,author,attribution,tags,featured,readTime,publishedAt,updatedAt,approval,claims,migration{reconciliation,sourceDate,sourceCreatedAt,sourceUpdatedAt,sourcePublishedAt},image{...,asset{...,asset->{url}}},seo{...,socialImage{...,asset{...,asset->{url}}}}');
    url.searchParams.set('$type', JSON.stringify(TYPES[collection]));
    try {
      const response = await fetchImpl(url, {headers: token ? {Authorization: `Bearer ${token}`} : {}, signal: AbortSignal.timeout(timeoutMs), redirect: 'error', cache: 'no-store'});
      if (!response.ok) throw new ContentUnavailableError('UPSTREAM_HTTP');
      const body = await response.text();
      if (body.length > 10_000_000) throw new ContentUnavailableError('RESPONSE_TOO_LARGE');
      const payload = JSON.parse(body);
      if (!Array.isArray(payload.result)) throw new ContentUnavailableError('INVALID_RESPONSE');
      const records = payload.result.map(doc => publicDocument(doc, collection)).filter(Boolean);
      if (new Set(records.map(record => record.slug)).size !== records.length) throw new ContentUnavailableError('DUPLICATE_SLUG');
      return records.sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? '') || a.slug.localeCompare(b.slug));
    } catch (error) { if (error instanceof ContentUnavailableError) throw error; throw new ContentUnavailableError('FETCH_FAILED'); }
  }
  async function getPublished(collection, slug) {
    if (typeof slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
    return (await listPublished(collection)).find(record => record.slug === slug) ?? null;
  }
  return {listPublished, getPublished};
}
