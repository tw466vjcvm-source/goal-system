import type { MonthName } from "@/types/goal-system";

type MonthGridProps = {
  months: MonthName[];
  onMonthSelect: (month: MonthName) => void;
};

export function MonthGrid({ months, onMonthSelect }: MonthGridProps) {
  return (
    <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
      <h2 className="text-3xl font-bold mb-6">Meses del Año</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {months.map((month) => (
          <button
            key={month}
            onClick={() => onMonthSelect(month)}
            className="bg-zinc-800 rounded-2xl p-5 hover:bg-zinc-700 transition cursor-pointer border border-zinc-700 text-left"
          >
            <h3 className="text-xl font-semibold">{month}</h3>

            <p className="text-zinc-400 mt-2">Ver objetivos</p>
          </button>
        ))}
      </div>
    </div>
  );
}