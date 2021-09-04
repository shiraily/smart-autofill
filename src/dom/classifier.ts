import { inputTypes, MemberField } from "../entity/Entity";

export function classify(element: HTMLElement): MemberField | null {
  const type = element.getAttribute("type") || "";
  // sometimes parent disables form controls
  if (
    (element.tagName === "INPUT" && inputTypes.includes(type)) ||
    element.tagName === "SELECT" ||
    element.tagName === "TEXTAREA"
  ) {
    return null;
  }

  const name = element.getAttribute("name") || "";
  // TODO need TypeScript type?
  if (
    ["nickName", "email", "firstName", "lastName", "familyName"].includes(name)
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
