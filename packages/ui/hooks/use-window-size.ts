import { useState, useEffect, useMemo } from "react";

const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

type Breakpoint = keyof typeof BREAKPOINTS;

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
  breakpoint: Breakpoint;
  orientation: "portrait" | "landscape" | undefined;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export function useWindowSize(debounceMs = 250) {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
    breakpoint: "xs",
    orientation: undefined,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  const debounce = (fn: Function, ms: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, ms);
    };
  };

  const getBreakpoint = (width: number): Breakpoint => {
    const breakpointEntries = Object.entries(BREAKPOINTS).reverse();
    const [breakpoint] = breakpointEntries.find(
      ([_, minWidth]) => width >= minWidth
    ) || ["xs"];
    return breakpoint as Breakpoint;
  };

  const getDeviceType = (width: number) => {
    return {
      isMobile: width < BREAKPOINTS.md,
      isTablet: width >= BREAKPOINTS.md && width < BREAKPOINTS.lg,
      isDesktop: width >= BREAKPOINTS.lg,
    };
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const orientation = width > height ? "landscape" : "portrait";
      const breakpoint = getBreakpoint(width);
      const deviceType = getDeviceType(width);

      setWindowSize({
        width,
        height,
        orientation,
        breakpoint,
        ...deviceType,
      });
    };

    const debouncedHandleResize = debounce(handleResize, debounceMs);
    window.addEventListener("resize", debouncedHandleResize);

    handleResize();

    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []);

  const breakpointHelpers = useMemo(() => {
    if (!windowSize) return {};

    return Object.entries(BREAKPOINTS).reduce((acc, [breakpoint, minWidth]) => {
      acc[`min${breakpoint.toUpperCase()}`] =
        (windowSize.width ?? 0) >= minWidth;
      return acc;
    }, {} as Record<string, boolean>);
  }, [windowSize.width]);

  return {
    ...windowSize,
    ...breakpointHelpers,
  };
}
