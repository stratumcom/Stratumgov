import { test } from "node:test";
import assert from "node:assert/strict";
import { healthSafetyQuestions } from "../src/data/health-safety-questions";
import { calculateSafetyScore } from "../src/lib/health-safety/scoring";
import { getSafetyRecommendations } from "../src/lib/health-safety/recommendations";
import type { SafetyAnswer, SafetyAnswers } from "../src/types/health-safety";

function answersFor(answer: SafetyAnswer): SafetyAnswers {
  return Object.fromEntries(healthSafetyQuestions.map((question) => [question.id, answer]));
}

test("all established answers yield 100%, ten strengths, and no reported gaps", () => {
  const score = calculateSafetyScore(answersFor("established"));
  assert.equal(score.points, 30);
  assert.equal(score.maxPoints, 30);
  assert.equal(score.percentage, 100);
  assert.equal(score.band, "strong");
  const result = getSafetyRecommendations(score);
  assert.equal(result.strengths.length, 10);
  assert.equal(result.gaps.length, 0);
  assert.equal(result.recommendations.length, 0);
  assert.equal(result.seriousConcerns.length, 0);
});

test("partial and missing answers produce different scores and relevant gaps", () => {
  const partial = calculateSafetyScore(answersFor("partial"));
  const missing = calculateSafetyScore(answersFor("missing"));
  assert.equal(partial.points, 10);
  assert.equal(partial.percentage, 33);
  assert.equal(missing.points, 0);
  assert.equal(missing.percentage, 0);
  assert.equal(getSafetyRecommendations(partial).gaps.length, 10);
  assert.equal(getSafetyRecommendations(missing).recommendations.length, 10);
  assert.equal(getSafetyRecommendations(missing).strengths.length, 0);
  assert.equal(getSafetyRecommendations(missing).seriousConcerns.length, 5);
});

test("unknowns prompt verification without claiming measures are absent or flagging confirmed danger", () => {
  const result = getSafetyRecommendations(calculateSafetyScore(answersFor("unsure")));
  assert.equal(result.seriousConcerns.length, 0);
  assert.equal(result.gaps.length, 10);
  assert.equal(result.strengths.length, 0);
  for (const recommendation of result.recommendations) {
    assert.equal(recommendation.priority, "verify");
    assert.match(recommendation.text, /unknown answer is not evidence/);
  }
});

test("a serious concern overrides the summary even at 90% and appears first in recommendations", () => {
  const answers = answersFor("established");
  answers.emergency = "missing";
  const score = calculateSafetyScore(answers);
  assert.equal(score.percentage, 90);
  assert.equal(score.band, "strong");
  const result = getSafetyRecommendations(score);
  assert.equal(result.seriousConcerns[0].questionId, "emergency");
  assert.equal(result.summary.title, "Priority safety concerns identified");
  assert.equal(result.recommendations[0].priority, "urgent");
  assert.match(result.recommendations[0].text, /escape routes/);
  assert.equal(result.strengths.length, 9);
});

test("mixed answers have deterministic scores, targeted actions, and urgent actions before other gaps", () => {
  const answers = answersFor("established");
  answers.responsibilities = "partial";
  answers.emergency = "missing";
  answers["incident-reporting"] = "unsure";
  const score = calculateSafetyScore(answers);
  assert.equal(score.points, 22);
  assert.equal(score.percentage, 73);
  assert.equal(score.band, "improvements");
  assert.deepEqual(calculateSafetyScore(answers), score);
  const result = getSafetyRecommendations(score);
  assert.deepEqual(result.recommendations.map((item) => item.questionId), ["emergency", "incident-reporting", "responsibilities"]);
  assert.equal(result.strengths.length, 7);
  assert.equal(result.gaps.length, 3);
  assert.match(result.recommendations[2].text, /safety policy/);
});

test("bands change at 50% and 80%, independently of concern flags", () => {
  const answers = answersFor("missing");
  for (const question of healthSafetyQuestions.slice(0, 5)) answers[question.id] = "established";
  assert.equal(calculateSafetyScore(answers).percentage, 50);
  assert.equal(calculateSafetyScore(answers).band, "improvements");
  answers[healthSafetyQuestions[4].id] = "partial";
  assert.equal(calculateSafetyScore(answers).band, "significant-gaps");
  for (const question of healthSafetyQuestions.slice(0, 8)) answers[question.id] = "established";
  assert.equal(calculateSafetyScore(answers).percentage, 80);
  assert.equal(calculateSafetyScore(answers).band, "strong");
  answers[healthSafetyQuestions[7].id] = "partial";
  assert.equal(calculateSafetyScore(answers).band, "improvements");
});

test("incomplete or invalid answers cannot produce a misleading result", () => {
  assert.throws(() => calculateSafetyScore({}), /valid answer is required/);
  const answers = answersFor("established");
  delete answers.review;
  assert.throws(() => calculateSafetyScore(answers), /review/);
  const invalid = JSON.parse(JSON.stringify({ ...answersFor("established"), review: "invalid" }));
  assert.throws(() => calculateSafetyScore(invalid), /review/);
});

test("changing a previous answer updates its score, strength, and recommendation", () => {
  const answers = answersFor("established");
  answers.equipment = "missing";
  assert.equal(getSafetyRecommendations(calculateSafetyScore(answers)).seriousConcerns.length, 1);
  answers.equipment = "established";
  const score = calculateSafetyScore(answers);
  const result = getSafetyRecommendations(score);
  assert.equal(score.percentage, 100);
  assert.equal(result.seriousConcerns.length, 0);
  assert.equal(result.recommendations.length, 0);
  assert.ok(result.strengths.some((item) => item.questionId === "equipment"));
});
