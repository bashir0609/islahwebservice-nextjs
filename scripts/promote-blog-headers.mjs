// scripts/promote-blog-headers.mjs
// One-off: promotes plain-text section headers in the 3 exported posts
// (Google Maps, data enrichment, clean lead list) to markdown headings
// (## for sections, ### for sub-sections, **bold** for FAQ questions),
// matching the hand-authored style of the other 9 posts.
// Usage: node scripts/promote-blog-headers.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const contentDir = path.join(root, "content", "blog");

// Per file: exact header line -> markdown replacement
const EDITS = {
  "how-to-extract-verified-leads-from-google-maps-ethically.md": [
    ["Direct answer: What is Google Maps lead scraping?", "## Direct answer: What is Google Maps lead scraping?"],
    ["Why sales teams use Google Maps for lead discovery", "## Why Sales Teams Use Google Maps for Lead Discovery"],
    ["Compliance first: scraping, APIs, and responsible use", "## Compliance First: Scraping, APIs, and Responsible Use"],
    ["The ethical Google Maps lead scraping workflow", "## The Ethical Google Maps Lead Scraping Workflow"],
    ["1. Define the exact lead criteria before collecting data", "## 1. Define the Exact Lead Criteria Before Collecting Data"],
    ["2. Collect only the business signals needed for qualification", "## 2. Collect Only the Business Signals Needed for Qualification"],
    ["3. Verify the business from its own website", "## 3. Verify the Business From Its Own Website"],
    ["4. Enrich the list with decision-maker research", "## 4. Enrich the List With Decision-Maker Research"],
    ["5. Verify emails before outreach", "## 5. Verify Emails Before Outreach"],
    ["6. Deduplicate and standardize the data", "## 6. Deduplicate and Standardize the Data"],
    ["7. Format the list for your outreach workflow", "## 7. Format the List for Your Outreach Workflow"],
    ["Common mistakes to avoid", "## Common Mistakes to Avoid"],
    ["Mistake 1: Treating every Google Maps result as a lead", "### Mistake 1: Treating Every Google Maps Result as a Lead"],
    ["Mistake 2: Skipping website verification", "### Mistake 2: Skipping Website Verification"],
    ["Mistake 3: Sending outreach to unverified emails", "### Mistake 3: Sending Outreach to Unverified Emails"],
    ["Mistake 4: Ignoring duplicates", "### Mistake 4: Ignoring Duplicates"],
    ["Mistake 5: Collecting data without a purpose", "### Mistake 5: Collecting Data Without a Purpose"],
    ["What a high-quality Google Maps lead list should include", "## What a High-Quality Google Maps Lead List Should Include"],
    ["When to outsource Google Maps lead scraping", "## When to Outsource Google Maps Lead Scraping"],
    ["Final takeaway", "## Final Takeaway"],
    ["FAQ", "## FAQ"],
    ["Is Google Maps lead scraping legal?", "**Is Google Maps lead scraping legal?**"],
    ["What is the best way to use Google Maps for lead generation?", "**What is the best way to use Google Maps for lead generation?**"],
    ["Can I scrape emails from Google Maps?", "**Can I scrape emails from Google Maps?**"],
    ["What fields should a Google Maps lead list include?", "**What fields should a Google Maps lead list include?**"],
    ["Why are raw scraped lead lists low quality?", "**Why are raw scraped lead lists low quality?**"],
    ["How do I get a free sample of verified local leads?", "**How do I get a free sample of verified local leads?**"],
    ["How does Islah Web Service improve Google Maps lead lists?", "**How does Islah Web Service improve Google Maps lead lists?**"],
  ],
  "what-is-b2b-data-enrichment-complete-guide-for-sales-teams.md": [
    ["What Is B2B Data Enrichment?", "## What Is B2B Data Enrichment?"],
    ["Why Is B2B Data Enrichment Important?", "## Why Is B2B Data Enrichment Important?"],
    ["How B2B Data Enrichment Works", "## How B2B Data Enrichment Works"],
    ["1. Data Cleaning", "## 1. Data Cleaning"],
    ["2. Contact Data Enrichment", "## 2. Contact Data Enrichment"],
    ["3. Company Data Enrichment", "## 3. Company Data Enrichment"],
    ["4. Email Verification", "## 4. Email Verification"],
    ["5. CRM Formatting", "## 5. CRM Formatting"],
    ["B2B Data Enrichment Example", "## B2B Data Enrichment Example"],
    ["Benefits of B2B Data Enrichment", "## Benefits of B2B Data Enrichment"],
    ["Better Lead Targeting", "### Better Lead Targeting"],
    ["Improved Cold Email Personalization", "### Improved Cold Email Personalization"],
    ["Lower Email Bounce Rate", "### Lower Email Bounce Rate"],
    ["Better CRM Accuracy", "### Better CRM Accuracy"],
    ["Faster Sales Prospecting", "### Faster Sales Prospecting"],
    ["Better Lead Scoring", "### Better Lead Scoring"],
    ["B2B Data Enrichment vs B2B List Building", "## B2B Data Enrichment vs B2B List Building"],
    ["What Data Can Be Enriched?", "## What Data Can Be Enriched?"],
    ["Contact Information", "### Contact Information"],
    ["Company Information", "### Company Information"],
    ["Sales Intelligence", "### Sales Intelligence"],
    ["Who Needs B2B Data Enrichment?", "## Who Needs B2B Data Enrichment?"],
    ["When Should You Enrich Your B2B Data?", "## When Should You Enrich Your B2B Data?"],
    ["B2B Data Enrichment Tools vs Done-for-You Services", "## B2B Data Enrichment Tools vs Done-for-You Services"],
    ["Best Practices for B2B Data Enrichment", "## Best Practices for B2B Data Enrichment"],
    ["Define Your Ideal Customer Profile", "### Define Your Ideal Customer Profile"],
    ["Verify Emails Before Outreach", "### Verify Emails Before Outreach"],
    ["Keep Data Organized", "### Keep Data Organized"],
    ["Remove Duplicates", "### Remove Duplicates"],
    ["Update Data Regularly", "### Update Data Regularly"],
    ["How Islah Web Service Can Help", "## How Islah Web Service Can Help"],
    ["Final Thoughts", "## Final Thoughts"],
    ["FAQ Section", "## FAQ"],
    ["What is B2B data enrichment?", "**What is B2B data enrichment?**"],
    ["Why is B2B data enrichment important?", "**Why is B2B data enrichment important?**"],
    ["What is the difference between lead enrichment and data enrichment?", "**What is the difference between lead enrichment and data enrichment?**"],
    ["Can B2B data enrichment improve cold email results?", "**Can B2B data enrichment improve cold email results?**"],
    ["What data can be added during enrichment?", "**What data can be added during enrichment?**"],
  ],
  "how-to-build-a-clean-b2b-lead-list-for-cold-email.md": [
    ["What is a clean B2B lead list?", "## What Is a Clean B2B Lead List?"],
    ["Why clean lead data matters for cold email", "## Why Clean Lead Data Matters for Cold Email"],
    ["Step 1: Define your ideal customer profile", "## Step 1: Define Your Ideal Customer Profile"],
    ["Step 2: Choose the right lead source", "## Step 2: Choose the Right Lead Source"],
    ["Step 3: Collect company-level data first", "## Step 3: Collect Company-Level Data First"],
    ["Step 4: Filter and classify the leads", "## Step 4: Filter and Classify the Leads"],
    ["Step 5: Find the right decision-makers", "## Step 5: Find the Right Decision-Makers"],
    ["Step 6: Verify email addresses", "## Step 6: Verify Email Addresses"],
    ["Step 7: Remove duplicates", "## Step 7: Remove Duplicates"],
    ["Step 8: Enrich the list with useful context", "## Step 8: Enrich the List With Useful Context"],
    ["Step 9: Format the list for outreach", "## Step 9: Format the List for Outreach"],
    ["Step 10: Quality-check before sending", "## Step 10: Quality-Check Before Sending"],
    ["Clean B2B lead list checklist", "## Clean B2B Lead List Checklist"],
    ["Bad lead list vs clean lead list", "## Bad Lead List vs Clean Lead List"],
    ["How many leads do you need for cold email?", "## How Many Leads Do You Need for Cold Email?"],
    ["Common mistakes when building B2B lead lists", "## Common Mistakes When Building B2B Lead Lists"],
    ["What is the best way to build a B2B lead list?", "## What Is the Best Way to Build a B2B Lead List?"],
    ["Need help building a clean B2B lead list?", "## Need Help Building a Clean B2B Lead List?"],
    ["FAQ", "## FAQ"],
    ["What is a B2B lead list?", "**What is a B2B lead list?**"],
    ["What makes a lead list clean?", "**What makes a lead list clean?**"],
    ["Why is email verification important for cold email?", "**Why is email verification important for cold email?**"],
    ["Should I buy a large lead list?", "**Should I buy a large lead list?**"],
    ["What fields should a cold email lead list include?", "**What fields should a cold email lead list include?**"],
    ["Can Google Maps be used for lead generation?", "**Can Google Maps be used for lead generation?**"],
    ["How do I avoid duplicate leads?", "**How do I avoid duplicate leads?**"],
    ["How often should a B2B lead list be updated?", "**How often should a B2B lead list be updated?**"],
  ],
};

function main() {
  for (const [file, replacements] of Object.entries(EDITS)) {
    const filePath = path.join(contentDir, file);
    if (!fs.existsSync(filePath)) {
      console.error(`NOT FOUND: ${file}`);
      process.exit(1);
    }
    let content = fs.readFileSync(filePath, "utf8");
    const lines = content.split("\n");
    let applied = 0;
    for (const [oldLine, newLine] of replacements) {
      let found = 0;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim() === oldLine) {
          lines[i] = lines[i].replace(oldLine, newLine);
          found++;
        }
      }
      if (found !== 1) {
        console.error(
          `HEADER FAIL (${file}): found ${found} for line >>> ${oldLine}`
        );
        process.exit(1);
      }
      applied++;
    }
    fs.writeFileSync(filePath, lines.join("\n"), "utf8");
    console.log(`PROMOTED ${file} (${applied} headers)`);
  }
  console.log("Done.");
}

main();
