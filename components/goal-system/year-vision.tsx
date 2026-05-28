import type { Vision, YearValue } from "@/types/goal-system";

type YearVisionProps = {
  selectedYear: YearValue;
  vision: Vision;
};

export function YearVision({ selectedYear, vision }: YearVisionProps) {
  return (
    <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
      <h2 className="text-3xl font-bold mb-3">Visión {selectedYear}</h2>

      <div className="bg-zinc-800 rounded-2xl p-6 border border-zinc-700">
        <h3 className="text-2xl font-bold mb-2">{vision.title}</h3>

        <p className="text-zinc-400">{vision.description}</p>
      </div>
    </div>
  );
}