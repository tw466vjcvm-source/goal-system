import type {
  CompletedGoal,
  GoalsByYearAndMonth,
  MonthName,
  ScientificArticle,
  VisionsByYear,
  YearValue,
} from "@/types/goal-system";

export const months: MonthName[] = [
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

export const years: YearValue[] = [2026, 2027, 2028, 2029, 2030];

export const visions: VisionsByYear = {
  2026: {
    title: "Construir disciplina y base personal",
    description: "Crear hábitos sólidos, energía estable y una rutina fuerte.",
  },
  2027: {
    title: "Construir habilidades e ingresos",
    description: "Aprender habilidades de alto valor y empezar proyectos.",
  },
  2028: {
    title: "Expandir oportunidades",
    description: "Conectar con personas, mejorar mentalidad y crecer.",
  },
  2029: {
    title: "Construir libertad financiera",
    description: "Aumentar ingresos y crear estabilidad económica.",
  },
  2030: {
    title: "Ser millonario y vivir con libertad",
    description: "Construir una vida libre, estable y con propósito.",
  },
};

export const monthGoalsData: GoalsByYearAndMonth = {
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
            science: "Dormir bien mejora recuperación muscular, energía y testosterona.",
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
            science: "Las habilidades de ventas aumentan ingresos y oportunidades.",
          },
        ],
      },
    ],
  },
};

export const scientificArticles: ScientificArticle[] = [
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

export const completedGoals: CompletedGoal[] = [
  {
    title: "Leer diariamente durante 30 días",
    message: "Tu cerebro ahora tiene más disciplina y capacidad de enfoque.",
  },
];