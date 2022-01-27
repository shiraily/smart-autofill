import { listFormControls } from "../../src/dom/fill";
import { normalize } from "../../src/text/textUtil";
import { itemNames } from "../../src/entity/Entity";
import fs from "fs";
import { classify } from "../../src/dom/classifier";

describe("Fill form simply", () => {
  document.body.innerHTML = fs
    .readFileSync("tests/private/data/ana.html")
    .toString();

  const formControls = listFormControls();

  const itemNamesSet = new Set(itemNames);
  formControls.forEach((x) => {
    const attrs = getAttributes(x);
    const dataAttrs = filterDataAttributes(attrs);
    if (!dataAttrs.length) return;

    const normalized = dataAttrs.map((a) => normalize(a));
    const matched = normalized.find((n) => itemNamesSet.has(n));
    expect(matched).toBeTruthy();
    // TODO 全体を見て入力値を決める可能性があるので、全体でclassifyしたい
    const actual = classify(x as HTMLElement);

    // TODO print attrs key and value
    test(`${x.tagName}, ${attrs}`, () => {
      expect(actual?.name).toBe(matched);
      // TODO katakana, etc.
    });
  });

  // TODO replace with data attribute reference
  /*const $ = document.querySelector.bind(document);
  expect(($("#w2lastName") as HTMLInputElement).value).toEqual("last name");
  expect(($("#w2firstNameKana") as HTMLInputElement).value).toEqual(
    "first name"
  );
  expect(($("#w2postNoFirst1") as HTMLInputElement).value).toEqual(
    "postal code 1"
  );
  expect(($("#w2postNoFirst2") as HTMLInputElement).value).toEqual(
    "postal code 2"
  );*/
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
