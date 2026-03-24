import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useResultsTheme, t } from "@/components/ResultsThemeContext";

interface PostingDaysCardProps {
  profiles: Record<string, Record<string, any>>;
  profileNames: string[];
  getLabel: (key: string) => string;
  getFoto: (key: string) => string | undefined;
}

const DAY_LABELS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const JS_DAY_TO_INDEX: Record<number, number> = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 0: 6 };

const BAR_COLORS = [
  "hsl(230, 75%, 62%)",
  "hsl(250, 70%, 65%)",
  "hsl(270, 65%, 60%)",
  "hsl(290, 60%, 58%)",
  "hsl(310, 55%, 55%)",
  "hsl(330, 60%, 58%)",
  "hsl(350, 65%, 60%)",
];

const HIGHLIGHT_COLOR = "hsl(45, 95%, 55%)";

function getPostsByDay(profile: Record<string, any>): number[] {
  const counts = [0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i <= 9; i++) {
    const raw = profile[`post${i}`];
    if (!raw || raw === 0) continue;
    try {
      const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
      if (parsed?.data_postagem) {
        const date = new Date(parsed.data_postagem + "T12:00:00");
        if (!isNaN(date.getTime())) {
          const idx = JS_DAY_TO_INDEX[date.getDay()];
          if (idx !== undefined) counts[idx]++;
        }
      }
    } catch {}
  }
  return counts;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const { day, posts, pct } = payload[0].payload;
  return (
    <div className="rounded-lg border border-[hsl(220,15%,85%)] bg-white px-3 py-2 shadow-lg">
      <p className="text-sm font-bold text-[hsl(220,20%,10%)]">{day}</p>
      <p className="text-xs text-[hsl(220,15%,40%)]">
        {posts} {posts === 1 ? "post" : "posts"} · {pct}%
      </p>
    </div>
  );
};

const PostingDaysCard = ({ profiles, profileNames, getLabel, getFoto }: PostingDaysCardProps) => {
  const theme = useResultsTheme();
  const th = t(theme);

  const [account, setAccount] = useState(profileNames[0] || "meu_perfil");

  const profile = profiles[account] || {};
  const counts = getPostsByDay(profile);
  const total = counts.reduce((a, b) => a + b, 0);
  const max = Math.max(...counts);

  const chartData = DAY_LABELS.map((day, i) => ({
    day,
    posts: counts[i],
    pct: total > 0 ? Math.round((counts[i] / total) * 100) : 0,
    isMax: counts[i] === max && max > 0,
  }));

  const tickColor = theme === "light" ? "hsl(215,15%,45%)" : "hsl(215,15%,50%)";
  const yTickColor = theme === "light" ? "hsl(215,15%,55%)" : "hsl(215,15%,35%)";
  const cursorFill = theme === "light" ? "hsl(220,20%,93%)" : "hsl(220,20%,15%)";

  return (
    <div
      className="rounded-2xl border backdrop-blur-sm p-6 flex flex-col transition-colors duration-500"
      style={{ borderColor: th.cardBorder, background: th.cardBg, boxShadow: th.cardShadow }}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-[hsl(45,95%,55%)]" />
          <h3 className="font-display font-bold text-sm">Distribuição por Dia da Semana</h3>
        </div>
        <Select value={account} onValueChange={setAccount}>
          <SelectTrigger className="w-[180px] h-8 text-xs" style={{ borderColor: th.selectBorder, background: th.selectBg }}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {profileNames.map((name) => (
              <SelectItem key={name} value={name} className="text-xs">
                <div className="flex items-center gap-2">
                  {getFoto(name) && (
                    <img
                      src={`https://images.weserv.nl/?url=${encodeURIComponent(getFoto(name) || "")}`}
                      className="w-5 h-5 rounded-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  )}
                  {getLabel(name)}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: tickColor, fontSize: 11, fontWeight: 600 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: yTickColor, fontSize: 10 }}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: cursorFill, radius: 6 }} />
            <Bar
              dataKey="posts"
              radius={[8, 8, 0, 0]}
              maxBarSize={40}
              animationDuration={800}
              animationEasing="ease-out"
            >
              {chartData.map((entry, idx) => (
                <Cell
                  key={idx}
                  fill={entry.isMax ? HIGHLIGHT_COLOR : BAR_COLORS[idx % BAR_COLORS.length]}
                  style={{ filter: entry.isMax ? "brightness(1.15) drop-shadow(0 0 6px hsl(45,95%,55%,0.4))" : undefined }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PostingDaysCard;
