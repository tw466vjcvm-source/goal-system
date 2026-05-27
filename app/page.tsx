"use client";

import React from "react";

export default function GoalSystemApp() {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const years = [2026, 2027, 2028, 2029, 2030];

  const visions = {
    2026: {
      title: "Construir disciplina y base personal",
      description:
        "Crear hábitos sólidos, energía estable y una rutina fuerte.",
    },
    2027: {
      title: "Construir habilidades e ingresos",
      description:
        "Aprender habilidades de alto valor y empezar proyectos.",
    },
    2028: {
      title: "Expandir oportunidades",
      description:
        "Conectar con personas, mejorar mentalidad y crecer.",
    },
    2029: {
      title: "Construir libertad financiera",
      description:
        "Aumentar ingresos y crear estabilidad económica.",
    },
    2030: {
      title: "Ser millonario y vivir con libertad",
      description:
        "Construir una vida libre, estable y con propósito.",
    },
  };

  const monthGoalsData = {
    2026: {
      Enero: [
        {
          title: "Entrenar 4 veces por semana",
          progress: 35,
          completedToday: false,
          duration: "90 días",
          recommendations: [
            {
              title: "Dormir 8 horas",
              type: "Hábito de vida",
              science:
                "Dormir bien mejora recuperación muscular, energía y testosterona.",
            },
            {
              title: "Mantener constancia",
              type: "Mini misión",
              science:
                "La constancia crea automatización de hábitos según estudios de comportamiento.",
            },
          ],
        },
      ],
    },

    2029: {
      Enero: [
        {
          title: "Construir negocio online",
          progress: 15,
          completedToday: false,
          duration: "1 año",
          recommendations: [
            {
              title: "Aprender ventas",
              type: "Habilidad",
              science:
                "Las habilidades de ventas aumentan ingresos y oportunidades.",
            },
          ],
        },
      ],
    },
  };

  const scientificArticles = [
    {
      title: "Dormir mejora la memoria y recuperación",
      source: "Harvard Medical School",
    },
    {
      title: "La constancia crea hábitos automáticos",
      source: "University College London",
    },
    {
      title: "El ejercicio mejora salud mental",
      source: "Mayo Clinic",
    },
  ];

  const completedGoals = [
    {
      title: "Leer diariamente durante 30 días",
      message:
        "Tu cerebro ahora tiene más disciplina y capacidad de enfoque.",
    },
  ];

  const [selectedYear, setSelectedYear] = React.useState(2026);
  const [selectedMonth, setSelectedMonth] = React.useState<string | null>(null);

  const [monthGoals, setMonthGoals] =
    React.useState(monthGoalsData);

  const [openedRecommendations, setOpenedRecommendations] =
    React.useState<{ [key: string]: boolean }>({});

  function toggleCompleted(goalIndex: number) {
    if (!selectedMonth) return;

    const updated = { ...monthGoals };

    const goal =
      updated[selectedYear][selectedMonth][goalIndex];

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

    setMonthGoals(updated);
  }

  function deleteGoal(goalIndex: number) {
    if (!selectedMonth) return;

    const updated = { ...monthGoals };

    updated[selectedYear][selectedMonth].splice(goalIndex, 1);

    setMonthGoals(updated);
  }

  function toggleRecommendations(goalTitle: string) {
    setOpenedRecommendations((prev) => ({
      ...prev,
      [goalTitle]: !prev[goalTitle],
    }));
  }

  function addRecommendationAsGoal(
    recommendation: any
  ) {
    if (!selectedMonth) return;

    const updated = { ...monthGoals };

    updated[selectedYear][selectedMonth].push({
      title: recommendation.title,
      progress: 0,
      completedToday: false,
      duration:
        recommendation.type === "Hábito de vida"
          ? "Objetivo permanente"
          : "30 días",
      recommendations: [],
    });

    setMonthGoals(updated);
  }

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
                Construye tu vida paso a paso con hábitos,
                disciplina y visión.
              </p>
            </div>

            <div className="bg-zinc-800 rounded-2xl p-4 border border-zinc-700">
              <p className="text-zinc-400 text-sm mb-1">
                Año seleccionado
              </p>

              <select
                value={selectedYear}
                onChange={(e) =>
                  setSelectedYear(Number(e.target.value))
                }
                className="bg-zinc-900 px-4 py-2 rounded-xl"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
          <h2 className="text-3xl font-bold mb-3">
            Visión {selectedYear}
          </h2>

          <div className="bg-zinc-800 rounded-2xl p-6 border border-zinc-700">
            <h3 className="text-2xl font-bold mb-2">
              {visions[selectedYear].title}
            </h3>

            <p className="text-zinc-400">
              {visions[selectedYear].description}
            </p>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
          <h2 className="text-3xl font-bold mb-6">
            Meses del Año
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {months.map((month) => (
              <div
                key={month}
                onClick={() => setSelectedMonth(month)}
                className="bg-zinc-800 rounded-2xl p-5 hover:bg-zinc-700 transition cursor-pointer border border-zinc-700"
              >
                <h3 className="text-xl font-semibold">
                  {month}
                </h3>

                <p className="text-zinc-400 mt-2">
                  Ver objetivos
                </p>
              </div>
            ))}
          </div>
        </div>

        {selectedMonth && (
          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
            <h2 className="text-4xl font-bold mb-2">
              {selectedMonth} {selectedYear}
            </h2>

            <p className="text-zinc-400 mb-8">
              Objetivos conectados con tu visión de{" "}
              {selectedYear}.
            </p>

            <div className="space-y-6">

              {(monthGoals[selectedYear]?.[selectedMonth] || [])
                .length === 0 && (
                <div className="bg-zinc-800 rounded-2xl p-6 border border-zinc-700">
                  <p className="text-zinc-400">
                    No hay objetivos este mes todavía.
                  </p>
                </div>
              )}

              {(monthGoals[selectedYear]?.[selectedMonth] || []).map(
                (goal: any, index: number) => (
                  <div
                    key={index}
                    className="bg-zinc-800 rounded-2xl p-6 border border-zinc-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold">
                          {goal.title}
                        </h3>

                        <p className="text-zinc-400 mt-1">
                          Tiempo estimado: {goal.duration}
                        </p>
                      </div>

                      <button
                        onClick={() => deleteGoal(index)}
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
                      <p className="text-zinc-400 text-sm">
                        Progreso: {goal.progress}%
                      </p>

                      <button
                        onClick={() =>
                          toggleCompleted(index)
                        }
                        className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition ${
                          goal.completedToday
                            ? "bg-green-500 border-green-500"
                            : "border-zinc-500"
                        }`}
                      >
                        {goal.completedToday && "✓"}
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        toggleRecommendations(goal.title)
                      }
                      className="bg-zinc-700 hover:bg-zinc-600 px-5 py-3 rounded-2xl font-semibold mb-4"
                    >
                      Ver objetivos recomendados
                    </button>

                    {openedRecommendations[goal.title] && (
                      <div className="space-y-4">
                        {goal.recommendations.map(
                          (
                            recommendation: any,
                            recommendationIndex: number
                          ) => (
                            <div
                              key={recommendationIndex}
                              className="bg-zinc-900 rounded-2xl p-5 border border-zinc-700"
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <h4 className="text-lg font-bold">
                                    {
                                      recommendation.title
                                    }
                                  </h4>

                                  <p className="text-zinc-500 text-sm">
                                    {
                                      recommendation.type
                                    }
                                  </p>
                                </div>

                                <button
                                  onClick={() =>
                                    addRecommendationAsGoal(
                                      recommendation
                                    )
                                  }
                                  className="bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded-xl font-bold"
                                >
                                  + Agregar
                                </button>
                              </div>

                              <div className="bg-zinc-800 rounded-2xl p-4">
                                <p className="text-zinc-300 mb-2">
                                  🧠 Respaldo científico
                                </p>

                                <p className="text-zinc-400 text-sm">
                                  {
                                    recommendation.science
                                  }
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        )}

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

        <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
          <h2 className="text-3xl font-bold mb-6">
            Evidencia Científica 📚
          </h2>

          <div className="space-y-4">
            {scientificArticles.map((article, index) => (
              <div
                key={index}
                className="bg-zinc-800 rounded-2xl p-5 border border-zinc-700"
              >
                <h3 className="text-xl font-semibold mb-2">
                  {article.title}
                </h3>

                <p className="text-zinc-400">
                  Fuente: {article.source}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}