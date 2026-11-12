import assert from 'node:assert/strict';
import test from 'node:test';
import { homepageTestimonials, aboutTestimonials } from '../src/data/testimonials';

test('agency testimonials match verified agency work history exactly', () => {
  assert.equal(homepageTestimonials.length, 3, 'Homepage should have exactly 3 testimonials');
  assert.equal(aboutTestimonials.length, 3, 'About page should have exactly 3 testimonials');

  // Verify Homepage Testimonial 1
  const home1 = homepageTestimonials[0];
  assert.equal(home1.id, 'agency-review-va-lead-gen');
  assert.equal(home1.contractTitle, 'Lead Generation and Virtual Assistant Extraordinaire');
  assert.equal(home1.rating, '5.0');
  assert.equal(home1.completionDate, 'Apr 9, 2024');
  assert.equal(
    home1.quote,
    "It has been a pleasure working with Bashir. The only reason we're stopping this contract is that we are moving to a new larger contract. Looking forward to working with Islah Web Services now and in the future."
  );
  assert.equal(home1.attribution, 'Client Feedback');

  // Verify Homepage Testimonial 2
  const home2 = homepageTestimonials[1];
  assert.equal(home2.id, 'agency-review-email-mktg-mgmt');
  assert.equal(home2.contractTitle, 'Lead Generation and Email Marketing Management Services');
  assert.equal(home2.rating, '5.0');
  assert.equal(home2.completionDate, 'May 6, 2025');
  assert.equal(
    home2.quote,
    'Mr. Maruf has done a great job. The contract we were working on has come to an end. We would gladly re-employ him as soon as the next contract comes in. Thank you for your good work.'
  );
  assert.equal(home2.attribution, 'Client Feedback');

  // Verify Homepage Testimonial 3
  const home3 = homepageTestimonials[2];
  assert.equal(home3.id, 'agency-review-email-list-compilation');
  assert.equal(home3.contractTitle, 'Email List Compilation');
  assert.equal(home3.rating, '5.0');
  assert.equal(home3.completionDate, 'Jan 5, 2023');
  assert.equal(
    home3.quote,
    'Great communication & quick response times. Followed instructions well and delivered work as promised with updates along the way. We started with a small job and extended it as each stage was completed. Thank you for your work, Bashir!'
  );
  assert.equal(home3.attribution, 'Client Feedback');

  // Verify About Page Testimonial 4
  const about1 = aboutTestimonials[0];
  assert.equal(about1.id, 'agency-review-hot-tub-prospecting');
  assert.equal(about1.contractTitle, 'Hot tub dealer and service company prospecting');
  assert.equal(about1.rating, '5.0');
  assert.equal(about1.completionDate, 'Sep 30, 2024');
  assert.equal(about1.quote, 'Great working with Bashir, would highly recommend!');
  assert.equal(about1.attribution, 'Client Feedback');

  // Verify About Page Testimonial 5
  const about2 = aboutTestimonials[1];
  assert.equal(about2.id, 'agency-review-tech-prospect-list');
  assert.equal(about2.contractTitle, 'Tech Companies Prospect List');
  assert.equal(about2.rating, '5.0');
  assert.equal(about2.completionDate, 'Sep 2, 2023');
  assert.equal(about2.quote, 'Excellent and will continue to work with bashir');
  assert.equal(about2.attribution, 'Client Feedback');

  // Verify About Page Testimonial 6
  const about3 = aboutTestimonials[2];
  assert.equal(about3.id, 'agency-review-lead-email-generation');
  assert.equal(about3.contractTitle, 'Lead Generation/Email Generation');
  assert.equal(about3.rating, '5.0');
  assert.equal(about3.completionDate, 'Feb 2, 2023');
  assert.equal(about3.quote, 'Very quick and responsive!');
  assert.equal(about3.attribution, 'Client Feedback');

  // Verify none of the old personal reviews exist
  const allTestimonials = [...homepageTestimonials, ...aboutTestimonials];
  const oldIds = ['testimonial-109', 'testimonial-105', 'testimonial-1', 'testimonial-62', 'testimonial-127', 'testimonial-20'];
  for (const t of allTestimonials) {
    assert.ok(!oldIds.includes(t.id), `Old testimonial ID found: ${t.id}`);
    assert.ok(!t.quote.includes('several months. I plan to hire him again'), 'Old quote 1 found');
    assert.ok(!t.quote.includes('Very quick and efficient. I will be using Bashir again'), 'Old quote 2 found');
    assert.ok(!t.quote.includes('Bashir is an excellent worker and I will hire him again'), 'Old quote 3 found');
    assert.ok(!t.quote.includes('Bashir has done excellent work for us'), 'Old quote 4 found');
    assert.ok(!t.quote.includes('Instant job: Create links to images on dropbox'), 'Old quote 5 found');
    assert.ok(!t.quote.includes('Formatting data for research'), 'Old quote 6 found');
    assert.ok(!/upwork/i.test(t.quote), 'Quote references Upwork');
    assert.ok(!/upwork/i.test(t.attribution), 'Attribution references Upwork');
  }
});
