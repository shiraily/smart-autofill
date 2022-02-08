import { listFormControls } from "../../src/dom/fill";
import { normalize } from "../../src/text/textUtil";
import { itemNames } from "../../src/entity/Entity";
import fs from "fs";
import { classify } from "../../src/dom/classifier";
import { extract } from "../../src/dom/extractor";

describe("Fill form simply", () => {
  document.body.innerHTML = fs
    .readFileSync("tests/private/data/ana.html")
    .toString();

  const formControls = listFormControls();

  const itemNamesSet = new Set(itemNames);
  formControls.forEach((x) => {
    const dataAttrs = filterDataAttributes(getAttributes(x));
    if (!dataAttrs.length) return;

    const normalized = dataAttrs.map((a) => normalize(a));
    const matched = normalized.find((n) => itemNamesSet.has(n));
    expect(matched).toBeTruthy();
    // TODO 全体を見て入力値を決める可能性があるので、全体でclassifyしたい
    const formControl = extract(x as HTMLElement);
    const actual = classify(formControl);

    test(`${JSON.stringify(formControl)}`, () => {
      expect(actual?.itemNameType).toBe(matched);
      // TODO katakana, etc.
    });
  });
});

function getAttributes(el: Element): string[] {
  const arr: string[] = [];
  for (var i = 0, attrs = el.attributes, n = attrs.length; i < n; i++) {
    arr.push(attrs[i].nodeName);
  }
  return arr;
}

function filterDataAttributes(attrs: string[]): string[] {
  return attrs
    .filter((attrName) => attrName.startsWith("data-"))
    .map((s) => s.substring(5));
}
