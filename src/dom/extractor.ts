import { InputType } from "../entity/Entity";
import { normalize } from "../text/textUtil";
import { isFormControl } from "./fill";

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
  const label = getText(element);
  return { tagName, id, name, type, placeholder, label };
}

// label要素取得のためにたどる最大の親要素数
const maxParentLevel = 3;

function getText(element: HTMLElement): string {
  return (
    getLabelText(element, getMatchedLabel) ||
    getLabelText(element, getTableHeader)
  );
}

// 対応するlabel要素を取得する
function getLabelText(
  element: HTMLElement,
  extractor: (
    targetElement: HTMLElement,
    parent: HTMLElement
  ) => HTMLElement | null
): string {
  let level = 0;

  let currentElement: HTMLElement = element;
  while (level < maxParentLevel) {
    const parent = currentElement.parentElement;
    if (!parent) {
      return "";
    }

    const label = extractor(element, parent);
    if (label) {
      return label.textContent || "";
    }
    currentElement = parent;
    level++;
  }
  return "";
}

function getMatchedLabel(
  targetElement: HTMLElement,
  parent: HTMLElement
): HTMLLabelElement | null {
  const id = targetElement.getAttribute("id");
  const labels = Array.from(parent?.querySelectorAll("label")) || [];
  if (id) {
    const label = labels.find((l) => {
      if (l.getAttribute("for") === id) {
        return true;
      }
    });
    if (label) {
      return label;
    }
  }
  if (labels.length === 1) {
    if (
      labels[0].contains(targetElement) &&
      Array.from(parent.querySelectorAll("*")).filter(isFormControl).length ===
        1
    ) {
      return labels[0];
    }
  }
  return null;
}

/**
 * form controlがtd要素のとき、対応するth要素のテキストを取得
 */
function getTableHeader(
  _: HTMLElement,
  parent: HTMLElement
): HTMLTableCellElement | null {
  if (parent.tagName.toLowerCase() !== "tr") return null;
  return parent.querySelector("th");
}
