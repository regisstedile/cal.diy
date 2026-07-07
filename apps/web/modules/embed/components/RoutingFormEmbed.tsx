import type { ComponentProps } from "react";

import { tabs } from "@calcom/features/embed/lib/EmbedTabs";
import { useEmbedTypes } from "@calcom/features/embed/lib/hooks";

import { EmbedButton, EmbedDialog } from "./Embed";

export const RoutingFormEmbedDialog = () => {
  const types = useEmbedTypes();

  return (
    <EmbedDialog
      types={types}
      tabs={tabs}
      eventTypeHideOptionDisabled={true}
      defaultBrandColor={null}
    />
  );
};

export const RoutingFormEmbedButton = (props: ComponentProps<typeof EmbedButton>) => {
  return <EmbedButton {...props} />;
};
