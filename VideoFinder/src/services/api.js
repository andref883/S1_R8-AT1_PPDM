const BASE_URL = 'https://abhi-api.vercel.app/api/search/yts';

// Buscas iniciais usadas para montar a lista (a API retorna 1 vídeo por busca)
export const DEFAULT_QUERIES = [
  'heat waves',
  'blinding lights',
  'shape of you',
  'levitating',
  'bad guy',
  'as it was',
];

export async function searchVideo(text) {
  const response = await fetch(`${BASE_URL}?text=${encodeURIComponent(text)}`);
  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}`);
  }
  const json = await response.json();
  if (!json.status || !json.result) {
    throw new Error('Nenhum resultado encontrado.');
  }
  return { ...json.result, query: text };
}

export async function searchMany(queries) {
  const results = await Promise.allSettled(queries.map(searchVideo));
  const videos = results
    .filter((r) => r.status === 'fulfilled')
    .map((r) => r.value);

  // Remove duplicados pela URL
  const seen = new Set();
  return videos.filter((v) => {
    if (seen.has(v.url)) return false;
    seen.add(v.url);
    return true;
  });
}

export function formatViews(n) {
  if (typeof n !== 'number') return '-';
  if (n >= 1e9) return (n / 1e9).toFixed(1) + ' bi';
  if (n >= 1e6) return (n / 1e6).toFixed(1) + ' mi';
  if (n >= 1e3) return (n / 1e3).toFixed(1) + ' mil';
  return String(n);
}
