"use client";

type Props = {
  title: string;
  subtitle: string;
};

export function BallotHeader({ title, subtitle }: Props) {
  return (
    <header className="text-center">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="mt-2 text-lg text-zinc-400">{subtitle}</p>
    </header>
  );
}