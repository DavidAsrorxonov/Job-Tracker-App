import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const SECTIONS = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: (
      <>
        <p>
          By creating an account or otherwise accessing the Service, you confirm
          that you are at least 16 years of age, that you have read and
          understood these Terms, and that you agree to be legally bound by
          them.
        </p>
        <p>
          If you are using the Service on behalf of an organization, you
          represent that you have the authority to bind that organization to
          these Terms.
        </p>
      </>
    ),
  },
  {
    id: "description",
    title: "2. Description of the Service",
    content: (
      <>
        <p>
          Ascendio is a personal productivity tool that allows registered users
          to:
        </p>
        <ul>
          <li>
            Track job applications across multiple stages (Wishlist, Applied,
            Interviewing, Offer, Rejected)
          </li>
          <li>
            Record notes, interview details, offer evaluations, and rejection
            reflections
          </li>
          <li>
            Upload and manage job-related documents such as CVs and cover
            letters
          </li>
          <li>View a timeline and history of their job search activity</li>
        </ul>
        <p>
          The Service is provided as a web application accessible via any modern
          browser. Ascendio is an independent project and is not affiliated with
          any job board, recruiter, or employer.
        </p>
      </>
    ),
  },
  {
    id: "accounts",
    title: "3. User Accounts",
    content: (
      <>
        <h3>3.1 Registration</h3>
        <p>
          To use the Service, you must sign in using a valid Google account via
          Google OAuth. By signing in, you authorize Ascendio to receive your
          name, email address, and profile photo from Google solely for the
          purpose of creating and maintaining your account.
        </p>
        <h3>3.2 Account Responsibility</h3>
        <p>
          You are responsible for maintaining the confidentiality of your
          account and for all activity that occurs under your account. You agree
          to notify us immediately at{" "}
          <a href="mailto:asrorxonovdovudxon@gmail.com">
            asrorxonovdovudxon@gmail.com
          </a>{" "}
          if you suspect any unauthorized access to or use of your account. We
          are not liable for any loss or damage arising from your failure to
          maintain the security of your account.
        </p>
        <h3>3.3 Account Termination by User</h3>
        <p>
          Account self-deletion is not currently available in the Service
          interface but will be added in a future update. In the meantime, if
          you wish to delete your account and all associated data, please
          contact us at{" "}
          <a href="mailto:asrorxonovdovudxon@gmail.com">
            asrorxonovdovudxon@gmail.com
          </a>{" "}
          and we will process your request within a reasonable timeframe.
        </p>
        <h3>3.4 Account Termination by Us</h3>
        <p>
          We reserve the right to suspend or terminate your account at our sole
          discretion, without prior notice, if we believe you have violated
          these Terms, engaged in fraudulent or abusive behavior, or if required
          to do so by law. Upon termination, your right to access the Service
          will immediately cease.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "4. Acceptable Use",
    content: (
      <>
        <h3>4.1 Permitted Use</h3>
        <p>
          You may use the Service solely for lawful, personal, non-commercial
          purposes in accordance with these Terms. You agree to use the Service
          only to track your own job search activity.
        </p>
        <h3>4.2 Prohibited Conduct</h3>
        <p>You agree not to:</p>
        <ul>
          <li>
            Use the Service for any unlawful purpose or in violation of any
            applicable laws or regulations
          </li>
          <li>
            Attempt to gain unauthorized access to any part of the Service, its
            infrastructure, or other users' accounts
          </li>
          <li>
            Introduce any malware, viruses, or other harmful code into the
            Service
          </li>
          <li>
            Scrape, crawl, or systematically extract data from the Service using
            automated tools
          </li>
          <li>
            Reverse engineer, decompile, or disassemble any part of the Service
          </li>
          <li>
            Use the Service to store or transmit content that is defamatory,
            obscene, or otherwise objectionable
          </li>
          <li>
            Impersonate any person or entity or misrepresent your affiliation
            with any person or entity
          </li>
          <li>
            Resell, sublicense, or otherwise commercialize access to the Service
          </li>
        </ul>
        <p>
          Violation of these prohibitions may result in immediate termination of
          your account and, where appropriate, legal action.
        </p>
      </>
    ),
  },
  {
    id: "pricing",
    title: "5. Pricing and Plans",
    content: (
      <>
        <h3>5.1 Free Tier</h3>
        <p>
          Ascendio is currently free to use. All core features are available at
          no cost. We reserve the right to introduce limitations on the free
          tier in the future, with reasonable advance notice to existing users.
        </p>
        <h3>5.2 Paid Plans</h3>
        <p>
          We intend to introduce paid plans in the future that may offer
          additional features, increased storage, or other benefits. When paid
          plans are introduced, they will be clearly described, and no charges
          will be made without your explicit consent.
        </p>
        <h3>5.3 Changes to Pricing</h3>
        <p>
          We reserve the right to modify pricing at any time. If you are on a
          paid plan, we will provide at least 30 days' notice before any price
          increase takes effect. Continued use of the Service after a price
          change constitutes acceptance of the new pricing.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "6. Intellectual Property",
    content: (
      <>
        <h3>6.1 Our Property</h3>
        <p>
          The Service, including its design, code, graphics, interface, and all
          associated content created by us, is the exclusive property of
          Dovudkhon Asrorxonov and is protected by applicable intellectual
          property laws. You may not copy, reproduce, distribute, or create
          derivative works from any part of the Service without our prior
          written consent.
        </p>
        <h3>6.2 Your Content</h3>
        <p>
          You retain full ownership of all data and content you create, upload,
          or submit through the Service, including job application records,
          notes, and documents. By using the Service, you grant us a limited,
          non-exclusive, royalty-free license to store, process, and display
          your content solely as necessary to provide the Service to you.
        </p>
        <p>
          This license does not give us the right to use your content for any
          purpose beyond operating the Service, and it terminates when you
          delete your account or the relevant content.
        </p>
        <h3>6.3 Feedback</h3>
        <p>
          If you provide us with suggestions, feedback, or ideas regarding the
          Service, you grant us the right to use such feedback without
          restriction or compensation to you.
        </p>
      </>
    ),
  },
  {
    id: "privacy",
    title: "7. Privacy",
    content: (
      <p>
        Your use of the Service is also governed by our{" "}
        <Link href="/privacy">Privacy Policy</Link>, which is incorporated into
        these Terms by reference. Please review our Privacy Policy to understand
        our practices regarding the collection, use, and storage of your
        personal data.
      </p>
    ),
  },
  {
    id: "third-party",
    title: "8. Third-Party Services",
    content: (
      <>
        <p>
          The Service relies on third-party infrastructure providers including
          Google (authentication), MongoDB (data storage), Supabase (file
          storage), and Vercel (hosting). Your use of the Service is subject to
          the terms and policies of these providers.
        </p>
        <p>
          We are not responsible for the availability, reliability, or practices
          of any third-party services. Links to third-party websites within the
          Service are provided for convenience only and do not constitute our
          endorsement of those sites or their content.
        </p>
      </>
    ),
  },
  {
    id: "disclaimers",
    title: "9. Disclaimers and Limitation of Liability",
    content: (
      <>
        <h3>9.1 No Warranty</h3>
        <p>
          The Service is provided on an "as is" and "as available" basis,
          without warranties of any kind, either express or implied. We do not
          warrant that the Service will be uninterrupted, error-free, secure, or
          free of viruses or other harmful components. We do not guarantee that
          the Service will meet your requirements or that any errors will be
          corrected.
        </p>
        <h3>9.2 Limitation of Liability</h3>
        <p>
          To the fullest extent permitted by applicable law, we shall not be
          liable for any indirect, incidental, special, consequential, or
          punitive damages, including but not limited to loss of data, loss of
          profits, or loss of opportunity, arising out of or in connection with
          your use of or inability to use the Service, even if we have been
          advised of the possibility of such damages.
        </p>
        <p>
          Our total liability to you for any claim arising out of or relating to
          these Terms or the Service shall not exceed the amount you paid us (if
          any) in the 12 months preceding the claim.
        </p>
        <h3>9.3 Data Loss</h3>
        <p>
          While we take reasonable measures to protect your data, we are not
          liable for any loss or corruption of data. We strongly recommend that
          you maintain your own copies of any important documents or information
          you store in the Service.
        </p>
      </>
    ),
  },
  {
    id: "indemnification",
    title: "10. Indemnification",
    content: (
      <p>
        You agree to indemnify, defend, and hold harmless Dovudkhon Asrorxonov
        and any associated parties from and against any claims, liabilities,
        damages, losses, and expenses (including reasonable legal fees) arising
        out of or in connection with your use of the Service, your violation of
        these Terms, or your violation of any rights of a third party.
      </p>
    ),
  },
  {
    id: "availability",
    title: "11. Service Availability and Modifications",
    content: (
      <>
        <p>
          We reserve the right to modify, suspend, or discontinue the Service
          (or any part thereof) at any time, with or without notice. We will
          make reasonable efforts to provide advance notice of any significant
          changes or interruptions.
        </p>
        <p>
          We are not liable to you or any third party for any modification,
          suspension, or discontinuation of the Service. We may also update
          these Terms from time to time. Material changes will be communicated
          by updating the "Last Updated" date and, where appropriate, by
          notifying you directly.
        </p>
        <p>
          Your continued use of the Service after any changes to these Terms
          constitutes your acceptance of the revised Terms.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "12. Governing Law and Disputes",
    content: (
      <>
        <p>
          These Terms are governed by and construed in accordance with
          applicable laws, without regard to conflict of law principles. Any
          disputes arising out of or relating to these Terms or the Service
          shall first be attempted to be resolved through good-faith negotiation
          between the parties.
        </p>
        <p>
          If a dispute cannot be resolved informally, it shall be subject to the
          exclusive jurisdiction of the courts of competent jurisdiction.
          Nothing in this clause shall prevent either party from seeking
          injunctive or other equitable relief where necessary.
        </p>
      </>
    ),
  },
  {
    id: "severability",
    title: "13. Severability and Entire Agreement",
    content: (
      <>
        <p>
          If any provision of these Terms is found to be invalid, illegal, or
          unenforceable, the remaining provisions shall continue in full force
          and effect. The invalid provision will be modified to the minimum
          extent necessary to make it enforceable.
        </p>
        <p>
          These Terms, together with our Privacy Policy, constitute the entire
          agreement between you and us regarding the Service and supersede all
          prior agreements, representations, and understandings.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "14. Contact Us",
    content: (
      <>
        <p>
          If you have any questions about these Terms or the Service, please
          contact us:
        </p>
        <p>
          <strong>Ascendio — Terms Inquiries</strong>
          <br />
          Email:{" "}
          <a href="mailto:asrorxonovdovudxon@gmail.com">
            asrorxonovdovudxon@gmail.com
          </a>
        </p>
        <p>We aim to respond to all inquiries within 14 business days.</p>
      </>
    ),
  },
];

const TermsPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-size-[28px_28px] mask-[radial-gradient(ellipse_80%_80%_at_50%_0%,#000_40%,transparent_100%)]" />
        <div className="absolute top-0 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full bg-primary opacity-[0.06] blur-[120px]" />
        <div className="absolute top-[20%] left-[5%] h-62.5 w-62.5 rounded-full bg-primary opacity-[0.04] blur-[80px]" />
        <div className="absolute top-[30%] right-[5%] h-62.5 w-62.5 rounded-full bg-primary opacity-[0.04] blur-[80px]" />
      </div>

      <div className="container mx-auto max-w-3xl px-4 py-16">
        {/* Back button */}
        <div className="mb-10">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="-ml-2 text-muted-foreground hover:text-foreground"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Ascendio
            </Link>
          </Button>
        </div>

        {/* Page header */}
        <div className="mb-12">
          <Badge
            variant="outline"
            className="mb-5 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground"
          >
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            Legal
          </Badge>

          <h1 className="mb-4 font-serif text-5xl font-semibold tracking-tight text-balance md:text-6xl">
            Terms of <em className="text-primary italic">Service</em>
          </h1>

          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
            <span>Effective: March 18, 2026</span>
            <span>Last updated: March 18, 2026</span>
          </div>
        </div>

        {/* Intro card */}
        <div className="mb-12 rounded-2xl border border-border/60 bg-muted/20 p-6 text-sm font-light leading-relaxed text-muted-foreground">
          These Terms of Service govern your access to and use of Ascendio, a
          web application for tracking job applications. By accessing or using
          Ascendio, you agree to be bound by these Terms. If you do not agree,
          you may not access or use the Service.
        </div>

        {/* Sections */}
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

        {/* Footer note */}
        <div className="mt-12 rounded-2xl border border-border/60 bg-muted/20 p-6">
          <p className="text-xs italic leading-relaxed text-muted-foreground/70">
            These Terms of Service were prepared for Ascendio, an independent
            web application. They are intended to be fair, clear, and
            transparent. If anything is unclear, please reach out at{" "}
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

export default TermsPage;
