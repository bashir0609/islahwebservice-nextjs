import LegalPage, { LegalSection, LegalList } from "@/components/site/legal-page";

export default function TermsPage() {
  return (
    <LegalPage
      title="Website Terms of Use"
      subtitle="The terms that apply when you browse this website or use its contact and sample-request forms."
      updatedLabel="Last updated: August 2026"
    >
      <LegalSection heading="Acceptance of these terms">
        <p>
          By accessing or using https://www.islahwebservice.com (the &ldquo;Website&rdquo;), you agree
          to these Website Terms of Use. If you do not agree, please do not use the Website. These terms
          apply to your use of the Website itself — they are not a service agreement for any project we
          may subsequently work on together.
        </p>
      </LegalSection>

      <LegalSection heading="What Islah Web Service does">
        <p>
          Islah Web Service provides B2B prospect research and data services: researching companies,
          identifying requested decision-makers, enriching and verifying contact data, and delivering
          CRM-ready prospect databases built around client targeting criteria. We also offer enrichment
          of existing client databases.
        </p>
        <p>
          Islah Web Service does not operate cold email campaigns, book meetings, or manage outreach on
          the client&apos;s behalf. The client controls all outreach, campaign execution, and sales
          activity that follows delivery of the data.
        </p>
      </LegalSection>

      <LegalSection heading="No guarantees of results">
        <p>
          We verify contact data against the checks available at the time of research and deliver the
          agreed records in the agreed format. However:
        </p>
        <LegalList
          items={[
            "Email addresses, phone numbers, job titles, and company details can change after research is completed.",
            "Campaign outcomes — including replies, meetings, pipeline, and revenue — depend on the client's messaging, sending infrastructure, and sales execution, and are outside our control.",
            "Nothing on this Website constitutes a guarantee of specific business results.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="Your use of the Website">
        <p>When using the Website you agree not to:</p>
        <LegalList
          items={[
            "Misuse, disrupt, or attempt to gain unauthorised access to the Website or its systems",
            "Submit false, misleading, or unlawful information through our forms",
            "Attempt to scrape, copy, or republish substantial portions of the Website's content without permission",
            "Use the Website in any way that violates applicable law",
          ]}
        />
        <p>
          Information you submit through our forms is used as described in our{" "}
          <a href="/privacy-policy" className="text-cyan-400 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="Intellectual property">
        <p>
          The Website and its content — including text, graphics, logos, and page design — are owned by
          or licensed to Islah Web Service and are protected by applicable intellectual property laws.
          You may view and share the content for informational purposes, but you may not republish it
          commercially without our written permission.
        </p>
        <p>
          Information you share with us about your own business and targeting criteria remains yours;
          we use it only to respond to you and to deliver the services you request.
        </p>
      </LegalSection>

      <LegalSection heading="Third-party links and services">
        <p>
          The Website may link to third-party services, including Google Tag Manager, our hosting and
          email providers, and external profiles such as Upwork and LinkedIn. These third parties have
          their own terms and privacy policies, and we are not responsible for their content or
          practices.
        </p>
      </LegalSection>

      <LegalSection heading="Disclaimer and limitation of liability">
        <p>
          The Website is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties
          of any kind, whether express or implied. To the maximum extent permitted by law, Islah Web
          Service is not liable for any indirect, incidental, or consequential damages arising from your
          use of the Website.
        </p>
        <p>
          Nothing in these terms limits liability that cannot be limited under applicable law.
        </p>
      </LegalSection>

      <LegalSection heading="Governing law">
        <p>
          These Website Terms of Use are governed by the laws of Bangladesh, where Islah Web Service is
          established, without regard to conflict-of-law principles. Any disputes relating to the
          Website will be subject to the exclusive jurisdiction of the courts of Bangladesh.
        </p>
        <p>
          This does not affect any statutory rights you may have under the laws of your own country.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to these terms">
        <p>
          We may update these terms from time to time. The current version will always be published on
          this page with an updated &ldquo;Last updated&rdquo; date.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about these terms can be sent to{" "}
          <a href="mailto:hello@islahwebservice.com" className="text-cyan-400 hover:underline">
            hello@islahwebservice.com
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
