import { GoalCard } from "@/components/goal-system/goal-card";
import type { Goal, MonthName, Recommendation, YearValue } from "@/types/goal-system";

type MonthGoalsSectionProps = {
  selectedMonth: MonthName;
  selectedYear: YearValue;
  goals: Goal[];
  openedRecommendations: Record<string, boolean>;
  onDeleteGoal: (goalIndex: number) => void;
  onToggleCompleted: (goalIndex: number) => void;
  onToggleRecommendations: (goalTitle: string) => void;
  onAddRecommendationAsGoal: (recommendation: Recommendation) => void;
};

export function MonthGoalsSection({
  selectedMonth,
  selectedYear,
  goals,
  openedRecommendations,
  onDeleteGoal,
  onToggleCompleted,
  onToggleRecommendations,
  onAddRecommendationAsGoal,
}: MonthGoalsSectionProps) {
  return (
    <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
      <h2 className="text-4xl font-bold mb-2">
        {selectedMonth} {selectedYear}
      </h2>

      <p className="text-zinc-400 mb-8">Objetivos conectados con tu visión de {selectedYear}.</p>

      <div className="space-y-6">
        {goals.length === 0 && (
          <div className="bg-zinc-800 rounded-2xl p-6 border border-zinc-700">
            <p className="text-zinc-400">No hay objetivos este mes todavía.</p>
          </div>
        )}

        {goals.map((goal, index) => (
          <GoalCard
            key={index}
            goal={goal}
            index={index}
            isRecommendationsOpen={Boolean(openedRecommendations[goal.title])}
            onDelete={onDeleteGoal}
            onToggleCompleted={onToggleCompleted}
            onToggleRecommendations={onToggleRecommendations}
            onAddRecommendation={onAddRecommendationAsGoal}
          />
        ))}
      </div>
    </div>
  );
}