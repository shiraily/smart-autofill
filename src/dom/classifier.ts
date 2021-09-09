import { ClueType, inputTypes, MemberField } from "../entity/Entity";

export function classify(element: HTMLElement): MemberField | null {
  // TODO sometimes parent disables form controls
  const scores = new Map<ClueType, number>();

  const type = element.getAttribute("type") || "";
  const tagName = element.tagName.toLowerCase();
  if (
    (tagName === "input" && inputTypes.includes(type)) ||
    tagName === "select" ||
    tagName === "textarea"
  ) {
    return null;
  }

  const name = element.getAttribute("name") || "";
  // TODO need TypeScript type?
  if (
    ["nickname", "email", "firstName", "lastName", "familyName"].includes(name)
  ) {
    return { name };
  }
  const placeholder = element.getAttribute("placeholder") || "";
  if (placeholder.includes("山田")) {
    return {
      name: "firstName",
      // TODO kanji, zenkaku?,
    };
  }

  return null;
}
