"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "done">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.currentTarget.reset();
    setStatus("done");
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:gap-6">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          placeholder="Enter your email"
          className="h-[52px] w-full rounded-full border border-gray-200 bg-white px-6 type-body-m text-gray-950 outline-none placeholder:text-gray-950 focus:border-blue-800 sm:w-[376px]"
        />
        <Button type="submit" className="h-[46px] w-full sm:w-[104px]">
          Search
        </Button>
      </form>
      <p className="max-w-[504px] type-body-xs text-gray-950" aria-live="polite">
        {status === "done"
          ? "Thanks for subscribing! Watch your inbox for our next update."
          : "By subscribing, you agree to our Privacy Policy and consent to receive updates from our company."}
      </p>
    </div>
  );
}
