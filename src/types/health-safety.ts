export type SafetyAnswer = "established" | "partial" | "missing" | "unsure";

export type SafetyAnswers = Partial<Record<string, SafetyAnswer>>;

export interface SafetyOption {
  id: SafetyAnswer;
  label: string;
  seriousConcern?: string;
}

export interface SafetyQuestion {
  id: string;
  topic: string;
  prompt: string;
  help: string;
  options: readonly SafetyOption[];
  strength: string;
  recommendation: string;
}

export interface SafetyFinding {
  questionId: string;
  topic: string;
  answer: SafetyAnswer;
  answerLabel: string;
  strength: string;
  recommendation: string;
  seriousConcern?: string;
}

export interface SafetyScore {
  points: number;
  maxPoints: number;
  percentage: number;
  band: "strong" | "improvements" | "significant-gaps";
  findings: SafetyFinding[];
}

export interface SafetyRecommendation {
  questionId: string;
  topic: string;
  priority: "urgent" | "improve" | "verify";
  text: string;
}
