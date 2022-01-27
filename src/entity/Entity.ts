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

export const itemNames = [
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
];
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
export type CharType = "hiragana" | "katakana" | "kanji" | "alphabet" | "num";
export type CharTypeDefinition = {
  charType: CharType;
  hasHalfWidth?: boolean;
  hasFullWidth?: boolean;
  hasUpperCase?: boolean;
};

// TODO 大文字小文字や、各種文字を混在させるケースもある

export const charTypes = new Map<CharType, CharTypeDefinition>(
  [
    {
      charType: "hiragana",
      hasFullWidth: true,
    },
    {
      charType: "katakana",
      hasHalfWidth: true,
      hasFullWidth: true,
    },
    { charType: "kanji", hasFullWidth: true },
    {
      charType: "alphabet",
      hasHalfWidth: true,
      hasFullWidth: true,
      hasUpperCase: true,
    },
    {
      charType: "num",
      hasHalfWidth: true,
      hasFullWidth: true,
      // TODO zero padding
    },
  ].map((x) => [x.charType, x]) as [CharType, CharTypeDefinition][]
);

export interface ItemType {
  name: ItemNameType;
  charTypes: Array<CharType>;
}

// TODO specify charTypes
export const ItemTypes: Array<ItemType> = [
  { name: "nickname", charTypes: [] },
  { name: "full name", charTypes: [] },
  { name: "first name", charTypes: [] },
  { name: "last name", charTypes: [] },

  { name: "birth date", charTypes: [] },
  { name: "birth year", charTypes: [] },
  { name: "birth month", charTypes: [] },
  { name: "birth day", charTypes: [] },

  { name: "sex", charTypes: [] },

  { name: "postal code", charTypes: [] },
  { name: "postal code 1", charTypes: [] },
  { name: "postal code 2", charTypes: [] },
  { name: "country", charTypes: [] },
  { name: "prefecture", charTypes: [] },
  { name: "city", charTypes: [] },
  { name: "city county", charTypes: [] },
  { name: "street", charTypes: [] },
  { name: "house number", charTypes: [] },
  { name: "building", charTypes: [] },

  { name: "email", charTypes: [] },
  { name: "phone number", charTypes: [] },
  { name: "phone number 1", charTypes: [] },
  { name: "phone number 2", charTypes: [] },
  { name: "phone number 3", charTypes: [] },
];
