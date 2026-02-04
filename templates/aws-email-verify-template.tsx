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

export const AWSVerifyEmail = ({
  verificationCode,
}: {
  verificationCode: string;
}) => {
  return (
    <Html>
      <Head />
      <Preview>AWS Email Verification</Preview>
      <Tailwind>
        <Body className="bg-white font-aws text-[#212121]">
          <Container className="p-5 mx-auto bg-[#eee]">
            <Section className="bg-white">
              <Section className="py-6.25 px-8.75">
                <Heading className="text-[#333] text-[20px] font-bold mb-3.75">
                  Verify your email address
                </Heading>
                <Text className="text-[#333] text-[14px] leading-[24px] mt-6 mb-[14px] mx-0">
                  Thanks for starting the new AWS account creation process. We
                  want to make sure it's really you. Please enter the following
                  verification code when prompted. If you don&apos;t want to
                  create an account, you can ignore this message.
                </Text>
                <Section className="flex items-center justify-center">
                  <Text className="text-[#333] m-0 font-bold text-center text-[14px]">
                    Verification code
                  </Text>

                  <Text className="text-[#333] text-[36px] my-[10px] mx-0 font-bold text-center">
                    {verificationCode}
                  </Text>
                  <Text className="text-[#333] text-[14px] m-0 text-center">
                    (This code is valid for 10 minutes)
                  </Text>
                </Section>
              </Section>
              <Hr />
              <Section className="py-[25px] px-[35px]">
                <Text className="text-[#333] text-[14px] m-0">
                  Amazon Web Services will never email you and ask you to
                  disclose or verify your password, credit card, or banking
                  account number.
                </Text>
              </Section>
            </Section>
            <Text className="text-[#333] text-[12px] my-[24px] mx-0 px-5 py-0">
              This message was produced and distributed by Amazon Web Services,
              Inc., 410 Terry Ave. North, Seattle, WA 98109. © 2022, Amazon Web
              Services, Inc.. All rights reserved. AWS is a registered trademark
              of{" "}
              <Link
                href="https://amazon.com"
                target="_blank"
                className="text-[#2754C5] underline text-[14px]"
              >
                Amazon.com
              </Link>
              , Inc. View our{" "}
              <Link
                href="https://amazon.com"
                target="_blank"
                className="text-[#2754C5] underline text-[14px]"
              >
                privacy policy
              </Link>
              .
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
