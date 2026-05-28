import { RecommendationsList } from "@/components/goal-system/recommendations-list";
import type { Goal, Recommendation } from "@/types/goal-system";

type GoalCardProps = {
  goal: Goal;
  index: number;
  isRecommendationsOpen: boolean;
  onDelete: (goalIndex: number) => void;
  onToggleCompleted: (goalIndex: number) => void;
  onToggleRecommendations: (goalTitle: string) => void;
  onAddRecommendation: (recommendation: Recommendation) => void;
};

export function GoalCard({
  goal,
  index,
  isRecommendationsOpen,
  onDelete,
  onToggleCompleted,
  onToggleRecommendations,
  onAddRecommendation,
}: GoalCardProps) {
  return (
    <div className="bg-zinc-800 rounded-2xl p-6 border border-zinc-700">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold">{goal.title}</h3>

          <p className="text-zinc-400 mt-1">Tiempo estimado: {goal.duration}</p>
        </div>

        <button
          onClick={() => onDelete(index)}
          className="bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded-xl text-sm"
        >
          Eliminar
        </button>
      </div>

      <div className="w-full bg-zinc-700 h-4 rounded-full overflow-hidden mb-3">
        <div
          className="bg-green-500 h-full transition-all"
          style={{
            width: `${goal.progress}%`,
          }}
        />
      </div>

      <div className="flex items-center justify-between mb-5">
        <p className="text-zinc-400 text-sm">Progreso: {goal.progress}%</p>

        <button
          onClick={() => onToggleCompleted(index)}
          className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition ${
            goal.completedToday ? "bg-green-500 border-green-500" : "border-zinc-500"
          }`}
        >
          {goal.completedToday && "✓"}
        </button>
      </div>

      <button
        onClick={() => onToggleRecommendations(goal.title)}
        className="bg-zinc-700 hover:bg-zinc-600 px-5 py-3 rounded-2xl font-semibold mb-4"
      >
        Ver objetivos recomendados
      </button>

      {isRecommendationsOpen && (
        <RecommendationsList
          recommendations={goal.recommendations}
          onAddRecommendation={onAddRecommendation}
        />
      )}
    </div>
  );
}