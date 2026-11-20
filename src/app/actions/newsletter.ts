"use server";

import { z } from "zod";
import { prisma } from "@/lib/db";

export interface SubscribeState {
  message: string;
  ok?: boolean;
}

const Email = z.string().trim().toLowerCase().email().max(254);

export async function subscribe(_prev: SubscribeState, form: FormData): Promise<SubscribeState> {
  if (form.get("company")) return { message: "Thank you — you’re on the list.", ok: true }; // bot: pretend success
  const parsed = Email.safeParse(form.get("email"));
  if (!parsed.success) return { message: "Enter a valid email address, like name@example.com." };
  try {
    await prisma.newsletterSubscriber.upsert({
      where: { email: parsed.data },
      update: { unsubscribedAt: null },
      create: { email: parsed.data, source: "homepage" },
    });
  } catch (e) {
    console.error("newsletter.subscribe", e);
    return { message: "Something went wrong — please try again in a moment." };
  }
  return { message: "Thank you — you’re on the list.", ok: true };
}
