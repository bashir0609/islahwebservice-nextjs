export interface Testimonial {
  id: string;
  contractTitle: string;
  rating: string;
  completionDate: string;
  quote: string;
  category: string;
  attribution: string;
}

// Backward-compatibility alias
export type UpworkTestimonial = Testimonial;

export const homepageTestimonials: Testimonial[] = [
  {
    id: 'agency-review-va-lead-gen',
    contractTitle: 'Lead Generation and Virtual Assistant Extraordinaire',
    rating: '5.0',
    completionDate: 'Apr 9, 2024',
    quote: "It has been a pleasure working with Bashir. The only reason we're stopping this contract is that we are moving to a new larger contract. Looking forward to working with Islah Web Services now and in the future.",
    category: 'Lead Generation & Growth',
    attribution: 'Client Feedback',
  },
  {
    id: 'agency-review-email-mktg-mgmt',
    contractTitle: 'Lead Generation and Email Marketing Management Services',
    rating: '5.0',
    completionDate: 'May 6, 2025',
    quote: 'Mr. Maruf has done a great job. The contract we were working on has come to an end. We would gladly re-employ him as soon as the next contract comes in. Thank you for your good work.',
    category: 'Email Marketing & Campaigns',
    attribution: 'Client Feedback',
  },
  {
    id: 'agency-review-email-list-compilation',
    contractTitle: 'Email List Compilation',
    rating: '5.0',
    completionDate: 'Jan 5, 2023',
    quote: 'Great communication & quick response times. Followed instructions well and delivered work as promised with updates along the way. We started with a small job and extended it as each stage was completed. Thank you for your work, Bashir!',
    category: 'Prospect Research',
    attribution: 'Client Feedback',
  },
];

export const aboutTestimonials: Testimonial[] = [
  {
    id: 'agency-review-hot-tub-prospecting',
    contractTitle: 'Hot tub dealer and service company prospecting',
    rating: '5.0',
    completionDate: 'Sep 30, 2024',
    quote: 'Great working with Bashir, would highly recommend!',
    category: 'Account Prospecting',
    attribution: 'Client Feedback',
  },
  {
    id: 'agency-review-tech-prospect-list',
    contractTitle: 'Tech Companies Prospect List',
    rating: '5.0',
    completionDate: 'Sep 2, 2023',
    quote: 'Excellent and will continue to work with bashir',
    category: 'Targeted Prospect Lists',
    attribution: 'Client Feedback',
  },
  {
    id: 'agency-review-lead-email-generation',
    contractTitle: 'Lead Generation/Email Generation',
    rating: '5.0',
    completionDate: 'Feb 2, 2023',
    quote: 'Very quick and responsive!',
    category: 'B2B Lead Generation',
    attribution: 'Client Feedback',
  },
];
