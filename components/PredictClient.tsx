"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BallotHeader } from "./predict/BallotHeader";
import { CategoryCard } from "./predict/CategoryCard";
import { BallotFooter } from "./predict/BallotFooter";
import { SuccessModal } from "./predict/SuccessModal";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

interface Nominee {
  id: string;
  name: string;
  winner?: boolean;
}

interface Category {
  id: string;
  name: string;
  points: number;  // Make sure this is here
  nominees: Nominee[];
}

interface PredictClientProps {
  categories: Category[];
  eventId: string;
  initialSelections: Record<string, string>;
}

export default function PredictClient({
  categories,
  eventId,
  initialSelections,
}: PredictClientProps) {
  const router = useRouter();
  const supabase = createClient();

  const [selections, setSelections] = useState<Record<string, string>>(initialSelections || {});
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [hasExistingPredictions, setHasExistingPredictions] = useState(false);

  // Log to verify categories have points
  useEffect(() => {
  }, [categories]);

  // Get current user on mount
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        localStorage.setItem("userId", user.id);
        if (user.user_metadata?.username) {
          localStorage.setItem("username", user.user_metadata.username);
        }
      }
    };
    
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        localStorage.setItem("userId", session.user.id);
        if (session.user.user_metadata?.username) {
          localStorage.setItem("username", session.user.user_metadata.username);
        }
      } else {
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        router.push("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, router]);

  // Check if there are existing predictions
  useEffect(() => {
    setHasExistingPredictions(Object.keys(initialSelections).length > 0);
  }, [initialSelections]);

  // Update selections when initialSelections changes
  useEffect(() => {
    setSelections(initialSelections || {});
  }, [initialSelections]);

  // Progress calculation
  useEffect(() => {
    const selectedCount = Object.values(selections).filter(Boolean).length;
    const total = categories.length || 1;
    setProgress((selectedCount / total) * 100);
  }, [selections, categories.length]);

  const handleSelect = (categoryId: string, nomineeId: string) => {
    setSelections((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId] === nomineeId ? "" : nomineeId,
    }));
    setError(null);
  };

  const handleSave = async () => {
    if (!user) {
      setError("You must be logged in to save predictions");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const predictionsToSave = Object.entries(selections)
        .filter(([_, nomineeId]) => nomineeId)
        .map(([categoryId, nomineeId]) => ({
          user_id: user.id,
          category_id: categoryId,
          nominee_id: nomineeId,
          event_id: eventId
        }));

      if (predictionsToSave.length === 0) {
        setError("Please make at least one prediction before saving");
        return;
      }

      const { error: saveError } = await supabase
        .from("predictions")
        .upsert(predictionsToSave, {
          onConflict: 'user_id,category_id,event_id',
          ignoreDuplicates: false
        });

      if (saveError) {
        console.error("Save error:", saveError);
        
        if (saveError.message.includes("row-level security")) {
          setError("Permission denied. Please try logging in again.");
        } else {
          setError(saveError.message);
        }
        return;
      }

      setShowSuccessModal(true);
      
      // Redirect to leagues after 2 seconds
      setTimeout(() => {
        router.push("/leagues");
      }, 2000);
      
    } catch (error) {
      console.error("Failed to save predictions:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const selectedCount = Object.values(selections).filter(Boolean).length;
  const isComplete = selectedCount === categories.length;

  if (user === null) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900">
      {/* Film grain overlay */}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E')",
        }}
      />

      {/* Red carpet stripe */}
      <div className="h-2 bg-gradient-to-r from-amber-600 via-red-600 to-amber-600" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <BallotHeader
          progress={progress}
          selectedCount={selectedCount}
          totalCategories={categories.length}
        />

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-center">
            {error}
          </div>
        )}

        {/* Categories Grid */}
        <div className="space-y-8 sm:space-y-12 mt-8 sm:mt-12">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={index}
              selectedNomineeId={selections[category.id]}
              onSelect={(nomineeId) =>
                handleSelect(category.id, nomineeId)
              }
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
          hasExistingPredictions={hasExistingPredictions}
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