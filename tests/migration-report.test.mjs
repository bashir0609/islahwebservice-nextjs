import test from 'node:test';
import assert from 'node:assert/strict';
import {createMigrationReport, parseUrlInventory} from '../scripts/migration-report.mjs';

const manifest = {
  records: [
    {type: 'blogPost', slug: 'published-guide', sourcePath: 'content/blog/published-guide.md', sourceStatus: 'published', sourceDate: '2024-01-01', reconciliation: 'required'},
    {type: 'blogPost', slug: 'private-draft', sourcePath: 'content/blog/private-draft.md', sourceStatus: 'draft', reconciliation: 'required'},
    {type: 'caseStudy', slug: 'review-project', sourcePath: 'content/portfolio/review-project.md', sourceStatus: 'unknown', reconciliation: 'required'},
  ],
};

const csv = '"source_url","proposed_target_path"\n"/blog/published-guide","/blog/published-guide"\n"/portfolio/review-project","/portfolio/review-project"\n';

test('URL inventory parser preserves quoted paths', () => {
  assert.deepEqual(parseUrlInventory(csv), [
    {source_url: '/blog/published-guide', proposed_target_path: '/blog/published-guide'},
    {source_url: '/portfolio/review-project', proposed_target_path: '/portfolio/review-project'},
  ]);
});

test('migration report distinguishes preparation from import and publication', () => {
  const report = createMigrationReport(manifest, parseUrlInventory(csv));
  assert.deepEqual(report.source, {
    total: 3, blogs: 2, caseStudies: 1, publishedBlogs: 1, excludedDrafts: 1, unknownCaseStudies: 1,
  });
  assert.equal(report.preparation.successfullyPreparedAsSanityDrafts, 3);
  assert.equal(report.importedToSanity, 0);
  assert.equal(report.publishedToSanity, 0);
  assert.deepEqual(report.preparation.urlDifferences, ['/blog/private-draft']);
  assert.ok(report.records.every(record => record.preparedAsDraft && record.reconciliation === 'required'));
});
