import { LegalShell } from '@/components/legal/legal-shell'

export const metadata = {
  title: 'Terms & Conditions — Beeper',
  description: 'The terms and conditions that govern your use of Beeper.',
}

export default function TermsPage() {
  return (
    <LegalShell
      kicker="TERMS & CONDITIONS"
      title="Terms & Conditions"
      updated="JUNE 8, 2026"
      intro={
        <p>
          These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your access
          to and use of Beeper (&ldquo;Beeper,&rdquo; &ldquo;we,&rdquo;
          &ldquo;us,&rdquo; or &ldquo;our&rdquo;), an async, allowlisted service
          for delegating tasks between two humans&apos; Claude sessions. By
          accessing or using Beeper, you agree to be bound by these Terms. If you
          do not agree, do not use the service.
        </p>
      }
      sections={[
        {
          heading: '1. The service',
          body: (
            <p>
              Beeper lets one person delegate a task (a &ldquo;beep&rdquo;) to
              another person whose host admin has added them to an allowlist. The
              recipient receives an SMS wake signal and picks up the task from
              their queue inside a Claude session. The task payload and audit log
              live in our backend. Beeper is currently offered as a closed beta
              and may change, be limited, or be discontinued at any time.
            </p>
          ),
        },
        {
          heading: '2. Eligibility and accounts',
          body: (
            <p>
              You must be at least 18 years old, or the age of majority in your
              jurisdiction, to use Beeper. You are responsible for the accuracy of
              the information you provide, including your mobile number, and for
              all activity that occurs under your identity. You may only beep
              someone who has added you to their allowlist; requests outside an
              allowlist edge are rejected.
            </p>
          ),
        },
        {
          heading: '3. SMS notifications',
          body: (
            <p>
              By providing your mobile number and joining the service, you consent
              to receive SMS notifications from Beeper. Message frequency varies
              based on how often you are beeped, and message and data rates may
              apply. You can opt out at any time by replying STOP. See our{' '}
              <a
                href="/privacy"
                className="text-[#07c04e] hover:text-white transition-colors underline underline-offset-4"
              >
                Privacy Policy
              </a>{' '}
              for full details about our messaging program and how we handle your
              mobile number.
            </p>
          ),
        },
        {
          heading: '4. Acceptable use',
          body: (
            <>
              <p>You agree not to use Beeper to:</p>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                <li>
                  Send unlawful, harassing, abusive, deceptive, or infringing
                  content.
                </li>
                <li>
                  Beep anyone who has not added you to their allowlist, or attempt
                  to circumvent allowlist controls.
                </li>
                <li>
                  Send unsolicited bulk messages, spam, or promotional content
                  through the SMS channel.
                </li>
                <li>
                  Interfere with, disrupt, or attempt to gain unauthorized access
                  to the service, its infrastructure, or other users&apos; data.
                </li>
                <li>
                  Use the service to violate any applicable law or regulation,
                  including telemarketing and messaging laws.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: '5. Your content',
          body: (
            <p>
              You retain ownership of the task content you send through Beeper. You
              grant us a limited license to store, process, and transmit that
              content as necessary to operate the service, route beeps, and
              maintain audit logs. You are solely responsible for the content you
              send and for ensuring you have the right to send it.
            </p>
          ),
        },
        {
          heading: '6. Service availability',
          body: (
            <p>
              Beeper is provided on an &ldquo;as is&rdquo; and &ldquo;as
              available&rdquo; basis. We do not guarantee that messages will be
              delivered, that delivery will be timely, or that the service will be
              uninterrupted or error-free. SMS delivery depends on carriers and
              third-party providers that are outside our control.
            </p>
          ),
        },
        {
          heading: '7. Disclaimers',
          body: (
            <p>
              To the fullest extent permitted by law, Beeper disclaims all
              warranties, express or implied, including warranties of
              merchantability, fitness for a particular purpose, and
              non-infringement. You use the service at your own risk.
            </p>
          ),
        },
        {
          heading: '8. Limitation of liability',
          body: (
            <p>
              To the fullest extent permitted by law, Beeper and its operators
              will not be liable for any indirect, incidental, special,
              consequential, or punitive damages, or for any loss of data,
              messages, or profits, arising out of or related to your use of the
              service, even if advised of the possibility of such damages.
            </p>
          ),
        },
        {
          heading: '9. Termination',
          body: (
            <p>
              We may suspend or terminate your access to Beeper at any time, with
              or without notice, including for violation of these Terms. You may
              stop using the service at any time and may opt out of SMS messages by
              replying STOP.
            </p>
          ),
        },
        {
          heading: '10. Changes to these Terms',
          body: (
            <p>
              We may update these Terms from time to time. When we do, we will
              revise the &ldquo;Last updated&rdquo; date above. Your continued use
              of Beeper after changes take effect constitutes acceptance of the
              updated Terms.
            </p>
          ),
        },
        {
          heading: '11. Contact us',
          body: (
            <p>
              Questions about these Terms? Email us at{' '}
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
