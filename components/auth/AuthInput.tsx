"use client";

type Props = {
  type: "email" | "password";
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export function AuthInput({ type, placeholder, value, onChange }: Props) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full rounded-lg bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}