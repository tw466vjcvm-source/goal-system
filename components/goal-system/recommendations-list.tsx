import type { Recommendation } from "@/types/goal-system";

type RecommendationsListProps = {
  recommendations: Recommendation[];
  onAddRecommendation: (recommendation: Recommendation) => void;
};

export function RecommendationsList({
  recommendations,
  onAddRecommendation,
}: RecommendationsListProps) {
  return (
    <div className="space-y-4">
      {recommendations.map((recommendation, recommendationIndex) => (
        <div
          key={recommendationIndex}
          className="bg-zinc-900 rounded-2xl p-5 border border-zinc-700"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-lg font-bold">{recommendation.title}</h4>

              <p className="text-zinc-500 text-sm">{recommendation.type}</p>
            </div>

            <button
              onClick={() => onAddRecommendation(recommendation)}
              className="bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded-xl font-bold"
            >
              + Agregar
            </button>
          </div>

          <div className="bg-zinc-800 rounded-2xl p-4">
            <p className="text-zinc-300 mb-2">🧠 Respaldo científico</p>

            <p className="text-zinc-400 text-sm">{recommendation.science}</p>
          </div>
        </div>
      ))}
    </div>
  );
}