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
    id: 'testimonial-109',
    contractTitle: 'Sales Development Representative (Build List and Email Campaign)',
    rating: '5.0',
    completionDate: 'Feb 12, 2023',
    quote: 'Bashir worked on a lead generation project for me for several months. I plan to hire him again in the future if I need additional leads.',
    category: 'Lead Generation & Campaigns',
    attribution: 'Client Feedback',
  },
  {
    id: 'testimonial-105',
    contractTitle: 'Lead Generation/Email Generation',
    rating: '5.0',
    completionDate: 'Feb 21, 2023',
    quote: 'Very quick and efficient. I will be using Bashir again for all future lead-generation work.',
    category: 'B2B Lead Generation',
    attribution: 'Client Feedback',
  },
  {
    id: 'testimonial-1',
    contractTitle: 'Prospect lists',
    rating: '5.0',
    completionDate: 'Nov 21, 2025',
    quote: 'Bashir is an excellent worker and I will hire him again.',
    category: 'Prospect Research',
    attribution: 'Client Feedback',
  },
];

export const aboutTestimonials: Testimonial[] = [
  {
    id: 'testimonial-62',
    contractTitle: 'Lead List Cleaning',
    rating: '5.0',
    completionDate: 'Aug 8, 2023',
    quote: 'Bashir has done excellent work for us. Would hire him again!',
    category: 'Data Quality & Cleaning',
    attribution: 'Client Feedback',
  },
  {
    id: 'testimonial-127',
    contractTitle: 'Instant job: Create links to images on dropbox and paste them on a spreadsheet',
    rating: '5.0',
    completionDate: 'Oct 21, 2022',
    quote: 'We worked together for a long while. Bashir is reliable, trustworthy, and fast. I highly recommend working with him.',
    category: 'Reliability & Trust',
    attribution: 'Client Feedback',
  },
  {
    id: 'testimonial-20',
    contractTitle: 'Formatting data for research',
    rating: '5.0',
    completionDate: 'Nov 11, 2024',
    quote: 'Very fast and efficient, will use again.',
    category: 'Research Data Formatting',
    attribution: 'Client Feedback',
  },
];
