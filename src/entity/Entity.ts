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
  "nickName",

  "fullName",
  "firstName",
  "lastName",

  "birthDate",
  "birthYear",
  "birthMonth",
  "birthDay",

  "sex",

  "postalCode", // 郵便番号
  "country", // 国
  "prefecture", // 都道府県
  "city", // 市区町村
  "cityCounty", // 市区郡
  "street", // 町名 / 条丁目
  "houseNumber", // 番地
  "building", // 建物名・部屋番号

  "email", // TODO @前後で分割
  "phoneNumber",
  "phoneNumber1",
  "phoneNumber2",
  "phoneNumber3",
] as const;
export type ItemNameType = typeof itemNames[number];

const categoryNames = ["name", "birthDate", "phoneNumber"] as const;
export type CategoryNameType = typeof categoryNames[number];

export const categoryItems = new Map<CategoryNameType, ItemNameType[]>([
  ["name", ["fullName", "firstName", "lastName"]],
  ["birthDate", ["birthDate", "birthYear", "birthMonth", "birthDay"]],
  [
    "phoneNumber",
    ["phoneNumber", "phoneNumber1", "phoneNumber2", "phoneNumber3"],
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
