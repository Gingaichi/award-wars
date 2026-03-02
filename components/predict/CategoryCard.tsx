import { NomineeOption } from "./NomineeOption";

type Nominee = {
  id: string;
  name: string;
};

type Category = {
  id: string;
  name: string;
  nominees: Nominee[];
};

type Props = {
  category: Category;
  selected?: string;
  onSelect: (categoryId: string, nomineeId: string) => void;
};

export function CategoryCard({ category, selected, onSelect }: Props) {
  return (
    <div className="rounded-2xl border border-yellow-800/30 bg-zinc-900/40 p-6 space-y-6 backdrop-blur">
      <h2 className="text-xl font-semibold text-yellow-400 tracking-wide">
        {category.name}
      </h2>

      <div className="grid gap-3">
        {category.nominees.map((nominee) => (
          <NomineeOption
            key={nominee.id}
            nominee={nominee}
            selected={selected === nominee.id}
            onClick={() => onSelect(category.id, nominee.id)}
          />
        ))}
      </div>
    </div>
  );
}