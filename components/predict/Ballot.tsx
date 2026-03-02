"use client";

import { useState } from "react";
import { BallotHeader } from "./BallotHeader";
import { CategoryCard } from "./CategoryCard";
import { SubmitBar } from "./SubmitBar";

type Nominee = {
  id: string;
  name: string;
  winner: boolean;
};

type Category = {
  id: string;
  name: string;
  nominees: Nominee[];
};

type Props = {
  eventName: string;
  eventYear: number;
  categories: Category[];
};

export function Ballot({ eventName, eventYear, categories }: Props) {
  const [predictions, setPredictions] = useState<Record<string, string>>({});

  const handleSelect = (categoryId: string, nomineeId: string) => {
    setPredictions((prev) => ({
      ...prev,
      [categoryId]: nomineeId,
    }));
  };

  const handleSubmit = () => {
    console.log("Predictions:", predictions);
    // Later: send to Supabase
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100">
      <div className="relative mx-auto max-w-4xl px-6 py-16">
        <BallotHeader
          title={eventName}
          subtitle={`${eventYear} Official Prediction Ballot`}
        />

        <div className="mt-12 space-y-10">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              selected={predictions[category.id]}
              onSelect={handleSelect}
            />
          ))}
        </div>

        <SubmitBar onSubmit={handleSubmit} />
      </div>
    </div>
  );
}