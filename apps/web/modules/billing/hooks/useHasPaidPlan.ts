export function useHasPaidPlan() {
  return { hasPaidPlan: true };
}

export function useHasActiveTeamPlan() {
  return { hasActiveTeamPlan: true, isTrial: false };
}
