import records from './offline-records.mjs';
import portfolioRecords from './offline-portfolio-records.mjs';

export async function listOfflinePublishedBlogs() {
  return records;
}

export async function getOfflinePublishedBlog(slug) {
  if (typeof slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  return records.find(record => record.slug === slug) ?? null;
}

export async function listOfflinePublishedPortfolio() {
  return portfolioRecords;
}

export async function getOfflinePublishedPortfolio(slug) {
  if (typeof slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  return portfolioRecords.find(record => record.slug === slug) ?? null;
}
