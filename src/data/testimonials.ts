export interface UpworkTestimonial {
  id: string;
  contractTitle: string;
  rating: string;
  completionDate: string;
  quote: string;
  category: string;
  profileUrl: string;
  attribution: string;
}

export const upworkProfileUrl = 'https://www.upwork.com/freelancers/bashirahmed';

export const homepageTestimonials: UpworkTestimonial[] = [
  {
    id: 'upwork-109',
    contractTitle: 'Sales Development Representative (Build List and Email Campaign)',
    rating: '5.0',
    completionDate: 'Feb 12, 2023',
    quote: 'Bashir worked on a lead generation project for me for several months. I plan to hire him again in the future if I need additional leads.',
    category: 'Lead Generation & Campaigns',
    profileUrl: upworkProfileUrl,
    attribution: "Client review from founder Bashir Ahmed's Upwork work history",
  },
  {
    id: 'upwork-105',
    contractTitle: 'Lead Generation/Email Generation',
    rating: '5.0',
    completionDate: 'Feb 21, 2023',
    quote: 'Very quick and efficient. I will be using Bashir again for all future lead-generation work.',
    category: 'B2B Lead Generation',
    profileUrl: upworkProfileUrl,
    attribution: "Client review from founder Bashir Ahmed's Upwork work history",
  },
  {
    id: 'upwork-1',
    contractTitle: 'Prospect lists',
    rating: '5.0',
    completionDate: 'Nov 21, 2025',
    quote: 'Bashir is an excellent worker and I will hire him again.',
    category: 'Prospect Research',
    profileUrl: upworkProfileUrl,
    attribution: "Client review from founder Bashir Ahmed's Upwork work history",
  },
];

export const aboutTestimonials: UpworkTestimonial[] = [
  {
    id: 'upwork-62',
    contractTitle: 'Lead List Cleaning',
    rating: '5.0',
    completionDate: 'Aug 8, 2023',
    quote: 'Bashir has done excellent work for us. Would hire him again!',
    category: 'Data Quality & Cleaning',
    profileUrl: upworkProfileUrl,
    attribution: "Client review from founder Bashir Ahmed's Upwork work history",
  },
  {
    id: 'upwork-127',
    contractTitle: 'Instant job: Create links to images on dropbox and paste them on a spreadsheet',
    rating: '5.0',
    completionDate: 'Oct 21, 2022',
    quote: 'We worked together for a long while. Bashir is reliable, trustworthy, and fast. I highly recommend working with him.',
    category: 'Reliability & Trust',
    profileUrl: upworkProfileUrl,
    attribution: "Client review from founder Bashir Ahmed's Upwork work history",
  },
  {
    id: 'upwork-20',
    contractTitle: 'Formatting data for research',
    rating: '5.0',
    completionDate: 'Nov 11, 2024',
    quote: 'Very fast and efficient, will use again.',
    category: 'Research Data Formatting',
    profileUrl: upworkProfileUrl,
    attribution: "Client review from founder Bashir Ahmed's Upwork work history",
  },
];
