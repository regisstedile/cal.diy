"use client";

import SettingsHeader from "@calcom/features/settings/appDir/SettingsHeader";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import { trpc } from "@calcom/trpc/react";
import { Button } from "@calcom/ui/components/button";
import { showToast } from "@calcom/ui/components/toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 48);

export default function NewTeamView() {
  const { t } = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams?.get("returnTo") ?? "/settings/teams";
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [bio, setBio] = useState("");

  const createTeamMutation = trpc.viewer.teams.create.useMutation({
    onSuccess: async () => {
      showToast("Time criado.", "success");
      router.push(returnTo);
    },
    onError: (error) => showToast(error.message, "error"),
  });

  const handleNameChange = (value: string) => {
    setName(value);
    setSlug((currentSlug) => currentSlug || slugify(value));
  };

  return (
    <SettingsHeader
      title={t("create_new_team")}
      description="Defina nome e URL do time. Convide membros depois em Times."
      borderInShellHeader={true}>
      <form
        className="border-subtle rounded-b-lg border border-t-0 p-4"
        onSubmit={(event) => {
          event.preventDefault();
          createTeamMutation.mutate({ name, slug, bio: bio.trim() || null });
        }}>
        <div className="grid gap-3 sm:max-w-md">
          <label className="block">
            <span className="text-default text-sm">Nome</span>
            <input
              value={name}
              onChange={(event) => handleNameChange(event.target.value)}
              className="border-subtle mt-1 h-9 w-full rounded-md border bg-default px-3 text-sm text-emphasis"
              placeholder="Técnicos Astoria"
              autoFocus
              required
            />
          </label>
          <label className="block">
            <span className="text-default text-sm">URL</span>
            <input
              value={slug}
              onChange={(event) => setSlug(slugify(event.target.value))}
              className="border-subtle mt-1 h-9 w-full rounded-md border bg-default px-3 text-sm text-emphasis"
              placeholder="tecnicos-astoria"
              required
            />
          </label>
          <label className="block">
            <span className="text-default text-sm">Descrição (opcional)</span>
            <textarea
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              rows={3}
              maxLength={500}
              className="border-subtle mt-1 w-full rounded-md border bg-default px-3 py-2 text-sm text-emphasis"
              placeholder="Equipe de atendimento em campo"
            />
          </label>
          <div className="flex gap-2">
            <Button
              StartIcon="plus"
              loading={createTeamMutation.isPending}
              disabled={!name || !slug}
              type="submit">
              {t("create")}
            </Button>
            <Button color="secondary" href={returnTo} type="button">
              {t("cancel")}
            </Button>
          </div>
        </div>
      </form>
    </SettingsHeader>
  );
}
