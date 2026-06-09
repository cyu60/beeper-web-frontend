import { LegalShell } from '@/components/legal/legal-shell'

export const metadata = {
  title: 'Privacy Policy — Beeper',
  description:
    'How Beeper collects, uses, and protects your information, including our SMS messaging and mobile number practices.',
}

export default function PrivacyPage() {
  return (
    <LegalShell
      kicker="PRIVACY POLICY"
      title="Privacy Policy"
      updated="JUNE 8, 2026"
      intro={
        <p>
          This Privacy Policy describes how Beeper (&ldquo;Beeper,&rdquo;
          &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects,
          uses, and protects information when you use the Beeper service, our
          website, and our SMS notifications. By using Beeper you agree to the
          practices described here.
        </p>
      }
      sections={[
        {
          heading: 'Information we collect',
          body: (
            <>
              <p>
                We collect the information you provide to set up and operate your
                Beeper account, including your name or handle, mobile phone
                number, and the allowlist relationships you configure. We also
                collect the contents of the tasks (&ldquo;beeps&rdquo;) you send
                and receive, along with the metadata needed to route and audit
                them — sender, recipient, timestamps, and delivery status.
              </p>
              <p>
                Your local identity is stored on your own device. We keep a
                server-side mapping of identity to mobile number solely so we can
                route SMS notifications to the right person.
              </p>
            </>
          ),
        },
        {
          heading: 'How we use your information',
          body: (
            <p>
              We use your information to deliver the core Beeper service: routing
              beeps between allowlisted users, sending the SMS wake signal that
              notifies a recipient, maintaining an audit log of activity, and
              keeping the service secure. We do not use your information for
              third-party advertising.
            </p>
          ),
        },
        {
          heading: 'SMS messaging program',
          body: (
            <>
              <p>
                Beeper uses SMS text messaging (delivered via our messaging
                provider, Twilio) as the notification channel for the service.
                When someone on your allowlist sends you a beep, we send a text
                message to the mobile number associated with your account to let
                you know there is a task waiting in your queue. You opt in to
                these messages when you provide your mobile number and request to
                be added to the service.
              </p>
              <p>
                <strong className="text-white">Message frequency:</strong>{' '}
                Message frequency varies. You will generally receive one SMS
                message each time an allowlisted sender beeps you, plus occasional
                transactional messages related to your account (for example,
                verification or service notices). On average, recipients receive
                a small number of messages per week, but the exact frequency
                depends on how often you are beeped.
              </p>
              <p>
                <strong className="text-white">
                  Message and data rates may apply.
                </strong>{' '}
                Beeper does not charge for SMS messages, but your mobile carrier&apos;s
                standard message and data rates may apply to messages you send and
                receive. Please contact your wireless provider for details about
                your plan.
              </p>
              <p>
                You can opt out of SMS messages at any time by replying{' '}
                <strong className="text-white">STOP</strong> to any message. After
                you reply STOP, we will stop sending you SMS notifications. Reply{' '}
                <strong className="text-white">HELP</strong> for help, or email us
                at{' '}
                <a
                  href="mailto:chinatchinat123@gmail.com"
                  className="text-[#07c04e] hover:text-white transition-colors underline underline-offset-4"
                >
                  chinatchinat123@gmail.com
                </a>
                . Carriers are not liable for delayed or undelivered messages.
              </p>
            </>
          ),
        },
        {
          heading: 'Mobile numbers are never shared',
          body: (
            <p>
              <strong className="text-white">
                We do not share, sell, rent, lease, or otherwise disclose your
                mobile phone number or your SMS opt-in / consent to any third
                parties or affiliates for their marketing or promotional purposes.
              </strong>{' '}
              Your mobile number is used only to operate the Beeper service and is
              shared only with the messaging provider (Twilio) that delivers your
              text messages on our behalf, and only as needed to send those
              messages. No mobile information is shared with third parties for any
              other purpose.
            </p>
          ),
        },
        {
          heading: 'How we share information',
          body: (
            <p>
              Beep contents are visible only across the two-party allowlist edge:
              the sender and the intended recipient. We never share queue contents
              with anyone outside that edge. We use a limited set of service
              providers (such as our hosting platform and our SMS provider) to
              run the service, and they may process information only on our
              instructions. We may disclose information if required by law or to
              protect the rights, safety, and security of Beeper and its users.
            </p>
          ),
        },
        {
          heading: 'Data retention and security',
          body: (
            <p>
              We retain account information and beep history for as long as your
              account is active or as needed to provide the service and meet legal
              obligations. We use reasonable administrative and technical
              safeguards to protect your information, including signing every beep
              by sender and scoping it to its recipient. No method of transmission
              or storage is completely secure, however, and we cannot guarantee
              absolute security.
            </p>
          ),
        },
        {
          heading: 'Your choices',
          body: (
            <p>
              You can stop receiving SMS notifications at any time by replying
              STOP. You may request access to, correction of, or deletion of your
              account information by contacting us. Removing yourself from the
              service will end SMS routing to your number.
            </p>
          ),
        },
        {
          heading: 'Changes to this policy',
          body: (
            <p>
              We may update this Privacy Policy from time to time. When we do, we
              will revise the &ldquo;Last updated&rdquo; date above. Continued use
              of Beeper after changes take effect constitutes acceptance of the
              updated policy.
            </p>
          ),
        },
        {
          heading: 'Contact us',
          body: (
            <p>
              Questions about this Privacy Policy or your information? Email us at{' '}
              <a
                href="mailto:chinatchinat123@gmail.com"
                className="text-[#07c04e] hover:text-white transition-colors underline underline-offset-4"
              >
                chinatchinat123@gmail.com
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  )
}
