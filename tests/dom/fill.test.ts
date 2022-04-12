import { listFormControls } from "../../src/dom/fill";
import { normalize } from "../../src/text/textUtil";
import { addressItems, charTypeSet, itemNames } from "../../src/entity/Entity";
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
    const matchedCharType = normalized
      .map((n) => n.split(" "))
      .find((ns) => charTypeSet.has(ns[0]));

    const formControl = extract(x as HTMLElement);
    test(`${JSON.stringify(formControl)}`, () => {
      const candidate = calcScores(formControl);
      console.log(candidate);
      expect(candidate.itemScore?.length).toBeGreaterThan(0);
      expect(candidate.itemScore[0].itemNameType).toBe(matched);
      //expect(candidate.charWidthScore[0].charWidth).toBe(matchedCharType?.[1]);
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
