import {
  addressItems,
  AutocompleteValue,
  CharType,
  CharWidth,
  ItemNameType,
} from "../entity/Entity";
import { FormControl } from "./extractor";

const lowScore = 10;
const midScore = 100;
const highScore = 10_000;

export interface Candidate {
  itemScore: Score[];
  charWidthScore: Score2<CharWidth>[];
  hyphenated: boolean;
}

export interface Score {
  itemNameType: ItemNameType;
  score: number;
}

export interface Score2<T> {
  charWidth: T;
  score: number;
}

export function calcScores(formControl: FormControl): Candidate {
  // TODO sometimes parent disables form controls
  const scores = new Map<ItemNameType, number>();

  function add(type: ItemNameType, score: number) {
    scores.set(type, (scores.get(type) || 0) + score);
  }

  // type属性とtagName
  const type = formControl.type;
  switch (type) {
  }
  const tagName = formControl.tagName;
  if (tagName == "select") {
    add("prefecture", highScore);
  }

  // name属性
  const name = formControl.name;
  ["prefecture", "city", "street", "building"].forEach((_name) => {
    if (name.indexOf(_name) >= 0) {
      add(_name as ItemNameType, midScore);
    }
  });
  (
    [
      ["zip", "postal code"],
      ["post no first", "postal code 1"],
      ["post no second", "postal code 2"],
    ] as [string, ItemNameType][]
  ).forEach(([_name, type]) => {
    if (name.indexOf(_name) >= 0) {
      add(type, midScore);
    }
  });

  const label = formControl.label;
  labelScoreMap.forEach((value, _label) => {
    if (label.indexOf(_label) >= 0) {
      add(value.key, value.score);
      return;
    } else if (formControl.placeholder.indexOf(_label) >= 0) {
      add(value.key, value.score);
      return;
    } else if (formControl.neighborText.indexOf(_label) >= 0) {
      add(value.key, lowScore);
    }
  });

  const autocompleteValue = formControl.autocomplete;
  autocompleteScoreMap.forEach((itemNameType, valueType) => {
    if (autocompleteValue === valueType) {
      add(itemNameType.key, itemNameType.score);
      return;
    }
  });

  const item = [...scores.entries()].sort((a, b) => b[1] - a[1]);
  const itemScore = item.map(([itemNameType, score]) => ({
    itemNameType,
    score,
  }));
  return {
    itemScore,
    charWidthScore: calcCharWidthScore(formControl),
    hyphenated: calcHyphenated(formControl),
  };
}

export function isAddressItem(scores: Score[]): boolean {
  return scores.length ? addressItems.has(scores[0].itemNameType) : false;
}

const labelScoreMap = new Map<string, { key: ItemNameType; score: number }>([
  ["郵便番号", { key: "postal code", score: highScore }],
  ["上三桁", { key: "postal code 1", score: highScore }],
  ["下三桁", { key: "postal code 2", score: highScore }],
  ["都道府県", { key: "prefecture", score: highScore }],
  ["市区町村", { key: "city", score: highScore }],
  ["市区郡", { key: "city", score: highScore }],
  ["郡市区", { key: "city", score: highScore }],
  ["町名", { key: "street", score: highScore }],
  ["番地", { key: "house number", score: highScore }],
  ["建物", { key: "building", score: highScore }],
  ["マンション", { key: "building", score: highScore }],
  ["アパート", { key: "building", score: highScore }],
  ["部屋番号", { key: "building", score: highScore }],
  ["号室", { key: "building", score: highScore }],
  ["番地以降", { key: "after address", score: highScore + 1 }],
  ["番地・", { key: "after address", score: highScore + 1 }],
  ["それ以降", { key: "after address", score: highScore }],
]);

const autocompleteScoreMap = new Map<
  AutocompleteValue,
  { key: ItemNameType; score: number }
>([
  ["postal-code", { key: "postal code", score: highScore }],
  ["address-level1", { key: "prefecture", score: highScore }],
  ["address-level2", { key: "city", score: highScore }],
  ["street-address", { key: "after address", score: highScore }],
  // TODO address-line1, 2
]);

const charWidthMap = new Map<string, CharWidth>([
  ["全角", "full"],
  ["半角", "half"],
]);

function calcCharWidthScore(formControl: FormControl): Score2<CharWidth>[] {
  const scores: Score2<CharWidth>[] = [];
  charWidthMap.forEach((charWidth, clue) => {
    if (
      [formControl.label, formControl.placeholder].some(
        (s) => s.indexOf(clue) >= 0
      )
    ) {
      scores.push({ charWidth, score: highScore });
    } else if (formControl.neighborText.indexOf(clue) >= 0) {
      scores.push({ charWidth, score: midScore });
    }
  });
  return scores;
}

const hyphenatedClues: [string, boolean][] = [
  ["ハイフンあり", true],
  ["ハイフン有り", true],
  ["ハイフンなし", false],
  ["ハイフン無し", false],
];

function calcHyphenated(formControl: FormControl): boolean {
  let result = true;
  for (const [clue, flag] of hyphenatedClues) {
    if (
      [formControl.label, formControl.placeholder].some(
        (s) => s.indexOf(clue) >= 0
      )
    ) {
      result = flag;
      break;
    } else if (formControl.neighborText.indexOf(clue) >= 0) {
      result = flag;
      break;
    }
  }
  return result;
}

/** TODO */
const charScoreMap = new Map<string, { key: CharType; score: number }>([
  ["漢字", { key: "kanji", score: highScore }],
  ["カタカナ", { key: "katakana", score: highScore }],
  ["ひらがな", { key: "hiragana", score: highScore }],
  ["英字", { key: "alphabet", score: highScore }],
  ["英数字", { key: "alphabet", score: highScore }],
  ["数字", { key: "number", score: highScore }],
  ["太郎", { key: "kanji", score: highScore }],
  ["花子", { key: "kanji", score: highScore }],
]);

/**
 * 住所関連のスコアについて、他の情報を参照して再計算する
 */
export function finalizeAddressItems(scores: Score[][]): Score[] {
  const addressItems = scores.filter(isAddressItem);

  const zipCodeItems = addressItems.filter(
    (scores) => scores[0].itemNameType === "postal code"
  );
  if (zipCodeItems.length === 2) {
    zipCodeItems[0].push({ score: Infinity, itemNameType: "postal code 1" });
    zipCodeItems[1].push({ score: Infinity, itemNameType: "postal code 2" });
  }

  addressItems.forEach((scores) => {
    scores.sort((a, b) => b.score - a.score);
  });

  return scores.map((s) => s[0]);
}
