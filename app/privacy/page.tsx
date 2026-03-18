import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const SECTIONS = [
  {
    id: "who-we-are",
    title: "1. Who We Are",
    content: (
      <>
        <p>
          Ascendio is an independent web application developed and operated by
          Dovudkhon Asrorxonov. It is a personal project designed to help job
          seekers track their job applications, manage interview stages,
          evaluate offers, and reflect on their job search journey.
        </p>
        <p>
          Contact:{" "}
          <a
            href="mailto:asrorxonovdovudxon@gmail.com"
            className="text-primary hover:underline"
          >
            asrorxonovdovudxon@gmail.com
          </a>
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "2. Information We Collect",
    content: (
      <>
        <p>
          We collect only the information necessary to provide and improve the
          Service. This falls into two categories:
        </p>
        <h3>2.1 Information You Provide</h3>
        <p>When you use Ascendio, you may provide the following information:</p>
        <ul>
          <li>Name and email address provided through Google OAuth sign-in</li>
          <li>
            Profile photo URL from your Google account, used for display
            purposes within the application
          </li>
          <li>
            Job application data you manually enter, including company names,
            job titles, application stages, notes, contacts, and dates
          </li>
          <li>
            Documents you upload, such as CVs and cover letters, stored via
            Supabase file storage
          </li>
          <li>
            Any free-text notes, reflections, interview records, offer
            evaluations, and rejection feedback you choose to record
          </li>
        </ul>
        <h3>2.2 Information Collected Automatically</h3>
        <p>
          Ascendio does not currently use analytics tools or tracking software.
          However, the following may be collected incidentally through our
          infrastructure providers:
        </p>
        <ul>
          <li>
            Server access logs (IP address, browser type, pages visited,
            timestamps) — collected by Vercel as part of standard hosting
            operations
          </li>
          <li>
            Authentication session tokens — managed by Better Auth and stored
            securely to keep you signed in
          </li>
        </ul>
        <p>We do not use cookies for advertising or tracking purposes.</p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "3. How We Use Your Information",
    content: (
      <>
        <p>
          We use the information we collect solely to operate and improve the
          Service. Specifically:
        </p>
        <ul>
          <li>
            To authenticate your identity and provide you with secure access to
            your account via Google OAuth
          </li>
          <li>
            To display your name and profile photo within the application
            interface
          </li>
          <li>
            To store, retrieve, and display the job application data you create
            within the Service
          </li>
          <li>To store and retrieve documents you upload to the Service</li>
          <li>
            To maintain your session and ensure the Service functions correctly
            across visits
          </li>
          <li>To respond to any support or privacy inquiries you send us</li>
        </ul>
        <p>
          We do not use your data for advertising, profiling, or any commercial
          purpose beyond operating the Service.
        </p>
        <p>
          In the future, we may introduce email notifications (such as follow-up
          reminders) as an opt-in feature. If and when this is implemented, we
          will update this Privacy Policy accordingly and notify you before
          enabling any email communication.
        </p>
      </>
    ),
  },
  {
    id: "legal-basis",
    title: "4. Legal Basis for Processing",
    content: (
      <>
        <p>We process your personal data on the following legal bases:</p>
        <ul>
          <li>
            <strong>Contractual necessity</strong> — processing is required to
            provide the Service you have signed up for, including
            authentication, data storage, and application tracking
          </li>
          <li>
            <strong>Legitimate interests</strong> — we have a legitimate
            interest in maintaining the security and integrity of the Service
            and communicating with users who contact us
          </li>
          <li>
            <strong>Consent</strong> — where required, we will seek your
            explicit consent before processing your data for additional purposes
            such as email communications
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "data-storage",
    title: "5. Data Storage and Security",
    content: (
      <>
        <h3>5.1 Where Your Data Is Stored</h3>
        <p>
          Your data is stored across the following infrastructure providers,
          each of which maintains their own security and compliance standards:
        </p>
        <ul>
          <li>
            <strong>MongoDB Atlas</strong> — stores your job application data,
            account information, and in-app records. MongoDB Atlas is SOC 2 Type
            II certified and encrypts data at rest and in transit.
          </li>
          <li>
            <strong>Supabase</strong> — stores documents you upload (CVs, cover
            letters). Supabase is built on top of AWS and encrypts all stored
            files. Files are access-controlled and tied exclusively to your
            account.
          </li>
          <li>
            <strong>Vercel</strong> — hosts the Ascendio web application. Vercel
            serves the application over HTTPS and maintains industry-standard
            infrastructure security.
          </li>
          <li>
            <strong>Google</strong> — manages authentication via Google OAuth.
            We receive only your name, email, and profile photo from Google at
            the time of sign-in.
          </li>
        </ul>
        <h3>5.2 Security Measures</h3>
        <p>
          We take reasonable technical measures to protect your data, including:
        </p>
        <ul>
          <li>All data is transmitted over encrypted HTTPS connections</li>
          <li>
            Authentication is handled via Google OAuth — we never store your
            Google password
          </li>
          <li>
            Session tokens are managed securely and expire after inactivity
          </li>
          <li>
            Documents stored in Supabase are access-controlled and not publicly
            accessible
          </li>
          <li>
            Database access is restricted to authenticated application
            connections only
          </li>
        </ul>
        <p>
          While we take these precautions seriously, no system is completely
          secure. We cannot guarantee absolute security of data transmitted over
          the internet.
        </p>
      </>
    ),
  },
  {
    id: "data-sharing",
    title: "6. Data Sharing and Third Parties",
    content: (
      <>
        <p>
          We do not sell, rent, trade, or otherwise share your personal data
          with third parties for commercial purposes. Your data is shared only
          with the infrastructure providers listed above (MongoDB, Supabase,
          Vercel, Google) strictly for the purpose of operating the Service.
        </p>
        <p>
          We may disclose your information if required to do so by law,
          regulation, or legal process, or if we believe in good faith that such
          disclosure is necessary to protect the rights, safety, or property of
          Ascendio, its users, or the public.
        </p>
        <p>
          In the event that Ascendio is transferred, acquired, or merged with
          another entity, your data may be transferred as part of that
          transaction. We will notify you via the email address associated with
          your account prior to any such transfer.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "7. Your Rights and Choices",
    content: (
      <>
        <p>
          Regardless of your location, we respect the following rights with
          respect to your personal data:
        </p>
        <h3>7.1 Access</h3>
        <p>
          You have the right to access the personal data we hold about you. Much
          of your data is directly accessible within the Ascendio application
          itself. For additional information, contact us at{" "}
          <a
            href="mailto:asrorxonovdovudxon@gmail.com"
            className="text-primary hover:underline"
          >
            asrorxonovdovudxon@gmail.com
          </a>
          .
        </p>
        <h3>7.2 Correction</h3>
        <p>
          You can update your job application data, notes, and other in-app
          content at any time through the Service interface. If you need to
          correct account-level information, contact us directly.
        </p>
        <h3>7.3 Deletion</h3>
        <p>
          You have the right to delete your account and all associated data.
          Ascendio provides an account deletion feature within the application
          settings. Upon deletion:
        </p>
        <ul>
          <li>Your account record is permanently removed from our database</li>
          <li>
            All job application data associated with your account is deleted
          </li>
          <li>All documents you uploaded are removed from Supabase storage</li>
          <li>Your session tokens are invalidated</li>
        </ul>
        <p>
          Deletion is permanent and cannot be undone. Certain residual data may
          persist in infrastructure provider logs for a limited period in
          accordance with their own data retention policies.
        </p>
        <h3>7.4 Data Portability</h3>
        <p>
          If you would like a copy of your data in a portable format, please
          contact us at{" "}
          <a
            href="mailto:asrorxonovdovudxon@gmail.com"
            className="text-primary hover:underline"
          >
            asrorxonovdovudxon@gmail.com
          </a>{" "}
          and we will provide it within a reasonable timeframe.
        </p>
        <h3>7.5 Objection and Restriction</h3>
        <p>
          You may object to or request restriction of the processing of your
          personal data. To exercise this right, contact us at{" "}
          <a
            href="mailto:asrorxonovdovudxon@gmail.com"
            className="text-primary hover:underline"
          >
            asrorxonovdovudxon@gmail.com
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "data-retention",
    title: "8. Data Retention",
    content: (
      <>
        <p>
          We retain your personal data for as long as your account is active or
          as needed to provide you with the Service. If you delete your account,
          we will delete your personal data from our primary systems within a
          reasonable period.
        </p>
        <p>
          Certain data may be retained for longer periods if required by law or
          to resolve disputes, enforce our agreements, or maintain the security
          of the Service. Infrastructure provider logs (such as Vercel server
          logs) are retained according to each provider's own policies.
        </p>
      </>
    ),
  },
  {
    id: "childrens-privacy",
    title: "9. Children's Privacy",
    content: (
      <p>
        Ascendio is not directed at children under the age of 16. We do not
        knowingly collect personal information from children under 16. If you
        believe a child under 16 has provided us with their personal
        information, please contact us at{" "}
        <a
          href="mailto:asrorxonovdovudxon@gmail.com"
          className="text-primary hover:underline"
        >
          asrorxonovdovudxon@gmail.com
        </a>{" "}
        and we will take steps to delete such information promptly.
      </p>
    ),
  },
  {
    id: "international-users",
    title: "10. International Users",
    content: (
      <>
        <p>
          Ascendio is accessible globally. By using the Service, you acknowledge
          that your data may be stored and processed in countries outside your
          own, including the United States and the European Union, where our
          infrastructure providers operate. These countries may have data
          protection laws that differ from those in your country.
        </p>
        <p>
          We take reasonable steps to ensure that your data receives an adequate
          level of protection regardless of where it is processed, in accordance
          with this Privacy Policy.
        </p>
      </>
    ),
  },
  {
    id: "third-party-links",
    title: "11. Third-Party Links",
    content: (
      <p>
        The Service may contain links to third-party websites or services. This
        Privacy Policy applies only to Ascendio. We are not responsible for the
        privacy practices of any third-party sites or services. We encourage you
        to review the privacy policies of any third parties you interact with.
      </p>
    ),
  },
  {
    id: "policy-changes",
    title: "12. Changes to This Privacy Policy",
    content: (
      <>
        <p>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices, the Service, or applicable laws. When we make
          material changes, we will update the "Last Updated" date at the top of
          this document.
        </p>
        <p>
          We encourage you to review this Privacy Policy periodically. Your
          continued use of the Service after any changes constitutes your
          acceptance of the updated policy. If we make significant changes that
          materially affect your rights, we will make reasonable efforts to
          notify you directly.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "13. Contact Us",
    content: (
      <>
        <p>
          If you have any questions, concerns, or requests regarding this
          Privacy Policy or the handling of your personal data, please contact
          us:
        </p>
        <p>
          <strong>Ascendio — Privacy Inquiries</strong>
          <br />
          Email:{" "}
          <a
            href="mailto:asrorxonovdovudxon@gmail.com"
            className="text-primary hover:underline"
          >
            asrorxonovdovudxon@gmail.com
          </a>
        </p>
        <p>
          We aim to respond to all privacy-related inquiries within 14 business
          days.
        </p>
      </>
    ),
  },
];

const PrivacyPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-size-[28px_28px] mask-[radial-gradient(ellipse_80%_80%_at_50%_0%,#000_40%,transparent_100%)]" />
        <div className="absolute top-0 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full bg-primary opacity-[0.06] blur-[120px]" />
        <div className="absolute top-[20%] left-[5%] h-62.5 w-62.5 rounded-full bg-primary opacity-[0.04] blur-[80px]" />
        <div className="absolute top-[30%] right-[5%] h-62.5 w-62.5 rounded-full bg-primary opacity-[0.04] blur-[80px]" />
      </div>

      <div className="container mx-auto max-w-3xl px-4 py-16">
        <div className="mb-10">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-muted-foreground hover:text-foreground -ml-2"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Ascendio
            </Link>
          </Button>
        </div>

        <div className="mb-12">
          <Badge
            variant="outline"
            className="mb-5 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground"
          >
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            Legal
          </Badge>

          <h1 className="mb-4 font-serif text-5xl font-semibold tracking-tight text-balance md:text-6xl">
            Privacy <em className="text-primary italic">Policy</em>
          </h1>

          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
            <span>Effective: March 18, 2026</span>
            <span>Last updated: March 18, 2026</span>
          </div>
        </div>

        <div className="mb-12 rounded-2xl border border-border/60 bg-muted/20 p-6 text-sm font-light leading-relaxed text-muted-foreground">
          This Privacy Policy explains how Ascendio collects, uses, stores, and
          protects your personal information when you use our Service. By
          accessing or using Ascendio, you acknowledge that you have read,
          understood, and agree to the practices described here. If you do not
          agree, please do not use the Service.
        </div>

        <div className="flex flex-col divide-y divide-border/40">
          {SECTIONS.map((section) => (
            <div
              key={section.id}
              id={section.id}
              className="
                py-10
                [&_p]:mb-4 [&_p]:text-sm [&_p]:font-light [&_p]:leading-relaxed [&_p]:text-muted-foreground
                [&_ul]:mb-4 [&_ul]:space-y-2 [&_ul]:pl-5
                [&_li]:text-sm [&_li]:font-light [&_li]:leading-relaxed [&_li]:text-muted-foreground [&_li]:list-disc
                [&_strong]:font-medium [&_strong]:text-foreground
                [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:font-serif [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground
                [&_a]:text-primary [&_a]:hover:underline
              "
            >
              <h2 className="mb-5 font-serif text-2xl font-semibold tracking-tight text-foreground">
                {section.title}
              </h2>
              {section.content}
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border/60 bg-muted/20 p-6">
          <p className="text-xs italic leading-relaxed text-muted-foreground/70">
            This Privacy Policy was prepared for Ascendio, an independent web
            application. It is intended to be transparent and fair. If anything
            is unclear, please reach out at{" "}
            <a
              href="mailto:asrorxonovdovudxon@gmail.com"
              className="text-primary hover:underline not-italic"
            >
              asrorxonovdovudxon@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
