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
  points: number;
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

  // Calculate progress for BallotHeader
  const selectedCount = Object.keys(predictions).length;
  const progress = (selectedCount / categories.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100">
      <div className="relative mx-auto max-w-4xl px-6 py-16">
        <BallotHeader
          progress={progress}
          selectedCount={selectedCount}
          totalCategories={categories.length}
        />

        <div className="mt-12 space-y-10">
          {categories.map((category, index) => (  // ✅ Add index here
            <CategoryCard
              key={category.id}
              category={category}
              index={index}  // ✅ Pass the index prop
              selectedNomineeId={predictions[category.id]}
              onSelect={(nomineeId) => handleSelect(category.id, nomineeId)}
            />
          ))}
        </div>

        <SubmitBar onSubmit={handleSubmit} />
      </div>
    </div>
  );
}