"use client";

import SettingsHeader from "@calcom/features/settings/appDir/SettingsHeader";
import SectionBottomActions from "@calcom/features/settings/SectionBottomActions";
import { trpc } from "@calcom/trpc/react";
import { Button } from "@calcom/ui/components/button";
import { Form, TextAreaField } from "@calcom/ui/components/form";
import { showToast } from "@calcom/ui/components/toast";
import { useForm } from "react-hook-form";

type SamlFormValues = {
  rawMetadata: string;
};

const copyToClipboard = async (value: string, message: string) => {
  await navigator.clipboard.writeText(value);
  showToast(message, "success");
};

export default function OrganizationSsoPage() {
  const utils = trpc.useUtils();
  const { data, isLoading } = trpc.viewer.organizations.getSamlSettings.useQuery();
  const form = useForm<SamlFormValues>({
    defaultValues: {
      rawMetadata: "",
    },
  });

  const saveMutation = trpc.viewer.organizations.saveSamlConnection.useMutation({
    onSuccess: async () => {
      await utils.viewer.organizations.getSamlSettings.invalidate();
      form.reset({ rawMetadata: "" });
      showToast("SAML configuration saved.", "success");
    },
    onError: (error) => showToast(error.message, "error"),
  });

  const deleteMutation = trpc.viewer.organizations.deleteSamlConnection.useMutation({
    onSuccess: async () => {
      await utils.viewer.organizations.getSamlSettings.invalidate();
      showToast("SAML configuration deleted.", "success");
    },
    onError: (error) => showToast(error.message, "error"),
  });

  const isBusy = saveMutation.isPending || deleteMutation.isPending;
  const canUpdate = Boolean(data?.canUpdate);
  const isSamlAvailable = Boolean(data?.isSamlAvailable);

  return (
    <SettingsHeader
      title="Single sign-on"
      description="Configure SAML SSO for your organization."
      borderInShellHeader={true}>
      <div className="border-subtle space-y-6 border-x border-y-0 px-4 py-6 sm:px-6">
        {!isLoading && !isSamlAvailable ? (
          <div className="rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
            SAML is not enabled in this environment. Set <code>SAML_DATABASE_URL</code> to persist SAML
            connections.
          </div>
        ) : null}

        <section className="space-y-3">
          <div>
            <h2 className="text-default text-base font-semibold">Service provider details</h2>
            <p className="text-subtle text-sm">
              Add these values to your Identity Provider before saving its metadata below.
            </p>
          </div>

          <div className="border-subtle divide-subtle rounded-md border">
            <div className="flex flex-col gap-2 border-b p-4 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <p className="text-subtle text-xs uppercase">ACS URL</p>
                <p className="text-default truncate text-sm">
                  {data?.serviceProvider.acsUrl ?? "Loading..."}
                </p>
              </div>
              <Button
                color="secondary"
                disabled={!data?.serviceProvider.acsUrl}
                onClick={() => copyToClipboard(data?.serviceProvider.acsUrl ?? "", "ACS URL copied.")}>
                Copy
              </Button>
            </div>
            <div className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <p className="text-subtle text-xs uppercase">SP Entity ID</p>
                <p className="text-default truncate text-sm">
                  {data?.serviceProvider.entityId ?? "Loading..."}
                </p>
              </div>
              <Button
                color="secondary"
                disabled={!data?.serviceProvider.entityId}
                onClick={() => copyToClipboard(data?.serviceProvider.entityId ?? "", "Entity ID copied.")}>
                Copy
              </Button>
            </div>
          </div>
        </section>

        {data?.connection ? (
          <section className="rounded-md border border-subtle p-4">
            <h2 className="text-default text-base font-semibold">Current SAML connection</h2>
            <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-subtle">Provider</dt>
                <dd className="text-default">{data.connection.provider}</dd>
              </div>
              <div>
                <dt className="text-subtle">IdP Entity ID</dt>
                <dd className="text-default truncate">{data.connection.entityID}</dd>
              </div>
            </dl>
          </section>
        ) : null}

        <Form
          form={form}
          handleSubmit={(values) => saveMutation.mutateAsync({ rawMetadata: values.rawMetadata })}>
          <TextAreaField
            {...form.register("rawMetadata", { required: true })}
            label="Identity Provider metadata"
            placeholder="Paste SAML metadata XML from your Identity Provider"
            disabled={!canUpdate || !isSamlAvailable || isBusy}
            rows={8}
            required
          />

          {!canUpdate ? (
            <p className="text-subtle text-sm">
              Only organization owners and admins can manage SSO settings.
            </p>
          ) : null}

          <SectionBottomActions align="end">
            {data?.connection ? (
              <Button
                type="button"
                variant="destructive"
                disabled={!canUpdate || !isSamlAvailable || isBusy}
                loading={deleteMutation.isPending}
                onClick={() => deleteMutation.mutate()}>
                Delete SAML configuration
              </Button>
            ) : null}
            <Button
              data-testid="save-saml-configuration"
              type="submit"
              disabled={!canUpdate || !isSamlAvailable || isBusy}
              loading={saveMutation.isPending}>
              Save SAML configuration
            </Button>
          </SectionBottomActions>
        </Form>
      </div>
    </SettingsHeader>
  );
}
