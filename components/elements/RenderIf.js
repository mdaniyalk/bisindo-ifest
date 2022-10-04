import React from "react";

export function RenderIf({ children, when = false }) {
  if (when) return <>{children}</>;
  return <></>;
}
