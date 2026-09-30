"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { validateEmail, validateName, validatePassword } from "@/lib/validation";
import { AuthHeading, AuthSuccess } from "./AuthHeading";
import { TextField } from "./TextField";
import { useAuthForm } from "./useAuthForm";

export function RegisterForm() {
  const { errors, status, handleSubmit, clearError } = useAuthForm({
    name: validateName,
    email: validateEmail,
    password: validatePassword,
  });

  if (status === "success")
    return <AuthSuccess title="Account created!" message="Welcome to ByteSpace. Your learning journey starts now." />;

  return (
    <div className="flex flex-col xl:min-h-[672px]">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-10">
        <AuthHeading eyebrow="Create an Account" title="Welcome to ByteSpace" />
        <div className="flex flex-col gap-6">
          <TextField
            label="Full Name"
            name="name"
            autoComplete="name"
            placeholder="Jamie Davis"
            error={errors.name}
            onChange={() => clearError("name")}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="designer@example.com"
            error={errors.email}
            onChange={() => clearError("email")}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="********"
            error={errors.password}
            onChange={() => clearError("password")}
          />
          <Button type="submit" disabled={status === "submitting"} className="self-end disabled:opacity-60">
            {status === "submitting" ? "Creating…" : "Continue"}
          </Button>
        </div>
      </form>

      <p className="mt-12 text-center type-body-m text-gray-700 xl:mt-auto">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-800 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
