export type FieldErrors<T extends string> = Partial<Record<T, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(value: string) {
  if (!value.trim()) return "Email is required.";
  if (!EMAIL.test(value.trim())) return "Enter a valid email address.";
}

export function validatePassword(value: string) {
  if (!value) return "Password is required.";
  if (value.length < 8) return "Password must be at least 8 characters.";
}

export function validateName(value: string) {
  if (!value.trim()) return "Full name is required.";
  if (value.trim().length < 2) return "Full name looks too short.";
}
