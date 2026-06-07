-- Verificacoes read-only para exploracao Cal.diy ALLGED.
-- Data: 2026-06-07
-- Uso:
-- docker exec -i postgres psql -U n8n -d cal_src < docs/allged/10-customizacoes/07-verificacoes-exploracao-cal-src.sql

\echo '== Feature flags =='
SELECT slug, enabled FROM "Feature" ORDER BY slug;

\echo '== Routing Forms =='
SELECT id, name, "userId", "teamId", disabled, "createdAt", "updatedAt"
FROM "App_RoutingForms_Form"
ORDER BY "createdAt" DESC;

\echo '== Routing Form responses =='
SELECT id, "formId", "createdAt"
FROM "App_RoutingForms_FormResponse"
ORDER BY "createdAt" DESC
LIMIT 20;

\echo '== Workflows on routing forms =='
SELECT "workflowId", "routingFormId"
FROM "WorkflowsOnRoutingForms"
ORDER BY "workflowId", "routingFormId";

\echo '== Team event types =='
SELECT id, title, slug, "teamId", "schedulingType", hidden,
       "assignAllTeamMembers", "isRRWeightsEnabled", "restrictionScheduleId"
FROM "EventType"
WHERE "teamId" IS NOT NULL
ORDER BY id;

\echo '== Hosts =='
SELECT "eventTypeId", "userId", "isFixed", priority, weight
FROM "Host"
ORDER BY "eventTypeId", "userId";

\echo '== Workflows =='
SELECT id, name, "userId", "teamId", "isActiveOnAll", trigger, time, "timeUnit", type
FROM "Workflow"
ORDER BY id;
