"use client";

import React, { useState } from "react";
import NeonButton from "@/components/ui/NeonButton";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message }),
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-semibold text-muted" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-foreground outline-none focus:border-neon-red/50"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-muted" htmlFor="phone">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          inputMode="tel"
          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-foreground outline-none focus:border-neon-red/50"
          placeholder="WhatsApp / Mobile number"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-muted" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-foreground outline-none focus:border-neon-red/50"
          placeholder="Tell us your goal (fat loss, muscle gain, strength...)"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          {status === "idle" && "We respond quickly during business hours."}
          {status === "submitting" && "Sending your request..."}
          {status === "sent" && "Thanks! We’ll contact you soon."}
          {status === "error" && "Something went wrong. Please try again."}
        </p>

        <NeonButton
          type="submit"
          variant="primary"
          size="lg"
          className="w-full sm:w-auto"
        >
          {status === "submitting" ? "Submitting..." : "Send Message"}
        </NeonButton>
      </div>
    </form>
  );
}

