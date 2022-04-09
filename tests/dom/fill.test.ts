import { listFormControls } from "../../src/dom/fill";
import { normalize } from "../../src/text/textUtil";
import { addressItems, itemNames } from "../../src/entity/Entity";
import fs from "fs";
import { extract } from "../../src/dom/extractor";
import { calcScores } from "../../src/dom/classifier";

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
    if (!addressItems.has(matched as string)) return;

    const formControl = extract(x as HTMLElement);
    test(`${JSON.stringify(formControl)}`, () => {
      const scores = calcScores(formControl);
      console.log(scores);
      expect(scores[0].itemNameType).toBe(matched);
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
