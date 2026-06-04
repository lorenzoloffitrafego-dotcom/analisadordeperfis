/**
 * Normalizes the webhook response so both old and new contract shapes are supported.
 *
 * New contract (from n8n):
 *   {
 *     resumo_ia, meu_perfil: { ..., posts: [...] },
 *     concorrente_1: { ..., posts: [...] },
 *     concorrente_2: { ..., posts: [...] }
 *   }
 *
 * Legacy contract (used internally by the dashboard components):
 *   {
 *     resumo_ia, meu_perfil: { ..., post0, post1, ... },
 *     perfil1: { ... }, perfil2: { ... }
 *   }
 *
 * We map concorrente_N → perfilN and posts[] → post0..postN, preserving any
 * pre-existing legacy keys so old payloads keep working.
 */

type AnyObj = Record<string, any>;

function flattenPosts(profile: AnyObj | undefined | null): AnyObj {
  if (!profile || typeof profile !== "object") return profile as AnyObj;
  const out: AnyObj = { ...profile };
  if (Array.isArray(profile.posts)) {
    profile.posts.forEach((post: any, idx: number) => {
      const key = `post${idx}`;
      if (out[key] === undefined) out[key] = post;
    });
  }
  return out;
}

export function normalizeAnalysisResult(raw: AnyObj | null | undefined): AnyObj {
  if (!raw || typeof raw !== "object") return raw as AnyObj;
  const out: AnyObj = { ...raw };

  // meu_perfil — flatten posts array if present
  if (out.meu_perfil) out.meu_perfil = flattenPosts(out.meu_perfil);

  // Map concorrente_N → perfilN (don't overwrite if perfilN already exists)
  Object.keys(raw).forEach((key) => {
    const m = key.match(/^concorrente[_-]?(\d+)$/i);
    if (!m) return;
    const targetKey = `perfil${m[1]}`;
    if (out[targetKey] === undefined || out[targetKey] === null) {
      out[targetKey] = flattenPosts(raw[key]);
    }
  });

  // Also flatten posts array on any existing perfilN
  Object.keys(out).forEach((key) => {
    if (/^perfil\d+$/i.test(key) && out[key]) {
      out[key] = flattenPosts(out[key]);
    }
  });

  return out;
}
