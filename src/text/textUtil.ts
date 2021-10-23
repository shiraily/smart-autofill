/** -, _, 大文字で区切って空白つなぎにする */
export function normalize(word: string | null): string {
  const t = (word || "").split(/[__?|\-(.*)]|([A-Z].*)/);
  return t
    .filter((t) => t)
    .map((t) => t.toLowerCase())
    .join(" ");
}
