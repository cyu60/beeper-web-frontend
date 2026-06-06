export type ChatTurn =
  | { side: 'out'; text: string; sender?: string }
  | { side: 'in'; text: string; sender?: string; mono?: boolean }
  | { side: 'in'; cardTitle: string; text: string }
  | { side: 'sys'; text: string }

export type Feature = {
  id: string
  title: string
  turns: ChatTurn[]
}

export const FEATURES: Feature[] = [
  {
    id: 'delegate-while-they-sleep',
    title: 'Delegate while they sleep',
    turns: [
      { side: 'out', sender: 'chinat', text: 'claude, beep jeffrey to check the staging deploy when he\'s back' },
      { side: 'in', text: '✓ queued (b_8a3f). jeffrey will be notified by sms.' },
      { side: 'sys', text: '⏰ 9 hours later' },
      { side: 'out', sender: 'jeffrey', text: '/beeper-v2' },
      {
        side: 'in',
        cardTitle: 'INBOX · 1 BEEP',
        text: 'b_8a3f  · from chinat\n        · "check the staging deploy"',
      },
      { side: 'out', sender: 'jeffrey', text: 'claude, take it' },
      { side: 'in', text: '✓ staging looks healthy. 14 prs merged overnight, no rollbacks. closed the beep with the summary.' },
    ],
  },
  {
    id: 'text-is-the-wake-signal',
    title: 'Text is the wake signal',
    turns: [
      { side: 'in', text: '📟 New beep from chinat — reply YES to handle, or open Beeper for the full thread.' },
      { side: 'out', sender: 'jeffrey', text: 'yes' },
      { side: 'in', text: 'beep accepted. waking your claude now…' },
      { side: 'sys', text: '── 11 seconds later ──' },
      { side: 'in', text: 'claude is on it. you can keep doing whatever you were doing.' },
    ],
  },
  {
    id: 'slash-commands-inbox',
    title: 'Slash commands are the inbox',
    turns: [
      { side: 'out', sender: 'jeffrey', text: '/beeper-v2' },
      {
        side: 'in',
        cardTitle: 'INBOX · 2 BEEPS',
        text: 'b_8a3f  · chinat  → staging deploy\nb_2f1c  · kaan    → review PR #847',
      },
      { side: 'out', sender: 'jeffrey', text: '/beeper-v2 reply b_8a3f "done, staging is green"' },
      { side: 'in', text: '✓ sent. chinat was notified.' },
      { side: 'out', sender: 'jeffrey', text: '/beeper-v2 decline b_2f1c "not my repo, ask edward"' },
      { side: 'in', text: '✓ declined. kaan was notified with your reason.' },
    ],
  },
  {
    id: 'allowlist-only',
    title: 'Allowlist only',
    turns: [
      { side: 'out', sender: 'stranger', text: '/beeper-v2 send jeffrey "urgent — review my pr"' },
      {
        side: 'in',
        text: '✗ 403 not_allowed. you are not on jeffrey\'s allowlist.',
      },
      { side: 'in', text: 'ask jeffrey (or chinat as host admin) to add you, then try again.' },
      { side: 'sys', text: '── jeffrey opens the web admin ──' },
      {
        side: 'in',
        cardTitle: 'ALLOWLIST · 3 SENDERS',
        text: 'chinat     · added 14d ago\nkaan       · added 14d ago\nedward     · added  9d ago',
      },
    ],
  },
  {
    id: 'reply-by-sms',
    title: 'Reply by SMS, no Claude needed',
    turns: [
      { side: 'out', sender: 'chinat', text: '/beeper-v2 send jeffrey "what version of node is staging on?"' },
      { side: 'in', text: '✓ queued (b_4c2e). jeffrey was notified.' },
      { side: 'sys', text: '── jeffrey gets a text ──' },
      { side: 'in', text: '📟 chinat: "what version of node is staging on?" — reply REPLY b_4c2e <text> or DECLINE b_4c2e <reason>' },
      { side: 'out', sender: 'jeffrey', text: 'REPLY b_4c2e node 22, just bumped from 20' },
      { side: 'in', text: '✓ closed. chinat was notified of your reply.' },
    ],
  },
]
