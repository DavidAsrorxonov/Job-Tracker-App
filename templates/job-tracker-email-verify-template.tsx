import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export const JobTrackerVerifyEmail = ({
  verificationCode,
}: {
  verificationCode: string;
}) => {
  return (
    <Html>
      <Head />
      <Preview>Verify your email for Job Tracker</Preview>

      <Tailwind>
        <Body className="bg-[#0B0F14] font-sans text-white">
          <Container className="mx-auto my-10 w-full max-w-[520px] px-4">
            <Section className="rounded-2xl border border-white/10 bg-[#0E1520] shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
              <Section className="px-8 pt-8">
                <Text className="m-0 text-xs font-medium tracking-wide text-white/60">
                  JOB TRACKER
                </Text>
                <Heading className="m-0 mt-2 text-[22px] font-semibold text-white">
                  Verify your email address
                </Heading>
                <Text className="m-0 mt-3 text-[14px] leading-[22px] text-white/70">
                  Thanks for signing up for Job Tracker. Enter the verification
                  code below to confirm it’s really you. If you didn’t create an
                  account, you can safely ignore this email.
                </Text>
              </Section>

              <Section className="px-8 pt-6">
                <Section className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-6 py-5 text-center">
                  <Text className="m-0 text-[12px] font-medium text-emerald-200/90">
                    Verification code
                  </Text>

                  <Text className="m-0 mt-2 text-[36px] font-semibold tracking-[0.35em] text-white">
                    {verificationCode}
                  </Text>

                  <Text className="m-0 mt-2 text-[12px] text-white/60">
                    This code is valid for 20 minutes.
                  </Text>
                </Section>
              </Section>

              <Hr className="my-8 border-white/10" />

              <Section className="px-8 pb-8">
                <Text className="m-0 text-[12px] leading-[18px] text-white/55">
                  For your security, Job Tracker will never ask you to disclose
                  your password or payment details by email.
                </Text>

                <Text className="m-0 mt-4 text-[12px] text-white/45">
                  Need help?{" "}
                  <Link
                    href="https://example.com"
                    target="_blank"
                    className="text-emerald-300 underline"
                  >
                    Contact support
                  </Link>
                  .
                </Text>
              </Section>
            </Section>

            <Text className="m-0 mt-6 text-center text-[11px] text-white/35">
              © {new Date().getFullYear()} Job Tracker. All rights reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
