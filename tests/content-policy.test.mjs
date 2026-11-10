import test from 'node:test';
import assert from 'node:assert/strict';
import {DOCUMENT_TYPES, CLAIM_KINDS, validTimestamp, publicationErrors, claimErrors, foundationActions} from '../sanity/policy.mjs';
import {schemaTypes} from '../sanity/schema.mjs';
import {studioRequirements} from '../sanity/config.mjs';

const approval = () => ({state: 'approved', reviewer: 'Owner', reviewedAt: '2026-11-09', evidenceReference: 'EDITORIAL-1', bodyReviewed: true});
const approved = type => ({_type: type, editorialStatus: 'approved', approval: approval()});
const claim = kind => ({kind, statement: kind === 'price' ? 'Request a quote' : 'Reviewed statement', approval: approval()});

test('all requested document schemas and reusable SEO exist with no Portable Text fiction', () => {
  assert.deepEqual(schemaTypes.filter(type => type.type === 'document').map(type => type.name), DOCUMENT_TYPES);
  assert.ok(schemaTypes.some(type => type.name === 'seo' && type.type === 'object'));
  for (const type of schemaTypes.filter(type => type.type === 'document')) {
    assert.equal(type.fields.find(field => field.name === 'markdown').type, 'text');
    assert.equal(new Set(type.fields.map(field => field.name)).size, type.fields.length);
  }
  assert.equal(JSON.stringify(schemaTypes).includes('"type":"block"'), false);
});

test('real calendar dates and timezone crossings accepted, invalid dates rejected', () => {
  for (const date of ['2024-02-29', '2026-08-09T09:00:00.000Z', '2026-01-01T00:30:00+02:00', '2026-01-01T23:30:00-02:00']) assert.equal(validTimestamp(date), true, date);
  for (const date of ['2026-02-29', '2026-02-30', '2026-13-01', 'today', '2026-01-01T24:00:00Z', '2026-01-01T09:00:00', undefined]) assert.equal(validTimestamp(date), false, String(date));
});

test('each protected claim needs evidence, reviewer, approval and review date', () => {
  for (const kind of CLAIM_KINDS) {
    assert.deepEqual(claimErrors(claim(kind)), []);
    for (const field of ['state', 'reviewer', 'reviewedAt', 'evidenceReference']) {
      const value = claim(kind);
      delete value.approval[field];
      assert.ok(claimErrors(value).length, `${kind}.${field}`);
    }
  }
  assert.ok(claimErrors({kind: 'unknown'}).length);
});

test('publication requires body review and DB/file reconciliation', () => {
  assert.ok(publicationErrors({_type: 'page', editorialStatus: 'draft'}).length);
  const document = {...approved('blogPost'), migration: {reconciliation: 'required'}};
  assert.ok(publicationErrors(document).some(error => /reconciliation/.test(error)));
  document.migration.reconciliation = 'verified';
  assert.deepEqual(publicationErrors(document), []);
  document.approval.bodyReviewed = false;
  assert.ok(publicationErrors(document).length);
});

test('service capabilities and testimonial consent have explicit gates', () => {
  assert.ok(publicationErrors(approved('service')).length);
  assert.deepEqual(publicationErrors({...approved('service'), claims: [claim('serviceCapability')]}), []);
  assert.ok(publicationErrors({...approved('testimonial'), claims: [claim('testimonial')]}).length);
  assert.deepEqual(publicationErrors({...approved('testimonial'), claims: [claim('testimonial')], consentConfirmed: true}), []);
});

test('unapproved metrics block approval even on otherwise approved case studies', () => {
  const document = {...approved('caseStudy'), claims: [{kind: 'metric', statement: '100 records', approval: {state: 'pending'}}]};
  assert.ok(publicationErrors(document).length);
  document.claims[0].approval = approval();
  assert.deepEqual(publicationErrors(document), []);
});

test('numerical prices cannot be approved, including prose and metadata', () => {
  const document = {...approved('package'), priceLabel: 'Request a quote', claims: [claim('price')]};
  assert.deepEqual(publicationErrors(document), []);
  for (const change of [{priceLabel: '$100'}, {price: 100}, {markdown: 'Starts at USD 100'}, {seo: {description: 'Only 100 dollars'}}, {claims: [{...claim('price'), statement: '100'}]}]) {
    assert.ok(publicationErrors({...document, ...change}).length);
  }
});

test('Studio actions fail closed: no publish, schedule, duplicate or custom action', () => {
  const actions = ['publish', 'schedule', 'duplicate', 'custom', 'delete', 'discardChanges', 'restore'].map(action => ({action}));
  assert.deepEqual(foundationActions(actions).map(action => action.action), ['delete', 'discardChanges', 'restore']);
  assert.deepEqual(foundationActions([{}]), []);
});

test('approved document schema validation uses shared evidence policy', () => {
  const schema = schemaTypes.find(type => type.name === 'service');
  const validate = schema.validation({custom: fn => fn});
  assert.equal(validate({editorialStatus: 'draft'}), true);
  assert.match(validate(approved('service')), /capabilities/);
  assert.equal(validate({...approved('service'), claims: [claim('serviceCapability')]}), true);
});

test('Studio configuration requires explicit identifiers without exposing values', () => {
  assert.equal(studioRequirements().errors.length, 2);
  const placeholder = studioRequirements({SANITY_STUDIO_PROJECT_ID: 'YOUR_PROJECT_ID', SANITY_STUDIO_DATASET: 'YOUR_PRIVATE_STAGING_DATASET'});
  assert.equal(placeholder.errors.length, 2);
  assert.deepEqual(studioRequirements({SANITY_STUDIO_PROJECT_ID: 'abc123xy', SANITY_STUDIO_DATASET: 'private-staging'}).errors, []);
});
