import type { SafetyRecommendation, SafetyScore } from "@/types/health-safety";

export function getSafetyRecommendations(score: SafetyScore) {
  const strengths = score.findings.filter((finding) => finding.answer === "established");
  const gaps = score.findings.filter((finding) => finding.answer !== "established");
  // Deliberately independent of the overall score and its band.
  const seriousConcerns = score.findings.filter((finding) => finding.seriousConcern);
  const recommendations: SafetyRecommendation[] = gaps.map((finding) => ({
    questionId: finding.questionId,
    topic: finding.topic,
    priority: finding.seriousConcern ? "urgent" : finding.answer === "unsure" ? "verify" : "improve",
    text: finding.answer === "unsure"
      ? `Verify the current arrangements with your responsible person; an unknown answer is not evidence that a measure is absent. ${finding.recommendation}`
      : finding.recommendation,
  }));
  const order = { urgent: 0, verify: 1, improve: 2 };
  recommendations.sort((a, b) => order[a.priority] - order[b.priority]);
  const summaries = {
    strong: {
      title: "A strong reported foundation",
      description: "Your answers suggest several established safety practices. Verify them in practice and address any remaining gaps; a high score does not establish compliance or guarantee a safe workplace.",
    },
    improvements: {
      title: "Improvements need attention",
      description: "Your answers suggest a mix of established practices and areas needing improvement or verification. Assign owners and agree practical next steps.",
    },
    "significant-gaps": {
      title: "Significant gaps or unknowns to address",
      description: "Your answers suggest that several safety arrangements are missing, incomplete, or unverified. Arrange a competent review and prioritise effective controls.",
    },
  };
  const summary = seriousConcerns.length > 0
    ? {
        title: "Priority safety concerns identified",
        description: "Some answers indicate potentially serious safety concerns. Address these first, regardless of the overall score, and involve a competent health and safety professional promptly.",
      }
    : summaries[score.band];
  return { strengths, gaps, seriousConcerns, recommendations, summary };
}
