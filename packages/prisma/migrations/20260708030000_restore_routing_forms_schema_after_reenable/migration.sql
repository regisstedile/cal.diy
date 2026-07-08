-- Restore routing-form persistence that was removed by
-- 20260305043434_remove_routing_forms and partially reintroduced by
-- 20260519000000_add_routing_forms.
--
-- This migration is intentionally idempotent because some local deployments
-- may already have been repaired with `prisma db push`.

-- Enums
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'IncompleteBookingActionType') THEN
    CREATE TYPE "public"."IncompleteBookingActionType" AS ENUM ('SALESFORCE');
  END IF;
END $$;

ALTER TYPE "public"."AssignmentReasonEnum" ADD VALUE IF NOT EXISTS 'ROUTING_FORM_ROUTING';
ALTER TYPE "public"."AssignmentReasonEnum" ADD VALUE IF NOT EXISTS 'ROUTING_FORM_ROUTING_FALLBACK';
ALTER TYPE "public"."WebhookTriggerEvents" ADD VALUE IF NOT EXISTS 'ROUTING_FORM_FALLBACK_HIT';
ALTER TYPE "public"."WorkflowType" ADD VALUE IF NOT EXISTS 'ROUTING_FORM';

-- Routing form audit/update metadata
ALTER TABLE "public"."App_RoutingForms_Form"
  ADD COLUMN IF NOT EXISTS "updatedById" INTEGER;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'App_RoutingForms_Form_updatedById_fkey'
  ) THEN
    ALTER TABLE "public"."App_RoutingForms_Form"
      ADD CONSTRAINT "App_RoutingForms_Form_updatedById_fkey"
      FOREIGN KEY ("updatedById") REFERENCES "public"."users"("id")
      ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;

-- Routing form response metadata
ALTER TABLE "public"."App_RoutingForms_FormResponse"
  ADD COLUMN IF NOT EXISTS "uuid" TEXT,
  ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3),
  ADD COLUMN IF NOT EXISTS "routedToBookingUid" TEXT,
  ADD COLUMN IF NOT EXISTS "chosenRouteId" TEXT;

ALTER TABLE "public"."App_RoutingForms_FormResponse"
  ALTER COLUMN "uuid" SET DEFAULT gen_random_uuid()::text;

CREATE UNIQUE INDEX IF NOT EXISTS "App_RoutingForms_FormResponse_routedToBookingUid_key"
  ON "public"."App_RoutingForms_FormResponse"("routedToBookingUid");

CREATE INDEX IF NOT EXISTS "App_RoutingForms_FormResponse_formId_createdAt_idx"
  ON "public"."App_RoutingForms_FormResponse"("formId", "createdAt");

CREATE INDEX IF NOT EXISTS "App_RoutingForms_FormResponse_routedToBookingUid_idx"
  ON "public"."App_RoutingForms_FormResponse"("routedToBookingUid");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'App_RoutingForms_FormResponse_routedToBookingUid_fkey'
  ) THEN
    ALTER TABLE "public"."App_RoutingForms_FormResponse"
      ADD CONSTRAINT "App_RoutingForms_FormResponse_routedToBookingUid_fkey"
      FOREIGN KEY ("routedToBookingUid") REFERENCES "public"."Booking"("uid")
      ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;

-- Incomplete booking actions
CREATE TABLE IF NOT EXISTS "public"."App_RoutingForms_IncompleteBookingActions" (
  "id" SERIAL NOT NULL,
  "formId" TEXT NOT NULL,
  "actionType" "public"."IncompleteBookingActionType" NOT NULL,
  "data" JSONB NOT NULL,
  "enabled" BOOLEAN NOT NULL DEFAULT true,
  "credentialId" INTEGER,
  CONSTRAINT "App_RoutingForms_IncompleteBookingActions_pkey" PRIMARY KEY ("id")
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'App_RoutingForms_IncompleteBookingActions_formId_fkey'
  ) THEN
    ALTER TABLE "public"."App_RoutingForms_IncompleteBookingActions"
      ADD CONSTRAINT "App_RoutingForms_IncompleteBookingActions_formId_fkey"
      FOREIGN KEY ("formId") REFERENCES "public"."App_RoutingForms_Form"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

-- Queued routing form responses
CREATE TABLE IF NOT EXISTS "public"."App_RoutingForms_QueuedFormResponse" (
  "id" TEXT NOT NULL,
  "formId" TEXT NOT NULL,
  "response" JSONB NOT NULL,
  "chosenRouteId" TEXT,
  "fallbackAction" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3),
  "actualResponseId" INTEGER,
  CONSTRAINT "App_RoutingForms_QueuedFormResponse_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "App_RoutingForms_QueuedFormResponse_actualResponseId_key"
  ON "public"."App_RoutingForms_QueuedFormResponse"("actualResponseId");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'App_RoutingForms_QueuedFormResponse_formId_fkey'
  ) THEN
    ALTER TABLE "public"."App_RoutingForms_QueuedFormResponse"
      ADD CONSTRAINT "App_RoutingForms_QueuedFormResponse_formId_fkey"
      FOREIGN KEY ("formId") REFERENCES "public"."App_RoutingForms_Form"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'App_RoutingForms_QueuedFormResponse_actualResponseId_fkey'
  ) THEN
    ALTER TABLE "public"."App_RoutingForms_QueuedFormResponse"
      ADD CONSTRAINT "App_RoutingForms_QueuedFormResponse_actualResponseId_fkey"
      FOREIGN KEY ("actualResponseId") REFERENCES "public"."App_RoutingForms_FormResponse"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

-- Routing trace persistence
CREATE TABLE IF NOT EXISTS "public"."PendingRoutingTrace" (
  "id" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "trace" JSONB NOT NULL,
  "formResponseId" INTEGER,
  "queuedFormResponseId" TEXT,
  CONSTRAINT "PendingRoutingTrace_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "public"."RoutingTrace" (
  "id" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "trace" JSONB NOT NULL,
  "formResponseId" INTEGER,
  "queuedFormResponseId" TEXT,
  "bookingUid" TEXT,
  "assignmentReasonId" INTEGER,
  CONSTRAINT "RoutingTrace_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "PendingRoutingTrace_formResponseId_key"
  ON "public"."PendingRoutingTrace"("formResponseId");
CREATE UNIQUE INDEX IF NOT EXISTS "PendingRoutingTrace_queuedFormResponseId_key"
  ON "public"."PendingRoutingTrace"("queuedFormResponseId");
CREATE UNIQUE INDEX IF NOT EXISTS "RoutingTrace_formResponseId_key"
  ON "public"."RoutingTrace"("formResponseId");
CREATE UNIQUE INDEX IF NOT EXISTS "RoutingTrace_queuedFormResponseId_key"
  ON "public"."RoutingTrace"("queuedFormResponseId");
CREATE UNIQUE INDEX IF NOT EXISTS "RoutingTrace_bookingUid_key"
  ON "public"."RoutingTrace"("bookingUid");
CREATE UNIQUE INDEX IF NOT EXISTS "RoutingTrace_assignmentReasonId_key"
  ON "public"."RoutingTrace"("assignmentReasonId");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'PendingRoutingTrace_formResponseId_fkey'
  ) THEN
    ALTER TABLE "public"."PendingRoutingTrace"
      ADD CONSTRAINT "PendingRoutingTrace_formResponseId_fkey"
      FOREIGN KEY ("formResponseId") REFERENCES "public"."App_RoutingForms_FormResponse"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'PendingRoutingTrace_queuedFormResponseId_fkey'
  ) THEN
    ALTER TABLE "public"."PendingRoutingTrace"
      ADD CONSTRAINT "PendingRoutingTrace_queuedFormResponseId_fkey"
      FOREIGN KEY ("queuedFormResponseId") REFERENCES "public"."App_RoutingForms_QueuedFormResponse"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'PendingRoutingTrace_at_least_one_response_id'
  ) THEN
    ALTER TABLE "public"."PendingRoutingTrace"
      ADD CONSTRAINT "PendingRoutingTrace_at_least_one_response_id"
      CHECK ("formResponseId" IS NOT NULL OR "queuedFormResponseId" IS NOT NULL);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'RoutingTrace_formResponseId_fkey'
  ) THEN
    ALTER TABLE "public"."RoutingTrace"
      ADD CONSTRAINT "RoutingTrace_formResponseId_fkey"
      FOREIGN KEY ("formResponseId") REFERENCES "public"."App_RoutingForms_FormResponse"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'RoutingTrace_queuedFormResponseId_fkey'
  ) THEN
    ALTER TABLE "public"."RoutingTrace"
      ADD CONSTRAINT "RoutingTrace_queuedFormResponseId_fkey"
      FOREIGN KEY ("queuedFormResponseId") REFERENCES "public"."App_RoutingForms_QueuedFormResponse"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'RoutingTrace_bookingUid_fkey'
  ) THEN
    ALTER TABLE "public"."RoutingTrace"
      ADD CONSTRAINT "RoutingTrace_bookingUid_fkey"
      FOREIGN KEY ("bookingUid") REFERENCES "public"."Booking"("uid")
      ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'RoutingTrace_assignmentReasonId_fkey'
  ) THEN
    ALTER TABLE "public"."RoutingTrace"
      ADD CONSTRAINT "RoutingTrace_assignmentReasonId_fkey"
      FOREIGN KEY ("assignmentReasonId") REFERENCES "public"."AssignmentReason"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'RoutingTrace_at_least_one_response_id'
  ) THEN
    ALTER TABLE "public"."RoutingTrace"
      ADD CONSTRAINT "RoutingTrace_at_least_one_response_id"
      CHECK ("formResponseId" IS NOT NULL OR "queuedFormResponseId" IS NOT NULL);
  END IF;
END $$;

-- Routing form workflows
CREATE TABLE IF NOT EXISTS "public"."WorkflowsOnRoutingForms" (
  "id" SERIAL NOT NULL,
  "workflowId" INTEGER NOT NULL,
  "routingFormId" TEXT NOT NULL,
  CONSTRAINT "WorkflowsOnRoutingForms_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "WorkflowsOnRoutingForms_workflowId_idx"
  ON "public"."WorkflowsOnRoutingForms"("workflowId");
CREATE INDEX IF NOT EXISTS "WorkflowsOnRoutingForms_routingFormId_idx"
  ON "public"."WorkflowsOnRoutingForms"("routingFormId");
CREATE UNIQUE INDEX IF NOT EXISTS "WorkflowsOnRoutingForms_workflowId_routingFormId_key"
  ON "public"."WorkflowsOnRoutingForms"("workflowId", "routingFormId");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'WorkflowsOnRoutingForms_workflowId_fkey'
  ) THEN
    ALTER TABLE "public"."WorkflowsOnRoutingForms"
      ADD CONSTRAINT "WorkflowsOnRoutingForms_workflowId_fkey"
      FOREIGN KEY ("workflowId") REFERENCES "public"."Workflow"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'WorkflowsOnRoutingForms_routingFormId_fkey'
  ) THEN
    ALTER TABLE "public"."WorkflowsOnRoutingForms"
      ADD CONSTRAINT "WorkflowsOnRoutingForms_routingFormId_fkey"
      FOREIGN KEY ("routingFormId") REFERENCES "public"."App_RoutingForms_Form"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;
