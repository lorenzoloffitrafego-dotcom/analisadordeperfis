import { useState } from "react";
import { FileText, ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useResultsTheme, t } from "@/components/ResultsThemeContext";
import ProfileAvatar from "@/components/ProfileAvatar";

interface PostData {
  tipo: string;
  views: number;
  likes: number;
  comentarios: number;
  thumbnail: string;
  url_post: string;
  data_postagem: string;
  legenda?: string;
  descricao?: string;
  _account?: string;
}

interface PostsTableProps {
  profiles: Record<string, Record<string, any>>;
  profileNames: string[];
  getLabel: (key: string) => string;
  getFoto: (key: string) => string | undefined;
}

function formatNum(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function formatDate(d: string): string {
  if (!d) return "—";
  const [y, m, day] = d.split("-");
  return `${day}/${m}/${y}`;
}

const tipoBadge: Record<string, { bg: string; color: string }> = {
  Reel: { bg: "hsl(258, 80%, 62%)", color: "#fff" },
  Reels: { bg: "hsl(258, 80%, 62%)", color: "#fff" },
  Imagem: { bg: "hsl(190, 80%, 55%)", color: "#fff" },
  Imagens: { bg: "hsl(190, 80%, 55%)", color: "#fff" },
  Carrossel: { bg: "hsl(5, 80%, 70%)", color: "#fff" },
};

function getPosts(perfil: Record<string, any>, accountKey?: string): PostData[] {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    .map((i) => {
      const raw = perfil[`post${i}`];
      if (raw === null || raw === undefined || raw === 0) return null;
      try {
        const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
        return { ...parsed, _account: accountKey };
      } catch { return null; }
    })
    .filter(Boolean) as PostData[];
}

type SortKey = "likes" | "comentarios" | "data_postagem" | null;
type SortDir = "asc" | "desc";

const PostsTable = ({ profiles, profileNames, getLabel, getFoto }: PostsTableProps) => {
  const theme = useResultsTheme();
  const th = t(theme);

  const [filter, setFilter] = useState("geral");
  const [sortKey, setSortKey] = useState<SortKey>("likes");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  let posts: PostData[] = [];
  if (filter === "geral") {
    profileNames.forEach((name) => posts.push(...getPosts(profiles[name], name)));
  } else {
    posts = getPosts(profiles[filter], filter);
  }

  const sorted = [...posts];
  if (sortKey) {
    sorted.sort((a, b) => {
      let va: number, vb: number;
      if (sortKey === "data_postagem") {
        va = new Date(a.data_postagem || "1970-01-01").getTime();
        vb = new Date(b.data_postagem || "1970-01-01").getTime();
      } else {
        va = Number(a[sortKey]) || 0;
        vb = Number(b[sortKey]) || 0;
      }
      return sortDir === "desc" ? vb - va : va - vb;
    });
  }

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      if (sortDir === "desc") setSortDir("asc");
      else { setSortKey(null); setSortDir("desc"); }
    } else { setSortKey(key); setSortDir("desc"); }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ArrowUpDown className="w-3 h-3 ml-1 opacity-30" />;
    return sortDir === "desc"
      ? <ArrowDown className="w-3 h-3 ml-1" style={{ color: th.accentBlue }} />
      : <ArrowUp className="w-3 h-3 ml-1" style={{ color: th.accentBlue }} />;
  };

  return (
    <div className="mt-4">
      <div className="rounded-2xl overflow-hidden transition-colors duration-500" style={{ background: th.cardBg, border: `1px solid ${th.cardBorder}`, boxShadow: th.cardShadow }}>
        <div className="relative flex items-center justify-center px-5 pt-5 pb-3">
          <h2 className="font-display font-bold text-base" style={{ color: "hsl(225,30%,15%)" }}>Ranking de Posts</h2>
          <div className="absolute right-5">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[150px] h-9 rounded-full text-xs bg-white" style={{ borderColor: "hsl(220,15%,90%)" }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="geral" className="text-xs"><span className="font-medium">Geral</span></SelectItem>
                {profileNames.map((name) => (
                  <SelectItem key={name} value={name} className="text-xs">
                    <div className="flex items-center gap-2">
                      <img src={`https://images.weserv.nl/?url=${encodeURIComponent(getFoto(name) || "")}`} className="w-5 h-5 rounded-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                      {getLabel(name)}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm" style={{ color: th.mutedText }}>Sem posts nos últimos 3 meses</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr style={{ borderBottom: `1px solid ${th.borderColor}`, background: th.tableHeaderBg }}>
                  <th className="py-3 px-4 text-[10px] font-semibold uppercase tracking-wider text-left" style={{ color: th.thColor }}>Conta</th>
                  <th className="py-3 px-4 text-[10px] font-semibold uppercase tracking-wider text-left min-w-[280px]" style={{ color: th.thColor }}>Post</th>
                  <th className="py-3 px-4 text-[10px] font-semibold uppercase tracking-wider text-center cursor-pointer select-none" style={{ color: th.thColor }} onClick={() => handleSort("likes")}>
                    <span className="inline-flex items-center">Likes<SortIcon col="likes" /></span>
                  </th>
                  <th className="py-3 px-4 text-[10px] font-semibold uppercase tracking-wider text-center cursor-pointer select-none" style={{ color: th.thColor }} onClick={() => handleSort("comentarios")}>
                    <span className="inline-flex items-center">Comentários<SortIcon col="comentarios" /></span>
                  </th>
                  <th className="py-3 px-4 text-[10px] font-semibold uppercase tracking-wider text-center" style={{ color: th.thColor }}>Tipo</th>
                  <th className="py-3 px-4 text-[10px] font-semibold uppercase tracking-wider text-center cursor-pointer select-none" style={{ color: th.thColor }} onClick={() => handleSort("data_postagem")}>
                    <span className="inline-flex items-center">Data<SortIcon col="data_postagem" /></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((post, idx) => {
                  const badge = tipoBadge[post.tipo];
                  const accountLabel = post._account ? getLabel(post._account) : "";
                  const accountFoto = post._account ? getFoto(post._account) : undefined;
                  const description = post.descricao || post.legenda || "";
                  return (
                    <tr
                      key={idx}
                      className="transition-colors duration-150"
                      style={{ borderBottom: `1px solid ${th.borderColorLight}` }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = th.innerBgHover; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ""; }}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {accountFoto && (
                            <img src={`https://images.weserv.nl/?url=${encodeURIComponent(accountFoto)}`} className="w-5 h-5 rounded-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                          )}
                          <span className="text-xs font-medium" style={{ color: th.bodyText }}>{accountLabel}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-start gap-3">
                          <button type="button" onClick={() => post.url_post && window.open(post.url_post, "_blank", "noopener,noreferrer")} className="shrink-0 rounded-lg overflow-hidden">
                            <img
                              src={`https://images.weserv.nl/?url=${encodeURIComponent(post.thumbnail || "")}`}
                              className="w-16 h-16 rounded-lg object-cover hover:scale-105 transition-transform duration-200"
                              onError={(e) => { e.currentTarget.style.display = "none"; }}
                            />
                          </button>
                          <span className="text-xs line-clamp-2 pt-1 leading-relaxed" style={{ color: th.bodyText }}>
                            {description || "—"}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center font-display text-sm font-semibold">{formatNum(post.likes)}</td>
                      <td className="py-3 px-4 text-center font-display text-sm font-semibold">{formatNum(post.comentarios)}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold text-white"
                          style={{ background: badge?.bg || "hsl(0,0%,40%)" }}>
                          {post.tipo}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-xs" style={{ color: th.labelText }}>
                        {formatDate(post.data_postagem)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsTable;
