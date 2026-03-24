import { createContext, useContext } from "react";

export type ResultsTheme = "dark" | "light";

export const ResultsThemeContext = createContext<ResultsTheme>("dark");

export const useResultsTheme = () => useContext(ResultsThemeContext);

// Theme tokens for components to consume
export function t(theme: ResultsTheme) {
  const light = theme === "light";
  return {
    // Page
    pageBg: light
      ? "linear-gradient(180deg, #f5f7fb 0%, #e8ecf4 100%)"
      : "linear-gradient(180deg, #0f0f0f 0%, #1a1a2e 100%)",
    pageText: light ? "hsl(220,25%,10%)" : "hsl(210,40%,95%)",
    pageOverlay: light
      ? "radial-gradient(ellipse 80% 50% at 50% 0%, hsl(230 80% 65% / 0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, hsl(280 60% 50% / 0.03) 0%, transparent 50%)"
      : "radial-gradient(ellipse 80% 50% at 50% 0%, hsl(230 80% 65% / 0.1) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, hsl(280 60% 50% / 0.05) 0%, transparent 50%)",
    subtitle: light ? "hsl(215,15%,45%)" : "hsl(215,15%,50%)",

    // Cards
    cardBg: light ? "rgba(255,255,255,0.9)" : "hsla(220,20%,8%,0.8)",
    cardBorder: light ? "hsl(220,15%,88%)" : "hsla(220,15%,14%,0.5)",
    cardShadow: light
      ? "0 8px 32px -8px hsl(220 25% 10% / 0.08)"
      : "0 8px 32px -8px hsl(0 0% 0% / 0.5)",

    // Inner surfaces (metric boxes, table rows)
    innerBg: light ? "hsl(220,20%,96%)" : "hsl(220,20%,10%)",
    innerBgHover: light ? "hsl(220,20%,93%)" : "hsl(230,30%,12%)",

    // Table
    thColor: light ? "hsl(215,15%,45%)" : "hsl(215,15%,45%)",
    thHover: light ? "hsl(220,25%,25%)" : "hsl(210,40%,80%)",
    borderColor: light ? "hsl(220,15%,90%)" : "hsl(220,15%,14%)",
    borderColorLight: light ? "hsl(220,15%,92%)" : "hsl(220,15%,10%)",
    rowUserBg: light ? "hsl(230,80%,65%,0.04)" : "hsl(230,80%,65%,0.04)",
    cellMuted: light ? "hsl(215,15%,40%)" : "hsl(215,15%,50%)",

    // Select / inputs
    selectBg: light ? "white" : "hsl(220,20%,6%)",
    selectBorder: light ? "hsl(220,15%,85%)" : "hsl(220,15%,14%)",

    // Labels
    mutedText: light ? "hsl(215,15%,45%)" : "hsl(215,15%,45%)",
    labelText: light ? "hsl(215,15%,50%)" : "hsl(215,15%,50%)",
    bodyText: light ? "hsl(215,15%,35%)" : "hsl(215,15%,60%)",

    // Header bg for table
    tableHeaderBg: light ? "hsl(220,20%,97%)" : "hsla(220,20%,5%,0.8)",
  };
}
