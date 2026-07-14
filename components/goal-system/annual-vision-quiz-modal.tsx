"use client";

import React from "react";

export type AnnualVisionAnswers = {
  identity: string;
  habit: string;
  priorityArea: string;
  feeling: string;
  lifestyle: string;
  nonNegotiable: string;
};

const emptyAnswers: AnnualVisionAnswers = {
  identity: "",
  habit: "",
  priorityArea: "",
  feeling: "",
  lifestyle: "",
  nonNegotiable: "",
};

const questions: {
  id: keyof AnnualVisionAnswers;
  label: string;
  placeholder: string;
}[] = [
  {
    id: "identity",
    label: "¿Qué tipo de persona quiero ser este año?",
    placeholder: "Ej: una persona disciplinada, fuerte y confiable",
  },
  {
    id: "habit",
    label: "¿Qué hábito quiero fortalecer primero?",
    placeholder: "Ej: entrenar temprano, leer, dormir mejor",
  },
  {
    id: "priorityArea",
    label: "¿Qué área quiero mejorar más?",
    placeholder: "Ej: salud, trabajo, enfoque, finanzas",
  },
  {
    id: "feeling",
    label: "¿Cómo quiero sentirme este año?",
    placeholder: "Ej: con energía, calma, claridad y orgullo",
  },
  {
    id: "lifestyle",
    label: "¿Qué estilo de vida quiero construir?",
    placeholder: "Ej: simple, activo, ordenado y ambicioso",
  },
  {
    id: "nonNegotiable",
    label: "¿Qué compromiso no quiero negociar?",
    placeholder: "Ej: moverme cada día aunque sea poco",
  },
];

type AnnualVisionQuizModalProps = {
  initialAnswers?: AnnualVisionAnswers;
  onClose: () => void;
  onSave: (answers: AnnualVisionAnswers) => void;
};

export function AnnualVisionQuizModal({
  initialAnswers,
  onClose,
  onSave,
}: AnnualVisionQuizModalProps) {
  const [answers, setAnswers] = React.useState<AnnualVisionAnswers>(
    initialAnswers || emptyAnswers
  );

  function updateAnswer(field: keyof AnnualVisionAnswers, value: string) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [field]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSave({
      identity: answers.identity.trim(),
      habit: answers.habit.trim(),
      priorityArea: answers.priorityArea.trim(),
      feeling: answers.feeling.trim(),
      lifestyle: answers.lifestyle.trim(),
      nonNegotiable: answers.nonNegotiable.trim(),
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-zinc-700 bg-zinc-950 p-6 shadow-2xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase text-green-400">
              Vision board personal
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Crear mi visión guiada
            </h2>

            <p className="mt-2 text-zinc-400">
              Responde con frases simples. Esto se guarda solo para tu año
              seleccionado.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-zinc-800 px-4 py-2 text-sm font-semibold text-zinc-300 transition hover:bg-zinc-700"
          >
            Cerrar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {questions.map((question) => (
            <label
              key={question.id}
              className="block rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
            >
              <span className="text-sm font-semibold text-zinc-200">
                {question.label}
              </span>

              <textarea
                value={answers[question.id]}
                onChange={(event) =>
                  updateAnswer(question.id, event.target.value)
                }
                placeholder={question.placeholder}
                rows={2}
                className="mt-3 w-full resize-none rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-green-500"
              />
            </label>
          ))}

          <div className="flex flex-wrap justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-zinc-800 px-5 py-3 font-semibold text-zinc-200 transition hover:bg-zinc-700"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-xl bg-green-500 px-5 py-3 font-bold text-black transition hover:bg-green-400"
            >
              Guardar visión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
