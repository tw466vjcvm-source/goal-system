"use client";

import React from "react";

const durationOptions = [
  "30 días",
  "90 días",
  "1 año",
  "Objetivo permanente",
];

type ManualGoalFormProps = {
  onCreateGoal: (title: string, duration: string) => void;
};

export function ManualGoalForm({ onCreateGoal }: ManualGoalFormProps) {
  const [title, setTitle] = React.useState("");
  const [duration, setDuration] = React.useState(durationOptions[0]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    onCreateGoal(trimmedTitle, duration);
    setTitle("");
    setDuration(durationOptions[0]);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-800 rounded-2xl p-6 border border-zinc-700"
    >
      <div className="grid gap-4 md:grid-cols-[1fr_220px_auto] md:items-end">
        <label className="block">
          <span className="text-sm font-semibold text-zinc-300">
            Nuevo objetivo
          </span>

          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Escribe el título del objetivo"
            className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-green-500"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-zinc-300">Duración</span>

          <select
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
            className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-green-500"
          >
            {durationOptions.map((durationOption) => (
              <option key={durationOption} value={durationOption}>
                {durationOption}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="rounded-xl bg-green-500 px-5 py-3 font-bold text-black transition hover:bg-green-400"
        >
          Crear objetivo
        </button>
      </div>
    </form>
  );
}
