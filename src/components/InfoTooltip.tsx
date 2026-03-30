import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useResultsTheme, t } from "@/components/ResultsThemeContext";

interface InfoTooltipProps {
  text: string;
}

const InfoTooltip = ({ text }: InfoTooltipProps) => {
  let theme: "dark" | "light" = "dark";
  try { theme = useResultsTheme(); } catch {}
  const th = t(theme);

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className="inline-flex items-center justify-center w-4 h-4 rounded-full cursor-help ml-1 shrink-0 transition-opacity hover:opacity-80"
            style={{ background: `${th.mutedText}20`, color: th.mutedText }}
          >
            <HelpCircle className="w-3 h-3" strokeWidth={2.5} />
          </span>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="max-w-[240px] text-xs leading-relaxed rounded-lg px-3 py-2 shadow-xl"
          style={{
            background: theme === "dark" ? "hsl(230,20%,15%)" : "hsl(220,25%,15%)",
            color: "hsl(210,40%,92%)",
            border: `1px solid hsl(230,15%,22%)`,
          }}
        >
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default InfoTooltip;
