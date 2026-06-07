-- Seed seguro de feature flags faltantes no banco cal_src.
-- Data: 2026-06-07
--
-- Este script NAO ativa features em producao.
-- Ele apenas cadastra flags conhecidas pelo codigo com enabled=false.
-- Flags existentes nao sao alteradas.
--
-- Aplicar manualmente, quando desejado:
-- docker exec -i postgres psql -U n8n -d cal_src < docs/allged/10-customizacoes/06-seed-feature-flags-cal-src.sql

BEGIN;

INSERT INTO "Feature" (slug, enabled, description, type, stale)
VALUES
  ('emails', false, 'Controls application email delivery feature gates.', 'RELEASE', false),
  ('webhooks', false, 'Controls webhook management and dispatch feature gates.', 'RELEASE', false),
  ('email-verification', false, 'Requires and manages user email verification flows.', 'RELEASE', false),
  ('delegation-credential', false, 'Enables organization delegation credentials flows.', 'RELEASE', false),
  ('salesforce-crm-tasker', false, 'Enables Salesforce CRM tasker integration jobs.', 'RELEASE', false),
  ('cal-video-log-in-overlay', false, 'Enables Cal Video login overlay behavior.', 'RELEASE', false),
  ('calendar-subscription-cache', false, 'Enables calendar subscription cache.', 'RELEASE', false),
  ('calendar-subscription-sync', false, 'Enables calendar subscription sync jobs.', 'RELEASE', false),
  ('booker-botid', false, 'Enables bot detection integration on booking flows.', 'RELEASE', false),
  ('booking-calendar-view', false, 'Enables booking calendar view experiments.', 'RELEASE', false),
  ('booking-email-sms-tasker', false, 'Enables tasker-backed booking email/SMS jobs.', 'RELEASE', false),
  ('hwm-seating', false, 'Enables high-watermark seating behavior.', 'RELEASE', false),
  ('signup-watchlist-review', false, 'Enables signup watchlist review flow.', 'RELEASE', false),
  ('sink-shortener', false, 'Enables Sink URL shortener integration.', 'RELEASE', false),
  ('cal-ai-voice-agents', false, 'Enables Cal AI voice agent workflows and UI.', 'RELEASE', false)
ON CONFLICT (slug) DO NOTHING;

COMMIT;

