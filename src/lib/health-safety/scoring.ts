import { healthSafetyQuestions } from "@/data/health-safety-questions";
import type { SafetyAnswer, SafetyAnswers, SafetyScore } from "@/types/health-safety";

export const safetyAnswerPoints: Record<SafetyAnswer, number> = {
  established: 3,
  partial: 1,
  missing: 0,
  unsure: 0,
};

export function calculateSafetyScore(answers: SafetyAnswers): SafetyScore {
  let points = 0;
  const findings = healthSafetyQuestions.map((question) => {
    const option = question.options.find((item) => item.id === answers[question.id]);
    if (!option) {
      throw new Error(`A valid answer is required for ${question.id}.`);
    }
    points += safetyAnswerPoints[option.id];
    return {
      questionId: question.id,
      topic: question.topic,
      answer: option.id,
      answerLabel: option.label,
      strength: question.strength,
      recommendation: question.recommendation,
      seriousConcern: option.seriousConcern,
    };
  });
  const maxPoints = healthSafetyQuestions.length * safetyAnswerPoints.established;
  const percentage = Math.round((points / maxPoints) * 100);
  return {
    points,
    maxPoints,
    percentage,
    band: percentage >= 80 ? "strong" : percentage >= 50 ? "improvements" : "significant-gaps",
    findings,
  };
}
