"use client";

import React from "react";
import { RecommendationsList } from "@/components/goal-system/recommendations-list";
import type { Goal, Recommendation } from "@/types/goal-system";

const MAX_MINI_MISSIONS = 5;

type GoalCardProps = {
  goal: Goal;
  index: number;
  isRecommendationsOpen: boolean;
  onDelete: (goalIndex: number) => void;
  onToggleCompleted: (goalIndex: number) => void;
  onToggleRecommendations: (goalTitle: string) => void;
  onAddRecommendation: (recommendation: Recommendation) => void;
  onAddMiniMission: (goalIndex: number, title: string) => void;
  onToggleMiniMission: (goalIndex: number, miniMissionIndex: number) => void;
};

export function GoalCard({
  goal,
  index,
  isRecommendationsOpen,
  onDelete,
  onToggleCompleted,
  onToggleRecommendations,
  onAddRecommendation,
  onAddMiniMission,
  onToggleMiniMission,
}: GoalCardProps) {
  const [miniMissionTitle, setMiniMissionTitle] = React.useState("");
  const miniMissions = goal.miniMissions || [];
  const completedMiniMissions = miniMissions.filter(
    (miniMission) => miniMission.completed
  ).length;
  const canAddMiniMission = miniMissions.length < MAX_MINI_MISSIONS;

  function handleMiniMissionSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = miniMissionTitle.trim();

    if (!trimmedTitle || !canAddMiniMission) return;

    onAddMiniMission(index, trimmedTitle);
    setMiniMissionTitle("");
  }

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

      <div className="mb-5 rounded-2xl border border-zinc-700 bg-zinc-900 p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h4 className="text-lg font-bold">Mini misiones</h4>

            <p className="text-sm text-zinc-500">
              Pasos pequeños para avanzar este objetivo.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <p className="rounded-full border border-zinc-700 px-3 py-1 text-sm text-zinc-400">
              {miniMissions.length}/{MAX_MINI_MISSIONS} creadas
            </p>

            <p className="rounded-full border border-zinc-700 px-3 py-1 text-sm text-zinc-400">
              {completedMiniMissions} completadas
            </p>
          </div>
        </div>

        {miniMissions.length > 0 && (
          <div className="mb-4 space-y-3">
            {miniMissions.map((miniMission, miniMissionIndex) => (
              <button
                key={`${miniMission.title}-${miniMissionIndex}`}
                type="button"
                onClick={() => onToggleMiniMission(index, miniMissionIndex)}
                className="flex w-full items-center gap-3 rounded-xl border border-zinc-700 bg-black/30 px-4 py-3 text-left transition hover:border-zinc-600"
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-sm ${
                    miniMission.completed
                      ? "border-green-500 bg-green-500 text-black"
                      : "border-zinc-500 text-zinc-500"
                  }`}
                >
                  {miniMission.completed && "✓"}
                </span>

                <span
                  className={`text-sm ${
                    miniMission.completed
                      ? "text-zinc-500 line-through"
                      : "text-zinc-200"
                  }`}
                >
                  {miniMission.title}
                </span>
              </button>
            ))}
          </div>
        )}

        {miniMissions.length === 0 && (
          <div className="mb-4 rounded-xl border border-dashed border-zinc-700 bg-black/20 px-4 py-3">
            <p className="text-sm text-zinc-500">
              Agrega entre 2 y 5 pasos concretos para hacer este objetivo más
              accionable.
            </p>
          </div>
        )}

        <form
          onSubmit={handleMiniMissionSubmit}
          className="grid gap-3 md:grid-cols-[1fr_auto]"
        >
          <input
            value={miniMissionTitle}
            onChange={(event) => setMiniMissionTitle(event.target.value)}
            disabled={!canAddMiniMission}
            placeholder={
              canAddMiniMission
                ? "Agregar mini misión"
                : "Límite de 5 mini misiones"
            }
            className="rounded-xl border border-zinc-700 bg-black px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-green-500 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <button
            type="submit"
            disabled={!canAddMiniMission}
            className="rounded-xl bg-zinc-700 px-4 py-3 text-sm font-bold transition hover:bg-zinc-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Agregar
          </button>
        </form>

        <p className="mt-3 text-xs text-zinc-500">
          Puedes agregar hasta {MAX_MINI_MISSIONS} mini misiones por objetivo.
        </p>
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
