// useMediaQuery.ts
import { useEffect, useState } from "react";
import { breakpoints } from "./breakpoint";

function toMediaQuery(input: string): string {
  // 如果传的是断点名，转为 min-width 查询
  if (breakpoints[input as keyof typeof breakpoints]) {
    return `(min-width: ${breakpoints[input as keyof typeof breakpoints]})`;
  }
  // 否则假设是原生 media query 字符串
  return input;
}

export function useMediaQuery(query: string): boolean {
  const mediaQuery = toMediaQuery(query);
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(mediaQuery).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQueryList = window.matchMedia(mediaQuery);
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", handleChange);
    } else {
      mediaQueryList.addListener(handleChange);
    }

    setMatches(mediaQueryList.matches);

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener("change", handleChange);
      } else {
        mediaQueryList.removeListener(handleChange);
      }
    };
  }, [mediaQuery]);

  return matches;
}
