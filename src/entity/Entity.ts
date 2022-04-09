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
  "city", // 市区町村, 市区郡
  "street", // 町名 / 条丁目
  "house number", // 番地
  "building", // 建物名・部屋番号
  "after address", // 番地以降

  "email", // TODO @前後で分割
  "phone number",
  "phone number 1",
  "phone number 2",
  "phone number 3",
];
export type ItemNameType = typeof itemNames[number];

const categoryNames = [
  "name",
  "birth date",
  "phone number",
  "address",
] as const;
export type CategoryNameType = typeof categoryNames[number];

// TODO strict type
export const categoryItems = new Map<CategoryNameType, ItemNameType[]>([
  ["name", ["full name", "first name", "last name"]],
  ["birth date", ["birth date", "birth year", "birth month", "birth day"]],
  [
    "phone number",
    ["phone number", "phone number 1", "phone number 2", "phone number 3"],
  ],
  [
    "address",
    [
      "postal code",
      "postal code 1",
      "postal code 2",
      "country",
      "prefecture",
      "city",
      "street",
      "house number",
      "building",
      "after address",
    ],
  ],
]);

export const addressItems = new Set(categoryItems.get("address"));

/** 文字の種類。例: ひらがな */
export type CharType =
  | "hiragana"
  | "katakana"
  | "kanji" // 漢字を含む。千代田区1-1-1, 山田
  | "alphabet"
  | "number";

type CharWidth = "full" | "half" | "mix";
type CharCase = "upper" | "lower" | "mix" | "capitalized";

export type CharTypeDefinition = {
  charType: CharType;
  width: CharWidth[];
  case?: CharCase[];
};

export interface ItemType {
  name: ItemNameType;
  charTypes?: Array<CharTypeDefinition>; // 1通りの書き方のみの場合は不要
  hyphenated?: boolean;
}

const nameItemDef = [
  // 半角スペース区切り
  { charType: "kanji", width: ["full"] },
  { charType: "hiragana", width: ["full"] },
  { charType: "katakana", width: ["full"] },
  {
    charType: "alphabet",
    width: ["full", "half"],
    case: ["upper", "capitalized"],
  },
] as Array<CharTypeDefinition>;

const numItemDef = [
  { charType: "number", width: ["full", "half"] },
] as Array<CharTypeDefinition>;

export const ItemTypes: Array<ItemType> = [
  {
    name: "nickname",
    charTypes: [
      { charType: "kanji", width: ["full"] },
      { charType: "hiragana", width: ["full"] },
      { charType: "katakana", width: ["full"] },
      {
        charType: "alphabet",
        width: ["half"],
        case: ["mix"],
      },
    ],
  },
  {
    name: "full name",
    charTypes: nameItemDef,
  },
  { name: "first name", charTypes: nameItemDef },
  { name: "last name", charTypes: nameItemDef },

  { name: "birth date", charTypes: [] },
  { name: "birth year" },
  { name: "birth month" },
  { name: "birth day" },

  { name: "sex" },

  {
    name: "postal code",
    charTypes: numItemDef,
    hyphenated: true,
  },
  { name: "postal code 1", charTypes: numItemDef },
  { name: "postal code 2", charTypes: numItemDef },
  // TODO アルファベット
  { name: "country" },
  { name: "prefecture" },
  { name: "city" },
  //{ name: "city county" },
  {
    name: "street",
    charTypes: [{ charType: "kanji", width: ["full", "mix"] }],
  },
  {
    name: "house number",
    charTypes: [{ charType: "kanji", width: ["full", "mix"] }],
  },
  {
    name: "building",
    charTypes: [{ charType: "kanji", width: ["full", "mix"] }],
  },

  { name: "email" },
  { name: "phone number", charTypes: numItemDef, hyphenated: true },
  { name: "phone number 1", charTypes: numItemDef },
  { name: "phone number 2", charTypes: numItemDef },
  { name: "phone number 3", charTypes: numItemDef },
];
