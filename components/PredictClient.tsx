"use client";

import { useState } from "react";
import CategoryCard from "@/components/CategoryCard";
import { savePredictions } from "@/app/actions/savePredictions";

interface Nominee {
  id: string;
  name: string;
  winner?: boolean;
}

interface Category {
  id: string;
  name: string;
  nominees: Nominee[];
}

interface Props {
  categories?: Category[];
  eventId: string;
  userId: string;
  initialSelections?: Record<string, string>;
}

export default function PredictClient({
  categories = [],
  eventId,
  userId,
  initialSelections = {},
}: Props) {
  const [selected, setSelected] = useState<Record<string, string>>(initialSelections || {});
  const [loading, setLoading] = useState(false);

  const handleSelect = (categoryId: string, nomineeId: string) => {
    setSelected((prev) => ({
      ...prev,
      [categoryId]: nomineeId,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    const selections = Object.entries(selected).map(
      ([categoryId, nomineeId]) => ({
        categoryId,
        nomineeId,
      })
    );

    try {
      await savePredictions(userId, eventId, selections);
      alert("Predictions saved!");
    } catch (err) {
      alert("Error saving predictions");
    }

    setLoading(false);
  };

  return (
    <div className="space-y-10">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          selected={selected[category.id]}
          onSelect={(nomineeId) =>
            handleSelect(category.id, nomineeId)
          }
        />
      ))}

      <div className="flex justify-center pt-10">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-10 py-4 rounded-full bg-gradient-to-r from-yellow-500 to-amber-400 text-black font-bold text-lg shadow-xl hover:scale-105 transition"
        >
          {loading ? "Saving..." : Object.keys(initialSelections || {}).length > 0 ? "Save Changes" : "Submit Predictions"}
        </button>
      </div>
    </div>
  );
}