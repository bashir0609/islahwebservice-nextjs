import LegalPage, { LegalSection, LegalList } from "@/components/site/legal-page";

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      subtitle="How Islah Web Service collects, uses, and protects the information you provide on this website."
      updatedLabel="Last updated: August 2026"
    >
      <LegalSection heading="Who we are">
        <p>
          Islah Web Service is a B2B prospect research and data services provider. This Privacy Policy
          explains how we handle personal information collected through this website
          (https://www.islahwebservice.com), including through our contact, free sample request, and
          consultation forms.
        </p>
        <p>
          We collect personal information only when you choose to provide it — for example when you ask
          a question, request a sample, or start scoping a research project. We do not sell personal
          information.
        </p>
      </LegalSection>

      <LegalSection heading="Information we collect">
        <p><strong className="text-white">Information you provide through our forms:</strong></p>
        <LegalList
          items={[
            "Name and work email address",
            "Company name and website",
            "Service interest (e.g. B2B prospect research or existing database enrichment)",
            "Targeting details you choose to share so we can scope or prepare a sample: target industry, geography, company size, target company criteria, technology or funding requirements, hiring criteria, desired decision-maker roles, required data fields, and approximate project size",
            "Any message or additional notes you include",
          ]}
        />
        <p><strong className="text-white">Information collected automatically:</strong></p>
        <LegalList
          items={[
            "Technical data such as browser type, device type, and pages visited, collected through Google Tag Manager and any analytics tags configured within it (for example Google Analytics 4). This data is used in aggregate form for understanding site usage and improving the website.",
            "Server-side logs (such as IP address and request time) maintained by our hosting provider for security, performance, and troubleshooting.",
            "Email address and reply data when you correspond with us directly by email.",
          ]}
        />
        <p>
          We do not knowingly collect sensitive categories of personal data through this website, and we
          do not collect personal data from children.
        </p>
      </LegalSection>

      <LegalSection heading="How we use your information">
        <LegalList
          items={[
            "Responding to inquiries and messages",
            "Preparing free prospect research samples built around the criteria you provide",
            "Scoping projects, preparing quotes, and delivering services",
            "Communicating with prospective and current clients about their projects",
            "Improving the website, its content, and user experience",
            "Site security, fraud prevention, and troubleshooting",
            "Aggregate analytics to understand which pages and content are useful",
          ]}
        />
        <p>
          When you submit a form, your details are emailed to our team through a transactional email
          service so we can respond to you. We do not use form data for marketing emails unless you
          separately ask us to.
        </p>
      </LegalSection>

      <LegalSection heading="How we share information">
        <p>We do not sell, rent, or trade personal information. We share it only with:</p>
        <LegalList
          items={[
            <span key="resend">
              <strong className="text-white">Resend</strong> — transactional email delivery for
              transmitting form submissions to our team. Resend processes the data only to deliver the
              message.
            </span>,
            <span key="vercel">
              <strong className="text-white">Vercel</strong> — website hosting. Vercel processes
              standard server logs for hosting, security, and performance.
            </span>,
            <span key="google">
              <strong className="text-white">Google (Google Tag Manager and Google Analytics)</strong> —
              tag management and aggregate website analytics. Google may process limited usage data
              (such as device, browser, and page interactions) in accordance with its own privacy
              policy.
            </span>,
            "Authorities or advisers where we are legally required to disclose information, or to protect our rights, property, or safety.",
          ]}
        />
        <p>
          Confidential information you share about your targeting criteria is used only to scope,
          prepare, or deliver your research and is treated as confidential.
        </p>
      </LegalSection>

      <LegalSection heading="Cookies and tracking">
        <p>
          This website uses Google Tag Manager to manage analytics and conversion tracking. Depending on
          the tags configured in our container, this may place cookies that collect usage information
          (for example, pages visited and whether you completed a form).
        </p>
        <p>
          Non-essential cookies and the associated scripts are loaded only after you consent via the
          cookie banner. If you decline, we do not load the tag manager scripts on your visit. You can
          change your choice at any time using the &ldquo;Cookie Preferences&rdquo; link in the website
          footer, and your choice is remembered on this device.
        </p>
        <p>
          For more detail on Google&apos;s data practices, see Google&apos;s privacy policy at
          https://policies.google.com/privacy.
        </p>
      </LegalSection>

      <LegalSection heading="How long we keep information">
        <p>
          Inquiry and sample-request details are retained while a business relationship is active or
          being considered, and for a reasonable period afterwards to respond to follow-ups and maintain
          records of our correspondence. Client project data is retained in line with the specific
          project agreement. Aggregated analytics and server logs are retained for the periods required
          by the relevant providers.
        </p>
        <p>
          We review our retention periods and delete or anonymise information that is no longer needed
          for the purposes described above.
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>
          Depending on where you are located, you may have rights under applicable law, including (where
          they apply) the UK GDPR / EU GDPR and the California Consumer Privacy Act (CCPA/CPRA):
        </p>
        <LegalList
          items={[
            "Access a copy of the personal information we hold about you",
            "Request correction of inaccurate information",
            "Request deletion of your information",
            "Object to or restrict certain processing",
            "Data portability, where applicable",
            "Not be discriminated against for exercising your privacy rights",
          ]}
        />
        <p>
          To exercise any of these rights, email us at{" "}
          <a href="mailto:hello@islahwebservice.com" className="text-cyan-400 hover:underline">
            hello@islahwebservice.com
          </a>
          . We may ask you to verify your identity before acting on your request, and we will respond
          within the timeframe required by applicable law. You may also have the right to lodge a
          complaint with your local data protection authority.
        </p>
      </LegalSection>

      <LegalSection heading="International data transfers">
        <p>
          Our hosting, email, and analytics providers (Vercel, Resend, and Google) are located in the
          United States and other countries. Where personal information is transferred outside the
          country where you are located, we rely on the providers&apos; standard contractual clauses,
          adequacy decisions, or equivalent safeguards to protect your information.
        </p>
      </LegalSection>

      <LegalSection heading="Security">
        <p>
          We use appropriate technical and organisational measures to protect the information we handle,
          including HTTPS encryption in transit, restricted access to our accounts and systems, and
          least-privilege access for the tools that process form submissions. No method of transmission
          or storage is completely secure, and we cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          If you have questions about this Privacy Policy or how your information is handled, contact us
          at:
        </p>
        <p>
          <a href="mailto:hello@islahwebservice.com" className="text-cyan-400 hover:underline">
            hello@islahwebservice.com
          </a>
          <br />
          Islah Web Service
        </p>
      </LegalSection>

      <LegalSection heading="Changes to this policy">
        <p>
          We may update this Privacy Policy from time to time. When we do, we will revise the
          &ldquo;Last updated&rdquo; date above. Material changes will be highlighted on this page where
          reasonably possible.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
