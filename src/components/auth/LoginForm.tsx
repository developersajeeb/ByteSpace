"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { validateEmail, validatePassword } from "@/lib/validation";
import { AuthHeading, AuthSuccess } from "./AuthHeading";
import { TextField } from "./TextField";
import { useAuthForm } from "./useAuthForm";

const socials = [
  { name: "Facebook", icon: "/svg/social-facebook.svg" },
  { name: "Google", icon: "/svg/social-google.svg" },
];

export function LoginForm() {
  const { errors, status, handleSubmit, clearError } = useAuthForm({ email: validateEmail, password: validatePassword });

  if (status === "success") return <AuthSuccess title="Welcome back!" message="You're signed in. Continue learning where you left off." />;

  return (
    <div className="flex flex-col lg:min-h-[683px]">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-10">
        <AuthHeading eyebrow="Sign In" title="Welcome Back" />
        <div className="flex flex-col gap-6">
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
            autoComplete="current-password"
            placeholder="********"
            error={errors.password}
            onChange={() => clearError("password")}
          />
          <Button type="submit" disabled={status === "submitting"} className="self-end disabled:opacity-60">
            {status === "submitting" ? "Signing In…" : "Sign In"}
          </Button>
        </div>
      </form>

      <div className="mt-12 flex flex-col items-center gap-10 lg:mt-[73px]">
        <div className="flex w-full items-center gap-[11px]" role="separator">
          <span className="h-px flex-1 bg-neutral-200 sm:w-[200px] sm:flex-none" />
          <span className="type-body-l text-neutral-400">or</span>
          <span className="h-px flex-1 bg-neutral-200 sm:w-[200px] sm:flex-none" />
        </div>
        <div className="flex gap-4">
          {socials.map((s) => (
            <button
              key={s.name}
              type="button"
              aria-label={`Sign in with ${s.name}`}
              className="flex size-[72px] items-center justify-center rounded-3xl border border-neutral-200 transition-colors hover:bg-gray-50"
            >
              <Image src={s.icon} alt="" width={40} height={40} />
            </button>
          ))}
        </div>
      </div>

      <p className="mt-12 text-center type-body-m text-neutral-400 lg:mt-auto">
        New user?{" "}
        <Link href="/register" className="text-blue-800 hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
