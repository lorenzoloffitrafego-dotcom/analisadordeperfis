import { useState } from "react";
import { ExternalLink, FileText, ArrowUp, ArrowDown, ArrowUpDown, Hash } from "lucide-react";

interface PostData {
  tipo: string;
  views: number;
  likes: number;
  comentarios: number;
  thumbnail: string;
  url_post: string;
  data_postagem: string;
}

interface ProfilePostsTableProps {
  profileKey: string;
  profileData: Record<string, any>;
  label: string;
  foto?: string;
  showViews?: boolean;
  showRanking?: boolean;
}

interface PostsTableProps {
  profiles: Record<string, Record<string, any>>;
  profileNames: string[];
  getLabel: (key: string) => string;
  getFoto: (key: string) => string | undefined;
}

function formatNum(n: number): string {
  if (n >= 1_000_000) {
    const v = n / 1_000_000;
    return v % 1 === 0 ? `${v}M` : `${v.toFixed(1)}M`;
  }
  if (n >= 1_000) {
    const v = n / 1_000;
    return v % 1 === 0 ? `${v}K` : `${v.toFixed(1)}K`;
  }
  return String(n);
}

function formatDate(d: string): string {
  if (!d) return "—";
  const [y, m, day] = d.split("-");
  return `${day}/${m}/${y}`;
}

const tipoBadge: Record<string, { bg: string; text: string; glow: string }> = {
  Reel: { bg: "linear-gradient(135deg, rgba(139,92,246,0.25), rgba(139,92,246,0.1))", text: "#A78BFA", glow: "0 0 12px rgba(139,92,246,0.3)" },
  Imagem: { bg: "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(59,130,246,0.1))", text: "#60A5FA", glow: "0 0 12px rgba(59,130,246,0.3)" },
  Carrossel: { bg: "linear-gradient(135deg, rgba(249,115,22,0.25), rgba(249,115,22,0.1))", text: "#FB923C", glow: "0 0 12px rgba(249,115,22,0.3)" },
};

function getPosts(perfil: Record<string, any>): PostData[] {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    .map((i) => {
      const raw = perfil[`post${i}`];
      if (raw === null || raw === undefined || raw === 0) return null;
      try {
        return typeof raw === "string" ? JSON.parse(raw) : raw;
      } catch {
        return null;
      }
    })
    .filter(Boolean) as PostData[];
}

type SortKey = "views" | "likes" | "comentarios" | "data_postagem" | null;
type SortDir = "asc" | "desc";

const ProfilePostsTable = ({ profileKey, profileData, label, foto, showViews = true, showRanking = false }: ProfilePostsTableProps) => {
  const defaultSort: SortKey = showRanking ? "views" : null;
  const [sortKey, setSortKey] = useState<SortKey>(defaultSort);
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const posts = getPosts(profileData);

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
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ArrowUpDown className="w-3 h-3 ml-1 opacity-30 transition-all duration-200" />;
    return sortDir === "desc"
      ? <ArrowDown className="w-3 h-3 ml-1 text-[hsl(230,80%,70%)] transition-all duration-200" />
      : <ArrowUp className="w-3 h-3 ml-1 text-[hsl(230,80%,70%)] transition-all duration-200" />;
  };

  const thBase = "py-3 px-4 text-[10px] font-semibold uppercase tracking-[0.1em] text-[hsl(215,15%,45%)]";
  const thSortable = `${thBase} text-right cursor-pointer select-none hover:text-[hsl(210,40%,80%)] transition-colors duration-200`;

  if (posts.length === 0) {
    return (
      <div className="mt-8">
        <div className="flex items-center gap-3 mb-4">
          {foto && (
            <img
              src={`https://images.weserv.nl/?url=${encodeURIComponent(foto)}`}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-[hsl(220,15%,20%)]"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          )}
          <h3 className="font-display text-base font-bold">{label}</h3>
        </div>
        <div className="rounded-2xl border border-[hsl(220,15%,14%)]/50 bg-[hsl(220,20%,8%)]/80 backdrop-blur-sm p-8 text-center">
          <p className="text-[hsl(215,15%,45%)] text-sm">Sem posts nos últimos 3 meses</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-4">
        {foto && (
          <img
            src={`https://images.weserv.nl/?url=${encodeURIComponent(foto)}`}
            className="w-7 h-7 rounded-full object-cover ring-1 ring-[hsl(220,15%,20%)]"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        )}
        <h3 className="font-display text-base font-bold">{label}</h3>
        <span className="text-[10px] text-[hsl(215,15%,40%)] font-medium ml-1">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </span>
      </div>

      <div
        className="rounded-2xl overflow-hidden border border-[hsl(220,15%,14%)]/50 bg-[hsl(220,20%,8%)]/80 backdrop-blur-sm"
        style={{ boxShadow: "0 8px 32px -8px hsl(0 0% 0% / 0.5)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[hsl(220,15%,14%)] bg-[hsl(220,20%,5%)]/80">
                {showRanking && (
                  <th
                    className={`${thBase} text-center cursor-pointer select-none hover:text-[hsl(210,40%,80%)] transition-colors duration-200 w-14`}
                    onClick={() => handleSort("views")}
                  >
                    <span className="inline-flex items-center justify-center">
                      <Hash className="w-3 h-3" />
                      <SortIcon col="views" />
                    </span>
                  </th>
                )}
                <th className={`${thBase} text-left`}>Post</th>
                {showViews && (
                  <th className={thSortable} onClick={() => handleSort("views")}>
                    <span className="inline-flex items-center justify-end">Views<SortIcon col="views" /></span>
                  </th>
                )}
                <th className={thSortable} onClick={() => handleSort("likes")}>
                  <span className="inline-flex items-center justify-end">Likes<SortIcon col="likes" /></span>
                </th>
                <th className={thSortable} onClick={() => handleSort("comentarios")}>
                  <span className="inline-flex items-center justify-end">Comentários<SortIcon col="comentarios" /></span>
                </th>
                <th className={`${thBase} text-left`}>Tipo</th>
                <th
                  className={`${thBase} text-center cursor-pointer select-none hover:text-[hsl(210,40%,80%)] transition-colors duration-200`}
                  onClick={() => handleSort("data_postagem")}
                >
                  <span className="inline-flex items-center justify-center">Data<SortIcon col="data_postagem" /></span>
                </th>
                <th className={`${thBase} text-center`}>Link</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((post, idx) => {
                const badge = tipoBadge[post.tipo];
                return (
                  <tr
                    key={idx}
                    className="border-b border-[hsl(220,15%,10%)] last:border-b-0 transition-all duration-200 hover:bg-[hsl(230,30%,12%)]/60"
                    style={{
                      // @ts-ignore
                      "--hover-shadow": "0 2px 8px -2px hsl(230 80% 65% / 0.08)",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 2px 8px -2px hsl(230 80% 65% / 0.08)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
                  >
                    {showRanking && (
                      <td className="py-3 px-4 text-center">
                        <span className="font-display text-sm font-bold text-[hsl(230,80%,70%)]">
                          {idx + 1}
                        </span>
                      </td>
                    )}
                    <td className="py-3 px-4">
                      <img
                        src={`https://images.weserv.nl/?url=${encodeURIComponent(post.thumbnail || "")}`}
                        alt={`Post ${idx + 1}`}
                        className="w-14 h-14 rounded-lg object-cover border border-transparent hover:border-[hsl(230,80%,65%)]/30 transition-colors duration-200"
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                    </td>
                    {showViews && (
                      <td className="py-3 px-4 text-right font-display text-sm font-semibold">
                        {formatNum(post.views)}
                      </td>
                    )}
                    <td className="py-3 px-4 text-right font-display text-sm font-semibold">
                      {formatNum(post.likes)}
                    </td>
                    <td className="py-3 px-4 text-right font-display text-sm font-semibold">
                      {formatNum(post.comentarios)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold border border-transparent"
                        style={{
                          background: badge?.bg || "rgba(100,100,100,0.2)",
                          color: badge?.text || "#aaa",
                          boxShadow: badge?.glow || "none",
                        }}
                      >
                        {post.tipo}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-xs text-[hsl(215,15%,50%)] font-normal">
                      {formatDate(post.data_postagem)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <a
                        href={post.url_post}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 h-7 px-3 text-[10px] font-semibold rounded-md border border-[hsl(230,60%,40%)]/40 text-[hsl(230,80%,75%)] hover:bg-[hsl(230,80%,60%)]/15 hover:border-[hsl(230,80%,60%)]/60 transition-all duration-200"
                      >
                        Ver post
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const PostsTable = ({ profiles, profileNames, getLabel, getFoto }: PostsTableProps) => {
  const lastProfileIdx = profileNames.length - 1;

  return (
    <div className="mt-10">
      <div className="flex items-center gap-2 mb-2">
        <FileText className="w-5 h-5 text-[hsl(230,80%,70%)]" />
        <h2 className="font-display text-xl font-bold">
          Posts dos últimos 3 meses
        </h2>
      </div>

      {profileNames.map((name, idx) => (
        <ProfilePostsTable
          key={name}
          profileKey={name}
          profileData={profiles[name]}
          label={getLabel(name)}
          foto={getFoto(name)}
          showViews={idx !== lastProfileIdx}
          showRanking={idx === 0}
        />
      ))}
    </div>
  );
};

export default PostsTable;
