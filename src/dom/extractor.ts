import { InputType } from "../entity/Entity";
import { normalize } from "../text/textUtil";

export interface FormControl {
  tagName: string;
  id: string;
  name: string;
  type: InputType;
  placeholder: string;
  label: string;
}

export function extract(element: HTMLElement): FormControl {
  const tagName = element.tagName.toLowerCase();
  const id = element.getAttribute("id") || "";
  const name = normalize(element.getAttribute("name"));
  const type = (element.getAttribute("type") || "").toLowerCase() as InputType;
  const placeholder = element.getAttribute("placeholder") || "";
  const label = getLabelText(element);
  return { tagName, id, name, type, placeholder, label };
}

// label要素取得のためにたどる最大の親要素数
const maxParentLevelForLabel = 3;

// 対応するlabel要素を取得する
function getLabelText(element: HTMLElement): string {
  let level = 0;
  const id = element.getAttribute("id");

  let currentElement: HTMLElement = element;
  while (level < maxParentLevelForLabel) {
    const parent = currentElement.parentElement;
    if (!parent) {
      return "";
    }

    const labels = parent?.querySelectorAll("label");
    const label = Array.from(labels || []).find((l) => {
      if (l.getAttribute("for") === id) {
        return true;
      } else if (l.contains(element)) {
        return true;
      }
      return false;
    });
    if (label) {
      return label.textContent || "";
    }
    currentElement = parent;
    level++;
  }
  return "";
}
