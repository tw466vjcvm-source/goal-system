import { GoalCard } from "@/components/goal-system/goal-card";
import { ManualGoalForm } from "@/components/goal-system/manual-goal-form";
import type {
  Goal,
  MonthName,
  Recommendation,
  YearValue,
} from "@/types/goal-system";

type MonthGoalsSectionProps = {
  selectedMonth: MonthName;
  selectedYear: YearValue;
  goals: Goal[];
  openedRecommendations: Record<string, boolean>;
  onDeleteGoal: (goalIndex: number) => void;
  onToggleCompleted: (goalIndex: number) => void;
  onToggleRecommendations: (goalTitle: string) => void;
  onAddRecommendationAsGoal: (recommendation: Recommendation) => void;
  onCreateManualGoal: (title: string, duration: string) => void;
  onAddMiniMission: (goalIndex: number, title: string) => void;
  onToggleMiniMission: (goalIndex: number, miniMissionIndex: number) => void;
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
  onCreateManualGoal,
  onAddMiniMission,
  onToggleMiniMission,
}: MonthGoalsSectionProps) {
  return (
    <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
      <h2 className="text-4xl font-bold mb-2">
        {selectedMonth} {selectedYear}
      </h2>

      <p className="text-zinc-400 mb-8">
        Objetivos conectados con tu visión de {selectedYear}.
      </p>

      <div className="space-y-6">
        <ManualGoalForm onCreateGoal={onCreateManualGoal} />

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
            onAddMiniMission={onAddMiniMission}
            onToggleMiniMission={onToggleMiniMission}
          />
        ))}
      </div>
    </div>
  );
}
