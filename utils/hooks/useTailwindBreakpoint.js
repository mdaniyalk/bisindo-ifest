import { useEffect, useState } from "react";
import useBreakpoint from "use-breakpoint";

export const BREAKPOINTS = {
  default: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export function useTailwindBreakpoint() {
  const { minWidth, maxWidth } = useBreakpoint(BREAKPOINTS);

  const [isDefault, setIsDefault] = useState(true);
  const [isSm, setIsSm] = useState(false);
  const [isMd, setIsMd] = useState(false);
  const [isLg, setIsLg] = useState(false);
  const [isXl, setIsXl] = useState(false);
  const [is2Xl, setIs2Xl] = useState(false);

  useEffect(() => {
    if (minWidth === BREAKPOINTS.default) {
      setIsDefault(true);
    } else {
      setIsDefault(false);
    }

    if (minWidth === BREAKPOINTS.sm) {
      setIsSm(true);
    } else {
      setIsSm(false);
    }

    if (minWidth === BREAKPOINTS.md) {
      setIsMd(true);
    } else {
      setIsMd(false);
    }

    if (minWidth === BREAKPOINTS.lg) {
      setIsLg(true);
    } else {
      setIsLg(false);
    }

    if (minWidth === BREAKPOINTS.xl) {
      setIsXl(true);
    } else {
      setIsXl(false);
    }

    if (minWidth === BREAKPOINTS["2xl"]) {
      setIs2Xl(true);
    } else {
      setIs2Xl(false);
    }
  }, [minWidth]);

  return { isDefault, isSm, isMd, isLg, isXl, is2Xl };
}
