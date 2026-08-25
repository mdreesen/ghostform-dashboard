export interface AI_ANALYSIS {
  generatedAt: string;
  nextSteps: Array<string>;
  read: string;
  scorecard: SCORECARD;
  source: string;
};

export interface SCORECARD {
  financingRisk: string;
  gaps: Array<string>;
  readiness: number;
  readinessLabel: string;
  signals: Array<string>;
  timelineBand: string;
}