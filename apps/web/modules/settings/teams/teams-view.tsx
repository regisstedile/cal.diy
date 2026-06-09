"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import SettingsHeader from "@calcom/features/settings/appDir/SettingsHeader";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import { MembershipRole } from "@calcom/prisma/enums";
import { trpc } from "@calcom/trpc/react";
import { Badge } from "@calcom/ui/components/badge";
import { Button } from "@calcom/ui/components/button";
import { EmptyScreen } from "@calcom/ui/components/empty-screen";
import { showToast } from "@calcom/ui/components/toast";

type InviteRole = typeof MembershipRole.MEMBER | typeof MembershipRole.ADMIN;

const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 48);

const inviteRoleOptions = [MembershipRole.MEMBER, MembershipRole.ADMIN];
const allRoleOptions = [MembershipRole.MEMBER, MembershipRole.ADMIN, MembershipRole.OWNER];

export default function TeamsView() {
  const { t } = useLocale();
  const utils = trpc.useUtils();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<InviteRole>(MembershipRole.MEMBER);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);

  const teamsQuery = trpc.viewer.teams.listForUser.useQuery();
  const pendingInvitesQuery = trpc.viewer.teams.listPendingInvites.useQuery();
  const selectedTeam = useMemo(
    () => teamsQuery.data?.find((team) => team.id === selectedTeamId) ?? teamsQuery.data?.[0],
    [selectedTeamId, teamsQuery.data]
  );
  const membersQuery = trpc.viewer.teams.listMembers.useQuery(
    { teamId: selectedTeam?.id ?? 0 },
    { enabled: Boolean(selectedTeam?.id) }
  );

  const invalidateTeams = async () => {
    await Promise.all([
      utils.viewer.teams.listForUser.invalidate(),
      utils.viewer.teams.listPendingInvites.invalidate(),
      utils.viewer.teams.listMembers.invalidate(),
    ]);
  };

  const createTeamMutation = trpc.viewer.teams.create.useMutation({
    onSuccess: async (team) => {
      setName("");
      setSlug("");
      setSelectedTeamId(team.id);
      showToast("Time criado.", "success");
      await invalidateTeams();
    },
    onError: (error) => showToast(error.message, "error"),
  });

  const inviteMemberMutation = trpc.viewer.teams.inviteMember.useMutation({
    onSuccess: async () => {
      setInviteEmail("");
      showToast("Convite criado.", "success");
      await invalidateTeams();
    },
    onError: (error) => showToast(error.message, "error"),
  });

  const updateMemberRoleMutation = trpc.viewer.teams.updateMemberRole.useMutation({
    onSuccess: async () => {
      showToast("Papel atualizado.", "success");
      await invalidateTeams();
    },
    onError: (error) => showToast(error.message, "error"),
  });

  const removeMemberMutation = trpc.viewer.teams.removeMember.useMutation({
    onSuccess: async () => {
      showToast("Membro removido.", "success");
      await invalidateTeams();
    },
    onError: (error) => showToast(error.message, "error"),
  });

  const deleteTeamMutation = trpc.viewer.teams.delete.useMutation({
    onSuccess: async () => {
      setSelectedTeamId(null);
      showToast("Time removido.", "success");
      await invalidateTeams();
    },
    onError: (error) => showToast(error.message, "error"),
  });

  const acceptInviteMutation = trpc.viewer.teams.acceptInvite.useMutation({
    onSuccess: async () => {
      showToast("Convite aceito.", "success");
      await invalidateTeams();
    },
    onError: (error) => showToast(error.message, "error"),
  });

  const declineInviteMutation = trpc.viewer.teams.declineInvite.useMutation({
    onSuccess: async () => {
      showToast("Convite recusado.", "success");
      await invalidateTeams();
    },
    onError: (error) => showToast(error.message, "error"),
  });

  const handleNameChange = (value: string) => {
    setName(value);
    setSlug((currentSlug) => currentSlug || slugify(value));
  };

  const canManageSelectedTeam =
    selectedTeam?.role === MembershipRole.OWNER || selectedTeam?.role === MembershipRole.ADMIN;

  return (
    <SettingsHeader
      title={t("teams")}
      description="Crie times internos, convide técnicos e gerencie permissões."
      borderInShellHeader={true}>
      <div className="space-y-6">
        {pendingInvitesQuery.data?.length ? (
          <section className="border-subtle rounded-b-lg border border-t-0 p-4">
            <h2 className="font-semibold text-emphasis text-sm">Convites pendentes</h2>
            <div className="mt-3 space-y-3">
              {pendingInvitesQuery.data.map((invite) => (
                <div
                  key={invite.id}
                  className="flex flex-col gap-3 border-subtle border-t pt-3 first:border-t-0 first:pt-0 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium text-emphasis text-sm">{invite.team.name}</p>
                    <p className="text-default text-sm">{invite.role}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      color="primary"
                      loading={acceptInviteMutation.isPending}
                      onClick={() => acceptInviteMutation.mutate({ teamId: invite.team.id })}>
                      Aceitar
                    </Button>
                    <Button
                      size="sm"
                      color="secondary"
                      loading={declineInviteMutation.isPending}
                      onClick={() => declineInviteMutation.mutate({ teamId: invite.team.id })}>
                      Recusar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="border-subtle rounded-b-lg border border-t-0 p-4">
          <h2 className="font-semibold text-emphasis text-sm">Criar time</h2>
          <form
            className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
            onSubmit={(event) => {
              event.preventDefault();
              createTeamMutation.mutate({ name, slug, bio: null });
            }}>
            <label className="block">
              <span className="text-default text-sm">Nome</span>
              <input
                value={name}
                onChange={(event) => handleNameChange(event.target.value)}
                className="border-subtle mt-1 h-9 w-full rounded-md border bg-default px-3 text-sm text-emphasis"
                placeholder="Técnicos Astoria"
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
            <Button
              className="self-end"
              StartIcon="plus"
              loading={createTeamMutation.isPending}
              disabled={!name || !slug}
              type="submit">
              Criar
            </Button>
          </form>
        </section>

        {teamsQuery.isLoading ? (
          <div className="border-subtle rounded-b-lg border border-t-0 p-4 text-default text-sm">
            Carregando times...
          </div>
        ) : teamsQuery.data?.length ? (
          <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
            <aside className="border-subtle rounded-md border">
              {teamsQuery.data.map((team) => (
                <button
                  key={team.id}
                  type="button"
                  className={`block w-full border-subtle border-b px-4 py-3 text-left last:border-b-0 ${
                    selectedTeam?.id === team.id ? "bg-subtle" : "bg-default hover:bg-muted"
                  }`}
                  onClick={() => setSelectedTeamId(team.id)}>
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate font-medium text-emphasis text-sm">{team.name}</p>
                    <Badge variant={team.role === MembershipRole.OWNER ? "green" : "gray"}>{team.role}</Badge>
                  </div>
                  <p className="mt-1 truncate text-default text-xs">/{team.slug}</p>
                  <p className="mt-1 text-default text-xs">{team._count.members} membros</p>
                </button>
              ))}
            </aside>

            {selectedTeam ? (
              <section className="border-subtle rounded-md border">
                <div className="flex flex-col gap-3 border-subtle border-b p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-semibold text-emphasis text-base">{selectedTeam.name}</h2>
                    <p className="text-default text-sm">/{selectedTeam.slug}</p>
                    <Link
                      href={`/settings/teams/${selectedTeam.slug}/event-types`}
                      className="text-default mt-1 flex items-center gap-1 text-xs hover:underline">
                      Tipos de evento →
                    </Link>
                  </div>
                  {selectedTeam.role === MembershipRole.OWNER ? (
                    <Button
                      color="destructive"
                      size="sm"
                      loading={deleteTeamMutation.isPending}
                      onClick={() => {
                        if (window.confirm("Excluir este time?")) {
                          deleteTeamMutation.mutate({ teamId: selectedTeam.id });
                        }
                      }}>
                      Excluir time
                    </Button>
                  ) : null}
                </div>

                {canManageSelectedTeam ? (
                  <form
                    className="grid gap-3 border-subtle border-b p-4 sm:grid-cols-[1fr_150px_auto]"
                    onSubmit={(event) => {
                      event.preventDefault();
                      inviteMemberMutation.mutate({
                        teamId: selectedTeam.id,
                        usernameOrEmail: inviteEmail,
                        role: inviteRole,
                      });
                    }}>
                    <label className="block">
                      <span className="text-default text-sm">E-mail do técnico</span>
                      <input
                        value={inviteEmail}
                        onChange={(event) => setInviteEmail(event.target.value)}
                        className="border-subtle mt-1 h-9 w-full rounded-md border bg-default px-3 text-sm text-emphasis"
                        placeholder="tecnico@empresa.com"
                        type="email"
                        required
                      />
                    </label>
                    <label className="block">
                      <span className="text-default text-sm">Papel</span>
                      <select
                        value={inviteRole}
                        onChange={(event) => setInviteRole(event.target.value as InviteRole)}
                        className="border-subtle mt-1 h-9 w-full rounded-md border bg-default px-3 text-sm text-emphasis">
                        <option value={MembershipRole.MEMBER}>MEMBER</option>
                        <option value={MembershipRole.ADMIN}>ADMIN</option>
                      </select>
                    </label>
                    <Button
                      className="self-end"
                      loading={inviteMemberMutation.isPending}
                      disabled={!inviteEmail}
                      type="submit">
                      Convidar
                    </Button>
                  </form>
                ) : null}

                <div className="divide-subtle divide-y">
                  {membersQuery.data?.map((member) => (
                    <div
                      key={member.id}
                      className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-emphasis text-sm">
                            {member.user.name || member.user.username || member.user.email}
                          </p>
                          {!member.accepted ? <Badge variant="orange">Pendente</Badge> : null}
                        </div>
                        <p className="text-default text-sm">{member.user.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={member.role}
                          disabled={!canManageSelectedTeam}
                          onChange={(event) =>
                            updateMemberRoleMutation.mutate({
                              teamId: selectedTeam.id,
                              userId: member.user.id,
                              role: event.target.value as MembershipRole,
                            })
                          }
                          className="border-subtle h-9 rounded-md border bg-default px-3 text-sm text-emphasis">
                          {(selectedTeam?.role === MembershipRole.OWNER
                            ? allRoleOptions
                            : inviteRoleOptions
                          ).map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                        {canManageSelectedTeam ? (
                          <Button
                            color="secondary"
                            size="sm"
                            loading={removeMemberMutation.isPending}
                            onClick={() =>
                              removeMemberMutation.mutate({
                                teamId: selectedTeam.id,
                                userId: member.user.id,
                              })
                            }>
                            Remover
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        ) : (
          <EmptyScreen
            Icon="users"
            headline="Nenhum time criado"
            description="Crie um time para agrupar os técnicos e preparar os agendamentos coletivos."
            className="rounded-b-lg rounded-t-none border-t-0"
          />
        )}
      </div>
    </SettingsHeader>
  );
}
