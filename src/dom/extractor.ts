import { AutocompleteValue, InputType } from "../entity/Entity";
import { normalize } from "../text/textUtil";
import { isFormControl } from "./fill";

// TODO [key]: string;
export interface FormControl {
  tagName: string;
  id: string;
  name: string;
  type: InputType;
  placeholder: string;
  label: string;
  neighborText: string;
  autocomplete: AutocompleteValue;
}

export function extract(element: HTMLElement): FormControl {
  const tagName = element.tagName.toLowerCase();
  const id = element.getAttribute("id") || "";
  const name = normalize(element.getAttribute("name"));
  const type = (element.getAttribute("type") || "").toLowerCase() as InputType;
  const placeholder = element.getAttribute("placeholder") || "";
  const [label, neighborText] = getText(element);
  const autocomplete =
    (element.getAttribute("autocomplete") as AutocompleteValue) || "";
  return {
    tagName,
    id,
    name,
    type,
    placeholder,
    label,
    neighborText,
    autocomplete,
  };
}

// label要素取得のためにたどる最大の親要素数
const maxParentLevel = 3;

const emptyLabelText = "none";

function getText(element: HTMLElement): [string, string] {
  let currentElement: HTMLElement = element;
  let neighborText = currentElement.textContent;
  let labelText = "";

  let level = 0;
  while (level < maxParentLevel) {
    const parent = currentElement.parentElement;
    if (!parent) break;

    if (
      Array.from(parent.querySelectorAll("*")).filter(isFormControl).length ===
      1
    ) {
      neighborText = parent.textContent;
    }

    const label =
      getMatchedLabel(element, parent) || getTableHeader(element, parent);
    if (label && !labelText) {
      labelText = label.textContent || emptyLabelText;
    }
    currentElement = parent;
    level++;
  }
  return [labelText === emptyLabelText ? "" : labelText, neighborText || ""];
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
