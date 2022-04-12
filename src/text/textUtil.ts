/** -, _, 大文字で区切って空白つなぎにする */
export function normalize(word: string | null): string {
  // ()内が抽出される
  const t = (word || "").split(/[__?|\-(.+)]|([A-Z][^-A-Z0-9_]*)/);
  return t
    .filter((t) => t)
    .map((t) => t.toLowerCase())
    .join(" ");
}

export function toHalfWidth(value: string): string {
  return value.replace(/./g, (s: string) => {
    return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
  });
}

export function toFullWidth(value: string): string {
  return value.replace(/[a-zA-Z0-9\-]/g, (s: string) => {
    return String.fromCharCode(s.charCodeAt(0) + 0xfee0);
  });
}
