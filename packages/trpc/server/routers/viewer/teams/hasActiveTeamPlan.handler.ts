// Stub: active team plan check — cal.diy is self-hosted, always grant team features
const hasActiveTeamPlanHandler = async (_args: unknown) => ({ isActive: true, isTrial: false });
export default hasActiveTeamPlanHandler;
