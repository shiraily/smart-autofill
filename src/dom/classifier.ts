import {
  categoryItems,
  CategoryNameType,
  FormControlTag,
  InputType,
  inputTypes,
  ItemNameType,
} from "../entity/Entity";
import { MemberField } from "../entity/User";
import { normalize } from "../text/textUtil";

/**
 * スコア計算について
 * firstNameとlastNameは混同されやすいので、スコアを少し小さくする
 */

// form control要素が何のフィールドかを分類する
export function classify(element: HTMLElement): MemberField | null {
  // TODO sometimes parent disables form controls
  const scores = new Map<ItemNameType, number>();
  const midScore = 100;
  const highScore = 10_000;

  function add(type: ItemNameType, score: number) {
    scores.set(type, (scores.get(type) || 0) + score);
  }

  function addToCategory(type: CategoryNameType, score: number) {
    categoryItems.get(type)?.forEach((i) => {
      add(i, score);
    });
  }

  // type属性とtagName
  const type = (element.getAttribute("type") || "").toLowerCase() as InputType;
  const tagName = element.tagName.toLowerCase() as FormControlTag;
  if (
    !(tagName === "input" && inputTypes.includes(type)) &&
    tagName !== "select"
  ) {
    return null;
  }
  switch (type) {
    case "email":
      add("email", Infinity);
      break;
    case "tel":
      addToCategory("phone number", highScore);
      break;
    case "radio":
      add("sex", midScore);
      break;
  }
  if (tagName == "select") {
    add("birth year", highScore);
    add("birth month", highScore);
    add("birth day", highScore);
    add("prefecture", highScore);
  }

  // name属性
  const name = normalize(element.getAttribute("name"));
  // TODO need TypeScript type?
  ["nickname", "email", "first name", "last name"].forEach((_name) => {
    if (name.indexOf(_name) >= 0) {
      add(_name as ItemNameType, Infinity);
    }
  });
  (
    [
      ["post no first", "postal code 1"],
      ["post no second", "postal code 2"],
    ] as [string, ItemNameType][]
  ).forEach(([_name, type]) => {
    if (name.indexOf(_name) >= 0) {
      add(type, highScore);
    }
  });

  // TODO
  const placeholder = element.getAttribute("placeholder") || "";

  // TODO get label text from element
  console.log(getLabel(element)?.textContent);

  const item = [...scores.entries()].sort((e) => e[1])?.[0];
  return { name: item?.[0] } as MemberField;
}

// label要素取得のためにたどる最大の親要素数
const maxParentLevelForLabel = 3;

// 対応するlabel要素を取得する
function getLabel(element: HTMLElement): HTMLLabelElement | null {
  let level = 0;
  const id = element.getAttribute("id");

  let currentElement: HTMLElement = element;
  while (level < maxParentLevelForLabel) {
    const parent = currentElement.parentElement;
    if (!parent) {
      return null;
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
      return label;
    }
    currentElement = parent;
    level++;
  }
  return null;
}
