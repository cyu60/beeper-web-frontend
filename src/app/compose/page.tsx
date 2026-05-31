"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RECIPIENTS, type Urgency } from "@/lib/mock-beeps";

const URGENCY: { key: Urgency; label: string }[] = [
  { key: "low", label: "L" },
  { key: "normal", label: "N" },
  { key: "high", label: "H" },
];

export default function ComposePage() {
  const router = useRouter();
  const [recipient, setRecipient] = useState(RECIPIENTS[0].id);
  const [urgency, setUrgency] = useState<Urgency>("normal");
  const [task, setTask] = useState("");
  const [requestTranscript, setRequestTranscript] = useState(false);

  const onSend = () => {
    if (!task.trim()) return;
    // Mock: log and route to /sent (no backend yet).
    console.log("would send beep", {
      to: recipient,
      urgency,
      task,
      requestTranscript,
    });
    router.push("/sent");
  };

  return (
    <main className="flex-1 w-full max-w-3xl mx-auto p-container-margin md:py-8 flex flex-col">
      <div className="flex items-center justify-between border-b border-surface-container-high pb-4 mb-6">
        <h1 className="font-display text-display text-primary tracking-tight flex items-center gap-3">
          <span className="text-xl">📟</span> COMPOSE
        </h1>
        <Link
          href="/inbox"
          className="font-label-caps text-label-caps text-secondary hover:text-primary uppercase"
        >
          Cancel
        </Link>
      </div>

      <form
        className="flex flex-col gap-5 flex-1"
        onSubmit={(e) => {
          e.preventDefault();
          onSend();
        }}
      >
        <div className="flex flex-col gap-1">
          <label
            className="font-label-caps text-label-caps text-secondary"
            htmlFor="recipient"
          >
            RECIPIENT
          </label>
          <select
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="brutalist-select brutalist-input w-full border border-outline bg-surface-container-lowest px-gutter py-2 font-data-value text-data-value text-on-surface cursor-pointer"
          >
            {RECIPIENTS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-label-caps text-label-caps text-secondary">
            URGENCY
          </span>
          <div className="flex border border-outline w-fit bg-surface-container-lowest">
            {URGENCY.map((u, i) => {
              const active = urgency === u.key;
              return (
                <button
                  key={u.key}
                  type="button"
                  onClick={() => setUrgency(u.key)}
                  className={`w-12 py-1.5 font-data-value text-data-value ${
                    i < URGENCY.length - 1 ? "border-r border-outline" : ""
                  } ${
                    active
                      ? "bg-primary text-on-primary"
                      : "text-on-surface hover:bg-surface-container"
                  }`}
                >
                  {u.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-1 flex-1 min-h-[240px]">
          <label
            htmlFor="task_body"
            className="font-label-caps text-label-caps text-secondary"
          >
            TASK
          </label>
          <textarea
            id="task_body"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="brutalist-input w-full flex-1 border border-outline bg-surface-container-lowest p-3 font-code-sm text-code-sm text-on-surface resize-none leading-relaxed placeholder:text-outline/50"
            placeholder={"> Enter task directives...\n> Strict formatting required..."}
          />
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={requestTranscript}
            onChange={(e) => setRequestTranscript(e.target.checked)}
            className="border border-outline w-4 h-4 accent-primary"
          />
          <span className="font-label-caps text-label-caps text-on-surface-variant">
            REQUEST TRANSCRIPT
          </span>
        </label>

        <div className="mt-4 flex justify-end border-t border-surface-container-high pt-5">
          <button
            type="submit"
            disabled={!task.trim()}
            className="bg-primary text-on-primary font-label-caps text-label-caps px-8 py-3 hover:bg-surface-tint active:bg-on-surface disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
          >
            SEND
            <span
              className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform"
              aria-hidden
            >
              send
            </span>
          </button>
        </div>
      </form>
    </main>
  );
}
