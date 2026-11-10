import assert from 'node:assert/strict';
import test from 'node:test';
import { serviceDetails } from '../src/data/page-details';
import { services } from '../src/data/site';

const serviceSlugs = new Set(services.map(service => service.slug));

test('all six service configurations have aligned content arrays', () => {
  assert.equal(services.length, 6);
  assert.deepEqual(Object.keys(serviceDetails).sort(), [...serviceSlugs].sort());

  for (const service of services) {
    const detail = serviceDetails[service.slug];
    assert.ok(detail, `${service.slug}: missing service details`);
    assert.equal(detail.deliverableTitles.length, service.deliverables.length, `${service.slug}: deliverable titles`);
    assert.equal(detail.stepTitles.length, service.steps.length, `${service.slug}: process step titles`);
    assert.equal(detail.visualSteps.length, service.steps.length, `${service.slug}: visual process steps`);
    assert.equal(detail.relatedSlugs.length, 3, `${service.slug}: related service count`);
    assert.equal(new Set(detail.relatedSlugs).size, detail.relatedSlugs.length, `${service.slug}: duplicate related service`);
    for (const relatedSlug of detail.relatedSlugs) {
      assert.notEqual(relatedSlug, service.slug, `${service.slug}: recommends itself`);
      assert.ok(serviceSlugs.has(relatedSlug), `${service.slug}: unknown recommendation ${relatedSlug}`);
    }
  }
});
