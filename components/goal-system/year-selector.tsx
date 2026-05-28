import type { YearValue } from "@/types/goal-system";

type YearSelectorProps = {
  selectedYear: YearValue;
  years: YearValue[];
  onYearChange: (year: YearValue) => void;
};

export function YearSelector({
  selectedYear,
  years,
  onYearChange,
}: YearSelectorProps) {
  return (
    <div className="bg-zinc-800 rounded-2xl p-4 border border-zinc-700">
      <p className="text-zinc-400 text-sm mb-1">Año seleccionado</p>

      <select
        value={selectedYear}
        onChange={(e) => onYearChange(Number(e.target.value) as YearValue)}
        className="bg-zinc-900 px-4 py-2 rounded-xl"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}