"use client";

import { useState, type FormEvent } from "react";
import type { FieldErrors } from "@/lib/validation";

type Validators<T extends string> = Record<T, (value: string) => string | undefined>;

/**
 * Client-side validation for the auth forms. There is no backend in this project,
 * so a valid submit just switches the form into its "success" state.
 */
export function useAuthForm<T extends string>(validators: Validators<T>) {
  const [errors, setErrors] = useState<FieldErrors<T>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: FieldErrors<T> = {};
    for (const field of Object.keys(validators) as T[]) {
      const error = validators[field](String(data.get(field) ?? ""));
      if (error) next[field] = error;
    }
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 600));
    setStatus("success");
  }

  const clearError = (field: T) => setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));

  return { errors, status, handleSubmit, clearError };
}
