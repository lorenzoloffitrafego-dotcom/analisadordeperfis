import { createContext, useContext } from "react";

export type ResultsTheme = "dark" | "light";

export const ResultsThemeContext = createContext<ResultsTheme>("dark");

export const useResultsTheme = () => useContext(ResultsThemeContext);

export function t(theme: ResultsTheme) {
  const light = theme === "light";
  return {
    pageBg: light
      ? "#f8f9fc"
      : "#0c0c14",
    pageText: light ? "hsl(220,25%,10%)" : "hsl(210,40%,95%)",
    subtitle: light ? "hsl(215,15%,50%)" : "hsl(215,15%,55%)",

    cardBg: light ? "rgba(255,255,255,0.95)" : "rgba(18,18,30,0.85)",
    cardBorder: light ? "hsl(220,15%,90%)" : "hsl(230,15%,18%)",
    cardShadow: light
      ? "0 1px 3px hsl(220 25% 10% / 0.04), 0 4px 16px hsl(220 25% 10% / 0.06)"
      : "0 1px 3px hsl(0 0% 0% / 0.2), 0 4px 16px hsl(0 0% 0% / 0.3)",

    innerBg: light ? "hsl(220,20%,97%)" : "hsl(230,20%,12%)",
    innerBgHover: light ? "hsl(220,20%,94%)" : "hsl(230,25%,14%)",

    thColor: light ? "hsl(215,15%,50%)" : "hsl(215,15%,45%)",
    borderColor: light ? "hsl(220,15%,92%)" : "hsl(230,15%,16%)",
    borderColorLight: light ? "hsl(220,15%,94%)" : "hsl(230,15%,13%)",
    rowUserBg: light ? "hsl(230,80%,65%,0.03)" : "hsl(230,80%,65%,0.04)",
    cellMuted: light ? "hsl(215,15%,40%)" : "hsl(215,15%,55%)",

    selectBg: light ? "white" : "hsl(230,20%,10%)",
    selectBorder: light ? "hsl(220,15%,88%)" : "hsl(230,15%,18%)",

    mutedText: light ? "hsl(215,15%,50%)" : "hsl(215,15%,50%)",
    labelText: light ? "hsl(215,15%,55%)" : "hsl(215,15%,50%)",
    bodyText: light ? "hsl(215,15%,35%)" : "hsl(215,15%,65%)",

    tableHeaderBg: light ? "hsl(220,20%,98%)" : "rgba(15,15,25,0.6)",

    // Accent colors
    accentBlue: "hsl(230,80%,65%)",
    accentGreen: "hsl(160,70%,48%)",
    accentPurple: "hsl(270,70%,60%)",
    accentYellow: "hsl(40,90%,55%)",
    accentPink: "hsl(340,70%,55%)",
    accentOrange: "hsl(25,90%,55%)",
  };
}
