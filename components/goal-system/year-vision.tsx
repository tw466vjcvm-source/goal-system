"use client";

import React from "react";
import {
  AnnualVisionQuizModal,
  type AnnualVisionAnswers,
} from "@/components/goal-system/annual-vision-quiz-modal";
import type { Vision, YearValue } from "@/types/goal-system";

const ANNUAL_VISION_STORAGE_KEY = "goal-system-annual-vision-answers";

type AnnualVisionAnswersByYear = Partial<Record<YearValue, AnnualVisionAnswers>>;

type YearVisionProps = {
  selectedYear: YearValue;
  vision: Vision;
};

const visionBoardItems = [
  {
    title: "Disciplina",
    detail: "Decisiones repetidas",
    accent: "from-green-500/25 to-emerald-400/5",
  },
  {
    title: "Salud",
    detail: "Energía estable",
    accent: "from-cyan-400/20 to-zinc-900",
  },
  {
    title: "Gimnasio",
    detail: "Cuerpo fuerte",
    accent: "from-lime-300/20 to-zinc-900",
  },
  {
    title: "Enfoque",
    detail: "Menos ruido",
    accent: "from-blue-400/20 to-zinc-900",
  },
  {
    title: "Bienestar",
    detail: "Calma y ritmo",
    accent: "from-teal-300/20 to-zinc-900",
  },
  {
    title: "Trabajo",
    detail: "Progreso visible",
    accent: "from-zinc-500/30 to-zinc-900",
  },
  {
    title: "Crecimiento",
    detail: "Identidad superior",
    accent: "from-violet-400/20 to-zinc-900",
  },
];

export function YearVision({ selectedYear, vision }: YearVisionProps) {
  const [answersByYear, setAnswersByYear] =
    React.useState<AnnualVisionAnswersByYear>({});
  const [isQuizOpen, setIsQuizOpen] = React.useState(false);
  const visionHeading = `Visión ${selectedYear}`;

  React.useEffect(() => {
    try {
      const savedAnswers = localStorage.getItem(ANNUAL_VISION_STORAGE_KEY);

      if (!savedAnswers) return;

      const parsedAnswers = JSON.parse(
        savedAnswers
      ) as AnnualVisionAnswersByYear;

      setAnswersByYear(parsedAnswers);
    } catch (error) {
      console.error("Error cargando la visión guiada:", error);
    }
  }, []);

  function saveVisionAnswers(answers: AnnualVisionAnswers) {
    setAnswersByYear((currentAnswers) => {
      const updatedAnswers = {
        ...currentAnswers,
        [selectedYear]: answers,
      };

      try {
        localStorage.setItem(
          ANNUAL_VISION_STORAGE_KEY,
          JSON.stringify(updatedAnswers)
        );
      } catch (error) {
        console.error("Error guardando la visión guiada:", error);
      }

      return updatedAnswers;
    });

    setIsQuizOpen(false);
  }

  const currentAnswers = answersByYear[selectedYear];
  const summaryItems = currentAnswers
    ? [
        { label: "Persona", value: currentAnswers.identity },
        { label: "Hábito", value: currentAnswers.habit },
        { label: "Área clave", value: currentAnswers.priorityArea },
        { label: "Estado", value: currentAnswers.feeling },
        { label: "Estilo de vida", value: currentAnswers.lifestyle },
        { label: "No negociable", value: currentAnswers.nonNegotiable },
      ].filter((item) => item.value)
    : [];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.16),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),transparent_30%)]" />

      <div className="relative space-y-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase text-green-400">
              Vision board anual
            </p>

            <h2 className="text-4xl font-bold md:text-5xl">
              {visionHeading}
            </h2>

            <p className="mt-4 text-lg text-zinc-400">
              Convierte tu año en una dirección visible: identidad, hábitos y
              decisiones que puedas recordar cada día.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsQuizOpen(true)}
            className="rounded-2xl bg-green-500 px-5 py-3 font-bold text-black transition hover:bg-green-400"
          >
            Crear mi visión guiada
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          <div className="rounded-3xl border border-zinc-700 bg-black/35 p-6">
            <p className="mb-4 text-sm font-semibold uppercase text-zinc-500">
              Dirección base
            </p>

            <h3 className="text-3xl font-bold">{vision.title}</h3>

            <p className="mt-4 text-lg leading-8 text-zinc-300">
              {vision.description}
            </p>

            {summaryItems.length > 0 && (
              <div className="mt-6 rounded-2xl border border-green-500/20 bg-green-500/10 p-5">
                <p className="text-sm font-semibold uppercase text-green-300">
                  Mi brújula personal
                </p>

                <div className="mt-4 grid gap-3">
                  {summaryItems.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-zinc-700 bg-black/30 p-4"
                    >
                      <p className="text-xs font-semibold uppercase text-zinc-500">
                        {item.label}
                      </p>

                      <p className="mt-1 text-zinc-100">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {visionBoardItems.map((item, index) => (
              <div
                key={item.title}
                className={`min-h-32 rounded-3xl border border-zinc-700 bg-gradient-to-br ${item.accent} p-5 shadow-xl ${
                  index === 0 || index === 6 ? "md:col-span-2" : ""
                }`}
              >
                <div className="flex h-full flex-col justify-between">
                  <div className="h-9 w-9 rounded-2xl border border-white/10 bg-white/5" />

                  <div>
                    <h4 className="text-xl font-bold">{item.title}</h4>

                    <p className="mt-1 text-sm text-zinc-400">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isQuizOpen && (
        <AnnualVisionQuizModal
          key={selectedYear}
          initialAnswers={currentAnswers}
          onClose={() => setIsQuizOpen(false)}
          onSave={saveVisionAnswers}
        />
      )}
    </section>
  );
}
