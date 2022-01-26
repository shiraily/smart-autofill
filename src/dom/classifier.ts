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

const midScore = 100;
const highScore = 10_000;

// form control要素が何のフィールドかを分類する
export function classify(element: HTMLElement): MemberField | null {
  // TODO sometimes parent disables form controls
  const scores = new Map<ItemNameType, number>();

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
  // const placeholder = element.getAttribute("placeholder") || "";

  const label = getLabelText(element);
  console.log(label);
  if (label.includes("姓名")) {
    add("full name", midScore);
  } else if (label.includes("姓")) {
    add("last name", highScore);
  } else if (label.includes("名")) {
    add("first name", highScore);
  }

  const item = [...scores.entries()].sort((e) => e[1])?.[0];
  return { name: item?.[0] } as MemberField;
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

const labelScoreMap = new Map<string, { key: ItemNameType; score: number }>([
  ["ニックネーム", { key: "nickname", score: highScore }],
  ["ハンドルネーム", { key: "nickname", score: highScore }],
  ["呼び", { key: "nickname", score: highScore }],
  ["姓名", { key: "full name", score: highScore }],
  ["姓", { key: "last name", score: highScore }],
  ["名", { key: "first name", score: highScore }],
  ["性別", { key: "sex", score: highScore }],
  ["男", { key: "sex", score: highScore }],
  ["女", { key: "sex", score: highScore }],
  ["生年月日", { key: "birth date", score: highScore }],
  ["年", { key: "birth year", score: highScore }],
  ["月", { key: "birth month", score: highScore }],
  ["日", { key: "birth day", score: highScore }],
  ["上三桁", { key: "postal code 1", score: highScore }],
  ["下三桁", { key: "postal code 2", score: highScore }],
  ["都道府県", { key: "prefecture", score: highScore }],
  ["市区町村", { key: "city", score: highScore }],
  ["市区郡", { key: "city county", score: highScore }],
  ["町名", { key: "street", score: highScore }],
  ["番地", { key: "house number", score: highScore }],
  ["建物", { key: "building", score: highScore }],
  ["部屋番号", { key: "building", score: highScore }],
  ["市外局番", { key: "phone number 1", score: highScore }],
  ["市内局番", { key: "phone number 2", score: highScore }],
  ["加入者番号", { key: "phone number 3", score: highScore }],
  ["電話番号", { key: "phone number", score: highScore }],
  //["会社名", { key: "", score: highScore }],
  //["部署名", { key: "", score: highScore }],
  //["役職名", { key: "", score: highScore }],
  ["メールアドレス", { key: "email", score: highScore }],
  ["email", { key: "email", score: highScore }],
]);
