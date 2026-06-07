-- Restore impersonation support that was removed from cal.diy in 20260319100000_drop_impersonations_table.
-- This migration is intentionally idempotent because the production database was hotfixed manually first.

ALTER TABLE "users"
  ADD COLUMN IF NOT EXISTS "disableImpersonation" BOOLEAN NOT NULL DEFAULT false;

CREATE TABLE IF NOT EXISTS "Impersonations" (
  "id" SERIAL NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "impersonatedUserId" INTEGER NOT NULL,
  "impersonatedById" INTEGER NOT NULL,
  CONSTRAINT "Impersonations_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "Impersonations_impersonatedUserId_idx"
  ON "Impersonations"("impersonatedUserId");

CREATE INDEX IF NOT EXISTS "Impersonations_impersonatedById_idx"
  ON "Impersonations"("impersonatedById");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'Impersonations_impersonatedUserId_fkey'
  ) THEN
    ALTER TABLE "Impersonations"
      ADD CONSTRAINT "Impersonations_impersonatedUserId_fkey"
      FOREIGN KEY ("impersonatedUserId")
      REFERENCES "users"("id")
      ON DELETE CASCADE
      ON UPDATE CASCADE;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'Impersonations_impersonatedById_fkey'
  ) THEN
    ALTER TABLE "Impersonations"
      ADD CONSTRAINT "Impersonations_impersonatedById_fkey"
      FOREIGN KEY ("impersonatedById")
      REFERENCES "users"("id")
      ON DELETE CASCADE
      ON UPDATE CASCADE;
  END IF;
END $$;
