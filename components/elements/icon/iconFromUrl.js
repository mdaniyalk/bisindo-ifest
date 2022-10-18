/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import React from "react";

export function IconFromUrl({ url, alt, className }) {
  return <img src={url} alt={alt} className={clsx("w-6 h-6", className)} />;
}
