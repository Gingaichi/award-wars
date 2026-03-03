"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BallotHeader } from "./predict/BallotHeader";
import { CategoryCard } from "./predict/CategoryCard";
import { BallotFooter } from "./predict/BallotFooter";
import { SuccessModal } from "./predict/SuccessModal";
import { LoadingState } from "./predict/LoadingState";
import { Film, Award, TrendingUp } from "lucide-react";

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

interface PredictClientProps {
  categories: Category[];
  eventId: string;
  userId: string;
  initialSelections: Record<string, string>;
}

export default function PredictClient({ 
  categories, 
  eventId, 
  userId, 
  initialSelections 
}: PredictClientProps) {
  const router = useRouter();
  const [selections, setSelections] = useState<Record<string, string>>(initialSelections);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const selectedCount = Object.keys(selections).length;
    setProgress((selectedCount / categories.length) * 100);
  }, [selections, categories.length]);

  const handleSelect = (categoryId: string, nomineeId: string) => {
    setSelections(prev => ({
      ...prev,
      [categoryId]: prev[categoryId] === nomineeId ? "" : nomineeId
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/predictions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          userId,
          selections,
        }),
      });

      if (response.ok) {
        setSaveSuccess(true);
        setShowSuccessModal(true);
        setTimeout(() => {
          router.push("/leagues");
        }, 3000);
      }
    } catch (error) {
      console.error("Failed to save predictions:", error);
    } finally {
      setSaving(false);
    }
  };

  const selectedCount = Object.keys(selections).length;
  const isComplete = selectedCount === categories.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900">
      {/* Film grain overlay */}
      <div className="fixed inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E')" }}>
      </div>

      {/* Red carpet stripe */}
      <div className="h-2 bg-gradient-to-r from-amber-600 via-red-600 to-amber-600" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <BallotHeader 
          progress={progress}
          selectedCount={selectedCount}
          totalCategories={categories.length}
        />

        {/* Categories Grid */}
        <div className="space-y-8 sm:space-y-12 mt-8 sm:mt-12">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={index}
              selectedNomineeId={selections[category.id]}
              onSelect={(nomineeId) => handleSelect(category.id, nomineeId)}
            />
          ))}
        </div>

        {/* Footer with Save Button */}
        <BallotFooter
          isComplete={isComplete}
          selectedCount={selectedCount}
          totalCategories={categories.length}
          onSave={handleSave}
          saving={saving}
        />
      </div>

      {/* Success Modal */}
      <SuccessModal 
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
}