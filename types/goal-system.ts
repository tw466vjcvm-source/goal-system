export type YearValue = 2026 | 2027 | 2028 | 2029 | 2030;

export type MonthName =
  | "Enero"
  | "Febrero"
  | "Marzo"
  | "Abril"
  | "Mayo"
  | "Junio"
  | "Julio"
  | "Agosto"
  | "Septiembre"
  | "Octubre"
  | "Noviembre"
  | "Diciembre";

export type RecommendationType = "Hábito de vida" | "Mini misión" | "Habilidad";

export type Vision = {
  title: string;
  description: string;
};

export type Recommendation = {
  title: string;
  type: RecommendationType;
  science: string;
};

export type Goal = {
  title: string;
  progress: number;
  completedToday: boolean;
  duration: string;
  recommendations: Recommendation[];
};

export type CompletedGoal = {
  title: string;
  message: string;
};

export type ScientificArticle = {
  title: string;
  source: string;
};

export type VisionsByYear = Record<YearValue, Vision>;

export type GoalsByYearAndMonth = Partial<
  Record<YearValue, Partial<Record<MonthName, Goal[]>>>
>;