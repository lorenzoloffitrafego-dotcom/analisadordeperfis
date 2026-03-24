import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useResultsTheme } from "@/components/ResultsThemeContext";

interface InfoTooltipProps {
  text: string;
}

const InfoTooltip = ({ text }: InfoTooltipProps) => {
  let theme: "dark" | "light" = "dark";
  try {
    theme = useResultsTheme();
  } catch {}

  const light = theme === "light";

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full transition-all duration-200 cursor-help ml-2 shrink-0"
            style={{
              background: light ? "hsl(220,20%,90%)" : "hsl(220,20%,14%)",
              color: light ? "hsl(220,20%,45%)" : "hsl(210,40%,70%)",
            }}
          >
            <HelpCircle className="w-[14px] h-[14px]" strokeWidth={2.5} />
          </span>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="max-w-[260px] text-xs leading-relaxed rounded-lg px-3 py-2 shadow-lg animate-in fade-in-0 zoom-in-95 duration-200"
          style={{
            background: light ? "hsl(220,25%,15%)" : "hsl(220,20%,12%)",
            color: light ? "hsl(210,40%,95%)" : "hsl(210,40%,90%)",
            border: `1px solid ${light ? "hsl(220,15%,25%)" : "hsl(220,15%,20%)"}`,
          }}
        >
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default InfoTooltip;
