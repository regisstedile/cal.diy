"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { useLocale } from "@calcom/lib/hooks/useLocale";
import { SchedulingType } from "@calcom/prisma/enums";
import { trpc } from "@calcom/trpc/react";
import { Badge } from "@calcom/ui/components/badge";
import { Button } from "@calcom/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@calcom/ui/components/dialog";
import { Form, InputField, Label, SelectField } from "@calcom/ui/components/form";
import { Icon } from "@calcom/ui/components/icon";
import { showToast } from "@calcom/ui/components/toast";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

const createSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(255),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(64)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and single hyphens."),
  length: z.coerce.number().int().min(1).max(720),
  schedulingType: z.nativeEnum(SchedulingType).nullable(),
});

type CreateFormValues = z.infer<typeof createSchema>;

type SchedulingOption = { value: SchedulingType | "none"; label: string };

const schedulingTypeOptions: SchedulingOption[] = [
  { value: "none", label: "Individual (no round-robin)" },
  { value: SchedulingType.ROUND_ROBIN, label: "Round Robin" },
  { value: SchedulingType.COLLECTIVE, label: "Collective" },
];

export default function TeamEventTypesView({ teamId, teamSlug }: { teamId: number; teamSlug: string }) {
  const { t } = useLocale();
  const [createOpen, setCreateOpen] = useState(false);
  const utils = trpc.useUtils();

  const { data: eventTypes, isLoading } = trpc.viewer.teams.eventTypes.list.useQuery({ teamId });

  const createMutation = trpc.viewer.teams.eventTypes.create.useMutation({
    onSuccess: () => {
      showToast(t("team_event_type_created"), "success");
      void utils.viewer.teams.eventTypes.list.invalidate({ teamId });
      setCreateOpen(false);
      form.reset();
    },
    onError: (err) => showToast(err.message, "error"),
  });

  const deleteMutation = trpc.viewer.teams.eventTypes.delete.useMutation({
    onSuccess: () => {
      showToast(t("team_event_type_deleted"), "success");
      void utils.viewer.teams.eventTypes.list.invalidate({ teamId });
    },
    onError: (err) => showToast(err.message, "error"),
  });

  const form = useForm<CreateFormValues>({
    resolver: zodResolver(createSchema),
    defaultValues: { title: "", slug: "", length: 60, schedulingType: null },
  });

  const onSubmit = (values: CreateFormValues) => {
    createMutation.mutate({
      teamId,
      title: values.title,
      slug: values.slug,
      length: values.length,
      schedulingType: values.schedulingType,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/settings/teams"
            className="text-subtle mb-1 flex items-center gap-1 text-sm hover:underline">
            <Icon name="arrow-left" className="h-4 w-4" />
            {t("teams")}
          </Link>
          <h2 className="text-emphasis text-xl font-semibold">{t("team_event_types")}</h2>
          <p className="text-subtle text-sm">{t("team_event_types_description")}</p>
        </div>
        <Button onClick={() => setCreateOpen(true)} StartIcon="plus">
          {t("new_team_event_type")}
        </Button>
      </div>

      {isLoading ? (
        <p className="text-subtle text-sm">{t("loading")}</p>
      ) : !eventTypes?.length ? (
        <div className="border-subtle rounded-lg border p-8 text-center">
          <p className="text-subtle text-sm">{t("no_team_event_types_yet")}</p>
        </div>
      ) : (
        <ul className="border-subtle divide-subtle divide-y rounded-lg border">
          {eventTypes.map((et) => (
            <li key={et.id} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-emphasis font-medium">{et.title}</p>
                  <p className="text-subtle text-sm">
                    /{teamSlug}/{et.slug} · {et.length} min
                  </p>
                </div>
                {et.schedulingType === SchedulingType.ROUND_ROBIN && (
                  <Badge variant="blue">{t("round_robin")}</Badge>
                )}
                {et.schedulingType === SchedulingType.COLLECTIVE && (
                  <Badge variant="green">{t("collective")}</Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-subtle text-sm">
                  {et.hosts.length} {t("hosts")}
                </span>
                <Button
                  color="destructive"
                  variant="icon"
                  size="sm"
                  StartIcon="trash"
                  loading={deleteMutation.isPending}
                  onClick={() => {
                    if (confirm(`Delete "${et.title}"?`)) {
                      deleteMutation.mutate({ teamId, eventTypeId: et.id });
                    }
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader title={t("new_team_event_type")} />
          <Form form={form} handleSubmit={onSubmit}>
            <div className="flex flex-col gap-4 pt-2">
              <InputField
                label={t("title")}
                placeholder="Team meeting"
                {...form.register("title", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    if (!form.formState.dirtyFields.slug) {
                      form.setValue("slug", slugify(e.target.value), { shouldValidate: false });
                    }
                  },
                })}
              />
              <InputField
                label="Slug"
                placeholder={t("team_event_type_slug_placeholder")}
                addOnLeading={`/${teamSlug}/`}
                {...form.register("slug")}
              />
              <InputField
                label={t("duration_in_minutes")}
                type="number"
                {...form.register("length")}
              />
              <div>
                <Label>{t("scheduling_type")}</Label>
                <Controller
                  name="schedulingType"
                  control={form.control}
                  render={({ field }) => (
                    <SelectField
                      options={schedulingTypeOptions}
                      value={schedulingTypeOptions.find((o) => o.value === (field.value ?? "none"))}
                      onChange={(opt) => field.onChange(opt?.value === "none" ? null : (opt?.value ?? null))}
                    />
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" color="minimal" onClick={() => setCreateOpen(false)}>
                {t("cancel")}
              </Button>
              <Button type="submit" loading={createMutation.isPending}>
                {t("create")}
              </Button>
            </DialogFooter>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
