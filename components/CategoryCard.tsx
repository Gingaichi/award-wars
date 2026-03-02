import React from "react";

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
  category: Category;
  selected?: string;
  onSelect: (nomineeId: string) => void;
}

export default function CategoryCard({ category, selected, onSelect }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{category.name}</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {category.nominees.map((nominee) => (
          <li key={nominee.id}>
            <button
              type="button"
              onClick={() => onSelect(nominee.id)}
              className={`w-full p-4 border rounded-lg text-left ${
                selected === nominee.id
                  ? "border-yellow-500 bg-yellow-100"
                  : "border-gray-300"
              }`}
            >
              {nominee.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}