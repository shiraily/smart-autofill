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
      addToCategory("phoneNumber", highScore);
      break;
    case "radio":
      add("sex", midScore);
      break;
  }

  if (tagName == "select") {
    add("birthYear", highScore);
    add("birthMonth", highScore);
    add("birthDay", highScore);
    add("prefecture", highScore);
  }

  const name = normalize(element.getAttribute("name"));
  // TODO need TypeScript type?
  ["nickname", "email", "first name", "last name"].forEach((_name) => {
    if (name.indexOf(_name) >= 0) {
      add(_name as ItemNameType, Infinity);
    }
  });
  const placeholder = element.getAttribute("placeholder") || "";

  const item = [...scores.entries()].sort((e) => e[1])?.[0];
  return { name: item?.[0] } as MemberField;
}
