"use client";

import React from "react";
import { CompletedGoalsSection } from "@/components/goal-system/completed-goals-section";
import { MonthGoalsSection } from "@/components/goal-system/month-goals-section";
import { MonthGrid } from "@/components/goal-system/month-grid";
import { ScientificArticlesSection } from "@/components/goal-system/scientific-articles-section";
import { YearSelector } from "@/components/goal-system/year-selector";
import { YearVision } from "@/components/goal-system/year-vision";
import {
  completedGoals,
  monthGoalsData,
  months,
  scientificArticles,
  visions,
  years,
} from "@/data/goal-system-data";
import type {
  GoalsByYearAndMonth,
  MonthName,
  Recommendation,
  YearValue,
} from "@/types/goal-system";

const MONTH_GOALS_STORAGE_KEY = "goal-system-month-goals";

export default function GoalSystemApp() {
  const [selectedYear, setSelectedYear] = React.useState<YearValue>(2026);
  const [selectedMonth, setSelectedMonth] = React.useState<MonthName | null>(null);

  const [monthGoals, setMonthGoals] =
    React.useState<GoalsByYearAndMonth>(monthGoalsData);

  const [hasLoadedStorage, setHasLoadedStorage] = React.useState(false);

  const [openedRecommendations, setOpenedRecommendations] = React.useState<
    Record<string, boolean>
  >({});

  React.useEffect(() => {
    try {
      const savedMonthGoals = localStorage.getItem(MONTH_GOALS_STORAGE_KEY);

      if (savedMonthGoals) {
        const parsedMonthGoals = JSON.parse(savedMonthGoals) as GoalsByYearAndMonth;
        setMonthGoals(parsedMonthGoals);
      }
    } catch (error) {
      console.error("Error cargando objetivos desde localStorage:", error);
    } finally {
      setHasLoadedStorage(true);
    }
  }, []);

  React.useEffect(() => {
    if (!hasLoadedStorage) return;

    try {
      localStorage.setItem(
        MONTH_GOALS_STORAGE_KEY,
        JSON.stringify(monthGoals)
      );
    } catch (error) {
      console.error("Error guardando objetivos en localStorage:", error);
    }
  }, [monthGoals, hasLoadedStorage]);

  function toggleCompleted(goalIndex: number) {
    if (!selectedMonth) return;

    setMonthGoals((currentGoals) => {
      const updatedGoals = structuredClone(currentGoals);
      const yearGoals = updatedGoals[selectedYear];

      if (!yearGoals) return currentGoals;

      const monthGoalList = yearGoals[selectedMonth];

      if (!monthGoalList) return currentGoals;

      const goal = monthGoalList[goalIndex];

      if (!goal) return currentGoals;

      goal.completedToday = !goal.completedToday;

      if (goal.completedToday) {
        goal.progress += 5;

        if (goal.progress > 100) {
          goal.progress = 100;
        }
      } else {
        goal.progress -= 5;

        if (goal.progress < 0) {
          goal.progress = 0;
        }
      }

      return updatedGoals;
    });
  }

  function deleteGoal(goalIndex: number) {
    if (!selectedMonth) return;

    setMonthGoals((currentGoals) => {
      const updatedGoals = structuredClone(currentGoals);
      const yearGoals = updatedGoals[selectedYear];

      if (!yearGoals) return currentGoals;

      const monthGoalList = yearGoals[selectedMonth];

      if (!monthGoalList) return currentGoals;

      yearGoals[selectedMonth] = monthGoalList.filter(
        (_, index) => index !== goalIndex
      );

      return updatedGoals;
    });
  }

  function toggleRecommendations(goalTitle: string) {
    setOpenedRecommendations((prev) => ({
      ...prev,
      [goalTitle]: !prev[goalTitle],
    }));
  }

  function addRecommendationAsGoal(recommendation: Recommendation) {
    if (!selectedMonth) return;

    setMonthGoals((currentGoals) => {
      const updatedGoals = structuredClone(currentGoals);

      if (!updatedGoals[selectedYear]) {
        updatedGoals[selectedYear] = {};
      }

      if (!updatedGoals[selectedYear]?.[selectedMonth]) {
        updatedGoals[selectedYear]![selectedMonth] = [];
      }

      const monthGoalList = updatedGoals[selectedYear]?.[selectedMonth];

      if (!monthGoalList) return currentGoals;

      const alreadyExists = monthGoalList.some(
        (goal) => goal.title === recommendation.title
      );

      if (alreadyExists) {
        return updatedGoals;
      }

      monthGoalList.push({
        title: recommendation.title,
        progress: 0,
        completedToday: false,
        duration:
          recommendation.type === "Hábito de vida"
            ? "Objetivo permanente"
            : "30 días",
        recommendations: [],
      });

      return updatedGoals;
    });
  }

  function createManualGoal(title: string, duration: string) {
    if (!selectedMonth) return;

    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    const normalizedTitle = trimmedTitle.toLowerCase();

    setMonthGoals((currentGoals) => {
      const updatedGoals = structuredClone(currentGoals);

      if (!updatedGoals[selectedYear]) {
        updatedGoals[selectedYear] = {};
      }

      if (!updatedGoals[selectedYear]?.[selectedMonth]) {
        updatedGoals[selectedYear]![selectedMonth] = [];
      }

      const monthGoalList = updatedGoals[selectedYear]?.[selectedMonth];

      if (!monthGoalList) return currentGoals;

      const alreadyExists = monthGoalList.some(
        (goal) => goal.title.trim().toLowerCase() === normalizedTitle
      );

      if (alreadyExists) {
        return updatedGoals;
      }

      monthGoalList.push({
        title: trimmedTitle,
        progress: 0,
        completedToday: false,
        duration,
        recommendations: [],
      });

      return updatedGoals;
    });
  }

  const selectedMonthGoals = selectedMonth
    ? monthGoals[selectedYear]?.[selectedMonth] || []
    : [];

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-5xl font-bold mb-3">
                Sistema de Objetivos 🚀
              </h1>

              <p className="text-zinc-400 text-lg max-w-3xl">
                Construye tu vida paso a paso con hábitos, disciplina y visión.
              </p>
            </div>

            <YearSelector
              selectedYear={selectedYear}
              years={years}
              onYearChange={setSelectedYear}
            />
          </div>
        </div>

        <YearVision selectedYear={selectedYear} vision={visions[selectedYear]} />

        <MonthGrid months={months} onMonthSelect={setSelectedMonth} />

        {selectedMonth && (
          <MonthGoalsSection
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            goals={selectedMonthGoals}
            openedRecommendations={openedRecommendations}
            onDeleteGoal={deleteGoal}
            onToggleCompleted={toggleCompleted}
            onToggleRecommendations={toggleRecommendations}
            onAddRecommendationAsGoal={addRecommendationAsGoal}
            onCreateManualGoal={createManualGoal}
          />
        )}

        <CompletedGoalsSection completedGoals={completedGoals} />

        <ScientificArticlesSection scientificArticles={scientificArticles} />
      </div>
    </div>
  );
}
