export type Urgency = "low" | "normal" | "high";

export type BeepStatus = "queued" | "replied" | "declined";

export type Beep = {
  id: string;
  from: string;
  to: string;
  createdAt: string;
  task: string;
  urgency: Urgency;
  status: BeepStatus;
  reply?: string;
  closedAt?: string;
  transcriptRequested?: boolean;
};

export const RECIPIENTS = [
  { id: "jeffrey", label: "JEFFREY" },
  { id: "edward", label: "EDWARD" },
  { id: "kaan", label: "KAAN" },
  { id: "chinat", label: "CHINAT" },
];

export const INBOX_BEEPS: Beep[] = [
  {
    id: "beep-a44175",
    from: "jeffrey",
    to: "chinat",
    createdAt: "2026-05-31T10:42:00Z",
    task: "what columns are in judges_v2 right now, including any local migrations you haven't pushed?",
    urgency: "high",
    status: "queued",
    transcriptRequested: true,
  },
  {
    id: "beep-5c7562",
    from: "edward",
    to: "chinat",
    createdAt: "2026-05-31T09:15:00Z",
    task: "can you confirm the dispatch demo deploy URL is the staging vercel and not prod? trying to send it to a partner.",
    urgency: "normal",
    status: "queued",
  },
  {
    id: "beep-7f3a2c",
    from: "jeffrey",
    to: "chinat",
    createdAt: "2026-05-31T08:03:00Z",
    task: "multiple failed auth attempts detected on gateway B. source IP flagged. review logs for potential brute force vector.",
    urgency: "high",
    status: "queued",
  },
  {
    id: "beep-91b042",
    from: "edward",
    to: "chinat",
    createdAt: "2026-05-30T22:11:00Z",
    task: "etl job timeout on Table_Users_Agg. retrying in 300s. please verify upstream database connectivity.",
    urgency: "low",
    status: "queued",
  },
];

export const SENT_BEEPS: Beep[] = [
  {
    id: "beep-b81ac6",
    from: "chinat",
    to: "jeffrey",
    createdAt: "2026-05-31T07:30:00Z",
    task: "Server overload detected on cluster 4. Auto-scaling initiated. Please review telemetry logs.",
    urgency: "normal",
    status: "replied",
    reply: "telemetry checked, cluster stable now. logs at ~/dispatch/logs/cluster4-20260531.log",
    closedAt: "2026-05-31T07:55:00Z",
  },
  {
    id: "beep-5f34c6",
    from: "chinat",
    to: "jeffrey",
    createdAt: "2026-05-31T06:14:00Z",
    task: "Deployment pipeline failed at build step 4b. Reverting to previous stable commit.",
    urgency: "high",
    status: "queued",
  },
  {
    id: "beep-0878c7",
    from: "chinat",
    to: "edward",
    createdAt: "2026-05-30T20:20:00Z",
    task: "what's in your ~/codeDev directory right now? quick ls -la of the top level is enough.",
    urgency: "low",
    status: "replied",
    reply:
      "heads up: ~/codeDev does not exist on my machine; my repos are under ~/Desktop (beeper, dispatch, dispatch_demo).",
    closedAt: "2026-05-30T20:30:00Z",
  },
  {
    id: "beep-d10e44",
    from: "chinat",
    to: "edward",
    createdAt: "2026-05-30T15:02:00Z",
    task: "Requesting immediate manual override for schema migration lock on staging db.",
    urgency: "high",
    status: "declined",
    reply: "can't override safely without DBA sign-off — pinging Jeff instead.",
    closedAt: "2026-05-30T15:18:00Z",
  },
  {
    id: "beep-7c9a31",
    from: "chinat",
    to: "kaan",
    createdAt: "2026-05-30T11:00:00Z",
    task: "Routine maintenance window closing in 15 minutes. Final checks required.",
    urgency: "normal",
    status: "queued",
  },
];

export function formatTime(iso: string): string {
  const date = new Date(iso);
  const now = new Date("2026-05-31T12:00:00Z");
  const sameDay = date.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (sameDay) {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }
  if (isYesterday) return "YESTERDAY";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase();
}
