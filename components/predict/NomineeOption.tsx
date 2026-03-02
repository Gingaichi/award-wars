type Nominee = {
    id: string;
    name: string;
  };
  
  type Props = {
    nominee: Nominee;
    selected: boolean;
    onClick: () => void;
  };
  
  export function NomineeOption({ nominee, selected, onClick }: Props) {
    return (
      <button
        onClick={onClick}
        className={[
          "w-full rounded-xl px-4 py-3 text-left transition border",
          selected
            ? "bg-gradient-to-r from-yellow-500 to-amber-400 text-black border-yellow-500 shadow-lg"
            : "bg-black/40 border-zinc-800 text-zinc-300 hover:border-yellow-600 hover:text-white",
        ].join(" ")}
      >
        {nominee.name}
      </button>
    );
  }