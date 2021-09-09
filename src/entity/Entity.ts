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

// Excerpt of https://developer.mozilla.org/ja/docs/Web/HTML/Element/input#input_types
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
].map((t) => t.toUpperCase());
export type InputType = typeof inputTypes[number];

// TODO
export interface MemberField {
  name: string;
}

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
]
export type ClueType = typeof clueTypes[number];

const itemNames = [
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
  
  "email",
  "phoneNumber",
]
export type ItemNameType = typeof itemNames[number];

export type CharType = "hira" | "kata" | "kanji" | "rome" | "num";

export interface ItemType {
  name: ItemNameType;
  zenkaku: boolean;
  charType: CharType;

  // TODO
  // zero padding?
}
