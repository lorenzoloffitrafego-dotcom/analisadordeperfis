import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InfoTooltipProps {
  text: string;
}

const InfoTooltip = ({ text }: InfoTooltipProps) => (
  <TooltipProvider delayDuration={200}>
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[hsl(220,20%,14%)] text-[hsl(210,40%,70%)] hover:bg-[hsl(230,80%,65%)] hover:text-white transition-all duration-200 cursor-help ml-2 shrink-0">
          <HelpCircle className="w-[14px] h-[14px]" strokeWidth={2.5} />
        </span>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="max-w-[260px] text-xs leading-relaxed bg-[hsl(220,20%,12%)] text-[hsl(210,40%,90%)] border border-[hsl(220,15%,20%)] rounded-lg px-3 py-2 shadow-lg animate-in fade-in-0 zoom-in-95 duration-200"
      >
        {text}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default InfoTooltip;
