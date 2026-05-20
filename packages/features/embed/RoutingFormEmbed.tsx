import type { ComponentProps } from "react";

import { Button, Dialog } from "@calcom/ui";

export const RoutingFormEmbedDialog = () => <Dialog />;

export const RoutingFormEmbedButton = ({ children, ...props }: ComponentProps<typeof Button>) => {
  return <Button {...props}>{children}</Button>;
};
