// list: https://developer.mozilla.org/ja/docs/Web/HTML/Element/form#see_also
export type FormControlTag =
  // | "button" TODO
  // | "datalist" TODO
  // | "fieldset" TODO
  | "input"
  | "label"
  // | "legend" TODO
  // | "meter"
  // | "optgroup" TODO
  | "option"
  // | "output"
  // | "progress"
  | "select"
  | "textarea";

// Excerpt from https://developer.mozilla.org/ja/docs/Web/HTML/Element/input#input_types
export const inputTypes = [
  "button",
  "checkbox",
  "date",
  "datetime-local",
  "email",
  "month",
  "number",
  "radio",
  "range",
  "search",
  "tel",
  "text",
  "time",
  "week",
] as const;
export type InputType = typeof inputTypes[number];

const clueTypes = [
  "tagName",
  "name",
  "type",
  "placeholder",
  "id",
  "labelText",
  "siblingNo",
  // "class", TODO class1, class2, ...?
  // "numSiblings", TODO
] as const;
export type ClueType = typeof clueTypes[number];

const itemNames = [
  "nickname",

  "full name",
  "first name",
  "last name",

  "birth date",
  "birth year",
  "birth month",
  "birth day",

  "sex",

  "postal code", // 郵便番号
  "postal code 1", // 郵便番号 前半3桁
  "postal code 2", // 郵便番号 後半4桁
  "country", // 国
  "prefecture", // 都道府県
  "city", // 市区町村
  "city county", // 市区郡
  "street", // 町名 / 条丁目
  "house number", // 番地
  "building", // 建物名・部屋番号

  "email", // TODO @前後で分割
  "phone number",
  "phone number 1",
  "phone number 2",
  "phone number 3",
] as const;
export type ItemNameType = typeof itemNames[number];

const categoryNames = ["name", "birth date", "phone number"] as const;
export type CategoryNameType = typeof categoryNames[number];

export const categoryItems = new Map<CategoryNameType, ItemNameType[]>([
  ["name", ["full name", "first name", "last name"]],
  ["birth date", ["birth date", "birth year", "birth month", "birth day"]],
  [
    "phone number",
    ["phone number", "phone number 1", "phone number 2", "phone number 3"],
  ],
]);

/** 文字の種類。例: ひらがな */
export type CharType = "hira" | "kata" | "kanji" | "rome" | "num";

export interface ItemType {
  name: ItemNameType;
  zenkaku: boolean;
  charType: CharType;

  // TODO
  // zero padding?
  // TODO 大文字小文字?
}
