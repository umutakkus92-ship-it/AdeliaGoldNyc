"use client";

import { useActionState } from "react";
import { subscribe, type SubscribeState } from "@/app/actions/newsletter";

export function NewsletterForm() {
  const [state, action, pending] = useActionState<SubscribeState, FormData>(subscribe, { message: "" });
  return (
    <>
      <form action={action} noValidate>
        <input type="email" name="email" placeholder="Email address" aria-label="Email address" autoComplete="email" maxLength={254} required />
        {/* honeypot: real visitors never fill this in */}
        <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: -9999 }} />
        <button disabled={pending}>{pending ? "…" : "Subscribe"}</button>
      </form>
      <p className="note" style={{ marginTop: 12 }}>
        By subscribing you agree to receive marketing emails from Adelia. Unsubscribe anytime.
      </p>
      <div className="ok" aria-live="polite">
        {state.message}
      </div>
    </>
  );
}
