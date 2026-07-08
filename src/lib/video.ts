/** Monta uma URL de busca do YouTube — sempre relevante, sem links quebrados. */
export function ytSearch(query: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(
    query
  )}`;
}
