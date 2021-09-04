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
