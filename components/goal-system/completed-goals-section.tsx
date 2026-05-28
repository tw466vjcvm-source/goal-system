import type { CompletedGoal } from "@/types/goal-system";

type CompletedGoalsSectionProps = {
  completedGoals: CompletedGoal[];
};

export function CompletedGoalsSection({
  completedGoals,
}: CompletedGoalsSectionProps) {
  return (
    <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
      <h2 className="text-3xl font-bold mb-6">
        Logros Completados 🏆
      </h2>

      <div className="space-y-4">
        {completedGoals.map((goal, index) => (
          <div
            key={index}
            className="bg-zinc-800 rounded-2xl p-5 border border-zinc-700"
          >
            <h3 className="text-xl font-bold mb-2">
              {goal.title}
            </h3>

            <p className="text-zinc-400">
              {goal.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}