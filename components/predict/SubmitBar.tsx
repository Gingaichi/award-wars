type Props = {
    onSubmit: () => void;
  };
  
  export function SubmitBar({ onSubmit }: Props) {
    return (
      <div className="sticky bottom-6 flex justify-center pt-8">
        <button
          onClick={onSubmit}
          className="rounded-xl bg-gradient-to-r from-yellow-500 to-amber-400 px-10 py-4 text-lg font-semibold text-black shadow-lg hover:scale-105 transition"
        >
          Submit Predictions
        </button>
      </div>
    );
  }