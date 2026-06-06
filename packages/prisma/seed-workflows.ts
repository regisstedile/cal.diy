#!/usr/bin/env tsx
/**
 * Seed de workflows de exemplo para o cal.diy.
 * Cria workflows padrão para o usuário "pro" (ou o primeiro usuário encontrado).
 *
 * Uso: npx tsx packages/prisma/seed-workflows.ts
 *   ou: npx tsx packages/prisma/seed-workflows.ts --email=seu@email.com
 */
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient, TimeUnit, WorkflowActions, WorkflowTemplates, WorkflowTriggerEvents } from "./generated/prisma/client";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);

const SENDER_NAME = "Cal.diy";

const REMINDER_EMAIL_BODY = `
<p>Olá {attendee_name},</p>
<p>Este é um lembrete do seu evento <strong>{event_name}</strong>.</p>
<ul>
  <li><strong>Data:</strong> {event_date_dddd, D [de] MMMM [de] YYYY}</li>
  <li><strong>Horário:</strong> {event_time_HH:mm} ({timezone})</li>
  <li><strong>Local:</strong> {location}</li>
</ul>
<p>Link da reunião: {meeting_url}</p>
<p>Precisa cancelar ou reagendar? <a href="{cancel_url}">Cancelar</a> | <a href="{reschedule_url}">Reagendar</a></p>
<p>Até breve,<br/>{organizer_name}</p>
`.trim();

const CONFIRMATION_EMAIL_BODY = `
<p>Olá {attendee_name},</p>
<p>Seu agendamento foi confirmado!</p>
<ul>
  <li><strong>Evento:</strong> {event_name}</li>
  <li><strong>Data:</strong> {event_date_dddd, D [de] MMMM [de] YYYY}</li>
  <li><strong>Horário:</strong> {event_time_HH:mm} ({timezone})</li>
  <li><strong>Local:</strong> {location}</li>
</ul>
<p>Link da reunião: {meeting_url}</p>
<p>Até breve,<br/>{organizer_name}</p>
`.trim();

const CANCELLATION_EMAIL_BODY = `
<p>Olá {attendee_name},</p>
<p>Infelizmente o evento <strong>{event_name}</strong> agendado para {event_date_D [de] MMMM} às {event_time_HH:mm} foi cancelado.</p>
{cancel_reason}
<p>Caso queira reagendar, acesse: <a href="{reschedule_url}">Reagendar</a></p>
<p>Atenciosamente,<br/>{organizer_name}</p>
`.trim();

const RESCHEDULE_EMAIL_BODY = `
<p>Olá {attendee_name},</p>
<p>Seu evento <strong>{event_name}</strong> foi reagendado.</p>
<ul>
  <li><strong>Nova data:</strong> {event_date_dddd, D [de] MMMM [de] YYYY}</li>
  <li><strong>Novo horário:</strong> {event_time_HH:mm} ({timezone})</li>
  <li><strong>Local:</strong> {location}</li>
</ul>
<p>Link da reunião: {meeting_url}</p>
<p>Atenciosamente,<br/>{organizer_name}</p>
`.trim();

const RATING_EMAIL_BODY = `
<p>Olá {attendee_name},</p>
<p>Obrigado por participar de <strong>{event_name}</strong>!</p>
<p>Sua opinião é muito importante. Por favor, avalie sua experiência:</p>
<p><a href="{rating_url}">⭐ Avaliar agora</a></p>
<p>Atenciosamente,<br/>{organizer_name}</p>
`.trim();

const HOST_NOTIFICATION_BODY = `
<p>Novo agendamento recebido!</p>
<ul>
  <li><strong>Evento:</strong> {event_name}</li>
  <li><strong>Participante:</strong> {attendee_name} ({attendee_email})</li>
  <li><strong>Data:</strong> {event_date_dddd, D [de] MMMM [de] YYYY}</li>
  <li><strong>Horário:</strong> {event_time_HH:mm} ({timezone})</li>
  <li><strong>Local:</strong> {location}</li>
</ul>
{additional_notes}
`.trim();

const SMS_REMINDER_BODY =
  "Lembrete: {event_name} em {event_date_D/M} às {event_time_HH:mm}. Local: {location}. Cancelar: {cancel_url}";

const SMS_CONFIRMATION_BODY =
  "Confirmado: {event_name} em {event_date_D/M} às {event_time_HH:mm}. Link: {meeting_url}";

type WorkflowDef = {
  name: string;
  trigger: WorkflowTriggerEvents;
  time?: number;
  timeUnit?: TimeUnit;
  steps: {
    stepNumber: number;
    action: WorkflowActions;
    template: WorkflowTemplates;
    reminderBody?: string;
    emailSubject?: string;
    sender?: string;
  }[];
};

const WORKFLOWS: WorkflowDef[] = [
  {
    name: "Lembrete 24h antes (email participante)",
    trigger: WorkflowTriggerEvents.BEFORE_EVENT,
    time: 24,
    timeUnit: TimeUnit.HOUR,
    steps: [
      {
        stepNumber: 1,
        action: WorkflowActions.EMAIL_ATTENDEE,
        template: WorkflowTemplates.REMINDER,
        emailSubject: "Lembrete: {event_name} amanhã às {event_time_HH:mm}",
        reminderBody: REMINDER_EMAIL_BODY,
        sender: SENDER_NAME,
      },
    ],
  },
  {
    name: "Lembrete 1h antes (email participante)",
    trigger: WorkflowTriggerEvents.BEFORE_EVENT,
    time: 60,
    timeUnit: TimeUnit.MINUTE,
    steps: [
      {
        stepNumber: 1,
        action: WorkflowActions.EMAIL_ATTENDEE,
        template: WorkflowTemplates.REMINDER,
        emailSubject: "Em 1 hora: {event_name} às {event_time_HH:mm}",
        reminderBody: REMINDER_EMAIL_BODY,
        sender: SENDER_NAME,
      },
    ],
  },
  {
    name: "Confirmação de booking (email participante)",
    trigger: WorkflowTriggerEvents.NEW_EVENT,
    steps: [
      {
        stepNumber: 1,
        action: WorkflowActions.EMAIL_ATTENDEE,
        template: WorkflowTemplates.REMINDER,
        emailSubject: "Confirmado: {event_name} em {event_date_D/M} às {event_time_HH:mm}",
        reminderBody: CONFIRMATION_EMAIL_BODY,
        sender: SENDER_NAME,
      },
    ],
  },
  {
    name: "Notificação de novo booking (email host)",
    trigger: WorkflowTriggerEvents.NEW_EVENT,
    steps: [
      {
        stepNumber: 1,
        action: WorkflowActions.EMAIL_HOST,
        template: WorkflowTemplates.CUSTOM,
        emailSubject: "Novo agendamento: {event_name} com {attendee_name}",
        reminderBody: HOST_NOTIFICATION_BODY,
        sender: SENDER_NAME,
      },
    ],
  },
  {
    name: "Cancelamento (email participante)",
    trigger: WorkflowTriggerEvents.EVENT_CANCELLED,
    steps: [
      {
        stepNumber: 1,
        action: WorkflowActions.EMAIL_ATTENDEE,
        template: WorkflowTemplates.CANCELLED,
        emailSubject: "Cancelado: {event_name} de {event_date_D/M}",
        reminderBody: CANCELLATION_EMAIL_BODY,
        sender: SENDER_NAME,
      },
    ],
  },
  {
    name: "Reagendamento (email participante)",
    trigger: WorkflowTriggerEvents.RESCHEDULE_EVENT,
    steps: [
      {
        stepNumber: 1,
        action: WorkflowActions.EMAIL_ATTENDEE,
        template: WorkflowTemplates.RESCHEDULED,
        emailSubject: "Reagendado: {event_name} para {event_date_D/M} às {event_time_HH:mm}",
        reminderBody: RESCHEDULE_EMAIL_BODY,
        sender: SENDER_NAME,
      },
    ],
  },
  {
    name: "Avaliação pós-evento (email participante)",
    trigger: WorkflowTriggerEvents.AFTER_EVENT,
    time: 30,
    timeUnit: TimeUnit.MINUTE,
    steps: [
      {
        stepNumber: 1,
        action: WorkflowActions.EMAIL_ATTENDEE,
        template: WorkflowTemplates.RATING,
        emailSubject: "Como foi seu {event_name}? Avalie em 1 minuto",
        reminderBody: RATING_EMAIL_BODY,
        sender: SENDER_NAME,
      },
    ],
  },
  {
    name: "Lembrete 1h antes (SMS participante)",
    trigger: WorkflowTriggerEvents.BEFORE_EVENT,
    time: 60,
    timeUnit: TimeUnit.MINUTE,
    steps: [
      {
        stepNumber: 1,
        action: WorkflowActions.SMS_ATTENDEE,
        template: WorkflowTemplates.REMINDER,
        reminderBody: SMS_REMINDER_BODY,
        sender: SENDER_NAME,
      },
    ],
  },
  {
    name: "Confirmação de booking (SMS participante)",
    trigger: WorkflowTriggerEvents.NEW_EVENT,
    steps: [
      {
        stepNumber: 1,
        action: WorkflowActions.SMS_ATTENDEE,
        template: WorkflowTemplates.REMINDER,
        reminderBody: SMS_CONFIRMATION_BODY,
        sender: SENDER_NAME,
      },
    ],
  },
  {
    name: "Lembrete 24h + Notificação host (combo)",
    trigger: WorkflowTriggerEvents.BEFORE_EVENT,
    time: 24,
    timeUnit: TimeUnit.HOUR,
    steps: [
      {
        stepNumber: 1,
        action: WorkflowActions.EMAIL_ATTENDEE,
        template: WorkflowTemplates.REMINDER,
        emailSubject: "Lembrete: {event_name} amanhã às {event_time_HH:mm}",
        reminderBody: REMINDER_EMAIL_BODY,
        sender: SENDER_NAME,
      },
      {
        stepNumber: 2,
        action: WorkflowActions.EMAIL_HOST,
        template: WorkflowTemplates.CUSTOM,
        emailSubject: "Lembrete: {event_name} amanhã com {attendee_name}",
        reminderBody: HOST_NOTIFICATION_BODY,
        sender: SENDER_NAME,
      },
    ],
  },
];

async function main() {
  const emailArg = process.argv.find((a) => a.startsWith("--email="))?.split("=")[1];

  const user = await prisma.user.findFirst({
    where: emailArg ? { email: emailArg } : undefined,
    select: { id: true, username: true, email: true },
    orderBy: { id: "asc" },
  });

  if (!user) {
    throw new Error(emailArg ? `Usuário com email ${emailArg} não encontrado.` : "Nenhum usuário encontrado no banco.");
  }

  console.log(`Criando workflows para: ${user.username ?? user.email} (id: ${user.id})\n`);

  let created = 0;
  let skipped = 0;

  for (const def of WORKFLOWS) {
    const existing = await prisma.workflow.findFirst({
      where: { userId: user.id, name: def.name },
    });

    if (existing) {
      console.log(`  SKIP  ${def.name}`);
      skipped++;
      continue;
    }

    const workflow = await prisma.workflow.create({
      data: {
        name: def.name,
        userId: user.id,
        trigger: def.trigger,
        time: def.time ?? null,
        timeUnit: def.timeUnit ?? null,
        isActiveOnAll: false,
      },
    });

    for (const step of def.steps) {
      await prisma.workflowStep.create({
        data: {
          stepNumber: step.stepNumber,
          action: step.action,
          template: step.template,
          reminderBody: step.reminderBody ?? null,
          emailSubject: step.emailSubject ?? null,
          sender: step.sender ?? SENDER_NAME,
          workflowId: workflow.id,
          numberVerificationPending: false,
          verifiedAt: new Date(),
        },
      });
    }

    console.log(`  OK    ${def.name}`);
    created++;
  }

  console.log(`\nConcluído: ${created} criados, ${skipped} já existiam.`);
  console.log(`Acesse: http://localhost:3005/workflows`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
