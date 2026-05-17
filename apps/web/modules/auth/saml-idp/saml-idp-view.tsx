"use client";

import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function SamlIdp({ code }: { code: string }) {
  useEffect(() => {
    signIn("saml-idp", { callbackUrl: "/", code });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
