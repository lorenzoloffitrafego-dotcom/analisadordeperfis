import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip, CartesianGrid } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProfileAvatar from "@/components/ProfileAvatar";

interface PostingDaysCardProps {
  profiles: Record<string, Record<string, any>>;
  profileNames: string[];
  getLabel: (key: string) => string;
  getFoto: (key: string) => string | undefined;
}

const PURPLE = "hsl(258, 80%, 62%)";
const PROFILE_DOTS: Record<string, string> = {
  meu_perfil: "hsl(170, 65%, 60%)",
  perfil1: "hsl(250, 70%, 78%)",
  perfil2: "hsl(0, 75%, 82%)",
};

const DAY_LABELS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const JS_DAY_TO_INDEX: Record<number, number> = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 0: 6 };

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

const PostingDaysCard = ({ profiles, profileNames, getLabel, getFoto }: PostingDaysCardProps) => {
  const [account, setAccount] = useState(profileNames[0] || "meu_perfil");

  const profile = profiles[account] || {};
  const counts = getPostsByDay(profile);
  const total = counts.reduce((a, b) => a + b, 0);

  const chartData = DAY_LABELS.map((day, i) => ({
    day,
    posts: counts[i],
    pct: total > 0 ? Math.round((counts[i] / total) * 100) : 0,
  }));

  return (
    <div className="rounded-2xl bg-white p-6 flex flex-col" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.05)" }}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-bold text-base" style={{ color: "hsl(225,30%,15%)" }}>Distribuição por Dia</h3>
        <Select value={account} onValueChange={setAccount}>
          <SelectTrigger className="w-[150px] h-9 rounded-full text-xs bg-white" style={{ borderColor: "hsl(220,15%,90%)" }}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {profileNames.map((name) => {
              const foto = getFoto(name);
              return (
                <SelectItem key={name} value={name} className="text-xs">
                  <div className="flex items-center gap-2">
                    {foto ? (
                      <img
                        src={`https://images.weserv.nl/?url=${encodeURIComponent(foto)}`}
                        className="w-5 h-5 rounded-full object-cover"
                        style={{ border: `1.5px solid ${PROFILE_DOTS[name]}` }}
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: PROFILE_DOTS[name] }} />
                    )}
                    {getLabel(name)}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full h-[220px] flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 8, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,93%)" vertical={false} />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "hsl(220,15%,50%)", fontSize: 12, fontWeight: 500 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(220,15%,50%)", fontSize: 11 }} allowDecimals={false} />
            <Tooltip
              cursor={{ fill: "hsl(220,15%,96%)", radius: 6 }}
              content={({ active, payload }: any) => {
                if (!active || !payload?.length) return null;
                const { day, posts, pct } = payload[0].payload;
                return (
                  <div className="rounded-lg px-3 py-2 shadow-lg bg-white" style={{ border: "1px solid hsl(220,15%,90%)", color: "hsl(225,30%,15%)" }}>
                    <p className="text-sm font-bold">{day}</p>
                    <p className="text-xs" style={{ color: "hsl(220,15%,50%)" }}>{posts} {posts === 1 ? "post" : "posts"} · {pct}%</p>
                  </div>
                );
              }}
            />
            <Bar dataKey="posts" radius={[6, 6, 0, 0]} maxBarSize={36} animationDuration={700}>
              {chartData.map((_, idx) => <Cell key={idx} fill={PURPLE} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PostingDaysCard;
